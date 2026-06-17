import React from 'react';

const Card = React.forwardRef(({ 
  children, 
  className = '', 
  hoverEffect = false,
  glass = false,
  padding = 'p-6',
  ...props 
}, ref) => {
  const baseStyles = 'rounded-xl overflow-hidden';
  const bgStyles = glass ? 'glass' : 'bg-[#1C2541] border border-[#3A506B]';
  const hoverStyles = hoverEffect ? 'card-hover' : '';
  
  const classes = `
    ${baseStyles}
    ${bgStyles}
    ${hoverStyles}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div ref={ref} className={classes} {...props}>
      <div className={padding}>
        {children}
      </div>
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
