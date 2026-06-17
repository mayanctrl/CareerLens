import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden bg-[#0B132B]">
      {/* Sidebar (desktop and mobile overlay) */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden w-full lg:ml-[280px]">
        {/* Top Navigation */}
        <TopNav toggleSidebar={toggleSidebar} />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto bg-[#0B132B] p-4 lg:p-8 scroll-smooth">
          <div className="max-w-[1440px] mx-auto animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
