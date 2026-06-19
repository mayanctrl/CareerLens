import React, { useEffect, useState } from 'react';
import { Plus, Search, Trash2, ShieldCheck, Sparkles, BookOpen, AlertCircle } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Input from '../../components/common/Input';
import ProgressBar from '../../components/common/ProgressBar';
import Loader from '../../components/common/Loader';
import api from '../../lib/api';
import { showToast } from '../../components/common/Toast';

const MOCK_USER_SKILLS = [
  { id: 1, name: 'React', category: 'Technical', level: 'Expert', current: 90, target: 95 },
  { id: 2, name: 'JavaScript', category: 'Technical', level: 'Expert', current: 85, target: 95 },
  { id: 3, name: 'CSS/Tailwind', category: 'Technical', level: 'Intermediate', current: 80, target: 85 },
  { id: 4, name: 'Git', category: 'Technical', level: 'Intermediate', current: 75, target: 80 },
  { id: 5, name: 'TypeScript', category: 'Technical', level: 'Beginner', current: 40, target: 90 },
  { id: 6, name: 'Node.js', category: 'Technical', level: 'Beginner', current: 30, target: 85 },
  { id: 7, name: 'Communication', category: 'Soft', level: 'Intermediate', current: 75, target: 85 },
  { id: 8, name: 'Agile/Scrum', category: 'Domain', level: 'Intermediate', current: 70, target: 80 },
];

const SkillsPage = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('Technical');
  const [newSkillLevel, setNewSkillLevel] = useState('Beginner');

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const res = await api.get('/skills/user');
      if (res && Array.isArray(res.data) && res.data.length > 0) {
        setSkills(res.data);
      } else {
        setSkills(MOCK_USER_SKILLS);
      }
    } catch (error) {
      console.warn('API error (using fallback skills data):', error);
      setSkills(MOCK_USER_SKILLS);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const newSkillObj = {
      name: newSkillName.trim(),
      category: newSkillCategory,
      level: newSkillLevel,
      current: newSkillLevel === 'Beginner' ? 30 : newSkillLevel === 'Intermediate' ? 65 : 85,
      target: 85
    };

    try {
      const res = await api.post('/skills/user', newSkillObj);
      showToast.success(`Added ${newSkillName} to your skill profile!`);
      // Update local state
      setSkills(prev => [...prev, { id: Date.now(), ...newSkillObj }]);
      setNewSkillName('');
    } catch (err) {
      console.warn('API post error (updating local state directly):', err);
      setSkills(prev => [...prev, { id: Date.now(), ...newSkillObj }]);
      setNewSkillName('');
      showToast.success(`Added ${newSkillName}!`);
    }
  };

  const handleDeleteSkill = async (id) => {
    try {
      await api.delete(`/skills/user/${id}`);
      showToast.success('Skill removed');
      setSkills(prev => prev.filter(skill => skill.id !== id));
    } catch (err) {
      console.warn('API delete error (updating state directly):', err);
      setSkills(prev => prev.filter(skill => skill.id !== id));
      showToast.success('Skill removed');
    }
  };

  if (loading) {
    return <Loader fullScreen text="Loading your Skill Profile..." />;
  }

  // Filter skills by category
  const technicalSkills = skills.filter(s => s.category === 'Technical');
  const softSkills = skills.filter(s => s.category === 'Soft');
  const domainSkills = skills.filter(s => s.category === 'Domain');

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-fade-in font-body">
      {/* Title */}
      <div>
        <h1 className="text-headline-lg font-bold text-on-surface mb-2">Skill Profile Analysis</h1>
        <p className="text-body-md text-on-surface-variant">
          Assess and manage your skills. Compare your progress against required skills for your target career paths.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Skill Gap Cards (Left Column) */}
        <div className="lg:col-span-8 space-y-6">
          <Card glass>
            <h2 className="text-headline-sm font-bold text-on-surface mb-6 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
              Skill Gap Metrics
            </h2>
            
            <div className="space-y-6">
              {skills.map((skill) => (
                <div key={skill.id} className="group relative bg-surface-container-low/40 p-4 border border-outline-variant/10 rounded-xl flex items-center justify-between">
                  <div className="flex-1 mr-6">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-body-md font-bold text-on-surface">{skill.name}</span>
                        <Badge variant={skill.category === 'Technical' ? 'primary' : skill.category === 'Soft' ? 'secondary' : 'default'} className="py-0 px-2 text-[10px]">
                          {skill.category}
                        </Badge>
                      </div>
                      <span className="text-label-sm font-bold text-on-surface-variant">
                        Current: {skill.current}% / Target: {skill.target}%
                      </span>
                    </div>
                    <div className="relative">
                      {/* Sub-bar for current */}
                      <ProgressBar progress={skill.current} height="h-2" gradient={false} colorClass={skill.current >= skill.target ? 'bg-success' : 'bg-primary'} />
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteSkill(skill.id)}
                    className="p-2 text-on-surface-variant hover:text-error hover:bg-error/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all shrink-0"
                    aria-label={`Remove ${skill.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </Card>

          {/* AI Training Recommendations */}
          <Card glass accentBar="secondary">
            <h2 className="text-headline-sm font-bold text-on-surface mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-secondary shrink-0" />
              AI Upskilling Action Items
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-surface-low border border-outline-variant/10 rounded-xl flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-body-md font-bold text-on-surface mb-1">TypeScript Masterclass</h4>
                  <p className="text-label-sm text-on-surface-variant mb-2">Bridge your TypeScript gap to boost your Software Engineer match probability by +12%.</p>
                  <Button variant="ghost" size="sm" className="p-0 text-secondary hover:bg-transparent font-bold">Start Course →</Button>
                </div>
              </div>

              <div className="p-4 bg-surface-low border border-outline-variant/10 rounded-xl flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-body-md font-bold text-on-surface mb-1">Advanced Node.js & REST APIs</h4>
                  <p className="text-label-sm text-on-surface-variant mb-2">Build portfolio integrations to satisfy your Backend Developer requirements.</p>
                  <Button variant="ghost" size="sm" className="p-0 text-primary hover:bg-transparent font-bold">View Curriculum →</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Add Skill Form (Right Column) */}
        <div className="lg:col-span-4 space-y-6">
          <Card glass>
            <h2 className="text-headline-sm font-bold text-on-surface mb-4">Add New Skill</h2>
            <form onSubmit={handleAddSkill} className="space-y-4">
              <Input
                label="Skill Name"
                placeholder="e.g. Node.js, AWS, Kubernetes"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                required
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-label-md font-semibold text-on-surface-variant">Category</label>
                <select
                  value={newSkillCategory}
                  onChange={(e) => setNewSkillCategory(e.target.value)}
                  className="flex h-10 w-full rounded-lg border bg-surface-container-low px-3.5 py-2 text-body-md text-on-surface border-outline-variant/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                >
                  <option value="Technical">Technical</option>
                  <option value="Soft">Soft Skill</option>
                  <option value="Domain">Business/Domain</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-label-md font-semibold text-on-surface-variant">Proficiency Level</label>
                <select
                  value={newSkillLevel}
                  onChange={(e) => setNewSkillLevel(e.target.value)}
                  className="flex h-10 w-full rounded-lg border bg-surface-container-low px-3.5 py-2 text-body-md text-on-surface border-outline-variant/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>

              <Button type="submit" fullWidth icon={Plus} className="pt-2">
                Add to Profile
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;
