interface Config {
  api: {
    baseUrl: string;
    timeout: number;
  };
  app: {
    name: string;
    version: string;
    environment: string;
    url: string;
  };
  auth: {
    tokenKey: string;
    refreshTokenKey: string;
    tokenExpiry: number;
  };
  database: {
    url: string;
  };
  email: {
    service: string;
    from: string;
  };
  upload: {
    allowedTypes: string[];
  };
}

// Validate required environment variables (optional now)
const requiredEnvVars = {
  NEXT_PUBLIC_BASE_API: process.env.NEXT_PUBLIC_BASE_API,
};

// Check for missing environment variables (only warn, don't throw)
const missingEnvVars = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

if (missingEnvVars.length > 0) {
  console.warn(
    `Missing environment variables (using defaults): ${missingEnvVars.join(
      ", "
    )}`
  );
}

export const config: Config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_BASE_API || "http://localhost:5000/api/v1",
    timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || "30000"),
  },
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || "ResearchUstad",
    version: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
    environment: process.env.NODE_ENV || "development",
    url: process.env.NEXT_PUBLIC_APP_URL,
  },
  auth: {
    tokenKey: "accessToken",
    refreshTokenKey: "refreshToken",
    tokenExpiry: parseInt(process.env.NEXT_PUBLIC_TOKEN_EXPIRY || "3600"),
  },
  database: {
    url: process.env.DATABASE_URL || "",
  },
  email: {
    service: process.env.EMAIL_SERVICE || "gmail",
    from: process.env.EMAIL_FROM || "noreply@researchustad.com",
  },
  upload: {
    allowedTypes: (
      process.env.NEXT_PUBLIC_ALLOWED_FILE_TYPES || "jpg,jpeg,png,pdf,doc,docx"
    ).split(","),
  },
};

// Export individual config sections for convenience
export const { api, app, auth, database, email, upload } = config;

// Helper functions
export const isDevelopment = () => config.app.environment === "development";
export const isProduction = () => config.app.environment === "production";
export const isTest = () => config.app.environment === "test";

// API helper functions
export const getApiUrl = (endpoint: string) =>
  `${config.api.baseUrl}${endpoint}`;
export const getAuthHeaders = (token: string) => ({
  Authorization: token,
  "Content-Type": "application/json",
});

// Default export
export default config;
