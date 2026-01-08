import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Navbar } from "@/components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Visualizer from "./pages/Visualizer";
import Learn from "./pages/Learn";
import AlgorithmDetail from "./pages/AlgorithmDetail";
import Tutorials from "./pages/Tutorials";
import About from "./pages/About";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/learn/:id" element={<AlgorithmDetail />} />
            <Route path="/tutorials" element={<Tutorials />} />
            <Route path="/about" element={<About />} />

            {/* Public Visualizer (for demo) */}
            <Route path="/visualizer" element={<Visualizer />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
