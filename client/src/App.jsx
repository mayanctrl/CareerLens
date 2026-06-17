import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ToastProvider } from './components/common/Toast';
import Loader from './components/common/Loader';

// Lazy loaded pages to match implementation plan
// Public
const LandingPage = React.lazy(() => import('./pages/public/LandingPage'));
const LoginPage = React.lazy(() => import('./pages/public/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/public/RegisterPage'));
const ForgotPasswordPage = React.lazy(() => import('./pages/public/ForgotPasswordPage'));
const NotFoundPage = React.lazy(() => import('./pages/public/NotFoundPage'));

// Dashboard (Protected)
const DashboardLayout = React.lazy(() => import('./components/layout/DashboardLayout'));
const DashboardPage = React.lazy(() => import('./pages/dashboard/DashboardPage'));
const AssessmentPage = React.lazy(() => import('./pages/dashboard/AssessmentPage'));
const RecommendationsPage = React.lazy(() => import('./pages/dashboard/RecommendationsPage'));
const RoadmapPage = React.lazy(() => import('./pages/dashboard/RoadmapPage'));
const ProjectsPage = React.lazy(() => import('./pages/dashboard/ProjectsPage'));
// Stubs for other pages
const PlaceholderPage = ({ title }) => (
  <div className="flex items-center justify-center h-full min-h-[60vh]">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-white mb-4">{title}</h1>
      <p className="text-[#BDC9C8]">This page is under construction.</p>
    </div>
  </div>
);

// Auth Guard Component
const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Loader fullScreen text="Verifying session..." />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
};

// Public Only Guard (redirects logged in users away from login/register)
const PublicOnlyRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Loader fullScreen />;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
};

const AppRoutes = () => {
  return (
    <React.Suspense fallback={<Loader fullScreen text="Loading CareerLens..." />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Auth Routes (Public Only) */}
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        {/* Protected Dashboard Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/assessment" element={<AssessmentPage />} />
            <Route path="/recommendations" element={<RecommendationsPage />} />
            <Route path="/skills" element={<PlaceholderPage title="Skill Gap Analysis" />} />
            <Route path="/roadmap" element={<RoadmapPage />} />
            <Route path="/resources" element={<PlaceholderPage title="Learning Resources" />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/resume" element={<PlaceholderPage title="Resume Builder" />} />
            <Route path="/interview" element={<PlaceholderPage title="Interview Prep" />} />
            <Route path="/progress" element={<PlaceholderPage title="Progress Tracker" />} />
            <Route path="/achievements" element={<PlaceholderPage title="Achievements" />} />
            <Route path="/insights" element={<PlaceholderPage title="Career Insights" />} />
            <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
            <Route path="/notifications" element={<PlaceholderPage title="Notifications" />} />
            <Route path="/profile" element={<PlaceholderPage title="Profile" />} />
          </Route>
        </Route>

        {/* 404 Catch All */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </React.Suspense>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
