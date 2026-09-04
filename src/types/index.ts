export interface Hospital {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  emergencyPhone: string;
  email: string;
  beds?: number;
  established: number;
  image: string;
  headDoctor: string;
  headDoctorRole: string;
  cmoName?: string;
  cmoRole?: string;
  administratorName?: string;
  administratorRole?: string;
  administratorPhone?: string;
  specialties: string[];
  features: string[];
  nabhAccredited: boolean;
  timings: string;
  sundayTimings: string;
}

export interface Doctor {
  id: string;
  name: string;
  qualifications: string;
  designation: string;
  specialty: string;
  hospitalLocation: string;
  experience: string;
  image?: string;
  bio?: string;
}

export interface ClinicalSpecialty {
  id: string;
  title: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  image: string;
  subSpecialties: string[];
  keyTreatments: string[];
  equipment: {
    name: string;
    description: string;
    image?: string;
  }[];
  doctors: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface Initiative {
  id: string;
  title: string;
  shortTitle: string;
  targetGroup: string;
  description: string;
  impactMetrics: string[];
  icon: string;
  image?: string;
  keyHighlights: string[];
}

export interface PressItem {
  id: string;
  title: string;
  date: string;
  source: string;
  category: string;
  summary: string;
  image?: string;
  url?: string;
  content?: string[];
  keyTakeaways?: string[];
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
  isFreeCamp: boolean;
  contactNumber: string;
  bannerImage?: string;
  registrationUrl?: string;
  isExternal?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  excerpt: string;
  content: string[];
  image?: string;
  tags?: string[];
}

export interface Testimonial {
  id: string;
  patientName: string;
  age?: number;
  location: string;
  hospital: string;
  condition: string;
  treatment: string;
  quote: string;
  story: string;
  date?: string;
  image?: string;
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  hospitalLocation?: string;
  location?: string;
  experience?: string;
  experienceRequired?: string;
  qualifications?: string;
  qualification?: string;
  type: string;
  postedDate?: string;
  description?: string;
  responsibilities?: string[];
  requirements?: string[];
}

export interface AnnualReport {
  year: string;
  title: string;
  fileSize?: string;
  downloadUrl: string;
  highlight?: string;
  image?: string;
  surgeriesConducted?: string;
  outreachPatients?: string;
  metrics?: {
    surgeries: string;
    screened: string;
    income: string;
    expenditure: string;
  };
}

export interface AppointmentRecord {
  id: string;
  bookingRef: string;
  patientName: string;
  phone: string;
  email?: string;
  hospitalLocation: string;
  clinicalSpecialty: string;
  preferredDate: string;
  preferredSlot: string;
  patientType: 'New' | 'Follow-up';
  symptoms?: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface DonationRecord {
  id: string;
  receiptNumber: string;
  donorName: string;
  email: string;
  phone: string;
  panNumber?: string;
  amount: number;
  surgeriesCount?: number;
  programType?: string;
  frequency?: 'one-time' | 'monthly';
  taxExemptionClaimed?: boolean;
  is80GEligible?: boolean;
  status: 'Pending Verification' | 'Verified' | 'Success' | 'Pending';
  paymentVerified?: boolean;
  verifiedAt?: string;
  verifiedBy?: string;
  date: string;
  items?: any[];
  paymentId?: string;
  paymentMethod?: string;
}

export interface RazorpayConfig {
  keyId: string;
  keySecret: string;
  isLive: boolean;
  isEnabled: boolean;
  merchantName: string;
  themeColor: string;
}

export interface EyePledgeRecord {
  id: string;
  pledgeId: string;
  fullName: string;
  age?: number;
  dob?: string;
  gender?: string;
  phone: string;
  email: string;
  city: string;
  nextOfKinName: string;
  nextOfKinPhone: string;
  consent?: boolean;
  pledgedAt: string;
}

export interface JobApplicationRecord {
  id: string;
  jobId?: string;
  jobTitle?: string;
  applicantName?: string;
  candidateName?: string;
  email: string;
  phone: string;
  preferredUnit?: string;
  departmentRole?: string;
  qualification?: string;
  experienceYears?: number | string;
  currentLocation?: string;
  currentOrganization?: string;
  coverNote?: string;
  resumeFileName?: string;
  resumeUrl?: string;
  status?: 'New' | 'Under Review' | 'Shortlisted' | 'Interview Scheduled' | 'Hired' | 'Archived';
  hrNotes?: string;
  submittedAt: string;
}

export interface ContactMessageRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  category?: string;
  hospitalBranch?: string;
  hospitalPreference?: string;
  subject?: string;
  message: string;
  submittedAt: string;
}

// 🏛️ Council Member Definition
export interface CouncilMember {
  id: string;
  name: string;
  role: string;
  desc?: string;
  bio?: string;
  designation?: string;
  image: string;
  category: 'trustees' | 'steering' | 'leadership';
  city?: string;
  order?: number;
}

// 📢 Dynamic Promo / Announcement Popup Config
export interface PromoPopupConfig {
  isEnabled: boolean;
  id: string;
  title: string;
  badge: string;
  description: string;
  imageUrl?: string;
  eventDate?: string;
  eventTime?: string;
  eventVenue?: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  isFormMode?: boolean;
  formSubmitButtonText?: string;
  validUntil?: string;
}

// 📝 In-Popup Registration Submission Record
export interface PopupRegistrationRecord {
  id: string;
  popupId: string;
  eventTitle: string;
  fullName: string;
  email: string;
  phone: string;
  organization?: string;
  city?: string;
  submittedAt: string;
}

// 📄 Newsletter Item with Interactive Reader Pages
export interface NewsletterPage {
  pageNumber: number;
  title: string;
  subtitle?: string;
  content: string[];
  image?: string;
  highlights?: string[];
  quote?: string;
}

export interface NewsletterItem {
  id: string;
  title: string;
  edition: string;
  date: string;
  coverImage: string;
  pdfUrl: string;
  description: string;
  fileSize: string;
  editorialMessage?: string;
  pages?: NewsletterPage[];
}

// 🖼️ Gallery Item
export interface GalleryItem {
  id: string;
  title: string;
  category: 'Hospitals' | 'Rural Camps' | 'Laser Tech' | 'Events & Awards';
  imageUrl: string;
  date: string;
  caption: string;
}

// 🪔 Occasion & Festival Wishes Header Banner Config
export interface WishesBannerConfig {
  isEnabled: boolean;
  id: string;
  occasionTitle: string; // e.g. "Diwali Greetings", "National Eye Donation Fortnight"
  greetingMessage: string; // e.g. "Sankara Eye Foundation wishes you and your family a Joyous and Prosperous Deepavali!"
  theme: 'saffron-festive' | 'royal-gold' | 'emerald-glow' | 'patriotic-tricolor' | 'deep-navy';
  iconType: 'lamp' | 'sparkles' | 'flag' | 'heart' | 'eye' | 'celebration';
  actionText?: string;
  actionLink?: string;
}

// 🎓 DNB & Fellowship Exam Application Record
export interface ExamApplicationRecord {
  id: string;
  rollNumber: string;
  courseType: 
    | 'DNB Ophthalmology' 
    | 'Fellowship in Cornea & Refractive' 
    | 'Fellowship in Vitreo-Retina' 
    | 'Fellowship in Paediatric Ophthalmology' 
    | 'B.Sc Optometry Entrance' 
    | 'M.Sc Clinical Optometry';
  candidateName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  medicalCouncilRegNo?: string;
  qualifications: string;
  currentInstitution: string;
  preferredExamCenter: string;
  status: 'Application Received' | 'Admit Card Issued' | 'Interview Shortlisted' | 'Selected' | 'Waitlisted' | 'Rejected';
  examDate?: string;
  interviewNotes?: string;
  score?: number;
  submittedAt: string;
}

// 🔐 Multi-Role User System
export type AdminRole = 'super_admin' | 'admin' | 'finance' | 'management' | 'marketing' | 'hr' | 'administration';

export interface AdminAccount {
  empId?: string;
  email: string;
  name: string;
  role: AdminRole;
  roleLabel: string;
  department: string;
  passcode?: string;
  altPasscode?: string;
  phone?: string;
  avatar?: string;
  createdAt?: string;
  createdBy?: string;
}

// 📈 Live Visitor & System Activity Log
export interface ActivityLogItem {
  id: string;
  action: string;
  category: 'appointment' | 'donation' | 'pledge' | 'career' | 'exam' | 'pageview' | 'admin';
  details: string;
  location?: string;
  timestamp: string;
}

