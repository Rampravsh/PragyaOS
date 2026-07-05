import { typography } from "../tokens/typography";

export const editorialTypography = {
  h1: {
    fontFamily: typography.fontFamilies.serif,
    fontSize: typography.fontSizes["5xl"],
    fontWeight: typography.fontWeights.light,
    lineHeight: typography.lineHeights.tight,
    letterSpacing: typography.letterSpacing.tight,
  },
  h2: {
    fontFamily: typography.fontFamilies.serif,
    fontSize: typography.fontSizes["4xl"],
    fontWeight: typography.fontWeights.light,
    lineHeight: typography.lineHeights.tight,
    letterSpacing: typography.letterSpacing.normal,
  },
  bodyLead: {
    fontFamily: typography.fontFamilies.sans,
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.normal,
    lineHeight: typography.lineHeights.relaxed,
    letterSpacing: typography.letterSpacing.wide,
  }
};
