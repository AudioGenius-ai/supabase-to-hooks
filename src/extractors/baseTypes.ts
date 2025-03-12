import { Type } from 'ts-morph';
import * as fs from 'fs';
import { findBaseTypes, getTypeProperty, typeToString } from '../utils/helpers';

/**
 * Extract all base types used across all tables
 */
export function extractAllBaseTypes(tablesType: Type, baseTypes: Set<string>) {
  const tableSymbols = tablesType.getProperties();

  for (const tableSymbol of tableSymbols) {
    const tableType = tableSymbol.getTypeAtLocation(
      tableSymbol.getValueDeclarationOrThrow(),
    );

    // Each table should have .getProperty("Row"), .getProperty("Insert"), etc.
    const rowType = getTypeProperty(tableType, 'Row');
    const insertType = getTypeProperty(tableType, 'Insert');
    const updateType = getTypeProperty(tableType, 'Update');

    // Get raw type strings
    const rowTypeStr = typeToString(rowType) || '{}';
    const insertTypeStr = typeToString(insertType) || '{}';
    const updateTypeStr = typeToString(updateType) || '{}';
    
    // Find all base types
    [rowTypeStr, insertTypeStr, updateTypeStr].forEach(typeStr => {
      findBaseTypes(typeStr).forEach(t => baseTypes.add(t));
    });
  }
}

/**
 * Create a base types file with common types
 */
export function createBaseTypesFile(baseTypes: string[], outputFilePath: string) {
  if (baseTypes.length === 0) {
    return; // No base types to extract
  }
  
  const lines = [
    '/** Auto-generated base types extracted from database schema */',
    ''
  ];
  
  // Add each base type definition
  baseTypes.forEach(typeName => {
    // For each base type, create a placeholder definition
    // Real implementation would extract the actual type definition from the original file
    lines.push(`export type ${typeName} = any; // Replace with actual type definition if needed`);
  });
  
  fs.writeFileSync(outputFilePath, lines.join('\n'), 'utf-8');
  console.log(`Wrote base types file: ${outputFilePath}`);
} 