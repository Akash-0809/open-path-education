# Authentication System Documentation

## Overview

This project uses **Supabase** for authentication and user management. The authentication system is built on TanStack Start server functions and includes comprehensive backend support.

## Architecture

### Frontend

- **Components**: Reusable React components for sign-in, sign-up, and account management
- **Hooks**: Custom `useAuth()` hook for managing authentication state
- **Routes**: TanStack Router routes for auth-related pages

### Backend

- **Server Functions**: TanStack Start server functions for secure authentication operations
- **Database Utilities**: Helper functions for user profile management
- **Validation**: Input validation and sanitization utilities
- **Middleware**: Authentication middleware for protected routes (via Supabase policies)

## File Structure

```
src/
├── components/
│   ├── sign-in.tsx          # Sign-in form component
│   ├── sign-up.tsx          # Sign-up form component
│   └── account.tsx          # Account settings & profile management
├── routes/
│   ├── sign-in.tsx          # /sign-in route
│   ├── sign-up.tsx          # /sign-up route
│   └── account.tsx          # /account route
├── hooks/
│   ├── use-auth.tsx         # Authentication state hook
│   └── use-mobile.tsx       # Mobile detection hook
├── lib/
│   ├── auth.functions.ts    # Server-side auth functions
│   ├── validation.ts        # Input validation utilities
│   ├── db.users.ts          # Database utilities for users
│   ├── tutor.functions.ts   # AI tutor server functions
│   └── utils.ts             # General utilities
└── integrations/
    └── supabase/
        ├── client.ts        # Supabase client
        ├── client.server.ts # Server-side Supabase client
        ├── auth-middleware.ts # Auth middleware
        └── types.ts         # TypeScript types
```

## Features

### Authentication Pages

#### 1. **Sign In** (`/sign-in`)

- Email and password authentication
- Error handling and validation
- Loading states
- Redirect to home on success
- Link to sign-up page

#### 2. **Sign Up** (`/sign-up`)

- Create new account with email, password, and full name
- Email verification
- Success confirmation with redirect
- Link to sign-in page

#### 3. **Account Settings** (`/account`)

- View and edit profile information
- Update full name, phone, and avatar URL
- Logout functionality
- Session-based access control

## Server Functions

### Authentication Functions

#### `signInUser(email, password)`

Sign in a user with email and password.

```typescript
const response = await signInUser({ email, password });
// Returns: { success: true, user, session }
```

#### `signUpUser(email, password, full_name?)`

Create a new user account.

```typescript
const response = await signUpUser({ email, password, full_name });
// Returns: { success: true, user, message }
```

#### `signOutUser()`

Sign out the current user.

```typescript
const response = await signOutUser();
// Returns: { success: true, message }
```

#### `getCurrentUser()`

Get the current authenticated user.

```typescript
const response = await getCurrentUser();
// Returns: { success: true, user } or { success: false, user: null }
```

#### `getCurrentSession()`

Get the current session details.

```typescript
const response = await getCurrentSession();
// Returns: { success: true, session, user }
```

#### `resetPassword(email)`

Send a password reset email.

```typescript
const response = await resetPassword({ email });
// Returns: { success: true, message }
```

#### `updateUserProfile(updates)`

Update user profile information.

```typescript
const response = await updateUserProfile({
  full_name: "New Name",
  phone: "+1234567890",
  avatar_url: "https://example.com/avatar.jpg",
});
// Returns: { success: true, user }
```

## Hooks

### `useAuth()`

Custom hook for managing authentication state.

```typescript
const {
  user,                 // Current user object
  session,             // Current session
  loading,             // Loading state
  error,               // Error object
  isAuthenticated,     // Boolean flag
  signIn,              // Function
  signUp,              // Function
  signOut,             // Function
} = useAuth();

// Usage
const { user, isAuthenticated, signIn } = useAuth();

if (isAuthenticated) {
  return <div>Welcome {user?.email}</div>;
}
```

## Utilities

### Validation Functions (`src/lib/validation.ts`)

- `validateEmail(email)` - Validate email format
- `validatePasswordStrength(password)` - Check password requirements
- `validatePhoneNumber(phone)` - Validate phone format
- `validateUrl(url)` - Validate URL format
- `sanitizeInput(input)` - Sanitize user input for XSS prevention
- `validateRequiredFields(data, fields)` - Check required fields

### Database Functions (`src/lib/db.users.ts`)

- `getUserProfile(userId)` - Get user profile by ID
- `createUserProfile(userId, profile)` - Create new user profile
- `updateUserProfile(userId, updates)` - Update user profile
- `deleteUserProfile(userId)` - Delete user profile
- `userExists(email)` - Check if user exists
- `getUserByEmail(email)` - Get user by email
- `getAllUsers(limit, offset)` - Get all users (paginated)
- `searchUsers(query, limit)` - Search users by name or email

## Usage Examples

### Basic Sign In Flow

```typescript
import { useRouter } from "@tanstack/react-router";
import { signInUser } from "@/lib/auth.functions";

function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await signInUser({ email, password });
      if (response.success) {
        router.navigate({ to: "/" });
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {/* Form fields */}
    </form>
  );
}
```

### Using Auth Hook in Component

```typescript
import { useAuth } from "@/hooks/use-auth";

function Dashboard() {
  const { user, isAuthenticated, signOut, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <div>Please sign in</div>;
  }

  return (
    <div>
      <h1>Welcome, {user?.email}</h1>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

## Environment Variables

Required environment variables in `.env`:

```
SUPABASE_URL=your_supabase_url
SUPABASE_PUBLISHABLE_KEY=your_publishable_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
```

## Security Considerations

1. **Server Functions**: All sensitive operations use TanStack Start server functions to keep secrets secure
2. **Validation**: Input validation and sanitization on both client and server
3. **Authentication**: Supabase handles password hashing and token management
4. **Session Management**: Automatic session refresh and persistence
5. **CORS**: Configure CORS settings in Supabase project settings
6. **Row Level Security (RLS)**: Set up RLS policies in Supabase for database access control

## Error Handling

The authentication system includes comprehensive error handling:

- Email/password validation errors
- Authentication failures
- Session expiration
- Network errors
- User not found errors

All errors are displayed to the user with helpful messages.

## Testing

To test the authentication system:

1. **Sign Up**: Create a new account at `/sign-up`
2. **Sign In**: Log in with the created credentials at `/sign-in`
3. **Account Settings**: View and edit profile at `/account`
4. **Sign Out**: Logout from account settings page

## Deployment

### Cloudflare Workers (via Wrangler)

The project is configured for Cloudflare Workers deployment. Deploy with:

```bash
npm run build
wrangler deploy
```

### Environment Setup

1. Configure Supabase project
2. Set environment variables in Wrangler/deployment platform
3. Configure CORS in Supabase settings
4. Set up email templates in Supabase if using password reset

## Next Steps

1. **Email Verification**: Add email confirmation workflow
2. **Social Auth**: Integrate OAuth providers (Google, GitHub, etc.)
3. **MFA**: Add multi-factor authentication
4. **Profile Images**: Implement avatar upload to Supabase storage
5. **User Roles**: Add role-based access control (RBAC)
6. **Admin Dashboard**: Create admin panel for user management
