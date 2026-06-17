import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-form';
import { Compass, Mail, Lock, LogIn } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
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
      const { data, error } = await supabase.auth.signInWithPassword({
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
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-[#BDC9C8]">
          Or{' '}
          <Link to="/register" className="font-medium text-[#5BC0BE] hover:text-[#6FFFE9] transition-colors">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <Card glass className="py-8 px-4 sm:px-10 border-[#3A506B]/50 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#5BC0BE] to-[#6FFFE9]" />
          
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

            <div className="space-y-1">
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
                <Link to="/forgot-password" className="text-sm font-medium text-[#5BC0BE] hover:text-[#6FFFE9]">
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
                <div className="w-full border-t border-[#3A506B]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-[#1C2541] px-2 text-[#879392]">Demo Access</span>
              </div>
            </div>

            <div className="mt-6">
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
