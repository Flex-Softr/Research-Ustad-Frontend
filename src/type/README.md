# Type Organization System

This directory contains all TypeScript types organized by domain for better maintainability and reusability.

## 📁 File Structure

```
src/type/
├── index.ts          # Main export file (centralized imports)
├── user.ts           # User-related types
├── blog.ts           # Blog-related types
├── event.ts          # Event-related types
├── course.ts         # Course-related types
├── research.ts       # Research-related types
├── common.ts         # Shared/common types
└── README.md         # This documentation
```

## 🎯 Organization Principles

### 1. **Domain-Based Separation**
Each file contains types related to a specific domain:
- `user.ts` - User profiles, authentication, JWT
- `blog.ts` - Blog posts, categories, forms
- `event.ts` - Events, speakers, filters
- `course.ts` - Courses, curriculum, instructors
- `research.ts` - Research papers, publications
- `common.ts` - Shared types used across domains

### 2. **Centralized Exports**
All types are exported through `index.ts` for easy importing:
```typescript
import { Blog, UserProfile, Event } from "@/type";
```

### 3. **Backward Compatibility**
Legacy types are maintained in `index.ts` to prevent breaking changes.

## 📋 Type Categories

### User Types (`user.ts`)
- `TUser` - Basic user information
- `UserProfile` - Extended user profile
- `TResearchAssociate` - Research associate profile
- `Education` - Educational background
- `SocialLinks` - Social media links
- `JWTPayload` - JWT token payload

### Blog Types (`blog.ts`)
- `Blog` - Blog post structure
- `BlogPostForm` - Blog creation form
- `BlogSubmissionData` - Blog submission data
- `BlogCategory` - Blog category structure
- `IPost` / `TPost` - Legacy blog types

### Event Types (`event.ts`)
- `Event` - Event structure
- `EventSpeaker` - Speaker information
- `Speaker` - Speaker details
- `PaginatedEventsResponse` - Paginated events response
- `EventsFilter` - Event filtering options
- `EventData` - Event data for components

### Course Types (`course.ts`)
- `Course` - Course structure
- `CoursesFilter` - Course filtering options
- `PaginatedCoursesResponse` - Paginated courses response
- `CourseFormData` - Course form data
- `ValidationError` - Form validation errors

### Research Types (`research.ts`)
- `ResearchPaper` - Research paper structure
- `TPapers` - Extended research paper
- `ResearchPaperForm` - Research paper form

### Common Types (`common.ts`)
- `ValidationResult` - Form validation results
- `BreadcrumbItem` - Navigation breadcrumbs
- `TeamMember` - Team member (extends UserProfile)
- `PaginationParams` - Pagination parameters
- `PaginationResponse<T>` - Generic pagination response
- `BaseFilter` - Base filtering options
- `ApiResponse<T>` - Generic API response
- `ApiError` - API error structure
- `FormField` - Form field configuration

## 🚀 Usage Examples

### Importing Types
```typescript
// Import specific types
import { Blog, UserProfile, Event } from "@/type";

// Import multiple types from same domain
import { Blog, BlogPostForm, BlogCategory } from "@/type";

// Import common types
import { ValidationResult, PaginationResponse } from "@/type";
```

### Using Types in Components
```typescript
import { Blog } from "@/type";

interface BlogCardProps {
  blog: Blog;
  onEdit: (blog: Blog) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, onEdit }) => {
  // Component implementation
};
```

### Using Types in Services
```typescript
import { Event, PaginatedEventsResponse } from "@/type";

export const fetchEvents = async (): Promise<PaginatedEventsResponse> => {
  // Service implementation
};
```

### Using Types in Forms
```typescript
import { BlogPostForm, ValidationResult } from "@/type";

const validateBlogForm = (data: BlogPostForm): ValidationResult => {
  // Validation logic
};
```

## 🔄 Migration Guide

### Before (Scattered Types)
```typescript
// Types defined in multiple files
interface Blog { ... } // in blogsSlice.ts
interface UserProfile { ... } // in some component
interface Event { ... } // in eventSlice.ts
```

### After (Organized Types)
```typescript
// All types imported from centralized location
import { Blog, UserProfile, Event } from "@/type";
```

### Migration Steps
1. **Update Imports**: Replace local type definitions with imports from `@/type`
2. **Remove Duplicates**: Delete duplicate type definitions
3. **Update References**: Update all references to use the new imports
4. **Test**: Ensure all components work correctly with new imports

## 📝 Adding New Types

### 1. **Choose the Right File**
- User-related → `user.ts`
- Blog-related → `blog.ts`
- Event-related → `event.ts`
- Course-related → `course.ts`
- Research-related → `research.ts`
- Shared/common → `common.ts`

### 2. **Add the Type**
```typescript
// In the appropriate file (e.g., blog.ts)
export interface NewBlogType {
  id: string;
  title: string;
  // ... other properties
}
```

### 3. **Export from Index**
The type is automatically exported through the barrel export in `index.ts`:
```typescript
// index.ts already exports all from blog.ts
export * from './blog';
```

### 4. **Use the Type**
```typescript
import { NewBlogType } from "@/type";
```

## 🎨 Best Practices

### 1. **Naming Conventions**
- Use descriptive names: `BlogPostForm` not `Form`
- Use consistent prefixes: `T` for types, `I` for interfaces
- Use PascalCase for type names

### 2. **Type Organization**
- Group related types together
- Keep interfaces and types in the same file if related
- Use comments to separate different type groups

### 3. **Import Strategy**
- Always import from `@/type` for consistency
- Use specific imports when possible
- Avoid importing from individual files directly

### 4. **Documentation**
- Add JSDoc comments for complex types
- Explain the purpose of each type
- Provide usage examples for complex types

## 🔧 Maintenance

### Regular Tasks
1. **Review Duplicates**: Check for duplicate type definitions
2. **Update Imports**: Ensure all files use centralized imports
3. **Add New Types**: Follow the organization pattern
4. **Remove Legacy**: Gradually remove legacy types from `index.ts`

### Type Updates
1. **Add New Properties**: Add to existing types
2. **Breaking Changes**: Update all usages
3. **Deprecation**: Mark deprecated types with `@deprecated`

## 🚨 Common Issues

### Circular Dependencies
```typescript
// ❌ Avoid this
// user.ts imports from blog.ts
// blog.ts imports from user.ts

// ✅ Use common.ts for shared types
// Both import from common.ts
```

### Type Conflicts
```typescript
// ❌ Avoid naming conflicts
interface User { ... } // in user.ts
interface User { ... } // in another file

// ✅ Use descriptive names
interface UserProfile { ... } // in user.ts
interface BlogUser { ... } // in blog.ts
```

### Import Errors
```typescript
// ❌ Wrong import path
import { Blog } from "@/type/blog";

// ✅ Correct import path
import { Blog } from "@/type";
```

## 📊 Benefits

### 1. **Maintainability**
- Single source of truth for types
- Easy to find and update types
- Consistent type definitions

### 2. **Reusability**
- Types can be used across components
- No duplicate type definitions
- Shared type patterns

### 3. **Developer Experience**
- Better IntelliSense support
- Easier refactoring
- Clear type organization

### 4. **Code Quality**
- Type safety across the application
- Consistent data structures
- Reduced type errors

## 🔗 Related Files

- `src/services/` - Service layer using these types
- `src/components/` - Components using these types
- `src/store/` - Redux store using these types
- `src/hooks/` - Custom hooks using these types 