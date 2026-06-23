// utils/mailer.js — Nodemailer (Gmail). Lazy init so the server starts without EMAIL set.
import nodemailer from "nodemailer";

let transporter = null;

export function isMailConfigured() {
  return Boolean(String(process.env.EMAIL || "").trim() && String(process.env.EMAIL_PASS || "").trim());
}

function getTransporter() {
  if (!isMailConfigured()) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: String(process.env.EMAIL).trim(),
        pass: String(process.env.EMAIL_PASS).trim(),
      },
    });
  }
  return transporter;
}

export async function sendEmail(to, subject, text, html) {
  const tx = getTransporter();
  if (!tx) {
    throw new Error("Email is not configured (set EMAIL and EMAIL_PASS in server .env)");
  }
  await tx.sendMail({
    from: `"CarBazaar" <${process.env.EMAIL}>`,
    to,
    subject,
    text,
    ...(html ? { html } : {}),
  });
}
