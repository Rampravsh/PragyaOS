import { Outlet } from 'react-router-dom';
import { PageTransition } from '@/components/layout';

export default function ErrorLayout() {
  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col justify-center items-center p-6">
      <PageTransition className="w-full max-w-lg">
        <Outlet />
      </PageTransition>
    </div>
  );
}
