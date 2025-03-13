# Supabase to Hooks

A CLI tool that automatically generates React Query hooks from your Supabase database.types.ts file.

## Features

- 🚀 Extracts types from your Supabase database.types.ts file
- 🎣 Generates fully typed React Query hooks for each table
- 🔄 Creates CRUD operations (Get, GetById, Create, Update, Delete)
- 🗄️ Includes storage hooks for Supabase Storage
- 📦 Clean module structure for better code organization
- ⚡ Strongly typed with full TypeScript support
- 🔑 Support for tables with custom primary key column names
- ⚙️ Full access to React Query options for all hooks
- 🔗 Dynamic table joins at runtime with proper TypeScript types

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
import { useGetUsers, useCreateUser, useUpdateUser, useDeleteUser, useGetUserByPrimaryKey } from './lib/database/users';

function UsersList() {
  // Get all users
  const { data: users, isLoading } = useGetUsers();
  
  // Get users with filters
  const { data: activeUsers } = useGetUsers({ is_active: true });
  
  // Get a specific user by ID (assuming 'id' is the primary key)
  const { data: user } = useGetUserById('user-id-123');
  
  // Get a user by a custom primary key column
  const { data: userByEmail } = useGetUserByPrimaryKey('email', 'user@example.com');
  
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

### Passing React Query Options

All generated hooks accept React Query options as their last parameter:

```tsx
// Query hooks with options
const { data: users } = useGetUsers(
  { is_active: true }, // Filters
  { 
    staleTime: 60000,  // 1 minute
    refetchOnWindowFocus: false,
    onSuccess: (data) => console.log('Data fetched successfully', data)
  }
);

// Mutation hooks with options
const updateUser = useUpdateUser({
  onSuccess: (data) => {
    console.log('User updated successfully', data);
    showSuccessToast('User updated!');
  },
  onError: (error) => {
    console.error('Failed to update user', error);
    showErrorToast('Update failed');
  }
});
```

### Working with Custom Primary Keys

For tables that don't use 'id' as their primary key column, use the dedicated primary key hooks:

```tsx
// Get by primary key
const { data: product } = useGetProductByPrimaryKey('product_code', 'PROD-123');

// Update by primary key
const updateProductByCode = useUpdateProductByPrimaryKey();
updateProductByCode.mutate({
  primaryKeyColumn: 'product_code',
  value: 'PROD-123',
  data: { name: 'Updated Product', price: 99.99 }
});

// Delete by primary key
const deleteProductByCode = useDeleteProductByPrimaryKey();
deleteProductByCode.mutate({
  primaryKeyColumn: 'product_code',
  value: 'PROD-123'
});
```

### Dynamic Table Joins

You can specify table joins at runtime to fetch related data:

```tsx
// Type for the joined data (optional but provides better type safety)
interface UserWithPosts {
  posts: {
    id: string;
    title: string;
    content: string;
  }[];
}

// Get a user with their posts
const { data: userWithPosts } = useGetUserById<UserWithPosts>(
  'user-123',
  {
    // Select specific fields from the user table and join the posts relation
    select: 'id, name, email, posts(id, title, content)'
  }
);

// Now you can access the joined data with full type safety
if (userWithPosts) {
  console.log(userWithPosts.name); // User's name
  console.log(userWithPosts.posts[0]?.title); // First post's title
}

// Get all users with their posts and comments (nested joins)
const { data: usersWithPostsAndComments } = useGetUsers<{
  posts: {
    id: string;
    title: string;
    comments: {
      id: string;
      text: string;
    }[];
  }[];
}>(
  {}, // No filters
  { 
    select: 'id, name, email, posts(id, title, comments(id, text))'
  }
);
```

The `select` option supports the full Supabase syntax for joins:

- `'*'` - Select all fields from the table
- `'id, name, email'` - Select only specific fields
- `'*, posts(*)'` - Select all fields and join the posts relation with all fields
- `'id, name, posts(id, title)'` - Select specific fields and join with specific related fields
- `'id, posts(id, title, comments(*))'` - Nested joins for related tables

## Pre-requisites

This tool works with:

- TypeScript project with a valid tsconfig.json
- Generated Supabase database types (database.types.ts)
- React & React Query for using the generated hooks

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 