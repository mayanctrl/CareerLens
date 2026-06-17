import React from 'react';
import { Menu, Search, Bell, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const TopNav = ({ toggleSidebar }) => {
  const { user } = useAuth();

  return (
    <header className="h-[72px] bg-[#1C2541]/80 backdrop-blur-md border-b border-[#3A506B] sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 -ml-2 text-[#BDC9C8] hover:text-white rounded-lg hover:bg-[#212942] lg:hidden transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Global Search */}
        <div className="hidden md:flex items-center relative">
          <Search className="w-4 h-4 text-[#879392] absolute left-3" />
          <input 
            type="text" 
            placeholder="Search skills, careers, resources..." 
            className="bg-[#0B132B] border border-[#3A506B] text-sm text-[#DBE1FF] rounded-full pl-10 pr-4 py-2 w-64 focus:outline-none focus:border-[#5BC0BE] focus:ring-1 focus:ring-[#5BC0BE] transition-all placeholder:text-[#879392]"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 lg:gap-5">
        {/* Notifications */}
        <Link to="/notifications" className="relative p-2 text-[#BDC9C8] hover:text-white rounded-full hover:bg-[#212942] transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#6FFFE9] rounded-full shadow-[0_0_8px_rgba(111,255,233,0.8)] animate-pulse" />
        </Link>

        <div className="w-px h-6 bg-[#3A506B] hidden sm:block" />

        {/* User Profile Dropdown Toggle (simplified for now) */}
        <Link to="/profile" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-semibold text-white">{user?.user_metadata?.full_name || 'User'}</span>
            <span className="text-xs text-[#5BC0BE] font-medium">Pro Member</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#5BC0BE] to-[#1C2541] border border-[#3A506B] flex items-center justify-center overflow-hidden">
            <User className="w-5 h-5 text-white" />
          </div>
        </Link>
      </div>
    </header>
  );
};

export default TopNav;
