import { Type } from 'ts-morph';

/**
 * Safely get a property symbol from a type (returns undefined if not found).
 */
export function getTypeProperty(typeObj: Type, propertyName: string): Type | undefined {
  const propSymbol = typeObj.getProperty(propertyName);
  if (!propSymbol) return undefined;
  return propSymbol.getTypeAtLocation(propSymbol.getValueDeclarationOrThrow());
}

/**
 * Convert something like a Type object to a string representation.
 */
export function typeToString(t?: Type): string | undefined {
  if (!t) return undefined;
  return t.getText();
}

/**
 * Convert a name like "api_usage_logs" -> "ApiUsageLogs"
 */
export function pascalCase(str: string): string {
  return str
    .replace(/(^|_|-)(\w)/g, (_, __, letter) => letter.toUpperCase());
}

/**
 * Convert a name like "api_usage_logs" -> "apiUsageLogs"
 */
export function camelCase(str: string): string {
  return str
    .replace(/(^|_|-)(\w)/g, (match, p1, p2, offset) => {
      return offset === 0 ? p2.toLowerCase() : p2.toUpperCase();
    });
}

/**
 * Format a type object as a string with proper formatting
 */
export function formatTypeDefinition(typeText: string): string {
  // Replace inline object with properly formatted multi-line object
  return typeText.replace(
    /\{\s*([^{}]*)\s*\}/g, 
    (match, content) => {
      const properties = content.split(';').filter((prop: string) => prop.trim());
      
      if (properties.length <= 1) {
        return match; // Keep short objects as is
      }
      
      const formattedProps = properties.map((prop: string) => `  ${prop.trim()};`).join('\n');
      return `{\n${formattedProps}\n}`;
    }
  );
}

/**
 * Finds and collects all base types that should be imported
 */
export function findBaseTypes(typeText: string): Set<string> {
  const baseTypes = new Set<string>();
  
  // Extract any reference to database.types.Json or similar types
  const regex = /import\(".*\/moku\/lib\/database\.types"\)\.(\w+)/g;
  let match;
  
  while ((match = regex.exec(typeText)) !== null) {
    baseTypes.add(match[1]);
  }
  
  return baseTypes;
} 