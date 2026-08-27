import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import nodemailer from 'nodemailer';
import { generateDonationReceiptHtml, generateDonationDraftHtml, generateAppointmentHtml } from './src/utils/emailTemplates';
import { generateDonationReceiptPdf, generateAppointmentPassPdf } from './src/utils/generateReceiptPdf';

const zohoEmailPlugin = (): Plugin => {
  const getTransporter = () => {
    return nodemailer.createTransport({
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
  };

  return {
    name: 'zoho-email-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        // 1. Initial Draft Acknowledgment Email (Donation received - under backend verification)
        if (req.method === 'POST' && req.url === '/api/send-donation-draft-email') {
          let body = '';
          req.on('data', (chunk) => { body += chunk; });
          req.on('end', async () => {
            try {
              const data = JSON.parse(body);
              if (!data.email) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: false, error: 'Recipient email required' }));
              }
              const transporter = getTransporter();
              const html = generateDonationDraftHtml(data);

              const info = await transporter.sendMail({
                from: '"Sankara Eye Hospital & Sri Kanchi Kamakoti Medical Trust" <events@sankaraeye.com>',
                to: data.email,
                bcc: 'events@sankaraeye.com',
                subject: `Donation Received (Under Verification) - Ref #${data.paymentId || 'SEH-DON'} | Sri Kanchi Kamakoti Medical Trust`,
                html
              });
              console.log(`[SMTP] Donation Draft/Acknowledgment dispatched to ${data.email}. Message ID: ${info.messageId}`);
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, messageId: info.messageId }));
            } catch (err: any) {
              console.error('[SMTP Error] Failed sending donation draft email:', err);
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
          return;
        }

        // 2. Official 80G Tax Receipt Email (Triggered after HR/Admin Verification with PDF)
        if (req.method === 'POST' && req.url === '/api/send-receipt-email') {
          let body = '';
          req.on('data', (chunk) => { body += chunk; });
          req.on('end', async () => {
            try {
              const data = JSON.parse(body);
              if (!data.email) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: false, error: 'Recipient email required' }));
              }
              const transporter = getTransporter();
              const html = generateDonationReceiptHtml(data);
              const pdfBuffer = await generateDonationReceiptPdf(data);

              const info = await transporter.sendMail({
                from: '"Sankara Eye Hospital & Sri Kanchi Kamakoti Medical Trust" <events@sankaraeye.com>',
                to: data.email,
                bcc: 'events@sankaraeye.com',
                subject: `Official 80G Donation Receipt #${data.receiptNumber} - Sri Kanchi Kamakoti Medical Trust`,
                html,
                attachments: [
                  {
                    filename: `Sankara-80G-Donation-Receipt-${data.receiptNumber}.pdf`,
                    content: pdfBuffer,
                    contentType: 'application/pdf'
                  }
                ]
              });
              console.log(`[SMTP] 80G Verified Receipt #${data.receiptNumber} with PDF attachment dispatched to ${data.email}. Message ID: ${info.messageId}`);
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, messageId: info.messageId }));
            } catch (err: any) {
              console.error('[SMTP Error] Failed sending receipt:', err);
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
          return;
        }

        // 3. Clinical OPD Appointment Pass Email
        if (req.method === 'POST' && req.url === '/api/send-appointment-email') {
          let body = '';
          req.on('data', (chunk) => { body += chunk; });
          req.on('end', async () => {
            try {
              const data = JSON.parse(body);
              if (!data.email) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: false, error: 'Recipient email required' }));
              }
              const transporter = getTransporter();
              const html = generateAppointmentHtml(data);
              const pdfBuffer = await generateAppointmentPassPdf(data);

              const info = await transporter.sendMail({
                from: '"Sankara Eye Hospital" <events@sankaraeye.com>',
                to: data.email,
                subject: `OPD Appointment Confirmed #${data.bookingRef} - Sankara Eye Hospital (${data.hospitalLocation})`,
                html,
                attachments: [
                  {
                    filename: `Sankara-OPD-Pass-${data.bookingRef}.pdf`,
                    content: pdfBuffer,
                    contentType: 'application/pdf'
                  }
                ]
              });
              console.log(`[SMTP] Appointment #${data.bookingRef} pass with PDF attachment dispatched to ${data.email}. Message ID: ${info.messageId}`);
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, messageId: info.messageId }));
            } catch (err: any) {
              console.error('[SMTP Error] Failed sending appointment pass:', err);
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
          return;
        }

        // 4. SMTP Connection Tester
        if (req.method === 'POST' && req.url === '/api/test-smtp') {
          try {
            const transporter = getTransporter();
            await transporter.verify();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, message: 'Zoho SMTP Connected Successfully!' }));
          } catch (err: any) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: err.message }));
          }
          return;
        }

        next();
      });
    }
  };
};

export default defineConfig({
  plugins: [react(), zohoEmailPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: false,
    proxy: {
      '/api/nvidia': {
        target: 'https://integrate.api.nvidia.com',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api\/nvidia/, ''),
        secure: true,
        headers: {
          'Origin': 'https://integrate.api.nvidia.com'
        }
      }
    }
  },
});
