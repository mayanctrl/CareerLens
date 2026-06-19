import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = ({ 
  items = [], // Array of { label, path }
  className = '' 
}) => {
  return (
    <nav className={`flex items-center text-label-sm font-semibold select-none ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center gap-1.5 text-on-surface-variant">
        <li>
          <Link to="/dashboard" className="hover:text-on-surface flex items-center transition-colors">
            <Home className="w-3.5 h-3.5" />
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={item.path || idx}>
              <ChevronRight className="w-3.5 h-3.5 text-on-surface-variant/40 shrink-0" />
              <li>
                {isLast || !item.path ? (
                  <span className="text-on-surface" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link to={item.path} className="hover:text-on-surface transition-colors">
                    {item.label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
