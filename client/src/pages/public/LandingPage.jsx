import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Target, Rocket, Award, Shield, Cpu, Map } from 'lucide-react';
import Button from '../../components/common/Button';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#0B132B] text-[#DBE1FF] font-['Inter']">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5BC0BE] to-[#6FFFE9] flex items-center justify-center">
            <Compass className="w-6 h-6 text-[#0B132B]" />
          </div>
          <span className="text-2xl font-bold font-['Geist'] text-white tracking-wide">
            Career<span className="text-[#5BC0BE]">Lens</span>
          </span>
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-[#BDC9C8]">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
          <a href="#testimonials" className="hover:text-white transition-colors">Success Stories</a>
        </div>
        <div className="flex gap-4">
          <Link to="/login">
            <Button variant="ghost">Log In</Button>
          </Link>
          <Link to="/register">
            <Button>Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-20 pb-32 text-center relative">
        {/* Background decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#5BC0BE]/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C2541] border border-[#3A506B] text-[#6FFFE9] text-xs font-semibold uppercase tracking-wider mb-8">
            <span className="w-2 h-2 rounded-full bg-[#6FFFE9] animate-pulse" />
            AI-Powered Career Guidance
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold font-['Geist'] text-white leading-tight mb-8">
            Navigate Your Career with <br />
            <span className="gradient-text">Precision Intelligence</span>
          </h1>
          
          <p className="text-lg md:text-xl text-[#BDC9C8] mb-12 max-w-2xl mx-auto leading-relaxed">
            Stop guessing your next career move. CareerLens analyzes your skills, interests, and industry trends to generate a personalized roadmap to your dream job.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button size="lg" icon={ArrowRight} className="w-full sm:w-auto shadow-glow group">
                Start Your Assessment
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
      <section id="features" className="bg-[#1C2541] py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-['Geist'] text-white mb-4">Everything you need to succeed</h2>
            <p className="text-[#BDC9C8]">A complete ecosystem for your career development.</p>
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
              <div key={i} className="bg-[#0B132B] p-8 rounded-2xl border border-[#3A506B] hover:border-[#5BC0BE]/50 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-[#1C2541] flex items-center justify-center mb-6 group-hover:bg-[#5BC0BE]/10 transition-colors">
                  <feature.icon className="w-6 h-6 text-[#5BC0BE]" />
                </div>
                <h3 className="text-xl font-bold font-['Geist'] text-white mb-3">{feature.title}</h3>
                <p className="text-[#BDC9C8] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0B132B] border-t border-[#3A506B] py-12">
        <div className="container mx-auto px-6 text-center text-[#879392]">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Compass className="w-6 h-6 text-[#5BC0BE]" />
            <span className="text-xl font-bold font-['Geist'] text-white tracking-wide">
              Career<span className="text-[#5BC0BE]">Lens</span>
            </span>
          </div>
          <p>© 2026 CareerLens AI. Built with Precision Intelligence.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
