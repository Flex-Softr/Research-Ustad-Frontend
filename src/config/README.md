# Configuration System

This directory contains the centralized configuration system for the ResearchUstad application.

## Usage

### Import the entire config

```typescript
import config from "@/config";

// Access any configuration
const apiUrl = config.api.baseUrl;
const appName = config.app.name;
```

### Import specific sections

```typescript
import { api, app, auth } from "@/config";

// Use specific sections
const baseUrl = api.baseUrl;
const environment = app.environment;
const tokenKey = auth.tokenKey;
```

### Use helper functions

```typescript
import { getApiUrl, getAuthHeaders, isDevelopment } from "@/config";

// Build API URLs
const userEndpoint = getApiUrl("/users/me");

// Get auth headers
const headers = getAuthHeaders(token);

// Check environment
if (isDevelopment()) {
  console.log("Running in development mode");
}
```

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Required
NEXT_PUBLIC_BASE_API=http://localhost:5000/api

# Optional (with defaults)
NEXT_PUBLIC_API_TIMEOUT=30000
NEXT_PUBLIC_APP_NAME=ResearchUstad
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_TOKEN_EXPIRY=3600
# NEXT_PUBLIC_MAX_UPLOAD_SIZE=5242880 (removed - no file size limits)
NEXT_PUBLIC_ALLOWED_FILE_TYPES=jpg,jpeg,png,pdf,doc,docx
```

## Benefits

1. **Type Safety**: All config values are properly typed
2. **Centralized**: All environment variables in one place
3. **Validation**: Missing required variables throw errors at startup
4. **Helper Functions**: Common operations like building API URLs
5. **Environment Detection**: Easy environment-specific logic
6. **Maintainability**: Easy to update and extend

## Migration from process.env

Replace direct `process.env` usage:

```typescript
// Before
const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/me`);

// After
import { api } from "@/config";
const response = await fetch(`${api.baseUrl}/users/me`);
```
