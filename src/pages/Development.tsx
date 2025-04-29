
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { BellRing, Kanban, ChevronRight, MessagesSquare, CalendarDays, Clock, Check, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Development = () => {
  const [currentStage] = useState(8);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Nudge toggle state
  const [nudgeSettings, setNudgeSettings] = useState({
    slackEnabled: true,
    emailEnabled: true,
    weeklyDigest: true,
    performanceReminders: true
  });
  
  const handleNudgeToggle = (setting: keyof typeof nudgeSettings) => {
    setNudgeSettings({
      ...nudgeSettings,
      [setting]: !nudgeSettings[setting]
    });
    
    toast({
      title: "Setting Updated",
      description: `${setting} has been ${!nudgeSettings[setting] ? "enabled" : "disabled"}.`
    });
  };
  
  const handleActionComplete = (actionId: number) => {
    // Here you would update the action plan status
    console.log(`Marking action ${actionId} as complete`);
    
    toast({
      title: "Action Completed",
      description: "This action has been marked as complete."
    });
  };
  
  const handleNext = () => {
    navigate("/knowledge-hub");
  };
  
  return (
    <MainLayout currentStage={currentStage}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-survey-darkText">Development</h2>
        <p className="text-survey-lightText mt-2">Manager development tools and action planning</p>
      </div>
      
      <Tabs defaultValue="nudges">
        <TabsList className="mb-6">
          <TabsTrigger value="nudges">
            <BellRing className="h-4 w-4 mr-2" />
            Nudges Dashboard
          </TabsTrigger>
          <TabsTrigger value="action-planning">
            <Kanban className="h-4 w-4 mr-2" />
            Action Planning
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="nudges">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Manager Nudges</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-survey-lightText mb-6">
                    ML-driven nudges help managers improve their performance based on survey results.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="border rounded-md overflow-hidden">
                      <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Team Recognition</h4>
                          <p className="text-xs text-survey-lightText">Targets: Engineering Managers</p>
                        </div>
                        <Badge variant="outline">Active</Badge>
                      </div>
                      <div className="p-4">
                        <div className="flex gap-4 mb-4">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-survey-primary text-white">
                              <MessagesSquare className="h-5 w-5" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p>
                              "Consider recognizing team members who contributed to the recent product launch. 
                              Specific recognition boosts engagement by 40%."
                            </p>
                            <div className="flex items-center mt-2">
                              <Clock className="h-4 w-4 text-survey-lightText mr-1" />
                              <span className="text-xs text-survey-lightText">Sent yesterday at 9:00 AM via Slack</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline">Preview</Button>
                          <Button size="sm" variant="outline">Edit</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md overflow-hidden">
                      <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Feedback Consistency</h4>
                          <p className="text-xs text-survey-lightText">Targets: All Low-scoring Managers</p>
                        </div>
                        <Badge variant="outline">Active</Badge>
                      </div>
                      <div className="p-4">
                        <div className="flex gap-4 mb-4">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-survey-primary text-white">
                              <CalendarDays className="h-5 w-5" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p>
                              "It's been 2 weeks since your last 1:1 with some team members. 
                              Regular check-ins improve team performance by 23%."
                            </p>
                            <div className="flex items-center mt-2">
                              <Clock className="h-4 w-4 text-survey-lightText mr-1" />
                              <span className="text-xs text-survey-lightText">Scheduled for tomorrow at 8:00 AM via Email</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline">Preview</Button>
                          <Button size="sm" variant="outline">Edit</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md overflow-hidden">
                      <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Development Planning</h4>
                          <p className="text-xs text-survey-lightText">Targets: Mid-level Managers</p>
                        </div>
                        <Badge variant="outline">Draft</Badge>
                      </div>
                      <div className="p-4">
                        <div className="flex gap-4 mb-4">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-survey-primary text-white">
                              <BellRing className="h-5 w-5" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p>
                              "Have you discussed development goals with your team this quarter? 
                              Teams with clear development plans show 30% higher retention."
                            </p>
                            <div className="flex items-center mt-2">
                              <Clock className="h-4 w-4 text-survey-lightText mr-1" />
                              <span className="text-xs text-survey-lightText">Not scheduled yet</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm">Schedule</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Nudge Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="slack-nudges">Slack Nudges</Label>
                        <p className="text-sm text-survey-lightText">
                          Send nudges via Slack
                        </p>
                      </div>
                      <Switch
                        id="slack-nudges"
                        checked={nudgeSettings.slackEnabled}
                        onCheckedChange={() => handleNudgeToggle("slackEnabled")}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-nudges">Email Nudges</Label>
                        <p className="text-sm text-survey-lightText">
                          Send nudges via email
                        </p>
                      </div>
                      <Switch
                        id="email-nudges"
                        checked={nudgeSettings.emailEnabled}
                        onCheckedChange={() => handleNudgeToggle("emailEnabled")}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="weekly-digest">Weekly Digest</Label>
                        <p className="text-sm text-survey-lightText">
                          Send a weekly summary to managers
                        </p>
                      </div>
                      <Switch
                        id="weekly-digest"
                        checked={nudgeSettings.weeklyDigest}
                        onCheckedChange={() => handleNudgeToggle("weeklyDigest")}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="performance-reminders">Performance Reminders</Label>
                        <p className="text-sm text-survey-lightText">
                          Send reminders about low scores
                        </p>
                      </div>
                      <Switch
                        id="performance-reminders"
                        checked={nudgeSettings.performanceReminders}
                        onCheckedChange={() => handleNudgeToggle("performanceReminders")}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="w-full p-4 bg-blue-50 rounded-md border border-blue-100">
                    <h4 className="font-medium mb-2 text-survey-primary">HRMS Integration</h4>
                    <p className="text-sm mb-3">
                      Connect your HRMS to automatically sync manager data and send targeted nudges.
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      Connect Workday
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="action-planning">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-3">
              <Card>
                <CardHeader className="border-b">
                  <CardTitle>Manager Action Plans</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 divide-y">
                    <div className="p-6">
                      <div className="flex justify-between mb-4">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarFallback className="bg-red-100 text-red-800">RB</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Robert Brown</p>
                            <p className="text-xs text-survey-lightText">Sales Team Lead • Score: 3.2/5</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="mr-4 text-right">
                            <p className="text-sm font-medium">2 of 5 completed</p>
                            <Progress value={40} className="h-2 w-24" />
                          </div>
                          <Button size="sm" variant="outline">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="pl-12">
                        <h4 className="font-medium mb-3">Action Items:</h4>
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <div className="bg-green-100 rounded-full p-1 mr-3 mt-0.5">
                              <Check className="h-3 w-3 text-green-700" />
                            </div>
                            <div>
                              <p className="text-sm line-through text-survey-lightText">Complete communication workshop</p>
                              <p className="text-xs text-survey-lightText">Completed on April 25, 2025</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="bg-green-100 rounded-full p-1 mr-3 mt-0.5">
                              <Check className="h-3 w-3 text-green-700" />
                            </div>
                            <div>
                              <p className="text-sm line-through text-survey-lightText">Set up weekly 1:1s with all direct reports</p>
                              <p className="text-xs text-survey-lightText">Completed on April 26, 2025</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="rounded-full p-1 h-auto w-auto mr-3"
                              onClick={() => handleActionComplete(1)}
                            >
                              <div className="h-4 w-4 border-2 border-survey-lightText rounded-full" />
                            </Button>
                            <p className="text-sm">Create feedback template for team meetings</p>
                          </div>
                          <div className="flex items-start">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="rounded-full p-1 h-auto w-auto mr-3"
                              onClick={() => handleActionComplete(2)}
                            >
                              <div className="h-4 w-4 border-2 border-survey-lightText rounded-full" />
                            </Button>
                            <p className="text-sm">Complete online course: "Effective Feedback"</p>
                          </div>
                          <div className="flex items-start">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="rounded-full p-1 h-auto w-auto mr-3"
                              onClick={() => handleActionComplete(3)}
                            >
                              <div className="h-4 w-4 border-2 border-survey-lightText rounded-full" />
                            </Button>
                            <p className="text-sm">Schedule feedback session with mentor</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex justify-between mb-4">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarFallback className="bg-red-100 text-red-800">LM</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Lisa Martinez</p>
                            <p className="text-xs text-survey-lightText">Product Team Lead • Score: 3.4/5</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="mr-4 text-right">
                            <p className="text-sm font-medium">1 of 4 completed</p>
                            <Progress value={25} className="h-2 w-24" />
                          </div>
                          <Button size="sm" variant="outline">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="pl-12">
                        <h4 className="font-medium mb-3">Action Items:</h4>
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <div className="bg-green-100 rounded-full p-1 mr-3 mt-0.5">
                              <Check className="h-3 w-3 text-green-700" />
                            </div>
                            <div>
                              <p className="text-sm line-through text-survey-lightText">Create team development vision document</p>
                              <p className="text-xs text-survey-lightText">Completed on April 27, 2025</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="rounded-full p-1 h-auto w-auto mr-3"
                              onClick={() => handleActionComplete(4)}
                            >
                              <div className="h-4 w-4 border-2 border-survey-lightText rounded-full" />
                            </Button>
                            <p className="text-sm">Complete strategic planning course</p>
                          </div>
                          <div className="flex items-start">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="rounded-full p-1 h-auto w-auto mr-3"
                              onClick={() => handleActionComplete(5)}
                            >
                              <div className="h-4 w-4 border-2 border-survey-lightText rounded-full" />
                            </Button>
                            <p className="text-sm">Schedule mentoring sessions with Director</p>
                          </div>
                          <div className="flex items-start">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="rounded-full p-1 h-auto w-auto mr-3"
                              onClick={() => handleActionComplete(6)}
                            >
                              <div className="h-4 w-4 border-2 border-survey-lightText rounded-full" />
                            </Button>
                            <p className="text-sm">Create individual development plans for team members</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex justify-between mb-4">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarFallback className="bg-yellow-100 text-yellow-800">JW</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">John Wilson</p>
                            <p className="text-xs text-survey-lightText">Engineering Manager • Score: 3.7/5</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="mr-4 text-right">
                            <p className="text-sm font-medium">2 of 3 completed</p>
                            <Progress value={66} className="h-2 w-24" />
                          </div>
                          <Button size="sm" variant="outline">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="pl-12">
                        <h4 className="font-medium mb-3">Action Items:</h4>
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <div className="bg-green-100 rounded-full p-1 mr-3 mt-0.5">
                              <Check className="h-3 w-3 text-green-700" />
                            </div>
                            <div>
                              <p className="text-sm line-through text-survey-lightText">Implement team recognition program</p>
                              <p className="text-xs text-survey-lightText">Completed on April 20, 2025</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="bg-green-100 rounded-full p-1 mr-3 mt-0.5">
                              <Check className="h-3 w-3 text-green-700" />
                            </div>
                            <div>
                              <p className="text-sm line-through text-survey-lightText">Complete motivation workshop</p>
                              <p className="text-xs text-survey-lightText">Completed on April 24, 2025</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="rounded-full p-1 h-auto w-auto mr-3"
                              onClick={() => handleActionComplete(7)}
                            >
                              <div className="h-4 w-4 border-2 border-survey-lightText rounded-full" />
                            </Button>
                            <p className="text-sm">Create technical achievement recognition criteria</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t p-4">
                  <div className="w-full flex justify-between items-center">
                    <p className="text-sm text-survey-lightText">3 action plans shown</p>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Action Plan
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 flex justify-end">
        <Button onClick={handleNext}>
          Continue to Knowledge Hub
        </Button>
      </div>
    </MainLayout>
  );
};

export default Development;
