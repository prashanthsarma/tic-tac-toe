import React from 'react';
import styles from './ErrorFallback.module.css';

interface ErrorFallbackProps {
  error: Error | null;
  resetError: () => void;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetError }) => {
  return (
    <div className={styles.errorContainer} role="alert">
      <h2 className={styles.errorTitle}>Something went wrong!</h2>
      <div className={styles.errorDetails}>
        <p>{error?.message || 'An unexpected error occurred.'}</p>
        {process.env.NODE_ENV === 'development' && error?.stack && (
          <pre className={styles.errorStack}>{error.stack}</pre>
        )}
      </div>
      <button
        className={styles.resetButton}
        onClick={resetError}
        type="button"
      >
        Try again
      </button>
    </div>
  );
}; 