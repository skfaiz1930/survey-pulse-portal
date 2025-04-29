
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { FileText, User, BookOpen, ArrowRight, Download, ChevronDown, ChevronUp } from "lucide-react";

const Reports = () => {
  const [currentStage] = useState(7);
  const navigate = useNavigate();
  
  const [expandedManager, setExpandedManager] = useState<string | null>(null);
  
  const toggleManagerExpand = (managerId: string) => {
    if (expandedManager === managerId) {
      setExpandedManager(null);
    } else {
      setExpandedManager(managerId);
    }
  };
  
  const handleNext = () => {
    navigate("/development");
  };
  
  return (
    <MainLayout currentStage={currentStage}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-survey-darkText">Reports</h2>
        <p className="text-survey-lightText mt-2">Access detailed reports and manager profiles</p>
      </div>
      
      <Tabs defaultValue="basic">
        <TabsList className="mb-6">
          <TabsTrigger value="basic">
            <FileText className="h-4 w-4 mr-2" />
            Basic Report
          </TabsTrigger>
          <TabsTrigger value="manager-profiles">
            <User className="h-4 w-4 mr-2" />
            Manager Profiles
          </TabsTrigger>
          <TabsTrigger value="lad">
            <BookOpen className="h-4 w-4 mr-2" />
            Learning & Development
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Overall Scores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-4 rounded-md text-center">
                    <p className="text-sm text-survey-lightText mb-1">Average Score</p>
                    <p className="text-2xl font-bold">4.2/5</p>
                    <div className="mt-1 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full inline-block">
                      +10.5% vs previous
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md text-center">
                    <p className="text-sm text-survey-lightText mb-1">Response Rate</p>
                    <p className="text-2xl font-bold">75%</p>
                    <p className="text-xs mt-1 text-survey-lightText">187 of 250 participants</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md text-center">
                    <p className="text-sm text-survey-lightText mb-1">Completion Time</p>
                    <p className="text-2xl font-bold">8.5 min</p>
                    <p className="text-xs mt-1 text-survey-lightText">Average per participant</p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="font-medium mb-4">Statement Scores</h4>
                  <div className="space-y-4">
                    {[
                      { text: "My manager provides clear direction on what is expected of me", score: 4.5 },
                      { text: "My manager provides regular, constructive feedback on my performance", score: 3.7 },
                      { text: "My manager recognizes my achievements and contributions", score: 4.3 },
                      { text: "My manager supports my professional development", score: 3.9 },
                      { text: "My manager creates an inclusive environment where everyone feels valued", score: 4.2 }
                    ].map((statement, index) => (
                      <div key={index} className="flex justify-between items-center pb-3 border-b border-gray-100">
                        <div className="text-sm max-w-md">{statement.text}</div>
                        <div className="flex items-center gap-2">
                          <div className="h-4 bg-blue-100 rounded-full w-20">
                            <div 
                              className="h-4 bg-blue-500 rounded-full" 
                              style={{ width: `${(statement.score / 5) * 100}%` }}
                            ></div>
                          </div>
                          <span className="font-medium">{statement.score}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="font-medium mb-4">Department Performance</h4>
                  <div className="space-y-4">
                    {[
                      { name: "HR", score: 4.5 },
                      { name: "Engineering", score: 4.3 },
                      { name: "Marketing", score: 4.1 },
                      { name: "Sales", score: 3.9 },
                      { name: "Product", score: 4.0 }
                    ].map((dept, index) => (
                      <div key={index} className="flex justify-between items-center pb-3 border-b border-gray-100">
                        <div className="text-sm">{dept.name}</div>
                        <div className="flex items-center gap-2">
                          <div className="h-4 bg-blue-100 rounded-full w-20">
                            <div 
                              className="h-4 bg-blue-500 rounded-full" 
                              style={{ width: `${(dept.score / 5) * 100}%` }}
                            ></div>
                          </div>
                          <span className="font-medium">{dept.score}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-xs text-survey-lightText">
                  Report generated on April 29, 2025
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    PDF
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Excel
                  </Button>
                </div>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>GTMWs</CardTitle>
                <p className="text-xs text-survey-lightText">Greatest Manager Traits to Work On</p>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  <li className="pb-3 border-b border-gray-100">
                    <div className="flex items-start gap-2">
                      <span className="bg-survey-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium">1</span>
                      <div>
                        <p className="font-medium">Providing regular feedback</p>
                        <p className="text-xs text-survey-lightText mt-1">
                          Managers need to provide more consistent feedback to team members.
                        </p>
                      </div>
                    </div>
                  </li>
                  
                  <li className="pb-3 border-b border-gray-100">
                    <div className="flex items-start gap-2">
                      <span className="bg-survey-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium">2</span>
                      <div>
                        <p className="font-medium">Supporting professional development</p>
                        <p className="text-xs text-survey-lightText mt-1">
                          Focus on providing more opportunities for skill development and career growth.
                        </p>
                      </div>
                    </div>
                  </li>
                  
                  <li className="pb-3 border-b border-gray-100">
                    <div className="flex items-start gap-2">
                      <span className="bg-survey-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium">3</span>
                      <div>
                        <p className="font-medium">Workload management</p>
                        <p className="text-xs text-survey-lightText mt-1">
                          Better distribution of work and prioritization of tasks.
                        </p>
                      </div>
                    </div>
                  </li>
                  
                  <li>
                    <div className="flex items-start gap-2">
                      <span className="bg-survey-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium">4</span>
                      <div>
                        <p className="font-medium">Effective team meetings</p>
                        <p className="text-xs text-survey-lightText mt-1">
                          Improve meeting efficiency and ensure all team members are heard.
                        </p>
                      </div>
                    </div>
                  </li>
                </ol>
                
                <div className="mt-8">
                  <h4 className="font-medium mb-3">Recommended Actions</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-survey-primary mr-2"></div>
                      <span>Implement bi-weekly 1:1 feedback sessions</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-survey-primary mr-2"></div>
                      <span>Create individual development plans</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-survey-primary mr-2"></div>
                      <span>Training on workload prioritization</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-survey-primary mr-2"></div>
                      <span>Workshop on effective meeting facilitation</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleNext}>
                  Go to Development
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="manager-profiles">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Manager Performance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div className="bg-gray-50 p-4 rounded-md text-center">
                      <p className="text-sm text-survey-lightText mb-1">Total Managers</p>
                      <p className="text-2xl font-bold">32</p>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-md text-center">
                      <p className="text-sm text-green-700 mb-1">High Performers</p>
                      <p className="text-2xl font-bold text-green-700">12</p>
                      <p className="text-xs mt-1 text-green-600">Score  4.5</p>
                    </div>
                    
                    <div className="bg-yellow-50 p-4 rounded-md text-center">
                      <p className="text-sm text-yellow-700 mb-1">Average Performers</p>
                      <p className="text-2xl font-bold text-yellow-700">16</p>
                      <p className="text-xs mt-1 text-yellow-600">Score 3.5-4.5</p>
                    </div>
                    
                    <div className="bg-red-50 p-4 rounded-md text-center">
                      <p className="text-sm text-red-700 mb-1">Needs Improvement</p>
                      <p className="text-2xl font-bold text-red-700">4</p>
                      <p className="text-xs mt-1 text-red-600">Score  3.5</p>
                    </div>
                  </div>
                  
                  <h4 className="font-medium mb-4">Top 5 Managers</h4>
                  <div className="space-y-4 mb-8">
                    {[
                      { id: "m1", name: "Sarah Johnson", role: "Engineering Manager", score: 4.8, department: "Engineering", directReports: 12, avatar: "SJ" },
                      { id: "m2", name: "Michael Chen", role: "Marketing Director", score: 4.7, department: "Marketing", directReports: 8, avatar: "MC" },
                      { id: "m3", name: "David Wilson", role: "HR Manager", score: 4.7, department: "HR", directReports: 5, avatar: "DW" },
                      { id: "m4", name: "Emily Rodriguez", role: "Product Manager", score: 4.6, department: "Product", directReports: 7, avatar: "ER" },
                      { id: "m5", name: "James Taylor", role: "Sales Manager", score: 4.6, department: "Sales", directReports: 10, avatar: "JT" }
                    ].map((manager) => (
                      <div key={manager.id}>
                        <div 
                          className="flex justify-between items-center pb-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors" 
                          onClick={() => toggleManagerExpand(manager.id)}
                        >
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarFallback className="bg-survey-primary text-white">{manager.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{manager.name}</p>
                              <p className="text-xs text-survey-lightText">{manager.role} • {manager.department}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="font-bold">{manager.score}/5</p>
                              <p className="text-xs text-survey-lightText">{manager.directReports} direct reports</p>
                            </div>
                            {expandedManager === manager.id ? 
                              <ChevronUp className="h-4 w-4" /> : 
                              <ChevronDown className="h-4 w-4" />
                            }
                          </div>
                        </div>
                        
                        {expandedManager === manager.id && (
                          <div className="mt-4 pl-12 pr-4 pb-4 space-y-4">
                            <div>
                              <h5 className="text-sm font-medium mb-2">Statement Scores</h5>
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <p className="text-xs">Clear direction</p>
                                  <div className="flex items-center gap-2">
                                    <Progress value={92} className="w-20 h-2" />
                                    <span className="text-xs font-medium">4.6</span>
                                  </div>
                                </div>
                                <div className="flex justify-between items-center">
                                  <p className="text-xs">Feedback</p>
                                  <div className="flex items-center gap-2">
                                    <Progress value={98} className="w-20 h-2" />
                                    <span className="text-xs font-medium">4.9</span>
                                  </div>
                                </div>
                                <div className="flex justify-between items-center">
                                  <p className="text-xs">Recognition</p>
                                  <div className="flex items-center gap-2">
                                    <Progress value={96} className="w-20 h-2" />
                                    <span className="text-xs font-medium">4.8</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h5 className="text-sm font-medium mb-2">Strengths</h5>
                              <ul className="list-disc list-inside text-xs space-y-1">
                                <li>Excellent at providing timely feedback</li>
                                <li>Creates an inclusive team environment</li>
                                <li>Recognizes team achievements consistently</li>
                              </ul>
                            </div>
                            
                            <div>
                              <h5 className="text-sm font-medium mb-2">Development Areas</h5>
                              <ul className="list-disc list-inside text-xs space-y-1">
                                <li>Could provide more opportunities for skill development</li>
                              </ul>
                            </div>
                            
                            <div className="pt-2">
                              <Button size="sm">View Full Profile</Button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <h4 className="font-medium mb-4">Managers Needing Improvement</h4>
                  <div className="space-y-4">
                    {[
                      { id: "m6", name: "Robert Brown", role: "Sales Team Lead", score: 3.2, department: "Sales", directReports: 6, avatar: "RB" },
                      { id: "m7", name: "Lisa Martinez", role: "Product Team Lead", score: 3.4, department: "Product", directReports: 5, avatar: "LM" }
                    ].map((manager) => (
                      <div key={manager.id}>
                        <div 
                          className="flex justify-between items-center pb-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors" 
                          onClick={() => toggleManagerExpand(manager.id)}
                        >
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarFallback className="bg-red-100 text-red-800">{manager.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{manager.name}</p>
                              <p className="text-xs text-survey-lightText">{manager.role} • {manager.department}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="font-bold">{manager.score}/5</p>
                              <p className="text-xs text-survey-lightText">{manager.directReports} direct reports</p>
                            </div>
                            {expandedManager === manager.id ? 
                              <ChevronUp className="h-4 w-4" /> : 
                              <ChevronDown className="h-4 w-4" />
                            }
                          </div>
                        </div>
                        
                        {expandedManager === manager.id && (
                          <div className="mt-4 pl-12 pr-4 pb-4 space-y-4">
                            <div>
                              <h5 className="text-sm font-medium mb-2">Statement Scores</h5>
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <p className="text-xs">Clear direction</p>
                                  <div className="flex items-center gap-2">
                                    <Progress value={60} className="w-20 h-2" />
                                    <span className="text-xs font-medium">3.0</span>
                                  </div>
                                </div>
                                <div className="flex justify-between items-center">
                                  <p className="text-xs">Feedback</p>
                                  <div className="flex items-center gap-2">
                                    <Progress value={50} className="w-20 h-2" />
                                    <span className="text-xs font-medium">2.5</span>
                                  </div>
                                </div>
                                <div className="flex justify-between items-center">
                                  <p className="text-xs">Recognition</p>
                                  <div className="flex items-center gap-2">
                                    <Progress value={70} className="w-20 h-2" />
                                    <span className="text-xs font-medium">3.5</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h5 className="text-sm font-medium mb-2">Development Areas</h5>
                              <ul className="list-disc list-inside text-xs space-y-1">
                                <li>Needs to improve communication and direction</li>
                                <li>Should provide more regular feedback</li>
                                <li>Development planning needs focus</li>
                              </ul>
                            </div>
                            
                            <div className="pt-2 flex gap-2">
                              <Button size="sm">View Full Profile</Button>
                              <Button size="sm" variant="outline">Create Action Plan</Button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="lad">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Learning and Development Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div>
                      <h4 className="font-medium mb-4">Organization-Wide Recommendations</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="border border-blue-100">
                          <CardHeader className="bg-blue-50 pb-2">
                            <CardTitle className="text-base">Feedback Training</CardTitle>
                          </CardHeader>
                          <CardContent className="pt-4">
                            <p className="text-sm">
                              Training on providing constructive, timely feedback to team members.
                            </p>
                            <div className="mt-4">
                              <p className="text-xs font-medium mb-1">Recommended for:</p>
                              <div className="flex flex-wrap gap-2">
                                <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">All Managers</span>
                                <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">Team Leads</span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="border-t pt-3">
                            <Button size="sm" className="w-full">View Resources</Button>
                          </CardFooter>
                        </Card>
                        
                        <Card className="border border-green-100">
                          <CardHeader className="bg-green-50 pb-2">
                            <CardTitle className="text-base">Career Development Planning</CardTitle>
                          </CardHeader>
                          <CardContent className="pt-4">
                            <p className="text-sm">
                              Workshop on creating effective development plans for team members.
                            </p>
                            <div className="mt-4">
                              <p className="text-xs font-medium mb-1">Recommended for:</p>
                              <div className="flex flex-wrap gap-2">
                                <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">HR Managers</span>
                                <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">Department Heads</span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="border-t pt-3">
                            <Button size="sm" className="w-full">View Resources</Button>
                          </CardFooter>
                        </Card>
                        
                        <Card className="border border-purple-100">
                          <CardHeader className="bg-purple-50 pb-2">
                            <CardTitle className="text-base">Inclusive Leadership</CardTitle>
                          </CardHeader>
                          <CardContent className="pt-4">
                            <p className="text-sm">
                              Training on creating inclusive teams and valuing diversity.
                            </p>
                            <div className="mt-4">
                              <p className="text-xs font-medium mb-1">Recommended for:</p>
                              <div className="flex flex-wrap gap-2">
                                <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">All Managers</span>
                                <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">HR</span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="border-t pt-3">
                            <Button size="sm" className="w-full">View Resources</Button>
                          </CardFooter>
                        </Card>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-4">Department-Specific Recommendations</h4>
                      <div className="space-y-6">
                        <div className="border rounded-md p-4">
                          <h4 className="font-medium mb-2">Sales Department</h4>
                          <div className="space-y-2">
                            <p className="text-sm"><span className="font-medium">Focus Area:</span> Team Communication</p>
                            <p className="text-sm"><span className="font-medium">Recommendation:</span> Workshop on effective team meetings and information sharing</p>
                            <p className="text-sm"><span className="font-medium">Why:</span> Survey results indicate communication challenges within sales teams</p>
                          </div>
                          <div className="mt-4">
                            <Button size="sm" variant="outline">Schedule Training</Button>
                          </div>
                        </div>
                        
                        <div className="border rounded-md p-4">
                          <h4 className="font-medium mb-2">Engineering Department</h4>
                          <div className="space-y-2">
                            <p className="text-sm"><span className="font-medium">Focus Area:</span> Recognition Practices</p>
                            <p className="text-sm"><span className="font-medium">Recommendation:</span> Training on meaningful recognition for technical achievements</p>
                            <p className="text-sm"><span className="font-medium">Why:</span> Recognition scores lower than other areas in engineering teams</p>
                          </div>
                          <div className="mt-4">
                            <Button size="sm" variant="outline">Schedule Training</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-4">Manager-Specific Development Plans</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="text-left py-2 px-4 border text-sm">Manager</th>
                              <th className="text-left py-2 px-4 border text-sm">Department</th>
                              <th className="text-left py-2 px-4 border text-sm">Development Area</th>
                              <th className="text-left py-2 px-4 border text-sm">Recommended Action</th>
                              <th className="text-left py-2 px-4 border text-sm">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-2 px-4 border text-sm">Robert Brown</td>
                              <td className="py-2 px-4 border text-sm">Sales</td>
                              <td className="py-2 px-4 border text-sm">Feedback & Communication</td>
                              <td className="py-2 px-4 border text-sm">1:1 coaching + Communication workshop</td>
                              <td className="py-2 px-4 border text-sm">
                                <Button size="sm">Create Plan</Button>
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border text-sm">Lisa Martinez</td>
                              <td className="py-2 px-4 border text-sm">Product</td>
                              <td className="py-2 px-4 border text-sm">Team Direction & Planning</td>
                              <td className="py-2 px-4 border text-sm">Strategic planning course + Mentoring</td>
                              <td className="py-2 px-4 border text-sm">
                                <Button size="sm">Create Plan</Button>
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border text-sm">John Wilson</td>
                              <td className="py-2 px-4 border text-sm">Engineering</td>
                              <td className="py-2 px-4 border text-sm">Recognition & Motivation</td>
                              <td className="py-2 px-4 border text-sm">Team motivation workshop</td>
                              <td className="py-2 px-4 border text-sm">
                                <Button size="sm">Create Plan</Button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleNext}>
                    Continue to Development
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Reports;
