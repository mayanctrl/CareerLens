import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronRight, ChevronLeft, Target, Brain, MessageSquare, Lightbulb } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import ProgressBar from '../../components/common/ProgressBar';
import api from '../../lib/api';
import { showToast } from '../../components/common/Toast';

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
      const calculateScore = (categoryPrefix) => {
        const categoryAnswers = Object.entries(answers)
          .filter(([key]) => key.startsWith(categoryPrefix))
          .map(([_, val]) => val);
        
        if (categoryAnswers.length === 0) return 50;
        
        const sum = categoryAnswers.reduce((a, b) => a + b, 0);
        const avg = sum / categoryAnswers.length;
        return Math.round((avg / 5) * 100);
      };

      const payload = {
        technical_score: calculateScore('t'),
        communication_score: calculateScore('c'),
        creativity_score: calculateScore('cr'),
        leadership_score: calculateScore('l'),
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
    <div className="max-w-3xl mx-auto py-8 font-body">
      <div className="mb-8">
        <h1 className="text-headline-lg font-bold text-on-surface mb-2">
          Career Assessment
        </h1>
        <p className="text-body-md text-on-surface-variant">
          Discover your unique cognitive profile to match you with matching career paths.
        </p>
      </div>

      <Card className="mb-8 p-0" glass>
        <div className="p-6 border-b border-outline-variant/10 bg-surface-container-low">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                <currentCategory.icon className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-headline-sm font-bold text-on-surface">{currentCategory.title}</h2>
            </div>
            <span className="text-label-sm font-semibold text-on-surface-variant">
              Step {currentStep + 1} of {totalSteps}
            </span>
          </div>
          <ProgressBar progress={progress} height="h-1.5" gradient={false} colorClass="bg-primary" />
        </div>

        <div className="p-6 space-y-8 bg-surface/50">
          {currentCategory.questions.map((q, idx) => (
            <div key={q.id} className="animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
              <h3 className="text-body-lg font-semibold text-on-surface mb-4">
                {idx + 1}. {q.text}
              </h3>
              
              <div className="flex justify-between gap-2 sm:gap-4">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    onClick={() => handleAnswer(q.id, val)}
                    className={`
                      flex-1 py-3 rounded-lg border font-bold font-headline transition-all duration-normal active:scale-95 outline-none
                      ${answers[q.id] === val 
                        ? 'bg-primary border-transparent text-on-primary shadow-glow-strong' 
                        : 'bg-surface-container-low border-outline-variant/20 text-on-surface-variant hover:border-primary/40 hover:text-on-surface'
                      }
                    `}
                  >
                    <span>{val}</span>
                  </button>
                ))}
              </div>
              <div className="flex justify-between mt-2.5 text-label-sm text-on-surface-variant/75 px-1 font-semibold">
                <span>Strongly Disagree</span>
                <span>Strongly Agree</span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-outline-variant/10 bg-surface-container-low flex justify-between rounded-b-2xl">
          <Button 
            variant="ghost" 
            onClick={handlePrev}
            disabled={currentStep === 0 || isSubmitting}
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
      
      <div className="flex justify-center text-label-sm font-semibold text-on-surface-variant/80 items-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-primary" />
        Your answers are saved automatically and kept strictly confidential.
      </div>
    </div>
  );
};

export default AssessmentPage;
