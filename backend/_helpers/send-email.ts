import nodemailer from 'nodemailer';

export default async function sendEmail({ to, subject, html, from }: any) {
  const emailFrom = from || process.env.EMAIL_FROM || 'info@node-mysql-api.com';

  const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: { rejectUnauthorized: false },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000
} as any);

  const info = await transporter.sendMail({ from: emailFrom, to, subject, html });
  console.log('Email sent. Preview URL:', nodemailer.getTestMessageUrl(info as any));
}
