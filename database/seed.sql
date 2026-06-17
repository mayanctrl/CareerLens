-- Seed Data for CareerLens

-- 1. Career Insights
INSERT INTO career_insights (career_name, average_salary, future_demand, industry_growth, description) VALUES
('Software Engineer', '$80,000 - $150,000', 'High', '22% over 10 years', 'Design, develop, and maintain software systems and applications.'),
('Data Scientist', '$95,000 - $160,000', 'High', '36% over 10 years', 'Analyze complex data to help companies make better decisions.'),
('UI/UX Designer', '$70,000 - $120,000', 'High', '16% over 10 years', 'Create intuitive and visually appealing digital experiences.'),
('Product Manager', '$100,000 - $180,000', 'High', '10% over 10 years', 'Guide the success of a product and lead the cross-functional team.'),
('DevOps Engineer', '$90,000 - $150,000', 'Very High', '25% over 10 years', 'Bridge the gap between development and operations to improve delivery.'),
('Cybersecurity Analyst', '$85,000 - $140,000', 'Very High', '32% over 10 years', 'Protect IT infrastructure and networks from cyber threats.'),
('Cloud Architect', '$120,000 - $190,000', 'Very High', '28% over 10 years', 'Oversee a company''s cloud computing strategy and infrastructure.'),
('AI/ML Engineer', '$110,000 - $170,000', 'Extremely High', '40% over 10 years', 'Build intelligent systems and machine learning models.')
ON CONFLICT (career_name) DO NOTHING;

-- 2. Skills Master
INSERT INTO skills_master (skill_name, category, difficulty, description) VALUES
('JavaScript', 'Programming', 'Beginner', 'High-level, often just-in-time compiled language.'),
('Python', 'Programming', 'Beginner', 'High-level, general-purpose programming language.'),
('React', 'Frontend', 'Intermediate', 'A JavaScript library for building user interfaces.'),
('Node.js', 'Backend', 'Intermediate', 'JavaScript runtime built on Chrome''s V8 engine.'),
('SQL', 'Database', 'Beginner', 'Domain-specific language used in programming and designed for managing data.'),
('Docker', 'DevOps', 'Intermediate', 'Platform to build, run, and share applications with containers.'),
('AWS', 'Cloud', 'Advanced', 'Amazon Web Services cloud computing platforms.'),
('Figma', 'Design', 'Beginner', 'Collaborative interface design tool.'),
('Machine Learning', 'Data', 'Advanced', 'Study of computer algorithms that improve automatically through experience.'),
('Git', 'Tools', 'Beginner', 'Version control system for tracking changes in source code.')
ON CONFLICT (skill_name) DO NOTHING;

-- Note: In a real environment, you'd map these UUIDs properly. 
-- Since we rely on auto-generated UUIDs, career_skill_mapping needs to be seeded via a script or by joining on names.

-- 3. Projects
INSERT INTO projects (title, description, difficulty, tech_stack, estimated_duration, career_category) VALUES
('E-commerce Platform', 'Build a full-stack e-commerce app with cart, checkout, and auth.', 'Advanced', ARRAY['React', 'Node.js', 'SQL'], '4 weeks', 'Software Engineer'),
('Weather App', 'Create a weather application using a public API.', 'Beginner', ARRAY['JavaScript', 'HTML', 'CSS'], '1 week', 'Software Engineer'),
('Customer Churn Prediction', 'Train an ML model to predict customer churn.', 'Intermediate', ARRAY['Python', 'Machine Learning'], '3 weeks', 'Data Scientist'),
('Portfolio Redesign', 'Design and implement a modern portfolio website.', 'Beginner', ARRAY['Figma', 'React'], '2 weeks', 'UI/UX Designer');

-- 4. Interview Questions
INSERT INTO interview_questions (category, difficulty, question, answer, tags) VALUES
('Behavioral', 'Medium', 'Tell me about a time you faced a technical challenge and how you overcame it.', 'Focus on the STAR method: Situation, Task, Action, Result.', ARRAY['Soft Skills', 'Problem Solving']),
('Technical', 'Medium', 'Explain the difference between SQL and NoSQL databases.', 'SQL databases are relational and table-based. NoSQL are non-relational and document, key-value, graph, or wide-column stores.', ARRAY['Database', 'Backend']),
('Technical', 'Hard', 'What is the event loop in Node.js?', 'The event loop is what allows Node.js to perform non-blocking I/O operations by offloading operations to the system kernel whenever possible.', ARRAY['Node.js', 'Architecture']),
('Technical', 'Easy', 'What is React and how does it work?', 'React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It uses a virtual DOM to optimize rendering.', ARRAY['Frontend', 'React']);

-- 5. Achievements
INSERT INTO achievements (title, description, points) VALUES
('First Steps', 'Complete your profile setup', 10),
('Self-Aware', 'Complete your first career assessment', 20),
('Skill Hunter', 'Add 5 skills to your profile', 15),
('Project Builder', 'Complete your first recommended project', 50),
('Interview Ready', 'Answer 10 interview practice questions', 30),
('Roadmap Initiated', 'Start a learning roadmap', 20);
