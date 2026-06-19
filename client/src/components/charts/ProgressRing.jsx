import React, { useEffect, useState } from 'react';

const ProgressRing = ({ 
  progress = 0, 
  size = 120, 
  strokeWidth = 10, 
  color = '#55e0d2', // Primary Accent (teal)
  trackColor = '#0c2133', // surface-container
  children 
}) => {
  const [offset, setOffset] = useState(0);
  
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const safeProgress = Math.min(Math.max(Number(progress) || 0, 0), 100);

  useEffect(() => {
    const progressOffset = circumference - (safeProgress / 100) * circumference;
    const timer = setTimeout(() => {
      setOffset(progressOffset);
    }, 100);
    return () => clearTimeout(timer);
  }, [setOffset, circumference, safeProgress]);

  const initialOffset = circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={trackColor}
          strokeWidth={strokeWidth}
          className="transition-colors"
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset === 0 && safeProgress === 0 ? initialOffset : offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
          style={{
            filter: `drop-shadow(0 0 6px ${color}30)`
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center flex-col text-center">
        {children || (
          <span className="text-headline-lg font-bold font-headline text-on-surface">
            {safeProgress}%
          </span>
        )}
      </div>
    </div>
  );
};

export default ProgressRing;
