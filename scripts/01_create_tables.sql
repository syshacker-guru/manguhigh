-- Execute this script to create the database tables
-- Create admin users table for authentication
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create school_info table for general school information
CREATE TABLE IF NOT EXISTS school_info (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_name TEXT NOT NULL DEFAULT 'Mang''uHigh',
  school_motto TEXT,
  school_description TEXT,
  principal_name TEXT,
  principal_message TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  address TEXT,
  established_year INTEGER,
  logo_url TEXT,
  hero_image_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create programs table for school programs (clubs, societies, tours, etc.)
CREATE TABLE IF NOT EXISTS programs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('club', 'society', 'tour', 'academic', 'sports', 'other')),
  description TEXT,
  image_url TEXT,
  meeting_schedule TEXT,
  teacher_in_charge TEXT,
  requirements TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create news_events table for school news and events
CREATE TABLE IF NOT EXISTS news_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('news', 'event', 'announcement')),
  image_url TEXT,
  event_date TIMESTAMP WITH TIME ZONE,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create academic_info table for academic programs and curriculum
CREATE TABLE IF NOT EXISTS academic_info (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  subject_name TEXT NOT NULL,
  description TEXT,
  grade_levels TEXT[], -- Array of grade levels (e.g., ['Form 1', 'Form 2'])
  teacher_name TEXT,
  syllabus_url TEXT,
  is_core_subject BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE school_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_info ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can read school_info" ON school_info FOR SELECT USING (true);
CREATE POLICY "Public can read active programs" ON programs FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read published news_events" ON news_events FOR SELECT USING (is_published = true);
CREATE POLICY "Public can read academic_info" ON academic_info FOR SELECT USING (true);

-- Create policies for admin access (will be updated when auth is implemented)
CREATE POLICY "Admins can manage school_info" ON school_info FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage programs" ON programs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage news_events" ON news_events FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage academic_info" ON academic_info FOR ALL USING (auth.role() = 'authenticated');
