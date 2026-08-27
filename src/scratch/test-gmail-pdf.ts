import nodemailer from 'nodemailer';
import { generateDonationReceiptPdf } from '../utils/generateReceiptPdf';
import { generateDonationReceiptHtml } from '../utils/emailTemplates';

async function testGmail() {
  const sampleData = {
    receiptNumber: 'SEH-80G-36428',
    donorName: 'Prabhanjan',
    email: 'prabhanjanakk@gmail.com', // test email or events
    phone: '918951568286',
    panNumber: 'LKGGJ3456H',
    amount: 11250,
    date: new Date().toISOString(),
    paymentId: 'pay_TU0gnRDch04A9n',
    items: [
      { type: 'Gift of Vision (Rural Cataract Surgery)', quantity: 3, unitPrice: 3750 }
    ]
  };

  const pdfBuffer = await generateDonationReceiptPdf(sampleData);
  console.log('Generated PDF buffer size:', pdfBuffer.length, 'bytes');

  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 587,
    secure: false,
    auth: {
      user: 'events@sankaraeye.com',
      pass: 'qMkR8Q7wDnG9'
    },
    tls: { rejectUnauthorized: false }
  });

  const html = generateDonationReceiptHtml(sampleData);

  const info = await transporter.sendMail({
    from: '"Sankara Eye Hospital & Sri Kanchi Kamakoti Medical Trust" <events@sankaraeye.com>',
    to: 'events@sankaraeye.com',
    subject: `Official 80G Donation Receipt #${sampleData.receiptNumber} - Sri Kanchi Kamakoti Medical Trust`,
    html,
    attachments: [
      {
        filename: `Sankara-80G-Donation-Receipt-${sampleData.receiptNumber}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf'
      }
    ]
  });

  console.log('Sent! Message ID:', info.messageId);
}

testGmail().catch(console.error);
