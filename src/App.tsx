import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TransactionProvider } from "@/features/transactions/context/TransactionContext";
import { RoleProvider } from "@/context/RoleContext";
import Layout from "@/components/layout/Layout";
import Landing from "@/pages/Landing";
import Auth from "@/pages/Auth";
import Overview from "@/pages/Overview";
import Transactions from "@/pages/Transactions";
import Insights from "@/pages/Insights";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import Preloader from "@/components/Preloader";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner
          theme="dark"
          toastOptions={{
            style: {
              background: "#13161E",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "#F0F2F8",
              fontFamily: "Inter, sans-serif",
            },
          }}
        />
        <Preloader isVisible={loading} />
        <RoleProvider>
          <TransactionProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Auth />} />
                <Route path="/signup" element={<Auth />} />
                <Route element={<Layout />}>
                  <Route path="/dashboard" element={<Overview />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/insights" element={<Insights />} />
                  <Route path="/settings" element={<Settings />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TransactionProvider>
        </RoleProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

