import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Compass, Target, Map, Award, ArrowRight, Clock, CheckCircle2 } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import ProgressBar from '../../components/common/ProgressBar';
import Badge from '../../components/common/Badge';

const DashboardPage = () => {
  const { user } = useAuth();
  const userName = user?.user_metadata?.full_name?.split(' ')[0] || 'Explorer';

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold font-['Geist'] text-white mb-2">
            Welcome back, {userName}! 👋
          </h1>
          <p className="text-[#BDC9C8]">
            Your career trajectory is looking strong. Here's your daily summary.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" icon={Target}>Retake Assessment</Button>
          <Button icon={Compass}>Explore Careers</Button>
        </div>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Overall Match" 
          value="85%" 
          subtitle="Top: Software Engineer" 
          icon={Compass}
          color="text-[#5BC0BE]"
          bg="bg-[rgba(91,192,190,0.15)]"
        />
        <StatCard 
          title="Skills Mastered" 
          value="12/45" 
          subtitle="2 this week" 
          icon={Award}
          color="text-[#6FFFE9]"
          bg="bg-[rgba(111,255,233,0.15)]"
        />
        <StatCard 
          title="Roadmap Progress" 
          value="45%" 
          subtitle="Week 3 of 8" 
          icon={Map}
          color="text-[#22C55E]"
          bg="bg-[rgba(34,197,94,0.15)]"
        />
        <StatCard 
          title="Interview Prep" 
          value="Strong" 
          subtitle="80% average score" 
          icon={Target}
          color="text-[#F59E0B]"
          bg="bg-[rgba(245,158,11,0.15)]"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area (Left 2 columns) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Current Focus / Active Roadmap */}
          <Card padding="p-0">
            <div className="p-6 border-b border-[#3A506B] flex justify-between items-center">
              <h2 className="text-xl font-bold font-['Geist'] text-white">Current Focus: Full-Stack Developer</h2>
              <Badge variant="primary">In Progress</Badge>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <ProgressBar progress={45} showLabel label="Roadmap Completion" className="mb-2" />
                <p className="text-sm text-[#BDC9C8]">You're on track to complete this roadmap by October 15.</p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">This Week's Tasks</h3>
                
                {[
                  { title: 'Advanced React Hooks', time: '2 hours', done: true },
                  { title: 'Node.js Express Middleware', time: '3 hours', done: false },
                  { title: 'Database Schema Design', time: '1.5 hours', done: false },
                ].map((task, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-[#0B132B] rounded-lg border border-[#3A506B] hover:border-[#5BC0BE]/50 transition-colors">
                    <div className="flex items-center gap-3">
                      {task.done ? (
                        <CheckCircle2 className="w-5 h-5 text-[#5BC0BE]" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-[#879392]" />
                      )}
                      <span className={`font-medium ${task.done ? 'text-[#879392] line-through' : 'text-[#DBE1FF]'}`}>
                        {task.title}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-[#879392]">
                      <Clock className="w-4 h-4 mr-1" />
                      {task.time}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <Button fullWidth variant="secondary">Continue Learning</Button>
              </div>
            </div>
          </Card>

          {/* AI Recommendations */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold font-['Geist'] text-white">AI Top Picks for You</h2>
              <Button variant="ghost" size="sm" className="text-[#5BC0BE]">View All</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { role: 'Backend Engineer', match: 92, salary: '$90k - $140k' },
                { role: 'Cloud Architect', match: 88, salary: '$120k - $180k' },
              ].map((job, i) => (
                <Card key={i} hoverEffect glass className="group cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-[#0B132B] rounded-lg flex items-center justify-center border border-[#3A506B] group-hover:border-[#5BC0BE] transition-colors">
                      <Compass className="w-6 h-6 text-[#5BC0BE]" />
                    </div>
                    <Badge variant="success">{job.match}% Match</Badge>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{job.role}</h3>
                  <p className="text-[#879392] text-sm mb-4">Est. {job.salary}</p>
                  <div className="flex items-center text-sm font-medium text-[#5BC0BE] group-hover:text-[#6FFFE9] transition-colors">
                    Explore Path <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar Column */}
        <div className="space-y-8">
          
          {/* Action Needed */}
          <Card className="bg-gradient-to-b from-[#1C2541] to-[#0B132B]">
            <h2 className="text-lg font-bold font-['Geist'] text-white mb-4">Action Needed</h2>
            <div className="space-y-4">
              <div className="p-4 bg-[rgba(245,158,11,0.1)] border border-[#F59E0B]/30 rounded-lg">
                <h3 className="font-medium text-[#F59E0B] mb-1">Resume Update Required</h3>
                <p className="text-sm text-[#BDC9C8] mb-3">You've mastered 2 new skills since your last resume update.</p>
                <Button size="sm" className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-white border-none text-[#000]">Update Resume</Button>
              </div>
            </div>
          </Card>

          {/* Upcoming Interviews/Milestones */}
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold font-['Geist'] text-white">Upcoming</h2>
            </div>
            <div className="space-y-0 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#3A506B] before:to-transparent">
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-[#3A506B] bg-[#1C2541] text-[#5BC0BE] group-[.is-active]:bg-[rgba(91,192,190,0.15)] group-[.is-active]:border-[#5BC0BE] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <Target className="w-4 h-4" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg bg-[#0B132B] border border-[#3A506B]">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-bold text-white text-sm">System Design Mock</div>
                    <time className="text-xs font-medium text-[#5BC0BE]">Tomorrow</time>
                  </div>
                  <div className="text-xs text-[#879392]">Focus: Scalability</div>
                </div>
              </div>
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, subtitle, icon: Icon, color, bg }) => (
  <Card glass hoverEffect padding="p-5">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-[#879392] mb-1">{title}</p>
        <h3 className="text-2xl font-bold font-['Geist'] text-white">{value}</h3>
      </div>
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${bg}`}>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
    </div>
    {subtitle && (
      <div className="mt-4 pt-4 border-t border-[#3A506B]/50">
        <p className="text-xs text-[#BDC9C8] font-medium">{subtitle}</p>
      </div>
    )}
  </Card>
);

export default DashboardPage;
