import { Project } from 'ts-morph';
import * as fs from 'node:fs';
import * as path from 'node:path';
import type { ExtractorOptions } from './extractors/types';
import { getTypeProperty } from './utils/helpers';
import { extractAllBaseTypes, createBaseTypesFile } from './extractors/baseTypes';
import { extractTablesByModule, createMainIndexFile } from './extractors/tables';
import { extractEnums } from './extractors/enums';
import { extractFunctions } from './extractors/functions';
import { extractTableRelationships, saveTableRelationships, generateRelationshipTypes } from './extractors/relationships';
import { generateTableHooks } from './generators/tableHooks';
import { generateStorageModule } from './generators/storageHooks';
import { generateAllFunctionHooks } from './generators/functionHooks';

/**
 * Main function to run the extraction process
 */
export async function run(options: ExtractorOptions): Promise<void> {
  const { 
    inputFile, 
    outputDir, 
    tsConfigPath, 
    supabaseImportPath = '@/lib/supabase' 
  } = options;

  // Set up the AST project
  const project = new Project({
    tsConfigFilePath: tsConfigPath,
    skipAddingFilesFromTsConfig: true, // We'll add exactly what we need
  });

  // Add your big "Database" file
  const sourceFile = project.addSourceFileAtPath(inputFile);

  // Grab the Database type alias
  const dbTypeAlias = sourceFile.getTypeAliasOrThrow('Database');

  // The type after the "=" in `type Database = { … }`
  const dbType = dbTypeAlias.getType();

  // For example, let's extract the `public` property from the Database type:
  const publicProp = getTypeProperty(dbType, 'public');
  if (!publicProp) {
    throw new Error('No "public" property found in Database');
  }

  // Inside "public", we have "Tables", "Views", "Functions", "Enums"...
  // Let's grab "Tables", "Functions", and "Enums":
  const publicTablesProp = getTypeProperty(publicProp, 'Tables');
  const publicFunctionsProp = getTypeProperty(publicProp, 'Functions');
  const publicEnumsProp = getTypeProperty(publicProp, 'Enums');

  // Create the output directory if not exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Find all base types used across all tables
  const allBaseTypes = new Set<string>();
  
  // Extract all potential base types first
  if (publicTablesProp) {
    extractAllBaseTypes(publicTablesProp, allBaseTypes);
  }
  
  // Create base types file
  createBaseTypesFile(Array.from(allBaseTypes), path.join(outputDir, 'base-types.ts'));

  // Now extract tables grouped by module
  if (publicTablesProp) {
    extractTablesByModule(publicTablesProp, outputDir);
    
    // Generate hooks for each table
    const tableSymbols = publicTablesProp.getProperties();
    for (const tableSymbol of tableSymbols) {
      const tableName = tableSymbol.getName();
      const moduleDir = path.join(outputDir, tableName);
      
      // Extract and save relationships for this table
      const tableType = tableSymbol.getTypeAtLocation(
        tableSymbol.getValueDeclarationOrThrow(),
      );
      
      const relationships = extractTableRelationships(tableName, tableType);
      saveTableRelationships(relationships, moduleDir);
      generateRelationshipTypes(tableName, relationships, moduleDir);
      
      // Generate table hooks
      generateTableHooks(tableName, moduleDir, supabaseImportPath);
    }
  }

  // Extract Enums
  if (publicEnumsProp) {
    extractEnums(publicEnumsProp, path.join(outputDir, 'enums.ts'));
  }
  
  // Extract Functions and generate hooks (if available)
  if (publicFunctionsProp) {
    console.log('Extracting RPC functions...');
    extractFunctions(publicFunctionsProp, outputDir);
    
    // Generate hooks for RPC functions
    const functionsDir = path.join(outputDir, 'functions');
    if (fs.existsSync(functionsDir)) {
      generateAllFunctionHooks(functionsDir, supabaseImportPath);
    }
  }

  // Generate storage-related hooks
  generateStorageModule(outputDir, supabaseImportPath);

  // Create the main index file
  if (publicTablesProp) {
    createMainIndexFile(publicTablesProp, outputDir, !!publicFunctionsProp);
  }
} 