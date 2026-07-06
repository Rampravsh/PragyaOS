import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/index.css';
import ErrorBoundary from '@/app/ErrorBoundary';
import AppProviders from '@/app/AppProviders';
import AppRouter from '@/app/AppRouter';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error(
    '[PragyaOS] Root element #root not found.\n' +
    'Ensure index.html contains <div id="root"></div>.'
  );
}

// Global Application Composition Layer
createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </ErrorBoundary>
  </StrictMode>
);
