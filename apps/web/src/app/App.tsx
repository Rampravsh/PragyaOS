import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes/router';
import { PageLoader } from '@/components/feedback/PageLoader';

export function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
