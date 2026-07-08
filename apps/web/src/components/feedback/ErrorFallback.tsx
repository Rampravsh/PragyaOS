
interface ErrorFallbackProps {
  error: Error | null;
  resetErrorBoundary?: () => void;
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 border border-red-500/20 bg-red-950/10 rounded-lg max-w-md mx-auto text-center space-y-4">
      <h2 className="text-xl font-semibold text-red-500">Something went wrong</h2>
      <p className="text-sm text-zinc-400 font-mono break-all">
        {error?.message || 'An unexpected error occurred'}
      </p>
      {resetErrorBoundary && (
        <button
          onClick={resetErrorBoundary}
          className="px-4 py-2 text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
