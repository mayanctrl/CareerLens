import React from 'react';
import Button from './Button';

const EmptyState = ({
  icon: Icon,
  title = 'No data available',
  description = 'There is currently no information to display here.',
  actionLabel,
  onAction,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 glass-panel border border-outline-variant/10 rounded-2xl ${className}`}>
      {Icon && (
        <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center text-primary mb-5 border border-outline-variant/10">
          <Icon className="w-8 h-8" />
        </div>
      )}
      <h3 className="text-headline-md font-bold text-on-surface mb-2">{title}</h3>
      <p className="text-body-md text-on-surface-variant max-w-sm mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
