
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, PieChart, LineChart, Download, Filter } from "lucide-react";

const AccessResults = () => {
  const [currentStage] = useState(6);
  const navigate = useNavigate();
  
  // Sample data
  const overallScore = 4.2;
  const previousScore = 3.8;
  const percentChange = ((overallScore - previousScore) / previousScore * 100).toFixed(1);
  
  const topStatements = [
    { id: 1, text: "My manager provides clear direction on what is expected of me", score: 4.5 },
    { id: 2, text: "My manager recognizes my achievements and contributions", score: 4.3 },
    { id: 3, text: "My manager creates an inclusive environment where everyone feels valued", score: 4.2 },
  ];
  
  const bottomStatements = [
    { id: 1, text: "My manager provides regular, constructive feedback", score: 3.7 },
    { id: 2, text: "My manager supports my professional development", score: 3.9 },
  ];
  
  const handleViewReports = () => {
    navigate("/reports");
  };
  
  return (
    <MainLayout currentStage={currentStage}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-survey-darkText">Access Results</h2>
        <p className="text-survey-lightText mt-2">View and analyze survey results and insights</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-survey-lightText">Overall Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <div className="text-3xl font-bold">{overallScore}</div>
              <div className="text-base">/ 5</div>
              <div className={`text-sm ml-2 ${Number(percentChange) >= 0 ? "text-green-600" : "text-red-600"}`}>
                {Number(percentChange) >= 0 ? "+" : ""}{percentChange}%
              </div>
            </div>
            <div className="flex items-center mt-2">
              <div className="text-xs text-survey-lightText">vs. previous survey ({previousScore})</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-survey-lightText">Response Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">75%</div>
            <div className="flex items-center mt-2">
              <div className="text-xs text-survey-lightText">187 of 250 participants responded</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-survey-lightText">Top Scoring Department</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">HR</div>
            <div className="flex items-center mt-2">
              <div className="text-xs text-survey-lightText">Average score: 4.5/5</div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList>
          <TabsTrigger value="overview">
            <BarChart className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="demographics">
            <PieChart className="h-4 w-4 mr-2" />
            Demographics
          </TabsTrigger>
          <TabsTrigger value="trends">
            <LineChart className="h-4 w-4 mr-2" />
            Trends
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Statement Scores</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-survey-darkText">Highest Rated</h4>
                      <span className="text-sm text-survey-lightText">Score (out of 5)</span>
                    </div>
                    
                    {topStatements.map(statement => (
                      <div key={statement.id} className="flex justify-between items-center pb-3 border-b border-gray-100">
                        <div className="text-sm">{statement.text}</div>
                        <div className="flex items-center gap-2">
                          <div className="h-4 bg-green-100 rounded-full w-20">
                            <div 
                              className="h-4 bg-green-500 rounded-full" 
                              style={{ width: `${(statement.score / 5) * 100}%` }}
                            ></div>
                          </div>
                          <span className="font-medium">{statement.score}</span>
                        </div>
                      </div>
                    ))}
                    
                    <div className="flex justify-between items-center mb-2 pt-4">
                      <h4 className="font-medium text-survey-darkText">Lowest Rated</h4>
                      <span className="text-sm text-survey-lightText">Score (out of 5)</span>
                    </div>
                    
                    {bottomStatements.map(statement => (
                      <div key={statement.id} className="flex justify-between items-center pb-3 border-b border-gray-100">
                        <div className="text-sm">{statement.text}</div>
                        <div className="flex items-center gap-2">
                          <div className="h-4 bg-yellow-100 rounded-full w-20">
                            <div 
                              className="h-4 bg-yellow-500 rounded-full" 
                              style={{ width: `${(statement.score / 5) * 100}%` }}
                            ></div>
                          </div>
                          <span className="font-medium">{statement.score}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-survey-lightText">
                    Based on responses from 187 participants
                  </div>
                </CardFooter>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Key Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                      <h4 className="font-medium text-blue-800 mb-1">Communication Strength</h4>
                      <p className="text-sm">Managers excel at providing clear directions and expectations.</p>
                    </div>
                    
                    <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded">
                      <h4 className="font-medium text-green-800 mb-1">Recognition</h4>
                      <p className="text-sm">Strong results in recognizing achievements and contributions.</p>
                    </div>
                    
                    <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                      <h4 className="font-medium text-yellow-800 mb-1">Area for Improvement</h4>
                      <p className="text-sm">Regular feedback mechanisms could be strengthened.</p>
                    </div>
                    
                    <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                      <h4 className="font-medium text-yellow-800 mb-1">Development Focus</h4>
                      <p className="text-sm">Supporting professional development needs more attention.</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export Excel
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="demographics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Results by Department</CardTitle>
                <Select defaultValue="score">
                  <SelectTrigger className="w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="View By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="score">Average Score</SelectItem>
                    <SelectItem value="response">Response Rate</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "HR", score: 4.5, responses: 18 },
                    { name: "Engineering", score: 4.3, responses: 65 },
                    { name: "Marketing", score: 4.1, responses: 38 },
                    { name: "Sales", score: 3.9, responses: 40 },
                    { name: "Product", score: 4.0, responses: 26 }
                  ].map(dept => (
                    <div key={dept.name} className="flex justify-between items-center pb-3 border-b border-gray-100">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-survey-primary mr-2"></div>
                        <span>{dept.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-4 bg-blue-100 rounded-full w-24">
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
                <div className="mt-6">
                  <p className="text-xs text-survey-lightText">
                    Chart placeholder (pie chart would be rendered here)
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Results by Tenure</CardTitle>
                <Select defaultValue="score">
                  <SelectTrigger className="w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="View By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="score">Average Score</SelectItem>
                    <SelectItem value="response">Response Rate</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { group: "< 1 year", score: 4.4, responses: 35 },
                    { group: "1-3 years", score: 4.2, responses: 62 },
                    { group: "3-5 years", score: 4.0, responses: 45 },
                    { group: "5-10 years", score: 4.1, responses: 30 },
                    { group: "> 10 years", score: 4.3, responses: 15 }
                  ].map(tenure => (
                    <div key={tenure.group} className="flex justify-between items-center pb-3 border-b border-gray-100">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-survey-primary mr-2"></div>
                        <span>{tenure.group}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-4 bg-blue-100 rounded-full w-24">
                          <div 
                            className="h-4 bg-blue-500 rounded-full" 
                            style={{ width: `${(tenure.score / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span className="font-medium">{tenure.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <p className="text-xs text-survey-lightText">
                    Chart placeholder (bar chart would be rendered here)
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Detailed Demographic Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">By Department</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">HR</span>
                        <span className="text-sm font-medium">18 responses</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Engineering</span>
                        <span className="text-sm font-medium">65 responses</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Marketing</span>
                        <span className="text-sm font-medium">38 responses</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Sales</span>
                        <span className="text-sm font-medium">40 responses</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Product</span>
                        <span className="text-sm font-medium">26 responses</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">By Tenure</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">< 1 year</span>
                        <span className="text-sm font-medium">35 responses</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">1-3 years</span>
                        <span className="text-sm font-medium">62 responses</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">3-5 years</span>
                        <span className="text-sm font-medium">45 responses</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">5-10 years</span>
                        <span className="text-sm font-medium">30 responses</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">> 10 years</span>
                        <span className="text-sm font-medium">15 responses</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">By Level</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Individual Contributor</span>
                        <span className="text-sm font-medium">115 responses</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Team Lead</span>
                        <span className="text-sm font-medium">42 responses</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Manager</span>
                        <span className="text-sm font-medium">25 responses</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Director</span>
                        <span className="text-sm font-medium">5 responses</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Trend Analysis: Current vs Previous Surveys</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h4 className="font-medium mb-3">Overall Score Trend</h4>
                  <div className="h-40 bg-gray-50 rounded-md flex items-center justify-center border">
                    <p className="text-survey-lightText">Line chart would be rendered here showing score trends over time</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Top Improvements</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="text-sm">Recognition of achievements</div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium">+0.6</span>
                          <div className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded">
                            +15%
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm">Clear communication</div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium">+0.4</span>
                          <div className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded">
                            +10%
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm">Inclusive environment</div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium">+0.3</span>
                          <div className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded">
                            +7.5%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Areas of Decline</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="text-sm">Supporting professional development</div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium">-0.2</span>
                          <div className="ml-2 px-2 py-0.5 text-xs bg-red-100 text-red-800 rounded">
                            -5%
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm">Regular constructive feedback</div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium">-0.1</span>
                          <div className="ml-2 px-2 py-0.5 text-xs bg-red-100 text-red-800 rounded">
                            -2.5%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Response Rate Trend</h4>
                  <div className="h-40 bg-gray-50 rounded-md flex items-center justify-center border">
                    <p className="text-survey-lightText">Bar chart would be rendered here showing response rate trends</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-xs text-survey-lightText">
                Data comparison between current survey and previous survey from October 2024
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Trend Report
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 flex justify-end">
        <Button onClick={handleViewReports}>
          View Detailed Reports
        </Button>
      </div>
    </MainLayout>
  );
};

export default AccessResults;
