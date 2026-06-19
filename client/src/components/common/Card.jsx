import React from 'react';

const Card = React.forwardRef(({ 
  children, 
  className = '', 
  hoverEffect = false,
  glass = true,
  padding = 'p-6',
  accentBar = null, // 'primary', 'secondary', 'tertiary', 'error'
  ...props 
}, ref) => {
  const baseStyles = 'rounded-2xl overflow-hidden border border-outline-variant/10 transition-all duration-normal ease-smooth';
  
  const bgStyles = glass 
    ? 'glass-panel shadow-md' 
    : 'bg-surface-container shadow-md';
    
  const hoverStyles = hoverEffect 
    ? 'hover:border-primary/30 hover:shadow-glow-teal hover:-translate-y-0.5' 
    : '';

  const accentStyles = {
    primary: 'border-t-4 border-t-primary',
    secondary: 'border-t-4 border-t-secondary',
    tertiary: 'border-t-4 border-t-tertiary',
    error: 'border-t-4 border-t-error',
  };

  const classes = `
    ${baseStyles}
    ${bgStyles}
    ${hoverStyles}
    ${accentBar ? accentStyles[accentBar] : ''}
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
