
import React from "react";
import { Button } from "@/components/ui/button";
import { UserCircle, Menu, HelpCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const NavigationHeader: React.FC = () => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-30">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-survey-primary mr-6">
            <span className="hidden md:inline">Survey Pulse</span>
            <span className="md:hidden">SP</span>
          </h1>
          
          {!isMobile && (
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-survey-darkText hover:text-survey-primary">Assessment</a>
              <a href="#" className="text-survey-darkText hover:text-survey-primary">Analytics</a>
              <a href="#" className="text-survey-darkText hover:text-survey-primary">Development</a>
            </nav>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <HelpCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <UserCircle className="h-5 w-5" />
          </Button>
          
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
      
      {isMobile && mobileMenuOpen && (
        <div className="container mx-auto mt-4 pb-4">
          <nav className="flex flex-col space-y-4">
            <a href="#" className="text-survey-darkText hover:text-survey-primary">Assessment</a>
            <a href="#" className="text-survey-darkText hover:text-survey-primary">Analytics</a>
            <a href="#" className="text-survey-darkText hover:text-survey-primary">Development</a>
          </nav>
        </div>
      )}
    </header>
  );
};
