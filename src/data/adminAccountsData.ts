import { AdminAccount } from '../types';

export const ADMIN_ACCOUNTS: (AdminAccount & { passcode: string; altPasscode?: string })[] = [
  {
    empId: '000038',
    email: 'saravanan@sankaraeye.com',
    name: 'Saravanan D',
    role: 'super_admin',
    roleLabel: 'Chief Technology Officer',
    department: 'CTO / Central Executive IT & Technology',
    passcode: 'Saravanan@1234',
    altPasscode: '000038',
    phone: '+91 80 6903 8900',
    createdAt: '2026-01-01T00:00:00.000Z',
    createdBy: 'System Root'
  },
  {
    empId: '010177',
    email: 'prabhanjan@sankaraeye.com',
    name: 'Prabhanjan',
    role: 'super_admin',
    roleLabel: 'Information Systems Lead',
    department: 'Information Systems & Central Trust Administration',
    passcode: 'Prabhanjan@1234',
    altPasscode: '010177',
    phone: '+91 80 6903 8900',
    createdAt: '2026-01-01T00:00:00.000Z',
    createdBy: 'System Root'
  },
  {
    empId: '010180',
    email: 'finance@sankaraeye.com',
    name: 'Finance & Accounts Desk',
    role: 'finance',
    roleLabel: 'Finance & Accounts Verification',
    department: 'Donations, 80G Receipts & Accounts Audit',
    passcode: 'finance2026',
    altPasscode: 'Finance@123',
    phone: '+91 422 423 4215',
    createdAt: '2026-01-01T00:00:00.000Z',
    createdBy: 'Saravanan D'
  },
  {
    empId: '010182',
    email: 'hr@sankaraeye.com',
    name: 'Sankara Talent & Academic Admissions',
    role: 'hr',
    roleLabel: 'Human Resources & Academics',
    department: 'Doctor Fellowships, DNB & Careers',
    passcode: 'hr2026',
    altPasscode: 'Hr@123',
    phone: '+91 422 423 4220',
    createdAt: '2026-01-01T00:00:00.000Z',
    createdBy: 'Prabhanjan'
  },
  {
    empId: '010185',
    email: 'marketing@sankaraeye.com',
    name: 'National Outreach & Communications Lead',
    role: 'marketing',
    roleLabel: 'Marketing & Digital Outreach',
    department: 'Public Relations, Events & Media',
    passcode: 'marketing2026',
    altPasscode: 'Marketing@123',
    phone: '+91 80 6903 8910',
    createdAt: '2026-01-01T00:00:00.000Z',
    createdBy: 'Saravanan D'
  },
  {
    empId: '010188',
    email: 'management@sankaraeye.com',
    name: 'Trust Steering & Executive Board',
    role: 'management',
    roleLabel: 'Management & Governance',
    department: 'Trustees & Executive Council',
    passcode: 'sankara2026',
    altPasscode: 'Management@123',
    phone: '+91 422 423 4200',
    createdAt: '2026-01-01T00:00:00.000Z',
    createdBy: 'Prabhanjan'
  },
  {
    empId: '010190',
    email: 'adminops@sankaraeye.com',
    name: 'Hospital Operations Superintendent',
    role: 'administration',
    roleLabel: 'Hospital Network Administration',
    department: 'Hospital Units & Clinical Staffing',
    passcode: 'admin2026',
    altPasscode: 'Adminops@123',
    phone: '+91 80 6903 8930',
    createdAt: '2026-01-01T00:00:00.000Z',
    createdBy: 'Saravanan D'
  }
];
