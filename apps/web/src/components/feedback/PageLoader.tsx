import { Spinner } from './Spinner';

export function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950">
      <div className="flex flex-col items-center gap-4">
        <Spinner size="lg" />
        <p className="text-sm font-medium text-zinc-400">Loading PragyaOS...</p>
      </div>
    </div>
  );
}
