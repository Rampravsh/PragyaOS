import { colors } from "./colors";

export const semanticColors = {
  light: {
    background: colors.paper.light,
    foreground: colors.zinc[900],
    
    primary: colors.zinc[900],
    primaryForeground: colors.zinc[50],
    
    secondary: colors.zinc[100],
    secondaryForeground: colors.zinc[800],
    
    muted: colors.zinc[100],
    mutedForeground: colors.zinc[500],
    
    accent: colors.violet[500],
    accentForeground: colors.violet[50],
    
    destructive: colors.rose[600],
    destructiveForeground: colors.rose[50],
    
    border: colors.zinc[200],
    input: colors.zinc[200],
    ring: colors.zinc[400],
    
    success: colors.emerald[600],
    successForeground: colors.emerald[50],
    
    warning: colors.amber[600],
    warningForeground: colors.amber[50],
    
    info: colors.blue[600],
    infoForeground: colors.blue[50],
    
    card: colors.paper.light,
    cardForeground: colors.zinc[900],
    
    popover: colors.paper.light,
    popoverForeground: colors.zinc[900],
  },
  dark: {
    background: colors.paper.dark,
    foreground: colors.zinc[50],
    
    primary: colors.zinc[50],
    primaryForeground: colors.zinc[900],
    
    secondary: colors.zinc[800],
    secondaryForeground: colors.zinc[100],
    
    muted: colors.zinc[800],
    mutedForeground: colors.zinc[400],
    
    accent: colors.violet[400],
    accentForeground: colors.violet[950],
    
    destructive: colors.rose[500],
    destructiveForeground: colors.rose[950],
    
    border: colors.zinc[800],
    input: colors.zinc[800],
    ring: colors.zinc[700],
    
    success: colors.emerald[500],
    successForeground: colors.emerald[950],
    
    warning: colors.amber[500],
    warningForeground: colors.amber[950],
    
    info: colors.blue[500],
    infoForeground: colors.blue[950],
    
    card: colors.paper.dark,
    cardForeground: colors.zinc[50],
    
    popover: colors.paper.dark,
    popoverForeground: colors.zinc[50],
  }
};
