import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart3, Upload, Settings, Users, Calendar, 
  TrendingUp, MessageSquare, FileText, HelpCircle, X 
} from 'lucide-react';

const Sidebar = ({ isOpen }) => {
  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', path: '/' },
    { icon: TrendingUp, label: 'Analytics', path: '/analytics' },
    { icon: MessageSquare, label: 'Comments', path: '/comments' },
    { icon: Upload, label: 'Upload Data', path: '/upload' },
    { icon: Calendar, label: 'Schedule', path: '/schedule' },
    { icon: Users, label: 'Team', path: '/team' },
    { icon: FileText, label: 'Reports', path: '/reports' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: HelpCircle, label: 'Help', path: '/help' },
  ];

  return (
    <aside 
      className={`
        fixed left-0 top-0 h-screen bg-gray-900 text-white transition-all duration-300 z-50
        ${isOpen ? 'w-64' : 'w-16'} 
        ${isOpen ? 'shadow-xl' : 'shadow-md'}
      `}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-blue-400 flex-shrink-0" />
            <h1 className={`
              text-xl font-bold whitespace-nowrap transition-all duration-300
              ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}
            `}>
              Analytics
            </h1>
          </div>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-all duration-200
                ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'}
                ${!isOpen && 'justify-center'}
              `}
              title={!isOpen ? item.label : ''}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className={`
                whitespace-nowrap transition-all duration-300
                ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 hidden'}
              `}>
                {item.label}
              </span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <div className={`
            text-sm text-gray-400 transition-all duration-300
            ${isOpen ? 'opacity-100' : 'opacity-0'}
          `}>
            <p>© 2024 Analytics</p>
            <p>Version 1.0.0</p>
          </div>
        </div>
      </div>
    </aside>
  );
};