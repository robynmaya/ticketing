import React from 'react';

export default function ErrorState({ message, onRetry }: { message?: string; onRetry?: () => void }) {
  return (
    <div>
      <p>Error: {message || 'Something went wrong.'}</p>
      {onRetry && (
        <button onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}
