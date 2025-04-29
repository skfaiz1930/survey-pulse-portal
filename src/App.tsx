
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import UploadParticipants from "./pages/UploadParticipants";
import ReviewLaunch from "./pages/ReviewLaunch";
import SurveyTimeline from "./pages/SurveyTimeline";
import TrackProgress from "./pages/TrackProgress";
import AccessResults from "./pages/AccessResults";
import Reports from "./pages/Reports";
import Development from "./pages/Development";
import KnowledgeHub from "./pages/KnowledgeHub";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/upload-participants" element={<UploadParticipants />} />
          <Route path="/review-launch" element={<ReviewLaunch />} />
          <Route path="/survey-timeline" element={<SurveyTimeline />} />
          <Route path="/track-progress" element={<TrackProgress />} />
          <Route path="/access-results" element={<AccessResults />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/development" element={<Development />} />
          <Route path="/knowledge-hub" element={<KnowledgeHub />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
