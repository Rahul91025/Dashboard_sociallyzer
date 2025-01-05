import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} />
      
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`
          fixed left-0 top-1/2 -translate-y-1/2 z-50
          bg-blue-600 text-white p-2 rounded-r-lg shadow-lg
          transition-all duration-300 hover:bg-blue-700
          ${sidebarOpen ? 'ml-64' : 'ml-16 md:ml-16'}
        `}
        aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      <div className={`
        flex-1 flex flex-col transition-all duration-300
        ${sidebarOpen ? 'md:ml-64' : 'ml-16'}
      `}>
        <TopBar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <main className="flex-1 overflow-auto p-4 md:p-6 transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  );
};