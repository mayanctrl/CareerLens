import React, { useState } from 'react';
import { Map, Clock, CheckCircle2, PlayCircle, BookOpen, ExternalLink, Calendar, Target } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import ProgressBar from '../../components/common/ProgressBar';

const RoadmapPage = () => {
  const [roadmap] = useState({
    title: 'Full-Stack Developer',
    duration: '12 Weeks',
    progress: 35,
    currentWeek: 3,
    weeks: [
      {
        number: 1,
        title: 'Frontend Fundamentals',
        status: 'completed',
        hours: 15,
        tasks: [
          { title: 'Advanced HTML & Semantic Web', completed: true },
          { title: 'CSS Grid & Flexbox Mastery', completed: true },
          { title: 'JavaScript ES6+ Concepts', completed: true },
        ]
      },
      {
        number: 2,
        title: 'React Ecosystem',
        status: 'completed',
        hours: 20,
        tasks: [
          { title: 'Hooks & State Management', completed: true },
          { title: 'React Router v6', completed: true },
          { title: 'Context API', completed: true },
        ]
      },
      {
        number: 3,
        title: 'Backend with Node.js',
        status: 'in-progress',
        hours: 25,
        tasks: [
          { title: 'Express Fundamentals', completed: true },
          { title: 'RESTful API Design', completed: false },
          { title: 'Middleware & Error Handling', completed: false },
        ]
      },
      {
        number: 4,
        title: 'Databases & ORMs',
        status: 'pending',
        hours: 20,
        tasks: [
          { title: 'PostgreSQL Basics', completed: false },
          { title: 'Prisma ORM', completed: false },
          { title: 'Database Design Patterns', completed: false },
        ]
      }
    ]
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-fade-in font-body">
      {/* Header Banner */}
      <Card className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6" glass accentBar="primary">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
            <Map className="w-7 h-7 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-headline-md font-bold text-on-surface">{roadmap.title}</h1>
              <Badge variant="primary">Active</Badge>
            </div>
            <div className="flex items-center gap-4 text-label-sm text-on-surface-variant font-semibold">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 shrink-0" /> {roadmap.duration}</span>
              <span className="flex items-center gap-1.5"><Target className="w-4 h-4 shrink-0" /> Week {roadmap.currentWeek} Focus</span>
            </div>
          </div>
        </div>
        <div className="w-full md:w-72">
          <ProgressBar progress={roadmap.progress} showLabel label="Overall Progress" height="h-2" gradient={false} colorClass="bg-primary" />
        </div>
      </Card>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Timeline View */}
        <div className="lg:col-span-8 space-y-6">
          <h2 className="text-headline-sm font-bold text-on-surface">Learning Timeline</h2>
          
          <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-5 before:-translate-x-px before:w-0.5 before:bg-outline-variant/10">
            {roadmap.weeks.map((week) => (
              <div key={week.number} className="relative flex items-start gap-6 group">
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2 shrink-0 z-10 bg-background transition-all duration-normal
                  ${week.status === 'completed' ? 'border-success text-success' : 
                    week.status === 'in-progress' ? 'border-primary text-primary shadow-glow-teal' : 
                    'border-outline-variant/35 text-on-surface-variant/60'}
                `}>
                  {week.status === 'completed' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <span className="font-bold text-label-sm">{week.number}</span>}
                </div>
                
                <Card 
                  className={`flex-1 overflow-hidden transition-all duration-normal ${week.status === 'in-progress' ? 'border-primary/30 shadow-glow-teal' : 'border-outline-variant/10'}`}
                  padding="p-0"
                  glass={week.status !== 'pending'}
                >
                  <div className={`p-5 border-b border-outline-variant/10 flex justify-between items-center ${week.status === 'in-progress' ? 'bg-primary/5' : ''}`}>
                    <div>
                      <h3 className={`text-body-lg font-bold ${week.status === 'pending' ? 'text-on-surface-variant/60' : 'text-on-surface'}`}>
                        Week {week.number}: {week.title}
                      </h3>
                      <p className="text-label-sm text-on-surface-variant font-semibold mt-1 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 shrink-0" /> Est. {week.hours} hours
                      </p>
                    </div>
                    {week.status === 'completed' && <Badge variant="success">Completed</Badge>}
                    {week.status === 'in-progress' && <Badge variant="primary">Current Focus</Badge>}
                    {week.status === 'pending' && <Badge variant="default" className="opacity-60">Locked</Badge>}
                  </div>
                  
                  {(week.status === 'completed' || week.status === 'in-progress') && (
                    <div className="p-5 space-y-3.5 bg-surface/30">
                      {week.tasks.map((task, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <span className={`shrink-0 transition-colors ${task.completed ? 'text-success' : 'text-on-surface-variant/40'}`}>
                            <CheckCircle2 className="w-4.5 h-4.5" />
                          </span>
                          <span className={`text-body-md ${task.completed ? 'text-on-surface-variant/60 line-through' : 'text-on-surface font-medium'}`}>
                            {task.title}
                          </span>
                        </div>
                      ))}
                      
                      {week.status === 'in-progress' && (
                        <div className="mt-4 pt-4 border-t border-outline-variant/10 flex justify-end">
                          <Button size="sm" icon={PlayCircle}>Resume Learning</Button>
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Resources & Goals Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Resources */}
          <Card glass accentBar="secondary">
            <h2 className="text-headline-sm font-bold text-on-surface mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-secondary shrink-0" /> Recommended Resources
            </h2>
            <div className="space-y-4">
              {[
                { title: 'Complete Node.js Developer Course', platform: 'Udemy', type: 'Video' },
                { title: 'Designing Data-Intensive Applications', platform: 'O\'Reilly', type: 'Book' },
              ].map((res, i) => (
                <div key={i} className="p-3 bg-surface-low border border-outline-variant/10 rounded-xl hover:border-primary/30 transition-all group cursor-pointer flex justify-between items-center">
                  <div>
                    <h4 className="text-label-md font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1">{res.title}</h4>
                    <span className="text-[11px] text-on-surface-variant font-semibold">{res.platform} • {res.type}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-on-surface-variant/75 group-hover:text-primary transition-colors shrink-0 ml-2" />
                </div>
              ))}
            </div>
            <Button variant="ghost" fullWidth className="mt-4 text-primary font-bold hover:bg-surface-variant/20">
              View All Resources
            </Button>
          </Card>

          {/* Goal tracker */}
          <Card glass>
             <h2 className="text-headline-sm font-bold text-on-surface mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-secondary shrink-0" /> Weekly Goal
            </h2>
            <div className="text-center p-4 bg-secondary/5 rounded-xl border border-secondary/20 mb-4">
              <div className="text-headline-lg font-bold text-on-surface mb-1">
                12<span className="text-body-md text-on-surface-variant font-semibold"> / 20 hrs</span>
              </div>
              <p className="text-label-sm text-on-surface-variant/90">You're doing great! 8 hours left to hit your goal.</p>
            </div>
            <ProgressBar progress={60} colorClass="bg-secondary" gradient={false} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RoadmapPage;
