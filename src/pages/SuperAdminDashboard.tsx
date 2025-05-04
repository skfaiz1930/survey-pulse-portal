
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Building, BarChart, Users, Clock, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const SuperAdminDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock companies data
  const companies = [
    {
      id: 1,
      name: "Tech Innovators Ltd",
      surveys: 3,
      employees: 240,
      activeSurvey: "Manager Effectiveness",
      lastActive: "2 hours ago",
      status: "active"
    },
    {
      id: 2,
      name: "Global Finance Group",
      surveys: 2,
      employees: 560,
      activeSurvey: "Employee Engagement",
      lastActive: "1 day ago",
      status: "active"
    },
    {
      id: 3,
      name: "Healthcare Solutions",
      surveys: 1,
      employees: 180,
      activeSurvey: "Manager Performance",
      lastActive: "3 days ago",
      status: "active"
    },
    {
      id: 4,
      name: "Retail Enterprises Inc",
      surveys: 4,
      employees: 750,
      activeSurvey: null,
      lastActive: "1 week ago",
      status: "inactive"
    },
    {
      id: 5,
      name: "Manufacturing Experts Co",
      surveys: 2,
      employees: 320,
      activeSurvey: "Team Leadership",
      lastActive: "4 hours ago",
      status: "active"
    },
  ];
  
  // System stats data
  const systemStats = {
    totalUsers: 2150,
    activeSurveys: 8,
    completedSurveys: 24,
    responsesCollected: 18734,
    avgResponseRate: "87%"
  };
  
  const handleCompanySelect = (companyId: number) => {
    toast({
      title: "Company Selected",
      description: `Viewing company ID: ${companyId}`,
    });
    // In a real app, this would navigate to the specific company's dashboard
  };
  
  return (
    <MainLayout currentStage={0}>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-survey-darkText">
            Super Admin Dashboard
          </h2>
          <p className="text-survey-lightText mt-2">
            Monitor and manage all company surveys
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button onClick={() => navigate("/")}>
            Exit Super Admin Mode
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-survey-lightText">Total Companies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Building className="h-5 w-5 text-survey-primary mr-2" />
              <span className="text-2xl font-bold">{companies.length}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-survey-lightText">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-survey-primary mr-2" />
              <span className="text-2xl font-bold">{systemStats.totalUsers}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-survey-lightText">Active Surveys</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-2xl font-bold">{systemStats.activeSurveys}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-survey-lightText">Completed Surveys</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BarChart className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-2xl font-bold">{systemStats.completedSurveys}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-survey-lightText">Avg Response Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-purple-600 mr-2" />
              <span className="text-2xl font-bold">{systemStats.avgResponseRate}</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="companies">
        <TabsList className="mb-6">
          <TabsTrigger value="companies">Companies</TabsTrigger>
          <TabsTrigger value="surveys">All Surveys</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="analytics">Global Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="companies">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5" />
                Companies Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row justify-between mb-6 space-y-4 sm:space-y-0">
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-survey-lightText" />
                  <Input
                    placeholder="Search companies..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex space-x-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company Name</TableHead>
                      <TableHead>Surveys</TableHead>
                      <TableHead>Employees</TableHead>
                      <TableHead>Active Survey</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {companies.map((company) => (
                      <TableRow key={company.id}>
                        <TableCell className="font-medium">{company.name}</TableCell>
                        <TableCell>{company.surveys}</TableCell>
                        <TableCell>{company.employees}</TableCell>
                        <TableCell>
                          {company.activeSurvey || <span className="text-survey-lightText">—</span>}
                        </TableCell>
                        <TableCell>{company.lastActive}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            company.status === "active" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-gray-100 text-gray-800"
                          }`}>
                            {company.status === "active" ? "Active" : "Inactive"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleCompanySelect(company.id)}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-6 flex justify-between items-center">
                <div className="text-sm text-survey-lightText">
                  Showing <span className="font-medium">5</span> of <span className="font-medium">5</span> companies
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm" disabled>Next</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="surveys">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-center items-center h-60">
                <div className="text-center">
                  <h3 className="text-xl font-medium mb-2">All Surveys View</h3>
                  <p className="text-survey-lightText">
                    This tab would show all surveys across all companies
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-center items-center h-60">
                <div className="text-center">
                  <h3 className="text-xl font-medium mb-2">User Management</h3>
                  <p className="text-survey-lightText">
                    This tab would allow managing all users across the platform
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-center items-center h-60">
                <div className="text-center">
                  <h3 className="text-xl font-medium mb-2">Global Analytics</h3>
                  <p className="text-survey-lightText">
                    This tab would show analytics data aggregated across all companies
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default SuperAdminDashboard;
