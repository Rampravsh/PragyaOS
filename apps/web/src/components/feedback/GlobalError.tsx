
interface GlobalErrorProps {
  error: Error | null;
}

export function GlobalError({ error }: GlobalErrorProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-white p-6">
      <div className="text-center max-w-md space-y-4">
        <h1 className="text-3xl font-bold text-red-500">Application Error</h1>
        <p className="text-zinc-400">
          A critical error occurred and PragyaOS could not recover.
        </p>
        {error && (
          <pre className="text-xs text-left p-4 bg-zinc-900 border border-zinc-800 rounded overflow-x-auto text-red-400 font-mono">
            {error.stack || error.message}
          </pre>
        )}
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-zinc-800 hover:bg-zinc-750 border border-zinc-700 text-sm font-medium rounded transition-colors"
        >
          Reload Application
        </button>
      </div>
    </div>
  );
}
