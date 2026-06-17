import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = React.forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  isLoading = false, 
  disabled = false,
  fullWidth = false,
  type = 'button',
  icon: Icon,
  ...props 
}, ref) => {
  
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B132B] disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-[#5BC0BE] text-[#0B132B] hover:bg-[#6FFFE9] focus-visible:ring-[#5BC0BE]',
    secondary: 'bg-[#1C2541] text-[#DBE1FF] border border-[#3A506B] hover:bg-[#212942] hover:border-[#5BC0BE] hover:text-[#5BC0BE] focus-visible:ring-[#5BC0BE]',
    ghost: 'bg-transparent text-[#BDC9C8] hover:text-[#5BC0BE] hover:bg-[#1C2541] focus-visible:ring-[#5BC0BE]',
    danger: 'bg-transparent text-[#EF4444] border border-[#EF4444] hover:bg-[#EF4444] hover:text-white focus-visible:ring-[#EF4444]',
    success: 'bg-[#22C55E] text-white hover:bg-[#16a34a] focus-visible:ring-[#22C55E]',
  };
  
  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 py-2 text-base',
    lg: 'h-12 px-6 py-3 text-lg',
    icon: 'h-10 w-10',
  };

  const classes = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : Icon ? (
        <Icon className={`h-4 w-4 ${children ? 'mr-2' : ''}`} />
      ) : null}
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
