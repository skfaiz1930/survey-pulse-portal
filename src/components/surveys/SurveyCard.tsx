
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, BarChart, Users, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export type SurveyStatus = "draft" | "scheduled" | "active" | "completed";

export interface SurveyCardProps {
  id: string;
  title: string;
  description: string;
  status: SurveyStatus;
  responseRate: number;
  averageScore?: number;
  participantCount: number;
  startDate?: string;
  endDate?: string;
}

export const SurveyCard: React.FC<SurveyCardProps> = ({
  id,
  title,
  description,
  status,
  responseRate,
  averageScore,
  participantCount,
  startDate,
  endDate,
}) => {
  const navigate = useNavigate();

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

  const getActionButton = () => {
    switch (status) {
      case "draft":
        return (
          <Button onClick={() => navigate(`/survey-editor/${id}`)}>
            Edit Survey
          </Button>
        );
      case "scheduled":
        return (
          <Button onClick={() => navigate(`/survey-timeline/${id}`)}>
            View Timeline
          </Button>
        );
      case "active":
        return (
          <Button onClick={() => navigate(`/track-progress/${id}`)}>
            Track Progress
          </Button>
        );
      case "completed":
        return (
          <Button onClick={() => navigate(`/access-results/${id}`)}>
            View Results
          </Button>
        );
    }
  };

  return (
    <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">{title}</CardTitle>
          <Badge className={getStatusColor(status)}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-survey-lightText mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Response Rate</span>
              <span className="font-medium">{responseRate}%</span>
            </div>
            <Progress value={responseRate} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            {averageScore !== undefined && (
              <div className="flex items-center">
                <BarChart className="h-4 w-4 mr-2 text-survey-primary" />
                <span>Avg. Score: <span className="font-medium">{averageScore.toFixed(1)}/5</span></span>
              </div>
            )}
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-survey-primary" />
              <span>Participants: <span className="font-medium">{participantCount}</span></span>
            </div>
            <div className="flex items-center col-span-2">
              <Calendar className="h-4 w-4 mr-2 text-survey-primary" />
              <span>Duration: <span className="font-medium">{formatDate(startDate)} - {formatDate(endDate)}</span></span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        {getActionButton()}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(`/survey-details/${id}`)}
          aria-label="View survey details"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
