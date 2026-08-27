import nodemailer from 'nodemailer';

async function testAll() {
  const hosts = [
    { host: 'smtp.zoho.in', port: 465, secure: true },
    { host: 'smtp.zoho.in', port: 587, secure: false },
    { host: 'smtppro.zoho.in', port: 465, secure: true },
    { host: 'smtppro.zoho.in', port: 587, secure: false },
    { host: 'smtp.zoho.com', port: 465, secure: true },
    { host: 'smtp.zoho.com', port: 587, secure: false },
  ];

  for (const config of hosts) {
    try {
      const transporter = nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.secure,
        auth: {
          user: 'events@sankaraeye.com',
          pass: 'qMkR8Q7wDnG9'
        },
        connectionTimeout: 4000,
        tls: { rejectUnauthorized: false }
      });
      const res = await transporter.verify();
      console.log(`>>> SUCCESS: Verified on ${config.host}:${config.port}!`);
      return config;
    } catch (err) {
      console.log(`Failed on ${config.host}:${config.port}:`, err.message);
    }
  }
}

testAll().then(() => process.exit(0));
