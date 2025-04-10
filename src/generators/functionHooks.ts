import * as fs from 'node:fs';
import * as path from 'node:path';
import { pascalCase, camelCase } from '../utils/helpers';

/**
 * Generate React Query hooks for RPC functions
 */
export function generateFunctionHooks(
  functionName: string,
  moduleDir: string,
  supabaseImportPath: string,
) {
  const pascalFunctionName = pascalCase(functionName);
  const camelFunctionName = camelCase(functionName);
  
  // Create hooks file path
  const hooksFilePath = path.join(moduleDir, 'hooks.ts');
  
  // Generate the hook content
  const hookContent = `import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { ${pascalFunctionName}Args, ${pascalFunctionName}Returns } from './types';
import { supabase } from '${supabaseImportPath}';

/**
 * React Query hook for calling the ${functionName} RPC function
 */
export const use${pascalFunctionName} = (
  args: ${pascalFunctionName}Args,
  options?: Omit<UseQueryOptions<${pascalFunctionName}Returns, Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<${pascalFunctionName}Returns, Error>({
    queryKey: ['rpc', '${functionName}', args],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('${functionName}', args);
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as ${pascalFunctionName}Returns;
    },
    ...options
  });
};

/**
 * React Query mutation hook for calling the ${functionName} RPC function
 */
export const use${pascalFunctionName}Mutation = (
  options?: Omit<UseMutationOptions<${pascalFunctionName}Returns, Error, ${pascalFunctionName}Args>, 'mutationFn'>
) => {
  return useMutation<${pascalFunctionName}Returns, Error, ${pascalFunctionName}Args>({
    mutationFn: async (args) => {
      const { data, error } = await supabase.rpc('${functionName}', args);
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as ${pascalFunctionName}Returns;
    },
    ...options
  });
};

/**
 * Direct function call to ${functionName} RPC function (no React Query)
 */
export const ${camelFunctionName} = async (
  args: ${pascalFunctionName}Args
): Promise<${pascalFunctionName}Returns> => {
  const { data, error } = await supabase.rpc('${functionName}', args);
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data as ${pascalFunctionName}Returns;
};
`;

  fs.writeFileSync(hooksFilePath, hookContent, 'utf-8');
  console.log(`Wrote function hooks file: ${hooksFilePath}`);
  
  // Create index file to export hooks
  const indexFilePath = path.join(moduleDir, 'index.ts');
  const indexContent = `// Auto-generated index file for ${functionName} RPC function
export * from './types';
export * from './hooks';
`;

  fs.writeFileSync(indexFilePath, indexContent, 'utf-8');
  console.log(`Wrote function index file: ${indexFilePath}`);
}

/**
 * Generate hooks for all extracted RPC functions
 */
export function generateAllFunctionHooks(
  functionsDir: string,
  supabaseImportPath: string,
) {
  // Get all function directories
  const functionDirs = fs.readdirSync(functionsDir);
  
  for (const functionName of functionDirs) {
    // Skip index.ts file
    if (functionName === 'index.ts') continue;
    
    const moduleDir = path.join(functionsDir, functionName);
    if (fs.statSync(moduleDir).isDirectory()) {
      generateFunctionHooks(functionName, moduleDir, supabaseImportPath);
    }
  }
} 