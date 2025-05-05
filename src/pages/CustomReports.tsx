
import React, { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  BarChart,
  FileText,
  Filter,
  Download,
  PieChart,
  Users,
  Play,
  Plus,
  Check,
  ChartPie
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams, useNavigate } from "react-router-dom";

// Report interface
interface Report {
  id: string;
  name: string;
  description: string;
  type: string;
  parameters: { [key: string]: any };
  createdAt: string;
  lastRun: string | null;
  status: "saved" | "generated" | "running";
  surveyId?: string;
}

// Survey interface
interface Survey {
  id: string;
  name: string;
  description?: string;
  status?: string;
}

const CustomReports = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentStage] = useState(7);
  const [activeTab, setActiveTab] = useState("available");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewReportDialog, setShowNewReportDialog] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedSurvey, setSelectedSurvey] = useState<string>(
    searchParams.get("survey") || "all"
  );
  
  // Sample survey data
  const availableSurveys: Survey[] = [
    { id: "1", name: "Employee Engagement 2025", status: "active" },
    { id: "2", name: "Management Effectiveness", status: "completed" },
    { id: "3", name: "Work Environment Assessment", status: "draft" },
    { id: "4", name: "Remote Work Satisfaction", status: "scheduled" },
    { id: "5", name: "New Hire Onboarding Feedback", status: "completed" },
  ];
  
  // Sample reports data
  const [reports, setReports] = useState<Report[]>([
    {
      id: "r1",
      name: "Department Comparison Report",
      description: "Compare survey results across different departments",
      type: "comparison",
      parameters: { 
        surveyId: "1",
        departments: ["Engineering", "Marketing", "Sales"],
        metrics: ["overall_score", "participation_rate"]
      },
      createdAt: "2025-03-15",
      lastRun: "2025-05-01",
      status: "generated",
      surveyId: "1"
    },
    {
      id: "r2",
      name: "Manager Performance Overview",
      description: "Detailed view of all managers' performance with rankings",
      type: "performance",
      parameters: {
        surveyId: "1",
        metrics: ["overall_score", "communication", "recognition"]
      },
      createdAt: "2025-04-02",
      lastRun: "2025-05-01",
      status: "generated",
      surveyId: "1"
    },
    {
      id: "r3",
      name: "Quarterly Trends Analysis",
      description: "Track changes in scores over the last four quarters",
      type: "trend",
      parameters: {
        surveys: ["1", "2", "3", "4"],
        metrics: ["overall_score"]
      },
      createdAt: "2025-04-10",
      lastRun: null,
      status: "saved",
      surveyId: "2"
    },
    {
      id: "r4",
      name: "Demographic Breakdown",
      description: "Results broken down by age, tenure, and gender",
      type: "demographic",
      parameters: {
        surveyId: "3",
        demographics: ["age", "tenure", "gender"]
      },
      createdAt: "2025-04-15",
      lastRun: null,
      status: "saved",
      surveyId: "3"
    },
    {
      id: "r5",
      name: "Engagement Factors Analysis",
      description: "Key factors affecting employee engagement",
      type: "factors",
      parameters: {
        surveyId: "5",
        factorCategories: ["leadership", "communication", "development"]
      },
      createdAt: "2025-04-22",
      lastRun: "2025-05-02",
      status: "generated",
      surveyId: "5"
    }
  ]);
  
  // Available report templates
  const reportTemplates = [
    {
      id: "template1",
      name: "Department Comparison",
      description: "Compare results across departments",
      icon: <Users className="h-6 w-6 text-blue-500" />
    },
    {
      id: "template2",
      name: "Manager Ranking",
      description: "Rank managers by performance metrics",
      icon: <BarChart className="h-6 w-6 text-green-500" />
    },
    {
      id: "template3",
      name: "Demographic Analysis",
      description: "Break down results by demographics",
      icon: <PieChart className="h-6 w-6 text-purple-500" />
    },
    {
      id: "template4",
      name: "Trend Analysis",
      description: "Track changes over time",
      icon: <BarChart className="h-6 w-6 text-orange-500" />
    }
  ];
  
  const filterOptions = [
    { id: "dept_eng", label: "Engineering Department" },
    { id: "dept_sales", label: "Sales Department" },
    { id: "dept_marketing", label: "Marketing Department" },
    { id: "tenure_less1", label: "Tenure < 1 year" },
    { id: "tenure_1to3", label: "Tenure 1-3 years" },
    { id: "tenure_more3", label: "Tenure > 3 years" },
    { id: "mgr_level1", label: "Manager Level 1" },
    { id: "mgr_level2", label: "Manager Level 2" }
  ];

  // Effect to handle query params
  useEffect(() => {
    const reportId = searchParams.get("reportId");
    const surveyId = searchParams.get("survey");
    
    if (surveyId) {
      setSelectedSurvey(surveyId);
    }
    
    if (reportId) {
      const report = reports.find(r => r.id === reportId);
      if (report) {
        handleGenerateReport(reportId);
      }
    }
  }, [searchParams]);
  
  // Filter reports based on selected survey and search query
  const filteredReports = reports.filter(report => {
    const matchesSurvey = selectedSurvey === "all" || report.surveyId === selectedSurvey;
    const matchesSearch = report.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          report.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSurvey && matchesSearch;
  });
  
  const handleGenerateReport = (reportId: string) => {
    const reportIndex = reports.findIndex(r => r.id === reportId);
    if (reportIndex !== -1) {
      const updatedReports = [...reports];
      updatedReports[reportIndex] = { 
        ...updatedReports[reportIndex],
        status: "running" as const
      };
      setReports(updatedReports);
      
      // Simulate report generation
      setTimeout(() => {
        const finalReports = [...reports];
        finalReports[reportIndex] = {
          ...finalReports[reportIndex],
          status: "generated" as const,
          lastRun: new Date().toISOString().split("T")[0]
        };
        setReports(finalReports);
        
        toast({
          title: "Report Generated",
          description: `"${finalReports[reportIndex].name}" has been generated successfully.`
        });
      }, 2000);
    }
  };
  
  const handleCreateReport = () => {
    if (!selectedReportType) return;
    if (selectedSurvey === "all") {
      toast({
        title: "Survey Required",
        description: "Please select a specific survey to create a report.",
        variant: "destructive"
      });
      return;
    }
    
    const template = reportTemplates.find(t => t.id === selectedReportType);
    if (!template) return;
    
    const newReport: Report = {
      id: `r${reports.length + 1}`,
      name: `New ${template.name} Report`,
      description: template.description,
      type: selectedReportType,
      parameters: {
        filters: selectedFilters,
        createdDate: new Date().toISOString()
      },
      createdAt: new Date().toISOString().split("T")[0],
      lastRun: null,
      status: "saved",
      surveyId: selectedSurvey
    };
    
    setReports([...reports, newReport]);
    setSelectedReportType(null);
    setSelectedFilters([]);
    setShowNewReportDialog(false);
    
    toast({
      title: "Report Created",
      description: `New report "${newReport.name}" has been created for survey "${availableSurveys.find(s => s.id === selectedSurvey)?.name}".`
    });
  };
  
  const handleFilterToggle = (filterId: string) => {
    if (selectedFilters.includes(filterId)) {
      setSelectedFilters(selectedFilters.filter(id => id !== filterId));
    } else {
      setSelectedFilters([...selectedFilters, filterId]);
    }
  };
  
  const getStatusBadge = (status: Report["status"]) => {
    switch (status) {
      case "generated":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
            <Check className="h-3 w-3 mr-1" />
            Generated
          </span>
        );
      case "running":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
            <svg className="animate-spin h-3 w-3 mr-1" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Running
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
            Saved
          </span>
        );
    }
  };
  
  return (
    <MainLayout currentStage={currentStage}>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-survey-darkText">
            Custom Reports
          </h2>
          <p className="text-survey-lightText mt-2">
            Generate and view custom reports based on survey data
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          <Select value={selectedSurvey} onValueChange={setSelectedSurvey}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Filter by Survey" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Surveys</SelectItem>
              {availableSurveys.map(survey => (
                <SelectItem key={survey.id} value={survey.id}>
                  {survey.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Dialog open={showNewReportDialog} onOpenChange={setShowNewReportDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create New Report
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Report</DialogTitle>
                <DialogDescription>
                  Select a report template and customize settings
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-4 space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Survey</label>
                  <Select value={selectedSurvey} onValueChange={setSelectedSurvey}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Survey" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSurveys.map(survey => (
                        <SelectItem key={survey.id} value={survey.id}>
                          {survey.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedSurvey === "all" && (
                    <p className="text-xs text-red-500 mt-1">Please select a specific survey</p>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Report Template</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {reportTemplates.map(template => (
                      <div
                        key={template.id}
                        className={`border rounded-md p-3 cursor-pointer transition-colors ${
                          selectedReportType === template.id
                            ? "border-blue-500 bg-blue-50"
                            : "hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedReportType(template.id)}
                      >
                        <div className="flex flex-col items-center text-center">
                          {template.icon}
                          <h5 className="font-medium mt-2">{template.name}</h5>
                          <p className="text-xs text-survey-lightText mt-1">
                            {template.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {selectedReportType && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Add Filters (Optional)</h4>
                    <div className="max-h-48 overflow-y-auto space-y-2 border rounded-md p-3">
                      {filterOptions.map(filter => (
                        <div key={filter.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={filter.id} 
                            checked={selectedFilters.includes(filter.id)}
                            onCheckedChange={() => handleFilterToggle(filter.id)}
                          />
                          <label 
                            htmlFor={filter.id}
                            className="text-sm cursor-pointer"
                          >
                            {filter.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowNewReportDialog(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreateReport}
                  disabled={!selectedReportType || selectedSurvey === "all"}
                >
                  Create Report
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="available">Available Reports</TabsTrigger>
          <TabsTrigger value="generated">Generated Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
        </TabsList>
        
        <div className="flex flex-col sm:flex-row justify-between mb-6 space-y-4 sm:space-y-0">
          <div className="relative max-w-xs">
            <Input
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
            <FileText className="absolute left-2.5 top-2.5 h-4 w-4 text-survey-lightText" />
          </div>
          
          <div className="flex space-x-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Report Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Report Types</SelectItem>
                <SelectItem value="comparison">Comparison</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
                <SelectItem value="trend">Trend Analysis</SelectItem>
                <SelectItem value="demographic">Demographic</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <TabsContent value="available">
          <div className="space-y-6">
            {filteredReports.length > 0 ? (
              filteredReports.map(report => (
                <Card key={report.id}>
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <CardTitle className="text-xl">{report.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {report.description}
                        </CardDescription>
                      </div>
                      <div className="mt-4 sm:mt-0 sm:ml-4 flex items-center">
                        {getStatusBadge(report.status)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex flex-wrap items-center text-sm text-survey-lightText">
                      <div className="mr-6 mb-2">
                        <span className="font-medium">Created:</span> {report.createdAt}
                      </div>
                      {report.lastRun && (
                        <div className="mr-6 mb-2">
                          <span className="font-medium">Last Generated:</span> {report.lastRun}
                        </div>
                      )}
                      <div className="mr-6 mb-2">
                        <span className="font-medium">Type:</span> {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                      </div>
                      <div className="mr-6 mb-2">
                        <span className="font-medium">Survey:</span> {availableSurveys.find(s => s.id === report.surveyId)?.name || "Multiple Surveys"}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 flex flex-wrap gap-2">
                    {report.status === "generated" ? (
                      <>
                        <Button variant="outline">
                          <FileText className="mr-2 h-4 w-4" />
                          View Report
                        </Button>
                        <Button variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </>
                    ) : (
                      <Button 
                        onClick={() => handleGenerateReport(report.id)}
                        disabled={report.status === "running"}
                      >
                        {report.status === "running" ? (
                          <>
                            <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Generating...
                          </>
                        ) : (
                          <>
                            <Play className="mr-2 h-4 w-4" />
                            Generate Report
                          </>
                        )}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-4 text-lg font-medium text-survey-darkText">No reports found</h3>
                <p className="mt-2 text-survey-lightText">
                  {searchQuery ? 'Try adjusting your search query' : (
                    selectedSurvey !== "all" 
                      ? `No reports available for "${availableSurveys.find(s => s.id === selectedSurvey)?.name}". Create a new report?`
                      : 'Create a new report to get started'
                  )}
                </p>
                {selectedSurvey !== "all" && (
                  <Button className="mt-4" onClick={() => setShowNewReportDialog(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Report for this Survey
                  </Button>
                )}
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="generated">
          <div className="space-y-6">
            {filteredReports.filter(report => report.status === "generated").length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Survey</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Generated On</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports
                    .filter(report => report.status === "generated")
                    .map(report => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.name}</TableCell>
                        <TableCell>{availableSurveys.find(s => s.id === report.surveyId)?.name || "Multiple"}</TableCell>
                        <TableCell>{report.type}</TableCell>
                        <TableCell>{report.lastRun}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" size="sm">
                              <FileText className="mr-2 h-4 w-4" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-4 text-lg font-medium text-survey-darkText">No generated reports</h3>
                <p className="mt-2 text-survey-lightText">
                  {selectedSurvey !== "all" 
                    ? `Generate a report for "${availableSurveys.find(s => s.id === selectedSurvey)?.name}" to see it here`
                    : 'Generate a report to see it here'
                  }
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="scheduled">
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-4 text-lg font-medium text-survey-darkText">No scheduled reports</h3>
            <p className="mt-2 text-survey-lightText">
              Schedule reports to be generated automatically
            </p>
            <Button className="mt-4">
              <Plus className="mr-2 h-4 w-4" />
              Schedule a Report
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default CustomReports;
