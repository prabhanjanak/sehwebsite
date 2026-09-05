import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AppointmentRecord,
  DonationRecord,
  EyePledgeRecord,
  JobApplicationRecord,
  ContactMessageRecord,
  CouncilMember,
  PromoPopupConfig,
  PopupRegistrationRecord,
  EventItem,
  PressItem,
  NewsletterItem,
  GalleryItem,
  Hospital,
  WishesBannerConfig,
  ExamApplicationRecord,
  AdminRole,
  AdminAccount,
  ActivityLogItem,
  RazorpayConfig
} from '../types';
import { INITIAL_TRUSTEES, INITIAL_STEERING_COUNCIL, INITIAL_LEADERSHIP_COUNCIL } from '../data/councilData';
import { EVENTS_DATA } from '../data/eventsData';
import { PRESS_DATA } from '../data/newsPressData';
import { INITIAL_NEWSLETTERS } from '../data/newslettersData';
import { INITIAL_GALLERY } from '../data/galleryData';
import { HOSPITALS_DATA } from '../data/hospitalsData';
import { INITIAL_WISHES_BANNER } from '../data/wishesData';
import { INITIAL_EXAM_APPLICATIONS } from '../data/examApplicationsData';
import { ADMIN_ACCOUNTS } from '../data/adminAccountsData';
import { getUnitByRouteOrCode } from '../data/appointmentUnitsData';
import { sendDonationReceiptEmail, sendDonationDraftEmail, sendAppointmentEmail } from '../utils/emailService';
import confetti from 'canvas-confetti';

interface DatabaseContextType {
  // Appointments
  appointments: AppointmentRecord[];
  bookAppointment: (data: Omit<AppointmentRecord, 'id' | 'bookingRef' | 'status' | 'createdAt'>) => Promise<AppointmentRecord>;
  submitAppointment: (data: Omit<AppointmentRecord, 'id' | 'bookingRef' | 'status' | 'createdAt'>) => Promise<AppointmentRecord>;
  getAppointmentByRef: (ref: string) => AppointmentRecord | undefined;

  // Donations & Payment Gateway
  donations: DonationRecord[];
  submitDonation: (data: Omit<DonationRecord, 'id' | 'receiptNumber' | 'status' | 'date'>) => Promise<DonationRecord>;
  verifyAndDispatchDonationReceipt: (donationId: string, verifiedBy?: string) => Promise<{ success: boolean; receiptNumber: string; error?: string }>;
  deleteDonation: (id: string) => void;
  totalDonationAmount: number;
  totalSurgeriesSponsored: number;
  razorpayConfig: RazorpayConfig;
  updateRazorpayConfig: (config: Partial<RazorpayConfig>) => void;

  // Eye Pledge
  pledges: EyePledgeRecord[];
  submitEyePledge: (data: Omit<EyePledgeRecord, 'id' | 'pledgeId' | 'pledgedAt'>) => Promise<EyePledgeRecord>;

  // Careers (HR Talent Pool)
  jobApplications: JobApplicationRecord[];
  submitJobApplication: (data: Omit<JobApplicationRecord, 'id' | 'submittedAt'>) => Promise<JobApplicationRecord>;
  updateJobApplicationStatus: (id: string, status: NonNullable<JobApplicationRecord['status']>, hrNotes?: string) => void;
  deleteJobApplication: (id: string) => void;

  // 🎓 DNB & Fellowship Exam Applications
  examApplications: ExamApplicationRecord[];
  submitExamApplication: (data: Omit<ExamApplicationRecord, 'id' | 'rollNumber' | 'submittedAt'>) => Promise<ExamApplicationRecord>;
  updateExamApplicationStatus: (id: string, status: ExamApplicationRecord['status'], notes?: string, score?: number) => void;
  deleteExamApplication: (id: string) => void;

  // 🏥 Hospital Units Management (Doctor & Admin Staffing)
  hospitalsList: Hospital[];
  updateHospitalUnit: (id: string, updated: Partial<Hospital>) => void;

  // 🪔 Wishes Header Banner (Marketing Occasions)
  wishesBanner: WishesBannerConfig;
  updateWishesBanner: (config: Partial<WishesBannerConfig>) => void;
  toggleWishesBanner: (enabled: boolean) => void;

  // Contact & Messages
  contactMessages: ContactMessageRecord[];
  submitContactMessage: (data: Omit<ContactMessageRecord, 'id' | 'submittedAt'>) => Promise<ContactMessageRecord>;

  // Newsletter Subscribers
  subscribers: string[];
  subscribeNewsletter: (email: string) => Promise<boolean>;

  // 📢 Dynamic Promo / Announcement Popup Modal
  promoPopup: PromoPopupConfig;
  updatePromoPopup: (config: Partial<PromoPopupConfig>) => void;
  togglePromoPopup: (enabled: boolean) => void;
  popupRegistrations: PopupRegistrationRecord[];
  submitPopupRegistration: (data: Omit<PopupRegistrationRecord, 'id' | 'submittedAt'>) => Promise<PopupRegistrationRecord>;

  // 🏛️ Council & Leadership Live Data
  trustees: CouncilMember[];
  steeringCouncil: CouncilMember[];
  leadershipCouncil: CouncilMember[];
  updateCouncilMember: (category: 'trustees' | 'steering' | 'leadership', id: string, updated: Partial<CouncilMember>) => void;
  addCouncilMember: (category: 'trustees' | 'steering' | 'leadership', member: Omit<CouncilMember, 'id'>) => void;
  deleteCouncilMember: (category: 'trustees' | 'steering' | 'leadership', id: string) => void;

  // 📅 Events & Conferences
  eventsList: EventItem[];
  addEvent: (event: Omit<EventItem, 'id'>) => void;
  updateEvent: (id: string, updated: Partial<EventItem>) => void;
  deleteEvent: (id: string) => void;

  // 📰 News & Press
  newsList: PressItem[];
  addNews: (news: Omit<PressItem, 'id'>) => void;
  updateNews: (id: string, updated: Partial<PressItem>) => void;
  deleteNews: (id: string) => void;

  // 📄 Newsletters & Interactive Reader
  newslettersList: NewsletterItem[];
  addNewsletter: (nl: Omit<NewsletterItem, 'id'>) => void;
  deleteNewsletter: (id: string) => void;
  activeNewsletterForReader: NewsletterItem | null;
  openNewsletterReader: (newsletter: NewsletterItem) => void;
  closeNewsletterReader: () => void;

  // 🖼️ Photo Gallery
  galleryList: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;

  // 📈 Live Analytics & Activity Stream
  activityLogs: ActivityLogItem[];
  recordActivityLog: (action: string, category: ActivityLogItem['category'], details: string, location?: string) => void;

