import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, FileText, Video, Download, BookOpen, MessageCircle, ChevronRight, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const KnowledgeHub = () => {
  const [currentStage] = useState(9);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search Results",
      description: `Showing results for "${searchQuery}"`
    });
  };
  
  const handleChatbotQuestion = (question: string) => {
    toast({
      title: "Chatbot",
      description: `Answering: "${question}"`
    });
  };
  
  return (
    <MainLayout currentStage={currentStage}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-survey-darkText">Knowledge Hub</h2>
        <p className="text-survey-lightText mt-2">Resources, guides, and answers to your questions</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
        <h3 className="text-lg font-medium mb-4">Search Resources</h3>
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              className="pl-9" 
              placeholder="Search for guides, FAQs, or keywords..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
      </div>
      
      <Tabs defaultValue="faq">
        <TabsList className="mb-6">
          <TabsTrigger value="faq">Frequently Asked Questions</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="videos">Video Tutorials</TabsTrigger>
          <TabsTrigger value="downloads">Downloads</TabsTrigger>
          <TabsTrigger value="chatbot">Ask Chatbot</TabsTrigger>
        </TabsList>
        
        <TabsContent value="faq">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Survey Setup</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-b pb-3">
                  <p className="font-medium mb-2">How do I upload participants?</p>
                  <p className="text-sm text-survey-lightText">
                    Use the CSV template provided in the Upload Participants section. Make sure your 
                    data follows the format specified in the template guide.
                  </p>
                </div>
                
                <div className="border-b pb-3">
                  <p className="font-medium mb-2">How do I fix upload errors?</p>
                  <p className="text-sm text-survey-lightText">
                    When errors occur during upload, use the built-in correction interface to fix issues like 
                    missing emails or invalid department names.
                  </p>
                </div>
                
                <div>
                  <p className="font-medium mb-2">Can I edit the survey questions?</p>
                  <p className="text-sm text-survey-lightText">
                    Currently, the survey questions are standardized for best results. Contact support 
                    if you need custom questions for your organization.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Setup FAQs
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Results & Analytics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-b pb-3">
                  <p className="font-medium mb-2">How are scores calculated?</p>
                  <p className="text-sm text-survey-lightText">
                    Scores are calculated as averages of all responses on a 1-5 scale. Department scores 
                    are weighted averages based on response rates.
                  </p>
                </div>
                
                <div className="border-b pb-3">
                  <p className="font-medium mb-2">How do I export reports?</p>
                  <p className="text-sm text-survey-lightText">
                    Use the export buttons (PDF or Excel) in the Reports section to download 
                    data for offline analysis or presentations.
                  </p>
                </div>
                
                <div>
                  <p className="font-medium mb-2">Who can see individual manager scores?</p>
                  <p className="text-sm text-survey-lightText">
                    By default, only admins can see individual manager scores. You can adjust 
                    visibility settings in the permissions section.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Analytics FAQs
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Development & Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-b pb-3">
                  <p className="font-medium mb-2">How do nudges work?</p>
                  <p className="text-sm text-survey-lightText">
                    Nudges are ML-powered suggestions sent to managers based on their survey results. 
                    They provide actionable tips to improve specific areas.
                  </p>
                </div>
                
                <div className="border-b pb-3">
                  <p className="font-medium mb-2">Can managers create their own action plans?</p>
                  <p className="text-sm text-survey-lightText">
                    Yes, managers can create their own action plans or work with admins to develop 
                    plans based on their survey feedback.
                  </p>
                </div>
                
                <div>
                  <p className="font-medium mb-2">How are development recommendations generated?</p>
                  <p className="text-sm text-survey-lightText">
                    Recommendations are based on survey results, industry benchmarks, and 
                    successful practices from similar organizations.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Development FAQs
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Integration & Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-b pb-3">
                  <p className="font-medium mb-2">How do I connect to our HRMS?</p>
                  <p className="text-sm text-survey-lightText">
                    Use the Connect Workday button in the Nudge Settings section to start 
                    the integration process with your HR system.
                  </p>
                </div>
                
                <div className="border-b pb-3">
                  <p className="font-medium mb-2">Can I integrate with Slack or MS Teams?</p>
                  <p className="text-sm text-survey-lightText">
                    Yes, enable Slack integration in the Nudge Settings to send updates 
                    and reminders directly to your workspace.
                  </p>
                </div>
                
                <div>
                  <p className="font-medium mb-2">Is our data secure?</p>
                  <p className="text-sm text-survey-lightText">
                    All survey data is encrypted and stored securely. We comply with GDPR, 
                    CCPA, and other data protection regulations.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Integration FAQs
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="guides">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Complete Survey Setup Guide",
                description: "Step-by-step instructions for setting up your first survey",
                icon: FileText,
                category: "Setup"
              },
              {
                title: "Data Upload Best Practices",
                description: "Tips for clean data and error-free uploads",
                icon: FileText,
                category: "Setup"
              },
              {
                title: "Analyzing Survey Results",
                description: "How to interpret and act on your survey data",
                icon: FileText,
                category: "Analytics"
              },
              {
                title: "Creating Effective Action Plans",
                description: "Turn insights into actionable improvement plans",
                icon: FileText,
                category: "Development"
              },
              {
                title: "Manager Development Guide",
                description: "Strategies for improving manager performance",
                icon: FileText,
                category: "Development"
              },
              {
                title: "HRMS Integration Guide",
                description: "Connect your HR systems for seamless data flow",
                icon: FileText,
                category: "Integration"
              }
            ].map((guide, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{guide.title}</CardTitle>
                    <guide.icon className="h-5 w-5 text-survey-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-survey-lightText mb-3">
                    {guide.description}
                  </p>
                  <Badge className="bg-gray-100 text-survey-lightText hover:bg-gray-200">
                    {guide.category}
                  </Badge>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    Read Guide
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="videos">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Getting Started with Survey Pulse",
                duration: "5:24",
                thumbnail: "video-thumb-1.jpg"
              },
              {
                title: "How to Upload Participant Data",
                duration: "3:12",
                thumbnail: "video-thumb-2.jpg"
              },
              {
                title: "Understanding Survey Results",
                duration: "7:45",
                thumbnail: "video-thumb-3.jpg"
              },
              {
                title: "Creating Manager Action Plans",
                duration: "6:18",
                thumbnail: "video-thumb-4.jpg"
              },
              {
                title: "Setting Up Nudges for Managers",
                duration: "4:32",
                thumbnail: "video-thumb-5.jpg"
              },
              {
                title: "Integrating with Slack & MS Teams",
                duration: "3:54",
                thumbnail: "video-thumb-6.jpg"
              }
            ].map((video, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-video bg-gray-100 flex items-center justify-center relative">
                  <Video className="h-12 w-12 text-survey-lightText opacity-70" />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <CardContent className="pt-4">
                  <h4 className="font-medium mb-2">{video.title}</h4>
                  <Button variant="outline" size="sm" className="w-full">
                    Watch Video
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="downloads">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Participant Upload Template",
                format: "CSV",
                size: "12 KB",
                description: "Template for uploading employee data"
              },
              {
                title: "Survey Result Analysis Worksheet",
                format: "Excel",
                size: "45 KB",
                description: "Spreadsheet for detailed analysis of survey results"
              },
              {
                title: "Manager Development Plan Template",
                format: "PDF",
                size: "320 KB",
                description: "Template for creating structured development plans"
              },
              {
                title: "Action Planning Guide",
                format: "PDF",
                size: "1.2 MB",
                description: "Comprehensive guide to effective action planning"
              },
              {
                title: "Survey Communication Templates",
                format: "Word",
                size: "78 KB",
                description: "Email templates for survey communications"
              },
              {
                title: "ROI Calculator",
                format: "Excel",
                size: "156 KB",
                description: "Calculate the return on investment from manager development"
              }
            ].map((download, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-base">{download.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-survey-lightText mb-4">
                    {download.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">
                        {download.format}
                      </div>
                      <span className="text-xs text-survey-lightText">
                        {download.size}
                      </span>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="chatbot">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="border-b">
                  <CardTitle className="flex items-center">
                    <MessageCircle className="h-5 w-5 mr-2 text-survey-primary" />
                    Survey Pulse Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-survey-primary text-white p-2 rounded-full">
                        <MessageCircle className="h-5 w-5" />
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                        <p>Hello! I'm your Survey Pulse Assistant. How can I help you today?</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 flex-row-reverse">
                      <div className="bg-gray-200 p-2 rounded-full">
                        <User className="h-5 w-5" />
                      </div>
                      <div className="bg-blue-100 rounded-lg p-3 max-w-[80%]">
                        <p>How do I fix upload errors?</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-survey-primary text-white p-2 rounded-full">
                        <MessageCircle className="h-5 w-5" />
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                        <p>
                          To fix upload errors, go to the Upload Participants page where you'll see a table 
                          showing all errors. You can edit each error directly by clicking the "Fix" button 
                          next to each row. Common errors include:
                        </p>
                        <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                          <li>Missing email addresses</li>
                          <li>Invalid department names</li>
                          <li>Duplicate entries</li>
                          <li>Missing manager information</li>
                        </ul>
                        <p className="mt-2">
                          After fixing the errors, the system will automatically validate your changes. 
                          Would you like to see a tutorial on how to fix specific types of errors?
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t p-4">
                  <div className="flex w-full gap-2">
                    <Input placeholder="Type your question here..." className="flex-1" />
                    <Button>Send</Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
            
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Popular Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      "How do I upload participants?",
                      "How are scores calculated?",
                      "Can I customize survey questions?",
                      "How do I export reports?",
                      "How do nudges work?",
                      "Can I integrate with Slack?",
                      "How do I fix upload errors?",
                      "When should I run the next survey?"
                    ].map((question, index) => (
                      <Button 
                        key={index} 
                        variant="outline" 
                        className="w-full justify-start text-left h-auto py-2"
                        onClick={() => handleChatbotQuestion(question)}
                      >
                        <MessageCircle className="h-4 w-4 mr-2 shrink-0" />
                        <span className="truncate">{question}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="w-full bg-blue-50 p-3 rounded-md border border-blue-100">
                    <h4 className="font-medium mb-2 flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-survey-primary" />
                      Learning Resources
                    </h4>
                    <p className="text-sm mb-3">
                      Check out our comprehensive guides and video tutorials for in-depth learning.
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm"variant="outline" className="flex-1">Guides</Button>
                      <Button size="sm" variant="outline" className="flex-1">Videos</Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default KnowledgeHub;
