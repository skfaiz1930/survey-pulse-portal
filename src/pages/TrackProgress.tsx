
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Activity, Mail, Users, BarChart, Send, Filter } from "lucide-react";

const TrackProgress = () => {
  const [currentStage] = useState(5);
  const navigate = useNavigate();
  
  // Sample response data
  const responseRate = 75;
  const totalParticipants = 250;
  const respondedParticipants = Math.floor(totalParticipants * (responseRate / 100));
  
  // Sample email metrics
  const emailMetrics = {
    sent: 250,
    opened: 210,
    clicked: 185,
    completed: 187,
    bounced: 5
  };
  
  // Sample participant status data
  const participantStatus = [
    { id: 1, name: "Emma Johnson", email: "emma.j@company.com", department: "Marketing", status: "completed", completedAt: "2025-04-22 14:30" },
    { id: 2, name: "Michael Chen", email: "m.chen@company.com", department: "Engineering", status: "pending", completedAt: null },
    { id: 3, name: "Sarah Williams", email: "s.williams@company.com", department: "HR", status: "completed", completedAt: "2025-04-25 09:15" },
    { id: 4, name: "James Rodriguez", email: "j.rod@company.com", department: "Sales", status: "completed", completedAt: "2025-04-24 16:45" },
    { id: 5, name: "Olivia Martin", email: "o.martin@company.com", department: "Product", status: "pending", completedAt: null },
    { id: 6, name: "William Davis", email: "w.davis@company.com", department: "Engineering", status: "completed", completedAt: "2025-04-23 11:20" },
    { id: 7, name: "Sophia Garcia", email: "s.garcia@company.com", department: "Marketing", status: "bounced", completedAt: null },
    { id: 8, name: "Benjamin Taylor", email: "b.taylor@company.com", department: "Sales", status: "pending", completedAt: null }
  ];
  
  const departmentBreakdown = [
    { department: "Marketing", total: 50, completed: 38, percentage: 76 },
    { department: "Engineering", total: 80, completed: 65, percentage: 81 },
    { department: "HR", total: 20, completed: 18, percentage: 90 },
    { department: "Sales", total: 60, completed: 40, percentage: 67 },
    { department: "Product", total: 40, completed: 26, percentage: 65 }
  ];
  
  // Department filter state
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  // Apply filters to participant data
  const filteredParticipants = participantStatus.filter(participant => {
    const matchesDepartment = departmentFilter === "all" || participant.department === departmentFilter;
    const matchesStatus = statusFilter === "all" || participant.status === statusFilter;
    return matchesDepartment && matchesStatus;
  });
  
  const handleResendEmail = (participantId: number) => {
    // Here you would implement the email resend functionality
    console.log(`Resending email to participant ${participantId}`);
  };
  
  const handleViewResults = () => {
    navigate("/access-results");
  };
  
  return (
    <MainLayout currentStage={currentStage}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-survey-darkText">Track Survey Progress</h2>
        <p className="text-survey-lightText mt-2">Monitor response rates and survey completion in real-time</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-survey-lightText">Response Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <div className="text-2xl font-bold">{responseRate}%</div>
              <Progress value={responseRate} className="h-2 mt-2 mb-1" />
              <p className="text-xs text-survey-lightText mt-1">
                {respondedParticipants} of {totalParticipants} participants
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-survey-lightText">Time Remaining</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <div className="text-2xl font-bold">5 days</div>
              <Progress value={65} className="h-2 mt-2 mb-1" />
              <p className="text-xs text-survey-lightText mt-1">
                Ends on April 30, 2025
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-survey-lightText">Average Completion Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <div className="text-2xl font-bold">8.5 minutes</div>
              <div className="flex items-center mt-2">
                <Activity className="h-4 w-4 text-survey-primary mr-1" />
                <span className="text-xs text-survey-primary">On track with expectations</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="responses">
        <TabsList className="mb-6">
          <TabsTrigger value="responses">
            <Activity className="h-4 w-4 mr-2" />
            Response Tracking
          </TabsTrigger>
          <TabsTrigger value="emails">
            <Mail className="h-4 w-4 mr-2" />
            Email Metrics
          </TabsTrigger>
          <TabsTrigger value="departments">
            <Users className="h-4 w-4 mr-2" />
            Department Breakdown
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="responses">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <CardTitle>Participant Status</CardTitle>
                <div className="flex flex-wrap gap-3">
                  <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                    <SelectTrigger className="w-[150px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="HR">HR</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="Product">Product</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[150px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="bounced">Bounced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Completed</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredParticipants.map(participant => (
                    <TableRow key={participant.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{participant.name}</p>
                          <p className="text-sm text-survey-lightText">{participant.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{participant.department}</TableCell>
                      <TableCell>
                        <Badge variant={
                          participant.status === "completed" ? "default" : 
                          participant.status === "pending" ? "outline" : "destructive"
                        }>
                          {participant.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {participant.completedAt || "Not completed"}
                      </TableCell>
                      <TableCell>
                        {participant.status !== "completed" && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleResendEmail(participant.id)}
                          >
                            <Send className="h-3.5 w-3.5 mr-1" />
                            Resend
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="emails">
          <Card>
            <CardHeader>
              <CardTitle>Email Campaign Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="bg-gray-50 p-4 rounded-md text-center">
                  <p className="text-sm text-survey-lightText">Sent</p>
                  <p className="text-xl font-bold mt-1">{emailMetrics.sent}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md text-center">
                  <p className="text-sm text-survey-lightText">Opened</p>
                  <p className="text-xl font-bold mt-1">{emailMetrics.opened}</p>
                  <p className="text-xs text-survey-lightText mt-1">{Math.round((emailMetrics.opened / emailMetrics.sent) * 100)}%</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md text-center">
                  <p className="text-sm text-survey-lightText">Clicked</p>
                  <p className="text-xl font-bold mt-1">{emailMetrics.clicked}</p>
                  <p className="text-xs text-survey-lightText mt-1">{Math.round((emailMetrics.clicked / emailMetrics.sent) * 100)}%</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md text-center">
                  <p className="text-sm text-survey-lightText">Completed</p>
                  <p className="text-xl font-bold mt-1">{emailMetrics.completed}</p>
                  <p className="text-xs text-survey-lightText mt-1">{Math.round((emailMetrics.completed / emailMetrics.sent) * 100)}%</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md text-center">
                  <p className="text-sm text-survey-lightText">Bounced</p>
                  <p className="text-xl font-bold mt-1">{emailMetrics.bounced}</p>
                  <p className="text-xs text-survey-lightText mt-1">{Math.round((emailMetrics.bounced / emailMetrics.sent) * 100)}%</p>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-medium mb-4">Recent Email Activity</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email Type</TableHead>
                      <TableHead>Sent Date</TableHead>
                      <TableHead>Recipients</TableHead>
                      <TableHead>Open Rate</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Initial Invitation</TableCell>
                      <TableCell>April 20, 2025</TableCell>
                      <TableCell>250</TableCell>
                      <TableCell>84%</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>First Reminder</TableCell>
                      <TableCell>April 24, 2025</TableCell>
                      <TableCell>72</TableCell>
                      <TableCell>68%</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="departments">
          <Card>
            <CardHeader>
              <CardTitle>Response Rate by Department</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead>Total Participants</TableHead>
                    <TableHead>Completed</TableHead>
                    <TableHead>Completion Rate</TableHead>
                    <TableHead>Progress</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departmentBreakdown.map((dept) => (
                    <TableRow key={dept.department}>
                      <TableCell className="font-medium">{dept.department}</TableCell>
                      <TableCell>{dept.total}</TableCell>
                      <TableCell>{dept.completed}</TableCell>
                      <TableCell>{dept.percentage}%</TableCell>
                      <TableCell className="w-[200px]">
                        <Progress value={dept.percentage} className="h-2" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 flex justify-end">
        <Button onClick={handleViewResults}>
          <BarChart className="mr-2 h-4 w-4" />
          View Results
        </Button>
      </div>
    </MainLayout>
  );
};

export default TrackProgress;
