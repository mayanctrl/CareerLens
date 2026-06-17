import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ClipboardList, 
  Compass, 
  Target, 
  Map, 
  BookOpen, 
  FolderGit2, 
  FileText, 
  MessageSquare, 
  LineChart, 
  Award, 
  PieChart, 
  Settings, 
  LogOut,
  X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Career Assessment', path: '/assessment', icon: ClipboardList },
  { name: 'AI Recommendations', path: '/recommendations', icon: Compass },
  { name: 'Skill Gap Analysis', path: '/skills', icon: Target },
  { name: 'Learning Roadmap', path: '/roadmap', icon: Map },
  { name: 'Learning Resources', path: '/resources', icon: BookOpen },
  { name: 'Projects', path: '/projects', icon: FolderGit2 },
  { name: 'Resume Builder', path: '/resume', icon: FileText },
  { name: 'Interview Prep', path: '/interview', icon: MessageSquare },
  { name: 'Progress Tracker', path: '/progress', icon: LineChart },
  { name: 'Achievements', path: '/achievements', icon: Award },
  { name: 'Career Insights', path: '/insights', icon: PieChart },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const { signOut } = useAuth(); // Assume signOut is implemented in AuthContext

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-[280px] bg-[#1C2541] border-r border-[#3A506B]
          transform transition-transform duration-300 ease-in-out lg:translate-x-0
          flex flex-col
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between h-[72px] px-6 border-b border-[#3A506B]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5BC0BE] to-[#6FFFE9] flex items-center justify-center">
              <Compass className="w-5 h-5 text-[#0B132B]" />
            </div>
            <span className="text-xl font-bold font-['Geist'] text-white tracking-wide">
              Career<span className="text-[#5BC0BE]">Lens</span>
            </span>
          </div>
          <button 
            className="lg:hidden text-[#BDC9C8] hover:text-white"
            onClick={toggleSidebar}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-6 px-4 no-scrollbar">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => window.innerWidth < 1024 && toggleSidebar()}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                    ${isActive 
                      ? 'bg-[rgba(91,192,190,0.1)] text-[#5BC0BE] border border-[#5BC0BE]/20' 
                      : 'text-[#BDC9C8] hover:bg-[#212942] hover:text-white border border-transparent'
                    }
                  `}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-[#5BC0BE]' : 'text-[#879392] group-hover:text-white'}`} />
                  <span className="font-medium text-sm">{item.name}</span>
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#5BC0BE] rounded-r-full" />
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-[#3A506B] space-y-1">
          <NavLink
            to="/settings"
            onClick={() => window.innerWidth < 1024 && toggleSidebar()}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
              ${location.pathname === '/settings' 
                ? 'bg-[rgba(91,192,190,0.1)] text-[#5BC0BE] border border-[#5BC0BE]/20' 
                : 'text-[#BDC9C8] hover:bg-[#212942] hover:text-white border border-transparent'
              }
            `}
          >
            <Settings className="w-5 h-5 text-[#879392] group-hover:text-white" />
            <span className="font-medium text-sm">Settings</span>
          </NavLink>
          <button
            onClick={() => {
                // signOut();
                console.log("logout");
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#BDC9C8] hover:bg-red-500/10 hover:text-red-400 border border-transparent transition-all duration-200 group"
          >
            <LogOut className="w-5 h-5 text-[#879392] group-hover:text-red-400" />
            <span className="font-medium text-sm">Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
