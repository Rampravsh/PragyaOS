import { useTheme } from '@/providers/ThemeProvider';

/**
 * Main application entry component. Shows basic status of theme and provider resolution.
 */
export function App(): React.JSX.Element {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center font-sans gap-4 transition-colors duration-normal ease-in-out">
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-xl font-bold tracking-wide">PragyaOS</h1>
        <p className="text-sm text-muted-foreground font-medium">Application Foundation Ready</p>
      </div>

      {/* Basic theme switcher button to verify system theme detection and localstorage persistency */}
      <div className="flex gap-2">
        <button
          onClick={() => setTheme('marketing-light')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-sm transition-all duration-fast ${
            theme === 'marketing-light'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'bg-secondary text-secondary-foreground hover:opacity-hover'
          }`}
        >
          Marketing Light
        </button>
        <button
          onClick={() => setTheme('marketing-dark')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-sm transition-all duration-fast ${
            theme === 'marketing-dark'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'bg-secondary text-secondary-foreground hover:opacity-hover'
          }`}
        >
          Marketing Dark
        </button>
        <button
          onClick={() => setTheme('workspace-light')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-sm transition-all duration-fast ${
            theme === 'workspace-light'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'bg-secondary text-secondary-foreground hover:opacity-hover'
          }`}
        >
          Workspace Light
        </button>
        <button
          onClick={() => setTheme('workspace-dark')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-sm transition-all duration-fast ${
            theme === 'workspace-dark'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'bg-secondary text-secondary-foreground hover:opacity-hover'
          }`}
        >
          Workspace Dark
        </button>
      </div>
    </div>
  );
}

export default App;
