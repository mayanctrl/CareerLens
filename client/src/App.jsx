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
const SkillsPage = React.lazy(() => import('./pages/dashboard/SkillsPage'));
const RoadmapPage = React.lazy(() => import('./pages/dashboard/RoadmapPage'));
const ResourcesPage = React.lazy(() => import('./pages/dashboard/ResourcesPage'));
const ProjectsPage = React.lazy(() => import('./pages/dashboard/ProjectsPage'));
const ProjectDetailPage = React.lazy(() => import('./pages/dashboard/ProjectDetailPage'));
const ResumePage = React.lazy(() => import('./pages/dashboard/ResumePage'));
const InterviewPage = React.lazy(() => import('./pages/dashboard/InterviewPage'));
const ProgressPage = React.lazy(() => import('./pages/dashboard/ProgressPage'));
const AchievementsPage = React.lazy(() => import('./pages/dashboard/AchievementsPage'));
const InsightsPage = React.lazy(() => import('./pages/dashboard/InsightsPage'));
const SettingsPage = React.lazy(() => import('./pages/dashboard/SettingsPage'));
const HelpPage = React.lazy(() => import('./pages/dashboard/HelpPage'));
const NotificationsPage = React.lazy(() => import('./pages/dashboard/NotificationsPage'));
const ProfilePage = React.lazy(() => import('./pages/dashboard/ProfilePage'));

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
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/roadmap" element={<RoadmapPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/interview" element={<InterviewPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
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
