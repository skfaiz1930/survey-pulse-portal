
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { RegisterCompany } from "@/components/stages/stage1/RegisterCompany";

const Index = () => {
  const [currentStage, setCurrentStage] = useState(1);

  const handleStageComplete = () => {
    setCurrentStage(prev => Math.min(prev + 1, 9));
  };

  return (
    <MainLayout currentStage={currentStage}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-survey-darkText">Survey Pulse Admin Portal</h2>
        <p className="text-survey-lightText mt-2">Complete each stage to set up and analyze your surveys</p>
      </div>
      
      {currentStage === 1 && <RegisterCompany onComplete={handleStageComplete} />}
      
      {/* Future stages will be conditionally rendered here */}
      {currentStage > 1 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-4">Stage {currentStage} Placeholder</h3>
          <p className="text-gray-600 mb-6">This stage is currently under development.</p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => setCurrentStage(prev => Math.max(prev - 1, 1))}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Previous Stage
            </button>
            {currentStage < 9 && (
              <button 
                onClick={() => setCurrentStage(prev => Math.min(prev + 1, 9))}
                className="px-4 py-2 bg-survey-primary text-white rounded-md hover:bg-blue-700"
              >
                Next Stage
              </button>
            )}
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default Index;
