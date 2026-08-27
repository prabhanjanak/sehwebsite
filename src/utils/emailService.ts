import { DonationEmailData, AppointmentEmailData } from './emailTemplates';

/**
 * Send Initial Draft / Acknowledgment Email (Donation received - under verification)
 */
export async function sendDonationDraftEmail(data: DonationEmailData): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const res = await fetch('/api/send-donation-draft-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    return result;
  } catch (err: any) {
    console.error('Failed to send donation draft email:', err);
    return { success: false, error: err.message || 'Network error' };
  }
}

/**
 * Send Official 80G Tax Exemption Receipt Email with Attached PDF (Triggered on HR verification)
 */
export async function sendDonationReceiptEmail(data: DonationEmailData): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const res = await fetch('/api/send-receipt-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    return result;
  } catch (err: any) {
    console.error('Failed to send receipt email:', err);
    return { success: false, error: err.message || 'Network error' };
  }
}

/**
 * Send Clinical OPD Appointment Pass Email with Attached PDF
 */
export async function sendAppointmentEmail(data: AppointmentEmailData): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const res = await fetch('/api/send-appointment-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    return result;
  } catch (err: any) {
    console.error('Failed to send appointment email:', err);
    return { success: false, error: err.message || 'Network error' };
  }
}

/**
 * Test Zoho SMTP Server Connection
 */
export async function testSmtpConnection(): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const res = await fetch('/api/test-smtp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message || 'Network error' };
  }
}
