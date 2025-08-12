-- Execute this script to populate the database with initial data
-- Insert initial school information
INSERT INTO school_info (
  school_name,
  school_motto,
  school_description,
  principal_name,
  principal_message,
  contact_email,
  contact_phone,
  address,
  established_year
) VALUES (
  'Mang''u High School',
  'Jishinde Ushinde',
  'Mang''u High School is a premier secondary school in Kenya dedicated to providing quality education and nurturing future leaders through academic excellence, character development, and community service.',
  'Mr. Benard M Kingah',
  'Welcome to Mang''u High School, where we believe every student has the potential to excel. Our commitment is to provide a nurturing environment that fosters academic achievement, character development, and leadership skills that will serve our students throughout their lives.',
  'info@manguhigh.ac.ke',
  '+254 700 123 456',
  'Mang''u Road, Kiambu County, Kenya',
  1939
) ON CONFLICT DO NOTHING;

-- Insert clubs and societies
INSERT INTO programs (name, category, description, teacher_in_charge, meeting_schedule) VALUES
('Coding Club', 'club', 'Learn programming languages, web development, and software engineering. Students work on projects and participate in coding competitions.', 'Mr. John Kamau', 'Tuesdays and Thursdays 3:30-5:00 PM'),
('Robotics Club', 'club', 'Design, build, and program robots. Participate in national robotics competitions and STEM exhibitions.', 'Ms. Grace Njeri', 'Wednesdays and Fridays 3:30-5:30 PM'),
('Rotary Club', 'society', 'Community service and leadership development through Rotary International youth programs.', 'Mr. Peter Mwangi', 'First Saturday of every month 9:00-11:00 AM'),
('Chess Club', 'club', 'Strategic thinking and chess mastery. Regular tournaments and inter-school competitions.', 'Ms. Mary Wanjiru', 'Mondays and Wednesdays 3:30-4:30 PM'),
('Mathematics Club', 'club', 'Advanced mathematics problem solving, competitions, and peer tutoring.', 'Mr. David Kiprotich', 'Tuesdays and Fridays 3:30-4:30 PM'),
('Chinese Club', 'club', 'Learn Mandarin Chinese language and culture. Cultural exchange programs available.', 'Ms. Liu Wei', 'Mondays and Thursdays 3:30-4:30 PM'),
('Japanese Club', 'club', 'Japanese language learning and cultural appreciation. Anime and manga discussions included.', 'Mr. Hiroshi Tanaka', 'Tuesdays and Fridays 3:30-4:30 PM'),
('Drama Society', 'society', 'Theater productions, public speaking, and performance arts.', 'Ms. Faith Akinyi', 'Wednesdays and Saturdays 2:00-5:00 PM'),
('Debate Society', 'society', 'Competitive debating, public speaking, and critical thinking development.', 'Mr. Samuel Ochieng', 'Thursdays 3:30-5:00 PM'),
('Environmental Club', 'club', 'Environmental conservation, tree planting, and sustainability projects.', 'Ms. Jane Muthoni', 'Saturdays 8:00-11:00 AM'),
('Music Society', 'society', 'Choir, instrumental music, and music theory. Regular performances and competitions.', 'Mr. Joseph Mbugua', 'Tuesdays, Thursdays, Saturdays 3:30-5:30 PM'),
('Science Club', 'club', 'Science experiments, research projects, and science fair participation.', 'Dr. Agnes Wambui', 'Wednesdays and Fridays 3:30-5:00 PM')
ON CONFLICT DO NOTHING;

-- Insert tour programs
INSERT INTO programs (name, category, description, requirements) VALUES
('Historical Sites Tour', 'tour', 'Educational visits to Kenya''s historical sites including Fort Jesus, Gedi Ruins, and museums.', 'Form 2-4 students, parental consent required'),
('University Campus Tours', 'tour', 'Visits to leading universities in Kenya to help students make informed career choices.', 'Form 3-4 students'),
('Industrial Tours', 'tour', 'Visits to factories, companies, and industries to understand real-world applications of classroom knowledge.', 'All forms, subject to availability'),
('Cultural Exchange Tours', 'tour', 'International and local cultural exchange programs to broaden students'' perspectives.', 'Selected students based on academic performance and conduct')
ON CONFLICT DO NOTHING;

-- Insert the correct academic subjects for Mang'u High School
INSERT INTO academic_info (subject_name, description, grade_levels, is_core_subject) VALUES
('Mathematics', 'Core mathematics curriculum covering algebra, geometry, calculus, and statistics.', ARRAY['Form 1', 'Form 2', 'Form 3', 'Form 4'], true),
('Physics', 'Physical sciences covering mechanics, electricity, waves, and modern physics.', ARRAY['Form 1', 'Form 2', 'Form 3', 'Form 4'], true),
('Chemistry', 'Chemical sciences including organic, inorganic, and physical chemistry.', ARRAY['Form 1', 'Form 2', 'Form 3', 'Form 4'], true),
('Biology', 'Life sciences covering cell biology, genetics, ecology, and human anatomy.', ARRAY['Form 1', 'Form 2', 'Form 3', 'Form 4'], true),
('Power Mechanics', 'Technical subject covering mechanical systems, engines, and power transmission.', ARRAY['Form 3', 'Form 4'], false),
('Electricity', 'Electrical systems, circuits, and power generation studies.', ARRAY['Form 3', 'Form 4'], false),
('Computer Studies', 'Introduction to computing, programming, and digital literacy.', ARRAY['Form 1', 'Form 2', 'Form 3', 'Form 4'], false),
('History', 'Kenyan and world history studies.', ARRAY['Form 1', 'Form 2', 'Form 3', 'Form 4'], true),
('Geography', 'Physical and human geography with focus on Kenya and East Africa.', ARRAY['Form 1', 'Form 2', 'Form 3', 'Form 4'], true),
('Christian Religious Education (CRE)', 'Christian religious studies and moral education.', ARRAY['Form 1', 'Form 2', 'Form 3', 'Form 4'], false),
('Islamic Religious Education (IRE)', 'Islamic religious studies and moral education.', ARRAY['Form 1', 'Form 2', 'Form 3', 'Form 4'], false),
('French', 'French language learning and francophone culture studies.', ARRAY['Form 1', 'Form 2', 'Form 3', 'Form 4'], false),
('German', 'German language learning and Germanic culture studies.', ARRAY['Form 1', 'Form 2', 'Form 3', 'Form 4'], false)
ON CONFLICT DO NOTHING;

-- Insert your admin account
INSERT INTO admin_users (email, password_hash, full_name, role) VALUES
('victorjayden2009@gmail.com', 'qwerty123', 'Victor Jayden', 'super_admin')
ON CONFLICT (email) DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role;

-- Insert sample news and events
INSERT INTO news_events (title, content, type, is_published, event_date) VALUES
('Welcome to New Academic Year 2025', 'We are excited to welcome all students back for the 2025 academic year. Classes begin on January 15th, 2025.', 'announcement', true, '2025-01-15 08:00:00+03'),
('Inter-School Science Fair Victory', 'Congratulations to our Science Club for winning first place in the Regional Science Fair with their innovative water purification project.', 'news', true, NOW()),
('Annual Sports Day 2025', 'Join us for our annual sports day featuring track and field events, team sports, and cultural performances.', 'event', true, '2025-03-15 08:00:00+03'),
('Parent-Teacher Conference', 'All parents are invited to attend the quarterly parent-teacher conference to discuss student progress.', 'event', true, '2025-02-20 14:00:00+03')
ON CONFLICT DO NOTHING;
