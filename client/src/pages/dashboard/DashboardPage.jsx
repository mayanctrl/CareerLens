import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  BrainCircuit, 
  Target, 
  TrendingUp, 
  Briefcase, 
  ArrowRight, 
  Sparkles, 
  ShieldAlert,
  Building,
  GraduationCap
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import ProgressBar from '../../components/common/ProgressBar';
import Badge from '../../components/common/Badge';
import ProgressRing from '../../components/charts/ProgressRing';
import Skeleton from '../../components/common/Skeleton';
import api from '../../lib/api';
import SEO from '../../components/common/SEO';

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://careerlens.ai"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Dashboard",
      "item": "https://careerlens.ai/dashboard"
    }
  ]
};

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  
  const userName = user?.user_metadata?.full_name || 'Explorer';
  const firstName = userName.split(' ')[0];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Fire requests to backend endpoints concurrently
        const [progressRes, skillsRes, recommendationsRes] = await Promise.allSettled([
          api.get('/progress/dashboard'),
          api.get('/skills/user'),
          api.get('/recommendations')
        ]);
        
        // Stubs are returned, so we'll mock the final layout data
        // while confirming endpoints are integrated.
        await new Promise((resolve) => setTimeout(resolve, 800)); // smooth transition
        
        setDashboardData({
          readiness: {
            score: 85,
            technical: 90,
            experience: 80,
            projects: 75
          },
          skills: {
            current: ['React', 'JavaScript (ES6)', 'HTML5/CSS3', 'Tailwind CSS', 'Git'],
            missing: ['TypeScript', 'Node.js/Express', 'GraphQL', 'Docker', 'PostgreSQL'],
            priority: ['TypeScript', 'Node.js/Express', 'GraphQL']
          },
          insights: [
            { type: 'role', title: 'Top Role Match', value: 'Senior Frontend Engineer', desc: '94% match probability', icon: Briefcase, color: 'text-primary' },
            { type: 'company', title: 'Dream Company Match', value: 'Google', desc: '90% culture fit match', icon: Building, color: 'text-secondary' },
            { type: 'skill', title: 'Next High-Value Skill', value: 'TypeScript', desc: 'Adds +12% match boost', icon: GraduationCap, color: 'text-tertiary' }
          ],
          opportunities: [
            { company: 'Vercel', logo: 'V', role: 'Software Engineer II', match: 92, salary: '$120k - $150k', location: 'Remote', accent: 'primary' },
            { company: 'Supabase', logo: 'S', role: 'Frontend Specialist', match: 89, salary: '$110k - $130k', location: 'Remote', accent: 'secondary' },
            { company: 'Stripe', logo: 'T', role: 'Full Stack Developer', match: 85, salary: '$130k - $160k', location: 'San Francisco, CA', accent: 'tertiary' },
            { company: 'Airbnb', logo: 'A', role: 'Frontend Engineer', match: 82, salary: '$115k - $145k', location: 'Remote', accent: 'primary' }
          ]
        });
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8 pb-12 animate-fade-in">
        {/* Header Skeleton */}
        <div className="space-y-3">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-5 w-96" />
        </div>

        {/* Bento Skeleton Grid */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-5 h-[340px] skeleton rounded-2xl" />
          <div className="col-span-12 lg:col-span-7 h-[340px] skeleton rounded-2xl" />
        </div>

        {/* Sub-grid Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-32 skeleton rounded-2xl" />
          <div className="h-32 skeleton rounded-2xl" />
          <div className="h-32 skeleton rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 animate-fade-in font-body">
      <SEO title="Dashboard" description="Your AI career guidance dashboard. Track readiness scores, skill gaps, and explore recommendations." schema={breadcrumbSchema} />
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-headline-lg font-bold text-on-surface leading-tight tracking-tight">
            Welcome back, {firstName}! 👋
          </h1>
          <p className="text-body-md text-on-surface-variant">
            Your career trajectory is looking strong. Here's your daily summary.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" icon={Target} onClick={() => navigate('/assessment')}>Retake Assessment</Button>
          <Button icon={TrendingUp} onClick={() => navigate('/skills')}>Analyze Skills</Button>
        </div>
      </div>

      {/* Bento Grid: 12-columns */}
      <div className="grid grid-cols-12 gap-6">
        {/* Readiness Score (col-span-5) */}
        <Card className="col-span-12 lg:col-span-5 flex flex-col justify-between" glass>
          <div>
            <h2 className="text-headline-sm font-bold text-on-surface mb-1">Readiness Score</h2>
            <p className="text-label-sm text-on-surface-variant">Calculated from assessments, skills and portfolio data.</p>
          </div>
          
          <div className="flex items-center justify-around py-4">
            <ProgressRing progress={dashboardData?.readiness?.score || 0} size={150} strokeWidth={12}>
              <div className="flex flex-col items-center">
                <span className="text-display-lg font-bold text-primary font-headline leading-none">
                  {dashboardData?.readiness?.score}
                </span>
                <span className="text-label-sm text-on-surface-variant font-semibold mt-1">Ready</span>
              </div>
            </ProgressRing>
            
            <div className="space-y-3 flex-1 max-w-[200px] ml-4">
              <div>
                <div className="flex justify-between text-label-sm font-semibold mb-1">
                  <span className="text-on-surface-variant">Technical</span>
                  <span className="text-primary">{dashboardData?.readiness?.technical}%</span>
                </div>
                <ProgressBar progress={dashboardData?.readiness?.technical} height="h-1.5" gradient={false} colorClass="bg-primary" />
              </div>
              
              <div>
                <div className="flex justify-between text-label-sm font-semibold mb-1">
                  <span className="text-on-surface-variant">Experience</span>
                  <span className="text-secondary">{dashboardData?.readiness?.experience}%</span>
                </div>
                <ProgressBar progress={dashboardData?.readiness?.experience} height="h-1.5" gradient={false} colorClass="bg-secondary" />
              </div>

              <div>
                <div className="flex justify-between text-label-sm font-semibold mb-1">
                  <span className="text-on-surface-variant">Projects</span>
                  <span className="text-tertiary">{dashboardData?.readiness?.projects}%</span>
                </div>
                <ProgressBar progress={dashboardData?.readiness?.projects} height="h-1.5" gradient={false} colorClass="bg-tertiary" />
              </div>
            </div>
          </div>
        </Card>

        {/* Skill Gap Analysis (col-span-7) */}
        <Card className="col-span-12 lg:col-span-7 flex flex-col justify-between" glass>
          <div>
            <h2 className="text-headline-sm font-bold text-on-surface mb-1">Skill Gap Analysis</h2>
            <p className="text-label-sm text-on-surface-variant">Current versus targeted industry tech stacks.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 flex-1">
            {/* Current */}
            <div className="bg-surface-low/30 border border-outline-variant/10 rounded-xl p-4 flex flex-col">
              <h3 className="text-label-sm font-bold text-primary uppercase tracking-wider mb-3">Current Skills</h3>
              <ul className="flex flex-wrap gap-1.5 content-start flex-1">
                {dashboardData?.skills?.current.map((skill) => (
                  <li key={skill}>
                    <Badge variant="primary" className="py-0.5 px-2 text-[11px] font-semibold">{skill}</Badge>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Missing */}
            <div className="bg-surface-low/30 border border-outline-variant/10 rounded-xl p-4 flex flex-col">
              <h3 className="text-label-sm font-bold text-tertiary uppercase tracking-wider mb-3">Missing Gaps</h3>
              <ul className="flex flex-wrap gap-1.5 content-start flex-1">
                {dashboardData?.skills?.missing.map((skill) => (
                  <li key={skill}>
                    <Badge variant="error" className="py-0.5 px-2 text-[11px] font-semibold">{skill}</Badge>
                  </li>
                ))}
              </ul>
            </div>

            {/* Priority */}
            <div className="bg-surface-low/30 border border-outline-variant/10 rounded-xl p-4 flex flex-col">
              <h3 className="text-label-sm font-bold text-secondary uppercase tracking-wider mb-3">Priority Gaps</h3>
              <ul className="flex flex-wrap gap-1.5 content-start flex-1">
                {dashboardData?.skills?.priority.map((skill) => (
                  <li key={skill}>
                    <Badge variant="warning" className="py-0.5 px-2 text-[11px] font-semibold">{skill}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </div>

      {/* AI Career Insights Row */}
      <div className="space-y-4">
        <h2 className="text-headline-md font-bold text-on-surface flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary shrink-0 animate-pulse" aria-hidden="true" />
          AI Career Insights
        </h2>
        
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dashboardData?.insights.map((insight, idx) => (
            <li key={idx}>
              <Card hoverEffect className="relative overflow-hidden" glass>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-label-sm font-semibold text-on-surface-variant mb-1">{insight.title}</p>
                    <h3 className="text-body-lg font-bold text-on-surface mb-2">{insight.value}</h3>
                    <p className="text-label-sm text-on-surface-variant/80">{insight.desc}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center border border-outline-variant/10 ${insight.color}`}>
                    <insight.icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </div>

      {/* Curated Opportunities */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-headline-md font-bold text-on-surface flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
            Curated Career Opportunities
          </h2>
          <Button variant="ghost" size="sm" onClick={() => navigate('/recommendations')}>View All</Button>
        </div>
        
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardData?.opportunities.map((opp, idx) => (
            <li key={idx}>
              <Card hoverEffect accentBar={opp.accent} className="group cursor-pointer flex flex-col justify-between h-[210px]" glass>
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center border border-outline-variant/10 text-on-surface font-bold text-headline-sm">
                      {opp.logo}
                    </div>
                    <Badge variant={opp.match >= 90 ? 'success' : 'primary'}>{opp.match}% Match</Badge>
                  </div>
                  <h3 className="text-body-md font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1">{opp.role}</h3>
                  <p className="text-label-sm text-on-surface-variant font-semibold mt-0.5">{opp.company} • {opp.location}</p>
                </div>
                
                <div className="mt-4 pt-3 border-t border-outline-variant/10 flex items-center justify-between">
                  <span className="text-label-sm text-on-surface-variant/95 font-semibold">{opp.salary}</span>
                  <div className="text-label-sm font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    Details
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;
