# Environment Setup Guide

To run the Research Ustad application, you need to set up environment variables. Here's how to do it:

## Option 1: Create .env.local file

Create a file named `.env.local` in the root directory with the following content:

```env
# API Configuration
NEXT_PUBLIC_BASE_API=http://localhost:5000/api

# App Configuration
NEXT_PUBLIC_APP_NAME=ResearchUstad
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_APP_URL=http://localhost:3000

# API Timeout
NEXT_PUBLIC_API_TIMEOUT=30000

# Authentication
NEXT_PUBLIC_TOKEN_EXPIRY=3600

# Upload Configuration
NEXT_PUBLIC_MAX_UPLOAD_SIZE=5242880
NEXT_PUBLIC_ALLOWED_FILE_TYPES=jpg,jpeg,png,pdf,doc,docx

# Database (for backend connection)
DATABASE_URL=mongodb://localhost:27017/researchustad

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_FROM=noreply@researchustad.com
```

## Option 2: Set environment variables in your system

### Windows (PowerShell):

```powershell
$env:NEXT_PUBLIC_BASE_API="http://localhost:5000/api"
$env:NEXT_PUBLIC_APP_NAME="ResearchUstad"
$env:NEXT_PUBLIC_APP_VERSION="1.0.0"
$env:NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### macOS/Linux:

```bash
export NEXT_PUBLIC_BASE_API="http://localhost:5000/api"
export NEXT_PUBLIC_APP_NAME="ResearchUstad"
export NEXT_PUBLIC_APP_VERSION="1.0.0"
export NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Option 3: Use default values (already configured)

The application is now configured to use default values if environment variables are not set. You can run the application without setting up environment variables, but it's recommended to set them for production use.

## Running the Application

After setting up the environment variables, run:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Member Search Feature

The member search feature is available at `/member-search` and includes sample data for testing:

- **ABDULLAH BIN ZIAD** (NID: 1234567890123, Phone: 01712345678)
- **FATIMA AHMED** (NID: 9876543210987, Phone: 01887654321)
- **MOHAMMAD ALI** (NID: 4567891230456, Phone: 01911223344)
- **AYESHA KHAN** (NID: 7891234560789, Phone: 01655443322)
- **RAHIM UDDIN** (NID: 3210987654321, Phone: 01556677889)

## Troubleshooting

If you encounter any issues:

1. Make sure all environment variables are set correctly
2. Check that the backend API is running (if connecting to backend)
3. Clear the `.next` folder and restart the development server
4. Check the browser console for any error messages

## Production Deployment

For production deployment, make sure to:

1. Set all environment variables in your hosting platform
2. Update the API URLs to point to your production backend
3. Configure proper CORS settings
4. Set up proper security headers
