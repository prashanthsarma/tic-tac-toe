import { useState, useCallback } from 'react';

interface ErrorState {
  hasError: boolean;
  message: string;
}

export const useErrorHandler = () => {
  const [error, setError] = useState<ErrorState>({ hasError: false, message: '' });

  const handleError = useCallback((error: unknown) => {
    if (error instanceof Error) {
      setError({ hasError: true, message: error.message });
    } else if (typeof error === 'string') {
      setError({ hasError: true, message: error });
    } else {
      setError({ hasError: true, message: 'An unexpected error occurred' });
    }
  }, []);

  const clearError = useCallback(() => {
    setError({ hasError: false, message: '' });
  }, []);

  return {
    error,
    handleError,
    clearError,
  };
}; 