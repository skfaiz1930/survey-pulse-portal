
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { ProgressBar } from "@/components/progress-bar/ProgressBar";
import { NavigationHeader } from "@/components/navigation/NavigationHeader";
import { AppSidebar } from "@/components/navigation/AppSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
  currentStage: number;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, currentStage }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-survey-background flex w-full">
        <AppSidebar currentStage={currentStage} />
        <SidebarInset>
          <div className="flex flex-col min-h-full">
            <NavigationHeader />
            <ProgressBar currentStage={currentStage} />
            <main className="flex-1 container mx-auto py-6 px-4 md:px-6">
              {children}
            </main>
            <footer className="py-6 px-4 bg-white border-t border-gray-200">
              <div className="container mx-auto text-center text-survey-lightText">
                <p>© 2025 Survey Pulse. All rights reserved.</p>
              </div>
            </footer>
            <Toaster />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
