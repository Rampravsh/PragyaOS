import { colors } from "../tokens/colors";
import { typography } from "../tokens/typography";

export const marketingDark = {
  name: "marketing-dark",
  colors: {
    background: colors.paper.dark, // Deep editorial dark charcoal
    foreground: colors.stone[100],
    primary: colors.stone[100],
    primaryForeground: colors.paper.dark,
    secondary: colors.stone[800],
    secondaryForeground: colors.stone[200],
    muted: "#1e1b1a",
    mutedForeground: colors.stone[400],
    border: colors.stone[800],
    input: colors.stone[800],
    ring: colors.stone[300],
  },
  typography: {
    fontFamilyHeading: typography.fontFamilies.serif,
    fontFamilyBody: typography.fontFamilies.sans,
  }
};
