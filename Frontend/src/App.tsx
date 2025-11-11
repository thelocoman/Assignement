// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import EditAnnouncement from "./pages/EditAnnouncement";
import NotFound from "./pages/NotFound";
import { AnnouncementsProvider } from "./components/AnnouncementsContext"; // <- add this import

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* Wrap routes with the AnnouncementsProvider so pages can use the hook */}
        <AnnouncementsProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/edit/:id" element={<EditAnnouncement />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnnouncementsProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
