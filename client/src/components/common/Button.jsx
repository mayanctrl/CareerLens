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
  
  const baseStyles = 'inline-flex items-center justify-center font-label text-label-md font-semibold rounded-lg transition-all duration-normal ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]';
  
  const variants = {
    primary: 'bg-primary text-on-primary hover:shadow-glow-strong hover:brightness-110',
    secondary: 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-on-primary hover:border-transparent',
    ghost: 'bg-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/40',
    danger: 'bg-error text-on-error hover:brightness-110 focus-visible:ring-error',
    success: 'bg-success text-white hover:brightness-110 focus-visible:ring-success',
  };
  
  const sizes = {
    sm: 'h-8 px-3 text-label-sm gap-1.5',
    md: 'h-10 px-4 py-2 gap-2',
    lg: 'h-12 px-6 py-3 text-body-md gap-2.5',
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
        <Loader2 className="h-4 w-4 animate-spin shrink-0" />
      ) : Icon ? (
        <Icon className="h-4 w-4 shrink-0" />
      ) : null}
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
