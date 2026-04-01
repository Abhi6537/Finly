import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    // Reset scroll to top smoothly when route changes
    document.querySelector("main")?.scrollTo({ top: 0, behavior: 'instant' });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Mesh blobs */}
      <div className="mesh-blob mesh-blob-1" />
      <div className="mesh-blob mesh-blob-2" />

      <Sidebar />
      <BottomNav />
      {/* Add md:ml-[220px] and pb-[52px] for BottomNav space on mobile */}
      <div className="md:ml-[220px] relative z-10 flex flex-col min-h-screen pb-[52px] md:pb-0">
        <TopNav />
        <main className="flex-1 p-2.5 md:p-6 overflow-x-hidden overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
