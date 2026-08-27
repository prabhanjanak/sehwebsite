import { jsPDF } from 'jspdf';
import { DonationEmailData, AppointmentEmailData } from './emailTemplates';
import { numberToIndianWords } from './numberToWords';

/**
 * Generate official 80G Donation Receipt PDF Buffer using jsPDF
 */
export function generateDonationReceiptPdf(data: DonationEmailData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const formattedDate = new Date(data.date).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });

      const amountWords = numberToIndianWords(data.amount);

      // Outer Border Box
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.4);
      doc.rect(10, 10, 190, 277);

      // Header: Trust & Hospital Details
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text('SRI KANCHI KAMAKOTI MEDICAL TRUST', 15, 18);

      doc.setFontSize(9.5);
      doc.text('SANKARA EYE HOSPITAL', 15, 23);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.text('Sathy Road, Sivanandapuram, Saravanampatti, Coimbatore, Tamil Nadu – 641035', 15, 28);
      doc.text('Tel: 0422-4234200 | Email: donations@sankaraeye.com | Web: www.sankaraeye.com', 15, 32);

      // Legal registration column on the right
      doc.setLineWidth(0.2);
      doc.line(135, 12, 135, 34);

      doc.setFontSize(7.5);
      doc.text('Reg. Trust No: 286/1977', 138, 17);
      doc.text('PAN: AAATS7490A', 138, 22);
      doc.text('80G URN: AABTS1234FE20214', 138, 27);
      doc.setFont('helvetica', 'bold');
      doc.text('Form 10BD Compliant', 138, 32);

      // Horizontal Divider
      doc.setLineWidth(0.3);
      doc.line(10, 36, 200, 36);

      // Receipt Title Bar
      doc.setFillColor(243, 244, 246);
      doc.rect(10, 36, 190, 7.5, 'FD');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.text('DONATION RECEIPT (SECTION 80G OF INCOME TAX ACT, 1961)', 105, 41, { align: 'center' });

      // Metadata Grid
      let y = 47;
      doc.rect(13, y, 184, 18);
      doc.line(105, y, 105, y + 18);
      doc.line(13, y + 6, 197, y + 6);
      doc.line(13, y + 12, 197, y + 12);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 100, 100);
      doc.text('Receipt Number:', 15, y + 4.2);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text(data.receiptNumber, 42, y + 4.2);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text('Date & Time:', 108, y + 4.2);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text(formattedDate, 135, y + 4.2);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text('Payment Mode:', 15, y + 10.2);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('Online (Razorpay)', 42, y + 10.2);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text('Payment Ref ID:', 108, y + 10.2);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text(data.paymentId || 'pay_direct', 135, y + 10.2);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text('Financial Year:', 15, y + 16.2);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('2026 – 2027', 42, y + 16.2);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text('Assessment Year:', 108, y + 16.2);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('2027 – 2028', 138, y + 16.2);

      // Donor Particulars Section
      y += 22;
      doc.setFillColor(243, 244, 246);
      doc.rect(13, y, 184, 6, 'FD');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(0, 0, 0);
      doc.text('DONOR PARTICULARS', 16, y + 4.2);

      y += 6;
      doc.rect(13, y, 184, 14);
      doc.line(105, y, 105, y + 14);
      doc.line(13, y + 7, 197, y + 7);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text('Donor Full Name:', 15, y + 5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text(data.donorName, 42, y + 5);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text('PAN Number:', 108, y + 5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text(data.panNumber || 'NOT PROVIDED', 135, y + 5);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text('Mobile Number:', 15, y + 12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text(data.phone, 42, y + 12);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text('Email Address:', 108, y + 12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text(data.email, 135, y + 12);

      // Itemized Table
      y += 18;
      doc.setFillColor(243, 244, 246);
      doc.rect(13, y, 184, 6.5, 'FD');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(0, 0, 0);
      doc.text('Sl', 16, y + 4.5);
      doc.text('Particulars / Sponsorship Description', 26, y + 4.5);
      doc.text('Qty', 132, y + 4.5, { align: 'center' });
      doc.text('Rate (INR)', 160, y + 4.5, { align: 'right' });
      doc.text('Amount (INR)', 193, y + 4.5, { align: 'right' });

      y += 6.5;
      const items = data.items && data.items.length > 0 ? data.items : [
        { type: 'Vision Restoration / Hospital Sponsorship', quantity: 1, unitPrice: data.amount }
      ];

      items.forEach((item, index) => {
        doc.rect(13, y, 184, 7);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.text(String(index + 1), 16, y + 5);
        doc.setFont('helvetica', 'bold');
        doc.text(item.type, 26, y + 5);
        doc.setFont('helvetica', 'normal');
        doc.text(String(item.quantity), 132, y + 5, { align: 'center' });
        doc.text(`Rs. ${item.unitPrice.toLocaleString('en-IN')}.00`, 160, y + 5, { align: 'right' });
        doc.setFont('helvetica', 'bold');
        doc.text(`Rs. ${(item.quantity * item.unitPrice).toLocaleString('en-IN')}.00`, 193, y + 5, { align: 'right' });
        y += 7;
      });

      // Total Row
      doc.setFillColor(243, 244, 246);
      doc.rect(13, y, 184, 7.5, 'FD');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.text('TOTAL AMOUNT RECEIVED:', 140, y + 5.2, { align: 'right' });
      doc.setFontSize(8.5);
      doc.text(`Rs. ${data.amount.toLocaleString('en-IN')}.00`, 193, y + 5.2, { align: 'right' });

      // Amount in Words
      y += 10.5;
      doc.rect(13, y, 184, 9);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(100, 100, 100);
      doc.text('AMOUNT IN WORDS:', 15, y + 3.5);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(0, 0, 0);
      doc.text(amountWords.toUpperCase(), 15, y + 7);

      // Statutory Declaration
      y += 12;
      doc.setFillColor(248, 250, 252);
      doc.rect(13, y, 184, 16, 'FD');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(0, 0, 0);
      doc.text('STATUTORY TAX EXEMPTION DECLARATION (SECTION 80G):', 15, y + 4);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.8);
      doc.setTextColor(50, 50, 50);
      doc.text(
        'Donations to Sri Kanchi Kamakoti Medical Trust are eligible for 50% tax deduction under Section 80G(5)(vi) of the Income Tax Act, 1961 vide Unique Registration Number (URN) AABTS1234FE20214 dated 01/04/2021. This donation will be reported in Statement of Donations in Form 10BD to the Income Tax Department.',
        15, y + 8, { maxWidth: 180 }
      );

      // Footer & Signatory
      y += 20;
      doc.line(13, y, 197, y);
      y += 4;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(0, 0, 0);
      doc.text('* This is a computer-generated official receipt and requires no physical signature.', 15, y);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.8);
      doc.setTextColor(100, 100, 100);
      doc.text('Thank you for restoring sight and eliminating preventable blindness.', 15, y + 4);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(0, 0, 0);
      doc.text('For SRI KANCHI KAMAKOTI MEDICAL TRUST', 195, y, { align: 'right' });
      doc.setFontSize(6.8);
      doc.text('AUTHORIZED SIGNATORY', 195, y + 8, { align: 'right' });

      const arrayBuffer = doc.output('arraybuffer');
      resolve(Buffer.from(arrayBuffer));
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Generate official OPD Consultation Pass PDF Buffer using jsPDF
 */
export function generateAppointmentPassPdf(data: AppointmentEmailData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.4);
      doc.rect(10, 10, 190, 277);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('SRI KANCHI KAMAKOTI MEDICAL TRUST', 15, 18);
      doc.setFontSize(9.5);
      doc.text('SANKARA EYE HOSPITAL', 15, 23);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.text(`Unit: ${data.hospitalLocation}`, 15, 28);
      doc.setFontSize(7.5);
      doc.text('Central Helpline: 080-69038900 | 24/7 Eye Bank: 7619519555 | Web: www.sankaraeye.com', 15, 32);

      doc.setLineWidth(0.2);
      doc.line(135, 12, 135, 34);
      doc.setFontSize(8);
      doc.text(`Booking Ref: #${data.bookingRef}`, 138, 18);
      doc.setFont('helvetica', 'bold');
      doc.text('NABH Accredited', 138, 24);
      doc.setFont('helvetica', 'normal');
      doc.text('Priority OPD Entry', 138, 30);

      doc.setLineWidth(0.3);
      doc.line(10, 36, 200, 36);

      doc.setFillColor(243, 244, 246);
      doc.rect(10, 36, 190, 7.5, 'FD');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.text('OPD CONSULTATION APPOINTMENT PASS', 105, 41, { align: 'center' });

      let y = 48;
      doc.rect(13, y, 184, 21);
      doc.line(105, y, 105, y + 21);
      doc.line(13, y + 7, 197, y + 7);
      doc.line(13, y + 14, 197, y + 14);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 100, 100);
      doc.text('Patient Name:', 15, y + 5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text(data.patientName, 42, y + 5);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text('Contact Number:', 108, y + 5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text(data.phone, 138, y + 5);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text('Specialty / Dept:', 15, y + 12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text(data.clinicalSpecialty, 42, y + 12);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text('Hospital Location:', 108, y + 12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text(data.hospitalLocation, 138, y + 12);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text('Consultation Date:', 15, y + 19);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text(data.preferredDate, 42, y + 19);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text('Allocated Slot:', 108, y + 19);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text(`${data.preferredSlot} (Priority Entry)`, 138, y + 19);

      y += 26;
      doc.setFillColor(248, 250, 252);
      doc.rect(13, y, 184, 28, 'FD');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(0, 0, 0);
      doc.text('IMPORTANT PATIENT VISIT GUIDELINES:', 15, y + 5);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(50, 50, 50);
      doc.text('1. Please report at Ground Floor OPD Reception Desk 15 minutes prior to your allocated slot.', 15, y + 10);
      doc.text('2. Kindly bring a valid Government Photo ID (Aadhaar / Voter ID / DL) and past ophthalmic records.', 15, y + 15);
      doc.text('3. If opting for Cashless TPA / Mediclaim Insurance, kindly carry your physical policy card.', 15, y + 20);
      doc.text('4. For dilated retinal examinations, kindly be accompanied by an attendant (driving restricted for 2 hrs).', 15, y + 25);

      y += 33;
      doc.line(13, y, 197, y);
      y += 4;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(0, 0, 0);
      doc.text('* This is a computer-generated clinical pass and requires no physical signature.', 15, y);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.8);
      doc.setTextColor(100, 100, 100);
      doc.text('Hospital Timings: 8:30 AM – 6:00 PM | Emergency 24/7 Active', 15, y + 4);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(0, 0, 0);
      doc.text('SANKARA EYE HOSPITAL', 195, y, { align: 'right' });
      doc.setFontSize(6.8);
      doc.text('CLINICAL DESK COORDINATOR', 195, y + 8, { align: 'right' });

      const arrayBuffer = doc.output('arraybuffer');
      resolve(Buffer.from(arrayBuffer));
    } catch (err) {
      reject(err);
    }
  });
}
