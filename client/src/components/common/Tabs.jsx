import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Tabs = ({ 
  tabs = [], 
  defaultTab, 
  onChange, 
  variant = 'underline', // 'underline' | 'pill'
  className = '' 
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (onChange) onChange(tabId);
  };

  if (variant === 'pill') {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-colors relative
              ${activeTab === tab.id ? 'text-[#0B132B]' : 'text-[#BDC9C8] hover:text-[#DBE1FF] bg-[#1C2541] hover:bg-[#212942] border border-[#3A506B]'}
            `}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId={`pill-${Math.random()}`} // Note: In production, pass a stable layoutId prefix as a prop
                className="absolute inset-0 bg-[#5BC0BE] rounded-full"
                initial={false}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                style={{ zIndex: -1 }}
              />
            )}
            <span className="relative z-10 flex items-center">
              {tab.icon && <tab.icon className="w-4 h-4 mr-2" />}
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    );
  }

  // Default underline variant
  return (
    <div className={`border-b border-[#3A506B] flex overflow-x-auto no-scrollbar ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={`
            px-6 py-4 text-sm font-medium relative whitespace-nowrap
            ${activeTab === tab.id ? 'text-[#5BC0BE]' : 'text-[#BDC9C8] hover:text-[#DBE1FF] hover:bg-[#1C2541]/50'}
          `}
        >
          <span className="flex items-center">
            {tab.icon && <tab.icon className="w-4 h-4 mr-2" />}
            {tab.label}
          </span>
          {activeTab === tab.id && (
            <motion.div
              layoutId={`underline-${Math.random()}`}
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5BC0BE]"
              initial={false}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
