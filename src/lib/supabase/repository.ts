/**
 * Analysis Results Repository
 * Implements Repository Pattern following Single Responsibility Principle (SRP)
 * Handles all data persistence operations for analysis results
 */

import { getSupabaseClient, isSupabaseConfigured, type Database } from './client';
import type { ModelOutput } from '../axSignatures';
import fs from 'fs';
import path from 'path';

export interface AnalysisResult {
  id?: string;
  created_at?: string;
  provider_name: string;
  model_output: string;
  parsed_output: ModelOutput | null;
  image_url?: string | null;
  metadata?: Record<string, any>;
}

/**
 * Repository interface for analysis results storage
 * Following Interface Segregation Principle (ISP)
 */
export interface IAnalysisResultsRepository {
  save(result: AnalysisResult): Promise<{ success: boolean; error?: string }>;
  getById(id: string): Promise<AnalysisResult | null>;
  getAll(limit?: number): Promise<AnalysisResult[]>;
}

/**
 * Supabase implementation of Analysis Results Repository
 */
export class SupabaseAnalysisResultsRepository implements IAnalysisResultsRepository {
  async save(result: AnalysisResult): Promise<{ success: boolean; error?: string }> {
    const client = getSupabaseClient();
    if (!client) {
      return { success: false, error: 'Supabase not configured' };
    }

    const { error } = await client
      .from('analysis_results')
      .insert({
        provider_name: result.provider_name,
        model_output: result.model_output,
        parsed_output: result.parsed_output,
        image_url: result.image_url,
        metadata: result.metadata,
      });

    if (error) {
      console.error('Error saving to Supabase:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  }

  async getById(id: string): Promise<AnalysisResult | null> {
    const client = getSupabaseClient();
    if (!client) return null;

    const { data, error } = await client
      .from('analysis_results')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching from Supabase:', error);
      return null;
    }

    return data as AnalysisResult;
  }

  async getAll(limit: number = 100): Promise<AnalysisResult[]> {
    const client = getSupabaseClient();
    if (!client) return [];

    const { data, error } = await client
      .from('analysis_results')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching from Supabase:', error);
      return [];
    }

    return (data as AnalysisResult[]) || [];
  }
}

/**
 * File-based implementation of Analysis Results Repository (fallback)
 * Used when Supabase is not configured
 */
export class FileAnalysisResultsRepository implements IAnalysisResultsRepository {
  private dataDir: string;
  private filePath: string;

  constructor() {
    this.dataDir = path.resolve(process.cwd(), 'data');
    this.filePath = path.join(this.dataDir, 'results.json');
  }

  private ensureDataDir(): void {
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }
  }

  private readData(): AnalysisResult[] {
    this.ensureDataDir();
    if (!fs.existsSync(this.filePath)) {
      return [];
    }
    try {
      const content = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(content);
    } catch (e) {
      console.error('Error reading file data:', e);
      return [];
    }
  }

  private writeData(data: AnalysisResult[]): void {
    this.ensureDataDir();
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf8');
  }

  async save(result: AnalysisResult): Promise<{ success: boolean; error?: string }> {
    try {
      const data = this.readData();
      const newResult: AnalysisResult = {
        ...result,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
      };
      data.push(newResult);
      this.writeData(data);
      return { success: true };
    } catch (e) {
      console.error('Error saving to file:', e);
      return { success: false, error: String(e) };
    }
  }

  async getById(id: string): Promise<AnalysisResult | null> {
    const data = this.readData();
    return data.find(r => r.id === id) || null;
  }

  async getAll(limit: number = 100): Promise<AnalysisResult[]> {
    const data = this.readData();
    return data.slice(-limit).reverse();
  }
}

/**
 * Factory to get the appropriate repository implementation
 * Following Dependency Inversion Principle (DIP)
 */
export function getAnalysisResultsRepository(): IAnalysisResultsRepository {
  if (isSupabaseConfigured()) {
    return new SupabaseAnalysisResultsRepository();
  } else {
    return new FileAnalysisResultsRepository();
  }
}
