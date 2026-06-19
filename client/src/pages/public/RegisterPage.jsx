import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, BrainCircuit } from 'lucide-react';
import { showToast } from '../../components/common/Toast';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import api from '../../lib/api';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      showToast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      showToast.error('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await api.post('/auth/register', {
        email: formData.email,
        password: formData.password,
        full_name: formData.fullName
      });

      if (response.success) {
          showToast.success('Registration successful! Please sign in.');
          navigate('/login');
      }
    } catch (error) {
      showToast.error(error.message || 'Failed to register account');
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
          Start your career journey
        </h2>
        <p className="mt-2 text-center text-label-md text-on-surface-variant">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-primary hover:brightness-110 transition-all">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[460px] relative z-10">
        <Card glass className="py-8 px-4 sm:px-10" accentBar="primary">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <Input
              id="fullName"
              label="Full Name"
              type="text"
              required
              icon={User}
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
            />

            <Input
              id="email"
              label="Email address"
              type="email"
              autoComplete="email"
              required
              icon={Mail}
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />

            <Input
              id="password"
              label="Password"
              type="password"
              autoComplete="new-password"
              required
              icon={Lock}
              placeholder="Minimum 8 characters"
              value={formData.password}
              onChange={handleChange}
            />

            <Input
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              autoComplete="new-password"
              required
              icon={Lock}
              placeholder="Repeat password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <div className="pt-2">
              <Button
                type="submit"
                fullWidth
                isLoading={isLoading}
                icon={ArrowRight}
              >
                Create Account
              </Button>
            </div>
          </form>

          <p className="mt-6 text-center text-label-sm text-on-surface-variant/75">
            By registering, you agree to our{' '}
            <a href="#" className="underline hover:text-on-surface">Terms of Service</a> and{' '}
            <a href="#" className="underline hover:text-on-surface">Privacy Policy</a>.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
