-- DermAssist Database Schema for Supabase
-- This file contains all the SQL needed to set up the database

-- =============================================================================
-- Analysis Results Table
-- =============================================================================
-- Stores AI analysis results from the demo/production system

CREATE TABLE IF NOT EXISTS analysis_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  provider_name TEXT NOT NULL,
  model_output JSONB NOT NULL,
  parsed_output JSONB,
  image_url TEXT,
  metadata JSONB
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_analysis_results_created_at 
  ON analysis_results(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_analysis_results_provider 
  ON analysis_results(provider_name);

-- Enable Row Level Security
ALTER TABLE analysis_results ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for authenticated users
-- Note: Adjust this policy based on your authentication setup
CREATE POLICY "Allow all operations for authenticated users" 
  ON analysis_results
  FOR ALL 
  TO authenticated
  USING (true) 
  WITH CHECK (true);

-- Create policy to allow anonymous access for demo purposes
-- Remove this in production!
CREATE POLICY "Allow all operations for anonymous users" 
  ON analysis_results
  FOR ALL 
  TO anon
  USING (true) 
  WITH CHECK (true);

-- =============================================================================
-- Provider Configurations Table
-- =============================================================================
-- Stores encrypted provider configurations (for future use)

CREATE TABLE IF NOT EXISTS provider_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_type TEXT NOT NULL,
  config_data JSONB NOT NULL,
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add index
CREATE INDEX IF NOT EXISTS idx_provider_configs_active 
  ON provider_configs(is_active, provider_type);

-- Enable Row Level Security
ALTER TABLE provider_configs ENABLE ROW LEVEL SECURITY;

-- Create policy - only allow authenticated users to manage configurations
CREATE POLICY "Allow authenticated users to read configs" 
  ON provider_configs
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert configs" 
  ON provider_configs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update configs" 
  ON provider_configs
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =============================================================================
-- Storage Buckets (Optional)
-- =============================================================================
-- For storing uploaded skin condition images
-- Run this in the Supabase Storage section (or via SQL if using storage API)

-- Create a public bucket for demo images
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('demo-images', 'demo-images', true);

-- Enable RLS on storage.objects
-- ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Allow public uploads to demo-images bucket
-- CREATE POLICY "Allow public uploads to demo-images"
--   ON storage.objects
--   FOR INSERT
--   WITH CHECK (bucket_id = 'demo-images');

-- Allow public downloads from demo-images bucket
-- CREATE POLICY "Allow public downloads from demo-images"
--   ON storage.objects
--   FOR SELECT
--   USING (bucket_id = 'demo-images');

-- =============================================================================
-- Sample Queries
-- =============================================================================

-- Get recent analysis results
-- SELECT id, created_at, provider_name, 
--        parsed_output->>'summary' as summary
-- FROM analysis_results
-- ORDER BY created_at DESC
-- LIMIT 10;

-- Get results by provider
-- SELECT provider_name, COUNT(*) as count
-- FROM analysis_results
-- GROUP BY provider_name;

-- Get active provider configuration
-- SELECT * FROM provider_configs
-- WHERE is_active = true
-- ORDER BY created_at DESC
-- LIMIT 1;
