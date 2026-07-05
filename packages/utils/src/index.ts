// ─── cn ───────────────────────────────────────────────────────────────────────
// Merges class names, filtering falsy values.
// Equivalent to clsx() without an external dependency.
//
// Usage: cn("base-class", isActive && "active", className)
export type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  return inputs
    .flat(Infinity as 20)
    .filter(Boolean)
    .join(" ");
}

// ─── formatCurrency ───────────────────────────────────────────────────────────
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(amount);
};
