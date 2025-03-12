import * as fs from 'fs';
import * as path from 'path';
import { run } from '../src/extractor';
import { createDatabaseTypeMock } from './mocks/ts-morph.mock';
import { 
  setupMockFileSystem, 
  cleanupMockFileSystem, 
  getMockFileContent,
  setupBasicMockFiles,
  mockInputFile,
  mockOutputDir 
} from './mocks/fs.mock';

// Mock ts-morph
jest.mock('ts-morph', () => {
  const { Project } = jest.requireActual('ts-morph');
  return {
    Project: jest.fn().mockImplementation(() => {
      const { mockProject } = createDatabaseTypeMock();
      return mockProject;
    }),
    // We need to keep the actual TypeLiterals and other classes for type checking
    ...jest.requireActual('ts-morph')
  };
});

describe('Extractor Module', () => {
  beforeEach(() => {
    setupBasicMockFiles();
  });

  afterEach(() => {
    cleanupMockFileSystem();
    jest.clearAllMocks();
  });

  describe('run function', () => {
    it('should run the extraction process successfully', async () => {
      // Create a spy on the fs.writeFileSync method
      const writeFileSpy = jest.spyOn(fs, 'writeFileSync');
      
      // Run the extractor
      await run({
        inputFile: mockInputFile,
        outputDir: mockOutputDir,
        tsConfigPath: 'tsconfig.json'
      });
      
      // Verify that files were written
      expect(writeFileSpy).toHaveBeenCalled();
      
      // Check for specific files
      const expectedFiles = [
        'base-types.ts',
        'enums.ts',
        'index.ts',
        'users/index.ts',
        'users/types.ts',
        'users/hooks.ts',
        'posts/index.ts',
        'posts/types.ts',
        'posts/hooks.ts',
        'storage/index.ts',
        'storage/types.ts',
        'storage/hooks.ts'
      ];
      
      for (const file of expectedFiles) {
        const filePath = path.join(mockOutputDir, file);
        expect(writeFileSpy).toHaveBeenCalledWith(
          filePath,
          expect.any(String),
          expect.any(String)
        );
      }
    });

    it('should throw error if no public property is found', async () => {
      // Mock Project to return a Database type without public property
      const originalModule = jest.requireMock('ts-morph');
      originalModule.Project.mockImplementationOnce(() => {
        const { mockProject } = createDatabaseTypeMock();
        // Make getProperty return undefined for 'public'
        const mockType = mockProject.addSourceFileAtPath('').getTypeAliasOrThrow('').getType();
        mockType.getProperty.mockReturnValue(undefined);
        return mockProject;
      });
      
      // Expect the run function to throw an error
      await expect(run({
        inputFile: mockInputFile,
        outputDir: mockOutputDir,
        tsConfigPath: 'tsconfig.json'
      })).rejects.toThrow('No "public" property found in Database');
    });
  });

  describe('file generation', () => {
    it('should generate base types file correctly', async () => {
      // Run the extractor
      await run({
        inputFile: mockInputFile,
        outputDir: mockOutputDir,
        tsConfigPath: 'tsconfig.json'
      });
      
      // Check the content of the base-types.ts file
      const baseTypesPath = path.join(mockOutputDir, 'base-types.ts');
      const content = getMockFileContent(baseTypesPath);
      
      // Should contain Json type
      expect(content).toContain('export type Json');
    });

    it('should generate enums file correctly', async () => {
      // Run the extractor
      await run({
        inputFile: mockInputFile,
        outputDir: mockOutputDir,
        tsConfigPath: 'tsconfig.json'
      });
      
      // Check the content of the enums.ts file
      const enumsPath = path.join(mockOutputDir, 'enums.ts');
      const content = getMockFileContent(enumsPath);
      
      // Should contain post_status enum
      expect(content).toContain('PostStatus');
      expect(content).toContain('"draft" | "published" | "archived"');
    });

    it('should generate table modules with correct types and hooks', async () => {
      // Run the extractor
      await run({
        inputFile: mockInputFile,
        outputDir: mockOutputDir,
        tsConfigPath: 'tsconfig.json'
      });
      
      // Check users module
      const usersTypesPath = path.join(mockOutputDir, 'users/types.ts');
      const usersTypesContent = getMockFileContent(usersTypesPath);
      
      expect(usersTypesContent).toContain('export type UsersRow');
      expect(usersTypesContent).toContain('export type UsersInsert');
      expect(usersTypesContent).toContain('export type UsersUpdate');
      expect(usersTypesContent).toContain('export type UsersFilterParams');
      
      const usersHooksPath = path.join(mockOutputDir, 'users/hooks.ts');
      const usersHooksContent = getMockFileContent(usersHooksPath);
      
      expect(usersHooksContent).toContain('useGetUsers');
      expect(usersHooksContent).toContain('useGetUsersById');
      expect(usersHooksContent).toContain('useCreateUsers');
      expect(usersHooksContent).toContain('useUpdateUsers');
      expect(usersHooksContent).toContain('useDeleteUsers');
      
      // Check posts module
      const postsTypesPath = path.join(mockOutputDir, 'posts/types.ts');
      const postsTypesContent = getMockFileContent(postsTypesPath);
      
      expect(postsTypesContent).toContain('export type PostsRow');
      expect(postsTypesContent).toContain('export type PostsInsert');
      expect(postsTypesContent).toContain('export type PostsUpdate');
      expect(postsTypesContent).toContain('export type PostsFilterParams');
      
      const postsHooksPath = path.join(mockOutputDir, 'posts/hooks.ts');
      const postsHooksContent = getMockFileContent(postsHooksPath);
      
      expect(postsHooksContent).toContain('useGetPosts');
      expect(postsHooksContent).toContain('useGetPostsById');
      expect(postsHooksContent).toContain('useCreatePosts');
      expect(postsHooksContent).toContain('useUpdatePosts');
      expect(postsHooksContent).toContain('useDeletePosts');
    });

    it('should generate storage module correctly', async () => {
      // Run the extractor
      await run({
        inputFile: mockInputFile,
        outputDir: mockOutputDir,
        tsConfigPath: 'tsconfig.json'
      });
      
      // Check storage module
      const storageTypesPath = path.join(mockOutputDir, 'storage/types.ts');
      const storageTypesContent = getMockFileContent(storageTypesPath);
      
      expect(storageTypesContent).toContain('export interface FileObject');
      expect(storageTypesContent).toContain('export interface UploadOptions');
      expect(storageTypesContent).toContain('export interface ListOptions');
      expect(storageTypesContent).toContain('export interface GetURLOptions');
      expect(storageTypesContent).toContain('export interface MoveOptions');
      expect(storageTypesContent).toContain('export interface Bucket');
      
      const storageHooksPath = path.join(mockOutputDir, 'storage/hooks.ts');
      const storageHooksContent = getMockFileContent(storageHooksPath);
      
      expect(storageHooksContent).toContain('useListBuckets');
      expect(storageHooksContent).toContain('useGetBucket');
      expect(storageHooksContent).toContain('useCreateBucket');
      expect(storageHooksContent).toContain('useUpdateBucket');
      expect(storageHooksContent).toContain('useDeleteBucket');
      expect(storageHooksContent).toContain('useListFiles');
      expect(storageHooksContent).toContain('useGetPublicUrl');
      expect(storageHooksContent).toContain('useUploadFile');
      expect(storageHooksContent).toContain('useDownloadFile');
      expect(storageHooksContent).toContain('useDeleteFiles');
      expect(storageHooksContent).toContain('useMoveFile');
      expect(storageHooksContent).toContain('useCopyFile');
    });
    
    it('should generate main index file with proper exports', async () => {
      // Run the extractor
      await run({
        inputFile: mockInputFile,
        outputDir: mockOutputDir,
        tsConfigPath: 'tsconfig.json'
      });
      
      // Check main index file
      const indexPath = path.join(mockOutputDir, 'index.ts');
      const indexContent = getMockFileContent(indexPath);
      
      expect(indexContent).toContain("export * from './base-types';");
      expect(indexContent).toContain("export * from './enums';");
      expect(indexContent).toContain("export * from './storage';");
      expect(indexContent).toContain("export * from './users';");
      expect(indexContent).toContain("export * from './posts';");
    });
  });

  // Test utility functions
  describe('utility functions', () => {
    it('should properly convert strings to PascalCase', async () => {
      // We need to import the pascalCase function for testing
      // Since it's not exported, we'll test it indirectly through the output
      
      // Run the extractor
      await run({
        inputFile: mockInputFile,
        outputDir: mockOutputDir,
        tsConfigPath: 'tsconfig.json'
      });
      
      // Check if the table names are properly converted to PascalCase
      const usersTypesPath = path.join(mockOutputDir, 'users/types.ts');
      const usersTypesContent = getMockFileContent(usersTypesPath);
      
      expect(usersTypesContent).toContain('export type UsersRow');
      
      // Test with a table name that has underscores
      // For this test, we need to add a table with underscores to the mock
      const enumsPath = path.join(mockOutputDir, 'enums.ts');
      const enumsContent = getMockFileContent(enumsPath);
      
      expect(enumsContent).toContain('export type PostStatus');
    });
    
    it('should create proper camelCase names for variables', async () => {
      // Run the extractor
      await run({
        inputFile: mockInputFile,
        outputDir: mockOutputDir,
        tsConfigPath: 'tsconfig.json'
      });
      
      // Check hooks content for camelCase variable names
      const usersHooksPath = path.join(mockOutputDir, 'users/hooks.ts');
      const usersHooksContent = getMockFileContent(usersHooksPath);
      
      expect(usersHooksContent).toContain('const usersKeys');
    });
  });
}); 