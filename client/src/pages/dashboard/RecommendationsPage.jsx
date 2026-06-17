import React, { useState, useEffect } from 'react';
import { Compass, Briefcase, Star, ArrowRight, DollarSign, TrendingUp, CheckCircle } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Loader from '../../components/common/Loader';
import ProgressRing from '../../components/charts/ProgressRing';
import api from '../../lib/api';
import { showToast } from '../../components/common/Toast';

const RecommendationsPage = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const res = await api.get('/recommendations');
      setRecommendations(res.data);
    } catch (error) {
      showToast.error(error.message || 'Failed to fetch recommendations');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader fullScreen text="Analyzing your profile to find the best career matches..." />;
  }

  if (recommendations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <Compass className="w-16 h-16 text-[#3A506B] mb-6" />
        <h2 className="text-2xl font-bold font-['Geist'] text-white mb-2">No Recommendations Yet</h2>
        <p className="text-[#BDC9C8] max-w-md mb-8">
          Complete your career assessment to get personalized AI-driven career path recommendations.
        </p>
        <Button onClick={() => window.location.href = '/assessment'}>Take Assessment</Button>
      </div>
    );
  }

  const topMatch = recommendations[0];
  const otherMatches = recommendations.slice(1);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold font-['Geist'] text-white mb-2">
            AI Career Recommendations
          </h1>
          <p className="text-[#BDC9C8]">
            Based on your latest assessment, here are the best paths for you.
          </p>
        </div>
      </div>

      {/* Top Match Section */}
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#5BC0BE] to-[#6FFFE9] rounded-2xl blur opacity-20 animate-pulse" />
        <Card className="relative p-0 border-[#5BC0BE]/30 bg-[#1C2541]">
          <div className="absolute top-0 right-0 p-4">
            <Badge variant="primary" className="shadow-glow">
              <Star className="w-3 h-3 mr-1 fill-[#5BC0BE]" /> Top Match
            </Badge>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 p-8">
            <div className="col-span-1 flex flex-col items-center justify-center border-r border-[#3A506B] pr-8">
              <ProgressRing progress={topMatch.match_percentage} size={160} strokeWidth={12} color="#5BC0BE">
                <span className="text-4xl font-bold font-['Geist'] text-white">{topMatch.match_percentage}%</span>
                <span className="text-sm font-medium text-[#5BC0BE]">Match Score</span>
              </ProgressRing>
            </div>
            
            <div className="col-span-2 flex flex-col justify-center space-y-6">
              <div>
                <h2 className="text-3xl font-bold font-['Geist'] text-white mb-2">{topMatch.career_name}</h2>
                <p className="text-lg text-[#BDC9C8] leading-relaxed">
                  {topMatch.description}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-[#0B132B] px-4 py-2 rounded-lg border border-[#3A506B]">
                  <DollarSign className="w-5 h-5 text-[#22C55E]" />
                  <div>
                    <div className="text-xs text-[#879392] uppercase tracking-wider font-semibold">Salary Range</div>
                    <div className="font-medium text-white">{topMatch.salary_range}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-[#0B132B] px-4 py-2 rounded-lg border border-[#3A506B]">
                  <TrendingUp className="w-5 h-5 text-[#F59E0B]" />
                  <div>
                    <div className="text-xs text-[#879392] uppercase tracking-wider font-semibold">Growth</div>
                    <div className="font-medium text-white">{topMatch.growth_rate}</div>
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <Button size="lg" className="shadow-glow">
                  Select This Path & Create Roadmap <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Other Matches */}
      <div>
        <h3 className="text-xl font-bold font-['Geist'] text-white mb-6">Other Strong Matches</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {otherMatches.map((job) => (
            <Card key={job.recommendation_id} hoverEffect className="flex flex-col h-full bg-[#171E37] border-[#3A506B]">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="32" cy="32" r="28" fill="none" stroke="#212942" strokeWidth="6" />
                      <circle 
                        cx="32" 
                        cy="32" 
                        r="28" 
                        fill="none" 
                        stroke="#6FFFE9" 
                        strokeWidth="6" 
                        strokeDasharray={`${(job.match_percentage / 100) * (2 * Math.PI * 28)} 200`} 
                        strokeLinecap="round" 
                      />
                    </svg>
                    <span className="absolute text-sm font-bold text-white">{job.match_percentage}%</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">{job.career_name}</h4>
                    <span className="text-sm text-[#879392]">Score: High</span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-[#BDC9C8] mb-6 flex-1 line-clamp-2">
                {job.description}
              </p>
              
              <div className="mt-auto border-t border-[#3A506B] pt-4 flex justify-between items-center">
                <div className="text-sm font-medium text-[#879392]">{job.salary_range}</div>
                <Button variant="ghost" size="sm" className="text-[#5BC0BE]">
                  View Details <ArrowRight className="w-4 h-4 ml-1" />
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
