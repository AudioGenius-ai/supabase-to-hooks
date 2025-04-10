import type { Type } from 'ts-morph';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { pascalCase } from '../utils/helpers';
import { getTypeProperty, typeToString, formatTypeDefinition, findBaseTypes } from '../utils/helpers';

/**
 * Extract RPC functions from the database types
 * Ignores functions with names starting with underscore (_)
 */
export function extractFunctions(functionsType: Type, outputDir: string) {
  // Create the functions directory if not exists
  const functionsDir = path.join(outputDir, 'functions');
  if (!fs.existsSync(functionsDir)) {
    fs.mkdirSync(functionsDir, { recursive: true });
  }
  
  const functionSymbols = functionsType.getProperties();
  const functionNames: string[] = [];
  
  for (const functionSymbol of functionSymbols) {
    const functionName = functionSymbol.getName();
    
    // Skip functions that start with underscore (_)
    if (functionName.startsWith('_')) {
      console.log(`Skipping private function: ${functionName}`);
      continue;
    }
    
    functionNames.push(functionName);
    const functionType = functionSymbol.getTypeAtLocation(
      functionSymbol.getValueDeclarationOrThrow(),
    );
    
    // Each function should have .Args and .Returns properties
    const argsType = getTypeProperty(functionType, 'Args');
    const returnsType = getTypeProperty(functionType, 'Returns');
    
    // Convert to strings
    const argsTypeStr = typeToString(argsType) || '{}';
    const returnsTypeStr = typeToString(returnsType) || 'void';
    
    // Find base types used in the function
    const functionBaseTypes = new Set<string>();
    for (const typeStr of [argsTypeStr, returnsTypeStr]) {
      for (const t of findBaseTypes(typeStr)) {
        functionBaseTypes.add(t);
      }
    }
    
    // Prepare imports
    const imports = functionBaseTypes.size > 0 
      ? `import { ${Array.from(functionBaseTypes).join(', ')} } from "../base-types";\n\n`
      : '';
    
    // Format type strings
    const formattedArgsType = formatTypeDefinition(argsTypeStr);
    const formattedReturnsType = formatTypeDefinition(returnsTypeStr);
    
    // Clean up imports in type strings
    const importRegex = /import\(".*database\.types(?:\.ts)?"\)\./g;
    const cleanArgsType = formattedArgsType.replace(importRegex, '');
    const cleanReturnsType = formattedReturnsType.replace(importRegex, '');
    
    // Create the function's directory and types file
    const functionDir = path.join(functionsDir, functionName);
    if (!fs.existsSync(functionDir)) {
      fs.mkdirSync(functionDir, { recursive: true });
    }
    
    const typesFilePath = path.join(functionDir, 'types.ts');
    const pascalFunctionName = pascalCase(functionName);
    
    // Generate the types file content
    const content = [
      `/** Auto-generated type definitions for RPC function: ${functionName} */\n`,
      imports,
      `export type ${pascalFunctionName}Args = ${cleanArgsType};\n`,
      `export type ${pascalFunctionName}Returns = ${cleanReturnsType};\n`,
    ].join('\n');
    
    fs.writeFileSync(typesFilePath, content, 'utf-8');
    console.log(`Wrote function types file: ${typesFilePath}`);
  }
  
  // Create an index file for all functions
  createFunctionsIndexFile(functionNames, functionsDir);
}

/**
 * Creates an index file for the functions directory
 */
function createFunctionsIndexFile(functionNames: string[], functionsDir: string) {
  const exports = [
    '// Auto-generated index file for RPC functions',
    ''
  ];
  
  for (const functionName of functionNames) {
    exports.push(`export * from './${functionName}';`);
  }
  
  const indexFilePath = path.join(functionsDir, 'index.ts');
  fs.writeFileSync(indexFilePath, exports.join('\n'), 'utf-8');
  console.log(`Wrote functions index file: ${indexFilePath}`);
} 