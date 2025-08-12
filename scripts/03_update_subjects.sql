-- Update academic subjects to match Mang'uHigh curriculum
-- First, clear existing academic subjects
DELETE FROM academic_info;

-- Insert the actual subjects offered at Mang'uHigh
INSERT INTO academic_info (subject_name, description, grade_levels, is_core_subject) VALUES
('Mathematics', 'Core mathematics curriculum covering algebra, geometry, calculus, and statistics essential for KCSE examination.', ARRAY['Form 1', 'Form 2', 'Form 3', 'Form 4'], true),
('Physics', 'Physical sciences covering mechanics, electricity, magnetism, waves, and modern physics.', ARRAY['Form 1', 'Form 2', 'Form 3', 'Form 4'], true),
('Chemistry', 'Chemical sciences including organic, inorganic, and physical chemistry with practical laboratory work.', ARRAY['Form 1', 'Form 2', 'Form 3', 'Form 4'], true),
('Biology', 'Life sciences covering cell biology, genetics, ecology, human anatomy, and plant biology.', ARRAY['Form 1', 'Form 2', 'Form 3', 'Form 4'], true),
('Power Mechanics', 'Technical subject covering mechanical systems, engines, and power transmission systems.', ARRAY['Form 1', 'Form 2', 'Form 3', 'Form 4'], false),
('Electricity', 'Electrical systems, circuits, power generation, and electrical installations.', ARRAY['Form 1', 'Form 2', 'Form 3', 'Form 4'], false),
('Computer Studies', 'Computing fundamentals, programming, digital literacy, and information technology.', ARRAY['Form 1', 'Form 2', 'Form 3', 'Form 4'], false),
('History', 'Kenyan history, African history, and world history with emphasis on historical analysis.', ARRAY['Form 1', 'Form 2', 'Form 3', 'Form 4'], true),
('Geography', 'Physical and human geography with focus on Kenya, East Africa, and global geographical patterns.', ARRAY['Form 1', 'Form 2', 'Form 3', 'Form 4'], true),
('Christian Religious Education (CRE)', 'Christian teachings, biblical studies, and moral education from Christian perspective.', ARRAY['Form 1', 'Form 2', 'Form 3', 'Form 4'], true),
('Islamic Religious Education (IRE)', 'Islamic teachings, Quranic studies, and moral education from Islamic perspective.', ARRAY['Form 1', 'Form 2', 'Form 3', 'Form 4'], true),
('French', 'French language learning, grammar, literature, and francophone culture studies.', ARRAY['Form 1', 'Form 2', 'Form 3', 'Form 4'], false),
('German', 'German language learning, grammar, literature, and German culture studies.', ARRAY['Form 1', 'Form 2', 'Form 3', 'Form 4'], false)
ON CONFLICT DO NOTHING;
