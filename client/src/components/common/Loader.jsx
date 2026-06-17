import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = ({ size = 'md', className = '', fullScreen = false, text }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const content = (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <Loader2 className={`animate-spin text-[#5BC0BE] ${sizes[size]}`} />
      {text && <p className="mt-4 text-[#BDC9C8] font-medium animate-pulse">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B132B]/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return content;
};

export const Skeleton = ({ className = '', ...props }) => {
  return (
    <div
      className={`skeleton ${className}`}
      {...props}
    />
  );
};

export default Loader;
