import type { Type } from 'ts-morph';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { getTypeProperty, typeToString } from '../utils/helpers';

/**
 * Type definition for a foreign key relationship
 */
export interface Relationship {
  foreignKeyName: string;
  columns: string[];
  isOneToOne: boolean;
  referencedRelation: string;
  referencedColumns: string[];
}

/**
 * Extract relationships from a table type
 */
export function extractTableRelationships(
  tableName: string,
  tableType: Type
): Relationship[] {
  // Get the Relationships property from the table type
  const relationshipsType = getTypeProperty(tableType, 'Relationships');
  
  if (!relationshipsType) {
    return [];
  }
  
  // Convert to string and clean up
  const relationshipsTypeStr = typeToString(relationshipsType) || '[]';
  
  // Parse the relationships array from the type string
  try {
    // This is a bit hacky but works for simple cases
    // For a full solution, we'd need to properly parse the AST
    const cleanJson = relationshipsTypeStr
      .replace(/readonly /g, '')
      .replace(/\[(.*?)\]/g, (_, content) => `[${content.replace(/\s+/g, ' ')}]`)
      .replace(/"/g, '\\"')
      .replace(/'/g, '"')
      .replace(/(\w+):/g, '"$1":');
      
    const relationships = JSON.parse(cleanJson);
    return relationships as Relationship[];
  } catch (error) {
    console.warn(`Error parsing relationships for table ${tableName}:`, error);
    return [];
  }
}

/**
 * Saves relationship info to a JSON file for each table
 */
export function saveTableRelationships(
  relationships: Relationship[],
  moduleDir: string
) {
  if (relationships.length === 0) {
    return;
  }
  
  const relationshipsFilePath = path.join(moduleDir, 'relationships.json');
  fs.writeFileSync(relationshipsFilePath, JSON.stringify(relationships, null, 2), 'utf-8');
  console.log(`Wrote relationships file: ${relationshipsFilePath}`);
}

/**
 * Export relationships as TypeScript type definitions
 */
export function generateRelationshipTypes(
  tableName: string,
  relationships: Relationship[],
  moduleDir: string
) {
  if (relationships.length === 0) {
    return;
  }
  
  const relationsFilePath = path.join(moduleDir, 'relations.ts');
  
  const imports: string[] = [];
  const relations: string[] = [];
  
  // First, gather all the imports we'll need
  const relatedTables = new Set<string>();
  for (const rel of relationships) {
    relatedTables.add(rel.referencedRelation);
  }
  
  // Create import statements
  for (const table of relatedTables) {
    // Don't import self
    if (table !== tableName) {
      imports.push(`import type { ${table.charAt(0).toUpperCase() + table.slice(1)}Row } from '../${table}/types';`);
    }
  }
  
  // Generate relationship type definitions
  for (const rel of relationships) {
    const relatedTableType = `${rel.referencedRelation.charAt(0).toUpperCase() + rel.referencedRelation.slice(1)}Row`;
    const relationName = rel.foreignKeyName.replace(`${tableName}_`, '').replace('_fkey', '');
    
    if (rel.isOneToOne) {
      relations.push(`export type ${relationName} = ${relatedTableType} | null;`);
    } else {
      relations.push(`export type ${relationName} = ${relatedTableType}[];`);
    }
  }
  
  const content = [
    '/**',
    ` * Auto-generated relationship types for table: ${tableName}`,
    ' */',
    '',
    ...imports,
    '',
    ...relations,
    '',
    '/**',
    ' * All available relationships for this table',
    ' */',
    'export interface Relationships {',
    relationships.map(rel => {
      const relationName = rel.foreignKeyName.replace(`${tableName}_`, '').replace('_fkey', '');
      return `  ${relationName}?: ${relationName};`;
    }).join('\n'),
    '}',
    ''
  ].join('\n');
  
  fs.writeFileSync(relationsFilePath, content, 'utf-8');
  console.log(`Wrote relations type file: ${relationsFilePath}`);
} 