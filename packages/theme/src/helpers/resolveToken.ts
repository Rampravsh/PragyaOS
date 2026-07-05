export const resolveToken = (
  tokens: Record<string, any>,
  path: string,
  fallback?: string
): string => {
  const parts = path.split(".");
  let current: any = tokens;

  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = current[part];
    } else {
      return fallback || "";
    }
  }

  return typeof current === "string" || typeof current === "number"
    ? String(current)
    : fallback || "";
};
