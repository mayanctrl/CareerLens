import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderGit2, Github, ExternalLink, Filter, Plus } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import ProgressBar from '../../components/common/ProgressBar';
import api from '../../lib/api';

const MOCK_PROJECTS = [
  {
    id: 1,
    title: 'Full-Stack E-commerce Platform',
    description: 'Build a complete e-commerce solution with React, Node.js, Stripe integration, and PostgreSQL.',
    difficulty: 'Advanced',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    status: 'recommended',
    time: '4 Weeks',
    accent: 'tertiary'
  },
  {
    id: 2,
    title: 'Real-time Chat Application',
    description: 'Create a WhatsApp clone using WebSockets, React context, and Express.',
    difficulty: 'Intermediate',
    stack: ['React', 'Socket.io', 'Express', 'MongoDB'],
    status: 'in-progress',
    progress: 60,
    time: '2 Weeks',
    accent: 'secondary'
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'A responsive dashboard displaying current weather and 5-day forecasts using a public API.',
    difficulty: 'Beginner',
    stack: ['JavaScript', 'HTML/CSS', 'OpenWeather API'],
    status: 'completed',
    time: '1 Week',
    github: 'https://github.com',
    demo: 'https://demo.com',
    accent: 'primary'
  }
];

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('recommended');
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects/user');
      if (res && Array.isArray(res.data) && res.data.length > 0) {
        setProjects(res.data);
      } else {
        setProjects(MOCK_PROJECTS);
      }
    } catch (err) {
      console.warn('API error (using fallback projects):', err);
      setProjects(MOCK_PROJECTS);
    }
  };

  const filteredProjects = projects.filter(p => p.status === activeTab || (activeTab === 'recommended' && p.status === 'recommended'));

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-fade-in font-body">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-headline-lg font-bold text-on-surface mb-2">
            Project Portfolio
          </h1>
          <p className="text-body-md text-on-surface-variant">
            Build real-world projects tailored to your career goals.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" icon={Filter}>Filter</Button>
          <Button icon={Plus}>Custom Project</Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 p-1 bg-surface-container rounded-xl border border-outline-variant/10 w-fit">
        {['recommended', 'in-progress', 'completed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-label-sm font-semibold capitalize transition-all outline-none ${
              activeTab === tab 
                ? 'bg-primary text-on-primary shadow-md' 
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/40'
            }`}
          >
            {tab.replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} hoverEffect accentBar={project.accent} className="flex flex-col justify-between h-[340px]" glass>
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-surface-container rounded-xl flex items-center justify-center border border-outline-variant/10 shrink-0">
                  <FolderGit2 className="w-5 h-5 text-primary" />
                </div>
                <Badge variant={project.difficulty === 'Beginner' ? 'success' : project.difficulty === 'Intermediate' ? 'warning' : 'error'}>
                  {project.difficulty}
                </Badge>
              </div>
              
              <h3 
                className="text-body-lg font-bold text-on-surface mb-2 hover:text-primary transition-colors cursor-pointer line-clamp-1"
                onClick={() => navigate(`/projects/${project.id}`)}
              >
                {project.title}
              </h3>
              <p className="text-body-md text-on-surface-variant mb-4 line-clamp-3 leading-relaxed">
                {project.description}
              </p>
            </div>
            
            <div className="mt-auto">
              <div className="mb-4">
                <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">Tech Stack</div>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map(tech => (
                    <Badge key={tech} variant="default" className="py-0.5 px-2 text-[10px]">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-outline-variant/10 pt-3">
                {project.status === 'recommended' && (
                  <div className="flex justify-between items-center">
                    <span className="text-label-sm text-on-surface-variant font-semibold">Est. {project.time}</span>
                    <Button size="sm" onClick={() => navigate(`/projects/${project.id}`)}>Start Project</Button>
                  </div>
                )}
                
                {project.status === 'in-progress' && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-label-sm font-semibold">
                      <span className="text-on-surface-variant">Progress</span>
                      <span className="text-primary font-bold">{project.progress}%</span>
                    </div>
                    <ProgressBar progress={project.progress} height="h-1.5" gradient={false} colorClass="bg-primary" />
                  </div>
                )}

                {project.status === 'completed' && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary" className="flex-1 text-on-surface">
                      <Github className="w-4 h-4 mr-1.5 shrink-0" /> Repo
                    </Button>
                    <Button size="sm" variant="secondary" className="flex-1 text-on-surface">
                      <ExternalLink className="w-4 h-4 mr-1.5 shrink-0" /> Demo
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
