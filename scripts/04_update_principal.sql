-- Update the principal's name and message for Mang'uHigh
UPDATE school_info 
SET 
  principal_name = 'Mr. Benard M Kingah',
  principal_message = 'Welcome to Mang''uHigh, where we are committed to nurturing academic excellence and character development. Under my leadership, we strive to provide every student with the tools and opportunities they need to succeed in their academic journey and become responsible citizens of Kenya and the world.'
WHERE school_name = 'Mang''uHigh';