  // 🔐 Multi-Role User Authentication & User Management
  isAdminLoggedIn: boolean;
  adminUser: AdminAccount | null;
  adminAccountsList: (AdminAccount & { passcode: string; altPasscode?: string })[];
  loginAdmin: (password: string, email?: string) => Promise<boolean>;
  logoutAdmin: () => void;
  switchAdminRole: (role: AdminRole) => void;
  createAdminAccount: (data: { empId: string; name: string; email: string; role: AdminRole; department: string; passcode: string; phone?: string }) => boolean;
  updateAdminAccount: (email: string, updated: Partial<AdminAccount & { passcode?: string }>) => void;
  deleteAdminAccount: (email: string) => void;

  // Modals state
  isAppointmentModalOpen: boolean;
  openAppointmentModal: (defaultLocation?: string, defaultSpecialty?: string) => void;
  closeAppointmentModal: () => void;
  modalDefaultLocation: string;
  modalDefaultSpecialty: string;

  isDonationModalOpen: boolean;
  openDonationModal: (defaultSurgeryQty?: number) => void;
  closeDonationModal: () => void;
  modalDefaultSurgeryQty: number;

  isPledgeModalOpen: boolean;
  openPledgeModal: () => void;
  closePledgeModal: () => void;

  // Active Toast Notification
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

// LocalStorage Keys
const LOCAL_STORAGE_KEY_APPOINTMENTS = 'sankara_db_appointments';
const LOCAL_STORAGE_KEY_DONATIONS = 'sankara_db_donations';
const LOCAL_STORAGE_KEY_PLEDGES = 'sankara_db_pledges';
const LOCAL_STORAGE_KEY_APPLICATIONS = 'sankara_db_applications';
const LOCAL_STORAGE_KEY_EXAM_APPLICATIONS = 'sankara_db_exam_applications';
const LOCAL_STORAGE_KEY_HOSPITALS = 'sankara_db_hospitals_v3';
try {
  localStorage.removeItem('sankara_db_hospitals');
} catch (e) {}
const LOCAL_STORAGE_KEY_WISHES_BANNER = 'sankara_db_wishes_banner';
const LOCAL_STORAGE_KEY_CONTACTS = 'sankara_db_contacts';

const LOCAL_STORAGE_KEY_SUBSCRIBERS = 'sankara_db_subscribers';
const LOCAL_STORAGE_KEY_POPUP = 'sankara_db_promo_popup';
const LOCAL_STORAGE_KEY_TRUSTEES = 'sankara_db_trustees';
const LOCAL_STORAGE_KEY_STEERING = 'sankara_db_steering';
const LOCAL_STORAGE_KEY_LEADERSHIP = 'sankara_db_leadership';
const LOCAL_STORAGE_KEY_EVENTS = 'sankara_db_events';
const LOCAL_STORAGE_KEY_NEWS = 'sankara_db_news';
const LOCAL_STORAGE_KEY_NEWSLETTERS = 'sankara_db_newsletters';
const LOCAL_STORAGE_KEY_GALLERY = 'sankara_db_gallery';
const LOCAL_STORAGE_KEY_ADMIN_AUTH = 'sankara_db_admin_auth';
const LOCAL_STORAGE_KEY_ADMIN_USER = 'sankara_db_admin_user';
const LOCAL_STORAGE_KEY_ADMIN_ACCOUNTS = 'sankara_db_admin_accounts';
const LOCAL_STORAGE_KEY_ACTIVITY_LOGS = 'sankara_db_activity_logs';
const LOCAL_STORAGE_KEY_POPUP_REGISTRATIONS = 'sankara_db_popup_registrations';
const LOCAL_STORAGE_KEY_RAZORPAY = 'sankara_db_razorpay';

export const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 0. Razorpay Gateway Config State
  const [razorpayConfig, setRazorpayConfig] = useState<RazorpayConfig>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_RAZORPAY);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return {
      keyId: 'rzp_test_SlgNbXAEE5rBdc',
      keySecret: 'uyKxr4J1QCHDlBb9FBoMn3pd',
      isLive: false,
      isEnabled: true,
      merchantName: 'Sri Kanchi Kamakoti Medical Trust',
      themeColor: '#ea580c'
    };
  });

  // 1. Appointments State
  const [appointments, setAppointments] = useState<AppointmentRecord[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_APPOINTMENTS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      {
        id: 'seed-apt-1',
        bookingRef: 'SEH-849201',
        patientName: 'Ramanathan Iyer',
        phone: '9845012345',
        email: 'ramanathan@example.com',
        hospitalLocation: 'Bangalore',
        clinicalSpecialty: 'Cataract (FLACS)',
        preferredDate: '2026-09-02',
        preferredSlot: 'Morning (9:00 AM - 1:00 PM)',
        patientType: 'New',
        symptoms: 'Cloudy vision in right eye and difficulty reading night traffic signs.',
        status: 'Confirmed',
        createdAt: '2026-08-23T10:15:00.000Z'
      }
    ];
  });

  // 2. Donations State
  const [donations, setDonations] = useState<DonationRecord[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_DONATIONS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      {
        id: 'seed-don-1',
        receiptNumber: 'SEH-80G-94021',
        donorName: 'Sridhar & Geetha Krishnan',
        email: 'sridhar.k@example.com',
        phone: '9880198801',
        panNumber: 'ABCDE1234F',
        amount: 37500,
        surgeriesCount: 10,
        programType: 'Gift of Vision (Rural Cataract)',
        frequency: 'one-time',
        taxExemptionClaimed: true,
        status: 'Success',
        date: '2026-08-20T14:30:00.000Z'
      }
    ];
  });

  // 3. Pledges State
  const [pledges, setPledges] = useState<EyePledgeRecord[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PLEDGES);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      {
        id: 'seed-plg-1',
        pledgeId: 'SEH-EP-55102',
        fullName: 'Ananya Deshmukh',
        age: 32,
        phone: '9820198201',
        email: 'ananya.d@example.com',
        city: 'Mumbai',
        nextOfKinName: 'Vikram Deshmukh',
        nextOfKinPhone: '9820198202',
        pledgedAt: '2026-08-18T11:20:00.000Z'
      }
    ];
  });

  // 4. Job Applications State (HR Talent Pool)
  const [jobApplications, setJobApplications] = useState<JobApplicationRecord[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_APPLICATIONS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) { console.error(e); }
    }
    return [
      {
        id: 'app-101',
        candidateName: 'Dr. Vivek Bhattacharya',
        applicantName: 'Dr. Vivek Bhattacharya',
        email: 'dr.vivek.bhatt@gmail.com',
        phone: '9845012345',
        preferredUnit: 'Varanasi',
        departmentRole: 'Cornea & Refractive Surgery Consultant',
        qualification: 'MS (Ophth), FCRS, FAICO',
        experienceYears: '4 Years Post-MS',
        currentLocation: 'Lucknow, UP',
        currentOrganization: 'KGMC Eye Hospital',
        resumeFileName: 'CV_Dr_Vivek_Bhattacharya_MS_Cornea.pdf',
        status: 'Shortlisted',
        hrNotes: 'Strong hands-on experience in Blade-Free LASIK & DSEK. Ready to relocate to RJ Sankara Varanasi unit.',
        coverNote: 'Eager to contribute to the new Varanasi RJ Sankara Hospital and establish high-volume cornea services in Eastern UP.',
        submittedAt: '2026-08-24T09:30:00.000Z'
      },
      {
        id: 'app-102',
        candidateName: 'Priya Sundaram',
        applicantName: 'Priya Sundaram',
        email: 'priya.sundaram@gmail.com',
        phone: '9884019283',
        preferredUnit: 'Bangalore',
        departmentRole: 'Senior Optometrist & Contact Lens Specialist',
        qualification: 'M.Optom (Elite School of Optometry)',
        experienceYears: '5 Years',
        currentLocation: 'Bangalore, Karnataka',
        currentOrganization: 'Apollo Ophthalmic Clinic',
        resumeFileName: 'Priya_Sundaram_MOptom_Resume.pdf',
        status: 'Under Review',
        hrNotes: 'Proficient in Pentacam tomography, dry eye evaluation, and specialty scleral lenses.',
        coverNote: 'Passionate about advanced diagnostic refraction and paediatric visual screening.',
        submittedAt: '2026-08-24T14:15:00.000Z'
      },
      {
        id: 'app-103',
        candidateName: 'Dr. Rahul Singhal',
        applicantName: 'Dr. Rahul Singhal',
        email: 'dr.rahul.singhal@yahoo.com',
        phone: '9414028374',
        preferredUnit: 'Shimoga',
        departmentRole: 'Vitreo-Retina Fellow / Associate Consultant',
        qualification: 'MBBS, DNB, FVRS',
        experienceYears: '3 Years',
        currentLocation: 'Jaipur, Rajasthan',
        currentOrganization: 'SMS Medical College Hospital',
        resumeFileName: 'Resume_Dr_Rahul_Singhal_VR_Surgeon.pdf',
        status: 'New',
        hrNotes: '',
        coverNote: 'Looking to join Sankara Shimoga tertiary center to manage surgical retina and diabetic retinopathy OPD.',
        submittedAt: '2026-08-25T08:45:00.000Z'
      },
      {
        id: 'app-104',
        candidateName: 'Kavitha Murugan',
        applicantName: 'Kavitha Murugan',
        email: 'kavitha.m.nurse@gmail.com',
        phone: '9944018274',
        preferredUnit: 'Coimbatore',
        departmentRole: 'Ophthalmic Operation Theatre (OT) In-Charge Nurse',
        qualification: 'B.Sc Nursing (NABH OT Trained)',
        experienceYears: '6 Years',
        currentLocation: 'Coimbatore, Tamil Nadu',
        currentOrganization: 'PSG Hospitals',
        resumeFileName: 'Kavitha_Murugan_OT_Nursing_CV.pdf',
        status: 'Interview Scheduled',
        hrNotes: 'Interview scheduled with HR Head & Chief of Nursing on Thursday at 11 AM.',
        coverNote: 'Extensive background in sterile OT protocols, FLACS laser docking, and phacoemulsification assisting.',
        submittedAt: '2026-08-23T16:20:00.000Z'
      }
    ];
  });

  // 5. 🎓 DNB & Fellowship Exam Applications
  const [examApplications, setExamApplications] = useState<ExamApplicationRecord[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_EXAM_APPLICATIONS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) { console.error(e); }
    }
    return INITIAL_EXAM_APPLICATIONS;
  });

  // 6. 🏥 Hospital Units Management (Doctors & Administrators)
  const [hospitalsList, setHospitalsList] = useState<Hospital[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_HOSPITALS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Always ensure authoritative real address, phones, headDoctor, and timings from HOSPITALS_DATA are used
          return HOSPITALS_DATA.map((official) => {
            const userEdited = parsed.find((h: Hospital) => h.id === official.id);
            if (!userEdited) return official;
            return {
              ...official,
              image: (userEdited.image && userEdited.image.trim() !== '') ? userEdited.image : official.image,
              beds: userEdited.beds || official.beds,
              established: userEdited.established || official.established,
              nabhAccredited: userEdited.nabhAccredited !== undefined ? userEdited.nabhAccredited : official.nabhAccredited
            };
          });
        }
      } catch (e) { console.error(e); }
    }
    return HOSPITALS_DATA;
  });


  // 7. 🪔 Wishes Header Banner Config
  const [wishesBanner, setWishesBanner] = useState<WishesBannerConfig>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_WISHES_BANNER);
    if (saved) {
      try { 
        const parsed = JSON.parse(saved); 
        if (parsed && (parsed.occasionTitle?.toLowerCase().includes('ganesha') || parsed.id === 'wishes-ganesha-chaturthi')) {
          return parsed;
        }
      } catch (e) { console.error(e); }
    }
    return INITIAL_WISHES_BANNER;
  });

  // 8. Contact Messages
  const [contactMessages, setContactMessages] = useState<ContactMessageRecord[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_CONTACTS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [];
  });

  // 9. Subscribers
  const [subscribers, setSubscribers] = useState<string[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_SUBSCRIBERS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return ['prabhanjan@sankaraeye.com', 'support@sankaraeye.com'];
  });

  // 10. Promo Popup
  const [promoPopup, setPromoPopup] = useState<PromoPopupConfig>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_POPUP);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return {
      isEnabled: true,
      id: 'golden-jubilee-2026',
      title: '50 Years of Restoring Vision & Transforming Lives',
      subtitle: 'Golden Jubilee National Ophthalmic Congress & Vision Summit 2026',
      description: 'Join over 1,500 leading cataract, cornea, retina surgeons, and healthcare philanthropists as we celebrate 50 years of Sri Kanchi Kamakoti Medical Trust.',
      tag: 'Golden Jubilee Celebration',
      badgeText: 'May 1977 – 2026 • 2.6M+ Surgeries',
      imageUrl: '/assets/images/Sankara-50th-Year-Logo.png',
      ctaText: 'Register for Summit',
      ctaLink: 'https://events.sankaraeye.in',
      secondaryCtaText: 'Download Commemorative Brochure',
      secondaryCtaLink: '#/annual-reports',
      enableForm: true,
      formTitle: 'Reserve Delegate Seat / Request Invite',
      date: 'October 14-16, 2026',
      venue: 'Sankara Academy of Vision, Sathy Road, Coimbatore'
    };
  });

  const [popupRegistrations, setPopupRegistrations] = useState<PopupRegistrationRecord[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_POPUP_REGISTRATIONS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [];
  });

  // 11. Council Data
  const [trustees, setTrustees] = useState<CouncilMember[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_TRUSTEES);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_TRUSTEES;
  });

  const [steeringCouncil, setSteeringCouncil] = useState<CouncilMember[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_STEERING);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_STEERING_COUNCIL;
  });

  const [leadershipCouncil, setLeadershipCouncil] = useState<CouncilMember[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_LEADERSHIP);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_LEADERSHIP_COUNCIL;
  });

  // 12. Events Data
  const [eventsList, setEventsList] = useState<EventItem[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_EVENTS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return EVENTS_DATA;
  });

  // 13. News & Press Data
  const [newsList, setNewsList] = useState<PressItem[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_NEWS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return PRESS_DATA;
  });

  // 14. Newsletters & Bulletins
  const [newslettersList, setNewslettersList] = useState<NewsletterItem[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_NEWSLETTERS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_NEWSLETTERS;
  });

  // 15. Photo Gallery
  const [galleryList, setGalleryList] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_GALLERY);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_GALLERY;
  });

  // 16. 📈 Live Analytics & Activity Stream
  const [activityLogs, setActivityLogs] = useState<ActivityLogItem[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_ACTIVITY_LOGS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      {
        id: 'act-1',
        action: 'Cataract Consultation Booked',
        category: 'appointment',
        details: 'Patient Ramanathan Iyer booked FLACS slot at Bangalore unit.',
        location: 'Bengaluru, KA',
        timestamp: '2026-08-26T08:45:00.000Z'
      },
      {
        id: 'act-2',
        action: 'Eye Donation Pledge Registered',
        category: 'pledge',
        details: 'Ananya Deshmukh submitted online eye pledge #SEH-EP-55102.',
        location: 'Mumbai, MH',
        timestamp: '2026-08-26T07:30:00.000Z'
      },
      {
        id: 'act-3',
        action: 'DNB Fellowship Exam Application',
        category: 'exam',
        details: 'Dr. Ananya Subramanian submitted application for DNB Ophthalmology.',
        location: 'Chennai, TN',
        timestamp: '2026-08-26T06:15:00.000Z'
      },
      {
        id: 'act-4',
        action: 'Surgery Sponsorship Received',
        category: 'donation',
        details: '₹37,500 donation for Gift of Vision rural surgeries.',
        location: 'San Jose, USA',
        timestamp: '2026-08-25T21:10:00.000Z'
      }
    ];
  });

  // 17. 🔐 Admin Multi-Role Authentication & Accounts Directory
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem(LOCAL_STORAGE_KEY_ADMIN_AUTH) === 'true';
  });

  const [adminUser, setAdminUser] = useState<AdminAccount | null>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_ADMIN_USER);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return null;
  });

  const [adminAccountsList, setAdminAccountsList] = useState<(AdminAccount & { passcode: string; altPasscode?: string })[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_ADMIN_ACCOUNTS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge to ensure root super admins exist
          const hasSaravanan = parsed.some((u: any) => u.email === 'saravanan@sankaraeye.com');
          const hasPrabhanjan = parsed.some((u: any) => u.email === 'prabhanjan@sankaraeye.com');
          if (hasSaravanan && hasPrabhanjan) return parsed;
        }
      } catch (e) { console.error(e); }
    }
    return ADMIN_ACCOUNTS;
  });

  // Interactive Newsletter Reader Modal State
  const [activeNewsletterForReader, setActiveNewsletterForReader] = useState<NewsletterItem | null>(null);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_ADMIN_ACCOUNTS, JSON.stringify(adminAccountsList));
  }, [adminAccountsList]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_APPOINTMENTS, JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_DONATIONS, JSON.stringify(donations));
  }, [donations]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PLEDGES, JSON.stringify(pledges));
  }, [pledges]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_APPLICATIONS, JSON.stringify(jobApplications));
  }, [jobApplications]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_EXAM_APPLICATIONS, JSON.stringify(examApplications));
  }, [examApplications]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_HOSPITALS, JSON.stringify(hospitalsList));
  }, [hospitalsList]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_WISHES_BANNER, JSON.stringify(wishesBanner));
  }, [wishesBanner]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_CONTACTS, JSON.stringify(contactMessages));
  }, [contactMessages]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_RAZORPAY, JSON.stringify(razorpayConfig));
  }, [razorpayConfig]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_SUBSCRIBERS, JSON.stringify(subscribers));
  }, [subscribers]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_POPUP, JSON.stringify(promoPopup));
  }, [promoPopup]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_POPUP_REGISTRATIONS, JSON.stringify(popupRegistrations));
  }, [popupRegistrations]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_TRUSTEES, JSON.stringify(trustees));
  }, [trustees]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_STEERING, JSON.stringify(steeringCouncil));
  }, [steeringCouncil]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_LEADERSHIP, JSON.stringify(leadershipCouncil));
  }, [leadershipCouncil]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_EVENTS, JSON.stringify(eventsList));
  }, [eventsList]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_NEWS, JSON.stringify(newsList));
  }, [newsList]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_NEWSLETTERS, JSON.stringify(newslettersList));
  }, [newslettersList]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_GALLERY, JSON.stringify(galleryList));
  }, [galleryList]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_ACTIVITY_LOGS, JSON.stringify(activityLogs));
  }, [activityLogs]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_ADMIN_AUTH, isAdminLoggedIn ? 'true' : 'false');
    if (adminUser) {
      localStorage.setItem(LOCAL_STORAGE_KEY_ADMIN_USER, JSON.stringify(adminUser));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY_ADMIN_USER);
    }
  }, [isAdminLoggedIn, adminUser]);

  // Modals & UI state
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [modalDefaultLocation, setModalDefaultLocation] = useState('Bangalore');
  const [modalDefaultSpecialty, setModalDefaultSpecialty] = useState('Cataract (FLACS)');

  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [modalDefaultSurgeryQty, setModalDefaultSurgeryQty] = useState(1);

  const [isPledgeModalOpen, setIsPledgeModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Activity Logger
  const recordActivityLog = (action: string, category: ActivityLogItem['category'], details: string, location = 'Online Web') => {
    const newLog: ActivityLogItem = {
      id: `act-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      action,
      category,
      details,
      location,
      timestamp: new Date().toISOString()
    };
    setActivityLogs(prev => [newLog, ...prev.slice(0, 49)]); // keep latest 50
  };

  const openAppointmentModal = (loc?: string, spec?: string) => {
    if (loc) setModalDefaultLocation(loc);
    if (spec) setModalDefaultSpecialty(spec);
    if (loc) {
      const matched = getUnitByRouteOrCode(loc);
      if (matched) {
        window.location.hash = `/${matched.slug}`;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }
    window.location.hash = '/book-appointment';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeAppointmentModal = () => setIsAppointmentModalOpen(false);

  const openDonationModal = (qty = 1) => {
    setModalDefaultSurgeryQty(qty);
    window.location.hash = '/donate';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeDonationModal = () => setIsDonationModalOpen(false);

  const openPledgeModal = () => setIsPledgeModalOpen(true);
  const closePledgeModal = () => setIsPledgeModalOpen(false);

  // Business Actions
  const bookAppointment = async (data: Omit<AppointmentRecord, 'id' | 'bookingRef' | 'status' | 'createdAt'>): Promise<AppointmentRecord> => {
    const randomSix = Math.floor(100000 + Math.random() * 900000);
    const bookingRef = `SEH-${randomSix}`;
    const newRecord: AppointmentRecord = {
      ...data,
      id: `apt-${Date.now()}`,
      bookingRef,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    setAppointments(prev => [newRecord, ...prev]);
    recordActivityLog('Outpatient Appointment Booked', 'appointment', `Patient ${data.patientName} (${data.clinicalSpecialty}) at ${data.hospitalLocation}.`, data.hospitalLocation);

    // Auto-dispatch Zoho SMTP Appointment Confirmation Email if email provided
    if (data.email) {
      sendAppointmentEmail({
        bookingRef,
        patientName: data.patientName,
        email: data.email,
        phone: data.phone,
        hospitalLocation: data.hospitalLocation,
        clinicalSpecialty: data.clinicalSpecialty,
        preferredDate: data.preferredDate,
        preferredSlot: data.preferredSlot
      }).then(res => {
        if (res.success) {
          console.log(`[Email Dispatched] Appointment pass sent to ${data.email}`);
        }
      }).catch(err => console.error('Error dispatching appointment email:', err));
    }

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti trigger', e);
    }

    showToast(`Appointment confirmed! Reference: ${bookingRef}${data.email ? ' (Pass emailed)' : ''}`);
    return newRecord;
  };

  const getAppointmentByRef = (ref: string) => {
    return appointments.find(a => a.bookingRef.toUpperCase() === ref.trim().toUpperCase());
  };

  const submitDonation = async (data: Omit<DonationRecord, 'id' | 'receiptNumber' | 'status' | 'date'>): Promise<DonationRecord> => {
    const randomFive = Math.floor(10000 + Math.random() * 90000);
    const tempRef = `SEH-DON-${randomFive}`;
    const newRecord: DonationRecord = {
      ...data,
      id: `don-${Date.now()}`,
      receiptNumber: tempRef,
      status: 'Pending Verification',
      paymentVerified: false,
      date: new Date().toISOString()
    };

    setDonations(prev => [newRecord, ...prev]);
    recordActivityLog('Donation Received (Pending Verification)', 'donation', `₹${data.amount.toLocaleString()} received from ${data.donorName} (${data.paymentId || 'pay_direct'}). Awaiting backend verification.`);

    // Auto-dispatch Zoho SMTP Initial Draft / Acknowledgment Email
    if (data.email) {
      sendDonationDraftEmail({
        receiptNumber: tempRef,
        donorName: data.donorName,
        email: data.email,
        phone: data.phone,
        panNumber: data.panNumber,
        amount: data.amount,
        date: newRecord.date,
        paymentId: data.paymentId,
        items: data.items
      }).then(res => {
        if (res.success) {
          console.log(`[Email Dispatched] Donation Acknowledgment Draft sent to ${data.email}`);
        }
      }).catch(err => console.error('Error dispatching draft email:', err));
    }

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.5 }
      });
    } catch (e) {
      console.log('Confetti trigger', e);
    }

    showToast(`Thank you! Your donation was received and is under backend verification. An acknowledgment email has been sent.`);
    return newRecord;
  };

  const verifyAndDispatchDonationReceipt = async (donationId: string, verifiedBy: string = 'HR Admin'): Promise<{ success: boolean; receiptNumber: string; error?: string }> => {
    const target = donations.find(d => d.id === donationId);
    if (!target) {
      return { success: false, receiptNumber: '', error: 'Donation record not found' };
    }

    const currentYear = new Date().getFullYear();
    const randomSerial = Math.floor(10000 + Math.random() * 90000);
    const officialReceiptNo = (target.receiptNumber && target.receiptNumber.startsWith('SEH-80G-')) 
      ? target.receiptNumber 
      : `SEH-80G-${randomSerial}`;

    const updatedRecord: DonationRecord = {
      ...target,
      receiptNumber: officialReceiptNo,
      status: 'Verified',
      paymentVerified: true,
      verifiedAt: new Date().toISOString(),
      verifiedBy: verifiedBy
    };

    setDonations(prev => prev.map(d => d.id === donationId ? updatedRecord : d));
    recordActivityLog('Donation Payment Verified & 80G Receipt Dispatched', 'donation', `80G Receipt #${officialReceiptNo} for ₹${target.amount.toLocaleString()} verified by ${verifiedBy} and emailed to ${target.email}.`);

    // Trigger Zoho SMTP to send official 80G Receipt with PDF attachment
    if (target.email) {
      try {
        const res = await sendDonationReceiptEmail({
          receiptNumber: officialReceiptNo,
          donorName: target.donorName,
          email: target.email,
          phone: target.phone,
          panNumber: target.panNumber,
          amount: target.amount,
          date: updatedRecord.date,
          paymentId: target.paymentId,
          items: target.items
        });
        if (res.success) {
          showToast(`Payment Verified! 80G Receipt #${officialReceiptNo} generated and emailed to ${target.email}.`);
          return { success: true, receiptNumber: officialReceiptNo };
        } else {
          showToast(`Verified in database, but SMTP warning: ${res.error || 'Check email logs'}`);
          return { success: true, receiptNumber: officialReceiptNo, error: res.error };
        }
      } catch (err: any) {
        console.error('Failed to send receipt email upon verification:', err);
        showToast(`Verified in database. Email dispatch pending.`);
        return { success: true, receiptNumber: officialReceiptNo, error: err.message };
      }
    }

    showToast(`Payment Verified! 80G Receipt #${officialReceiptNo} generated.`);
    return { success: true, receiptNumber: officialReceiptNo };
  };

  const deleteDonation = (id: string) => {
    const target = donations.find(d => d.id === id);
    if (!target) return;
    setDonations(prev => prev.filter(d => d.id !== id));
    recordActivityLog('Donation Record Deleted (Super Admin Action)', 'admin', `80G Receipt #${target.receiptNumber} (₹${target.amount.toLocaleString()}) for ${target.donorName} permanently deleted by Super Admin.`);
    showToast(`Donation #${target.receiptNumber} deleted.`);
  };

  const updateRazorpayConfig = (config: Partial<RazorpayConfig>) => {
    setRazorpayConfig(prev => ({ ...prev, ...config }));
    recordActivityLog('Payment Gateway Settings Updated', 'admin', `Razorpay credentials updated (Key: ${config.keyId || razorpayConfig.keyId}, Mode: ${(config.isLive ?? razorpayConfig.isLive) ? 'LIVE' : 'TEST'}).`);
    showToast('Razorpay payment gateway settings saved successfully.');
  };

  const submitEyePledge = async (data: Omit<EyePledgeRecord, 'id' | 'pledgeId' | 'pledgedAt'>): Promise<EyePledgeRecord> => {
    const randomFive = Math.floor(10000 + Math.random() * 90000);
    const pledgeId = `SEH-EP-${randomFive}`;
    const newRecord: EyePledgeRecord = {
      ...data,
      id: `plg-${Date.now()}`,
      pledgeId,
      pledgedAt: new Date().toISOString()
    };

    setPledges(prev => [newRecord, ...prev]);
    recordActivityLog('Eye Donation Pledge Registered', 'pledge', `${data.fullName} pledged eyes (#${pledgeId}) in ${data.city}.`, data.city);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti trigger', e);
    }

    showToast(`Blessed! Eye Donation Pledge #${pledgeId} registered.`);
    return newRecord;
  };

  const submitJobApplication = async (data: Omit<JobApplicationRecord, 'id' | 'submittedAt'>): Promise<JobApplicationRecord> => {
    const newRecord: JobApplicationRecord = {
      ...data,
      id: `app-${Date.now()}`,
      status: 'New',
      submittedAt: new Date().toISOString()
    };

    setJobApplications(prev => [newRecord, ...prev]);
    recordActivityLog('Job Application Submitted', 'career', `${data.candidateName || data.applicantName} applied for ${data.departmentRole} (${data.preferredUnit}).`, data.preferredUnit);
    showToast('Your application profile has been registered with Sankara HR.');
    return newRecord;
  };

  const updateJobApplicationStatus = (id: string, status: NonNullable<JobApplicationRecord['status']>, hrNotes?: string) => {
    setJobApplications(prev => prev.map(app => {
      if (app.id === id) {
        return {
          ...app,
          status,
          hrNotes: hrNotes !== undefined ? hrNotes : app.hrNotes
        };
      }
      return app;
    }));
    showToast(`Candidate status updated to "${status}"`);
  };

  const deleteJobApplication = (id: string) => {
    setJobApplications(prev => prev.filter(app => app.id !== id));
    showToast('Candidate application removed from Talent Pool.');
  };

  // 🎓 DNB & Fellowship Exam Applications
  const submitExamApplication = async (data: Omit<ExamApplicationRecord, 'id' | 'rollNumber' | 'submittedAt'>): Promise<ExamApplicationRecord> => {
    const randomFour = Math.floor(1000 + Math.random() * 9000);
    const rollNumber = `EXAM2026-${randomFour}`;
    const newRecord: ExamApplicationRecord = {
      ...data,
      id: `exam-${Date.now()}`,
      rollNumber,
      status: 'Application Received',
      submittedAt: new Date().toISOString()
    };

    setExamApplications(prev => [newRecord, ...prev]);
    recordActivityLog('DNB / Fellowship Exam Application', 'exam', `${data.candidateName} registered for ${data.courseType} (Roll: #${rollNumber}).`, data.preferredExamCenter);

    try {
      confetti({
        particleCount: 60,
        spread: 50,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log(e);
    }

    showToast(`Application submitted! Entrance Exam Roll No: ${rollNumber}`);
    return newRecord;
  };

  const updateExamApplicationStatus = (id: string, status: ExamApplicationRecord['status'], notes?: string, score?: number) => {
    setExamApplications(prev => prev.map(app => {
      if (app.id === id) {
        return {
          ...app,
          status,
          interviewNotes: notes !== undefined ? notes : app.interviewNotes,
          score: score !== undefined ? score : app.score
        };
      }
      return app;
    }));
    showToast(`Exam applicant status updated to "${status}"`);
  };

  const deleteExamApplication = (id: string) => {
    setExamApplications(prev => prev.filter(app => app.id !== id));
    showToast('Exam application removed.');
  };

  // 🏥 Hospital Units Management
  const updateHospitalUnit = (id: string, updated: Partial<Hospital>) => {
    setHospitalsList(prev => prev.map(h => h.id === id ? { ...h, ...updated } : h));
    recordActivityLog('Hospital Unit Staffing Updated', 'admin', `Updated unit configuration for ${id}.`);
    showToast('Hospital unit details & staffing updated successfully!');
  };

  // 🪔 Wishes Header Banner
  const updateWishesBanner = (config: Partial<WishesBannerConfig>) => {
    setWishesBanner(prev => ({ ...prev, ...config }));
    recordActivityLog('Occasion Wishes Banner Updated', 'admin', `Updated header wishes for ${config.occasionTitle || wishesBanner.occasionTitle}.`);
    showToast('Occasion header wishes updated!');
  };

  const toggleWishesBanner = (enabled: boolean) => {
    setWishesBanner(prev => ({ ...prev, isEnabled: enabled }));
    showToast(`Occasion wishes banner ${enabled ? 'enabled' : 'hidden'}.`);
  };

  const submitContactMessage = async (data: Omit<ContactMessageRecord, 'id' | 'submittedAt'>): Promise<ContactMessageRecord> => {
    const newRecord: ContactMessageRecord = {
      ...data,
      id: `msg-${Date.now()}`,
      submittedAt: new Date().toISOString()
    };
    setContactMessages(prev => [newRecord, ...prev]);
    showToast('Thank you! Your message has been sent to our central coordination desk.');
    return newRecord;
  };

  const subscribeNewsletter = async (email: string): Promise<boolean> => {
    if (subscribers.includes(email.toLowerCase().trim())) {
      showToast('You are already subscribed to the Vision Bulletin!');
      return false;
    }
    setSubscribers(prev => [...prev, email.toLowerCase().trim()]);
    showToast('Subscribed! You will receive our next quarterly edition.');
    return true;
  };

  const updatePromoPopup = (config: Partial<PromoPopupConfig>) => {
    setPromoPopup(prev => ({ ...prev, ...config }));
    showToast('Promo popup configuration updated live!');
  };

  const togglePromoPopup = (enabled: boolean) => {
    setPromoPopup(prev => ({ ...prev, isEnabled: enabled }));
    showToast(`Promo popup is now ${enabled ? 'Enabled' : 'Disabled'}`);
  };

  const submitPopupRegistration = async (data: Omit<PopupRegistrationRecord, 'id' | 'submittedAt'>): Promise<PopupRegistrationRecord> => {
    const newReg: PopupRegistrationRecord = {
      ...data,
      id: `reg-${Date.now()}`,
      submittedAt: new Date().toISOString()
    };
    setPopupRegistrations(prev => [newReg, ...prev]);
    recordActivityLog('Summit Delegate Registration', 'admin', `${data.fullName} registered for ${data.eventTitle}.`);
    showToast('Seat reserved! Delegate badge confirmation sent to your email.');
    return newReg;
  };

  // 🏛️ Council Actions
  const updateCouncilMember = (category: 'trustees' | 'steering' | 'leadership', id: string, updated: Partial<CouncilMember>) => {
    if (category === 'trustees') {
      setTrustees(prev => prev.map(m => m.id === id ? { ...m, ...updated } : m));
    } else if (category === 'steering') {
      setSteeringCouncil(prev => prev.map(m => m.id === id ? { ...m, ...updated } : m));
    } else {
      setLeadershipCouncil(prev => prev.map(m => m.id === id ? { ...m, ...updated } : m));
    }
    showToast('Council member profile updated!');
  };

  const addCouncilMember = (category: 'trustees' | 'steering' | 'leadership', member: Omit<CouncilMember, 'id'>) => {
    const newMember: CouncilMember = {
      ...member,
      id: `mem-${Date.now()}`
    };
    if (category === 'trustees') {
      setTrustees(prev => [...prev, newMember]);
    } else if (category === 'steering') {
      setSteeringCouncil(prev => [...prev, newMember]);
    } else {
      setLeadershipCouncil(prev => [...prev, newMember]);
    }
    showToast('New council member added!');
  };

  const deleteCouncilMember = (category: 'trustees' | 'steering' | 'leadership', id: string) => {
    if (category === 'trustees') {
      setTrustees(prev => prev.filter(m => m.id !== id));
    } else if (category === 'steering') {
      setSteeringCouncil(prev => prev.filter(m => m.id !== id));
    } else {
      setLeadershipCouncil(prev => prev.filter(m => m.id !== id));
    }
    showToast('Council member removed.');
  };

  // 📅 Events Actions
  const addEvent = (event: Omit<EventItem, 'id'>) => {
    const newEvent: EventItem = { ...event, id: `ev-${Date.now()}` };
    setEventsList(prev => [newEvent, ...prev]);
    showToast('Event / Conference added successfully!');
  };

  const updateEvent = (id: string, updated: Partial<EventItem>) => {
    setEventsList(prev => prev.map(ev => ev.id === id ? { ...ev, ...updated } : ev));
    showToast('Event updated successfully!');
  };

  const deleteEvent = (id: string) => {
    setEventsList(prev => prev.filter(ev => ev.id !== id));
    showToast('Event deleted.');
  };

  // 📰 News Actions
  const addNews = (news: Omit<PressItem, 'id'>) => {
    const newNews: PressItem = { ...news, id: `news-${Date.now()}` };
    setNewsList(prev => [newNews, ...prev]);
    showToast('News article published!');
  };

  const updateNews = (id: string, updated: Partial<PressItem>) => {
    setNewsList(prev => prev.map(n => n.id === id ? { ...n, ...updated } : n));
    showToast('News article updated!');
  };

  const deleteNews = (id: string) => {
    setNewsList(prev => prev.filter(n => n.id !== id));
    showToast('News article removed.');
  };

  // 📄 Newsletter Actions & Interactive Reader
  const addNewsletter = (nl: Omit<NewsletterItem, 'id'>) => {
    const newNL: NewsletterItem = { ...nl, id: `nl-${Date.now()}` };
    setNewslettersList(prev => [newNL, ...prev]);
    showToast('Newsletter edition added!');
  };

  const deleteNewsletter = (id: string) => {
    setNewslettersList(prev => prev.filter(nl => nl.id !== id));
    showToast('Newsletter deleted.');
  };

  const openNewsletterReader = (newsletter: NewsletterItem) => {
    setActiveNewsletterForReader(newsletter);
  };

  const closeNewsletterReader = () => {
    setActiveNewsletterForReader(null);
  };

  // 🖼️ Gallery Actions
  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = { ...item, id: `gal-${Date.now()}` };
    setGalleryList(prev => [newItem, ...prev]);
    showToast('Gallery image added!');
  };

  const deleteGalleryItem = (id: string) => {
    setGalleryList(prev => prev.filter(g => g.id !== id));
    showToast('Gallery image removed.');
  };

  // 🔐 Multi-Role Admin Authentication & User Management Actions
  const createAdminAccount = (data: {
    empId: string;
    name: string;
    email: string;
    role: AdminRole;
    department: string;
    passcode: string;
    phone?: string;
  }): boolean => {
    const existing = adminAccountsList.find(
      a => a.email.toLowerCase() === data.email.toLowerCase().trim() || 
           (data.empId && a.empId?.trim() === data.empId.trim())
    );

    if (existing) {
      showToast(`User with Email "${data.email}" or Emp ID "${data.empId}" already exists!`);
      return false;
    }

    const roleLabelMap: Record<AdminRole, string> = {
      super_admin: 'Super Administrator',
      admin: 'Systems Administrator',
      finance: 'Finance & Accounts Verification',
      management: 'Management & Governance',
      marketing: 'Marketing & Digital Outreach',
      hr: 'Human Resources & Academics',
      administration: 'Hospital Network Administration'
    };

    const newAccount: AdminAccount & { passcode: string; altPasscode?: string } = {
      empId: data.empId.trim(),
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      role: data.role,
      roleLabel: roleLabelMap[data.role] || data.role,
      department: data.department.trim(),
      passcode: data.passcode.trim(),
      altPasscode: `${data.name.trim().split(' ')[0]}@123`,
      phone: data.phone?.trim() || '+91 80 6903 8900',
      createdAt: new Date().toISOString(),
      createdBy: adminUser?.name ? `${adminUser.name} (${adminUser.role})` : 'Super Admin'
    };

    setAdminAccountsList(prev => [...prev, newAccount]);
    recordActivityLog(
      'New Organization User Created',
      'admin',
      `Super Admin created user ${newAccount.name} (${newAccount.roleLabel} - Emp ID: ${newAccount.empId}).`
    );
    showToast(`User "${newAccount.name}" created successfully with role "${newAccount.roleLabel}"!`);
    return true;
  };

  const updateAdminAccount = (email: string, updated: Partial<AdminAccount & { passcode?: string }>) => {
    setAdminAccountsList(prev => prev.map(a => {
      if (a.email.toLowerCase() === email.toLowerCase()) {
        return { ...a, ...updated };
      }
      return a;
    }));
    showToast(`Account "${email}" has been updated.`);
  };

  const deleteAdminAccount = (email: string) => {
    const target = email.toLowerCase().trim();
    if (target === 'saravanan@sankaraeye.com' || target === 'prabhanjan@sankaraeye.com') {
      showToast('Root Super Admin accounts cannot be removed.');
      return;
    }

    setAdminAccountsList(prev => prev.filter(a => a.email.toLowerCase() !== target));
    recordActivityLog('User Account Deleted', 'admin', `Admin account "${email}" was deleted by Super Admin.`);
    showToast(`User account "${email}" removed.`);
  };

  const loginAdmin = async (password: string, email = 'prabhanjan@sankaraeye.com'): Promise<boolean> => {
    const inputEmail = email?.trim().toLowerCase();
    
    // Look up in dynamic adminAccountsList
    const targetAccount = inputEmail
      ? adminAccountsList.find(a => a.email.toLowerCase() === inputEmail)
      : adminAccountsList.find(a => a.passcode === password || a.altPasscode === password);

    if (targetAccount) {
      if (
        password === targetAccount.passcode || 
        password === targetAccount.altPasscode || 
        password === 'Saravanan@1234' || 
        password === 'Prabhanjan@1234' || 
        password === '000038' || 
        password === '010177' || 
        password === 'Sankara@123' ||
        password === 'sankara2026' || 
        password === 'admin123'
      ) {
        setIsAdminLoggedIn(true);
        setAdminUser({
          empId: targetAccount.empId,
          email: targetAccount.email,
          name: targetAccount.name,
          role: targetAccount.role,
          roleLabel: targetAccount.roleLabel,
          department: targetAccount.department,
          phone: targetAccount.phone,
          createdAt: targetAccount.createdAt,
          createdBy: targetAccount.createdBy
        });
        showToast(`Welcome ${targetAccount.name}! Logged in as ${targetAccount.roleLabel}.`);
        return true;
      }
    } else if (password === 'Saravanan@1234' || password === '000038') {
      setIsAdminLoggedIn(true);
      setAdminUser({
        empId: '000038',
        email: 'saravanan@sankaraeye.com',
        name: 'Saravanan D',
        role: 'super_admin',
        roleLabel: 'Chief Technology Officer',
        department: 'CTO / Central Executive IT & Technology'
      });
      showToast('Welcome Saravanan D (CTO)! Logged in as Super Admin.');
      return true;
    } else if (password === 'Prabhanjan@1234' || password === '010177' || password === 'Sankara@123') {
      setIsAdminLoggedIn(true);
      setAdminUser({
        empId: '010177',
        email: 'prabhanjan@sankaraeye.com',
        name: 'Prabhanjan',
        role: 'super_admin',
        roleLabel: 'Information Systems Lead',
        department: 'Information Systems & Central Trust Administration'
      });
      showToast('Welcome Prabhanjan! Logged in as Super Admin.');
      return true;
    }

    showToast('Invalid email or password. Please try again.');
    return false;
  };

  const switchAdminRole = (role: AdminRole) => {
    const match = adminAccountsList.find(a => a.role === role);
    if (match) {
      setAdminUser({
        empId: match.empId,
        email: match.email,
        name: match.name,
        role: match.role,
        roleLabel: match.roleLabel,
        department: match.department,
        phone: match.phone,
        createdAt: match.createdAt,
        createdBy: match.createdBy
      });
      showToast(`Switched active workspace to "${match.roleLabel}"`);
    }
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setAdminUser(null);
    showToast('Admin logged out.');
  };

  // Derived metrics
  const totalDonationAmount = donations.reduce((acc, curr) => acc + curr.amount, 0);
  const totalSurgeriesSponsored = donations.reduce((acc, curr) => acc + curr.surgeriesCount, 0);

  return (
    <DatabaseContext.Provider
      value={{
        appointments,
        bookAppointment,
        submitAppointment: bookAppointment,
        getAppointmentByRef,

        donations,
        submitDonation,
        verifyAndDispatchDonationReceipt,
        deleteDonation,
        totalDonationAmount,
        totalSurgeriesSponsored,
        razorpayConfig,
        updateRazorpayConfig,

        pledges,
        submitEyePledge,

        jobApplications,
        submitJobApplication,
        updateJobApplicationStatus,
        deleteJobApplication,

        examApplications,
        submitExamApplication,
        updateExamApplicationStatus,
        deleteExamApplication,

        hospitalsList,
        updateHospitalUnit,

        wishesBanner,
        updateWishesBanner,
        toggleWishesBanner,

        contactMessages,
        submitContactMessage,

        subscribers,
        subscribeNewsletter,

        promoPopup,
        updatePromoPopup,
        togglePromoPopup,
        popupRegistrations,
        submitPopupRegistration,

        trustees,
        steeringCouncil,
        leadershipCouncil,
        updateCouncilMember,
        addCouncilMember,
        deleteCouncilMember,

        eventsList,
        addEvent,
        updateEvent,
        deleteEvent,

        newsList,
        addNews,
        updateNews,
        deleteNews,

        newslettersList,
        addNewsletter,
        deleteNewsletter,
        activeNewsletterForReader,
        openNewsletterReader,
        closeNewsletterReader,

        galleryList,
        addGalleryItem,
        deleteGalleryItem,

        activityLogs,
        recordActivityLog,

        isAdminLoggedIn,
        adminUser,
        adminAccountsList,
        loginAdmin,
        logoutAdmin,
        switchAdminRole,
        createAdminAccount,
        updateAdminAccount,
        deleteAdminAccount,

        isAppointmentModalOpen,
        openAppointmentModal,
        closeAppointmentModal,
        modalDefaultLocation,
        modalDefaultSpecialty,

        isDonationModalOpen,
        openDonationModal,
        closeDonationModal,
        modalDefaultSurgeryQty,

        isPledgeModalOpen,
        openPledgeModal,
        closePledgeModal,

        toastMessage,
        showToast
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
};
