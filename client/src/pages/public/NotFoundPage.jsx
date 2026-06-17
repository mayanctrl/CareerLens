import React from 'react';
import { Link } from 'react-router-dom';
import { Ghost, Home, ArrowLeft } from 'lucide-react';
import Button from '../../components/common/Button';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#0B132B] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-24 h-24 bg-[#1C2541] rounded-full flex items-center justify-center mb-8 relative border border-[#3A506B]">
        <Ghost className="w-12 h-12 text-[#5BC0BE]" />
        <div className="absolute -bottom-2 -right-2 text-4xl">❓</div>
      </div>
      
      <h1 className="text-6xl font-bold font-['Geist'] text-white mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-[#DBE1FF] mb-4">Page Not Found</h2>
      
      <p className="text-[#BDC9C8] max-w-md mb-8">
        The career path you're looking for doesn't exist yet, or it might have been moved. Let's get you back on track.
      </p>
      
      <div className="flex gap-4">
        <button 
          onClick={() => window.history.back()}
          className="flex items-center justify-center h-10 px-4 rounded-sm bg-[#1C2541] text-[#DBE1FF] border border-[#3A506B] hover:bg-[#212942] hover:border-[#5BC0BE] hover:text-[#5BC0BE] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </button>
        <Link to="/dashboard">
          <Button icon={Home}>Return Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
