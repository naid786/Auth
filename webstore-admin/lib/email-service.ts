import nodemailer from 'nodemailer';

// Type definitions
type EmailOptions = {
  to: string;
  subject: string;
  text: string;
  html?: string;
};

type EmailTemplate = (user: UserData) => EmailOptions;

type UserData = {
  name: string;
  email: string;
  [key: string]: any; // Additional user properties
};

// Create reusable transporter object
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE, // e.g., 'gmail', 'sendgrid', etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

/**
 * Send email
 * @param options - Email options
 * @returns Promise indicating success
 */
export const sendTwoFactorEmail = async (email: string, token: string) => {
  try {

    const mailOptions = {
      from: `"WebStore" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "2FA Code",
      html: `<p>Your 2FA coe: ${token}`
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to', email);
    return true;
  } catch (error) {
    console.error('Error sending email to', email, error);
    throw error; // Or return false if you prefer to handle errors silently
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  try {

    const resetLink = `http://localhost:3000/auth/new-password?token=${token}`
    const mailOptions = {
      from: `"WebStore" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset your password",
      html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to', email);
    return true;
  } catch (error) {
    console.error('Error sending email to', email, error);
    throw error; // Or return false if you prefer to handle errors silently
  }
};

export const sendVerificationEmail = async (email: string, token: string) => {
  try {

    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`
    const mailOptions = {
      from: `"WebStore" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Confirm your email",
      html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to', email);
    return true;
  } catch (error) {
    console.error('Error sending email to', email, error);
    throw error; // Or return false if you prefer to handle errors silently
  }
};

// Email templates with TypeScript
export const emailTemplates = {
  welcome: (user: UserData): EmailOptions => ({
    to: user.email,
    subject: `Welcome to Our App, ${user.name}!`,
    text: `Hi ${user.name},\n\nWelcome to our app! We're excited to have you on board.\n\nYour registered email is: ${user.email}`,
    html: `
      <div>
        <h1>Welcome, ${user.name}!</h1>
        <p>We're excited to have you on board.</p>
        <p>Your registered email is: ${user.email}</p>
      </div>
    `,
  }),
  resetPassword: (user: UserData, resetLink: string): EmailOptions => ({
    to: user.email,
    subject: 'Password Reset Request',
    text: `Hi ${user.name},\n\nPlease click the following link to reset your password:\n\n${resetLink}\n\nIf you didn't request this, please ignore this email.`,
    html: `
      <div>
        <h1>Password Reset</h1>
        <p>Hi ${user.name},</p>
        <p>Please click the button below to reset your password:</p>
        <a href="${resetLink}" style="background-color: #0070f3; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Reset Password
        </a>
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    `,
  }),
  // Add more templates as needed
};