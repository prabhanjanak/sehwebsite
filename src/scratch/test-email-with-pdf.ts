import nodemailer from 'nodemailer';
import { generateDonationReceiptPdf } from '../utils/generateReceiptPdf';
import { generateDonationReceiptHtml } from '../utils/emailTemplates';

async function testEmailWithPdf() {
  const sampleData = {
    receiptNumber: 'SEH-80G-88219',
    donorName: 'Prabhanjana Bhat',
    email: 'events@sankaraeye.com',
    phone: '98951568286',
    panNumber: 'KSSDH23432',
    amount: 7500,
    date: new Date().toISOString(),
    paymentId: 'pay_TU0SRvjjQJ3Z6v',
    items: [
      { type: '1-Day Food Annadhanam Sponsorship', quantity: 1, unitPrice: 7500 }
    ]
  };

  console.log('Generating PDF buffer...');
  const pdfBuffer = await generateDonationReceiptPdf(sampleData);
  console.log(`PDF Buffer generated (${pdfBuffer.length} bytes)!`);

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

  console.log('Sending email with PDF attachment...');
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

  console.log('SUCCESS! Email with PDF Attachment sent! Message ID:', info.messageId);
}

testEmailWithPdf().catch(console.error);
