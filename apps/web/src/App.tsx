import { App } from './app/App';
import { AppProviders } from './app/providers';
import './styles/globals.css';

export default function RootApp() {
  return (
    <AppProviders>
      <App />
    </AppProviders>
  );
}
