import React from 'react';
import { ChevronDown } from 'lucide-react';

const Select = React.forwardRef(({ 
  label, 
  error, 
  id, 
  className = '', 
  containerClassName = '',
  options = [],
  placeholder = 'Select an option',
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
        <select
          id={generatedId}
          ref={ref}
          className={`
            flex h-10 w-full rounded-lg border bg-surface-container-low px-3.5 py-2 text-body-md text-on-surface 
            appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
            disabled:cursor-not-allowed disabled:opacity-50
            transition-all duration-normal ease-smooth pr-10
            ${error ? 'border-error focus:border-error focus:ring-error' : 'border-outline-variant/30 hover:border-outline-variant/60'}
            ${className}
          `}
          {...props}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-surface-container text-on-surface">
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-on-surface-variant/70">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
      {error && (
        <span className="text-label-sm text-error mt-0.5">{error}</span>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
