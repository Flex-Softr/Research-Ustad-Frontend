// API Error Handling Utility

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: any;
}

export class ApiErrorHandler {
  static handleError(error: any, operation: string): ApiError {
    console.error(`Error in ${operation}:`, error);

    // Handle different types of errors
    if (error instanceof Error) {
      return {
        message: error.message || `Failed to ${operation}`,
        status: (error as any).status,
      };
    }

    if (typeof error === 'string') {
      return {
        message: error,
      };
    }

    if (error?.response) {
      // Axios-like error response
      return {
        message: error.response.data?.message || `Request failed with status ${error.response.status}`,
        status: error.response.status,
        details: error.response.data,
      };
    }

    // Default error
    return {
      message: `An unexpected error occurred during ${operation}`,
    };
  }

  static async handleApiResponse(response: Response, operation: string): Promise<any> {
    if (!response.ok) {
      let errorMessage = `Request failed with status: ${response.status}`;
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // If we can't parse the error response, use the default message
      }

      const error = new Error(errorMessage);
      (error as any).status = response.status;
      throw error;
    }

    try {
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to parse response from ${operation}`);
    }
  }

  static createError(message: string, status?: number): ApiError {
    return {
      message,
      status,
    };
  }
}

// Helper functions for common error scenarios
export const handleNetworkError = (error: any, operation: string) => {
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    return ApiErrorHandler.createError(
      `Network error: Unable to connect to server during ${operation}`,
      0
    );
  }
  return ApiErrorHandler.handleError(error, operation);
};

export const handleAuthError = (error: any) => {
  if (error?.status === 401) {
    return ApiErrorHandler.createError(
      'Authentication required. Please log in again.',
      401
    );
  }
  return ApiErrorHandler.handleError(error, 'authentication');
};

export const handleValidationError = (error: any) => {
  if (error?.status === 400) {
    return ApiErrorHandler.createError(
      'Invalid data provided. Please check your input.',
      400
    );
  }
  return ApiErrorHandler.handleError(error, 'validation');
};
