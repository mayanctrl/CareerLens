import React from 'react';

const Skeleton = ({ 
  className = '', 
  variant = 'text', // text, circular, rectangular
  ...props 
}) => {
  const baseClasses = 'skeleton w-full';
  
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-2xl',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <div 
      className={classes} 
      {...props} 
      aria-hidden="true"
    />
  );
};

export default Skeleton;
