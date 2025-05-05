
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import UploadParticipants from "./pages/UploadParticipants";
import ReviewLaunch from "./pages/ReviewLaunch";
import SurveyTimeline from "./pages/SurveyTimeline";
import TrackProgress from "./pages/TrackProgress";
import AccessResults from "./pages/AccessResults";
import Reports from "./pages/Reports";
import CustomReports from "./pages/CustomReports";
import Development from "./pages/Development";
import KnowledgeHub from "./pages/KnowledgeHub";
import NotFound from "./pages/NotFound";
import ManagerProfile from "./pages/ManagerProfile";
import Auth from "./pages/Auth";
import SurveyForm from "./pages/SurveyForm";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import QuestionTemplates from "./pages/QuestionTemplates";
import CompanySurveys from "./pages/CompanySurveys";
import CreateSurvey from "./pages/CreateSurvey";
import SurveyDetails from "./pages/SurveyDetails";

const queryClient = new QueryClient();

// Simple auth check
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

// Admin check for super admin routes
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userRole = localStorage.getItem('userRole');
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  if (userRole !== 'superadmin') {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/auth" element={<Auth />} />
          <Route path="/survey-form" element={<SurveyForm />} />
          
          {/* Protected routes */}
          <Route path="/" element={<PrivateRoute><Index /></PrivateRoute>} />
          <Route path="/upload-participants" element={<PrivateRoute><UploadParticipants /></PrivateRoute>} />
          <Route path="/review-launch" element={<PrivateRoute><ReviewLaunch /></PrivateRoute>} />
          <Route path="/question-templates" element={<PrivateRoute><QuestionTemplates /></PrivateRoute>} />
          <Route path="/survey-timeline" element={<PrivateRoute><SurveyTimeline /></PrivateRoute>} />
          <Route path="/track-progress" element={<PrivateRoute><TrackProgress /></PrivateRoute>} />
          <Route path="/access-results" element={<PrivateRoute><AccessResults /></PrivateRoute>} />
          <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
          <Route path="/custom-reports" element={<PrivateRoute><CustomReports /></PrivateRoute>} />
          <Route path="/development" element={<PrivateRoute><Development /></PrivateRoute>} />
          <Route path="/knowledge-hub" element={<PrivateRoute><KnowledgeHub /></PrivateRoute>} />
          <Route path="/manager/:id" element={<PrivateRoute><ManagerProfile /></PrivateRoute>} />
          
          {/* New survey management routes */}
          <Route path="/company-surveys" element={<PrivateRoute><CompanySurveys /></PrivateRoute>} />
          <Route path="/create-survey" element={<PrivateRoute><CreateSurvey /></PrivateRoute>} />
          <Route path="/survey-details/:id" element={<PrivateRoute><SurveyDetails /></PrivateRoute>} />
          
          {/* Super admin routes */}
          <Route path="/super-admin-dashboard" element={<AdminRoute><SuperAdminDashboard /></AdminRoute>} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
