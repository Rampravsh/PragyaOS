import { QueryClient } from '@tanstack/react-query';

/**
 * Singleton instance of the TanStack Query Client.
 * Configured with sensible defaults for data fetching and caching across PragyaOS.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 5 minutes stale time default
      staleTime: 1000 * 60 * 5,
      // Cache values for 10 minutes default
      gcTime: 1000 * 60 * 10,
      // Avoid refetching on window focus in production unless requested
      refetchOnWindowFocus: process.env.NODE_ENV === 'production',
      // Retry failed requests once by default
      retry: 1,
    },
  },
});

export default queryClient;
