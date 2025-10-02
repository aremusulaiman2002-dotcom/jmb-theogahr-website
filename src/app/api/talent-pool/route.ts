import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, phone, position, experience, skills, message } = await request.json();

    const { data, error } = await resend.emails.send({
      from: 'JMB Talent Pool <onboarding@resend.dev>',
      to: ['aremusulaiman2002@gmail.com'], // Replace with your email
      subject: `New Talent Pool Registration: ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #b45309; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #fefce8; padding: 20px; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #0f172a; }
              .value { color: #475569; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>New Talent Pool Registration</h1>
                <p>JMB The Oga HR</p>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Name:</div>
                  <div class="value">${name}</div>
                </div>
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value">${email}</div>
                </div>
                <div class="field">
                  <div class="label">Phone:</div>
                  <div class="value">${phone}</div>
                </div>
                <div class="field">
                  <div class="label">Desired Position:</div>
                  <div class="value">${position || 'Not specified'}</div>
                </div>
                <div class="field">
                  <div class="label">Experience Level:</div>
                  <div class="value">${experience || 'Not specified'}</div>
                </div>
                <div class="field">
                  <div class="label">Key Skills:</div>
                  <div class="value">${skills || 'Not specified'}</div>
                </div>
                <div class="field">
                  <div class="label">Additional Message:</div>
                  <div class="value">${message || 'No additional message'}</div>
                </div>
                <div class="field">
                  <div class="label">Registered:</div>
                  <div class="value">${new Date().toLocaleString()}</div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}