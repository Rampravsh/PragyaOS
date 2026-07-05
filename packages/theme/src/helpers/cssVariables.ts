export const generateCSSVariables = (
  themeColors: Record<string, string>,
  prefix = "--"
): string => {
  let css = "";
  for (const [key, value] of Object.entries(themeColors)) {
    // Convert camelCase or nested keys to kebab-case
    const kebabKey = key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
    css += `${prefix}${kebabKey}: ${value};\n`;
  }
  return css;
};
