-- Execute the table creation and seeding scripts
-- This script will be run to set up the database

-- First, run the create tables script
\i scripts/01_create_tables.sql

-- Then, run the seed data script  
\i scripts/02_seed_initial_data.sql
