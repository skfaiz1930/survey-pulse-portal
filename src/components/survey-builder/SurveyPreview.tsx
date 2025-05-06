
import React, { useState } from "react";
import { SurveyState } from "@/lib/survey-builder/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BlockPreview } from "@/components/survey-builder/BlockPreview";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface SurveyPreviewProps {
  surveyState: SurveyState;
}

export const SurveyPreview = ({ surveyState }: SurveyPreviewProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const blocksPerPage = 3; // Number of questions per page
  
  const totalPages = Math.ceil(surveyState.blocks.length / blocksPerPage);
  const startIndex = currentPage * blocksPerPage;
  const endIndex = Math.min(startIndex + blocksPerPage, surveyState.blocks.length);
  const currentBlocks = surveyState.blocks.slice(startIndex, endIndex);
  
  const progress = totalPages > 1 
    ? Math.round(((currentPage + 1) / totalPages) * 100) 
    : surveyState.blocks.length > 0 ? 100 : 0;

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (surveyState.blocks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px]">
        <p className="text-gray-500">Add questions to preview your survey</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto my-4">
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-violet-600 text-white">
          <CardTitle className="text-2xl">{surveyState.title || "Untitled Survey"}</CardTitle>
          <CardDescription className="text-gray-100 opacity-90">
            {surveyState.description || "Preview how your survey will appear to respondents"}
          </CardDescription>
        </CardHeader>
        
        {totalPages > 1 && (
          <div className="px-6 pt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Page {currentPage + 1} of {totalPages}</span>
              <span>{progress}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
        
        <CardContent className="p-6">
          <div className="space-y-8">
            {currentBlocks.map((block) => (
              <div key={block.id} className="border-b pb-6 last:border-0 last:pb-0">
                <BlockPreview block={block} />
              </div>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between p-6 border-t bg-gray-50">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className="gap-2"
          >
            {currentPage === totalPages - 1 ? 'Submit' : 'Next'}
            {currentPage !== totalPages - 1 && <ArrowRight className="h-4 w-4" />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
