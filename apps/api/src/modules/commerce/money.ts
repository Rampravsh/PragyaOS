import { Currency } from "./currency";

export class Money {
  constructor(
    public readonly amount: number, // integer in minor unit (cents/paise)
    public readonly currency: Currency
  ) {
    if (!Number.isInteger(amount)) {
      throw new Error("Money amount must be an integer (minor currency units).");
    }
  }

  public static zero(currencyCode: string): Money {
    return new Money(0, new Currency(currencyCode));
  }

  public add(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(this.amount + other.amount, this.currency);
  }

  public subtract(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(this.amount - other.amount, this.currency);
  }

  public multiply(factor: number): Money {
    return new Money(Math.round(this.amount * factor), this.currency);
  }

  public equals(other: Money): boolean {
    return this.amount === other.amount && this.currency.equals(other.currency);
  }

  public greaterThan(other: Money): boolean {
    this.assertSameCurrency(other);
    return this.amount > other.amount;
  }

  public lessThan(other: Money): boolean {
    this.assertSameCurrency(other);
    return this.amount < other.amount;
  }

  public format(): string {
    const unitAmount = this.amount / Math.pow(10, this.currency.precision);
    return `${this.currency.symbol}${unitAmount.toFixed(this.currency.precision)}`;
  }

  private assertSameCurrency(other: Money): void {
    if (!this.currency.equals(other.currency)) {
      throw new Error(
        `Currency mismatch: cannot perform operation between ${this.currency.code} and ${other.currency.code}`
      );
    }
  }
}
