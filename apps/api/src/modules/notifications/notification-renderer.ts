import { NotificationTemplate } from "@prisma/client";
import { logger } from "../../lib/logger";
import { RenderedNotification } from "./notifications.types";

/**
 * Renders notification templates using Mustache-style {{variable}} replacement.
 * Validates that all declared template variables are present in the context.
 */
export class NotificationRenderer {
  /**
   * Renders a template against a variables context.
   * Logs a warning for missing required variables but does not throw.
   */
  public render(template: NotificationTemplate, variables: Record<string, string>): RenderedNotification {
    const declared = this.getDeclaredVariables(template);
    this.validateVariables(template.slug, declared, variables);

    const title = this.interpolate(template.titleTemplate, variables);
    const body = this.interpolate(template.bodyTemplate, variables);

    return { title, body };
  }

  /**
   * Extracts declared variable names from the template's variables JSON array.
   */
  private getDeclaredVariables(template: NotificationTemplate): string[] {
    try {
      const vars = template.variables;
      if (Array.isArray(vars)) return vars as string[];
    } catch {
      // ignore malformed JSON
    }
    return [];
  }

  /**
   * Warns when required template variables are missing from the dispatch context.
   */
  private validateVariables(
    slug: string,
    declared: string[],
    provided: Record<string, string>
  ): void {
    const missing = declared.filter((v) => !(v in provided));
    if (missing.length > 0) {
      logger.warn(
        `[NotificationRenderer] Template '${slug}' missing variables: [${missing.join(", ")}]. Placeholders will remain unreplaced.`
      );
    }
  }

  /**
   * Replaces {{variable}} placeholders in a template string.
   */
  private interpolate(template: string, variables: Record<string, string>): string {
    return template.replace(/\{\{(\w+)\}\}/g, (_, key) => variables[key] ?? `{{${key}}}`);
  }
}

export const notificationRenderer = new NotificationRenderer();
export default notificationRenderer;
