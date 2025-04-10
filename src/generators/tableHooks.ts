import * as fs from 'node:fs';
import * as path from 'node:path';
import { pascalCase } from '../utils/helpers';

/**
 * Generate React Query hooks for a specific table
 */
export function generateTableHooks(
  tableName: string,
  moduleDir: string,
  supabaseImportPath: string,
) {
  const pascalTableName = pascalCase(tableName);
  
  const relationsPath = path.join(moduleDir, 'relations.ts');
  const hasRelations = fs.existsSync(relationsPath);
  
  const hooksFilePath = path.join(moduleDir, 'hooks.ts');
  
  // --- Prepare conditional parts --- 
  let relationsImport = '';
  let relationsOptionDoc = '';
  let relationsQueryKeyPart = '';
  let relationsSelectLogicBlock = '';
  const defaultSelectLogic = '      query = query.select(options?.select ? options.select.join(\',\') : \'*\');'; // Use backticks for consistency

  if (hasRelations) {
    relationsImport = 'import { Relationships } from \'./relations\';\n'; // Use backticks
    relationsOptionDoc = '    /**\n     * Specify what relationships to join\n     * @example { profile: true, comments: true }\n     */\n    with?: Partial<Record<keyof Relationships, boolean>>;\n';
    relationsQueryKeyPart = ', options?.with';
    relationsSelectLogicBlock = `
      // Determine the final select string including relations
      let finalSelect = options?.select ? options.select.join(',') : '*';
      if (options?.with) {
        const withRelations = Object.entries(options.with)
          .filter(([_, include]) => include)
          .map(([relation]) => relation);
          
        if (withRelations.length > 0) {
          finalSelect += ',' + withRelations.join(',');
        }
      }
      query = query.select(finalSelect);
    `;
  }

  const finalSelectLogic = relationsSelectLogicBlock || defaultSelectLogic; // No extra indentation needed here

  // --- Generate Hook Content ---  
  const content = `import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { ${pascalTableName}Row, ${pascalTableName}Insert, ${pascalTableName}Update, ${pascalTableName}FilterParams } from './types';
import { supabase } from '${supabaseImportPath}';
${relationsImport}
/**
 * React Query hook for fetching a single ${tableName} record by ID
 */
export const use${pascalTableName} = (
  id: string,
  options?: Omit<UseQueryOptions<${pascalTableName}Row, Error>, 'queryKey' | 'queryFn'> & {
    /**
     * Specify what columns to return
     * @example ['id', 'name', 'email']
     */
    select?: string[];
${relationsOptionDoc}  }
) => {
  return useQuery<${pascalTableName}Row, Error>({
    queryKey: ['${tableName}', id${relationsQueryKeyPart}],
    queryFn: async () => {
      let query = supabase
        .from('${tableName}')
        .eq('id', id)
        .limit(1);
        
${finalSelectLogic}
      
      const { data, error } = await query.single(); 
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as ${pascalTableName}Row;
    },
    ...options
  });
};

/**
 * React Query hook for fetching multiple ${tableName} records with filtering
 */
export const use${pascalTableName}List = (
  params?: ${pascalTableName}FilterParams,
  options?: Omit<UseQueryOptions<${pascalTableName}Row[], Error>, 'queryKey' | 'queryFn'> & {
    /**
     * Specify what columns to return
     * @example ['id', 'name', 'email']
     */
    select?: string[];
${relationsOptionDoc}  }
) => {
  return useQuery<${pascalTableName}Row[], Error>({
    queryKey: ['${tableName}', 'list', params${relationsQueryKeyPart}],
    queryFn: async () => {
      let query = supabase.from('${tableName}');
      
${finalSelectLogic}

      // Apply filters
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (key === 'limit' && typeof value === 'number') {
            query = query.limit(value);
          } else if (key === 'offset' && typeof value === 'number') {
            query = query.range(value, value + (params.limit || 10) - 1);
          } else if (key === 'order' && value && typeof value === 'object') {
            const { column, direction = 'asc' } = value;
            query = query.order(column as any, { ascending: direction === 'asc' });
          } else if (value !== undefined && value !== null && key !== 'limit' && key !== 'offset' && key !== 'order') {
            if (Array.isArray(value)) {
              query = query.in(key, value);
            } else {
              query = query.eq(key, value);
            }
          }
        });
      }
      
      const { data, error } = await query;
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as ${pascalTableName}Row[];
    },
    ...options
  });
};

/**
 * React Query mutation hook for creating a new ${tableName} record
 */
export const use${pascalTableName}Create = (
  options?: Omit<
    UseMutationOptions<${pascalTableName}Row, Error, ${pascalTableName}Insert>,
    'mutationFn'
  >
) => {
  return useMutation<${pascalTableName}Row, Error, ${pascalTableName}Insert>({
    mutationFn: async (newItem) => {
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
    ...options
  });
};

/**
 * React Query mutation hook for updating an existing ${tableName} record
 */
export const use${pascalTableName}Update = (
  options?: Omit<
    UseMutationOptions<
      ${pascalTableName}Row,
      Error,
      { id: string; data: ${pascalTableName}Update }
    >,
    'mutationFn'
  >
) => {
  return useMutation<
    ${pascalTableName}Row,
    Error,
    { id: string; data: ${pascalTableName}Update }
  >({
    mutationFn: async ({ id, data }) => {
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
    ...options
  });
};

/**
 * React Query mutation hook for deleting a ${tableName} record
 */
export const use${pascalTableName}Delete = (
  options?: Omit<
    UseMutationOptions<void, Error, string>,
    'mutationFn'
  >
) => {
  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      const { error } = await supabase
        .from('${tableName}')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw new Error(error.message);
      }
    },
    ...options
  });
};

/**
 * Direct function to fetch a single ${tableName} by ID (no React Query)
 */
export const get${pascalTableName} = async (
  id: string,
  options?: {
    select?: string[];
${relationsOptionDoc}  }
): Promise<${pascalTableName}Row> => {
  let query = supabase
    .from('${tableName}')
    .eq('id', id)
    .limit(1);
    
${finalSelectLogic}
  
  const { data, error } = await query.single(); 
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data as ${pascalTableName}Row;
};

/**
 * Direct function to fetch multiple ${tableName} records with filtering (no React Query)
 */
export const get${pascalTableName}List = async (
  params?: ${pascalTableName}FilterParams,
  options?: {
    select?: string[];
${relationsOptionDoc}  }
): Promise<${pascalTableName}Row[]> => {
  let query = supabase.from('${tableName}');
  
${finalSelectLogic}

  // Apply filters (same as use${pascalTableName}List)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (key === 'limit' && typeof value === 'number') {
        query = query.limit(value);
      } else if (key === 'offset' && typeof value === 'number') {
        query = query.range(value, value + (params.limit || 10) - 1);
      } else if (key === 'order' && value && typeof value === 'object') {
        const { column, direction = 'asc' } = value;
        query = query.order(column as any, { ascending: direction === 'asc' });
      } else if (value !== undefined && value !== null && key !== 'limit' && key !== 'offset' && key !== 'order') {
        if (Array.isArray(value)) {
          query = query.in(key, value);
        } else {
          query = query.eq(key, value);
        }
      }
    });
  }
  
  const { data, error } = await query;
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data as ${pascalTableName}Row[];
};

/**
 * Direct function to create a new ${tableName} (no React Query)
 */
export const create${pascalTableName} = async (
  newItem: ${pascalTableName}Insert
): Promise<${pascalTableName}Row> => {
  const { data, error } = await supabase
    .from('${tableName}')
    .insert(newItem)
    .select() // Create always selects *
    .single();
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data as ${pascalTableName}Row;
};

/**
 * Direct function to update an existing ${tableName} (no React Query)
 */
export const update${pascalTableName} = async (
  id: string,
  updateData: ${pascalTableName}Update
): Promise<${pascalTableName}Row> => {
  const { data, error } = await supabase
    .from('${tableName}')
    .update(updateData)
    .eq('id', id)
    .select() // Update always selects *
    .single();
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data as ${pascalTableName}Row;
};

/**
 * Direct function to delete a ${tableName} (no React Query)
 */
export const delete${pascalTableName} = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('${tableName}')
    .delete()
    .eq('id', id);
  
  if (error) {
    throw new Error(error.message);
  }
};
`;

  fs.writeFileSync(hooksFilePath, content, 'utf-8');
  console.log(`Wrote hooks file: ${hooksFilePath}`);
  
  // Create index file
  const indexFilePath = path.join(moduleDir, 'index.ts');
  
  const exportsList = [
    '// Auto-generated index file',
    'export * from \'./types\';',
    'export * from \'./hooks\';'
  ];
  
  if (hasRelations) {
    exportsList.push('export * from \'./relations\';');
  }
  
  const indexContent = exportsList.join('\n');
  
  fs.writeFileSync(indexFilePath, indexContent, 'utf-8');
  console.log(`Wrote index file: ${indexFilePath}`);
} 