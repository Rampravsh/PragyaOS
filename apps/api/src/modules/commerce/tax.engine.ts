import { Money } from "./money";

export interface TaxRateApplied {
  label: string; // e.g. "CGST", "SGST", "VAT"
  rate: number;  // multiplier, e.g. 0.09
  amount: Money; // computed tax value
}

export interface TaxCalculationResult {
  taxableAmount: Money;
  totalTax: Money;
  taxRatesApplied: TaxRateApplied[];
}

export interface TaxEngine {
  calculateTax(amount: Money, billingRegion: string): Promise<TaxCalculationResult>;
}
