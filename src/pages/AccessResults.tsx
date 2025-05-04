
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import { BarChart as BarChartIcon, Download, LineChart as LineChartIcon, PieChart as PieChartIcon } from "lucide-react";

const AccessResults = () => {
  const [currentStage] = useState(6);
  const [timeRange, setTimeRange] = useState("current");
  const [department, setDepartment] = useState("all");

  // Example data for charts
  const engagementData = [
    { name: "Communication", current: 4.2, previous: 3.8 },
    { name: "Recognition", current: 3.9, previous: 3.5 },
    { name: "Development", current: 4.0, previous: 3.7 },
    { name: "Support", current: 4.3, previous: 4.1 },
    { name: "Feedback", current: 3.7, previous: 3.3 },
  ];

  const departmentData = [
    { name: "Engineering", value: 4.3 },
    { name: "Marketing", value: 3.8 },
    { name: "HR", value: 4.5 },
    { name: "Sales", value: 3.9 },
    { name: "Product", value: 4.1 },
  ];

  const trendData = [
    { month: "Jan", score: 3.8 },
    { month: "Feb", score: 3.9 },
    { month: "Mar", score: 4.0 },
    { month: "Apr", score: 4.1 },
    { month: "May", score: 4.2 },
    { month: "Jun", score: 4.3 },
  ];

  const departmentOptions = ["All Departments", "Engineering", "Marketing", "HR", "Sales", "Product"];

  return (
    <MainLayout currentStage={currentStage}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-survey-darkText">
          Survey Results Dashboard
        </h2>
        <p className="text-survey-lightText mt-2">
          View and analyze survey results with detailed visualizations
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Survey</SelectItem>
              <SelectItem value="previous">Previous Survey</SelectItem>
              <SelectItem value="year">Last 12 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              {departmentOptions.map((dept) => (
                <SelectItem key={dept} value={dept.toLowerCase().replace(' ', '-')}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
          <Button>Export Results</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Average Response Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end space-x-2">
              <span className="text-4xl font-bold">4.2</span>
              <span className="text-sm text-green-600 pb-1">+0.3 from previous</span>
            </div>
            <p className="text-survey-lightText mt-2 text-sm">
              Out of 5.0 possible score
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Response Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end space-x-2">
              <span className="text-4xl font-bold">89%</span>
              <span className="text-sm text-green-600 pb-1">+5% from previous</span>
            </div>
            <p className="text-survey-lightText mt-2 text-sm">
              178 out of 200 participants responded
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Highest Scoring Area</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end space-x-2">
              <span className="text-2xl font-bold">Communication</span>
            </div>
            <p className="text-survey-lightText mt-2 text-sm">
              Average score of 4.5 out of 5.0
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChartIcon className="mr-2 h-5 w-5" />
            Engagement by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={engagementData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="current" name="Current" fill="#4f46e5" />
                <Bar dataKey="previous" name="Previous" fill="#9f9faa" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="departments">
        <TabsList>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>
        <TabsContent value="departments">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChartIcon className="mr-2 h-5 w-5" />
                Results by Department
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  {/* Department pie chart would go here */}
                  <div className="flex h-full items-center justify-center">
                    <div className="w-full max-w-md">
                      <div className="space-y-4">
                        {departmentData.map((item) => (
                          <div key={item.name} className="flex items-center">
                            <div className="w-48 mr-4">{item.name}</div>
                            <div className="flex-1">
                              <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-blue-500 rounded-full"
                                  style={{
                                    width: `${(item.value / 5) * 100}%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                            <div className="w-10 text-right ml-4 font-medium">
                              {item.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <LineChartIcon className="mr-2 h-5 w-5" />
                Score Trends Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  {/* Line chart trend visualization would go here */}
                  <div className="flex h-full items-center justify-center">
                    <div className="w-full">
                      <div className="relative h-60">
                        {/* X-axis */}
                        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-survey-lightText">
                          {trendData.map((data) => (
                            <div key={data.month} className="text-center">
                              {data.month}
                            </div>
                          ))}
                        </div>
                        
                        {/* Y-axis */}
                        <div className="absolute top-0 left-0 bottom-8 flex flex-col justify-between items-end pr-2 text-xs text-survey-lightText">
                          <div>5.0</div>
                          <div>4.0</div>
                          <div>3.0</div>
                          <div>2.0</div>
                          <div>1.0</div>
                        </div>
                        
                        {/* Line chart */}
                        <div className="absolute left-8 right-0 bottom-8 top-0">
                          <svg className="w-full h-full">
                            <path
                              d={`M 0 ${100 - ((trendData[0].score - 1) / 4) * 100} ${trendData.map(
                                (data, i) =>
                                  ` L ${(i * 100) / (trendData.length - 1)} ${
                                    100 - ((data.score - 1) / 4) * 100
                                  }`
                              ).join("")}`}
                              fill="none"
                              stroke="#4f46e5"
                              strokeWidth="2"
                            />
                            {trendData.map((data, i) => (
                              <circle
                                key={i}
                                cx={(i * 100) / (trendData.length - 1)}
                                cy={100 - ((data.score - 1) / 4) * 100}
                                r="4"
                                fill="#4f46e5"
                              />
                            ))}
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-md">
                  <p className="text-sm font-medium">Highest Month</p>
                  <p className="text-xl font-bold">June (4.3)</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-md">
                  <p className="text-sm font-medium">Average Trend</p>
                  <p className="text-xl font-bold">Increasing</p>
                  <p className="text-xs text-survey-lightText">
                    +0.5 points over 6 months
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex justify-end">
        <Button onClick={() => window.location.href = "/reports"}>
          View Detailed Reports
        </Button>
      </div>
    </MainLayout>
  );
};

export default AccessResults;
