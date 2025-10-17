import nodemailer from 'nodemailer';

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendEnquiryNotification(enquiry: any) {
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) {
    throw new Error('Admin email not configured');
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: adminEmail,
    subject: `New Project Enquiry from ${enquiry.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #2563eb; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">Portfolio Admin</h1>
          <p style="margin: 5px 0 0 0; opacity: 0.9;">New Project Enquiry</p>
        </div>

        <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #2563eb; margin-top: 0;">Client Details</h2>
          <p><strong>Name:</strong> ${enquiry.name}</p>
          <p><strong>Email:</strong> ${enquiry.email}</p>
          <p><strong>Subject:</strong> ${enquiry.subject}</p>

          ${enquiry.projectType ? `<p><strong>Project Type:</strong> ${enquiry.projectType.replace('-', ' ').toUpperCase()}</p>` : ''}
          ${enquiry.budget ? `<p><strong>Budget:</strong> ${enquiry.budget.replace('-', ' ').toUpperCase()}</p>` : ''}
          ${enquiry.timeline ? `<p><strong>Timeline:</strong> ${enquiry.timeline.replace('-', ' ').toUpperCase()}</p>` : ''}

          <h3 style="color: #2563eb; margin-top: 30px;">Message</h3>
          <div style="background-color: #f8f8f8; padding: 15px; border-radius: 8px; margin: 20px 0;">
            ${enquiry.message.replace(/\n/g, '<br>')}
          </div>

          <div style="margin-top: 30px; text-align: center;">
            <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/admin"
               style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              View in Admin Panel
            </a>
          </div>
        </div>

        <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
          <p>This email was sent from your portfolio contact form.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Enquiry notification email sent successfully');
  } catch (error) {
    console.error('Error sending enquiry notification email:', error);
    throw error;
  }
}

export async function sendEnquiryReply(enquiry: any, replyMessage: string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: enquiry.email,
    subject: `Re: ${enquiry.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #2563eb; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">Himanshu Mishra</h1>
          <p style="margin: 5px 0 0 0; opacity: 0.9;">Full Stack Developer</p>
        </div>

        <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #2563eb; margin-top: 0;">Thank you for your enquiry!</h2>
          <p>Dear ${enquiry.name},</p>

          <div style="background-color: #f8f8f8; padding: 15px; border-radius: 8px; margin: 20px 0;">
            ${replyMessage.replace(/\n/g, '<br>')}
          </div>

          <p>Best regards,<br>
          Himanshu Mishra<br>
          Full Stack Developer</p>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
            <p style="margin: 0; font-size: 14px; color: #666;">
              <a href="https://himanshu-portfolio.vercel.app" style="color: #2563eb; text-decoration: none;">Visit my portfolio</a> |
              <a href="mailto:hmishra1210@gmail.com" style="color: #2563eb; text-decoration: none;">Contact me</a>
            </p>
          </div>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Enquiry reply email sent successfully');
  } catch (error) {
    console.error('Error sending enquiry reply email:', error);
    throw error;
  }
}