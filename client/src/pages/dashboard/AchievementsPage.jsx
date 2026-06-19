import React from 'react';
import { Award, Zap, Trophy, Heart, Flame, Shield, Search } from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';

const MOCK_BADGES = [
  { id: 1, title: 'First Step', desc: 'Completed your first career assessment.', icon: Trophy, unlocked: true, date: 'June 10, 2026', color: 'text-primary bg-primary/10 border-primary/20' },
  { id: 2, title: 'Upskill Starter', desc: 'Claimed your first skill mastery.', icon: Zap, unlocked: true, date: 'June 12, 2026', color: 'text-secondary bg-secondary/10 border-secondary/20' },
  { id: 3, title: '7-Day Streak', desc: 'Logged hours 7 days in a row.', icon: Flame, unlocked: true, date: 'June 18, 2026', color: 'text-tertiary bg-tertiary/10 border-tertiary/20' },
  { id: 4, title: 'Interview Pro', desc: 'Scored 85% or higher on a mock interview.', icon: Shield, unlocked: false, color: 'text-on-surface-variant/40 bg-surface-container border-outline-variant/10' },
  { id: 5, title: 'Resume Perfect', desc: 'Achieve a 90% or higher resume score.', icon: Award, unlocked: false, color: 'text-on-surface-variant/40 bg-surface-container border-outline-variant/10' }
];

const AchievementsPage = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-fade-in font-body">
      {/* Title */}
      <div>
        <h1 className="text-headline-lg font-bold text-on-surface mb-2 font-headline">Achievements & Badges</h1>
        <p className="text-body-md text-on-surface-variant">
          Unlock credentials, badges, and recognition as you complete assessments, upskill, and prepare for interviews.
        </p>
      </div>

      {/* Grid of Badges */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_BADGES.map((badge) => {
          const Icon = badge.icon;
          return (
            <Card 
              key={badge.id} 
              hoverEffect={badge.unlocked} 
              className={`flex flex-col items-center text-center p-6 justify-between h-[230px]
                ${badge.unlocked ? '' : 'opacity-65 select-none'}
              `}
              glass
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center border ${badge.color} mb-4 shadow-md`}>
                <Icon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-body-lg font-bold text-on-surface mb-1 flex items-center justify-center gap-1.5">
                  {badge.title}
                  {!badge.unlocked && <span className="text-xs text-on-surface-variant/60 font-semibold">(Locked)</span>}
                </h3>
                <p className="text-label-sm text-on-surface-variant leading-relaxed max-w-xs">{badge.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-outline-variant/10 w-full">
                <span className="text-[10px] text-on-surface-variant/80 font-bold uppercase">
                  {badge.unlocked ? `Unlocked ${badge.date}` : 'Complete requirements to unlock'}
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsPage;
