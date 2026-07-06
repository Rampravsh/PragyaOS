import { useEffect } from 'react';
import AdminComposition from '@/compositions/workspace/AdminComposition';

/**
 * Admin Page entry controller.
 * Orchestrates: mounts AdminComposition and sets document title.
 */
export function AdminPage(): React.JSX.Element {
  useEffect(() => {
    document.title = 'Admin Panel | PragyaOS';
  }, []);

  return <AdminComposition />;
}

export default AdminPage;
