#!/usr/bin/env node

import { Command } from 'commander';
import { run } from './extractor';
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';

const packageJson = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8')
);

const program = new Command();

program
  .name('supabase-to-hooks')
  .description('Generate React Query hooks from Supabase database types')
  .version(packageJson.version)
  .option('-i, --input <file>', 'Path to database.types.ts file', './lib/database.types.ts')
  .option('-o, --output <dir>', 'Output directory for generated files', './lib/database')
  .option('-c, --config <file>', 'Path to config file')
  .option('--ts-config <file>', 'Path to tsconfig.json file', './tsconfig.json')
  .option('--supabase-path <path>', 'Import path for the Supabase client', '@/lib/supabase')
  .action(async (options) => {
    try {
      console.log(chalk.blue('🚀 Generating React Query hooks from Supabase types...'));
      
      // If config file provided, read options from there
      if (options.config) {
        const configPath = path.resolve(process.cwd(), options.config);
        if (fs.existsSync(configPath)) {
          const configFile = JSON.parse(fs.readFileSync(configPath, 'utf8'));
          options = { ...options, ...configFile };
        } else {
          console.error(chalk.red(`❌ Config file not found: ${options.config}`));
          process.exit(1);
        }
      }
      
      // Resolve paths relative to current directory
      const inputFile = path.resolve(process.cwd(), options.input);
      const outputDir = path.resolve(process.cwd(), options.output);
      const tsConfigPath = path.resolve(process.cwd(), options.tsConfig);
      
      // Check if input file exists
      if (!fs.existsSync(inputFile)) {
        console.error(chalk.red(`❌ Input file not found: ${inputFile}`));
        console.log(chalk.yellow('💡 Try specifying the path with --input option'));
        process.exit(1);
      }
      
      // Check if tsconfig exists
      if (!fs.existsSync(tsConfigPath)) {
        console.error(chalk.red(`❌ tsconfig.json not found: ${tsConfigPath}`));
        console.log(chalk.yellow('💡 Try specifying the path with --ts-config option'));
        process.exit(1);
      }
      
      // Run the extractor
      await run({
        inputFile,
        outputDir,
        tsConfigPath,
        supabaseImportPath: options.supabasePath,
      });
      
      console.log(chalk.green('✅ Successfully generated React Query hooks!'));
      console.log(chalk.blue(`📁 Output directory: ${outputDir}`));
    } catch (error) {
      console.error(chalk.red('❌ Error generating hooks:'), error);
      process.exit(1);
    }
  });

program.parse();

// Export main extractor functionality
export { run } from './extractor';
export type { ExtractorOptions } from './extractors/types';

// Export helper utilities
export * from './utils/helpers';

// Export extractors
export * from './extractors/baseTypes';
export * from './extractors/tables';
export * from './extractors/enums';

// Export generators
export * from './generators/tableHooks';
export * from './generators/storageHooks'; 