import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Production-ready defaults
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10,    // 10 minutes
      retry: (failureCount, error: any) => {
        // Do not retry on typical client-side errors (400-499)
        if (error?.response?.status && error.response.status < 500) {
          return false;
        }
        return failureCount < 2; // Retry up to 2 times for server or connection errors
      },
      refetchOnWindowFocus: false, // Prevent aggressive auto-refetching on focus
      refetchOnReconnect: true,    // Refetch when reconnecting
      refetchOnMount: true,        // Refetch when component mounts if the data is stale
    },
    mutations: {
      retry: false, // Mutations should not retry automatically by default
    },
  },
});
