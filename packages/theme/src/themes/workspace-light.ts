import { colors } from "../tokens/colors";
import { typography } from "../tokens/typography";

export const workspaceLight = {
  name: "workspace-light",
  colors: {
    background: colors.zinc[50], // Pure layout gray background
    foreground: colors.zinc[900],
    primary: colors.zinc[900],
    primaryForeground: colors.zinc[50],
    secondary: colors.zinc[200],
    secondaryForeground: colors.zinc[800],
    muted: colors.zinc[100],
    mutedForeground: colors.zinc[500],
    border: colors.zinc[200],
    input: colors.zinc[200],
    ring: colors.zinc[900],
  },
  typography: {
    fontFamilyHeading: typography.fontFamilies.sans, // Sans UI heading for workspace
    fontFamilyBody: typography.fontFamilies.sans,
  }
};
