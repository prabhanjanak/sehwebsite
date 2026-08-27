import nodemailer from 'nodemailer';

async function sendTest() {
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 587,
    secure: false, // TLS
    auth: {
      user: 'events@sankaraeye.com',
      pass: 'qMkR8Q7wDnG9'
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const info = await transporter.sendMail({
    from: '"Sankara Eye Hospital & Sri Kanchi Kamakoti Medical Trust" <events@sankaraeye.com>',
    to: 'events@sankaraeye.com',
    subject: '✅ SMTP Verification Test - Sankara Eye Hospital',
    text: 'This is a verification email from Sankara Eye Hospital 80G Tax Receipt & Appointment Email Dispatcher.',
    html: '<h3>Sankara Eye Hospital & Sri Kanchi Kamakoti Medical Trust</h3><p>SMTP Email Dispatcher is successfully connected and operational.</p>'
  });

  console.log('Test email sent successfully! Message ID:', info.messageId);
}

sendTest().catch(console.error);
