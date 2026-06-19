import React from 'react';
import { HelpCircle, MessageSquare, Compass, Award, LifeBuoy } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const HelpPage = () => {
  const faqs = [
    {
      q: 'How does the Career Readiness Score work?',
      a: 'The readiness score is an AI-powered combination of your assessment scores, technical skills mastered, experience inputs, and connected project portfolios. As you master more gaps, the score automatically updates.'
    },
    {
      q: 'How are Job Matches calculated?',
      a: 'We evaluate your active skill profiles and assessment coefficients against current market demands. Roles matching higher percentages of your mastered skill-set rank higher.'
    },
    {
      q: 'Can I add custom learning roadmaps?',
      a: 'Yes, inside AI Recommendations, clicking any role matching suggestion generates week-by-week learning tasks matching missing gaps.'
    },
    {
      q: 'How do I submit my built projects?',
      a: 'Inside the Project details page, connect your GitHub repository and input a live URL. The analyzer reviews commits to mark milestones as completed.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 animate-fade-in font-body">
      {/* Title */}
      <div>
        <h1 className="text-headline-lg font-bold text-on-surface mb-2 font-headline">Support Center</h1>
        <p className="text-body-md text-on-surface-variant">
          Find answers to frequently asked questions or request direct support from our product guides.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* FAQs */}
        <div className="md:col-span-8 space-y-4">
          <h2 className="text-headline-sm font-bold text-on-surface mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <Card key={idx} glass className="p-5">
                <h3 className="text-body-lg font-bold text-on-surface mb-2">{faq.q}</h3>
                <p className="text-body-md text-on-surface-variant leading-relaxed">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Help */}
        <div className="md:col-span-4 space-y-6">
          <Card glass accentBar="primary" className="text-center p-6 flex flex-col items-center">
            <LifeBuoy className="w-12 h-12 text-primary mb-4 shrink-0 shadow-md" />
            <h3 className="text-headline-sm font-bold text-on-surface mb-2">Need More Help?</h3>
            <p className="text-label-sm text-on-surface-variant mb-6 leading-relaxed">
              Our support guides are standing by. Get help resolving assessment issues or upskilling recommendations.
            </p>
            <Button fullWidth>
              Contact Support
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
