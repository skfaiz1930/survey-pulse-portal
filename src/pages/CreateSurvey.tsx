
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const CreateSurvey = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStage] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description) {
      toast({
        title: "Missing Information",
        description: "Please provide both title and description for your survey.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, we'd save the survey to the database here
    toast({
      title: "Survey Created",
      description: "Your new survey has been created and saved as a draft.",
    });
    
    // Navigate back to the surveys list
    navigate("/company-surveys");
  };

  return (
    <MainLayout currentStage={currentStage}>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-survey-darkText">Create New Survey</h1>
        <p className="text-survey-lightText mt-2">
          Set up the basic information for your new survey
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Survey Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Survey Title
              </label>
              <Input
                id="title"
                placeholder="Enter a descriptive title for your survey"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                placeholder="Provide a brief description of the survey's purpose"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate("/company-surveys")}
            >
              Cancel
            </Button>
            <Button type="submit">
              Create Survey Draft
            </Button>
          </CardFooter>
        </form>
      </Card>
    </MainLayout>
  );
};

export default CreateSurvey;
