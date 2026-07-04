export class Currency {
  private static readonly SUPPORTED_CODES = new Set(["INR", "USD", "EUR", "GBP"]);
  
  private static readonly PRECISIONS: Record<string, number> = {
    INR: 2,
    USD: 2,
    EUR: 2,
    GBP: 2,
  };

  private static readonly SYMBOLS: Record<string, string> = {
    INR: "₹",
    USD: "$",
    EUR: "€",
    GBP: "£",
  };

  constructor(public readonly code: string) {
    const uppercaseCode = code.toUpperCase();
    if (!Currency.SUPPORTED_CODES.has(uppercaseCode)) {
      throw new Error(`Unsupported currency code: ${code}`);
    }
    this.code = uppercaseCode;
  }

  public get precision(): number {
    return Currency.PRECISIONS[this.code] ?? 2;
  }

  public get symbol(): string {
    return Currency.SYMBOLS[this.code] ?? this.code;
  }

  public equals(other: Currency): boolean {
    return this.code === other.code;
  }
}
