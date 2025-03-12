import { Type } from 'ts-morph';
import * as fs from 'fs';
import * as path from 'path';
import { 
  camelCase, 
  findBaseTypes, 
  formatTypeDefinition, 
  getTypeProperty, 
  pascalCase, 
  typeToString 
} from '../utils/helpers';

/**
 * Extract tables and organize by modules (one directory per table)
 */
export function extractTablesByModule(tablesType: Type, baseOutputDir: string) {
  // The properties under "Tables" are table names
  const tableSymbols = tablesType.getProperties();

  for (const tableSymbol of tableSymbols) {
    const tableName = tableSymbol.getName();
    const tableType = tableSymbol.getTypeAtLocation(
      tableSymbol.getValueDeclarationOrThrow(),
    );

    // Create directory for this table module
    const moduleDir = path.join(baseOutputDir, tableName);
    if (!fs.existsSync(moduleDir)) {
      fs.mkdirSync(moduleDir, { recursive: true });
    }

    // Extract types for this table
    extractTableTypes(tableName, tableType, moduleDir);
    
    // Create an index file for this module
    createModuleIndexFile(tableName, moduleDir);
    
    console.log(`Generated module for table: ${tableName}`);
  }
}

/**
 * Create an index file for a table module
 */
export function createModuleIndexFile(tableName: string, moduleDir: string) {
  const indexContent = [
    `// Auto-generated index file for the ${tableName} module`,
    '',
    "export * from './types';",
    "export * from './hooks';"
  ].join('\n');
  
  const indexFilePath = path.join(moduleDir, 'index.ts');
  fs.writeFileSync(indexFilePath, indexContent, 'utf-8');
  console.log(`Wrote module index file: ${indexFilePath}`);
}

/**
 * Extract types for a specific table
 */
export function extractTableTypes(tableName: string, tableType: Type, moduleDir: string) {
  // Each table should have .getProperty("Row"), .getProperty("Insert"), etc.
  const rowType = getTypeProperty(tableType, 'Row');
  const insertType = getTypeProperty(tableType, 'Insert');
  const updateType = getTypeProperty(tableType, 'Update');

  // Get raw type strings
  const rowTypeStr = typeToString(rowType) || '{}';
  const insertTypeStr = typeToString(insertType) || '{}';
  const updateTypeStr = typeToString(updateType) || '{}';
  
  // Find all base types used (e.g., Json)
  const tableBaseTypes = new Set<string>();
  [rowTypeStr, insertTypeStr, updateTypeStr].forEach(typeStr => {
    findBaseTypes(typeStr).forEach(t => tableBaseTypes.add(t));
  });
  
  // Prepare imports if needed - now referencing our local base-types file
  const imports = tableBaseTypes.size > 0 
    ? `import { ${Array.from(tableBaseTypes).join(', ')} } from "../base-types";\n\n`
    : '';
  
  // Format the type strings
  const formattedRowType = formatTypeDefinition(rowTypeStr);
  const formattedInsertType = formatTypeDefinition(insertTypeStr);
  const formattedUpdateType = formatTypeDefinition(updateTypeStr);
  
  // Clean up absolute imports in type strings
  const cleanRowType = formattedRowType.replace(/import\(".*\/moku\/lib\/database\.types"\)\./g, '');
  const cleanInsertType = formattedInsertType.replace(/import\(".*\/moku\/lib\/database\.types"\)\./g, '');
  const cleanUpdateType = formattedUpdateType.replace(/import\(".*\/moku\/lib\/database\.types"\)\./g, '');

  // We'll write types to a types.ts file in the module directory
  const typesFilePath = path.join(moduleDir, 'types.ts');
  const pascalTableName = pascalCase(tableName);
  
  const content = [
    `/** Auto-generated type definitions for table: ${tableName} */\n`,
    imports,
    `export type ${pascalTableName}Row = ${cleanRowType};\n`,
    `export type ${pascalTableName}Insert = ${cleanInsertType};\n`,
    `export type ${pascalTableName}Update = ${cleanUpdateType};\n`,
    `/**
 * Filter parameters for ${tableName} queries
 * Makes all properties from ${pascalTableName}Row optional and adds array operators
 */
export type ${pascalTableName}FilterParams = {
  [K in keyof ${pascalTableName}Row]?: ${pascalTableName}Row[K] | ${pascalTableName}Row[K][] | null;
} & {
  limit?: number;
  offset?: number;
  order?: {
    column: keyof ${pascalTableName}Row;
    direction?: 'asc' | 'desc';
  };
};`,
  ].join('\n');

  fs.writeFileSync(typesFilePath, content, 'utf-8');
  console.log(`Wrote types file: ${typesFilePath}`);
}

/**
 * Creates the main index file that re-exports all modules
 */
export function createMainIndexFile(tablesType: Type, outputDir: string) {
  const exports: string[] = [
    '// Auto-generated index file for database modules',
    '',
    '// Re-export base types and enums',
    "export * from './base-types';",
    "export * from './enums';",
    '',
    '// Re-export storage module',
    "export * from './storage';",
    '',
    '// Re-export all table modules'
  ];

  const tableSymbols = tablesType.getProperties();
  for (const tableSymbol of tableSymbols) {
    const tableName = tableSymbol.getName();
    exports.push(`export * from './${tableName}';`);
  }

  const indexFilePath = path.join(outputDir, 'index.ts');
  fs.writeFileSync(indexFilePath, exports.join('\n'), 'utf-8');
  console.log(`Wrote main index file: ${indexFilePath}`);
} 