import React, { useState } from 'react';
import { FolderGit2, Star, Github, ExternalLink, Filter, Plus } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

const ProjectsPage = () => {
  const [activeTab, setActiveTab] = useState('recommended');

  const projects = [
    {
      id: 1,
      title: 'Full-Stack E-commerce Platform',
      description: 'Build a complete e-commerce solution with React, Node.js, Stripe integration, and PostgreSQL.',
      difficulty: 'Advanced',
      stack: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      status: 'recommended',
      time: '4 Weeks',
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
      demo: 'https://demo.com'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-['Geist'] text-white mb-2">
            Project Portfolio
          </h1>
          <p className="text-[#BDC9C8]">
            Build real-world projects tailored to your career goals.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" icon={Filter}>Filter</Button>
          <Button icon={Plus}>Custom Project</Button>
        </div>
      </div>

      <div className="flex space-x-1 p-1 bg-[#1C2541] rounded-xl border border-[#3A506B] w-fit">
        {['recommended', 'in-progress', 'completed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium capitalize transition-all ${
              activeTab === tab 
                ? 'bg-[#5BC0BE] text-[#0B132B] shadow-md' 
                : 'text-[#BDC9C8] hover:text-white hover:bg-[#212942]'
            }`}
          >
            {tab.replace('-', ' ')}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.filter(p => p.status === activeTab || activeTab === 'recommended').map((project) => (
          <Card key={project.id} hoverEffect className="flex flex-col h-full bg-[#1C2541] border-[#3A506B]">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-[#0B132B] rounded-xl flex items-center justify-center border border-[#3A506B]">
                <FolderGit2 className="w-6 h-6 text-[#5BC0BE]" />
              </div>
              <Badge variant={project.difficulty === 'Beginner' ? 'success' : project.difficulty === 'Intermediate' ? 'warning' : 'error'}>
                {project.difficulty}
              </Badge>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-sm text-[#BDC9C8] mb-6 flex-1 line-clamp-3">
              {project.description}
            </p>
            
            <div className="mb-6">
              <div className="text-xs font-semibold text-[#879392] uppercase tracking-wider mb-2">Tech Stack</div>
              <div className="flex flex-wrap gap-2">
                {project.stack.map(tech => (
                  <span key={tech} className="px-2.5 py-1 rounded-md bg-[#0B132B] text-xs font-medium text-[#DBE1FF] border border-[#3A506B]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-auto border-t border-[#3A506B] pt-4">
              {project.status === 'recommended' && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#879392]">Est. {project.time}</span>
                  <Button size="sm">Start Project</Button>
                </div>
              )}
              
              {project.status === 'in-progress' && (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#BDC9C8]">Progress</span>
                    <span className="text-[#5BC0BE] font-bold">{project.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#0B132B] rounded-full overflow-hidden">
                    <div className="h-full bg-[#5BC0BE]" style={{ width: `${project.progress}%` }} />
                  </div>
                  <Button size="sm" variant="secondary" fullWidth>Update Progress</Button>
                </div>
              )}

              {project.status === 'completed' && (
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary" className="flex-1 text-[#DBE1FF]">
                    <Github className="w-4 h-4 mr-2" /> Repo
                  </Button>
                  <Button size="sm" variant="secondary" className="flex-1 text-[#DBE1FF]">
                    <ExternalLink className="w-4 h-4 mr-2" /> Demo
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
