
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { RegisterCompany } from "@/components/stages/stage1/RegisterCompany";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const navigate = useNavigate();

  const handleStageComplete = () => {
    const nextStage = Math.min(currentStage + 1, 9);
    setCurrentStage(nextStage);
    
    // Navigate to the appropriate route based on the next stage
    if (nextStage === 2) {
      navigate("/upload-participants");
    }
  };

  return (
    <MainLayout currentStage={currentStage}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-survey-darkText">Register Your Company</h2>
        <p className="text-survey-lightText mt-2">Start by registering your company details</p>
      </div>
      
      <RegisterCompany onComplete={handleStageComplete} />
    </MainLayout>
  );
};

export default Index;
