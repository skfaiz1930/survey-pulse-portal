
import React from "react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";

interface StageInfo {
  id: number;
  name: string;
  category: "Assessment" | "Analytics" | "Development";
  tooltip: string;
}

const stages: StageInfo[] = [
  {
    id: 1,
    name: "Register Company",
    category: "Assessment",
    tooltip: "Enter your company details"
  },
  {
    id: 2,
    name: "Upload Participants",
    category: "Assessment",
    tooltip: "Upload employee data"
  },
  {
    id: 3,
    name: "Review & Launch",
    category: "Assessment",
    tooltip: "Review and launch your survey"
  },
  {
    id: 4,
    name: "Survey Timeline",
    category: "Assessment",
    tooltip: "Set survey start and end dates"
  },
  {
    id: 5,
    name: "Track Progress",
    category: "Analytics",
    tooltip: "Monitor survey completion rates"
  },
  {
    id: 6,
    name: "Access Results",
    category: "Analytics",
    tooltip: "View survey results and analytics"
  },
  {
    id: 7,
    name: "Reports",
    category: "Analytics",
    tooltip: "Generate and view reports"
  },
  {
    id: 8,
    name: "Development",
    category: "Development",
    tooltip: "Manager development tools and nudges"
  },
  {
    id: 9,
    name: "Knowledge Hub",
    category: "Development",
    tooltip: "Access help resources and FAQs"
  }
];

interface ProgressBarProps {
  currentStage: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStage }) => {
  const isMobile = useIsMobile();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Assessment":
        return "bg-blue-500";
      case "Analytics":
        return "bg-green-500";
      case "Development":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleStageClick = (stageId: number) => {
    console.log(`Navigating to stage ${stageId}`);
    // Will implement actual navigation in the next iteration
  };

  if (isMobile) {
    return (
      <div className="bg-white border-b border-gray-200 py-2 sticky top-16 z-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-survey-darkText">
              Stage {currentStage}: {stages[currentStage - 1]?.name}
            </span>
            <span className="text-sm text-survey-lightText">
              {currentStage}/9
            </span>
          </div>
          <div className="w-full bg-gray-200 h-1.5 mt-2 rounded-full overflow-hidden">
            <div 
              className="bg-survey-primary h-full rounded-full transition-all duration-300"
              style={{ width: `${(currentStage / 9) * 100}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-b border-gray-200 py-3 sticky top-16 z-20">
      <div className="container mx-auto">
        <TooltipProvider>
          <div className="flex justify-between items-center relative">
            {stages.map((stage, index) => (
              <React.Fragment key={stage.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      onClick={() => handleStageClick(stage.id)}
                      className={cn(
                        "z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all",
                        stage.id === currentStage 
                          ? "bg-survey-primary text-white ring-4 ring-blue-100" 
                          : stage.id < currentStage 
                            ? "bg-survey-primary text-white" 
                            : "bg-gray-200 text-gray-600"
                      )}
                    >
                      {stage.id}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p><strong>{stage.name}</strong></p>
                    <p className="text-xs">{stage.tooltip}</p>
                    <p className="text-xs mt-1">Category: {stage.category}</p>
                  </TooltipContent>
                </Tooltip>
                
                {index < stages.length - 1 && (
                  <div className="h-1 flex-1 bg-gray-200">
                    <div 
                      className={cn(
                        "h-full bg-survey-primary transition-all duration-500",
                        currentStage > stage.id ? "w-full" : "w-0"
                      )} 
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
            
            {/* Category indicators */}
            <div className="absolute -bottom-6 left-0 w-full flex text-xs">
              <div className="flex-1 text-center text-survey-lightText">Assessment</div>
              <div className="flex-1 text-center text-survey-lightText">Analytics</div>
              <div className="flex-1 text-center text-survey-lightText">Development</div>
            </div>
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
};
