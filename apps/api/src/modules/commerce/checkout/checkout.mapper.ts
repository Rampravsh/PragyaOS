import { Order, PaymentAttempt } from "@prisma/client";
import { CheckoutSessionDTO, CheckoutTaxBreakdown, CouponValidationResult } from "./checkout.types";
import { TaxCalculationResult } from "../tax.engine";

/**
 * Serializes a persisted Order + PaymentAttempt into the CheckoutSessionDTO
 * that is returned to the caller. No gateway-specific data is included yet.
 */
export class CheckoutMapper {
  public static toCheckoutSessionDTO(
    order: any, // Prisma Order with items included
    paymentAttempt: PaymentAttempt,
    taxResult: TaxCalculationResult,
    couponCode?: string
  ): CheckoutSessionDTO {
    const taxBreakdown: CheckoutTaxBreakdown = {
      taxableAmount: taxResult.taxableAmount.amount,
      totalTax: taxResult.totalTax.amount,
      rates: taxResult.taxRatesApplied.map((r) => ({
        label: r.label,
        rate: r.rate,
        amount: r.amount.amount,
      })),
    };

    return {
      orderId: order.id,
      orderNumber: order.orderNumber,
      paymentAttemptId: paymentAttempt.id,
      userId: order.userId,
      currency: order.currency,
      subtotalAmount: order.subtotalAmount,
      discountAmount: order.discountAmount,
      taxAmount: order.taxAmount,
      netAmount: order.netAmount,
      couponCode,
      taxBreakdown,
      gateway: paymentAttempt.gateway,
      createdAt: order.createdAt.toISOString(),
    };
  }
}

export default CheckoutMapper;
