import * as fs from 'fs';
import * as path from 'path';

/**
 * Generate a dedicated module for storage operations
 */
export function generateStorageModule(
  baseOutputDir: string,
  supabaseImportPath: string = '@/lib/supabase'
) {
  // Create directory for storage module
  const moduleDir = path.join(baseOutputDir, 'storage');
  if (!fs.existsSync(moduleDir)) {
    fs.mkdirSync(moduleDir, { recursive: true });
  }

  // Generate storage types
  generateStorageTypes(moduleDir);
  
  // Generate storage hooks
  generateStorageHooks(moduleDir, supabaseImportPath);
  
  // Create an index file for this module
  createStorageIndexFile(moduleDir);
  
  console.log('Generated storage module');
}

/**
 * Create an index file for the storage module
 */
function createStorageIndexFile(moduleDir: string) {
  const indexContent = [
    '// Auto-generated index file for the storage module',
    '',
    "export * from './types';",
    "export * from './hooks';"
  ].join('\n');
  
  const indexFilePath = path.join(moduleDir, 'index.ts');
  fs.writeFileSync(indexFilePath, indexContent, 'utf-8');
  console.log(`Wrote storage module index file: ${indexFilePath}`);
}

/**
 * Generate type definitions for storage operations
 */
function generateStorageTypes(moduleDir: string) {
  const typesContent = `/** Auto-generated type definitions for storage operations */

/**
 * File metadata returned by the Supabase storage API
 */
export interface FileObject {
  name: string;
  bucket_id: string;
  owner: string;
  id: string;
  updated_at: string;
  created_at: string;
  last_accessed_at: string;
  metadata: Record<string, any>;
  buckets: {
    id: string;
    name: string;
    owner: string;
    created_at: string;
    updated_at: string;
    public: boolean;
  };
}

/**
 * Options for uploading files
 */
export interface UploadOptions {
  /**
   * The path to store the file at, including the file name. 
   * If a path is not provided, it will be set to the file's name.
   */
  path?: string;
  
  /**
   * Custom file metadata
   */
  metadata?: Record<string, any>;
  
  /**
   * Cache control for the file
   */
  cacheControl?: string;
  
  /**
   * Content type of the file
   */
  contentType?: string;
  
  /**
   * File upload progress callback
   */
  onProgress?: (progress: number, event: ProgressEvent<XMLHttpRequestEventTarget>) => void;
}

/**
 * Options for file listings
 */
export interface ListOptions {
  /**
   * The folder path to list
   */
  path?: string;
  
  /**
   * The number of files to limit
   */
  limit?: number;
  
  /**
   * The starting position
   */
  offset?: number;
  
  /**
   * Column to sort by
   */
  sortBy?: {
    column: string;
    order?: 'asc' | 'desc';
  };
}

/**
 * Options for getting a file's public URL
 */
export interface GetURLOptions {
  /**
   * How long the URL will be valid for in seconds
   */
  expiresIn?: number;
  
  /**
   * Custom download name for the file
   */
  download?: string | boolean;
}

/**
 * Options for moving/copying files
 */
export interface MoveOptions {
  /**
   * Path to store the copied file
   */
  destinationPath: string;
}

/**
 * Storage bucket information
 */
export interface Bucket {
  id: string;
  name: string;
  owner: string;
  public: boolean;
  created_at: string;
  updated_at: string;
}
`;

  const typesFilePath = path.join(moduleDir, 'types.ts');
  fs.writeFileSync(typesFilePath, typesContent, 'utf-8');
  console.log(`Wrote storage types file: ${typesFilePath}`);
}

/**
 * Generate hooks for storage operations
 */
