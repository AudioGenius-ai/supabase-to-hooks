import * as fs from 'fs';
import * as path from 'path';
import { camelCase, pascalCase } from '../utils/helpers';

/**
 * Generate React Query hooks for a specific table
 */
export function generateTableHooks(
  tableName: string, 
  moduleDir: string, 
  supabaseImportPath: string = '@/lib/supabase'
) {
  const camelTableName = camelCase(tableName);
  const pascalTableName = pascalCase(tableName);
  
  const hooksContent = `
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ${pascalTableName}Row, ${pascalTableName}Insert, ${pascalTableName}Update, ${pascalTableName}FilterParams } from './types';
import { supabase } from '${supabaseImportPath}';

// Type-safe Object.entries helper
type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

function typedEntries<T extends object>(obj: T): Entries<T> {
  return Object.entries(obj) as Entries<T>;
}

// Query keys
const ${camelTableName}Keys = {
  all: ['${tableName}'] as const,
  lists: () => [...${camelTableName}Keys.all, 'list'] as const,
  list: (filters: ${pascalTableName}FilterParams) => [...${camelTableName}Keys.lists(), filters] as const,
  details: () => [...${camelTableName}Keys.all, 'detail'] as const,
  detail: (id: string) => [...${camelTableName}Keys.details(), id] as const,
};

// Get all ${tableName}
export function useGet${pascalTableName}(filters: ${pascalTableName}FilterParams = {}) {
  return useQuery({
    queryKey: ${camelTableName}Keys.list(filters),
    queryFn: async () => {
      let query = supabase.from('${tableName}').select('*');
      
      // Apply filters
      if (filters) {
        // Define special parameters that shouldn't be used as column filters
        const specialParams = ['limit', 'offset', 'order'];
        
        // Process filters with full type safety
        typedEntries(filters).forEach(([key, value]) => {
          // Skip special parameters that aren't actual columns
          if (specialParams.includes(key as string)) {
            return;
          }
          
          if (value === undefined) {
            return;
          }
          
          if (value === null) {
            query = query.is(key as string, null);
            return;
          }
          
          // Handle array values for 'in' filters
          if (Array.isArray(value)) {
            if (value.length > 0) {
              query = query.in(key as string, value);
            }
            return;
          }
          
          // Handle regular equality filters
          query = query.eq(key as string, value);
        });
        
        // Apply limit if specified
        if (filters.limit !== undefined) {
          query = query.limit(filters.limit);
        }
        
        // Apply offset if specified  
        if (filters.offset !== undefined) {
          query = query.range(
            filters.offset, 
            filters.limit !== undefined ? filters.offset + filters.limit - 1 : filters.offset + 9
          );
        }
        
        // Apply ordering if specified
        if (filters.order && filters.order.column) {
          query = query.order(
            filters.order.column as string,
            { ascending: filters.order.direction !== 'desc' }
          );
        }
      }
      
      const { data, error } = await query;
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as ${pascalTableName}Row[];
    }
  });
}

// Get a single ${tableName} by ID
export function useGet${pascalTableName}ById(id: string | undefined) {
  return useQuery({
    queryKey: ${camelTableName}Keys.detail(id || ''),
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('${tableName}')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as ${pascalTableName}Row;
    }
  });
}

// Create a new ${tableName}
export function useCreate${pascalTableName}() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (newItem: ${pascalTableName}Insert) => {
      const { data, error } = await supabase
        .from('${tableName}')
        .insert(newItem)
        .select()
        .single();
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as ${pascalTableName}Row;
    },
    onSuccess: () => {
      // Invalidate all queries for this table
      queryClient.invalidateQueries({ queryKey: ${camelTableName}Keys.all });
    }
  });
}

// Update an existing ${tableName}
export function useUpdate${pascalTableName}() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: ${pascalTableName}Update }) => {
      const { data: updatedData, error } = await supabase
        .from('${tableName}')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        throw new Error(error.message);
      }
      
      return updatedData as ${pascalTableName}Row;
    },
    onSuccess: (data) => {
      // Invalidate specific queries
      queryClient.invalidateQueries({ queryKey: ${camelTableName}Keys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: ${camelTableName}Keys.lists() });
    }
  });
}

// Delete a ${tableName}
export function useDelete${pascalTableName}() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('${tableName}')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw new Error(error.message);
      }
      
      return id;
    },
    onSuccess: (id) => {
      // Invalidate specific queries
      queryClient.invalidateQueries({ queryKey: ${camelTableName}Keys.detail(id) });
      queryClient.invalidateQueries({ queryKey: ${camelTableName}Keys.lists() });
    }
  });
}
`.trim();

  // Write the hooks file
  const hooksFilePath = path.join(moduleDir, 'hooks.ts');
  fs.writeFileSync(hooksFilePath, hooksContent, 'utf-8');
  console.log(`Wrote hooks file: ${hooksFilePath}`);
} 