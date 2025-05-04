
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, Plus, FileText, Star, MessageSquare, Edit, Trash2, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type QuestionType = "rating" | "open" | "multiple-choice";

interface Question {
  id: number;
  text: string;
  type: QuestionType;
  options?: string[];
  category?: string;
}

interface Template {
  id: number;
  name: string;
  description: string;
  questions: number[];
  isDefault?: boolean;
}

const QuestionTemplates = () => {
  const { toast } = useToast();
  const [currentStage] = useState(3);
  const [activeTab, setActiveTab] = useState("templates");
  const [newQuestion, setNewQuestion] = useState<Question>({
    id: 0,
    text: "",
    type: "rating",
    options: [],
    category: "leadership"
  });
  
  // Mock questions and templates data
  const [questions, setQuestions] = useState<Question[]>([
    { 
      id: 1, 
      text: "My manager provides clear direction on what is expected of me.", 
      type: "rating",
      category: "leadership"
    },
    { 
      id: 2, 
      text: "My manager gives me regular, constructive feedback on my performance.", 
      type: "rating",
      category: "communication"
    },
    { 
      id: 3, 
      text: "My manager recognizes my achievements and contributions.", 
      type: "rating",
      category: "recognition"
    },
    { 
      id: 4, 
      text: "My manager supports my professional development.", 
      type: "rating",
      category: "development"
    },
    { 
      id: 5, 
      text: "My manager creates an inclusive environment where everyone feels valued.", 
      type: "rating",
      category: "inclusion"
    },
    { 
      id: 6, 
      text: "What specific actions could your manager take to better support you?", 
      type: "open",
      category: "feedback"
    },
    { 
      id: 7, 
      text: "What is the most valuable thing your manager does that helps you succeed?", 
      type: "open",
      category: "feedback"
    }
  ]);
  
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: 1,
      name: "Standard Manager Effectiveness",
      description: "Basic assessment of manager performance across key areas",
      questions: [1, 2, 3, 4, 5, 6],
      isDefault: true
    },
    {
      id: 2,
      name: "Leadership Development",
      description: "Focused on leadership skills and development opportunities",
      questions: [1, 3, 4, 7]
    },
    {
      id: 3,
      name: "Communication Assessment",
      description: "Evaluate manager communication effectiveness",
      questions: [2, 5, 6, 7]
    }
  ]);
  
  const [newTemplate, setNewTemplate] = useState<Partial<Template>>({
    name: "",
    description: "",
    questions: []
  });
  
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);
  
  const addQuestion = () => {
    if (newQuestion.text.trim() === "") {
      toast({
        title: "Error",
        description: "Question text cannot be empty",
        variant: "destructive"
      });
      return;
    }
    
    const questionId = Math.max(0, ...questions.map(q => q.id)) + 1;
    const questionToAdd = {
      ...newQuestion,
      id: questionId
    };
    
    setQuestions([...questions, questionToAdd]);
    setNewQuestion({
      id: 0,
      text: "",
      type: "rating",
      options: [],
      category: "leadership"
    });
    
    toast({
      title: "Question Added",
      description: "New question has been added to the question bank"
    });
  };
  
  const toggleQuestionSelection = (questionId: number) => {
    if (selectedQuestions.includes(questionId)) {
      setSelectedQuestions(selectedQuestions.filter(id => id !== questionId));
    } else {
      setSelectedQuestions([...selectedQuestions, questionId]);
    }
  };
  
  const createTemplate = () => {
    if (newTemplate.name?.trim() === "") {
      toast({
        title: "Error",
        description: "Template name cannot be empty",
        variant: "destructive"
      });
      return;
    }
    
    if (!selectedQuestions.length) {
      toast({
        title: "Error",
        description: "Please select at least one question for the template",
        variant: "destructive"
      });
      return;
    }
    
    const templateId = Math.max(0, ...templates.map(t => t.id)) + 1;
    const templateToAdd: Template = {
      id: templateId,
      name: newTemplate.name || "New Template",
      description: newTemplate.description || "",
      questions: [...selectedQuestions]
    };
    
    setTemplates([...templates, templateToAdd]);
    setNewTemplate({
      name: "",
      description: "",
      questions: []
    });
    setSelectedQuestions([]);
    setActiveTab("templates");
    
    toast({
      title: "Template Created",
      description: "New question template has been created"
    });
  };
  
  const getQuestionById = (id: number) => {
    return questions.find(q => q.id === id);
  };
  
  const getQuestionTypeIcon = (type: QuestionType) => {
    switch(type) {
      case "rating":
        return <Star className="h-4 w-4 text-yellow-500" />;
      case "open":
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "multiple-choice":
        return <Check className="h-4 w-4 text-green-500" />;
      default:
        return <Star className="h-4 w-4" />;
    }
  };
  
  return (
    <MainLayout currentStage={currentStage}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-survey-darkText">
          Question Templates
        </h2>
        <p className="text-survey-lightText mt-2">
          Create and manage question templates for your surveys
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="questions">Question Bank</TabsTrigger>
          <TabsTrigger value="create-template">Create Template</TabsTrigger>
          <TabsTrigger value="create-question">Create Question</TabsTrigger>
        </TabsList>
        
        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Available Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {templates.map(template => (
                  <Card key={template.id} className="overflow-hidden">
                    <CardHeader className="pb-3 bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center">
                            {template.name}
                            {template.isDefault && (
                              <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">Default</span>
                            )}
                          </CardTitle>
                          <p className="text-sm text-survey-lightText mt-1">
                            {template.description}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Copy className="h-4 w-4 mr-1" />
                            Clone
                          </Button>
                          {!template.isDefault && (
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="questions">
                          <AccordionTrigger className="text-sm font-medium">
                            {template.questions.length} Questions
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2 pl-2">
                              {template.questions.map(questionId => {
                                const question = getQuestionById(questionId);
                                return question ? (
                                  <div key={questionId} className="flex items-center p-2 rounded-md hover:bg-gray-50">
                                    {getQuestionTypeIcon(question.type)}
                                    <span className="ml-2 text-sm">{question.text}</span>
                                  </div>
                                ) : null;
                              })}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                    <CardFooter className="border-t bg-gray-50 flex justify-between py-2">
                      <div className="text-xs text-survey-lightText">
                        {template.questions.length} questions ({template.questions.filter(q => getQuestionById(q)?.type === "rating").length} rating, {template.questions.filter(q => getQuestionById(q)?.type === "open").length} open-ended)
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Template Selected",
                            description: `Template "${template.name}" has been selected for your survey`
                          });
                        }}
                      >
                        Use Template
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              <div className="mt-6 flex justify-center">
                <Button onClick={() => setActiveTab("create-template")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="questions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Question Bank
                </div>
                <div className="flex items-center space-x-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Question Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                      <SelectItem value="open">Open-ended</SelectItem>
                      <SelectItem value="multiple">Multiple Choice</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab("create-question")}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Question
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Type</TableHead>
                    <TableHead>Question Text</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {questions.map(question => (
                    <TableRow key={question.id}>
                      <TableCell className="font-medium">
                        {getQuestionTypeIcon(question.type)}
                      </TableCell>
                      <TableCell>{question.text}</TableCell>
                      <TableCell>
                        <span className="capitalize">
                          {question.category}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="create-template">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    Template Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="template-name">Template Name</Label>
                      <Input
                        id="template-name"
                        placeholder="E.g., Leadership Assessment"
                        value={newTemplate.name || ""}
                        onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="template-description">Description</Label>
                      <Textarea
                        id="template-description"
                        placeholder="Describe the purpose of this template"
                        rows={3}
                        value={newTemplate.description || ""}
                        onChange={(e) => setNewTemplate({...newTemplate, description: e.target.value})}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    disabled={!newTemplate.name?.trim() || selectedQuestions.length === 0}
                    onClick={createTemplate}
                  >
                    Create Template
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MessageSquare className="mr-2 h-5 w-5" />
                      Select Questions
                    </div>
                    <p className="text-sm text-survey-lightText">
                      {selectedQuestions.length} questions selected
                    </p>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {questions.map(question => (
                      <div
                        key={question.id}
                        className={`p-3 rounded-md border flex items-center cursor-pointer transition-colors ${
                          selectedQuestions.includes(question.id) 
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-blue-200 hover:bg-gray-50"
                        }`}
                        onClick={() => toggleQuestionSelection(question.id)}
                      >
                        <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
                          selectedQuestions.includes(question.id) 
                            ? "bg-blue-500 text-white" 
                            : "bg-gray-100"
                        }`}>
                          {selectedQuestions.includes(question.id) && (
                            <Check className="h-3 w-3" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            {getQuestionTypeIcon(question.type)}
                            <span className="text-xs text-survey-lightText ml-2 capitalize">
                              {question.type}
                            </span>
                          </div>
                          <p className="text-survey-darkText">{question.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="create-question">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Create New Question
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="question-type">Question Type</Label>
                    <Select 
                      value={newQuestion.type}
                      onValueChange={(value: QuestionType) => 
                        setNewQuestion({...newQuestion, type: value})
                      }
                    >
                      <SelectTrigger id="question-type">
                        <SelectValue placeholder="Select question type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rating">Rating Scale</SelectItem>
                        <SelectItem value="open">Open-ended</SelectItem>
                        <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="question-category">Category</Label>
                    <Select 
                      value={newQuestion.category}
                      onValueChange={(value) => 
                        setNewQuestion({...newQuestion, category: value})
                      }
                    >
                      <SelectTrigger id="question-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="leadership">Leadership</SelectItem>
                        <SelectItem value="communication">Communication</SelectItem>
                        <SelectItem value="recognition">Recognition</SelectItem>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="inclusion">Inclusion</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="question-text">Question Text</Label>
                  <Textarea
                    id="question-text"
                    placeholder="Enter your question"
                    rows={3}
                    value={newQuestion.text}
                    onChange={(e) => setNewQuestion({...newQuestion, text: e.target.value})}
                  />
                </div>
                
                {newQuestion.type === "rating" && (
                  <div className="space-y-3 border-t pt-4">
                    <Label>Rating Scale Preview</Label>
                    <div className="flex justify-between space-x-2">
                      <RadioGroup className="flex space-x-6" defaultValue="3">
                        <div className="flex flex-col items-center">
                          <RadioGroupItem id="r1" value="1" />
                          <Label htmlFor="r1" className="text-xs mt-1">Strongly Disagree</Label>
                        </div>
                        <div className="flex flex-col items-center">
                          <RadioGroupItem id="r2" value="2" />
                          <Label htmlFor="r2" className="text-xs mt-1">Disagree</Label>
                        </div>
                        <div className="flex flex-col items-center">
                          <RadioGroupItem id="r3" value="3" />
                          <Label htmlFor="r3" className="text-xs mt-1">Neutral</Label>
                        </div>
                        <div className="flex flex-col items-center">
                          <RadioGroupItem id="r4" value="4" />
                          <Label htmlFor="r4" className="text-xs mt-1">Agree</Label>
                        </div>
                        <div className="flex flex-col items-center">
                          <RadioGroupItem id="r5" value="5" />
                          <Label htmlFor="r5" className="text-xs mt-1">Strongly Agree</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                )}
                
                {newQuestion.type === "multiple-choice" && (
                  <div className="space-y-3 border-t pt-4">
                    <Label>Answer Options</Label>
                    <div className="space-y-2">
                      {(newQuestion.options || []).map((option, index) => (
                        <div key={index} className="flex space-x-2">
                          <Input 
                            value={option} 
                            onChange={(e) => {
                              const newOptions = [...(newQuestion.options || [])];
                              newOptions[index] = e.target.value;
                              setNewQuestion({...newQuestion, options: newOptions});
                            }}
                          />
                          <Button 
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              const newOptions = (newQuestion.options || []).filter((_, i) => i !== index);
                              setNewQuestion({...newQuestion, options: newOptions});
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        onClick={() => {
                          const newOptions = [...(newQuestion.options || []), ""];
                          setNewQuestion({...newQuestion, options: newOptions});
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Option
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("questions")}>
                Cancel
              </Button>
              <Button onClick={addQuestion} disabled={!newQuestion.text.trim()}>
                Add Question
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default QuestionTemplates;
