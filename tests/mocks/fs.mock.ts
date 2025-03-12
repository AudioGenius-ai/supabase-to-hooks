import mock from 'mock-fs';
import * as fs from 'fs';
import * as path from 'path';

export const setupMockFileSystem = (files: Record<string, string | Buffer>) => {
  const fileSystem: Record<string, any> = {
    // Node modules that are needed for the tests
    'node_modules': mock.directory({
      items: {
        'chalk': mock.directory({
          items: {
            'package.json': mock.file({
              content: JSON.stringify({
                name: 'chalk',
                main: 'index.js'
              })
            }),
            'index.js': mock.file({
              content: 'module.exports = { red: (text) => text, blue: (text) => text, green: (text) => text, yellow: (text) => text };'
            })
          }
        }),
        'commander': mock.directory({
          items: {
            'package.json': mock.file({
              content: JSON.stringify({
                name: 'commander',
                main: 'index.js'
              })
            }),
            'index.js': mock.file({
              content: 'module.exports = { Command: class Command { constructor() { this.options = []; } name() { return this; } description() { return this; } version() { return this; } option() { return this; } action(fn) { this.actionFn = fn; return this; } parse() { if (this.actionFn) this.actionFn({}); } } };'
            })
          }
        }),
        'ts-morph': mock.directory({
          items: {
            'package.json': mock.file({
              content: JSON.stringify({
                name: 'ts-morph',
                main: 'index.js'
              })
            }),
            'index.js': mock.file({
              content: 'module.exports = { Project: class Project { constructor() {} addSourceFileAtPath() {} } };'
            })
          }
        })
      }
    }),
    // Test files
    'tsconfig.json': mock.file({
      content: JSON.stringify({
        compilerOptions: {
          target: 'ES2020',
          module: 'commonjs',
          outDir: './dist',
          strict: true
        }
      })
    }),
    'package.json': mock.file({
      content: JSON.stringify({
        name: 'supabase-to-hooks',
        version: '0.1.0'
      })
    })
  };

  // Add custom files
  for (const [filePath, content] of Object.entries(files)) {
    const pathParts = filePath.split('/');
    let current = fileSystem;
    
    // Create directory structure
    for (let i = 0; i < pathParts.length - 1; i++) {
      const part = pathParts[i];
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part];
    }
    
    // Add file
    const fileName = pathParts[pathParts.length - 1];
    current[fileName] = mock.file({ content });
  }

  mock(fileSystem);
};

export const cleanupMockFileSystem = () => {
  mock.restore();
};

export const getMockFileContent = (filePath: string): string => {
  return fs.readFileSync(filePath, 'utf-8');
};

export const mockOutputDir = 'lib/database';
export const mockInputFile = 'lib/database.types.ts';

export const setupBasicMockFiles = () => {
  const dbTypesContent = `
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: { id: string; name: string; email: string; }
        Insert: { id?: string; name: string; email: string; }
        Update: { id?: string; name?: string; email?: string; }
      }
      posts: {
        Row: { id: string; title: string; content: string; }
        Insert: { id?: string; title: string; content: string; }
        Update: { id?: string; title?: string; content?: string; }
      }
    }
    Enums: {
      post_status: "draft" | "published" | "archived"
    }
  }
}`;

  setupMockFileSystem({
    [mockInputFile]: dbTypesContent,
    'tsconfig.json': JSON.stringify({
      compilerOptions: {
        target: 'ES2020',
        module: 'commonjs',
        outDir: './dist',
        strict: true
      }
    })
  });
  
  // Create output directory if it doesn't exist
  const outputDirPath = path.resolve(process.cwd(), mockOutputDir);
  if (!fs.existsSync(outputDirPath)) {
    fs.mkdirSync(outputDirPath, { recursive: true });
  }
}; 