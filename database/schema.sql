-- CareerLens Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. profiles
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    auth_id UUID NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    college TEXT,
    degree TEXT,
    branch TEXT,
    year TEXT,
    bio TEXT,
    linkedin_url TEXT,
    github_url TEXT,
    portfolio_url TEXT,
    career_goal TEXT,
    current_level TEXT,
    profile_image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. career_assessments
CREATE TABLE career_assessments (
    assessment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    interest_score INTEGER CHECK (interest_score BETWEEN 0 AND 100),
    aptitude_score INTEGER CHECK (aptitude_score BETWEEN 0 AND 100),
    personality_score INTEGER CHECK (personality_score BETWEEN 0 AND 100),
    technical_score INTEGER CHECK (technical_score BETWEEN 0 AND 100),
    communication_score INTEGER CHECK (communication_score BETWEEN 0 AND 100),
    leadership_score INTEGER CHECK (leadership_score BETWEEN 0 AND 100),
    creativity_score INTEGER CHECK (creativity_score BETWEEN 0 AND 100),
    overall_score INTEGER CHECK (overall_score BETWEEN 0 AND 100),
    assessment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. career_recommendations
CREATE TABLE career_recommendations (
    recommendation_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    career_name TEXT NOT NULL,
    match_percentage INTEGER CHECK (match_percentage BETWEEN 0 AND 100),
    salary_range TEXT,
    growth_rate TEXT,
    difficulty TEXT,
    description TEXT,
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. skills_master
CREATE TABLE skills_master (
    skill_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    skill_name TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    difficulty TEXT,
    description TEXT,
    icon TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. user_skills
CREATE TABLE user_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    skill_id UUID REFERENCES skills_master(skill_id) ON DELETE CASCADE,
    proficiency TEXT,
    status TEXT,
    progress INTEGER DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, skill_id)
);

-- 6. career_skill_mapping
CREATE TABLE career_skill_mapping (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    career_name TEXT NOT NULL,
    skill_id UUID REFERENCES skills_master(skill_id) ON DELETE CASCADE,
    priority TEXT,
    required_level TEXT,
    UNIQUE(career_name, skill_id)
);

-- 7. learning_roadmaps
CREATE TABLE learning_roadmaps (
    roadmap_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    career_name TEXT NOT NULL,
    roadmap_title TEXT NOT NULL,
    estimated_duration TEXT,
    completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage BETWEEN 0 AND 100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. roadmap_steps
CREATE TABLE roadmap_steps (
    step_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    roadmap_id UUID REFERENCES learning_roadmaps(roadmap_id) ON DELETE CASCADE,
    week_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    resource_link TEXT,
    estimated_hours INTEGER,
    status TEXT DEFAULT 'pending',
    UNIQUE(roadmap_id, week_number)
);

-- 9. learning_resources
CREATE TABLE learning_resources (
    resource_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    category TEXT,
    resource_type TEXT,
    difficulty TEXT,
    provider TEXT,
    url TEXT,
    thumbnail TEXT,
    duration TEXT,
    rating NUMERIC(3, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. projects
CREATE TABLE projects (
    project_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    difficulty TEXT,
    tech_stack TEXT[],
    estimated_duration TEXT,
    github_reference TEXT,
    deployment_link TEXT,
    career_category TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. user_projects
CREATE TABLE user_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(project_id) ON DELETE CASCADE,
    completion INTEGER DEFAULT 0 CHECK (completion BETWEEN 0 AND 100),
    github_url TEXT,
    live_demo TEXT,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(user_id, project_id)
);

-- 12. resume_builder
CREATE TABLE resume_builder (
    resume_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    template TEXT DEFAULT 'modern',
    education JSONB DEFAULT '[]'::jsonb,
    experience JSONB DEFAULT '[]'::jsonb,
    skills JSONB DEFAULT '[]'::jsonb,
    projects JSONB DEFAULT '[]'::jsonb,
    certifications JSONB DEFAULT '[]'::jsonb,
    languages JSONB DEFAULT '[]'::jsonb,
    resume_pdf TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id) -- Only one active resume document per user for now
);

-- 13. interview_questions
CREATE TABLE interview_questions (
    question_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category TEXT NOT NULL,
    difficulty TEXT,
    question TEXT NOT NULL,
    answer TEXT,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 14. user_interview_progress
CREATE TABLE user_interview_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    question_id UUID REFERENCES interview_questions(question_id) ON DELETE CASCADE,
    attempted BOOLEAN DEFAULT true,
    correct BOOLEAN,
    attempt_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 15. achievements
CREATE TABLE achievements (
    achievement_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    badge TEXT,
    points INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 16. user_achievements
CREATE TABLE user_achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    achievement_id UUID REFERENCES achievements(achievement_id) ON DELETE CASCADE,
    earned_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, achievement_id)
);

-- 17. notifications
CREATE TABLE notifications (
    notification_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT,
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 18. learning_progress
CREATE TABLE learning_progress (
    progress_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    hours_learned INTEGER DEFAULT 0,
    skills_completed INTEGER DEFAULT 0,
    projects_completed INTEGER DEFAULT 0,
    roadmap_progress INTEGER DEFAULT 0 CHECK (roadmap_progress BETWEEN 0 AND 100),
    weekly_goal INTEGER DEFAULT 10, -- default hours
    monthly_goal INTEGER DEFAULT 40,
    UNIQUE(user_id)
);

-- 19. career_insights
CREATE TABLE career_insights (
    career_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    career_name TEXT UNIQUE NOT NULL,
    average_salary TEXT,
    future_demand TEXT,
    industry_growth TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 20. activity_logs
CREATE TABLE activity_logs (
    activity_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    activity_type TEXT NOT NULL,
    description TEXT,
    ip_address TEXT,
    device TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Functions
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_skills_last_updated
    BEFORE UPDATE ON user_skills
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resume_builder_updated_at
    BEFORE UPDATE ON resume_builder
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
