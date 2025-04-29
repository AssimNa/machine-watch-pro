
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import DashboardLayout from "./layouts/DashboardLayout";

// Pages
import Dashboard from "./pages/Dashboard";
import Machines from "./pages/Machines";
import MachineDetails from "./pages/MachineDetails";
import Interventions from "./pages/Interventions";
import InterventionDetails from "./pages/InterventionDetails";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

// Create a client
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="machines" element={<Machines />} />
            <Route path="machines/:id" element={<MachineDetails />} />
            <Route path="interventions" element={<Interventions />} />
            <Route path="interventions/:id" element={<InterventionDetails />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Dashboard />} /> {/* Placeholder for Settings */}
            <Route path="history" element={<Dashboard />} /> {/* Placeholder for History */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