function generateStorageHooks(moduleDir: string, supabaseImportPath: string = '@/lib/supabase') {
  const hooksContent = `
import { useQuery, useMutation, useQueryClient, QueryOptions, MutationOptions } from '@tanstack/react-query';
import { supabase } from '${supabaseImportPath}';
import { 
  FileObject, 
  UploadOptions, 
  ListOptions, 
  GetURLOptions, 
  MoveOptions,
  Bucket 
} from './types';

// Query keys
const storageKeys = {
  all: ['storage'] as const,
  buckets: () => [...storageKeys.all, 'buckets'] as const,
  bucket: (name: string) => [...storageKeys.buckets(), name] as const,
  lists: () => [...storageKeys.all, 'list'] as const,
  list: (bucket: string, options: ListOptions = {}) => [...storageKeys.lists(), bucket, options] as const,
  files: () => [...storageKeys.all, 'files'] as const,
  file: (bucket: string, path: string) => [...storageKeys.files(), bucket, path] as const,
};

/**
 * Hook to list all storage buckets
 */
export function useListBuckets(
  options?: Omit<QueryOptions<Bucket[], Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: storageKeys.buckets(),
    queryFn: async () => {
      const { data, error } = await supabase.storage.listBuckets();
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as Bucket[];
    },
    ...options
  });
}

/**
 * Hook to get a specific bucket
 */
export function useGetBucket(
  name: string,
  options?: Omit<QueryOptions<Bucket, Error>, 'queryKey' | 'queryFn' | 'enabled'>
) {
  return useQuery({
    queryKey: storageKeys.bucket(name),
    enabled: !!name,
    queryFn: async () => {
      const { data, error } = await supabase.storage.getBucket(name);
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as Bucket;
    },
    ...options
  });
}

/**
 * Hook to create a new bucket
 */
export function useCreateBucket(
  options?: Omit<MutationOptions<any, Error, { name: string; isPublic?: boolean }, unknown>, 'mutationFn'>
) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ name, isPublic = false }: { name: string; isPublic?: boolean }) => {
      const { data, error } = await supabase.storage.createBucket(name, { 
        public: isPublic 
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    },
    onSuccess: () => {
      // Invalidate buckets list
      queryClient.invalidateQueries({ queryKey: storageKeys.buckets() });
    },
    ...options
  });
}

/**
 * Hook to update bucket settings
 */
export function useUpdateBucket(
  options?: Omit<MutationOptions<any, Error, { id: string; options: { public: boolean } }, unknown>, 'mutationFn'>
) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, options }: { id: string; options: { public: boolean } }) => {
      const { data, error } = await supabase.storage.updateBucket(id, options);
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    },
    onSuccess: (_, variables) => {
      // Invalidate the specific bucket
      queryClient.invalidateQueries({ queryKey: storageKeys.bucket(variables.id) });
      queryClient.invalidateQueries({ queryKey: storageKeys.buckets() });
    },
    ...options
  });
}

/**
 * Hook to delete a bucket
 */
export function useDeleteBucket(
  options?: Omit<MutationOptions<any, Error, string, unknown>, 'mutationFn'>
) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (name: string) => {
      const { error } = await supabase.storage.deleteBucket(name);
      
      if (error) {
        throw new Error(error.message);
      }
      
      return name;
    },
    onSuccess: (name) => {
      // Invalidate the specific bucket and buckets list
      queryClient.invalidateQueries({ queryKey: storageKeys.bucket(name) });
      queryClient.invalidateQueries({ queryKey: storageKeys.buckets() });
    },
    ...options
  });
}

/**
 * Hook to list files within a bucket
 */
export function useListFiles(
  bucket: string, 
  options: ListOptions = {},
  queryOptions?: Omit<QueryOptions<FileObject[], Error>, 'queryKey' | 'queryFn' | 'enabled'>
) {
  return useQuery({
    queryKey: storageKeys.list(bucket, options),
    enabled: !!bucket,
    queryFn: async () => {
      const { path, limit, offset, sortBy } = options;
      
      const { data, error } = await supabase.storage
        .from(bucket)
        .list(path || '', {
          limit,
          offset,
          sortBy: sortBy ? { column: sortBy.column, order: sortBy.order } : undefined,
        });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as FileObject[];
    },
    ...queryOptions
  });
}

/**
 * Hook to get the URL for a file
 */
export function useGetPublicUrl(
  bucket: string, 
  path: string, 
  options: GetURLOptions = {},
  queryOptions?: Omit<QueryOptions<string, Error>, 'queryKey' | 'queryFn' | 'enabled'>
) {
  return useQuery({
    queryKey: [...storageKeys.file(bucket, path), 'url', options],
    enabled: !!bucket && !!path,
    queryFn: async () => {
      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(path, options);
      
      return data.publicUrl;
    },
    ...queryOptions
  });
}

/**
 * Hook to upload a file to storage
 */
export function useUploadFile(
  bucket: string,
  options?: Omit<MutationOptions<any, Error, { file: File; options?: UploadOptions }, unknown>, 'mutationFn'>
) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ file, options = {} }: { file: File; options?: UploadOptions }) => {
      const {
        path,
        metadata,
        cacheControl,
        contentType,
        onProgress,
      } = options;
      
      // Use file name as path if not specified
      const filePath = path || file.name;
      
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl,
          contentType,
          metadata,
          upsert: true,
          ...(onProgress ? { onUploadProgress: onProgress } : {}),
        });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    },
    onSuccess: (_, variables) => {
      // Invalidate file lists for the bucket
      queryClient.invalidateQueries({ queryKey: storageKeys.lists() });
      
      // Calculate the folder path to invalidate the specific folder query
      const folderPath = variables.options?.path 
        ? variables.options.path.split('/').slice(0, -1).join('/') 
        : '';
      
      queryClient.invalidateQueries({ 
        queryKey: storageKeys.list(variables.bucket, { path: folderPath })
      });
    },
    ...options
  });
}

/**
 * Hook to download a file
 */
export function useDownloadFile(
  bucket: string,
  options?: Omit<MutationOptions<Blob, Error, string, unknown>, 'mutationFn'>
) {
  return useMutation({
    mutationFn: async (path: string) => {
      const { data, error } = await supabase.storage
        .from(bucket)
        .download(path);
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    },
    ...options
  });
}

/**
 * Hook to delete files
 */
export function useDeleteFiles(
  bucket: string,
  options?: Omit<MutationOptions<any, Error, string[], unknown>, 'mutationFn'>
) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (paths: string[]) => {
      const { data, error } = await supabase.storage
        .from(bucket)
        .remove(paths);
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    },
    onSuccess: (_, paths) => {
      // Invalidate file listings
      queryClient.invalidateQueries({ queryKey: storageKeys.lists() });
      
      // If there are folders in the paths, invalidate those specific folder listings
      const folders = new Set<string>();
      paths.forEach(path => {
        const folder = path.split('/').slice(0, -1).join('/');
        folders.add(folder);
      });
      
      folders.forEach(folder => {
        queryClient.invalidateQueries({ 
          queryKey: storageKeys.list(bucket, { path: folder })
        });
      });
    },
    ...options
  });
}

/**
 * Hook to move a file
 */
export function useMoveFile(
  bucket: string,
  options?: Omit<MutationOptions<any, Error, { sourcePath: string; options: MoveOptions }, unknown>, 'mutationFn'>
) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ sourcePath, options }: { sourcePath: string; options: MoveOptions }) => {
      const { data, error } = await supabase.storage
        .from(bucket)
        .move(sourcePath, options.destinationPath);
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    },
    onSuccess: (_, variables) => {
      // Invalidate file listings
      queryClient.invalidateQueries({ queryKey: storageKeys.lists() });
      
      // Get source and destination folders
      const sourceFolder = variables.sourcePath.split('/').slice(0, -1).join('/');
      const destFolder = variables.options.destinationPath.split('/').slice(0, -1).join('/');
      
      // Invalidate both folder listings
      queryClient.invalidateQueries({ 
        queryKey: storageKeys.list(bucket, { path: sourceFolder })
      });
      
      if (sourceFolder !== destFolder) {
        queryClient.invalidateQueries({ 
          queryKey: storageKeys.list(bucket, { path: destFolder })
        });
      }
    },
    ...options
  });
}

/**
 * Hook to copy a file
 */
export function useCopyFile(
  bucket: string,
  options?: Omit<MutationOptions<any, Error, { sourcePath: string; options: MoveOptions }, unknown>, 'mutationFn'>
) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ sourcePath, options }: { sourcePath: string; options: MoveOptions }) => {
      const { data, error } = await supabase.storage
        .from(bucket)
        .copy(sourcePath, options.destinationPath);
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    },
    onSuccess: (_, variables) => {
      // Invalidate file listings
      queryClient.invalidateQueries({ queryKey: storageKeys.lists() });
      
      // Get destination folder
      const destFolder = variables.options.destinationPath.split('/').slice(0, -1).join('/');
      
      // Invalidate destination folder listing
      queryClient.invalidateQueries({ 
        queryKey: storageKeys.list(bucket, { path: destFolder })
      });
    },
    ...options
  });
}
`;

  const hooksFilePath = path.join(moduleDir, 'hooks.ts');
  fs.writeFileSync(hooksFilePath, hooksContent, 'utf-8');
  console.log(`Wrote storage hooks file: ${hooksFilePath}`);
} 