
import React, { useState, useRef, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { EditorToolbar } from "@/components/survey-builder/EditorToolbar";
import { BuilderCanvas } from "@/components/survey-builder/BuilderCanvas";
import { SurveyPreview } from "@/components/survey-builder/SurveyPreview";
import { SaveStatus } from "@/components/survey-builder/SaveStatus";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { createInitialSurveyState } from "@/lib/survey-builder/initialState";

const SurveyBuilder = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("editor");
  const [currentStage] = useState(1);
  const [surveyState, setSurveyState] = useState(createInitialSurveyState);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved");

  // Save survey state to localStorage for persistence during development
  useEffect(() => {
    const saveTimer = setTimeout(() => {
      try {
        localStorage.setItem("survey_draft", JSON.stringify(surveyState));
        setSaveStatus("saved");
      } catch (error) {
        console.error("Error saving survey:", error);
        setSaveStatus("unsaved");
      }
    }, 1000);

    return () => clearTimeout(saveTimer);
  }, [surveyState]);

  // Load saved survey from localStorage
  useEffect(() => {
    try {
      const savedSurvey = localStorage.getItem("survey_draft");
      if (savedSurvey) {
        setSurveyState(JSON.parse(savedSurvey));
      }
    } catch (error) {
      console.error("Error loading saved survey:", error);
    }
  }, []);

  const handleSurveyChange = (updatedSurvey: typeof surveyState) => {
    setSaveStatus("saving");
    setSurveyState(updatedSurvey);
  };

  const handlePublish = () => {
    if (!surveyState.title) {
      toast({
        title: "Survey needs a title",
        description: "Please add a title to your survey before publishing.",
        variant: "destructive",
      });
      return;
    }

    if (surveyState.blocks.length < 1) {
      toast({
        title: "Survey is empty",
        description: "Please add at least one question to your survey before publishing.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Survey Published!",
      description: "Your survey has been published successfully.",
    });
    
    // In a real app, we would save to a database here
    navigate("/company-surveys");
  };

  return (
    <MainLayout currentStage={currentStage}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Survey Builder</h1>
        <div className="flex items-center space-x-2">
          <SaveStatus status={saveStatus} />
          <Button onClick={handlePublish} variant="default">Publish Survey</Button>
        </div>
      </div>

      <Tabs defaultValue="editor" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-[400px] grid-cols-2">
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="editor" className="border rounded-md mt-2">
          <div className="flex flex-col">
            <EditorToolbar 
              surveyState={surveyState} 
              onSurveyChange={handleSurveyChange}
            />
            <BuilderCanvas 
              surveyState={surveyState} 
              onSurveyChange={handleSurveyChange} 
            />
          </div>
        </TabsContent>
        <TabsContent value="preview" className="border rounded-md mt-2 p-4">
          <SurveyPreview surveyState={surveyState} />
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default SurveyBuilder;
