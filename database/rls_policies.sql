-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE roadmap_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_builder ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_interview_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Public read-only tables (Reference data)
ALTER TABLE skills_master ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_skill_mapping ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_insights ENABLE ROW LEVEL SECURITY;

-- Policies for public tables (Anyone authenticated can read)
CREATE POLICY "Allow public read access to skills_master" ON skills_master FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow public read access to career_skill_mapping" ON career_skill_mapping FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow public read access to learning_resources" ON learning_resources FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow public read access to projects" ON projects FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow public read access to interview_questions" ON interview_questions FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow public read access to achievements" ON achievements FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow public read access to career_insights" ON career_insights FOR SELECT USING (auth.role() = 'authenticated');

-- Policies for User Data (Users can only access their own data)

-- Profiles
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Career Assessments
CREATE POLICY "Users can view own assessments" ON career_assessments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own assessments" ON career_assessments FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Career Recommendations
CREATE POLICY "Users can view own recommendations" ON career_recommendations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own recommendations" ON career_recommendations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own recommendations" ON career_recommendations FOR DELETE USING (auth.uid() = user_id);

-- User Skills
CREATE POLICY "Users can view own skills" ON user_skills FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own skills" ON user_skills FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own skills" ON user_skills FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own skills" ON user_skills FOR DELETE USING (auth.uid() = user_id);

-- Learning Roadmaps
CREATE POLICY "Users can view own roadmaps" ON learning_roadmaps FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own roadmaps" ON learning_roadmaps FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Roadmap Steps
CREATE POLICY "Users can view own roadmap steps" ON roadmap_steps FOR SELECT USING (
    EXISTS (SELECT 1 FROM learning_roadmaps WHERE roadmap_id = roadmap_steps.roadmap_id AND user_id = auth.uid())
);
CREATE POLICY "Users can update own roadmap steps" ON roadmap_steps FOR UPDATE USING (
    EXISTS (SELECT 1 FROM learning_roadmaps WHERE roadmap_id = roadmap_steps.roadmap_id AND user_id = auth.uid())
);

-- User Projects
CREATE POLICY "Users can view own projects" ON user_projects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own projects" ON user_projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own projects" ON user_projects FOR UPDATE USING (auth.uid() = user_id);

-- Resume Builder
CREATE POLICY "Users can view own resume" ON resume_builder FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own resume" ON resume_builder FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own resume" ON resume_builder FOR UPDATE USING (auth.uid() = user_id);

-- User Interview Progress
CREATE POLICY "Users can view own interview progress" ON user_interview_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own interview progress" ON user_interview_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own interview progress" ON user_interview_progress FOR UPDATE USING (auth.uid() = user_id);

-- User Achievements
CREATE POLICY "Users can view own achievements" ON user_achievements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own achievements" ON user_achievements FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Notifications
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own notifications" ON notifications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own notifications" ON notifications FOR DELETE USING (auth.uid() = user_id);

-- Learning Progress
CREATE POLICY "Users can view own learning progress" ON learning_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own learning progress" ON learning_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own learning progress" ON learning_progress FOR UPDATE USING (auth.uid() = user_id);

-- Activity Logs
CREATE POLICY "Users can view own activity logs" ON activity_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own activity logs" ON activity_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
