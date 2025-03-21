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
import { useQuery, useMutation, useQueryClient, QueryOptions, MutationOptions } from '@tanstack/react-query';
import { ${pascalTableName}Row, ${pascalTableName}Insert, ${pascalTableName}Update, ${pascalTableName}FilterParams } from './types';
import { supabase } from '${supabaseImportPath}';

// Query keys
const ${camelTableName}Keys = {
  all: ['${tableName}'] as const,
  lists: () => [...${camelTableName}Keys.all, 'list'] as const,
  list: (filters: ${pascalTableName}FilterParams) => [...${camelTableName}Keys.lists(), filters] as const,
  details: () => [...${camelTableName}Keys.all, 'detail'] as const,
  detail: (id: string) => [...${camelTableName}Keys.details(), id] as const,
  primaryKey: (primaryKeyColumn: string, value: string | number) => [...${camelTableName}Keys.details(), primaryKeyColumn, value] as const,
};

// Get all ${tableName}
export function useGet${pascalTableName}(
  filters: ${pascalTableName}FilterParams = {}, 
  options?: Omit<QueryOptions<${pascalTableName}Row[], Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ${camelTableName}Keys.list(filters),
    queryFn: async () => {
      let query = supabase.from('${tableName}').select('*');
      
      // Apply filters
      if (filters) {
        // Define special parameters that shouldn't be used as column filters
        const specialParams = ['limit', 'offset', 'order'];
        
        // Process filters with type safety
        Object.keys(filters).forEach((key) => {
          // Skip special parameters that aren't actual columns
          if (specialParams.includes(key)) {
            return;
          }
          
          const value = filters[key as keyof typeof filters];
          
          if (value === undefined) {
            return;
          }
          
          if (value === null) {
            query = query.is(key, null);
            return;
          }
          
          // Handle array values for 'in' filters
          if (Array.isArray(value)) {
            if (value.length > 0) {
              query = query.in(key, value);
            }
            return;
          }
          
          // Handle regular equality filters
          query = query.eq(key, value);
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
    },
    ...options
  });
}

// Lazy version - only fetches when the fetch function is called
export function useLazyGet${pascalTableName}() {
  const queryClient = useQueryClient();
  
  const fetchData = async (filters: ${pascalTableName}FilterParams = {}) => {
    let query = supabase.from('${tableName}').select('*');
    
    // Apply filters
    if (filters) {
      // Define special parameters that shouldn't be used as column filters
      const specialParams = ['limit', 'offset', 'order'];
      
      // Process filters with type safety
      Object.keys(filters).forEach((key) => {
        // Skip special parameters that aren't actual columns
        if (specialParams.includes(key)) {
          return;
        }
        
        const value = filters[key as keyof typeof filters];
        
        if (value === undefined) {
          return;
        }
        
        if (value === null) {
          query = query.is(key, null);
          return;
        }
        
        // Handle array values for 'in' filters
        if (Array.isArray(value)) {
          if (value.length > 0) {
            query = query.in(key, value);
          }
          return;
        }
        
        // Handle regular equality filters
        query = query.eq(key, value);
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
    
    const result = data as ${pascalTableName}Row[];
    
    // Update the cache with the fetched data
    queryClient.setQueryData(${camelTableName}Keys.list(filters), result);
    
    return result;
  };
  
  return { fetch: fetchData };
}

// Get a single ${tableName} by ID (assumes primary key is 'id')
export function useGet${pascalTableName}ById(
  id: string | undefined,
  options?: Omit<QueryOptions<${pascalTableName}Row, Error>, 'queryKey' | 'queryFn' | 'enabled'>
) {
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
    },
    ...options
  });
}

// Get a single ${tableName} by any primary key
export function useGet${pascalTableName}ByPrimaryKey<T extends string | number>(
  primaryKeyColumn: string,
  value: T | undefined,
  options?: Omit<QueryOptions<${pascalTableName}Row, Error>, 'queryKey' | 'queryFn' | 'enabled'>
) {
  return useQuery({
    queryKey: ${camelTableName}Keys.primaryKey(primaryKeyColumn, value?.toString() || ''),
    enabled: !!value,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('${tableName}')
        .select('*')
        .eq(primaryKeyColumn, value)
        .single();
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as ${pascalTableName}Row;
    },
    ...options
  });
}

