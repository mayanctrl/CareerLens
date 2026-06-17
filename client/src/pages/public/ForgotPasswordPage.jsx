import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, KeyRound } from 'lucide-react';
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
    <div className="min-h-screen bg-[#0B132B] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md animate-slide-in-up">
        <h2 className="text-center text-3xl font-bold tracking-tight text-white mb-2">
          Reset Password
        </h2>
        <p className="text-center text-[#BDC9C8]">
          We'll send you instructions to reset your password.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <Card glass className="py-8 px-4 sm:px-10 border-[#3A506B]/50 shadow-2xl relative overflow-hidden">
          {isSubmitted ? (
            <div className="text-center animate-fade-in">
              <div className="mx-auto w-16 h-16 bg-[rgba(91,192,190,0.15)] rounded-full flex items-center justify-center mb-4">
                <Mail className="w-8 h-8 text-[#5BC0BE]" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">Check your email</h3>
              <p className="text-[#BDC9C8] mb-6">
                We've sent a password reset link to <br/>
                <span className="font-semibold text-white">{email}</span>
              </p>
              <Button
                variant="secondary"
                fullWidth
                onClick={() => setIsSubmitted(false)}
              >
                Try another email
              </Button>
              <div className="mt-6">
                <Link to="/login" className="flex items-center justify-center text-sm font-medium text-[#5BC0BE] hover:text-[#6FFFE9]">
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
                <Link to="/login" className="flex items-center text-sm font-medium text-[#BDC9C8] hover:text-[#DBE1FF] transition-colors">
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
