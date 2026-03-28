import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import VerifyEmail from "./pages/VerifyEmail";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Campaigns from "./pages/Campaigns";
import CampaignCreate from "./pages/CampaignCreate";
import Affiliates from "./pages/Affiliates";
import Analytics from "./pages/Analytics";

import Payouts from "./pages/Payouts";
import Settings from "./pages/Settings";
import CreatorDashboard from "./pages/CreatorDashboard";
import CreatorMarketplace from "./pages/CreatorMarketplace";
import CreatorLinks from "./pages/CreatorLinks";
import CreatorEarnings from "./pages/CreatorEarnings";
import CreatorPrograms from "./pages/CreatorPrograms";
import CreatorContent from "./pages/CreatorContent";
import CreatorSettings from "./pages/CreatorSettings";
import Landing from "./pages/Landing";
import Apps from "./pages/Apps";

import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/design-system" element={<Index />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/campaigns/create" element={<CampaignCreate />} />
          <Route path="/affiliates" element={<Affiliates />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/content" element={<Content />} />
          <Route path="/payouts" element={<Payouts />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/utm-tracking" element={<UtmTracking />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/creator/dashboard" element={<CreatorDashboard />} />
          <Route path="/creator/marketplace" element={<CreatorMarketplace />} />
          <Route path="/creator/links" element={<CreatorLinks />} />
          <Route path="/creator/earnings" element={<CreatorEarnings />} />
          <Route path="/creator/programs" element={<CreatorPrograms />} />
          <Route path="/creator/content" element={<CreatorContent />} />
          <Route path="/creator/settings" element={<CreatorSettings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
