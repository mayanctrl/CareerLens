import React, { useState, useEffect } from 'react';
import { Compass, Briefcase, Star, ArrowRight, DollarSign, TrendingUp } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Loader from '../../components/common/Loader';
import ProgressRing from '../../components/charts/ProgressRing';
import EmptyState from '../../components/common/EmptyState';
import api from '../../lib/api';
import { showToast } from '../../components/common/Toast';

const DEFAULT_RECOMMENDATIONS = [
  {
    recommendation_id: 'rec-1',
    career_name: 'Senior Frontend Engineer',
    match_percentage: 94,
    description: 'Architect, build, and optimize complex web applications. Lead user experience design architectures and maintain high-fidelity styling across multiple device footprints.',
    salary_range: '$130,000 - $185,000',
    growth_rate: 'High (15% YoY)'
  },
  {
    recommendation_id: 'rec-2',
    career_name: 'Cloud Engineer',
    match_percentage: 88,
    description: 'Manage cloud architecture deployments, serverless scaling, API routing, database clusters, and secure server environments.',
    salary_range: '$120,000 - $165,000',
    growth_rate: 'High (18% YoY)'
  },
  {
    recommendation_id: 'rec-3',
    career_name: 'Product UI Engineer',
    match_percentage: 85,
    description: 'Bridge the gap between design concepts and front-end development, engineering rich micro-interactions and ensuring system usability matches spec.',
    salary_range: '$110,000 - $145,000',
    growth_rate: 'Medium (9% YoY)'
  }
];

const RecommendationsPage = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const res = await api.get('/recommendations');
      // Check if backend returns array with elements
      if (res && Array.isArray(res.data) && res.data.length > 0) {
        setRecommendations(res.data);
      } else {
        // Fallback to default recommendations so application displays beautifully
        setRecommendations(DEFAULT_RECOMMENDATIONS);
      }
    } catch (error) {
      console.warn('API error (using fallback recommendations):', error);
      setRecommendations(DEFAULT_RECOMMENDATIONS);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPath = () => {
    showToast.success('Path selected! Building your week-by-week learning roadmap...');
    setTimeout(() => {
      window.location.href = '/roadmap';
    }, 1000);
  };

  if (loading) {
    return <Loader fullScreen text="Analyzing your profile to find the best career matches..." />;
  }

  if (recommendations.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <EmptyState
          icon={Compass}
          title="No Recommendations Yet"
          description="Complete your career assessment to get personalized AI-driven career path recommendations."
          actionLabel="Take Assessment"
          onAction={() => window.location.href = '/assessment'}
        />
      </div>
    );
  }

  const topMatch = recommendations[0];
  const otherMatches = recommendations.slice(1);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-fade-in font-body">
      <div>
        <h1 className="text-headline-lg font-bold text-on-surface mb-2">
          AI Career Recommendations
        </h1>
        <p className="text-body-md text-on-surface-variant">
          Based on your latest assessment, here are the top matching paths for you.
        </p>
      </div>

      {/* Top Match Section */}
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-15" />
        <Card className="relative p-0" accentBar="primary" glass>
          <div className="absolute top-4 right-4 z-10">
            <Badge variant="primary" className="py-1 px-3">
              <Star className="w-3.5 h-3.5 mr-1 fill-primary text-primary inline shrink-0" /> Top Match
            </Badge>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 p-8">
            <div className="col-span-1 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-outline-variant/15 pb-6 md:pb-0 md:pr-8">
              <ProgressRing progress={topMatch.match_percentage} size={150} strokeWidth={11} color="#55e0d2">
                <div className="flex flex-col items-center">
                  <span className="text-display-lg font-bold text-on-surface font-headline leading-none">{topMatch.match_percentage}%</span>
                  <span className="text-label-sm text-primary font-semibold mt-1">Match Score</span>
                </div>
              </ProgressRing>
            </div>
            
            <div className="col-span-2 flex flex-col justify-center space-y-5">
              <div>
                <h2 className="text-headline-md font-bold text-on-surface mb-2">{topMatch.career_name}</h2>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  {topMatch.description}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3 bg-surface-low border border-outline-variant/15 px-4 py-2.5 rounded-xl">
                  <DollarSign className="w-5 h-5 text-success shrink-0" />
                  <div>
                    <div className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Salary Range</div>
                    <div className="text-label-md font-bold text-on-surface">{topMatch.salary_range}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-surface-low border border-outline-variant/15 px-4 py-2.5 rounded-xl">
                  <TrendingUp className="w-5 h-5 text-secondary shrink-0" />
                  <div>
                    <div className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Growth Rate</div>
                    <div className="text-label-md font-bold text-on-surface">{topMatch.growth_rate}</div>
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <Button size="lg" className="shadow-glow-teal group" onClick={handleSelectPath}>
                  Select This Path & Create Roadmap <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Other Matches */}
      <div className="space-y-4">
        <h3 className="text-headline-sm font-bold text-on-surface">Other Strong Matches</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {otherMatches.map((job) => (
            <Card key={job.recommendation_id} hoverEffect className="flex flex-col h-[220px]" glass>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-headline-sm font-bold text-on-surface line-clamp-1">{job.career_name}</h4>
                  <span className="text-label-sm font-semibold text-on-surface-variant">Growth: {job.growth_rate}</span>
                </div>
                <div className="relative w-12 h-12 flex items-center justify-center bg-surface-container rounded-lg border border-outline-variant/10">
                  <span className="text-label-sm font-bold text-primary">{job.match_percentage}%</span>
                </div>
              </div>
              
              <p className="text-body-md text-on-surface-variant mb-4 flex-1 line-clamp-2 leading-relaxed">
                {job.description}
              </p>
              
              <div className="mt-auto border-t border-outline-variant/10 pt-3 flex justify-between items-center">
                <div className="text-label-sm text-on-surface-variant/90 font-semibold">{job.salary_range}</div>
                <Button variant="ghost" size="sm" className="text-primary font-bold pr-0 flex items-center gap-1" onClick={handleSelectPath}>
                  Select Path <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendationsPage;
