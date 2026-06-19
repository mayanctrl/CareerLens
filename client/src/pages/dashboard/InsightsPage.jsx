import React, { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, Info, HelpCircle, ArrowUpRight, DollarSign } from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Loader from '../../components/common/Loader';
import api from '../../lib/api';

const MOCK_INSIGHTS = {
  trending: [
    { id: 1, role: 'AI Engineer', demand: 'Very High (+40% YoY)', salary: '$140k - $210k', skills: ['Python', 'PyTorch', 'LLMs'] },
    { id: 2, role: 'React/Next.js UI Specialist', demand: 'High (+22% YoY)', salary: '$110k - $160k', skills: ['React', 'Next.js', 'Tailwind'] },
    { id: 3, role: 'Cloud Platform Architect', demand: 'High (+18% YoY)', salary: '$130k - $185k', skills: ['AWS', 'Kubernetes', 'Terraform'] }
  ],
  marketGrowth: 'The software industry remains highly active, with frontend-to-fullstack engineering demands rising by 15% in Q2 2026. TypeScript and serverless execution architectures hold the highest upskilling premiums.'
};

const InsightsPage = () => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      setLoading(true);
      const res = await api.get('/insights/trending');
      if (res && res.data) {
        setInsights(res.data);
      } else {
        setInsights(MOCK_INSIGHTS);
      }
    } catch (err) {
      console.warn('API error (using fallback insights):', err);
      setInsights(MOCK_INSIGHTS);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader fullScreen text="Querying market analytics..." />;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-fade-in font-body">
      {/* Title */}
      <div>
        <h1 className="text-headline-lg font-bold text-on-surface mb-2 font-headline">Career Insights</h1>
        <p className="text-body-md text-on-surface-variant">
          Analyze real-time industry hiring behaviors, trending stacks, and market compensation premiums.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Trending Stacks (Left) */}
        <div className="lg:col-span-8 space-y-6">
          <h2 className="text-headline-sm font-bold text-on-surface flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary shrink-0" /> Market Hotspots
          </h2>

          <div className="space-y-4">
            {insights?.trending?.map((trend) => (
              <Card key={trend.id} hoverEffect glass>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-body-lg font-bold text-on-surface">{trend.role}</h3>
                    <span className="text-label-sm text-primary font-semibold flex items-center gap-1 mt-0.5">
                      <ArrowUpRight className="w-3.5 h-3.5" /> {trend.demand}
                    </span>
                  </div>
                  <Badge variant="success" className="py-1 px-3 text-label-sm font-bold">
                    {trend.salary}
                  </Badge>
                </div>
                
                <div>
                  <div className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold mb-2">Core Requirement Stack</div>
                  <div className="flex flex-wrap gap-1.5">
                    {trend.skills.map((skill) => (
                      <Badge key={skill} variant="default" className="py-0.5 px-2 text-[10px]">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Market report (Right) */}
        <div className="lg:col-span-4 space-y-6">
          <Card glass accentBar="secondary">
            <h2 className="text-headline-sm font-bold text-on-surface mb-3 flex items-center gap-2">
              <Info className="w-5 h-5 text-secondary shrink-0" /> Market Outlook
            </h2>
            <p className="text-body-md text-on-surface-variant leading-relaxed">
              {insights?.marketGrowth}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InsightsPage;
