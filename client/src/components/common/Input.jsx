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
  
  const generatedId = id || Math.random().toString(36).substr(2, 9);
  
  return (
    <div className={`flex flex-col space-y-1.5 ${containerClassName}`}>
      {label && (
        <label htmlFor={generatedId} className="text-sm font-medium text-[#BDC9C8]">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Icon className="h-5 w-5 text-[#879392]" />
          </div>
        )}
        <input
          id={generatedId}
          ref={ref}
          className={`
            flex h-10 w-full rounded-sm border bg-[#0B132B] px-3 py-2 text-sm text-[#DBE1FF] 
            placeholder:text-[#879392] 
            focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#5BC0BE] focus-visible:border-[#5BC0BE]
            disabled:cursor-not-allowed disabled:opacity-50
            transition-colors
            ${Icon ? 'pl-10' : ''}
            ${error ? 'border-[#EF4444] focus-visible:ring-[#EF4444] focus-visible:border-[#EF4444]' : 'border-[#3D4948]'}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <span className="text-xs text-[#FFB4AB] mt-1">{error}</span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
