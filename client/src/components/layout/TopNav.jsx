import React from 'react';
import { Menu, Search, Bell, User, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const TopNav = ({ toggleSidebar }) => {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-surface/80 backdrop-blur-md border-b border-outline-variant/10 sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={toggleSidebar}
          className="p-2 -ml-2 text-on-surface-variant hover:text-on-surface rounded-lg hover:bg-surface-variant/40 lg:hidden transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search */}
        <div className="hidden md:flex items-center relative max-w-md w-full">
          <Search className="w-4 h-4 text-on-surface-variant absolute left-3" />
          <input 
            type="text" 
            placeholder="Search skills, careers, resources..." 
            className="w-full bg-surface-container-low border border-outline-variant/20 text-label-md text-on-surface rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-on-surface-variant"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 lg:gap-4">
        {/* Theme Toggle (Visual/static for theme continuity) */}
        <button 
          className="p-2 text-on-surface-variant hover:text-on-surface rounded-lg hover:bg-surface-variant/40 transition-colors"
          aria-label="Toggle theme"
        >
          <Sun className="w-5 h-5 hidden dark:block" />
          <Moon className="w-5 h-5 dark:hidden" />
        </button>

        {/* Notifications */}
        <Link 
          to="/notifications" 
          className="relative p-2 text-on-surface-variant hover:text-on-surface rounded-lg hover:bg-surface-variant/40 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full shadow-glow-teal animate-pulse" />
        </Link>

        <div className="w-px h-6 bg-outline-variant/20 hidden sm:block" />

        {/* User Profile */}
        <Link to="/profile" className="flex items-center gap-3 hover:opacity-85 transition-opacity">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-label-md font-semibold text-on-surface leading-tight">
              {user?.user_metadata?.full_name || 'Career Explorer'}
            </span>
            <span className="text-label-sm text-primary font-medium">Pro Member</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-surface-high border border-outline-variant/20 flex items-center justify-center overflow-hidden">
            <User className="w-4 h-4 text-on-surface" />
          </div>
        </Link>
      </div>
    </header>
  );
};

export default TopNav;
