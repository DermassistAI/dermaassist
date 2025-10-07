/**
 * Supabase Module Exports
 */

export { getSupabaseClient, isSupabaseConfigured, type Database } from './client';
export {
  getAnalysisResultsRepository,
  SupabaseAnalysisResultsRepository,
  FileAnalysisResultsRepository,
  type AnalysisResult,
  type IAnalysisResultsRepository,
} from './repository';
