import { colors } from "../tokens/colors";
import { typography } from "../tokens/typography";

export const marketingLight = {
  name: "marketing-light",
  colors: {
    background: colors.paper.cream, // Cream warm editorial feel
    foreground: colors.stone[900],
    primary: colors.stone[900],
    primaryForeground: colors.paper.cream,
    secondary: colors.stone[200],
    secondaryForeground: colors.stone[800],
    muted: "#efece6",
    mutedForeground: colors.stone[500],
    border: colors.stone[300],
    input: colors.stone[300],
    ring: colors.stone[900],
  },
  typography: {
    fontFamilyHeading: typography.fontFamilies.serif, // Lora editorial serif
    fontFamilyBody: typography.fontFamilies.sans,
  }
};
