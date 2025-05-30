import React from 'react';

interface ErrorFallbackProps {
  error: Error | null;
  resetError: () => void;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetError }) => {
  return (
    <div className="p-6 bg-red-50 rounded-lg shadow-lg max-w-2xl mx-auto my-8" role="alert">
      <h2 className="text-2xl font-bold text-red-700 mb-4">Something went wrong!</h2>
      <div className="space-y-4">
        <p className="text-red-600">{error?.message || 'An unexpected error occurred.'}</p>
        {process.env.NODE_ENV === 'development' && error?.stack && (
          <pre className="bg-red-100 p-4 rounded-md text-sm overflow-auto max-h-[400px] text-red-800">{error.stack}</pre>
        )}
      </div>
      <button
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        onClick={resetError}
        type="button"
      >
        Try again
      </button>
    </div>
  );
}; 