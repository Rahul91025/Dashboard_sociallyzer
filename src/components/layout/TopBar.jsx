import React, { useState } from 'react';
import { Menu, Bell, Search, User, X } from 'lucide-react';

const TopBar = ({ toggleSidebar, sidebarOpen }) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="bg-white shadow-sm px-4 py-3 sticky top-0 z-40">
      <div className="flex items-center justify-between max-w-[1920px] mx-auto">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden"
            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none w-64 placeholder-gray-500"
            />
          </div>

          {/* Mobile Search Toggle */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {showSearch ? <X className="w-6 h-6" /> : <Search className="w-6 h-6" />}
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <User className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {showSearch && (
        <div className="md:hidden mt-3 px-2">
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none w-full placeholder-gray-500"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
};