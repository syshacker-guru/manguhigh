-- Update school information with authentic Mang'u High School branding
UPDATE school_info 
SET 
  school_name = 'Mang''u High School',
  school_motto = 'Jishinde Ushinde',
  school_description = 'Founded in 1925, Mang''u High School is a premier Catholic national high school in Kenya, renowned for academic excellence and producing distinguished alumni including former President Mwai Kibaki. Located along the Nairobi-Thika Highway, the school is known for its strong academic performance, comprehensive programs, and commitment to developing well-rounded students.',
  hero_image_url = '/mangu-admin-block.png',
  logo_url = '/mangu-logo.png',
  updated_at = NOW()
WHERE id = 1;

-- Update principal information with correct details
UPDATE school_info 
SET 
  principal_name = 'Mr. Benard M Kingah',
  principal_message = 'Welcome to Mang''u High School, where we continue the tradition of academic excellence that has defined our institution since 1925. Under the motto "Jishinde Ushinde" (Conquer yourself to conquer), we are committed to nurturing young minds and developing future leaders who will serve our nation with distinction.',
  updated_at = NOW()
WHERE id = 1;
