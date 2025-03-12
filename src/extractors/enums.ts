import { Type } from 'ts-morph';
import * as fs from 'fs';
import { pascalCase } from '../utils/helpers';

/**
 * Extracts the enums from the "Enums" property of the "public" schema
 * and writes them all into a single enums.ts file (you can split further if you prefer).
 */
export function extractEnums(enumsType: Type, outputFilePath: string) {
  const enumSymbols = enumsType.getProperties();
  const lines: string[] = [
    '/** Auto-generated Enums from `public` schema. */',
  ];

  for (const enumSymbol of enumSymbols) {
    const enumName = enumSymbol.getName();
    const enumValuesType = enumSymbol.getTypeAtLocation(
      enumSymbol.getValueDeclarationOrThrow(),
    );

    // Collect possible string literal types
    const unionTypes = enumValuesType.isUnion() ? enumValuesType.getUnionTypes() : [enumValuesType];
    const stringLiterals = unionTypes
      .filter((t: Type) => t.isStringLiteral())
      .map((t: Type) => `"${t.getLiteralValue()}"`);

    // Example: export type MyEnum = "optionA" | "optionB" | ...
    lines.push(
      `export type ${pascalCase(enumName)} = ${stringLiterals.join(' | ')};`
    );
  }

  fs.writeFileSync(outputFilePath, lines.join('\n\n'), 'utf-8');
  console.log(`Wrote enums file: ${outputFilePath}`);
} 