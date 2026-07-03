import { EventEmitter } from "events";
import { USER_CONSTANTS } from "./user.constants";
import { UserEventPayload } from "./user.types";
import { logger } from "../../lib/logger";

class UserEventBus extends EventEmitter {
  constructor() {
    super();
    this.registerDiagnostics();
  }

  /**
   * Publishes a domain event onto the bus.
   */
  public publish(event: string, payload: UserEventPayload): void {
    logger.info(`📢 [User Event] Publishing "${event}" for userId: ${payload.userId}`);
    this.emit(event, payload);
  }

  /**
   * Logs basic diagnostic information for dispatched events in development.
   */
  private registerDiagnostics(): void {
    Object.values(USER_CONSTANTS.EVENTS).forEach((event) => {
      this.on(event, (payload: UserEventPayload) => {
        logger.debug(`🔔 [Event Bus Debug] Event "${event}" caught at ${payload.occurredAt.toISOString()} for ID: ${payload.userId}`);
      });
    });
  }
}

export const userEventBus = new UserEventBus();
export default userEventBus;
