import nodemailer from 'nodemailer';
import { generateDonationDraftHtml } from '../utils/emailTemplates';

async function testDraftEmail() {
  const sampleData = {
    receiptNumber: 'SEH-DON-49211',
    donorName: 'Prabhanjan',
    email: 'events@sankaraeye.com',
    phone: '918951568286',
    panNumber: 'ABCDE1234F',
    amount: 3750,
    date: new Date().toISOString(),
    paymentId: 'pay_test_verif_01',
    items: [
      { type: 'Gift of Vision (Rural Cataract Surgery)', quantity: 1, unitPrice: 3750 }
    ]
  };

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

  const html = generateDonationDraftHtml(sampleData);

  console.log('Sending draft acknowledgment email...');
  const info = await transporter.sendMail({
    from: '"Sankara Eye Hospital & Sri Kanchi Kamakoti Medical Trust" <events@sankaraeye.com>',
    to: 'events@sankaraeye.com',
    subject: `Donation Received (Under Verification) - Ref #${sampleData.paymentId} | Sri Kanchi Kamakoti Medical Trust`,
    html
  });

  console.log('SUCCESS! Draft email dispatched with Message ID:', info.messageId);
}

testDraftEmail().catch(console.error);
