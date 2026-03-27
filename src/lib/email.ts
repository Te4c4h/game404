import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
  const confirmUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || "noreply@game404.am",
      to: email,
      subject: "Verify your Game404 account",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #00FF87;">Welcome to Game404!</h1>
          <p>Please verify your email address by clicking the button below:</p>
          <a href="${confirmUrl}" 
             style="display: inline-block; background: #00FF87; color: #0A0A0A; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 16px 0;">
            Verify Email
          </a>
          <p>Or copy and paste this link:</p>
          <p style="word-break: break-all; color: #666;">${confirmUrl}</p>
          <p style="color: #999; font-size: 12px;">This link expires in 24 hours.</p>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to send verification email:", error);
    return { success: false, error };
  }
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || "noreply@game404.am",
      to: email,
      subject: "Reset your Game404 password",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #00FF87;">Password Reset Request</h1>
          <p>Click the button below to reset your password:</p>
          <a href="${resetUrl}" 
             style="display: inline-block; background: #00FF87; color: #0A0A0A; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 16px 0;">
            Reset Password
          </a>
          <p>Or copy and paste this link:</p>
          <p style="word-break: break-all; color: #666;">${resetUrl}</p>
          <p style="color: #999; font-size: 12px;">This link expires in 1 hour.</p>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to send password reset email:", error);
    return { success: false, error };
  }
}
