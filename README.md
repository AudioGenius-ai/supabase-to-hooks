# Supabase to Hooks

A CLI tool that automatically generates React Query hooks from your Supabase database.types.ts file.

## Features

- 🚀 Extracts types from your Supabase database.types.ts file
- 🎣 Generates fully typed React Query hooks for each table
- 🔄 Creates CRUD operations (Get, GetById, Create, Update, Delete)
- 🗄️ Includes storage hooks for Supabase Storage
- 📦 Clean module structure for better code organization
- ⚡ Strongly typed with full TypeScript support

## Installation

### Global Installation

```bash
# Using npm
npm install -g supabase-to-hooks

# Using yarn
yarn global add supabase-to-hooks
```

### Project Installation

```bash
# Using npm
npm install --save-dev supabase-to-hooks

# Using yarn
yarn add --dev supabase-to-hooks
```

## Usage

### Command Line

```bash
# Using globally installed package
supabase-to-hooks --input ./path/to/database.types.ts --output ./path/to/output-directory

# Using npx (no installation required)
npx supabase-to-hooks --input ./path/to/database.types.ts --output ./path/to/output-directory

# Using yarn
yarn supabase-to-hooks --input ./path/to/database.types.ts --output ./path/to/output-directory
```

### Options

| Option | Alias | Description | Default |
|--------|-------|-------------|---------|
| `--input` | `-i` | Path to database.types.ts file | ./lib/database.types.ts |
| `--output` | `-o` | Output directory for generated files | ./lib/database |
| `--ts-config` | | Path to tsconfig.json file | ./tsconfig.json |
| `--supabase-path` | | Import path for the Supabase client | @/lib/supabase |
| `--config` | `-c` | Path to config file (JSON) | |
| `--help` | `-h` | Display help information | |
| `--version` | `-v` | Display version information | |

### Using Config File

You can also create a JSON configuration file to specify options:

```json
{
  "input": "./path/to/database.types.ts",
  "output": "./path/to/output-directory",
  "tsConfig": "./tsconfig.json",
  "supabasePath": "@/lib/supabase"
}
```

Then run with:

```bash
# Using npm/globally installed
supabase-to-hooks --config ./path/to/config.json

# Using npx
npx supabase-to-hooks --config ./path/to/config.json

# Using yarn
yarn supabase-to-hooks --config ./path/to/config.json
```

## Generated Structure

The tool will create a directory structure like this:

```
output-directory/
  ├── index.ts           # Main re-export file
  ├── base-types.ts      # Common types across tables
  ├── enums.ts           # Generated enums
  ├── storage/           # Storage-related hooks and types
  │   ├── index.ts
  │   ├── types.ts
  │   └── hooks.ts
  └── [table_name]/      # For each table in your database
      ├── index.ts
      ├── types.ts       # Table-specific types
      └── hooks.ts       # Table-specific hooks
```

## Example Usage in Your React Application

```tsx
import { useGetUsers, useCreateUser, useUpdateUser, useDeleteUser } from './lib/database/users';

function UsersList() {
  // Get all users
  const { data: users, isLoading } = useGetUsers();
  
  // Get users with filters
  const { data: activeUsers } = useGetUsers({ is_active: true });
  
  // Get a specific user
  const { data: user } = useGetUserById('user-id-123');
  
  // Create a user
  const createUser = useCreateUser();
  
  // Update a user
  const updateUser = useUpdateUser();
  
  // Delete a user
  const deleteUser = useDeleteUser();
  
  const handleCreateUser = () => {
    createUser.mutate({ name: 'John Doe', email: 'john@example.com' });
  };
  
  // ... rest of your component
}
```

## Pre-requisites

This tool works with:

- TypeScript project with a valid tsconfig.json
- Generated Supabase database types (database.types.ts)
- React & React Query for using the generated hooks

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 