import React, { useState } from 'react';
import { Map, Clock, CheckCircle2, PlayCircle, BookOpen, ExternalLink, Calendar, Target } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import ProgressBar from '../../components/common/ProgressBar';

const RoadmapPage = () => {
  // Mock roadmap data
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
        title: 'React ecosystem',
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
          { title: 'Database Design patterns', completed: false },
        ]
      }
    ]
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#1C2541] p-6 rounded-2xl border border-[#3A506B]">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-[rgba(91,192,190,0.15)] flex items-center justify-center border border-[#5BC0BE]/30">
            <Map className="w-8 h-8 text-[#5BC0BE]" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold font-['Geist'] text-white">{roadmap.title}</h1>
              <Badge variant="primary">Active</Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-[#BDC9C8]">
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {roadmap.duration}</span>
              <span className="flex items-center gap-1"><Target className="w-4 h-4" /> Week {roadmap.currentWeek} Focus</span>
            </div>
          </div>
        </div>
        <div className="w-full md:w-64">
          <ProgressBar progress={roadmap.progress} showLabel label="Overall Progress" height="h-2" />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Timeline View */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold font-['Geist'] text-white mb-4">Learning Timeline</h2>
          
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-5 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#5BC0BE] before:via-[#3A506B] before:to-[#1C2541]">
            
            {roadmap.weeks.map((week, idx) => (
              <div key={week.number} className="relative flex items-start gap-6 group">
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2 shrink-0 z-10 bg-[#0B132B] transition-colors
                  ${week.status === 'completed' ? 'border-[#22C55E] text-[#22C55E]' : 
                    week.status === 'in-progress' ? 'border-[#5BC0BE] text-[#5BC0BE] shadow-[0_0_15px_rgba(91,192,190,0.3)]' : 
                    'border-[#3A506B] text-[#3A506B]'}
                `}>
                  {week.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : <span className="font-bold text-sm">{week.number}</span>}
                </div>
                
                <Card 
                  className={`flex-1 transition-all ${week.status === 'in-progress' ? 'border-[#5BC0BE]/50 shadow-glow' : ''}`}
                  padding="p-0"
                >
                  <div className={`p-5 border-b border-[#3A506B] flex justify-between items-center ${week.status === 'in-progress' ? 'bg-[rgba(91,192,190,0.05)]' : ''}`}>
                    <div>
                      <h3 className={`text-lg font-bold font-['Geist'] ${week.status === 'pending' ? 'text-[#BDC9C8]' : 'text-white'}`}>
                        Week {week.number}: {week.title}
                      </h3>
                      <p className="text-sm text-[#879392] mt-1 flex items-center gap-1">
                        <Clock className="w-4 h-4" /> Est. {week.hours} hours
                      </p>
                    </div>
                    {week.status === 'completed' && <Badge variant="success">Completed</Badge>}
                    {week.status === 'in-progress' && <Badge variant="primary">Current Focus</Badge>}
                    {week.status === 'pending' && <Badge>Locked</Badge>}
                  </div>
                  
                  {(week.status === 'completed' || week.status === 'in-progress') && (
                    <div className="p-5 space-y-3 bg-[#0B132B]">
                      {week.tasks.map((task, i) => (
                        <div key={i} className="flex items-center gap-3 group/task">
                          <button className={`shrink-0 transition-colors ${task.completed ? 'text-[#22C55E]' : 'text-[#3A506B] hover:text-[#5BC0BE]'}`}>
                            <CheckCircle2 className="w-5 h-5" />
                          </button>
                          <span className={`text-sm ${task.completed ? 'text-[#879392] line-through' : 'text-[#DBE1FF]'}`}>
                            {task.title}
                          </span>
                        </div>
                      ))}
                      
                      {week.status === 'in-progress' && (
                        <div className="mt-4 pt-4 border-t border-[#3A506B] flex justify-end">
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

        {/* Resources & Recommendations Sidebar */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-b from-[#1C2541] to-[#0B132B]">
            <h2 className="text-lg font-bold font-['Geist'] text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#5BC0BE]" /> Recommended Resources
            </h2>
            <div className="space-y-4">
              {[
                { title: 'Complete Node.js Developer Course', platform: 'Udemy', type: 'Video' },
                { title: 'Designing Data-Intensive Applications', platform: 'O\'Reilly', type: 'Book' },
              ].map((res, i) => (
                <div key={i} className="p-3 bg-[#0B132B] rounded-lg border border-[#3A506B] hover:border-[#5BC0BE]/50 transition-colors group cursor-pointer flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-medium text-white group-hover:text-[#5BC0BE] transition-colors">{res.title}</h4>
                    <span className="text-xs text-[#879392]">{res.platform} • {res.type}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#3A506B] group-hover:text-[#5BC0BE]" />
                </div>
              ))}
            </div>
            <Button variant="ghost" fullWidth className="mt-4 text-[#5BC0BE]">View All Resources</Button>
          </Card>

          <Card>
             <h2 className="text-lg font-bold font-['Geist'] text-white mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#6FFFE9]" /> Weekly Goal
            </h2>
            <div className="text-center p-4 bg-[rgba(111,255,233,0.05)] rounded-lg border border-[#6FFFE9]/20 mb-4">
              <div className="text-3xl font-bold text-white mb-1">12<span className="text-lg text-[#879392]">/20 hrs</span></div>
              <p className="text-sm text-[#BDC9C8]">You're doing great! 8 hours left to hit your goal.</p>
            </div>
            <ProgressBar progress={60} colorClass="bg-[#6FFFE9]" />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RoadmapPage;
