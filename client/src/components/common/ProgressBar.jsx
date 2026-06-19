import React from 'react';

const ProgressBar = ({ 
  progress = 0, 
  className = '', 
  height = 'h-2',
  showLabel = false,
  label = '',
  gradient = true,
  colorClass = 'bg-primary'
}) => {
  const safeProgress = Math.min(Math.max(Number(progress) || 0, 0), 100);
  
  return (
    <div className={`w-full ${className}`}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-label-sm font-semibold text-on-surface-variant">{label}</span>}
          {showLabel && <span className="text-label-sm font-bold text-on-surface">{safeProgress}%</span>}
        </div>
      )}
      <div className={`w-full bg-surface-variant/40 rounded-full overflow-hidden ${height} border border-outline-variant/10`}>
        <div 
          className={`h-full rounded-full transition-all duration-500 ease-out ${gradient ? 'gradient-bg' : colorClass}`}
          style={{ width: `${safeProgress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
