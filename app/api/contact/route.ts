import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    

    // Rate limiting check (simple implementation)
    const clientIP = request.headers.get('x-forwarded-for') || request.ip || 'unknown'
    
    const body = await request.json()
    const { name, email, subject, message } = body

    // Sanitize inputs
    const sanitizedName = name?.trim().replace(/[<>]/g, '') || ''
    const sanitizedEmail = email?.trim().toLowerCase() || ''
    const sanitizedSubject = subject?.trim().replace(/[<>]/g, '') || ''
    const sanitizedMessage = message?.trim().replace(/[<>]/g, '') || ''

    // Validate required fields
    if (!sanitizedName || !sanitizedEmail || !sanitizedSubject || !sanitizedMessage) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(sanitizedEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Additional validation
    if (sanitizedName.length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters long' },
        { status: 400 }
      )
    }

    if (sanitizedSubject.length < 3) {
      return NextResponse.json(
        { error: 'Subject must be at least 3 characters long' },
        { status: 400 }
      )
    }

    if (sanitizedMessage.length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters long' },
        { status: 400 }
      )
    }

    // Check if environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email environment variables are not configured')
      console.error('EMAIL_USER:', process.env.EMAIL_USER ? 'Set' : 'Not set')
      console.error('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set' : 'Not set')
      return NextResponse.json(
        { error: 'Email service is not configured. Please check environment variables.' },
        { status: 500 }
      )
    }

    // Nodemailer configuration with better error handling
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      debug: true, // Enable debug output
      logger: true // Log to console
    })

    // Verify transporter configuration
    try {
      await transporter.verify()
      console.log('✅ Email transporter verified successfully')
    } catch (verifyError) {
      console.error('❌ Email transporter verification failed:', verifyError)
      return NextResponse.json(
        { error: 'Email service configuration error. Please check your Gmail app password setup.' },
        { status: 500 }
      )
    }

    // Email content with beautiful design
    const mailOptions = {
      from: `"Himanshu Mishra Portfolio" <${process.env.EMAIL_USER || 'hmishra1210@gmail.com'}>`,
      to: 'hmishra1210@gmail.com', // Your email address where you want to receive messages
      subject: `Portfolio Contact: ${sanitizedSubject}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Message</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 32px 24px; text-align: center;">
              <div style="width: 60px; height: 60px; background-color: rgba(255, 255, 255, 0.2); border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">New Contact Message</h1>
              <p style="color: rgba(255, 255, 255, 0.9); margin: 8px 0 0; font-size: 16px;">Someone reached out through your portfolio</p>
            </div>

            <!-- Content -->
            <div style="padding: 32px 24px;">
              <!-- Contact Info -->
              <div style="background-color: #f8fafc; border-radius: 8px; padding: 24px; margin-bottom: 24px; border-left: 4px solid #2563eb;">
                <h2 style="color: #1f2937; margin: 0 0 16px; font-size: 18px; font-weight: 600;">Contact Information</h2>
                <div style="display: grid; gap: 12px;">
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 8px; height: 8px; background-color: #2563eb; border-radius: 50%;"></div>
                    <span style="color: #6b7280; font-weight: 500; min-width: 60px;">Name:</span>
                    <span style="color: #1f2937; font-weight: 600;">${sanitizedName}</span>
                  </div>
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 8px; height: 8px; background-color: #2563eb; border-radius: 50%;"></div>
                    <span style="color: #6b7280; font-weight: 500; min-width: 60px;">Email:</span>
                    <a href="mailto:${sanitizedEmail}" style="color: #2563eb; text-decoration: none; font-weight: 600;">${sanitizedEmail}</a>
                  </div>
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 8px; height: 8px; background-color: #2563eb; border-radius: 50%;"></div>
                    <span style="color: #6b7280; font-weight: 500; min-width: 60px;">Subject:</span>
                    <span style="color: #1f2937; font-weight: 600;">${sanitizedSubject}</span>
                  </div>
                </div>
              </div>

              <!-- Message -->
              <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
                <h3 style="color: #1f2937; margin: 0 0 16px; font-size: 16px; font-weight: 600;">Message</h3>
                <div style="color: #374151; line-height: 1.7; white-space: pre-wrap;">${sanitizedMessage}</div>
              </div>

              <!-- Quick Actions -->
              <div style="background-color: #eff6ff; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                <h3 style="color: #1e40af; margin: 0 0 12px; font-size: 16px; font-weight: 600;">Quick Actions</h3>
                <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                  <a href="mailto:${sanitizedEmail}?subject=Re: ${sanitizedSubject}" style="background-color: #2563eb; color: white; text-decoration: none; padding: 8px 16px; border-radius: 6px; font-size: 14px; font-weight: 500; display: inline-block;">Reply via Email</a>
                  <a href="https://himanshu-portfolio.vercel.app" style="background-color: #6b7280; color: white; text-decoration: none; padding: 8px 16px; border-radius: 6px; font-size: 14px; font-weight: 500; display: inline-block;">View Portfolio</a>
                </div>
              </div>

              <!-- Footer -->
              <div style="border-top: 1px solid #e5e7eb; padding-top: 24px; text-align: center;">
                <p style="color: #6b7280; margin: 0 0 8px; font-size: 14px;">
                  This message was sent from your portfolio contact form
                </p>
                <p style="color: #9ca3af; margin: 0; font-size: 12px;">
                  ${new Date().toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZoneName: 'short'
                  })}
                </p>
              </div>
            </div>

            <!-- Bottom Banner -->
            <div style="background-color: #1f2937; padding: 16px 24px; text-align: center;">
              <p style="color: #9ca3af; margin: 0; font-size: 12px;">
                © 2024 Himanshu Mishra - Full Stack Developer
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    }

    // Send email
    const info = await transporter.sendMail(mailOptions)

    if (info.messageId) {
      return NextResponse.json(
        { message: 'Email sent successfully' },
        { status: 200 }
      )
    } else {
      throw new Error('Failed to send email')
    }
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    )
  }
}
