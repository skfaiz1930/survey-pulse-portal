
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-survey-background">
      <div className="text-center p-8 max-w-md">
        <h1 className="text-6xl font-bold text-survey-primary mb-6">404</h1>
        <p className="text-xl text-survey-darkText mb-8">Oops! We couldn't find the page you're looking for.</p>
        <p className="text-survey-lightText mb-8">
          The page might have been moved, deleted, or perhaps you mistyped the URL.
        </p>
        <Button asChild className="bg-survey-primary hover:bg-blue-700">
          <a href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Dashboard
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
