
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart, FileText, Users, BookOpen } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const Reports = () => {
  const [currentStage] = useState(7);
  const [activeTab, setActiveTab] = useState("basic");
  const [selectedSurvey, setSelectedSurvey] = useState("1");

  // Mock survey data for the selector
  const availableSurveys = [
    { id: "1", name: "Employee Engagement 2025" },
    { id: "2", name: "Management Effectiveness" },
    { id: "3", name: "Work Environment Assessment" },
    { id: "4", name: "Remote Work Satisfaction" },
    { id: "5", name: "New Hire Onboarding Feedback" },
  ];

  // Custom reports list
  const customReports = [
    { id: 1, name: "Department Comparison", description: "Compare survey results across departments", status: "available" },
    { id: 2, name: "Manager Performance", description: "Detailed view of all managers' performance", status: "available" },
    { id: 3, name: "Quarterly Trends", description: "Track changes in scores over quarters", status: "available" },
    { id: 4, name: "Demographic Analysis", description: "Results broken down by age, gender, etc.", status: "available" },
    { id: 5, name: "Engagement Factors", description: "Key factors affecting employee engagement", status: "available" }
  ];
  
  return (
    <MainLayout currentStage={currentStage}>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-survey-darkText">
            Survey Reports
          </h2>
          <p className="text-survey-lightText mt-2">
            View detailed reports and insights from your survey data
          </p>
        </div>
        <div className="mt-4 md:mt-0 min-w-[240px]">
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
          <div className="mt-2 flex justify-end">
            <Badge variant="outline" className="text-xs">Survey ID: {selectedSurvey}</Badge>
          </div>
        </div>
      </div>

      <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="basic">Basic Report</TabsTrigger>
          <TabsTrigger value="manager">Manager Profiles</TabsTrigger>
          <TabsTrigger value="lad">Learning & Development</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Overall Engagement Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-blue-700">4.2/5</div>
                <p className="text-survey-lightText mt-2 text-sm">
                  Based on 178 responses
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Participation Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-blue-700">89%</div>
                <p className="text-survey-lightText mt-2 text-sm">
                  178 out of 200 participants
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-blue-700">3.2</div>
                <p className="text-survey-lightText mt-2 text-sm">
                  Average days to complete
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Greatest Manager Traits to Work On (GMTWs)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Trait</TableHead>
                    <TableHead>Current Score</TableHead>
                    <TableHead>Gap to Target</TableHead>
                    <TableHead>Priority</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Recognizing achievements</TableCell>
                    <TableCell>3.5</TableCell>
                    <TableCell>1.5</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">High</span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Providing feedback</TableCell>
                    <TableCell>3.7</TableCell>
                    <TableCell>1.3</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">High</span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Career development guidance</TableCell>
                    <TableCell>3.8</TableCell>
                    <TableCell>1.2</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">Medium</span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Work-life balance support</TableCell>
                    <TableCell>3.9</TableCell>
                    <TableCell>1.1</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">Medium</span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Communication clarity</TableCell>
                    <TableCell>4.0</TableCell>
                    <TableCell>1.0</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Low</span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Statement Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-md">
                    <p className="font-medium">Highest Rated</p>
                    <p className="mt-1 text-sm">
                      "My manager creates an inclusive environment where everyone feels valued." 
                      <span className="ml-2 font-bold">4.7/5</span>
                    </p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-md">
                    <p className="font-medium">Lowest Rated</p>
                    <p className="mt-1 text-sm">
                      "My manager recognizes my achievements and contributions."
                      <span className="ml-2 font-bold">3.5/5</span>
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-md">
                    <p className="font-medium">Most Improved</p>
                    <p className="mt-1 text-sm">
                      "My manager supports my professional development."
                      <span className="ml-2 font-bold">+0.8 from last survey</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Key Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-md">
                    <p className="text-sm text-blue-700 mb-1">Total Managers</p>
                    <p className="text-2xl font-bold text-blue-700">27</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-md">
                    <p className="text-sm text-green-700 mb-1">High Performers</p>
                    <p className="text-2xl font-bold text-green-700">12</p>
                    <p className="text-xs mt-1 text-green-600">Score {`>`} 4.5</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-md">
                    <p className="text-sm text-yellow-700 mb-1">Average Performers</p>
                    <p className="text-2xl font-bold text-yellow-700">11</p>
                    <p className="text-xs mt-1 text-yellow-600">Score 3.5-4.5</p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-md">
                    <p className="text-sm text-red-700 mb-1">Needs Improvement</p>
                    <p className="text-2xl font-bold text-red-700">4</p>
                    <p className="text-xs mt-1 text-red-600">Score {`<`} 3.5</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="manager">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Manager Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex mb-4">
                <div className="mr-4 w-64">
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="hr">HR</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-64">
                  <Select defaultValue="score-desc">
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="score-desc">Score (High to Low)</SelectItem>
                      <SelectItem value="score-asc">Score (Low to High)</SelectItem>
                      <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                      <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Manager Profile Cards */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg mr-3">JD</div>
                      <div>
                        <h4 className="font-medium text-survey-darkText">John Doe</h4>
                        <p className="text-xs text-survey-lightText">Engineering</p>
                      </div>
                      <div className="ml-auto">
                        <span className="text-sm font-bold bg-green-100 text-green-800 px-2 py-1 rounded-full">4.7</span>
                      </div>
                    </div>
                    <div className="mt-3 space-y-2">
                      <div>
                        <p className="text-xs font-medium mb-1">Team Size: 8</p>
                        <p className="text-xs font-medium mb-1">Response Rate: 100%</p>
                      </div>
                      <div className="mt-3">
                        <p className="text-xs font-medium">Top Strength:</p>
                        <p className="text-xs italic">"Creates an inclusive environment"</p>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs font-medium">Area to Improve:</p>
                        <p className="text-xs italic">"Providing regular feedback"</p>
                      </div>
                    </div>
                    <Button className="w-full mt-4" size="sm">View Profile</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg mr-3">JS</div>
                      <div>
                        <h4 className="font-medium text-survey-darkText">Jane Smith</h4>
                        <p className="text-xs text-survey-lightText">Marketing</p>
                      </div>
                      <div className="ml-auto">
                        <span className="text-sm font-bold bg-green-100 text-green-800 px-2 py-1 rounded-full">4.6</span>
                      </div>
                    </div>
                    <div className="mt-3 space-y-2">
                      <div>
                        <p className="text-xs font-medium mb-1">Team Size: 6</p>
                        <p className="text-xs font-medium mb-1">Response Rate: 83%</p>
                      </div>
                      <div className="mt-3">
                        <p className="text-xs font-medium">Top Strength:</p>
                        <p className="text-xs italic">"Recognizing achievements"</p>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs font-medium">Area to Improve:</p>
                        <p className="text-xs italic">"Support for professional development"</p>
                      </div>
                    </div>
                    <Button className="w-full mt-4" size="sm">View Profile</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg mr-3">RJ</div>
                      <div>
                        <h4 className="font-medium text-survey-darkText">Robert Johnson</h4>
                        <p className="text-xs text-survey-lightText">Sales</p>
                      </div>
                      <div className="ml-auto">
                        <span className="text-sm font-bold bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">4.1</span>
                      </div>
                    </div>
                    <div className="mt-3 space-y-2">
                      <div>
                        <p className="text-xs font-medium mb-1">Team Size: 12</p>
                        <p className="text-xs font-medium mb-1">Response Rate: 92%</p>
                      </div>
                      <div className="mt-3">
                        <p className="text-xs font-medium">Top Strength:</p>
                        <p className="text-xs italic">"Clear communication"</p>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs font-medium">Area to Improve:</p>
                        <p className="text-xs italic">"Work-life balance support"</p>
                      </div>
                    </div>
                    <Button className="w-full mt-4" size="sm">View Profile</Button>
                  </CardContent>
                </Card>
                
                {/* More manager cards would be here */}
              </div>

              <div className="mt-6 flex justify-center">
                <Button variant="outline">Load More Managers</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lad">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                Learning & Development Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Skill Area</TableHead>
                    <TableHead>Current Score</TableHead>
                    <TableHead>Recommended Training</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Recognition & Feedback</TableCell>
                    <TableCell>3.5</TableCell>
                    <TableCell>
                      <div>Effective Feedback Workshop</div>
                      <div className="text-xs text-survey-lightText">2-day course, available online</div>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">High</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm">Enroll</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Career Development</TableCell>
                    <TableCell>3.8</TableCell>
                    <TableCell>
                      <div>Career Pathing for Managers</div>
                      <div className="text-xs text-survey-lightText">4-week online course</div>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">Medium</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm">Enroll</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Work-Life Balance</TableCell>
                    <TableCell>3.9</TableCell>
                    <TableCell>
                      <div>Wellbeing Leadership</div>
                      <div className="text-xs text-survey-lightText">1-day workshop</div>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">Medium</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm">Enroll</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Communication</TableCell>
                    <TableCell>4.0</TableCell>
                    <TableCell>
                      <div>Clear Communication for Leaders</div>
                      <div className="text-xs text-survey-lightText">Online self-paced course</div>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Low</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm">Enroll</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Conflict Resolution</TableCell>
                    <TableCell>4.1</TableCell>
                    <TableCell>
                      <div>Managing Team Conflicts</div>
                      <div className="text-xs text-survey-lightText">3-hour virtual session</div>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Low</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm">Enroll</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="custom">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart className="mr-2 h-5 w-5" />
                Custom Reports for {availableSurveys.find(s => s.id === selectedSurvey)?.name || "Selected Survey"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <p className="text-survey-lightText">
                  Generate custom reports based on your survey data. Select from the available reports below or create a new one.
                </p>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customReports.map(report => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.name}</TableCell>
                      <TableCell>{report.description}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          report.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {report.status === 'available' ? 'Available' : 'In Progress'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" onClick={() => window.location.href = `/custom-reports?survey=${selectedSurvey}&reportId=${report.id}`}>Generate</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="mt-6 flex justify-center">
                <Button onClick={() => window.location.href = `/custom-reports?survey=${selectedSurvey}`}>Create New Custom Report</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Reports;
