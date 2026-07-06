import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Robust React 19 ErrorBoundary catching rendering exceptions and displaying a minimal fallback UI.
 */
export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Console log the error details under development or telemetry tracking
    console.error('[PragyaOS App Boundary Error]:', error, errorInfo);
  }

  public override render(): ReactNode {
    if (this.state.hasError) {
      // Minimal, unstyled fallback UI as per specification instructions
      return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
          <h2>Something went wrong.</h2>
          <p>{this.state.error?.message || 'An unexpected rendering error occurred.'}</p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            style={{
              padding: '0.5rem 1rem',
              cursor: 'pointer',
            }}
          >
            Reload Application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
