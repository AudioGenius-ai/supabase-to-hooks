# Supabase to Hooks

A CLI tool that automatically generates React Query hooks from your Supabase database.types.ts file.

## Features

- 🚀 Extracts types from your Supabase database.types.ts file
- 🎣 Generates fully typed React Query hooks for each table
- 📞 Generates hooks for database RPC functions (excluding private `_` functions)
- 🔄 Creates CRUD operations (Get, GetById, Create, Update, Delete) for tables
- 🔗 Generates relationship types and enables joined queries based on foreign keys using a simple `with` option
- 🗄️ Includes storage hooks for Supabase Storage
- 📦 Clean module structure for better code organization
- ⚡ Strongly typed with full TypeScript support
- 🔑 Support for tables with custom primary key column names
- ⚙️ Full access to React Query options for all hooks

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
  ├── functions/         # RPC function hooks and types
  │   ├── index.ts       # Re-exports all function modules
  │   └── [function_name]/ # For each public RPC function
  │       ├── index.ts
  │       ├── types.ts   # Function-specific Args and Returns types
  │       └── hooks.ts   # Function-specific hooks (useQuery, useMutation, direct call)
  ├── storage/           # Storage-related hooks and types
  │   ├── index.ts
  │   ├── types.ts
  │   └── hooks.ts
  └── [table_name]/      # For each table in your database
      ├── index.ts
      ├── types.ts       # Table-specific types (Row, Insert, Update, FilterParams)
      ├── hooks.ts       # Table-specific hooks (useQuery, useMutation, direct calls)
      └── relations.ts   # Table-specific relationship types (if foreign keys exist)
```

## Example Usage in Your React Application

### Using Table Hooks

```tsx
import {
  useUsers, // Renamed from useGetUsers for consistency
  useUsersList, // Renamed from useGetUsersList
  useUser, // Renamed from useGetUserById
  useUserCreate, // Renamed from useCreateUser
  useUserUpdate, // Renamed from useUpdateUser
  useUserDelete, // Renamed from useDeleteUser
  // Direct functions (no React Query)
  getUser, 
  getUsersList, 
  createUser, 
  updateUser, 
  deleteUser
} from './lib/database/users';

function UsersComponent() {
  // Get a single user by ID (primary key assumed to be 'id')
  const { data: user, isLoading: userLoading } = useUser('user-id-123');
  
  // Get a list of users with filters
  const { data: activeUsers, isLoading: listLoading } = useUsersList({ is_active: true });
  
  // Create a user mutation
  const createUserMutation = useUserCreate();
  
  // Update a user mutation
  const updateUserMutation = useUserUpdate();
  
  // Delete a user mutation
  const deleteUserMutation = useUserDelete();
  
  const handleCreate = () => {
    createUserMutation.mutate(
      { name: 'John Doe', email: 'john@example.com' },
      { onSuccess: (newUser) => console.log('Created:', newUser) }
    );
  };

  const handleUpdate = (userId: string) => {
    updateUserMutation.mutate(
      { id: userId, data: { name: 'John Doe Updated' } },
      { onSuccess: (updatedUser) => console.log('Updated:', updatedUser) }
    );
  };

  const handleDelete = (userId: string) => {
    deleteUserMutation.mutate(userId, {
      onSuccess: () => console.log('Deleted user:', userId),
    });
  };
  
  // Example using direct functions (outside React components or for specific needs)
  async function fetchAdminUserDirectly(adminId: string) {
    try {
      const admin = await getUser(adminId);
      console.log('Admin fetched directly:', admin);
    } catch (error) {
      console.error('Direct fetch failed:', error);
    }
  }

  // ... rest of your component
}
```

### Using RPC Function Hooks

Assuming you have an RPC function named `get_user_profile`:

```tsx
import {
  useGetUserProfile, // useQuery hook
  useGetUserProfileMutation, // useMutation hook (if applicable, depends on function)
  getUserProfile // Direct async function call
} from './lib/database/functions/get_user_profile';

function UserProfile({ userId }: { userId: string }) {
  // Fetch user profile using the RPC query hook
  const { data: profile, isLoading, error } = useGetUserProfile({ user_id_arg: userId });

  if (isLoading) return <div>Loading profile...</div>;
  if (error) return <div>Error loading profile: {error.message}</div>;

  // Example using the direct function call
  const refreshProfile = async () => {
    try {
      const latestProfile = await getUserProfile({ user_id_arg: userId });
      console.log('Refreshed profile:', latestProfile);
      // Manually update state or trigger refetch if needed
    } catch (err) {
      console.error('Failed to refresh profile:', err);
    }
  };

  return (
    <div>
      <h2>{profile?.username}</h2>
      <p>{profile?.bio}</p>
      <button onClick={refreshProfile}>Refresh Profile</button>
    </div>
  );
}
```

Note: The mutation hook (`useGetUserProfileMutation`) is generated for all functions but might be less common for functions intended only for data retrieval (`useQuery`).

### Passing React Query Options

All generated hooks accept standard React Query options as their last parameter:

```tsx
// Query hooks with options
const { data: users } = useUsersList(
  { is_active: true }, // Filters
  { 
    staleTime: 60000,  // 1 minute
    refetchOnWindowFocus: false,
    onSuccess: (data) => console.log('Data fetched successfully', data)
  }
);

