export type ThemeVariant =
  | 'marketing-light'
  | 'marketing-dark'
  | 'workspace-light'
  | 'workspace-dark';

export interface ThemeContextProps {
  theme: ThemeVariant;
  setTheme: (theme: ThemeVariant) => void;
  systemPreference: 'light' | 'dark';
}
