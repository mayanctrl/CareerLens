import React, { useEffect, useState } from 'react';
import { LineChart, Clock, Award, CheckCircle, TrendingUp, Calendar, Compass } from 'lucide-react';
import Card from '../../components/common/Card';
import ProgressBar from '../../components/common/ProgressBar';
import Badge from '../../components/common/Badge';
import Loader from '../../components/common/Loader';
import api from '../../lib/api';

const MOCK_ACTIVITY = [
  { id: 1, text: 'Completed Week 2 of Full-Stack Developer roadmap', date: 'Today', type: 'roadmap' },
  { id: 2, text: 'Scored 85% in React Interview prep question', date: 'Yesterday', type: 'interview' },
  { id: 3, text: 'Added TypeScript to Skill Profile gaps', date: '3 days ago', type: 'skill' },
  { id: 4, text: 'Retook Career assessment', date: 'Last week', type: 'assessment' }
];

const ProgressPage = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgressData();
  }, []);

  const fetchProgressData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/progress');
      if (res && Array.isArray(res.data) && res.data.length > 0) {
        setActivities(res.data);
      } else {
        setActivities(MOCK_ACTIVITY);
      }
    } catch (err) {
      console.warn('API error (using fallback progress logs):', err);
      setActivities(MOCK_ACTIVITY);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader fullScreen text="Loading progress tracking dashboards..." />;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-fade-in font-body">
      {/* Title */}
      <div>
        <h1 className="text-headline-lg font-bold text-on-surface mb-2 font-headline">Progress Tracker</h1>
        <p className="text-body-md text-on-surface-variant">
          Track your learning habits, hours logged, skills claimed, and recent career prep milestones.
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card glass>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-label-sm font-semibold text-on-surface-variant mb-1">Total Hours Logged</p>
              <h3 className="text-headline-md font-bold text-on-surface">42 hrs</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 text-primary">
              <Clock className="w-5 h-5" />
            </div>
          </div>
        </Card>

        <Card glass>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-label-sm font-semibold text-on-surface-variant mb-1">Skills Mastered</p>
              <h3 className="text-headline-md font-bold text-on-surface">12 / 45</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center border border-secondary/20 text-secondary">
              <Award className="w-5 h-5" />
            </div>
          </div>
        </Card>

        <Card glass>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-label-sm font-semibold text-on-surface-variant mb-1">Assessments Cleared</p>
              <h3 className="text-headline-md font-bold text-on-surface">2</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center border border-success/20 text-success">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Weekly Activity Graph (Left) */}
        <Card className="lg:col-span-7 flex flex-col justify-between" glass>
          <div>
            <h2 className="text-headline-sm font-bold text-on-surface mb-1">Weekly Activity</h2>
            <p className="text-label-sm text-on-surface-variant">Hours spent upskilling over the last 7 days.</p>
          </div>

          {/* SVG Bar Graph */}
          <div className="py-6 flex items-end justify-between h-[200px] border-b border-outline-variant/10">
            {[
              { day: 'Mon', hrs: 3 },
              { day: 'Tue', hrs: 5 },
              { day: 'Wed', hrs: 2 },
              { day: 'Thu', hrs: 8 },
              { day: 'Fri', hrs: 4 },
              { day: 'Sat', hrs: 12 },
              { day: 'Sun', hrs: 8 }
            ].map((d, i) => {
              const maxHrs = 12;
              const heightPct = Math.round((d.hrs / maxHrs) * 100);
              return (
                <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
                  <div className="text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    {d.hrs}h
                  </div>
                  <div className="w-8 bg-surface-container rounded-t-lg relative overflow-hidden h-[120px] border border-outline-variant/10">
                    <div 
                      className="absolute bottom-0 left-0 right-0 bg-primary/75 group-hover:bg-primary transition-all duration-normal"
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-on-surface-variant font-semibold">{d.day}</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Recent Activity Log (Right) */}
        <Card className="lg:col-span-5" glass>
          <h2 className="text-headline-sm font-bold text-on-surface mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-secondary shrink-0" />
            Recent Milestones
          </h2>
          <div className="space-y-4">
            {activities.map((act) => (
              <div key={act.id} className="flex gap-3 relative pb-4 last:pb-0 before:absolute before:inset-y-0 before:left-2 before:translate-y-5 before:w-0.5 before:bg-outline-variant/10 last:before:hidden">
                <div className="w-4 h-4 rounded-full bg-primary/10 border border-primary/40 flex items-center justify-center shrink-0 mt-0.5 z-10">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-body-md text-on-surface leading-snug">{act.text}</p>
                  <span className="text-[10px] text-on-surface-variant/80 font-bold">{act.date}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProgressPage;
