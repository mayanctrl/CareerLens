import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, BrainCircuit } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { showToast } from '../../components/common/Toast';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      showToast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      showToast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error) {
      showToast.error(error.message || 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md animate-slide-in-up relative z-10">
        <div className="flex justify-center mb-6">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center group-hover:shadow-glow-teal transition-shadow border border-outline-variant/10">
              <BrainCircuit className="w-6 h-6 text-on-primary-container" />
            </div>
            <div>
              <span className="text-headline-md font-bold text-primary tracking-tight">
                CareerLens
              </span>
              <p className="text-[10px] font-semibold text-on-surface-variant/80 uppercase tracking-widest leading-none">AI Agent</p>
            </div>
          </Link>
        </div>
        <h2 className="text-center text-headline-md font-bold text-on-surface">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-label-md text-on-surface-variant">
          Or{' '}
          <Link to="/register" className="font-semibold text-primary hover:brightness-110 transition-all">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[460px] relative z-10">
        <Card glass className="py-8 px-4 sm:px-10" accentBar="primary">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              id="email"
              label="Email address"
              type="email"
              autoComplete="email"
              required
              icon={Mail}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="space-y-1.5">
              <Input
                id="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                required
                icon={Lock}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex justify-end pt-1">
                <Link to="/forgot-password" className="text-label-sm font-semibold text-primary hover:brightness-110">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
              icon={LogIn}
            >
              Sign in
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant/15" />
              </div>
              <div className="relative flex justify-center text-label-sm">
                <span className="bg-surface-container px-2 text-on-surface-variant font-semibold">Demo Access</span>
              </div>
            </div>

            <div className="mt-5">
              <Button
                variant="secondary"
                fullWidth
                onClick={() => {
                  setEmail('demo@careerlens.ai');
                  setPassword('demo123');
                }}
              >
                Use Demo Account
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
