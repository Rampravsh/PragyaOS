export interface ThemeConfig {
  name: string;
  colors: Record<string, string>;
  typography: Record<string, string>;
}

export const createTheme = (
  name: string,
  overrides: Partial<ThemeConfig>
): ThemeConfig => {
  return {
    name,
    colors: {
      background: "#ffffff",
      foreground: "#000000",
      primary: "#000000",
      primaryForeground: "#ffffff",
      secondary: "#f4f4f5",
      secondaryForeground: "#18181b",
      muted: "#f4f4f5",
      mutedForeground: "#71717a",
      border: "#e4e4e7",
      input: "#e4e4e7",
      ring: "#09090b",
      ...overrides.colors,
    },
    typography: {
      fontFamilyHeading: "sans-serif",
      fontFamilyBody: "sans-serif",
      ...overrides.typography,
    }
  };
};
