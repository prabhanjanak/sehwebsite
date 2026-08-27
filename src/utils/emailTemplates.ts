import { numberToIndianWords } from './numberToWords';

export interface DonationEmailData {
  receiptNumber: string;
  donorName: string;
  email: string;
  phone: string;
  panNumber?: string;
  amount: number;
  date: string;
  paymentId?: string;
  items?: Array<{ type: string; quantity: number; unitPrice: number }>;
}

export interface AppointmentEmailData {
  bookingRef: string;
  patientName: string;
  email: string;
  phone: string;
  hospitalLocation: string;
  clinicalSpecialty: string;
  preferredDate: string;
  preferredSlot: string;
}

/**
 * 1. Initial Draft / Acknowledgment Email Template (Payment Received — Under Verification)
 */
export function generateDonationDraftHtml(data: DonationEmailData): string {
  const formattedDate = new Date(data.date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #111827; margin: 0; padding: 20px; background-color: #f3f4f6; }
    .email-wrapper { max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); border: 1px solid #e5e7eb; }
    .email-header { background: #ea580c; color: #ffffff; padding: 24px; text-align: center; }
    .card { padding: 24px; line-height: 1.6; color: #374151; font-size: 13.5px; }
    .status-badge { display: inline-block; background: #fef3c7; color: #92400e; border: 1px solid #fde68a; padding: 6px 12px; border-radius: 9999px; font-weight: 700; font-size: 11.5px; margin: 8px 0 16px 0; }
    .highlight-box { background: #fff7ed; border: 1px solid #fed7aa; border-radius: 8px; padding: 14px 18px; margin: 16px 0; }
    .notice-box { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 14px 18px; margin: 16px 0; color: #1e40af; font-size: 12.5px; }
  </style>
</head>
<body>
  <div class="email-wrapper">
    
    <!-- Email Top Header -->
    <div class="email-header">
      <h2 style="margin: 0; font-size: 18px; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase;">
        SRI KANCHI KAMAKOTI MEDICAL TRUST
      </h2>
      <h3 style="margin: 4px 0 0 0; font-size: 14px; font-weight: 600; opacity: 0.95;">
        SANKARA EYE HOSPITAL
      </h3>
      <p style="margin: 4px 0 0 0; font-size: 11px; opacity: 0.85;">
        Saravanampatti, Coimbatore, Tamil Nadu – 641035 | Tel: 0422-4234200
      </p>
    </div>

    <!-- Acknowledgment & Under Verification Body -->
    <div class="card">
      <div class="status-badge">
        🟡 Donation Received — Under Backend Verification
      </div>

      <h3 style="margin-top: 0; color: #111827; font-size: 16px;">
        Dear Respected <strong>${data.donorName}</strong>,
      </h3>
      
      <p style="margin: 8px 0;">
        Thank you for your generous contribution of <strong style="color: #ea580c; font-size: 15px;">₹${data.amount.toLocaleString('en-IN')}</strong> towards <strong>Sri Kanchi Kamakoti Medical Trust</strong> and <strong>Sankara Eye Hospital</strong>.
      </p>

      <p style="margin: 8px 0;">
        We have successfully received your payment transaction details. Our accounts and finance team is currently verifying the transaction in the backend.
      </p>

      <div class="highlight-box">
        <div style="font-weight: bold; color: #9a3412; margin-bottom: 6px;">📋 Contribution Details Recorded:</div>
        <div style="font-size: 12px; color: #431407; line-height: 1.6;">
          • <strong>Donor Name:</strong> ${data.donorName}<br>
          • <strong>Contribution Amount:</strong> ₹${data.amount.toLocaleString('en-IN')}<br>
          • <strong>Payment Reference ID:</strong> <span style="font-family: monospace; font-weight: bold;">${data.paymentId || 'pay_direct'}</span><br>
          • <strong>PAN Number:</strong> <span style="font-family: monospace;">${data.panNumber || 'NOT PROVIDED'}</span><br>
          • <strong>Date of Submission:</strong> ${formattedDate}
        </div>
      </div>

      <div class="notice-box">
        ℹ️ <strong>Next Steps:</strong> Once verified by our accounts desk, your official, Form 10BD-compliant <strong>Section 80G Tax Exemption Receipt & Invoice (PDF)</strong> will be generated and dispatched directly to <strong>${data.email}</strong> shortly.
      </div>

      <p style="margin: 16px 0 0 0; font-size: 13px; color: #4b5563;">
        With gratitude & prayers,<br>
        <strong>Donor Relations & Accounts Desk</strong><br>
        <span style="font-size: 11.5px; color: #6b7280;">Sri Kanchi Kamakoti Medical Trust / Sankara Eye Hospital</span><br>
        <span style="font-size: 11px; color: #9ca3af;">Email: donations@sankaraeye.com | Web: <a href="https://www.sankaraeye.com" style="color: #ea580c; text-decoration: none;">www.sankaraeye.com</a></span>
      </p>
    </div>

  </div>
</body>
</html>
`;
}

/**
 * 2. Official 80G Tax Exemption Receipt Email (Sent after HR/Accounts Verification with PDF attachment)
 */
export function generateDonationReceiptHtml(data: DonationEmailData): string {
  const amountWords = numberToIndianWords(data.amount);
  const formattedDate = new Date(data.date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #111827; margin: 0; padding: 20px; background-color: #f3f4f6; }
    .email-wrapper { max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); border: 1px solid #e5e7eb; }
    .email-header { background: #ea580c; color: #ffffff; padding: 24px; text-align: center; }
    .thank-you-card { padding: 24px; border-bottom: 1px solid #e5e7eb; line-height: 1.6; color: #374151; font-size: 13.5px; }
    .highlight-box { background: #fff7ed; border: 1px solid #fed7aa; border-radius: 8px; padding: 14px 18px; margin: 16px 0; }
    .receipt-container { padding: 24px; background: #fafafa; border-top: 2px dashed #d1d5db; font-size: 11px; }
    .title { text-align: center; background: #f3f4f6; padding: 6px; font-weight: 900; font-size: 11.5px; letter-spacing: 0.5px; border: 1px solid #111827; margin-bottom: 10px; }
    .meta-grid { width: 100%; border-collapse: collapse; margin-bottom: 10px; font-size: 11px; }
    .meta-grid td { border: 1px solid #111827; padding: 5px 8px; }
    .table { width: 100%; border-collapse: collapse; margin-bottom: 10px; font-size: 11px; }
    .table th, .table td { border: 1px solid #111827; padding: 5px 8px; }
    .table th { background: #f3f4f6; text-align: left; }
    .statutory { border: 1px solid #111827; padding: 8px; font-size: 10px; line-height: 1.35; margin-bottom: 10px; background: #ffffff; }
  </style>
</head>
<body>
  <div class="email-wrapper">
    
    <!-- Email Top Header -->
    <div class="email-header">
      <h2 style="margin: 0; font-size: 18px; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase;">
        SRI KANCHI KAMAKOTI MEDICAL TRUST
      </h2>
      <h3 style="margin: 4px 0 0 0; font-size: 14px; font-weight: 600; opacity: 0.95;">
        SANKARA EYE HOSPITAL
      </h3>
      <p style="margin: 4px 0 0 0; font-size: 11px; opacity: 0.85;">
        Saravanampatti, Coimbatore, Tamil Nadu – 641035 | Tel: 0422-4234200
      </p>
    </div>

    <!-- Thanking & Gratitude Statement -->
    <div class="thank-you-card">
      <h3 style="margin-top: 0; color: #111827; font-size: 16px;">
        Dear Respected <strong>${data.donorName}</strong>,
      </h3>
      
      <p style="margin: 8px 0;">
        We extend our deepest gratitude, sincere appreciation, and heartfelt prayers on behalf of the Trustees, Doctors, and entire medical family at <strong>Sri Kanchi Kamakoti Medical Trust</strong> and <strong>Sankara Eye Hospital</strong> for your verified generous contribution of <strong style="color: #ea580c; font-size: 15px;">₹${data.amount.toLocaleString('en-IN')}</strong>.
      </p>

      <p style="margin: 8px 0;">
        Your benevolent sponsorship directly transforms the life of visually impaired individuals from underprivileged backgrounds by providing them world-class free eye care and surgical restoration. Because of your kindness, a person walks out of darkness and beholds the light of the world once again.
      </p>

      <div class="highlight-box">
        <div style="font-weight: bold; color: #9a3412; margin-bottom: 4px;">📌 Verified 80G Tax Exemption Receipt Summary:</div>
        <div style="font-size: 12px; color: #431407;">
          • <strong>Receipt Number:</strong> <span style="font-family: monospace; font-weight: bold;">${data.receiptNumber}</span><br>
          • <strong>Total Contribution:</strong> ₹${data.amount.toLocaleString('en-IN')} (Eligible for 50% Tax Deduction under Sec 80G)<br>
          • <strong>Date of Issuance:</strong> ${formattedDate}<br>
          • <strong>Payment Reference:</strong> <span style="font-family: monospace;">${data.paymentId || 'pay_direct'}</span>
        </div>
      </div>

      <p style="margin: 10px 0; background: #f0fdf4; border: 1px solid #bbf7d0; padding: 10px 14px; border-radius: 6px; color: #166534; font-size: 12px;">
        📎 <strong>Official PDF Attached:</strong> An official, computer-generated 80G Tax Exemption Receipt (PDF) is attached to this email for your tax filing records and statutory compliance.
      </p>

      <p style="margin: 16px 0 0 0; font-size: 13px; color: #4b5563;">
        With warmest regards & blessings,<br>
        <strong>Dr. R.V. Ramani & Board of Trustees</strong><br>
        <span style="font-size: 11.5px; color: #6b7280;">Sri Kanchi Kamakoti Medical Trust / Sankara Eye Hospital</span><br>
        <span style="font-size: 11px; color: #9ca3af;">Web: <a href="https://www.sankaraeye.com" style="color: #ea580c; text-decoration: none;">www.sankaraeye.com</a> | Email: donations@sankaraeye.com</span>
      </p>
    </div>

    <!-- Inline Digital Copy of Computer-Generated 80G Receipt -->
    <div class="receipt-container">
      <div class="title">
        DONATION RECEIPT (SECTION 80G OF INCOME TAX ACT, 1961)
      </div>

      <table class="meta-grid">
        <tr>
          <td style="width: 50%;"><strong>Receipt No:</strong> <span style="font-family: monospace;">${data.receiptNumber}</span></td>
          <td style="width: 50%;"><strong>Date:</strong> ${formattedDate}</td>
        </tr>
        <tr>
          <td><strong>Donor Name:</strong> ${data.donorName}</td>
          <td><strong>PAN Number:</strong> <span style="font-family: monospace;">${data.panNumber || 'NOT PROVIDED'}</span></td>
        </tr>
        <tr>
          <td><strong>Mobile:</strong> ${data.phone}</td>
          <td><strong>Email:</strong> ${data.email}</td>
        </tr>
        <tr>
          <td><strong>Payment Mode:</strong> Online (Razorpay)</td>
          <td><strong>Ref ID:</strong> <span style="font-family: monospace;">${data.paymentId || 'pay_direct'}</span></td>
        </tr>
      </table>

      <table class="table">
        <thead>
          <tr>
            <th style="width: 30px; text-align: center;">Sl</th>
            <th>Sponsorship Particulars</th>
            <th style="width: 35px; text-align: center;">Qty</th>
            <th style="width: 75px; text-align: right;">Rate (₹)</th>
            <th style="width: 85px; text-align: right;">Total (₹)</th>
          </tr>
        </thead>
        <tbody>
          ${(data.items || []).map((item, idx) => `
            <tr>
              <td style="text-align: center;">${idx + 1}</td>
              <td><strong>${item.type}</strong></td>
              <td style="text-align: center;">${item.quantity}</td>
              <td style="text-align: right; font-family: monospace;">₹${item.unitPrice.toLocaleString('en-IN')}.00</td>
              <td style="text-align: right; font-family: monospace; font-weight: bold;">₹${(item.quantity * item.unitPrice).toLocaleString('en-IN')}.00</td>
            </tr>
          `).join('')}
          <tr style="font-weight: bold; background-color: #f3f4f6;">
            <td colspan="4" style="text-align: right;">Total Amount Received:</td>
            <td style="text-align: right; font-family: monospace; font-weight: 900;">₹${data.amount.toLocaleString('en-IN')}.00</td>
          </tr>
        </tbody>
      </table>

      <div style="border: 1px solid #111827; padding: 4px 8px; font-size: 10px; margin-bottom: 8px; background-color: #ffffff;">
        <strong>Amount in Words:</strong> <span style="font-family: monospace; text-transform: uppercase;">${amountWords}</span>
      </div>

      <div class="statutory">
        <strong>Statutory Note:</strong> Donations to <strong>Sri Kanchi Kamakoti Medical Trust</strong> are eligible for <strong>50% tax deduction under Section 80G(5)(vi)</strong> of the Income Tax Act, 1961 vide URN <strong>AABTS1234FE20214</strong> dated 01/04/2021. Form 10BD Compliant.
      </div>

      <div style="font-size: 9.5px; color: #4b5563; text-align: center;">
        * This is a computer-generated official receipt. Requires no physical signature.
      </div>
    </div>

  </div>
</body>
</html>
`;
}

/**
 * 3. Clinical OPD Appointment Pass Email
 */
export function generateAppointmentHtml(data: AppointmentEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #111827; margin: 0; padding: 20px; background-color: #f3f4f6; }
    .email-wrapper { max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); border: 1px solid #e5e7eb; }
    .email-header { background: #ea580c; color: #ffffff; padding: 24px; text-align: center; }
    .card { padding: 24px; line-height: 1.6; color: #374151; font-size: 13.5px; }
    .grid { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 12px; }
    .grid td { border: 1px solid #111827; padding: 8px 10px; }
    .guidelines { border: 1px solid #e5e7eb; padding: 14px; font-size: 11.5px; line-height: 1.5; margin: 16px 0; background: #f8fafc; border-radius: 8px; }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="email-header">
      <h2 style="margin: 0; font-size: 18px; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase;">
        SRI KANCHI KAMAKOTI MEDICAL TRUST
      </h2>
      <h3 style="margin: 4px 0 0 0; font-size: 14px; font-weight: 600;">
        SANKARA EYE HOSPITAL (${data.hospitalLocation})
      </h3>
    </div>

    <div class="card">
      <h3 style="margin-top: 0; color: #111827; font-size: 16px;">
        Dear <strong>${data.patientName}</strong>,
      </h3>
      
      <p style="margin: 8px 0;">
        Thank you for choosing <strong>Sankara Eye Hospital</strong> for your ophthalmic consultation. We are pleased to confirm that your priority outpatient appointment has been scheduled successfully.
      </p>

      <table class="grid">
        <tr>
          <td style="width: 50%; background: #f9fafb;"><strong>Booking Reference:</strong></td>
          <td style="width: 50%;"><strong style="color: #ea580c; font-family: monospace;">#${data.bookingRef}</strong></td>
        </tr>
        <tr>
          <td style="background: #f9fafb;"><strong>Patient Name:</strong></td>
          <td>${data.patientName}</td>
        </tr>
        <tr>
          <td style="background: #f9fafb;"><strong>Department / Specialty:</strong></td>
          <td>${data.clinicalSpecialty}</td>
        </tr>
        <tr>
          <td style="background: #f9fafb;"><strong>Hospital Unit:</strong></td>
          <td><strong>${data.hospitalLocation}</strong></td>
        </tr>
        <tr>
          <td style="background: #f9fafb;"><strong>Appointment Date & Slot:</strong></td>
          <td><strong>${data.preferredDate} (${data.preferredSlot} Entry)</strong></td>
        </tr>
      </table>

      <div class="guidelines">
        <strong style="color: #111827;">Day of Consultation Guidelines:</strong>
        <ol style="margin: 6px 0 0 0; padding-left: 18px;">
          <li>Please report at the <strong>Ground Floor OPD Reception Desk</strong> 15 minutes prior to your allocated slot.</li>
          <li>Carry a valid Government Photo ID (Aadhaar / Voter ID / DL) and past ophthalmic records.</li>
          <li>For Cashless TPA / Mediclaim Insurance, kindly carry your physical policy card.</li>
        </ol>
      </div>

      <p style="margin: 10px 0; background: #f0fdf4; border: 1px solid #bbf7d0; padding: 10px 14px; border-radius: 6px; color: #166534; font-size: 12px;">
        📎 <strong>Official Clinical Pass (PDF) Attached:</strong> Please find attached your official appointment pass PDF for priority entry.
      </p>

      <p style="margin: 16px 0 0 0; font-size: 13px; color: #4b5563;">
        Warm regards,<br>
        <strong>Clinical Desk Coordinator</strong><br>
        <span style="font-size: 11.5px; color: #6b7280;">Sankara Eye Hospital (${data.hospitalLocation})</span><br>
        <span style="font-size: 11px; color: #9ca3af;">Central Helpline: 080-69038900 | Emergency 24/7: 7619519555</span>
      </p>
    </div>
  </div>
</body>
</html>
`;
}
