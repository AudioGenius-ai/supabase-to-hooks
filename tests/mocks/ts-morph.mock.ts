import { mock } from 'jest-mock-extended';
import { Project, Type, Node, Symbol, TypeAliasDeclaration, SourceFile } from 'ts-morph';

export const createMockType = (properties: Record<string, any> = {}) => {
  const mockType = mock<Type>();
  
  // Setup basic type properties
  mockType.getText.mockReturnValue(JSON.stringify(properties));
  
  // Setup getProperties method to return property symbols
  const propertySymbols = Object.keys(properties).map(key => {
    const propSymbol = mock<typeof Symbol>();
    propSymbol.getName.mockReturnValue(key);
    
    // Setup value retrieval
    const valueDeclaration = mock<Node>();
    propSymbol.getValueDeclarationOrThrow.mockReturnValue(valueDeclaration);
    
    // For each property, create a mock Type that returns its value
    const propType = mock<Type>();
    if (typeof properties[key] === 'string') {
      propType.isStringLiteral.mockReturnValue(true);
      propType.getLiteralValue.mockReturnValue(properties[key]);
    } else if (Array.isArray(properties[key])) {
      propType.isArray.mockReturnValue(true);
    } else if (typeof properties[key] === 'object') {
      propType.isObject.mockReturnValue(true);
    }
    
    propType.getText.mockReturnValue(JSON.stringify(properties[key]));
    propSymbol.getTypeAtLocation.mockReturnValue(propType);
    
    return propSymbol;
  });
  
  mockType.getProperties.mockReturnValue(propertySymbols);
  
  // Handle union types
  mockType.isUnion.mockReturnValue(false);
  
  return mockType;
};

export const createMockUnionType = (values: string[]) => {
  const mockType = mock<Type>();
  mockType.isUnion.mockReturnValue(true);
  
  // Create mock types for each union value
  const unionTypes = values.map(value => {
    const literalType = mock<Type>();
    literalType.isStringLiteral.mockReturnValue(true);
    literalType.getLiteralValue.mockReturnValue(value);
    return literalType;
  });
  
  mockType.getUnionTypes.mockReturnValue(unionTypes);
  mockType.getText.mockReturnValue(values.map(v => `"${v}"`).join(' | '));
  
  return mockType;
};

export const createMockProject = (typeAliases: Record<string, any> = {}) => {
  const mockProject = mock<Project>();
  const mockSourceFile = mock<SourceFile>();
  
  // Setup the type aliases in the source file
  for (const [aliasName, aliasValue] of Object.entries(typeAliases)) {
    const mockTypeAlias = mock<TypeAliasDeclaration>();
    mockTypeAlias.getName.mockReturnValue(aliasName);
    
    const mockAliasType = createMockType(aliasValue);
    mockTypeAlias.getType.mockReturnValue(mockAliasType);
    
    mockSourceFile.getTypeAlias.mockImplementation((name: string) => {
      if (name === aliasName) {
        return mockTypeAlias;
      }
      return undefined;
    });
    
    mockSourceFile.getTypeAliasOrThrow.mockImplementation((name: string) => {
      if (name === aliasName) {
        return mockTypeAlias;
      }
      throw new Error(`TypeAlias '${name}' not found`);
    });
  }
  
  mockProject.addSourceFileAtPath.mockReturnValue(mockSourceFile);
  
  return { mockProject, mockSourceFile };
};

export const createDatabaseTypeMock = () => {
  // Create mock tables
  const userTableType = createMockType({
    Row: { id: 'string', name: 'string', email: 'string' },
    Insert: { id: 'string?', name: 'string', email: 'string' },
    Update: { id: 'string?', name: 'string?', email: 'string?' }
  });
  
  const postsTableType = createMockType({
    Row: { id: 'string', title: 'string', content: 'string' },
    Insert: { id: 'string?', title: 'string', content: 'string' },
    Update: { id: 'string?', title: 'string?', content: 'string?' }
  });
  
  // Create Tables type with user and posts
  const tablesType = createMockType({
    users: userTableType,
    posts: postsTableType
  });
  
  // Create Enums
  const enumsType = createMockType({
    post_status: createMockUnionType(['draft', 'published', 'archived']),
    user_role: createMockUnionType(['admin', 'user', 'guest'])
  });
  
  // Create public schema
  const publicSchemaType = createMockType({
    Tables: tablesType,
    Enums: enumsType
  });
  
  // Create Database type
  const databaseType = createMockType({
    public: publicSchemaType
  });
  
  // Create project with Database type alias
  return createMockProject({
    Database: databaseType
  });
}; 