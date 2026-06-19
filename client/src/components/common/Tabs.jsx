import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Tabs = ({ 
  tabs = [], 
  defaultTab, 
  onChange, 
  variant = 'underline', // 'underline' | 'pill'
  className = '',
  layoutIdPrefix = 'tabs'
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
              px-4 py-2 rounded-full text-label-sm font-semibold transition-all relative outline-none
              ${activeTab === tab.id ? 'text-on-primary' : 'text-on-surface-variant hover:text-on-surface bg-surface-container-low hover:bg-surface-variant/40 border border-outline-variant/10'}
            `}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId={`${layoutIdPrefix}-pill-active`}
                className="absolute inset-0 bg-primary rounded-full"
                initial={false}
                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                style={{ zIndex: -1 }}
              />
            )}
            <span className="relative z-10 flex items-center">
              {tab.icon && <tab.icon className="w-4 h-4 mr-1.5 shrink-0" />}
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    );
  }

  // Default underline variant
  return (
    <div className={`border-b border-outline-variant/10 flex overflow-x-auto no-scrollbar ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={`
            px-5 py-3 text-label-md font-semibold relative whitespace-nowrap outline-none transition-colors
            ${activeTab === tab.id ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/20'}
          `}
        >
          <span className="flex items-center">
            {tab.icon && <tab.icon className="w-4 h-4 mr-1.5 shrink-0" />}
            {tab.label}
          </span>
          {activeTab === tab.id && (
            <motion.div
              layoutId={`${layoutIdPrefix}-underline-active`}
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              initial={false}
              transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
