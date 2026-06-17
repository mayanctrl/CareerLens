import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { showToast } from '../../components/common/Toast';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import api from '../../lib/api'; // Use our axios instance to hit our backend too

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
      // We will call our custom backend register endpoint so it handles creating the profile row
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
    <div className="min-h-screen bg-[#0B132B] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%231c2541\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md animate-slide-in-up">
        <div className="flex justify-center mb-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5BC0BE] to-[#6FFFE9] flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(91,192,190,0.4)] transition-shadow">
              <Compass className="w-7 h-7 text-[#0B132B]" />
            </div>
            <span className="text-3xl font-bold font-['Geist'] text-white tracking-wide">
              Career<span className="text-[#5BC0BE]">Lens</span>
            </span>
          </Link>
        </div>
        <h2 className="text-center text-2xl font-bold tracking-tight text-white">
          Start your career journey
        </h2>
        <p className="mt-2 text-center text-sm text-[#BDC9C8]">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-[#5BC0BE] hover:text-[#6FFFE9] transition-colors">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <Card glass className="py-8 px-4 sm:px-10 border-[#3A506B]/50 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#5BC0BE] to-[#6FFFE9]" />
          
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

          <p className="mt-6 text-center text-xs text-[#879392]">
            By registering, you agree to our{' '}
            <a href="#" className="underline hover:text-[#DBE1FF]">Terms of Service</a> and{' '}
            <a href="#" className="underline hover:text-[#DBE1FF]">Privacy Policy</a>.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
