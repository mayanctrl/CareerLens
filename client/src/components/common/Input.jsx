import React from 'react';

const Input = React.forwardRef(({ 
  label, 
  error, 
  id, 
  className = '', 
  containerClassName = '',
  icon: Icon,
  ...props 
}, ref) => {
  
  const generatedId = id || React.useId();
  
  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label htmlFor={generatedId} className="text-label-md font-semibold text-on-surface-variant">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
            <Icon className="h-4.5 w-4.5 text-on-surface-variant/70" />
          </div>
        )}
        <input
          id={generatedId}
          ref={ref}
          className={`
            flex h-10 w-full rounded-lg border bg-surface-container-low px-3.5 py-2 text-body-md text-on-surface 
            placeholder:text-on-surface-variant/50 
            focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
            disabled:cursor-not-allowed disabled:opacity-50
            transition-all duration-normal ease-smooth
            ${Icon ? 'pl-10.5' : ''}
            ${error ? 'border-error focus:border-error focus:ring-error' : 'border-outline-variant/30 hover:border-outline-variant/60'}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <span className="text-label-sm text-error mt-0.5">{error}</span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
