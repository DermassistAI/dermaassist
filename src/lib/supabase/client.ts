/**
 * Supabase Client Configuration
 * Following Single Responsibility Principle (SRP)
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Type for our database schema
export interface Database {
  public: {
    Tables: {
      analysis_results: {
        Row: {
          id: string;
          created_at: string;
          provider_name: string;
          model_output: any;
          parsed_output: any;
          image_url: string | null;
          metadata: any;
        };
        Insert: {
          id?: string;
          created_at?: string;
          provider_name: string;
          model_output: any;
          parsed_output?: any;
          image_url?: string | null;
          metadata?: any;
        };
        Update: {
          id?: string;
          created_at?: string;
          provider_name?: string;
          model_output?: any;
          parsed_output?: any;
          image_url?: string | null;
          metadata?: any;
        };
      };
      provider_configs: {
        Row: {
          id: string;
          provider_type: string;
          config_data: any;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          provider_type: string;
          config_data: any;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          provider_type?: string;
          config_data?: any;
          is_active?: boolean;
          created_at?: string;
        };
      };
    };
  };
}

let supabaseClient: SupabaseClient<Database> | null = null;

/**
 * Get or create Supabase client instance (Singleton pattern)
 */
export function getSupabaseClient(): SupabaseClient<Database> | null {
  // Only initialize if environment variables are present
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables not configured. Using fallback file storage.');
    return null;
  }

  if (!supabaseClient) {
    supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey);
  }

  return supabaseClient;
}

/**
 * Check if Supabase is configured
 */
export function isSupabaseConfigured(): boolean {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}
