import { Request, Response } from "express";
import { SuccessResponse } from "../../../common/responses/successResponse";
import { webhookDispatcher } from "./payment.webhook";
import { AppError } from "../../../common/errors/appError";

export class PaymentController {
  /**
   * Captures Razorpay webhook signatures and body variables and delegates processing.
   */
  public handleWebhook = async (req: Request, res: Response): Promise<void> => {
    const signature = req.headers["x-razorpay-signature"] as string;
    if (!signature) {
      throw AppError.badRequest("Missing x-razorpay-signature header.");
    }

    const rawBody = (req as any).rawBody;
    if (!rawBody) {
      throw AppError.badRequest("Missing raw request body payload.");
    }

    await webhookDispatcher.dispatch(rawBody, signature, req.body);

    SuccessResponse.send(res, { received: true }, "Webhook callback processed successfully.");
  };
}

export const paymentController = new PaymentController();
export default paymentController;
