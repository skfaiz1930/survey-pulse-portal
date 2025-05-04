
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, ArrowLeft, ArrowRight, AlertTriangle } from "lucide-react";

interface Question {
  id: number;
  text: string;
  type: 'rating' | 'open';
  required: boolean;
}

const SurveyForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isComplete, setIsComplete] = useState(false);
  
  // Mock survey data
  const surveyData = {
    title: "Manager Effectiveness Survey",
    description: "Please provide feedback about your manager to help them improve.",
    managerName: "John Doe",
    questions: [
      {
        id: 1,
        text: "My manager provides clear direction on what is expected of me.",
        type: "rating" as const,
        required: true
      },
      {
        id: 2,
        text: "My manager gives me regular, constructive feedback on my performance.",
        type: "rating" as const,
        required: true
      },
      {
        id: 3,
        text: "My manager recognizes my achievements and contributions.",
        type: "rating" as const,
        required: true
      },
      {
        id: 4,
        text: "My manager supports my professional development.",
        type: "rating" as const,
        required: true
      },
      {
        id: 5,
        text: "My manager creates an inclusive environment where everyone feels valued.",
        type: "rating" as const,
        required: true
      },
      {
        id: 6,
        text: "What specific actions could your manager take to better support you?",
        type: "open" as const,
        required: false
      },
      {
        id: 7,
        text: "What is the most valuable thing your manager does that helps you succeed?",
        type: "open" as const,
        required: false
      }
    ]
  };
  
  const currentQuestion: Question | null = surveyData.questions[currentStep] || null;
  
  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };
  
  const canContinue = () => {
    if (!currentQuestion) return false;
    if (!currentQuestion.required) return true;
    return !!answers[currentQuestion.id] && answers[currentQuestion.id].trim() !== '';
  };
  
  const handleNext = () => {
    if (currentStep < surveyData.questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsComplete(true);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const progress = Math.round(((currentStep + 1) / surveyData.questions.length) * 100);
  
  if (isComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-survey-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4 text-green-500">
              <CheckCircle2 className="h-12 w-12" />
            </div>
            <CardTitle className="text-2xl">Thank You!</CardTitle>
            <CardDescription>
              Your feedback has been submitted successfully.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center">
              Your input is valuable and will help {surveyData.managerName} improve as a manager.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => window.close()}>Close Survey</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-survey-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4 text-amber-500">
              <AlertTriangle className="h-12 w-12" />
            </div>
            <CardTitle className="text-2xl">No Questions Found</CardTitle>
            <CardDescription>
              There seems to be an issue with this survey.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button onClick={() => window.location.href = "/"}>Return to Dashboard</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-survey-background p-4">
      <div className="w-full max-w-2xl">
        {currentStep === 0 && (
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-survey-primary mb-2">
              {surveyData.title}
            </h1>
            <p className="text-survey-lightText">
              {surveyData.description}
            </p>
            <p className="mt-2 font-medium">
              Manager: {surveyData.managerName}
            </p>
          </div>
        )}
        
        <Card>
          <CardHeader>
            <div className="mb-2">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between mt-1 text-xs text-survey-lightText">
                <span>Question {currentStep + 1} of {surveyData.questions.length}</span>
                <span>{progress}% Complete</span>
              </div>
            </div>
            <CardTitle className="text-xl">
              {currentQuestion.text}
            </CardTitle>
            {currentQuestion.required && (
              <CardDescription>This question is required</CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {currentQuestion.type === "rating" && (
              <RadioGroup 
                value={answers[currentQuestion.id] || ""} 
                onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                className="mt-2"
              >
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 justify-between">
                  <div className="flex flex-col items-center space-y-2">
                    <RadioGroupItem value="1" id={`q${currentQuestion.id}-1`} />
                    <Label htmlFor={`q${currentQuestion.id}-1`} className="text-xs text-center">
                      Strongly Disagree
                    </Label>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <RadioGroupItem value="2" id={`q${currentQuestion.id}-2`} />
                    <Label htmlFor={`q${currentQuestion.id}-2`} className="text-xs text-center">
                      Disagree
                    </Label>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <RadioGroupItem value="3" id={`q${currentQuestion.id}-3`} />
                    <Label htmlFor={`q${currentQuestion.id}-3`} className="text-xs text-center">
                      Neutral
                    </Label>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <RadioGroupItem value="4" id={`q${currentQuestion.id}-4`} />
                    <Label htmlFor={`q${currentQuestion.id}-4`} className="text-xs text-center">
                      Agree
                    </Label>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <RadioGroupItem value="5" id={`q${currentQuestion.id}-5`} />
                    <Label htmlFor={`q${currentQuestion.id}-5`} className="text-xs text-center">
                      Strongly Agree
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            )}
            
            {currentQuestion.type === "open" && (
              <Textarea
                placeholder="Type your answer here..."
                value={answers[currentQuestion.id] || ""}
                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                className="min-h-[150px] mt-2"
              />
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button 
              onClick={handleNext}
              disabled={!canContinue()}
            >
              {currentStep < surveyData.questions.length - 1 ? (
                <>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                'Submit'
              )}
            </Button>
          </CardFooter>
        </Card>
        
        <div className="mt-4 text-center text-xs text-survey-lightText">
          <p>Your responses are anonymous and will be used for improvement purposes only.</p>
        </div>
      </div>
    </div>
  );
};

export default SurveyForm;
