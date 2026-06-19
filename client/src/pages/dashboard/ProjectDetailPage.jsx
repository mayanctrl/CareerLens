import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, FolderGit2, CheckCircle2, Github, ExternalLink, Calendar, Code } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import ProgressBar from '../../components/common/ProgressBar';
import Loader from '../../components/common/Loader';
import Breadcrumb from '../../components/common/Breadcrumb';
import api from '../../lib/api';
import { showToast } from '../../components/common/Toast';

const MOCK_PROJECTS = {
  '1': {
    id: 1,
    title: 'Full-Stack E-commerce Platform',
    description: 'Build a complete e-commerce solution with React, Node.js, Stripe integration, and PostgreSQL. Design database schemas, configure REST API routes, handle secure payment checkouts, and build an admin management dashboard.',
    difficulty: 'Advanced',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    status: 'recommended',
    time: '4 Weeks',
    accent: 'tertiary',
    milestones: [
      { id: 'm1', title: 'Database Design & API Setup', desc: 'Design the PostgreSQL schema and initialize the Express server API routing.', completed: false },
      { id: 'm2', title: 'User Authentication & JWT', desc: 'Secure backend routes with access tokens and create frontend login screens.', completed: false },
      { id: 'm3', title: 'Stripe Payment Gateway', desc: 'Implement secure payment intent endpoints and build frontend checkout forms.', completed: false },
      { id: 'm4', title: 'Admin Catalog Portal', desc: 'Construct views to create, read, update, and delete e-commerce products.', completed: false }
    ]
  },
  '2': {
    id: 2,
    title: 'Real-time Chat Application',
    description: 'Create a WhatsApp clone using WebSockets, React context, and Express. Set up custom chat rooms, configure push notifications, and build interactive user profiles.',
    difficulty: 'Intermediate',
    stack: ['React', 'Socket.io', 'Express', 'MongoDB'],
    status: 'in-progress',
    progress: 60,
    time: '2 Weeks',
    accent: 'secondary',
    milestones: [
      { id: 'm1', title: 'Socket Server Setup', desc: 'Establish a Socket.io node server and connect to incoming clients.', completed: true },
      { id: 'm2', title: 'Rooms & Message History', desc: 'Store message threads in Mongo and query them when a room mounts.', completed: true },
      { id: 'm3', title: 'Active Presence UI Indicators', desc: 'Broadcast online/offline user events across active connections.', completed: false },
      { id: 'm4', title: 'File Attachment Previews', desc: 'Upload media to cloud storage and render attachments inside message bubbles.', completed: false }
    ]
  },
  '3': {
    id: 3,
    title: 'Weather Dashboard',
    description: 'A responsive dashboard displaying current weather and 5-day forecasts using a public API.',
    difficulty: 'Beginner',
    stack: ['JavaScript', 'HTML/CSS', 'OpenWeather API'],
    status: 'completed',
    time: '1 Week',
    github: 'https://github.com',
    demo: 'https://demo.com',
    accent: 'primary',
    milestones: [
      { id: 'm1', title: 'API Integration & Weather Cards', desc: 'Query the weather API and display daily forecasts.', completed: true }
    ]
  }
};

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [milestones, setMilestones] = useState([]);

  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  const fetchProjectDetails = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/projects/${id}`);
      if (res && res.data) {
        setProject(res.data);
        setMilestones(res.data.milestones || []);
      } else {
        const fallback = MOCK_PROJECTS[id] || MOCK_PROJECTS['1'];
        setProject(fallback);
        setMilestones(fallback.milestones || []);
      }
    } catch (err) {
      console.warn('API error (using fallback project detail):', err);
      const fallback = MOCK_PROJECTS[id] || MOCK_PROJECTS['1'];
      setProject(fallback);
      setMilestones(fallback.milestones || []);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleMilestone = (milestoneId) => {
    const updated = milestones.map(m => {
      if (m.id === milestoneId) {
        return { ...m, completed: !m.completed };
      }
      return m;
    });
    setMilestones(updated);
    
    // Calculate new progress
    const completedCount = updated.filter(m => m.completed).length;
    const nextProgress = Math.round((completedCount / updated.length) * 100);
    setProject(prev => ({ ...prev, progress: nextProgress, status: nextProgress === 100 ? 'completed' : 'in-progress' }));
    showToast.success('Milestone status updated!');
  };

  if (loading) {
    return <Loader fullScreen text="Loading project specifications..." />;
  }

  const breadcrumbItems = [
    { label: 'Projects', path: '/projects' },
    { label: project?.title }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-fade-in font-body">
      {/* Navigation & Breadcrumb */}
      <div className="flex flex-col gap-3">
        <Breadcrumb items={breadcrumbItems} />
        <Link to="/projects" className="flex items-center text-label-sm font-semibold text-on-surface-variant hover:text-on-surface w-fit gap-1 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to projects
        </Link>
      </div>

      {/* Main Details Banner */}
      <Card glass accentBar={project?.accent} className="flex flex-col md:flex-row justify-between gap-6">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
            <FolderGit2 className="w-7 h-7 text-primary" />
          </div>
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-headline-md font-bold text-on-surface leading-tight">{project?.title}</h1>
              <Badge variant={project?.difficulty === 'Beginner' ? 'success' : project?.difficulty === 'Intermediate' ? 'warning' : 'error'}>
                {project?.difficulty}
              </Badge>
            </div>
            <p className="text-body-md text-on-surface-variant leading-relaxed max-w-2xl">
              {project?.description}
            </p>
          </div>
        </div>

        <div className="w-full md:w-60 flex flex-col justify-center space-y-3">
          {project?.status === 'in-progress' && (
            <>
              <div className="flex justify-between text-label-sm font-semibold">
                <span className="text-on-surface-variant">Project Progress</span>
                <span className="text-primary font-bold">{project.progress}%</span>
              </div>
              <ProgressBar progress={project.progress} height="h-2" gradient={false} colorClass="bg-primary" />
            </>
          )}

          {project?.status === 'recommended' && (
            <Button fullWidth onClick={() => {
              setProject(prev => ({ ...prev, status: 'in-progress', progress: 0 }));
              showToast.success('Project started! Time to build.');
            }}>
              Start Building
            </Button>
          )}

          {project?.status === 'completed' && (
            <Badge variant="success" className="py-2 text-center text-label-md font-bold w-full rounded-lg justify-center">
              ✓ Completed
            </Badge>
          )}
        </div>
      </Card>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column: Milestones Checklist */}
        <div className="lg:col-span-8 space-y-6">
          <Card glass>
            <h2 className="text-headline-sm font-bold text-on-surface mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              Build Milestones
            </h2>

            <div className="space-y-4">
              {milestones.map((milestone) => (
                <div 
                  key={milestone.id} 
                  className={`p-4 border rounded-xl flex items-start gap-4 transition-all duration-normal
                    ${milestone.completed 
                      ? 'bg-success/5 border-success/20 opacity-80' 
                      : 'bg-surface-low border-outline-variant/15 hover:border-primary/25'
                    }
                  `}
                >
                  <button
                    onClick={() => handleToggleMilestone(milestone.id)}
                    className={`mt-1 rounded-full shrink-0 transition-colors outline-none
                      ${milestone.completed ? 'text-success' : 'text-on-surface-variant/40 hover:text-primary'}
                    `}
                    aria-label={milestone.completed ? 'Mark incomplete' : 'Mark completed'}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                  </button>

                  <div className="flex-1">
                    <h3 className={`text-body-md font-bold leading-snug ${milestone.completed ? 'text-on-surface-variant/60 line-through' : 'text-on-surface'}`}>
                      {milestone.title}
                    </h3>
                    <p className="text-label-sm text-on-surface-variant/85 mt-1 leading-relaxed">
                      {milestone.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Details & Tech Stack */}
        <div className="lg:col-span-4 space-y-6">
          {/* Tech Stack details */}
          <Card glass>
            <h2 className="text-headline-sm font-bold text-on-surface mb-4 flex items-center gap-2">
              <Code className="w-5 h-5 text-secondary shrink-0" /> Tech Stack Specs
            </h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {project?.stack.map(tech => (
                <Badge key={tech} variant="default" className="py-1 px-3 text-label-sm">
                  {tech}
                </Badge>
              ))}
            </div>
            
            <div className="border-t border-outline-variant/10 pt-4 space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-on-surface-variant shrink-0" />
                <div>
                  <div className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Estimated duration</div>
                  <div className="text-label-md font-bold text-on-surface">{project?.time}</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Code Repos */}
          <Card glass>
            <h2 className="text-headline-sm font-bold text-on-surface mb-4">Submission Links</h2>
            <div className="space-y-3">
              <Button variant="secondary" fullWidth className="text-on-surface justify-start">
                <Github className="w-4 h-4 mr-2 shrink-0" /> Connect GitHub Repo
              </Button>
              <Button variant="secondary" fullWidth className="text-on-surface justify-start">
                <ExternalLink className="w-4 h-4 mr-2 shrink-0" /> Add Live Demo Link
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
