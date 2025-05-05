
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { SurveyCard, SurveyStatus } from "@/components/surveys/SurveyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data to represent multiple surveys
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
  },
  {
    id: "2",
    title: "Management Effectiveness",
    description: "Survey to evaluate management performance and leadership skills",
    status: "completed" as SurveyStatus,
    responseRate: 93,
    averageScore: 3.9,
    participantCount: 85,
    startDate: "2025-01-10",
    endDate: "2025-02-10",
  },
  {
    id: "3",
    title: "Work Environment Assessment",
    description: "Evaluation of workplace conditions and facilities",
    status: "draft" as SurveyStatus,
    responseRate: 0,
    participantCount: 200,
    startDate: undefined,
    endDate: undefined,
  },
  {
    id: "4",
    title: "Remote Work Satisfaction",
    description: "Survey to assess employee satisfaction with remote work arrangements and tools",
    status: "scheduled" as SurveyStatus,
    responseRate: 0,
    participantCount: 175,
    startDate: "2025-06-01",
    endDate: "2025-06-30",
  },
  {
    id: "5",
    title: "New Hire Onboarding Feedback",
    description: "Feedback collection from recently onboarded employees about their experience",
    status: "completed" as SurveyStatus,
    responseRate: 88,
    averageScore: 4.7,
    participantCount: 43,
    startDate: "2025-03-01",
    endDate: "2025-03-31",
  },
  {
    id: "6",
    title: "Team Collaboration Assessment",
    description: "Survey to evaluate interdepartmental collaboration effectiveness",
    status: "draft" as SurveyStatus,
    responseRate: 0,
    participantCount: 120,
    startDate: undefined,
    endDate: undefined,
  },
];

const CompanySurveys = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentStage] = useState(1); // For MainLayout component

  const filteredSurveys = mockSurveys.filter(survey => {
    const matchesSearch = survey.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         survey.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || survey.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getTabSurveys = (tab: string) => {
    if (tab === "all") return filteredSurveys;
    return filteredSurveys.filter(survey => survey.status === tab);
  };

  const surveyCounts = {
    all: filteredSurveys.length,
    draft: filteredSurveys.filter(s => s.status === "draft").length,
    active: filteredSurveys.filter(s => s.status === "active").length,
    scheduled: filteredSurveys.filter(s => s.status === "scheduled").length,
    completed: filteredSurveys.filter(s => s.status === "completed").length,
  };

  const handleCreateNewSurvey = () => {
    // Navigate to a page to create a new survey
    navigate("/create-survey");
  };

  return (
    <MainLayout currentStage={currentStage}>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-survey-darkText">Company Surveys</h1>
        <p className="text-survey-lightText mt-2">
          Manage all your surveys and access their results in one place
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search surveys..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-full md:w-[200px]">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Button onClick={handleCreateNewSurvey}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Survey
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Surveys ({surveyCounts.all})</TabsTrigger>
          <TabsTrigger value="active">Active ({surveyCounts.active})</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled ({surveyCounts.scheduled})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({surveyCounts.completed})</TabsTrigger>
          <TabsTrigger value="draft">Drafts ({surveyCounts.draft})</TabsTrigger>
        </TabsList>
        
        {["all", "active", "scheduled", "completed", "draft"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {getTabSurveys(tab).map((survey) => (
                <SurveyCard key={survey.id} {...survey} />
              ))}
              
              {getTabSurveys(tab).length === 0 && (
                <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-lg mb-2">No surveys found</h3>
                  <p className="text-survey-lightText mb-4">
                    {searchQuery || statusFilter !== "all" 
                      ? "Try adjusting your search or filters" 
                      : "Create your first survey to get started"}
                  </p>
                  {!searchQuery && statusFilter === "all" && (
                    <Button onClick={handleCreateNewSurvey}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create New Survey
                    </Button>
                  )}
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </MainLayout>
  );
};

export default CompanySurveys;
