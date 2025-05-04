import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart as BarChartIcon, FileText, Users, Book, Calendar, Mail, Phone, ArrowUpRight } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const ManagerProfile = () => {
  const [currentStage] = useState(7);
  
  // Mock manager data
  const manager = {
    id: "m123",
    name: "John Doe",
    title: "Engineering Director",
    department: "Engineering",
    team: "Frontend",
    email: "john.doe@company.com",
    phone: "+1 (555) 123-4567",
    startDate: "Jan 2020",
    directReports: 8,
    photoUrl: "", // In a real app, this would be a URL
    scores: {
      overall: 4.2,
      communication: 4.5,
      leadership: 4.0,
      recognition: 3.8,
      development: 4.3,
      inclusion: 4.4
    },
    strengths: [
      "Creating an inclusive environment",
      "Setting clear expectations",
      "Supporting team members"
    ],
    improvements: [
      "Providing regular feedback",
      "Recognizing achievements",
      "Work-life balance support"
    ],
    trends: {
      overall: [3.8, 3.9, 4.0, 4.2],
      surveys: ["Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024"]
    }
  };
  
  // Mock team member data
  const teamMembers = [
    { id: 1, name: "Alice Johnson", role: "Senior Developer", responseStatus: "completed" },
    { id: 2, name: "Bob Smith", role: "Developer", responseStatus: "completed" },
    { id: 3, name: "Charlie Brown", role: "UX Designer", responseStatus: "completed" },
    { id: 4, name: "Diana Prince", role: "QA Engineer", responseStatus: "completed" },
    { id: 5, name: "Edward Miller", role: "Developer", responseStatus: "completed" },
    { id: 6, name: "Fiona Davis", role: "Product Manager", responseStatus: "completed" },
    { id: 7, name: "George Wilson", role: "DevOps Engineer", responseStatus: "completed" },
    { id: 8, name: "Hannah Moore", role: "Developer", responseStatus: "completed" }
  ];
  
  // Mock training recommendations
  const trainingRecommendations = [
    {
      id: 1,
      title: "Effective Feedback Workshop",
      type: "Workshop",
      duration: "2 days",
      format: "In-person",
      priority: "high",
      status: "recommended"
    },
    {
      id: 2,
      title: "Recognition Strategies for Leaders",
      type: "Online Course",
      duration: "4 hours",
      format: "Self-paced",
      priority: "medium",
      status: "recommended"
    },
    {
      id: 3,
      title: "Work-Life Balance for Managers",
      type: "Webinar",
      duration: "1 hour",
      format: "Live online",
      priority: "medium",
      status: "recommended"
    }
  ];
  
  // Chart data for score breakdown
  const scoreData = [
    {
      category: "Communication",
      value: manager.scores.communication,
    },
    {
      category: "Leadership",
      value: manager.scores.leadership,
    },
    {
      category: "Recognition",
      value: manager.scores.recognition,
    },
    {
      category: "Development",
      value: manager.scores.development,
    },
    {
      category: "Inclusion",
      value: manager.scores.inclusion,
    }
  ];
  
  return (
    <MainLayout currentStage={currentStage}>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-survey-darkText">
            Manager Profile
          </h2>
          <p className="text-survey-lightText mt-1">
            Detailed view of manager performance and feedback
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Button variant="outline">
            Export Profile
          </Button>
          <Button>
            Create Action Plan
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl mb-4">
                {manager.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h3 className="text-xl font-bold text-survey-darkText">
                {manager.name}
              </h3>
              <p className="text-survey-lightText">
                {manager.title}
              </p>
              <div className="mt-2 flex items-center">
                <Badge>{manager.department}</Badge>
              </div>
            </div>
            
            <div className="mt-6 space-y-4">
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-survey-lightText mr-3" />
                <span className="text-sm">{manager.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-survey-lightText mr-3" />
                <span className="text-sm">{manager.phone}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-survey-lightText mr-3" />
                <span className="text-sm">Started {manager.startDate}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 text-survey-lightText mr-3" />
                <span className="text-sm">{manager.directReports} direct reports</span>
              </div>
            </div>
            
            <div className="mt-8 space-y-4">
              <div className="text-center p-4 bg-green-50 rounded-md">
                <p className="text-sm text-green-800 font-medium mb-1">Overall Rating</p>
                <p className="text-4xl font-bold text-green-700">{manager.scores.overall}</p>
                <p className="text-xs text-green-600 mt-1">
                  Compared to company average of 3.9
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-blue-50 rounded-md text-center">
                  <p className="text-sm font-medium text-blue-800 mb-1">Response Rate</p>
                  <p className="text-xl font-bold text-blue-700">100%</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-md text-center">
                  <p className="text-sm font-medium text-purple-800 mb-1">Surveys</p>
                  <p className="text-xl font-bold text-purple-700">4</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Score Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={scoreData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Score" fill="#4f46e5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Top Strengths</h4>
                <ul className="list-disc list-inside space-y-1">
                  {manager.strengths.map((strength, index) => (
                    <li key={index} className="text-sm">{strength}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Areas for Improvement</h4>
                <ul className="list-disc list-inside space-y-1">
                  {manager.improvements.map((item, index) => (
                    <li key={index} className="text-sm">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="feedback">
        <TabsList className="mb-6">
          <TabsTrigger value="feedback">Feedback Summary</TabsTrigger>
          <TabsTrigger value="team">Team Members</TabsTrigger>
          <TabsTrigger value="trends">Score Trends</TabsTrigger>
          <TabsTrigger value="development">Development Plan</TabsTrigger>
        </TabsList>
        
        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Feedback Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Communication & Leadership</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Clear expectations</span>
                        <span className="text-sm font-bold">4.5/5</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Timely communication</span>
                        <span className="text-sm font-bold">4.3/5</span>
                      </div>
                      <Progress value={86} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Feedback quality</span>
                        <span className="text-sm font-bold">3.8/5</span>
                      </div>
                      <Progress value={76} className="h-2" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Support & Development</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Career development</span>
                        <span className="text-sm font-bold">4.3/5</span>
                      </div>
                      <Progress value={86} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Recognition</span>
                        <span className="text-sm font-bold">3.8/5</span>
                      </div>
                      <Progress value={76} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Work-life support</span>
                        <span className="text-sm font-bold">3.9/5</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Representative Comments</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-md">
                      <p className="text-sm italic">
                        "John is excellent at creating an inclusive environment where everyone's voice is heard. Team meetings are productive and engaging."
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-md">
                      <p className="text-sm italic">
                        "I appreciate the clear direction and expectations. It makes it easier to prioritize my work."
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-md">
                      <p className="text-sm italic">
                        "I would appreciate more regular check-ins and feedback on my work. Sometimes it's hard to gauge how I'm performing."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Team Members ({teamMembers.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Survey Response</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamMembers.map(member => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          member.responseStatus === "completed" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {member.responseStatus === "completed" ? "Completed" : "Pending"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChartIcon className="mr-2 h-5 w-5" />
                Score Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                {/* Here you would render a chart showing trends over time */}
                <div className="flex h-full items-center justify-center">
                  <div className="w-full max-w-xl">
                    <div className="mb-6">
                      <h3 className="text-base font-medium mb-4">Overall Score Trend</h3>
                      <div className="relative h-10 bg-gray-100 rounded-lg overflow-hidden">
                        {manager.trends.overall.map((score, index) => {
                          const width = 100 / manager.trends.overall.length;
                          const left = index * width;
                          const height = (score / 5) * 100;
                          
                          return (
                            <div 
                              key={index}
                              className="absolute bottom-0 bg-blue-500"
                              style={{
                                left: `${left}%`,
                                width: `${width}%`,
                                height: `${height}%`
                              }}
                            />
                          );
                        })}
                      </div>
                      <div className="flex justify-between mt-2">
                        {manager.trends.surveys.map((label, index) => (
                          <div key={index} className="text-xs text-survey-lightText">
                            {label}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-green-50 rounded-md">
                        <p className="text-sm font-medium text-green-800">Highest Score</p>
                        <p className="text-2xl font-bold text-green-700">
                          {Math.max(...manager.trends.overall)}/5
                        </p>
                        <p className="text-xs text-green-600 mt-1">
                          Latest survey
                        </p>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-md">
                        <p className="text-sm font-medium text-blue-800">Improvement</p>
                        <p className="text-2xl font-bold text-blue-700">
                          +{(manager.trends.overall[manager.trends.overall.length-1] - manager.trends.overall[0]).toFixed(1)}
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                          Over {manager.trends.surveys.length} surveys
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <p className="text-sm font-medium mb-2">Key Observations:</p>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Consistent improvement in scores over time</li>
                        <li>Communication scores showing fastest growth</li>
                        <li>Recognition scores starting to improve in latest survey</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="development">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Book className="mr-2 h-5 w-5" />
                Development Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Training Recommendations</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {trainingRecommendations.map(training => (
                      <TableRow key={training.id}>
                        <TableCell className="font-medium">{training.title}</TableCell>
                        <TableCell>{training.type}</TableCell>
                        <TableCell>{training.duration}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            training.priority === "high" 
                              ? "bg-red-100 text-red-800" 
                              : training.priority === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}>
                            {training.priority.charAt(0).toUpperCase() + training.priority.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="sm">
                            Enroll
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Action Items</h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Implement regular feedback sessions</h4>
                        <p className="text-sm text-survey-lightText mt-1">
                          Schedule bi-weekly 1-on-1s with each team member focusing on constructive feedback
                        </p>
                      </div>
                      <Badge>High Priority</Badge>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Progress</span>
                        <span className="text-sm">25%</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Create recognition program</h4>
                        <p className="text-sm text-survey-lightText mt-1">
                          Implement a team recognition system to highlight achievements and contributions
                        </p>
                      </div>
                      <Badge>Medium Priority</Badge>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Progress</span>
                        <span className="text-sm">0%</span>
                      </div>
                      <Progress value={0} className="h-2" />
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Work-life balance improvements</h4>
                        <p className="text-sm text-survey-lightText mt-1">
                          Review meeting schedules and work distribution to improve team work-life balance
                        </p>
                      </div>
                      <Badge>Medium Priority</Badge>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Progress</span>
                        <span className="text-sm">10%</span>
                      </div>
                      <Progress value={10} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default ManagerProfile;