// Mutation hooks with options
const updateUser = useUserUpdate({
  onSuccess: (data) => {
    console.log('User updated successfully', data);
    // queryClient.invalidateQueries(...)
  },
  onError: (error) => {
    console.error('Failed to update user', error);
  }
});
```

### Working with Relationships (Joins)

If your tables have foreign key relationships defined in `database.types.ts`, the tool generates relationship types (`relations.ts`) and allows you to easily fetch related data using the `with` option in table query hooks (`useTable`, `useTableList`, `getTable`, `getTableList`).

```tsx
import { usePost, usePostsList } from './lib/database/posts';
// Assuming posts table has relationships defined in relations.ts like:
// export interface Relationships {
//   author?: UserRow | null; // one-to-one or many-to-one
//   comments?: CommentRow[]; // one-to-many
// }

function PostDetails({ postId }: { postId: string }) {
  // Fetch a single post and include its author and comments
  const { data: post, isLoading } = usePost(postId, {
    select: ['id', 'title', 'content'], // Select specific fields from the post table
    with: {
      author: true, // Join the author relationship
      comments: true // Join the comments relationship
    }
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{post?.title}</h1>
      <p>By: {post?.author?.name || 'Unknown'}</p> {/* Access related author data */}
      <p>{post?.content}</p>
      <h3>Comments:</h3>
      <ul>
        {post?.comments?.map(comment => ( /* Access related comments data */
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    </div>
  );
}

function PostsFeed() {
  // Fetch multiple posts, including the author for each
  const { data: posts, isLoading } = usePostsList(
    { limit: 10, order: { column: 'created_at', direction: 'desc' } }, // Filters/params
    {
      select: ['id', 'title'], // Only get id and title from posts
      with: { author: true } // Join author for each post
    }
  );

  // ... render posts with author names ...
}
```

The `with` option takes an object where keys correspond to the relationship names defined in the generated `relations.ts` file for that table. Set the value to `true` to include that relationship in the query. The underlying Supabase `select()` string is automatically constructed for you.

TypeScript will correctly infer the types of the joined data based on the `relations.ts` definitions, providing full type safety when accessing related fields (e.g., `post.author.name`, `post.comments[0].text`).

### Working with Custom Primary Keys

For tables that don't use `id` as their primary key column, specialized hooks were previously generated. With the simplified hook structure, you use the standard hooks but filtering requires using the primary key column name explicitly in the filter object if fetching by that key.

```tsx
// Assuming 'products' table uses 'product_code' as primary key
import { useProduct, useProductList, useProductUpdate, useProductDelete } from './lib/database/products';

// Fetch by primary key - use the list hook with a filter
const { data: product } = useProductList({ product_code: 'PROD-123' }, { enabled: !!productCode });
// Note: useProductList returns an array, you might need to get the first element.
// Or, use the single hook IF your primary key column is named 'id'.

// Update by primary key
const updateProductMutation = useProductUpdate();
updateProductMutation.mutate({
  id: 'PROD-123', // IMPORTANT: The ID here MUST match the value of the primary key column
  data: { name: 'Updated Product', price: 99.99 }
  // Note: The mutation hook implicitly uses 'id' for the .eq() condition.
  // If your primary key is NOT 'id', direct supabase calls or custom hooks might be needed for updates/deletes.
});

// Delete by primary key
const deleteProductMutation = useProductDelete();
deleteProductMutation.mutate('PROD-123'); // Assumes the value is the primary key
// Similar caveat as update applies if the primary key column isn't 'id'.
```

**Important:** The standard `useUpdate` and `useDelete` hooks generated currently assume the primary key column is named `id` for the `eq()` filter. If your primary key has a different name, you might need to use direct Supabase client calls (`supabase.from(...).update(...).eq('your_pk_column', value)`) or create custom hooks for update/delete operations until this tool explicitly supports custom PKs for mutations.

## Pre-requisites

This tool works with:

- TypeScript project with a valid tsconfig.json
- Generated Supabase database types (database.types.ts)
- React & React Query for using the generated hooks

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 