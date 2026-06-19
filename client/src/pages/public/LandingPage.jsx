import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BrainCircuit, Target, Rocket, Award, Shield, Cpu, Map, Compass } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body overflow-x-hidden">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-5 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center">
            <BrainCircuit className="w-5 h-5 text-on-primary-container" />
          </div>
          <div>
            <span className="text-headline-md font-bold text-primary tracking-tight">
              CareerLens
            </span>
            <p className="text-[10px] font-semibold text-on-surface-variant/80 uppercase tracking-widest leading-none">AI Agent</p>
          </div>
        </div>
        <div className="hidden md:flex space-x-8 text-label-md font-semibold text-on-surface-variant">
          <a href="#features" className="hover:text-on-surface transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-on-surface transition-colors">How it Works</a>
          <a href="#about" className="hover:text-on-surface transition-colors">About</a>
        </div>
        <div className="flex gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">Log In</Button>
          </Link>
          <Link to="/register">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-24 pb-32 text-center relative">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container border border-outline-variant/20 text-primary text-label-sm font-semibold uppercase tracking-wider mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            AI-Powered Career Guidance
          </div>
          
          <h1 className="text-display-lg font-bold text-on-surface mb-8 tracking-tight max-w-3xl mx-auto leading-none">
            Navigate Your Career with <span className="gradient-text">Precision Intelligence</span>
          </h1>
          
          <p className="text-body-lg text-on-surface-variant mb-12 max-w-2xl mx-auto leading-relaxed">
            Stop guessing your next career move. CareerLens analyzes your skills, interests, and industry trends to generate a personalized roadmap to your dream job.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto shadow-glow-teal group">
                Start Your Assessment
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                View Sample Roadmap
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-24 relative bg-surface-low border-t border-outline-variant/10">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-headline-lg font-bold text-on-surface mb-4">Everything you need to succeed</h2>
            <p className="text-body-md text-on-surface-variant">A complete AI-backed ecosystem for your career development.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Cpu, title: 'AI Recommendations', desc: 'Get matched with careers based on your unique cognitive profile and interests.' },
              { icon: Target, title: 'Skill Gap Analysis', desc: 'Identify exactly what you need to learn to land your target role.' },
              { icon: Map, title: 'Dynamic Roadmaps', desc: 'Follow a week-by-week learning plan customized to your pace and goals.' },
              { icon: Rocket, title: 'Project Suggestions', desc: 'Build portfolio-worthy projects that employers actually want to see.' },
              { icon: Shield, title: 'Interview Prep', desc: 'Practice with role-specific questions and get AI feedback on your answers.' },
              { icon: Award, title: 'Progress Tracking', desc: 'Stay motivated with visual progress metrics and achievement badges.' }
            ].map((feature, i) => (
              <Card 
                key={i} 
                hoverEffect 
                className="group"
                accentBar={i % 3 === 0 ? 'primary' : i % 3 === 1 ? 'secondary' : null}
              >
                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors border border-outline-variant/10">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-headline-sm font-bold text-on-surface mb-3">{feature.title}</h3>
                <p className="text-body-md text-on-surface-variant leading-relaxed">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-outline-variant/10 py-12 bg-background">
        <div className="container mx-auto px-6 text-center text-on-surface-variant">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-8 rounded bg-primary-container flex items-center justify-center">
              <BrainCircuit className="w-4 h-4 text-on-primary-container" />
            </div>
            <span className="text-headline-sm font-bold text-on-surface tracking-tight">
              CareerLens
            </span>
          </div>
          <p className="text-label-sm">© 2026 CareerLens AI. Built with Precision Intelligence.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
