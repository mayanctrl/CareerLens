import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  BrainCircuit,
  Briefcase,
  Route,
  FileText,
  ClipboardCheck,
  Bot,
  Settings,
  HelpCircle,
  LogOut,
  X,
  FolderGit2,
  BookOpen,
  Target,
  LineChart,
  Award,
  BarChart3,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Skill Profile', path: '/skills', icon: BrainCircuit },
  { name: 'Career Assessment', path: '/assessment', icon: Target },
  { name: 'AI Recommendations', path: '/recommendations', icon: Briefcase },
  { name: 'Career Roadmaps', path: '/roadmap', icon: Route },
  { name: 'Learning Resources', path: '/resources', icon: BookOpen },
  { name: 'Projects', path: '/projects', icon: FolderGit2 },
  { name: 'Resume Analyzer', path: '/resume', icon: FileText },
  { name: 'Interview Prep', path: '/interview', icon: ClipboardCheck },
  { name: 'Progress Tracker', path: '/progress', icon: LineChart },
  { name: 'Achievements', path: '/achievements', icon: Award },
  { name: 'Career Insights', path: '/insights', icon: BarChart3 },
];

const sidebarVariants = {
  open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  closed: { x: '-100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
};

const overlayVariants = {
  open: { opacity: 1, transition: { duration: 0.2 } },
  closed: { opacity: 0, transition: { duration: 0.2 } },
};

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navLinkClasses = (path) => {
    const isActive = location.pathname === path || location.pathname.startsWith(path + '/');
    return `flex items-center gap-3 px-4 py-3 text-label-md transition-all active:translate-x-0.5 ${
      isActive
        ? 'text-primary bg-primary/10 border-l-2 border-primary'
        : 'text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface border-l-2 border-transparent'
    }`;
  };

  const sidebarContent = (
    <aside
      className="h-full w-[280px] bg-surface-low border-r border-outline-variant/10 flex flex-col py-6"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo */}
      <div className="px-6 mb-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center">
            <BrainCircuit className="w-5 h-5 text-on-primary-container" />
          </div>
          <div>
            <h1 className="text-headline-md font-bold text-primary leading-tight">CareerLens</h1>
            <p className="text-label-sm text-on-surface-variant">AI Career Agent</p>
          </div>
        </div>
        <button
          className="lg:hidden p-1 text-on-surface-variant hover:text-on-surface rounded-md transition-colors"
          onClick={toggleSidebar}
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5 px-2 custom-scrollbar overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => window.innerWidth < 1024 && toggleSidebar()}
            className={navLinkClasses(item.path)}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto px-4 pb-4">
        {/* Premium Card */}
        <div className="bg-surface-container rounded-xl p-4 mb-6 border border-outline-variant/10">
          <p className="text-label-sm text-secondary font-bold mb-1 uppercase tracking-wider">Premium Plan</p>
          <p className="text-label-md text-on-surface mb-3">Get advanced AI interview coaching.</p>
          <button className="w-full py-2 bg-secondary text-on-secondary text-label-md font-medium rounded-lg hover:brightness-110 transition-all">
            Upgrade to Pro
          </button>
        </div>

        <div className="space-y-0.5">
          <NavLink
            to="/settings"
            onClick={() => window.innerWidth < 1024 && toggleSidebar()}
            className={navLinkClasses('/settings')}
          >
            <Settings className="w-5 h-5 shrink-0" />
            <span>Settings</span>
          </NavLink>
          <NavLink
            to="/help"
            onClick={() => window.innerWidth < 1024 && toggleSidebar()}
            className="flex items-center gap-3 px-4 py-2 text-label-sm text-on-surface-variant hover:text-on-surface transition-colors border-l-2 border-transparent"
          >
            <HelpCircle className="w-5 h-5 shrink-0" />
            <span>Support</span>
          </NavLink>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-2 text-label-sm text-on-surface-variant hover:text-error transition-colors border-l-2 border-transparent"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Sidebar — always visible */}
      <div className="hidden lg:flex fixed left-0 top-0 h-full z-40">
        {sidebarContent}
      </div>

      {/* Mobile Sidebar — slide overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={toggleSidebar}
            />
            <motion.div
              className="fixed left-0 top-0 h-full z-50 lg:hidden"
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
