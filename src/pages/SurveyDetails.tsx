
import React, { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Users, Clock, BarChart } from "lucide-react";
import { SurveyStatus } from "@/components/surveys/SurveyCard";

// This would come from API in a real app
const getMockSurveyById = (id: string) => {
  const mockSurveys = [
    {
      id: "1",
      title: "Employee Engagement 2025",
      description: "Annual survey to measure employee engagement and satisfaction across all departments",
      status: "active" as SurveyStatus,
      responseRate: 68,
      averageScore: 4.2,
      participantCount: 152,
      startDate: "2025-04-15",
      endDate: "2025-05-15",
      categories: ["Communication", "Work Environment", "Management", "Growth Opportunities", "Compensation"],
      questions: 25,
      averageTimeToComplete: "12 minutes"
    },
  ];
  
  return mockSurveys.find(survey => survey.id === id);
};

const SurveyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentStage] = useState(2);

  useEffect(() => {
    // In a real app, this would be an API call
    if (id) {
      const surveyData = getMockSurveyById(id);
      setSurvey(surveyData);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <MainLayout currentStage={currentStage}>
        <div className="flex items-center justify-center h-64">
          <p>Loading survey details...</p>
        </div>
      </MainLayout>
    );
  }

  if (!survey) {
    return (
      <MainLayout currentStage={currentStage}>
        <div className="flex flex-col items-center justify-center h-64">
          <h2 className="text-xl font-semibold mb-2">Survey Not Found</h2>
          <p className="text-survey-lightText mb-4">The survey you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/company-surveys")}>
            Back to Surveys
          </Button>
        </div>
      </MainLayout>
    );
  }

  const getStatusColor = (status: SurveyStatus) => {
    switch (status) {
      case "draft":
        return "bg-gray-400 text-white";
      case "scheduled":
        return "bg-blue-400 text-white";
      case "active":
        return "bg-green-500 text-white";
      case "completed":
        return "bg-purple-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString();
  };

  // Mock participant data
  const mockParticipants = [
    { id: 1, name: "Alex Johnson", email: "alex@example.com", department: "Engineering", completed: true },
    { id: 2, name: "Sam Williams", email: "sam@example.com", department: "Marketing", completed: true },
    { id: 3, name: "Taylor Brown", email: "taylor@example.com", department: "HR", completed: false },
    { id: 4, name: "Jordan Smith", email: "jordan@example.com", department: "Finance", completed: true },
    { id: 5, name: "Casey Miller", email: "casey@example.com", department: "Product", completed: false },
  ];

  return (
    <MainLayout currentStage={currentStage}>
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <Button variant="ghost" onClick={() => navigate("/company-surveys")} className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Surveys
          </Button>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-survey-darkText">{survey.title}</h1>
            <p className="text-survey-lightText mt-2">{survey.description}</p>
          </div>
          <Badge className={`${getStatusColor(survey.status)} text-sm px-3 py-1`}>
            {survey.status.charAt(0).toUpperCase() + survey.status.slice(1)}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Users className="mr-2 h-5 w-5 text-survey-primary" />
              Participants
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{survey.participantCount}</div>
            <div className="text-sm text-survey-lightText">Total invited participants</div>
            
            <div className="mt-2">
              <div className="flex justify-between text-sm mt-4 mb-1">
                <span>Response Rate</span>
                <span className="font-medium">{survey.responseRate}%</span>
              </div>
              <Progress value={survey.responseRate} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-survey-primary" />
              Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <div className="text-sm text-survey-lightText">Start Date</div>
                <div className="font-medium">{formatDate(survey.startDate)}</div>
              </div>
              <div>
                <div className="text-sm text-survey-lightText">End Date</div>
                <div className="font-medium">{formatDate(survey.endDate)}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <BarChart className="mr-2 h-5 w-5 text-survey-primary" />
              Survey Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <div className="text-sm text-survey-lightText">Questions</div>
                <div className="font-medium">{survey.questions}</div>
              </div>
              <div>
                <div className="text-sm text-survey-lightText">Categories</div>
                <div className="font-medium">{survey.categories.length}</div>
              </div>
              <div>
                <div className="text-sm text-survey-lightText">Average Time to Complete</div>
                <div className="font-medium">{survey.averageTimeToComplete}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="participants">Participants</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Survey Categories</CardTitle>
              <CardDescription>
                This survey covers the following categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {survey.categories.map((category: string, index: number) => (
                  <div key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {category}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="participants" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Participant List</CardTitle>
              <CardDescription>
                Sample of participants in this survey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockParticipants.map((participant) => (
                    <TableRow key={participant.id}>
                      <TableCell>{participant.name}</TableCell>
                      <TableCell>{participant.email}</TableCell>
                      <TableCell>{participant.department}</TableCell>
                      <TableCell>
                        {participant.completed ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
                        ) : (
                          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pending</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="questions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Question Preview</CardTitle>
              <CardDescription>
                Sample of questions in this survey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <div className="font-medium mb-2">How satisfied are you with your current role?</div>
                  <div className="text-survey-lightText text-sm">Scale: 1-5</div>
                </div>
                
                <div className="p-4 border rounded-md">
                  <div className="font-medium mb-2">Do you feel you have opportunities for growth in the company?</div>
                  <div className="text-survey-lightText text-sm">Scale: 1-5</div>
                </div>
                
                <div className="p-4 border rounded-md">
                  <div className="font-medium mb-2">Rate the effectiveness of communication from leadership.</div>
                  <div className="text-survey-lightText text-sm">Scale: 1-5</div>
                </div>
                
                <div className="flex justify-center mt-4">
                  <Button variant="outline">
                    View All {survey.questions} Questions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-4">
        {survey.status === "draft" && (
          <>
            <Button variant="outline">Edit Survey</Button>
            <Button>Schedule Survey</Button>
          </>
        )}
        {survey.status === "scheduled" && (
          <>
            <Button variant="outline">Reschedule</Button>
            <Button>Launch Now</Button>
          </>
        )}
        {survey.status === "active" && (
          <>
            <Button variant="outline">Send Reminder</Button>
            <Button>Close Survey</Button>
          </>
        )}
        {survey.status === "completed" && (
          <>
            <Button variant="outline">Download Results</Button>
            <Button>Detailed Analysis</Button>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default SurveyDetails;
