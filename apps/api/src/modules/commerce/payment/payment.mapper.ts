import { PaymentState } from "./payment.constants";

export class PaymentMapper {
  public static toPaymentState(gatewayStatus: string): PaymentState {
    const status = gatewayStatus.toLowerCase();
    if (status === "captured" || status === "success") return "CAPTURED";
    if (status === "authorized") return "AUTHORIZED";
    if (status === "failed") return "FAILED";
    if (status === "refunded") return "REFUNDED";
    return "PENDING";
  }
}
export default PaymentMapper;
