import React from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart3, Upload, Settings, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Sidebar = () => {
  const handleSignOut = () => {
    supabase.auth.signOut();
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white p-4">
      <div className="flex items-center gap-2 mb-8">
        <BarChart3 className="w-8 h-8 text-blue-400" />
        <h1 className="text-xl font-bold">Social Analytics</h1>
      </div>
      
      <nav className="space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 p-3 rounded-lg transition-colors ${
              isActive ? 'bg-blue-600' : 'hover:bg-gray-800'
            }`
          }
        >
          <BarChart3 className="w-5 h-5" />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink
          to="/upload"
          className={({ isActive }) =>
            `flex items-center gap-2 p-3 rounded-lg transition-colors ${
              isActive ? 'bg-blue-600' : 'hover:bg-gray-800'
            }`
          }
        >
          <Upload className="w-5 h-5" />
          <span>Upload Data</span>
        </NavLink>
        
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-2 p-3 rounded-lg transition-colors ${
              isActive ? 'bg-blue-600' : 'hover:bg-gray-800'
            }`
          }
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </NavLink>
      </nav>
      
      <div className="absolute bottom-4 left-4 right-4">
        <button 
          onClick={handleSignOut}
          className="flex items-center gap-2 p-3 w-full rounded-lg hover:bg-gray-800 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;