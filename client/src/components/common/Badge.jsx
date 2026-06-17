import React from 'react';

const Badge = ({ 
  children, 
  variant = 'default', 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';
  
  const variants = {
    default: 'bg-[#1C2541] text-[#DBE1FF] border border-[#3A506B]',
    primary: 'bg-[rgba(91,192,190,0.15)] text-[#5BC0BE] border border-[#5BC0BE]/30',
    secondary: 'bg-[rgba(111,255,233,0.15)] text-[#6FFFE9] border border-[#6FFFE9]/30',
    success: 'bg-[rgba(34,197,94,0.15)] text-[#22C55E] border border-[#22C55E]/30',
    warning: 'bg-[rgba(245,158,11,0.15)] text-[#F59E0B] border border-[#F59E0B]/30',
    error: 'bg-[rgba(239,68,68,0.15)] text-[#FFB4AB] border border-[#EF4444]/30',
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Badge;
