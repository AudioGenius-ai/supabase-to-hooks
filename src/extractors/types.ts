import { Type } from 'ts-morph';

/**
 * Configuration options for the extractor
 */
export interface ExtractorOptions {
  inputFile: string;
  outputDir: string;
  tsConfigPath: string;
  /**
   * Import path for the Supabase client
   * @example '@/lib/supabase', './utils/supabaseClient', etc.
   * @default '@/lib/supabase'
   */
  supabaseImportPath?: string;
}

/**
 * Options for file listings in storage module
 */
export interface ListOptions {
  path?: string;
  limit?: number;
  offset?: number;
  sortBy?: {
    column: string;
    order?: 'asc' | 'desc';
  };
}

/**
 * Options for getting a file's public URL
 */
export interface GetURLOptions {
  expiresIn?: number;
  download?: string | boolean;
}

/**
 * Options for moving/copying files
 */
export interface MoveOptions {
  destinationPath: string;
}

/**
 * Options for uploading files
 */
export interface UploadOptions {
  path?: string;
  metadata?: Record<string, any>;
  cacheControl?: string;
  contentType?: string;
  onProgress?: (progress: number, event: ProgressEvent<XMLHttpRequestEventTarget>) => void;
}

/**
 * Helper type for safely accessing type properties
 */
export type TypePropertyResult = {
  found: boolean;
  type?: Type;
}; 