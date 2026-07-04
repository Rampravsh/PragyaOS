import { Request, Response } from "express";
import { SuccessResponse } from "../../../common/responses/successResponse";
import { webhookDispatcher } from "./payment.webhook";
import { AppError } from "../../../common/errors/appError";
import { checkoutService } from "../checkout/checkout.service";
import { initiateCheckoutSchema } from "../checkout/checkout.schemas";
import { validate } from "../../../common/dto/base.dto";
import { userRepository } from "../../users/user.repository";

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

  /**
   * POST /payments/checkout — Initiate course checkout session.
   */
  public initiateCheckout = async (req: Request, res: Response): Promise<void> => {
    const input = validate(initiateCheckoutSchema, req.body);
    const dbUser = await userRepository.findById(req.user!.id);

    const session = await checkoutService.initiateCheckout(input, {
      id: req.user!.id,
      email: req.user!.email,
      firstName: dbUser?.firstName || null,
      lastName: dbUser?.lastName || null,
    });

    SuccessResponse.created(res, session, "Checkout session initiated successfully.");
  };
}

export const paymentController = new PaymentController();
export default paymentController;
