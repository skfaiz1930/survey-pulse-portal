
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { 
  ClipboardList, 
  BarChart, 
  BookOpen, 
  Upload, 
  Calendar, 
  Activity, 
  FileText, 
  Users, 
  BellRing, 
  Kanban,
  HelpCircle
} from "lucide-react";

interface AppSidebarProps {
  currentStage: number;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ currentStage }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const assessmentItems = [
    { title: "Register Company", path: "/", icon: ClipboardList, stage: 1 },
    { title: "Upload Participants", path: "/upload-participants", icon: Upload, stage: 2 },
    { title: "Review & Launch", path: "/review-launch", icon: FileText, stage: 3 },
    { title: "Survey Timeline", path: "/survey-timeline", icon: Calendar, stage: 4 },
  ];
  
  const analyticsItems = [
    { title: "Track Progress", path: "/track-progress", icon: Activity, stage: 5 },
    { title: "Access Results", path: "/access-results", icon: BarChart, stage: 6 },
    { title: "Reports", path: "/reports", icon: FileText, stage: 7 },
  ];
  
  const developmentItems = [
    { title: "Development", path: "/development", icon: Users, stage: 8 },
    { title: "Knowledge Hub", path: "/knowledge-hub", icon: HelpCircle, stage: 9 },
  ];

  const isActive = (path: string) => location.pathname === path;
  
  return (
    <Sidebar>
      <SidebarHeader className="flex justify-between items-center p-4">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-lg text-survey-primary">Survey Pulse</span>
        </div>
        <SidebarTrigger />
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Assessment</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {assessmentItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={isActive(item.path)}
                    tooltip={item.title}
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon className="text-survey-lightText" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Analytics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {analyticsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={isActive(item.path)}
                    tooltip={item.title}
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon className="text-survey-lightText" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Development</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {developmentItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={isActive(item.path)}
                    tooltip={item.title}
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon className="text-survey-lightText" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <div className="text-xs text-survey-lightText">
          <p>Current Stage: {currentStage}/9</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
