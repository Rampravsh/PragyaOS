export interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
}

export interface EmailProvider {
  send(options: SendMailOptions): Promise<void>;
  name: string;
}

export interface SendEmailJobPayload {
  to: string;
  subject: string;
  html: string;
  text?: string;
}
