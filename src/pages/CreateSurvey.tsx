
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

  const goToAdvancedBuilder = () => {
    navigate("/survey-builder");
  };

  return (
    <MainLayout currentStage={currentStage}>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-survey-darkText">Create New Survey</h1>
        <p className="text-survey-lightText mt-2">
          Set up the basic information for your new survey
        </p>
      </div>

      <div className="mb-8 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Quick Create</CardTitle>
            </CardHeader>
            <CardContent className="text-center py-6">
              <p className="mb-4">Create a basic survey with our standard template</p>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
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
                </div>
                
                <CardFooter className="px-0 pt-6 flex justify-center">
                  <Button type="submit">
                    Create Basic Survey
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow border-primary/20">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle>Advanced Builder</CardTitle>
            </CardHeader>
            <CardContent className="text-center py-6">
              <p className="mb-4">Design a custom survey with our advanced drag-and-drop builder</p>
              <ul className="text-sm text-left space-y-2 mb-6">
                <li className="flex items-center">
                  <span className="inline-block w-5 h-5 rounded-full bg-primary text-white text-center text-xs mr-2">✓</span>
                  Full customization options
                </li>
                <li className="flex items-center">
                  <span className="inline-block w-5 h-5 rounded-full bg-primary text-white text-center text-xs mr-2">✓</span>
                  Multiple question types
                </li>
                <li className="flex items-center">
                  <span className="inline-block w-5 h-5 rounded-full bg-primary text-white text-center text-xs mr-2">✓</span>
                  Conditional logic
                </li>
                <li className="flex items-center">
                  <span className="inline-block w-5 h-5 rounded-full bg-primary text-white text-center text-xs mr-2">✓</span>
                  Theme customization
                </li>
              </ul>
              
              <CardFooter className="px-0 pt-2 flex justify-center">
                <Button 
                  onClick={goToAdvancedBuilder} 
                  variant="default" 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  Open Survey Builder
                </Button>
              </CardFooter>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-center">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => navigate("/company-surveys")}
        >
          Cancel and Return
        </Button>
      </div>
    </MainLayout>
  );
};

export default CreateSurvey;
