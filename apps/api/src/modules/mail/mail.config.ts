import { config } from "../../config";

export const MAIL_CONFIG = {
  smtp: {
    host: config.mail.host,
    port: config.mail.port,
    auth: config.mail.user
      ? {
          user: config.mail.user,
          pass: config.mail.pass,
        }
      : undefined,
    secure: config.mail.secure,
  },
  defaults: {
    from: config.mail.from,
  },
  queueName: "mail-queue",
};
