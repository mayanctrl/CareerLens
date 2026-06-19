import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, KeyRound, BrainCircuit } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { showToast } from '../../components/common/Toast';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';

const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;
      
      setIsSubmitted(true);
      showToast.success('Password reset link sent!');
    } catch (error) {
      showToast.error(error.message || 'Failed to send reset link');
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
        <h2 className="text-center text-headline-md font-bold text-on-surface mb-2">
          Reset Password
        </h2>
        <p className="text-center text-body-md text-on-surface-variant">
          We'll send you instructions to reset your password.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[460px] relative z-10">
        <Card glass className="py-8 px-4 sm:px-10" accentBar="primary">
          {isSubmitted ? (
            <div className="text-center animate-fade-in">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-5 border border-primary/20">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-headline-sm font-bold text-on-surface mb-2">Check your email</h3>
              <p className="text-body-md text-on-surface-variant mb-6">
                We've sent a password reset link to <br/>
                <span className="font-semibold text-on-surface">{email}</span>
              </p>
              <Button
                variant="secondary"
                fullWidth
                onClick={() => setIsSubmitted(false)}
              >
                Try another email
              </Button>
              <div className="mt-6">
                <Link to="/login" className="flex items-center justify-center text-label-md font-semibold text-primary hover:brightness-110">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to sign in
                </Link>
              </div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <Input
                id="email"
                label="Email address"
                type="email"
                required
                icon={Mail}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                isLoading={isLoading}
                icon={KeyRound}
              >
                Send Reset Link
              </Button>

              <div className="mt-6 flex justify-center">
                <Link to="/login" className="flex items-center text-label-md font-semibold text-on-surface-variant hover:text-on-surface transition-colors">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to sign in
                </Link>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
