import React, { useState } from 'react';

const Avatar = ({ 
  src, 
  alt = 'Avatar', 
  name = '', 
  size = 'md', // sm, md, lg, xl
  className = '' 
}) => {
  const [error, setError] = useState(false);

  const getInitials = (fullName) => {
    if (!fullName) return '';
    const parts = fullName.split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  const initials = getInitials(name || alt);

  const sizeClasses = {
    sm: 'w-7 h-7 text-label-sm',
    md: 'w-10 h-10 text-label-md',
    lg: 'w-16 h-16 text-headline-md',
    xl: 'w-24 h-24 text-headline-lg',
  };

  return (
    <div 
      className={`rounded-full shrink-0 flex items-center justify-center overflow-hidden border border-outline-variant/10 select-none ${sizeClasses[size]} ${className}`}
    >
      {src && !error ? (
        <img
          src={src}
          alt={alt}
          onError={() => setError(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-tr from-primary/30 to-secondary/30 text-primary font-bold flex items-center justify-center uppercase">
          {initials || '?'}
        </div>
      )}
    </div>
  );
};

export default Avatar;
