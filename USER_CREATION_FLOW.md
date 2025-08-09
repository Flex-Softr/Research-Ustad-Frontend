# User Creation and Authentication Flow

## Overview
This document explains the complete user creation and authentication flow implemented in the ResearchUstad application.

## Features Implemented

### 1. Admin/SuperAdmin User Creation
- Only admins and superAdmins can create new users
- Form includes: fullName, email, password, role, designation, and optional contactNo
- Proper validation on both frontend and backend
- Email notification sent to newly created users with login credentials

### 2. User Authentication
- Newly created users can login with their email and password
- JWT-based authentication system
- Role-based access control

### 3. Frontend Changes

#### CreateMemberForm.tsx Updates:
- ✅ Fixed role options to match backend enum: `["user", "admin", "superAdmin"]`
- ✅ Fixed designation options to match backend enum: `["Advisor", "Lead", "Mentor_Panel", "Lead_Research_Associate", "Research_Associate"]`
- ✅ Added optional contact number field
- ✅ Proper form validation and error handling
- ✅ Updated payload to include role and contactNo

#### Type Updates:
- ✅ Updated FormData interface to include contactNo
- ✅ All types properly aligned with backend requirements

### 4. Backend Changes

#### User Model Updates:
- ✅ Made image field optional with default placeholder
- ✅ Role enum: `["admin", "user", "superAdmin"]`
- ✅ Designation enum: `["Advisor", "Lead", "Mentor_Panel", "Lead_Research_Associate", "Research_Associate", "superAdmin"]`

#### API Endpoint Updates:
- ✅ Added authentication middleware to `/create-ResearchMembars` endpoint
- ✅ Updated validation schema to include role field
- ✅ Enhanced user creation service to handle role assignment

#### ResearchMembar Interface Updates:
- ✅ Added role field to IResearchMembar interface
- ✅ Made contactNo optional
- ✅ Updated validation schemas

### 5. Team Members JSON
- ✅ Added designation property below role for all team members
- ✅ Updated metadata with new version and timestamp

## API Endpoints

### Create User (Admin/SuperAdmin only)
```
POST /api/users/create-ResearchMembars
Authorization: Bearer <admin_or_superadmin_token>

Body:
{
  "fullName": "John Doe",
  "email": "john@example.com", 
  "password": "SecurePass123",
  "role": "user",
  "designation": "Research_Associate",
  "contactNo": "+1234567890" // optional
}
```

### User Login
```
POST /api/auth/login

Body:
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

## User Roles & Designations

### Roles:
- `user`: Regular user with basic access
- `admin`: Administrative privileges
- `superAdmin`: Full system access

### Designations:
- `Advisor`: Senior advisory role
- `Lead`: Leadership position
- `Mentor_Panel`: Mentoring responsibilities
- `Lead_Research_Associate`: Senior research position
- `Research_Associate`: Standard research position

## Email Notifications
When a new user is created, they receive an email containing:
- Welcome message
- Login credentials (email and password)
- Link to the platform
- Recommendation to change password after first login

## Security Features
- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Role-based route protection
- ✅ Input validation and sanitization
- ✅ Secure cookie handling for refresh tokens

## Complete Flow Example

1. **Admin creates user:**
   - Admin logs into the system
   - Navigates to Member Management
   - Fills out the create member form
   - Submits form with user details

2. **System processes request:**
   - Validates admin permissions
   - Validates form data
   - Creates user account
   - Creates research member profile
   - Sends welcome email

3. **New user receives email:**
   - Gets login credentials
   - Clicks link to platform

4. **User logs in:**
   - Uses email and password from email
   - System authenticates and issues JWT token
   - User gains access based on assigned role

## Testing the Flow

To test the complete user creation and login flow:

1. Login as admin/superAdmin
2. Navigate to `/admin/dashboard/create-member`
3. Fill out the form with valid data
4. Submit and verify success message
5. Check that welcome email is sent
6. Logout from admin account
7. Login with newly created user credentials
8. Verify user can access appropriate pages based on role

## Error Handling

The system handles various error scenarios:
- Invalid email formats
- Duplicate email addresses
- Weak passwords
- Invalid role/designation combinations
- Network failures
- Authentication failures

All errors are properly displayed to users with meaningful messages.