// Lazy version - only fetches when the fetch function is called
export function useLazyGet${pascalTableName}ById() {
  const queryClient = useQueryClient();
  
  const fetchData = async (id: string) => {
    const { data, error } = await supabase
      .from('${tableName}')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      throw new Error(error.message);
    }
    
    const result = data as ${pascalTableName}Row;
    
    // Update the cache with the fetched data
    queryClient.setQueryData(${camelTableName}Keys.detail(id), result);
    
    return result;
  };
  
  return { fetch: fetchData };
}

// Lazy version for fetching by primary key - only fetches when the fetch function is called
export function useLazyGet${pascalTableName}ByPrimaryKey() {
  const queryClient = useQueryClient();
  
  const fetchData = async <T extends string | number>(primaryKeyColumn: string, value: T) => {
    const { data, error } = await supabase
      .from('${tableName}')
      .select('*')
      .eq(primaryKeyColumn, value)
      .single();
    
    if (error) {
      throw new Error(error.message);
    }
    
    const result = data as ${pascalTableName}Row;
    
    // Update the cache with the fetched data
    queryClient.setQueryData(${camelTableName}Keys.primaryKey(primaryKeyColumn, value.toString()), result);
    
    return result;
  };
  
  return { fetch: fetchData };
}

// Create a new ${tableName}
export function useCreate${pascalTableName}(
  options?: Omit<MutationOptions<${pascalTableName}Row, Error, ${pascalTableName}Insert, unknown>, 'mutationFn'>
) {
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
    },
    ...options
  });
}

// Update an existing ${tableName} by ID
export function useUpdate${pascalTableName}(
  options?: Omit<MutationOptions<${pascalTableName}Row, Error, { id: string; data: ${pascalTableName}Update }, unknown>, 'mutationFn'>
) {
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
    },
    ...options
  });
}

// Update ${tableName} by any primary key
export function useUpdate${pascalTableName}ByPrimaryKey<T extends string | number>(
  options?: Omit<MutationOptions<${pascalTableName}Row, Error, { primaryKeyColumn: string; value: T; data: ${pascalTableName}Update }, unknown>, 'mutationFn'>
) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ primaryKeyColumn, value, data }: { primaryKeyColumn: string; value: T; data: ${pascalTableName}Update }) => {
      const { data: updatedData, error } = await supabase
        .from('${tableName}')
        .update(data)
        .eq(primaryKeyColumn, value)
        .select()
        .single();
      
      if (error) {
        throw new Error(error.message);
      }
      
      return updatedData as ${pascalTableName}Row;
    },
    onSuccess: (_, variables) => {
      // Invalidate specific queries
      queryClient.invalidateQueries({ 
        queryKey: ${camelTableName}Keys.primaryKey(variables.primaryKeyColumn, variables.value.toString())
      });
      queryClient.invalidateQueries({ queryKey: ${camelTableName}Keys.lists() });
    },
    ...options
  });
}

// Delete a ${tableName} by ID
export function useDelete${pascalTableName}(
  options?: Omit<MutationOptions<string, Error, string, unknown>, 'mutationFn'>
) {
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
    },
    ...options
  });
}

// Delete ${tableName} by any primary key
export function useDelete${pascalTableName}ByPrimaryKey<T extends string | number>(
  options?: Omit<MutationOptions<{ primaryKeyColumn: string; value: T }, Error, { primaryKeyColumn: string; value: T }, unknown>, 'mutationFn'>
) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ primaryKeyColumn, value }: { primaryKeyColumn: string; value: T }) => {
      const { error } = await supabase
        .from('${tableName}')
        .delete()
        .eq(primaryKeyColumn, value);
      
      if (error) {
        throw new Error(error.message);
      }
      
      return { primaryKeyColumn, value };
    },
    onSuccess: (result) => {
      // Invalidate specific queries
      queryClient.invalidateQueries({ 
        queryKey: ${camelTableName}Keys.primaryKey(result.primaryKeyColumn, result.value.toString())
      });
      queryClient.invalidateQueries({ queryKey: ${camelTableName}Keys.lists() });
    },
    ...options
  });
}
`.trim();

  // Write the hooks file
  const hooksFilePath = path.join(moduleDir, 'hooks.ts');
  fs.writeFileSync(hooksFilePath, hooksContent, 'utf-8');
  console.log(`Wrote hooks file: ${hooksFilePath}`);
} 