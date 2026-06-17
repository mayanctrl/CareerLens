import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronRight, ChevronLeft, Target, Brain, MessageSquare, Lightbulb, UserCheck, Activity, Award } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import ProgressBar from '../../components/common/ProgressBar';
import api from '../../lib/api';
import { showToast } from '../../components/common/Toast';

// Mock questions for the assessment
const assessmentCategories = [
  {
    id: 'technical',
    title: 'Technical Aptitude',
    icon: Brain,
    questions: [
      { id: 't1', text: 'How comfortable are you with complex problem-solving logic?' },
      { id: 't2', text: 'Do you enjoy understanding how systems work under the hood?' },
    ]
  },
  {
    id: 'communication',
    title: 'Communication & Collaboration',
    icon: MessageSquare,
    questions: [
      { id: 'c1', text: 'How effectively can you explain complex concepts to non-technical people?' },
      { id: 'c2', text: 'Do you prefer working in a team environment over working alone?' },
    ]
  },
  {
    id: 'creativity',
    title: 'Creativity & Design',
    icon: Lightbulb,
    questions: [
      { id: 'cr1', text: 'How much do you value the visual aesthetics of a product?' },
      { id: 'cr2', text: 'Do you often come up with unconventional solutions to problems?' },
    ]
  },
  {
    id: 'leadership',
    title: 'Leadership & Management',
    icon: Target,
    questions: [
      { id: 'l1', text: 'Are you comfortable taking charge and delegating tasks?' },
      { id: 'l2', text: 'Do you enjoy mentoring and helping others grow?' },
    ]
  }
];

const AssessmentPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentCategory = assessmentCategories[currentStep];
  const totalSteps = assessmentCategories.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const isStepComplete = () => {
    return currentCategory.questions.every(q => answers[q.id] !== undefined);
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // In a real app, you'd calculate these properly based on all answers
      // For this MVP, we're generating scores based on the mock answers
      
      const calculateScore = (categoryPrefix) => {
        const categoryAnswers = Object.entries(answers)
          .filter(([key]) => key.startsWith(categoryPrefix))
          .map(([_, val]) => val);
        
        if (categoryAnswers.length === 0) return 50;
        
        // Convert 1-5 scale to 0-100 scale roughly
        const sum = categoryAnswers.reduce((a, b) => a + b, 0);
        const avg = sum / categoryAnswers.length;
        return Math.round((avg / 5) * 100);
      };

      const payload = {
        technical_score: calculateScore('t'),
        communication_score: calculateScore('c'),
        creativity_score: calculateScore('cr'),
        leadership_score: calculateScore('l'),
        // Fills in missing scores with reasonable defaults for the engine
        interest_score: 85,
        aptitude_score: 75,
        personality_score: 80,
      };

      const res = await api.post('/assessment', payload);
      
      if (res.success) {
        showToast.success('Assessment completed! Generating recommendations...');
        navigate('/recommendations');
      }
    } catch (error) {
      showToast.error(error.message || 'Failed to submit assessment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-['Geist'] text-white mb-2">
          Career Assessment
        </h1>
        <p className="text-[#BDC9C8]">
          Let's discover your unique cognitive profile to match you with the perfect career paths.
        </p>
      </div>

      <Card className="mb-8 p-0">
        <div className="p-6 border-b border-[#3A506B] bg-[#1C2541]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[rgba(91,192,190,0.15)] flex items-center justify-center">
                <currentCategory.icon className="w-5 h-5 text-[#5BC0BE]" />
              </div>
              <h2 className="text-xl font-bold text-white">{currentCategory.title}</h2>
            </div>
            <span className="text-sm font-medium text-[#879392]">
              Step {currentStep + 1} of {totalSteps}
            </span>
          </div>
          <ProgressBar progress={progress} height="h-1.5" gradient={true} />
        </div>

        <div className="p-6 space-y-8">
          {currentCategory.questions.map((q, idx) => (
            <div key={q.id} className="animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
              <h3 className="text-lg font-medium text-[#DBE1FF] mb-4">
                {idx + 1}. {q.text}
              </h3>
              
              <div className="flex justify-between gap-2 sm:gap-4">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    onClick={() => handleAnswer(q.id, val)}
                    className={`
                      flex-1 py-3 rounded-lg border transition-all
                      ${answers[q.id] === val 
                        ? 'bg-[#5BC0BE] border-[#5BC0BE] text-[#0B132B] shadow-[0_0_15px_rgba(91,192,190,0.3)]' 
                        : 'bg-[#0B132B] border-[#3A506B] text-[#879392] hover:border-[#5BC0BE]/50 hover:text-[#DBE1FF]'
                      }
                    `}
                  >
                    <span className="font-bold">{val}</span>
                  </button>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-[#879392] px-2">
                <span>Strongly Disagree</span>
                <span>Strongly Agree</span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-[#3A506B] bg-[#0B132B] flex justify-between rounded-b-xl">
          <Button 
            variant="ghost" 
            onClick={handlePrev}
            disabled={currentStep === 0 || isSubmitting}
            className="pl-0"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <Button 
            onClick={handleNext}
            disabled={!isStepComplete()}
            isLoading={isSubmitting}
          >
            {currentStep === totalSteps - 1 ? 'Submit Assessment' : 'Next Category'}
            {currentStep < totalSteps - 1 && <ChevronRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </Card>
      
      <div className="flex justify-center text-sm text-[#879392] items-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-[#5BC0BE]" />
        Your answers are saved automatically and kept strictly confidential.
      </div>
    </div>
  );
};

export default AssessmentPage;
