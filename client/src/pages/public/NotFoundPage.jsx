import React from 'react';
import { Link } from 'react-router-dom';
import { Ghost, Home, ArrowLeft } from 'lucide-react';
import Button from '../../components/common/Button';
import SEO from '../../components/common/SEO';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <SEO title="Page Not Found" description="The page you requested could not be found. Return to CareerLens to continue your career journey." />
      
      <div className="w-24 h-24 bg-surface-container rounded-full flex items-center justify-center mb-8 relative border border-outline-variant/20 shadow-glow-teal">
        <Ghost className="w-12 h-12 text-primary" aria-hidden="true" />
        <div className="absolute -bottom-2 -right-2 text-4xl">❓</div>
      </div>
      
      <h1 className="text-display-lg font-bold text-on-surface mb-4">404</h1>
      <h2 className="text-headline-md font-bold text-on-surface mb-4">Page Not Found</h2>
      
      <p className="text-body-md text-on-surface-variant max-w-md mb-8">
        The career path you're looking for doesn't exist yet, or it might have been moved. Let's get you back on track.
      </p>
      
      <div className="flex gap-4">
        <Button 
          variant="secondary"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
          Go Back
        </Button>
        <Link to="/dashboard">
          <Button icon={Home}>Return Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
