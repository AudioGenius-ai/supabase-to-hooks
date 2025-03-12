import * as fs from 'fs';
import { run } from '../src/extractor';

// Mock fs and path to avoid actual file operations
jest.mock('fs', () => ({
  existsSync: jest.fn(),
  mkdirSync: jest.fn(),
  writeFileSync: jest.fn(),
  readFileSync: jest.fn(),
}));

jest.mock('path', () => ({
  resolve: jest.fn((dir, file) => `${dir}/${file}`),
  join: jest.fn((...args) => args.join('/')),
}));

// Mock ts-morph
jest.mock('ts-morph', () => {
  return {
    Project: jest.fn().mockImplementation(() => ({
      addSourceFileAtPath: jest.fn().mockReturnValue({
        getTypeAliasOrThrow: jest.fn().mockReturnValue({
          getType: jest.fn().mockReturnValue({
            getProperty: jest.fn().mockReturnValue({
              getTypeAtLocation: jest.fn().mockReturnValue({
                getProperties: jest.fn().mockReturnValue([]),
              }),
            }),
          }),
        }),
      }),
    })),
  };
});

describe('Extractor Basic Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock existsSync to return true for directories
    (fs.existsSync as jest.Mock).mockImplementation(() => true);
  });

  it('should be defined', () => {
    expect(run).toBeDefined();
  });
}); 