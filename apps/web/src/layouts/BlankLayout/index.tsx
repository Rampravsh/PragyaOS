import { Outlet } from 'react-router-dom';
import { PageTransition } from '@/components/layout';

export default function BlankLayout() {
  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <PageTransition className="w-full">
        <Outlet />
      </PageTransition>
    </div>
  );
}
