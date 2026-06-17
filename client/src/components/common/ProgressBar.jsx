import React from 'react';

const ProgressBar = ({ 
  progress = 0, 
  className = '', 
  height = 'h-2',
  showLabel = false,
  label = '',
  gradient = true,
  colorClass = 'bg-[#5BC0BE]'
}) => {
  const safeProgress = Math.min(Math.max(Number(progress) || 0, 0), 100);
  
  return (
    <div className={`w-full ${className}`}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-sm font-medium text-[#BDC9C8]">{label}</span>}
          {showLabel && <span className="text-sm font-bold text-[#DBE1FF]">{safeProgress}%</span>}
        </div>
      )}
      <div className={`w-full bg-[#1C2541] rounded-full overflow-hidden ${height} border border-[#3A506B]`}>
        <div 
          className={`h-full rounded-full transition-all duration-1000 ease-out ${gradient ? 'gradient-bg' : colorClass}`}
          style={{ width: `${safeProgress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
