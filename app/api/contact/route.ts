import { NextResponse, NextRequest } from 'next/server';
import nodemailer, { SendMailOptions } from 'nodemailer';

export async function POST(request: NextRequest) {
  const username = process.env.EMAIL_USER;
  const recipientEmail = process.env.RECIPIENT_EMAIL;

  const formData = await request.formData();
  const name = formData.get('name');
  const emailValue = formData.get('email');
  const emailString = typeof emailValue === 'string' ? emailValue : undefined;
  const message = formData.get('message');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.APP_PASS
    }
  });

  try {
    const mailOptions: SendMailOptions = {
      from: username,
      to: recipientEmail,
      replyTo: emailString,
      subject: `Better Monday Contact Form Submission`,
      html: `
        <p>Name: ${name} </p>
        <p>Email: ${emailString} </p>
        <p>Message: ${message} </p>
      `,
    };
  
    if (emailString) {
      mailOptions.replyTo = emailString;
    }

    mailOptions.subject = `Better Monday Contact Form Submission`;
    mailOptions.html = `
      <p>Name: ${name} </p>
      <p>Email: ${emailString} </p>
      <p>Message: ${message} </p>
    `;

    const mail = await transporter.sendMail(mailOptions);
    console.log('Email sent with id:', mail.messageId);

    return NextResponse.json({ message: "Thank you! Your message has been sent successfully. We will get in touch with you soon." });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "The message was not sent. Please try again." }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }

}