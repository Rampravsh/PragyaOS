export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

/**
 * Helper to wrap core message body inside a premium master container.
 */
function getMasterLayout(title: string, bodyContentHtml: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: 'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #f8fafc;
            color: #1e293b;
            -webkit-font-smoothing: antialiased;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
            border: 1px solid #e2e8f0;
          }
          .header {
            background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
            padding: 40px;
            text-align: center;
          }
          .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 28px;
            font-weight: 700;
            letter-spacing: -0.5px;
          }
          .content {
            padding: 40px;
            line-height: 1.6;
          }
          .content h2 {
            margin-top: 0;
            font-size: 20px;
            color: #0f172a;
          }
          .button-container {
            text-align: center;
            margin: 32px 0;
          }
          .button {
            display: inline-block;
            background-color: #4f46e5;
            color: #ffffff !important;
            padding: 14px 30px;
            font-size: 16px;
            font-weight: 600;
            text-decoration: none;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
            transition: all 0.2s ease;
          }
          .footer {
            background-color: #f8fafc;
            padding: 30px 40px;
            border-top: 1px solid #f1f5f9;
            text-align: center;
            font-size: 13px;
            color: #64748b;
          }
          .footer a {
            color: #4f46e5;
            text-decoration: none;
          }
          .divider {
            height: 1px;
            background-color: #e2e8f0;
            margin: 24px 0;
          }
          .security-note {
            font-size: 12px;
            color: #94a3b8;
            background-color: #f8fafc;
            padding: 12px;
            border-radius: 6px;
            border-left: 3px solid #cbd5e1;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>PragyaOS</h1>
          </div>
          <div class="content">
            ${bodyContentHtml}
          </div>
          <div class="footer">
            <p>Sent with ❤️ from PragyaOS Office</p>
            <p>&copy; ${new Date().getFullYear()} PragyaOS. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Builds email verification template.
 */
export function getEmailVerificationTemplate(verificationToken: string): EmailTemplate {
  const link = `https://pragyaos.com/verify-email?token=${verificationToken}`;
  const subject = "Verify your email address - PragyaOS";

  const html = getMasterLayout(
    subject,
    `
    <h2>Verify Your Account</h2>
    <p>Welcome to PragyaOS, the operating system for modern learning. To activate your account and start your learning journey, please confirm your email address by clicking the button below:</p>
    <div class="button-container">
      <a href="${link}" class="button" target="_blank">Verify Email Address</a>
    </div>
    <div class="security-note">
      <strong>Security Notice:</strong> If you did not create a PragyaOS account, you can safely ignore this email. This link will expire in 24 hours.
    </div>
    <div class="divider"></div>
    <p style="font-size: 14px; color: #64748b;">If the button above does not work, copy and paste the following link into your browser:</p>
    <p style="font-size: 12px; word-break: break-all;"><a href="${link}">${link}</a></p>
    `
  );

  const text = `Welcome to PragyaOS! Verify your email address by visiting this link: ${link}`;

  return { subject, html, text };
}

/**
 * Builds password reset template.
 */
export function getPasswordResetTemplate(resetToken: string): EmailTemplate {
  const link = `https://pragyaos.com/reset-password?token=${resetToken}`;
  const subject = "Reset your password - PragyaOS";

  const html = getMasterLayout(
    subject,
    `
    <h2>Reset Your Password</h2>
    <p>We received a request to reset the password for your PragyaOS account. Click the button below to choose a new password:</p>
    <div class="button-container">
      <a href="${link}" class="button" target="_blank">Reset Password</a>
    </div>
    <div class="security-note">
      <strong>Security Notice:</strong> If you did not request a password reset, please ignore this email or contact support if you suspect unauthorized access. This link will expire in 15 minutes.
    </div>
    <div class="divider"></div>
    <p style="font-size: 14px; color: #64748b;">If the button above does not work, copy and paste the following link into your browser:</p>
    <p style="font-size: 12px; word-break: break-all;"><a href="${link}">${link}</a></p>
    `
  );

  const text = `Reset your PragyaOS password by visiting this link: ${link}`;

  return { subject, html, text };
}
