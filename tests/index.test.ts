import * as path from 'path';
import * as fs from 'fs';
import { 
  setupMockFileSystem, 
  cleanupMockFileSystem,
  mockInputFile, 
  mockOutputDir 
} from './mocks/fs.mock';

// Mock the extractor module
jest.mock('../src/extractor', () => ({
  run: jest.fn().mockResolvedValue(undefined)
}));

// Mock the command-line arguments
const mockExit = jest.spyOn(process, 'exit').mockImplementation((code) => {
  throw new Error(`Process.exit(${code})`);
});

// Store original process.argv
const originalArgv = process.argv;

describe('CLI Module', () => {
  beforeEach(() => {
    // Setup basic file system
    setupMockFileSystem({
      [mockInputFile]: 'mock database types content',
      'tsconfig.json': JSON.stringify({ compilerOptions: {} }),
      'package.json': JSON.stringify({ version: '0.1.0' }),
      'supabase-to-hooks.config.json': JSON.stringify({
        input: mockInputFile,
        output: mockOutputDir,
        tsConfig: 'tsconfig.json'
      })
    });
    
    // Reset all mocks
    jest.clearAllMocks();
    
    // Create output directory
    const outputDirPath = path.resolve(process.cwd(), mockOutputDir);
    if (!fs.existsSync(outputDirPath)) {
      fs.mkdirSync(outputDirPath, { recursive: true });
    }
  });
  
  afterEach(() => {
    cleanupMockFileSystem();
    process.argv = originalArgv;
  });
  
  it('should run with default options', async () => {
    // Set command-line arguments
    process.argv = ['node', 'index.js'];
    
    // Import the CLI module
    const { run } = require('../src/extractor');
    
    // Require the CLI module to trigger the action
    require('../src/index');
    
    // Verify that run was called with the correct arguments
    expect(run).toHaveBeenCalledWith({
      inputFile: expect.any(String),
      outputDir: expect.any(String),
      tsConfigPath: expect.any(String)
    });
  });
  
  it('should run with custom input and output options', async () => {
    // Set command-line arguments
    process.argv = [
      'node', 
      'index.js', 
      '--input', 
      'custom/path/database.types.ts',
      '--output',
      'custom/output/dir'
    ];
    
    // Clear require cache to ensure it runs with new arguments
    jest.resetModules();
    
    // Import the CLI module
    const { run } = require('../src/extractor');
    
    // Require the CLI module to trigger the action
    require('../src/index');
    
    // Verify that run was called with the custom paths
    expect(run).toHaveBeenCalledWith({
      inputFile: expect.stringContaining('custom/path/database.types.ts'),
      outputDir: expect.stringContaining('custom/output/dir'),
      tsConfigPath: expect.any(String)
    });
  });
  
  it('should run with config file option', async () => {
    // Set command-line arguments
    process.argv = [
      'node', 
      'index.js', 
      '--config', 
      'supabase-to-hooks.config.json'
    ];
    
    // Create a mock config file
    fs.writeFileSync(
      'supabase-to-hooks.config.json', 
      JSON.stringify({
        input: 'config/file/database.types.ts',
        output: 'config/file/output',
        tsConfig: 'config/file/tsconfig.json'
      }),
      'utf-8'
    );
    
    // Clear require cache to ensure it runs with new arguments
    jest.resetModules();
    
    // Import the CLI module
    const { run } = require('../src/extractor');
    
    // Require the CLI module to trigger the action
    require('../src/index');
    
    // Verify that run was called with the options from the config file
    expect(run).toHaveBeenCalledWith({
      inputFile: expect.stringContaining('config/file/database.types.ts'),
      outputDir: expect.stringContaining('config/file/output'),
      tsConfigPath: expect.stringContaining('config/file/tsconfig.json')
    });
  });
  
  it('should exit with error if input file does not exist', async () => {
    // Set command-line arguments
    process.argv = [
      'node', 
      'index.js', 
      '--input', 
      'non-existent-file.ts'
    ];
    
    // Setup file system to make sure the file doesn't exist
    fs.unlinkSync('non-existent-file.ts');
    
    // Clear require cache to ensure it runs with new arguments
    jest.resetModules();
    
    // Expect process.exit to be called with code 1
    expect(() => {
      require('../src/index');
    }).toThrow('Process.exit(1)');
    
    // Verify that run was not called
    const { run } = require('../src/extractor');
    expect(run).not.toHaveBeenCalled();
  });
  
  it('should exit with error if tsconfig file does not exist', async () => {
    // Set command-line arguments
    process.argv = [
      'node', 
      'index.js', 
      '--ts-config', 
      'non-existent-tsconfig.json'
    ];
    
    // Clear require cache to ensure it runs with new arguments
    jest.resetModules();
    
    // Expect process.exit to be called with code 1
    expect(() => {
      require('../src/index');
    }).toThrow('Process.exit(1)');
    
    // Verify that run was not called
    const { run } = require('../src/extractor');
    expect(run).not.toHaveBeenCalled();
  });
  
  it('should exit with error if config file does not exist', async () => {
    // Set command-line arguments
    process.argv = [
      'node', 
      'index.js', 
      '--config', 
      'non-existent-config.json'
    ];
    
    // Clear require cache to ensure it runs with new arguments
    jest.resetModules();
    
    // Expect process.exit to be called with code 1
    expect(() => {
      require('../src/index');
    }).toThrow('Process.exit(1)');
    
    // Verify that run was not called
    const { run } = require('../src/extractor');
    expect(run).not.toHaveBeenCalled();
  });
  
  it('should handle run errors properly', async () => {
    // Set command-line arguments
    process.argv = ['node', 'index.js'];
    
    // Mock run to throw an error
    const { run } = require('../src/extractor');
    run.mockRejectedValueOnce(new Error('Test error'));
    
    // Clear require cache to ensure it runs with new mocks
    jest.resetModules();
    
    // Expect process.exit to be called with code 1
    expect(() => {
      require('../src/index');
    }).toThrow('Process.exit(1)');
  });
}); 