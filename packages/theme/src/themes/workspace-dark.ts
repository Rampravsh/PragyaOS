import { colors } from "../tokens/colors";
import { typography } from "../tokens/typography";

export const workspaceDark = {
  name: "workspace-dark",
  colors: {
    background: colors.zinc[950], // Deep productivity background black
    foreground: colors.zinc[50],
    primary: colors.zinc[50],
    primaryForeground: colors.zinc[950],
    secondary: colors.zinc[800],
    secondaryForeground: colors.zinc[200],
    muted: colors.zinc[900],
    mutedForeground: colors.zinc[400],
    border: colors.zinc[800],
    input: colors.zinc[800],
    ring: colors.zinc[300],
  },
  typography: {
    fontFamilyHeading: typography.fontFamilies.sans,
    fontFamilyBody: typography.fontFamilies.sans,
  }
};
