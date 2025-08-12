-- Add default admin user
INSERT INTO admin_users (
  id,
  email,
  password_hash,
  full_name,
  role,
  is_active,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'victorjayden2009@gmail.com',
  'qwerty123', -- In production, this should be properly hashed
  'Victor Jayden',
  'admin',
  true,
  NOW(),
  NOW()
) ON CONFLICT (email) DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- Ensure the admin has all necessary permissions
COMMENT ON TABLE admin_users IS 'Admin users table with default admin: victorjayden2009@gmail.com';
