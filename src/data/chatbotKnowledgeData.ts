export interface ChatbotResponse {
  keywords: string[];
  title: string;
  response: string;
  quickActions?: {
    label: string;
    actionType: 'appointment' | 'whatsapp' | 'call' | 'navigate' | 'pledge' | 'query';
    payload?: string;
  }[];
  category: 'clinical' | 'booking' | 'eyebank' | 'charity' | 'insurance' | 'hospital' | 'emergency' | 'education' | 'general';
}

export const WHATSAPP_CONTACT_NUMBER = '919952890087';
export const WHATSAPP_DEFAULT_URL = `https://wa.me/${WHATSAPP_CONTACT_NUMBER}?text=Hello%20Sankara%20Eye%20Hospital,%20I%20would%20like%20assistance%20with%20eye%20care%20services.`;

export const CHATBOT_KNOWLEDGE_BASE: ChatbotResponse[] = [
  // 1. LASIK & Laser Vision Correction
  {
    keywords: ['lasik', 'specs', 'specs removal', 'smile', 'transprk', 'smartsurface', 'schwind', 'amaris', 'contoura', 'refractive', 'glasses removal', 'laser surgery', 'laser vision'],
    title: 'LASIK & Blade-Free Laser Vision Correction',
    response: 'Sankara Eye Hospital offers South India’s most advanced German SCHWIND AMARIS 1050RS 7D eye-tracking laser suites and SMILE Pro for blade-free vision correction. Procedures include Touch-Free SmartSurface (TransPRK), Customized Contoura LASIK, and PresbyMAX. Candidates must be 18+ years with a stable eye power for at least 1 year.',
    quickActions: [
      { label: '📅 Book LASIK Evaluation OPD', actionType: 'appointment', payload: 'Bangalore' },
      { label: '💬 Chat on WhatsApp (+91 99528 90087)', actionType: 'whatsapp', payload: 'https://wa.me/919952890087?text=Hi,%20I%20am%20interested%20in%20LASIK%20specs%20removal%20consultation.' },
      { label: 'Explore Laser Department', actionType: 'navigate', payload: '/specialties/lasik-laser-vision-correction' }
    ],
    category: 'clinical'
  },

  // 2. Cataract & Robotic Laser (FLACS)
  {
    keywords: ['cataract', 'motiyabind', 'flacs', 'phaco', 'mics', 'lens', 'iol', 'cloudy vision', 'foggy vision', 'cataract surgery', 'multifocal', 'toric', 'edof'],
    title: 'Cataract Surgery & Premium Robotic Laser (FLACS)',
    response: 'We perform Femtosecond Laser-Assisted Cataract Surgery (FLACS) and Micro-Incision Phacoemulsification (MICS) with a stitchless 2.2mm micro-incision. Lens choices include Monofocal, Astigmatism-correcting Toric, Trifocal, and Extended Depth of Focus (EDOF) IOLs. For rural and underprivileged patients, cataract surgery is performed 100% FREE under our Unique Hybrid Model (Gift of Vision).',
    quickActions: [
      { label: '📅 Book Cataract Consultation', actionType: 'appointment', payload: 'Bangalore' },
      { label: '💬 WhatsApp Cataract Desk', actionType: 'whatsapp', payload: 'https://wa.me/919952890087?text=Hi,%20I%20want%20to%20consult%20for%20Cataract%20evaluation%20and%20lens%20options.' },
      { label: 'View Cataract Department', actionType: 'navigate', payload: '/specialties/cataract-services' }
    ],
    category: 'clinical'
  },

  // 3. Eye Donation & Sri Jayendra Eye Bank (24/7 Protocol)
  {
    keywords: ['eye donation', 'donate eyes', 'eye bank', 'cornea donation', 'death', 'demise', 'pledge', 'pledge eyes', 'sri jayendra', 'donate eye', 'dead'],
    title: '24/7 Eye Donation Protocol & Sri Jayendra Eye Bank',
    response: 'Eye donation must occur within 6 hours of demise. Anyone can donate eyes regardless of age, sex, blood group, spectacles, or prior cataract surgery.\n\n⚠️ Immediate Steps for Family:\n1. Close the donor’s eyelids and place moist clean cotton.\n2. Switch off overhead fans.\n3. Elevate head with a pillow.\n4. Call our 24/7 Eye Bank immediately at 080-28542727 or 7619519555 (Bangalore) / 9965511174 (Coimbatore).',
    quickActions: [
      { label: '📞 Call 24/7 Eye Bank Helpline (080-28542727)', actionType: 'call', payload: '08028542727' },
      { label: '🪔 Pledge Your Eyes Online', actionType: 'pledge' },
      { label: '💬 WhatsApp Eye Bank Coordinator', actionType: 'whatsapp', payload: 'https://wa.me/919952890087?text=Urgent:%20Eye%20Donation%20Inquiry%20for%20Sri%20Jayendra%20Eye%20Bank.' }
    ],
    category: 'eyebank'
  },

  // 4. Appointment Booking & Doctor Consultations
  {
    keywords: ['appointment', 'book', 'doctor', 'consultation', 'opd', 'schedule', 'visit', 'timing', 'hospital timing', 'working hours', 'doctor list', 'fees'],
    title: 'Outpatient (OPD) Appointment Booking & Timings',
    response: 'General OPD Timings: Monday to Saturday, 8:30 AM to 6:00 PM. Emergency and Eye Bank services operate 24/7.\nYou can book your priority appointment directly online, select your preferred hospital branch, specialist doctor, and time slot with instant SMS and WhatsApp confirmation.',
    quickActions: [
      { label: '📅 Book Online OPD Appointment', actionType: 'appointment' },
      { label: '💬 Book via WhatsApp (+91 99528 90087)', actionType: 'whatsapp', payload: 'https://wa.me/919952890087?text=Hi,%20I%20would%20like%20to%20book%20an%20eye%20consultation%20appointment.' },
      { label: 'View All 14 Hospitals', actionType: 'navigate', payload: '/hospitals' }
    ],
    category: 'booking'
  },

  // 5. Insurance & Cashless TPAs
  {
    keywords: ['insurance', 'tpa', 'cashless', 'mediclaim', 'ayushman', 'pmjay', 'cghs', 'echs', 'star health', 'icici', 'hdfc ergo', 'care', 'medi assist', 'vidal', 'reimbursement'],
    title: 'Cashless Insurance & Government Health Schemes',
    response: 'Sankara Eye Hospitals are empaneled with all leading private insurance TPAs (Star Health, ICICI Lombard, HDFC ERGO, Care Health, Niva Bupa, Medi Assist, Vidal Health, Paramount, MD India, Heritage) and Government Schemes (Ayushman Bharat PM-JAY, CGHS, ECHS, ESI, and State Health Schemes). Please bring your Insurance Card, Policy Copy, and Aadhaar Card to the TPA Helpdesk on the ground floor.',
    quickActions: [
      { label: '💬 Check Cashless Pre-Auth on WhatsApp', actionType: 'whatsapp', payload: 'https://wa.me/919952890087?text=Hi,%20I%20have%20an%20insurance/TPA%20query%20for%20cashless%20treatment.' },
      { label: '📅 Book Appointment with Insurance', actionType: 'appointment' }
    ],
    category: 'insurance'
  },

  // 6. Free Eye Care & Gift of Vision (Unique Hybrid Model)
  {
    keywords: ['free', 'free surgery', 'poor', 'charity', 'donation', '80g', 'gift of vision', 'rural', 'camp', 'sponsor', 'cost', 'free eye test'],
    title: 'Gift of Vision — Unique Hybrid Model & 80G Tax Exemption',
    response: 'Sankara operates on an innovative Unique Hybrid Model: surgical care is provided completely FREE to underprivileged rural citizens, fully cross-subsidized by paying patients. Over 2.6 Million free surgeries have been performed. Sponsoring a free sight-restoring surgery costs just ₹3,000 and is 100% 80G tax-exempt in India.',
    quickActions: [
      { label: '💝 Sponsor a Free Surgery (80G Tax Exempt)', actionType: 'navigate', payload: '/gift-of-vision' },
      { label: '💬 Connect with Donor Care Desk', actionType: 'whatsapp', payload: 'https://wa.me/919952890087?text=Hi,%20I%20would%20like%20to%20donate/sponsor%20surgeries%20under%20Gift%20of%20Vision.' }
    ],
    category: 'charity'
  },

  // 7. Paediatric Eye Care & Rainbow Program
  {
    keywords: ['child', 'pediatric', 'paediatric', 'kid', 'squint', 'strabismus', 'lazy eye', 'amblyopia', 'rainbow', 'school', 'baby', 'congenital'],
    title: 'Paediatric Ophthalmology, Squint & Rainbow Program',
    response: 'Our specialized Paediatric Department provides child-friendly eye examinations, infant cataract surgery, squint (strabismus) alignment, and computer-assisted lazy eye (amblyopia) therapy. Under our Rainbow School Screening Program, over 1.8 Million rural school children have been screened and provided free spectacles.',
    quickActions: [
      { label: '📅 Book Paediatric Appointment', actionType: 'appointment' },
      { label: '💬 Consult Paediatric Coordinator on WhatsApp', actionType: 'whatsapp', payload: 'https://wa.me/919952890087?text=Hi,%20I%20need%20to%20consult%20for%20my%20child%20(Paediatric%20Eye%20Care).' },
      { label: 'View Paediatric Department', actionType: 'navigate', payload: '/specialties/paediatric-ophthalmology' }
    ],
    category: 'clinical'
  },

  // 8. Glaucoma & Pressure in Eye
  {
    keywords: ['glaucoma', 'eye pressure', 'iop', 'optic nerve', 'kala motia', 'visual field', 'oct', 'slt', 'trabeculectomy'],
    title: 'Glaucoma — Silent Thief of Sight & Early Detection',
    response: 'Glaucoma causes progressive, irreversible damage to the optic nerve often without pain or early symptoms. We provide advanced Non-Contact Tonometry, Pachymetry, Humphrey Visual Field (HVF) analysis, Spectral Domain OCT, Selective Laser Trabeculoplasty (SLT), and Trabeculectomy / Ahmed Valve surgery. Regular screening is vital for individuals over 40 or with a family history.',
    quickActions: [
      { label: '📅 Schedule Glaucoma Screening', actionType: 'appointment' },
      { label: '💬 WhatsApp Glaucoma Clinic', actionType: 'whatsapp', payload: 'https://wa.me/919952890087?text=Hi,%20I%20would%20like%20to%20book%20a%20Glaucoma%20and%20Eye%20Pressure%20screening.' },
      { label: 'View Glaucoma Services', actionType: 'navigate', payload: '/specialties/glaucoma-services' }
    ],
    category: 'clinical'
  },

  // 9. Vitreo-Retina & Diabetic Retinopathy
  {
    keywords: ['retina', 'diabetic retinopathy', 'diabetes', 'floaters', 'flashes', 'retinal detachment', 'macular', 'anti vegf', 'injections', 'vitrectomy'],
    title: 'Vitreo-Retina & Diabetic Eye Care',
    response: 'Our Retina department handles Diabetic Retinopathy, Age-Related Macular Degeneration (AMD), Retinal Vein Occlusion, Retinal Detachment, and Macular Holes using 25G/27G sutureless vitrectomy (MIVS), green retinal lasers, and Anti-VEGF injections (Accentrix, Lucentis, Eylea). Diabetics should undergo a dilated retinal exam every 6 to 12 months.',
    quickActions: [
      { label: '📅 Book Retina Specialist OPD', actionType: 'appointment' },
      { label: '💬 WhatsApp Retina Clinic', actionType: 'whatsapp', payload: 'https://wa.me/919952890087?text=Hi,%20I%20need%20a%20consultation%20with%20a%20Vitreo-Retina%20Specialist.' },
      { label: 'Explore Retina Department', actionType: 'navigate', payload: '/specialties/vitreo-retina' }
    ],
    category: 'clinical'
  },

  // 10. Emergency & Eye Trauma 24/7
  {
    keywords: ['emergency', 'injury', 'chemical', 'acid', 'accident', 'trauma', 'sudden blindness', 'severe pain', 'red eye', 'cut', 'foreign body'],
    title: '🚨 24/7 Ocular Emergency & Casualty Guidance',
    response: 'For chemical injuries (acid/alkali splash): Wash the eye with clean running water continuously for 15-20 minutes. Do NOT rub the eye.\n\nFor sudden vision loss, sharp trauma, or severe eye pain, visit our 24/7 Emergency Casualty immediately. 24/7 Emergency hotlines:\n• Bangalore: 080-69038900 / 7619519555\n• Coimbatore: 0422-3116789 / 9965511174\n• Varanasi: 0542-2980000',
    quickActions: [
      { label: '📞 Call Bangalore Emergency (080-69038900)', actionType: 'call', payload: '08069038900' },
      { label: '📞 Call Coimbatore Emergency (0422-3116789)', actionType: 'call', payload: '04223116789' },
      { label: '💬 Emergency WhatsApp Support', actionType: 'whatsapp', payload: 'https://wa.me/919952890087?text=EMERGENCY:%20I%20have%20an%20urgent%20eye%20trauma/injury%20query.' }
    ],
    category: 'emergency'
  },

  // 11. Hospital Network Locations & Addresses
  {
    keywords: ['location', 'where', 'address', 'bangalore', 'coimbatore', 'varanasi', 'guntur', 'shimoga', 'anand', 'ludhiana', 'kanpur', 'indore', 'jaipur', 'panvel', 'hyderabad', 'branches'],
    title: '14 Super-Specialty Eye Hospitals Across India',
    response: 'Sankara Eye Hospital operates 14 super-specialty tertiary centres in 9 Indian states: Bangalore (Varthur Rd), Coimbatore (Saravanampatti & RS Puram), Varanasi (RJ Sankara), Guntur, Shimoga, Anand (Gujarat), Ludhiana (Punjab), Kanpur, Indore, Jaipur, Panvel (Mumbai), and Hyderabad.',
    quickActions: [
      { label: '📍 View All Hospital Locations & Doctors', actionType: 'navigate', payload: '/hospitals' },
      { label: '📅 Book at Nearest Hospital', actionType: 'appointment' },
      { label: '💬 WhatsApp Nearest Unit', actionType: 'whatsapp', payload: 'https://wa.me/919952890087?text=Hi,%20I%20want%20to%20find%20the%20nearest%20Sankara%20hospital%20to%20my%20city.' }
    ],
    category: 'hospital'
  },

  // 12. Academic Admissions & DNB Fellowships
  {
    keywords: ['dnb', 'fellowship', 'optometry', 'college', 'course', 'admission', 'exam', 'entrance', 'education', 'msc', 'bsc'],
    title: 'Sankara Academy of Vision & Admissions',
    response: 'Sankara Academy of Vision conducts NBE-accredited DNB Ophthalmology Residency, Sub-specialty Surgical Fellowships (Cornea, Retina, Paediatrics, Glaucoma), and B.Sc/M.Sc Optometry degrees with 100% placement and over 2,000 hours of clinical diagnostic exposure.',
    quickActions: [
      { label: '🎓 Apply for Entrance Exam 2026', actionType: 'navigate', payload: '/education' },
      { label: '💬 WhatsApp Admissions Desk', actionType: 'whatsapp', payload: 'https://wa.me/919952890087?text=Hi,%20I%20have%20an%20inquiry%20regarding%20DNB/Optometry%20Admissions%202026.' }
    ],
    category: 'education'
  },

  // 13. Conversational Greetings & AI Identity
  {
    keywords: ['how are you', 'how r u', 'how do you do', 'good morning', 'good afternoon', 'good evening', 'hi', 'hello', 'hey', 'namaste', 'vanakkam', 'who are you', 'what can you do', 'tell me about yourself', 'bot'],
    title: 'Namaste! Greetings from Dr. Sankara AI',
    response: 'Namaste! 🙏 I am doing very well, thank you. I am **Dr. Sankara AI**, powered by NVIDIA Nemotron, representing Sri Kanchi Kamakoti Medical Trust.\n\nI am here to assist you with eye health queries, OPD appointments across our 14 hospital units, LASIK specifications, cataract surgery, 24/7 Eye Donation protocols, and cashless insurance. How can I help care for your eyes today?',
    quickActions: [
      { label: '📅 Book OPD Appointment', actionType: 'appointment' },
      { label: '👁️ LASIK Laser Specs Removal', actionType: 'navigate', payload: '/services/lasik' },
      { label: '🔬 Cataract Surgery & Lenses', actionType: 'navigate', payload: '/services' },
      { label: '💬 Chat on WhatsApp (+91 99528 90087)', actionType: 'whatsapp', payload: WHATSAPP_DEFAULT_URL }
    ],
    category: 'general'
  },

  // 14. Founders & Institutional Heritage
  {
    keywords: ['founder', 'who founded', 'dr rv ramani', 'radha ramani', 'history', 'story', 'established', '1977', 'padma shri', 'trustee', 'kanchi kamakoti'],
    title: 'Founders & Heritage of Sankara Eye Foundation',
    response: 'Sankara Eye Hospital was founded in 1977 by **Dr. R.V. Ramani (Padma Shri Awardee)** and **Dr. Radha Ramani** in Coimbatore, Tamil Nadu. Operating under the sacred guidance of Sri Kanchi Kamakoti Medical Trust, they pioneered the globally celebrated **Unique Hybrid Healthcare Model**, touching over 60 million lives and eradicating curable blindness across India.',
    quickActions: [
      { label: '📖 Read Founder Story', actionType: 'navigate', payload: '/about' },
      { label: '🪔 Sponsor a Free Surgery (₹3,000)', actionType: 'navigate', payload: '/donate' },
      { label: '📍 Explore 14 Hospital Units', actionType: 'navigate', payload: '/hospitals' }
    ],
    category: 'hospital'
  },

  // 15. Pricing, Tariff & Free Treatment Policy
  {
    keywords: ['cost', 'price', 'fee', 'charge', 'rate', 'how much', 'expensive', 'free', 'tariff', 'discount'],
    title: 'Transparent Tariffs & Unique Hybrid Non-Profit Pricing',
    response: 'As a public charitable trust, Sankara operates on a **Unique Hybrid Model**:\n• **Needy & Rural Patients:** Receive 100% FREE eye surgery, satvik meals, and transport under our Gift of Vision initiative.\n• **Paying Patients:** Receive world-class tertiary eye care at subsidized, transparent rates with 0% interest EMI financing and 50+ Cashless TPA insurance options.',
    quickActions: [
      { label: '📅 Book OPD Consultation', actionType: 'appointment' },
      { label: '💳 View Cashless Insurance TPAs', actionType: 'navigate', payload: '/contact' },
      { label: '💬 Inquire Exact Package on WhatsApp', actionType: 'whatsapp', payload: 'https://wa.me/919952890087?text=Hi,%20I%20would%20like%20to%20inquire%20about%20treatment%20costs%20and%20insurance.' }
    ],
    category: 'general'
  },

  // 16. Nutrition, Diet & Eye Health
  {
    keywords: ['food', 'diet', 'nutrition', 'vitamin', 'carrots', 'eat', 'improve eyesight', 'supplement', 'omega', 'lutein'],
    title: 'Nutrition & Dietary Habits for Optimal Eye Health',
    response: 'To preserve macular health and protect against oxidative damage, ophthalmologists recommend:\n• **Vitamin A & Beta-Carotene:** Carrots, sweet potatoes, papaya, and mangoes prevent night blindness.\n• **Lutein & Zeaxanthin:** Spinach, kale, broccoli, and greens protect the retina from harmful blue light.\n• **Omega-3 Fatty Acids:** Flaxseeds, chia seeds, walnuts, and fish alleviate dry eye syndrome.\n• **Vitamin C & E:** Citrus fruits, amla, almonds, and sunflower seeds slow cataract progression.\n\n*Clinical Tip:* Nutritional support maintains healthy eyes, but regular dilated eye examinations are essential for early detection of refractive errors or retinal conditions.',
    quickActions: [
      { label: '📅 Schedule Preventive Eye Checkup', actionType: 'appointment' },
      { label: '👁️ Explore Retina Department', actionType: 'navigate', payload: '/services' },
      { label: '💬 Consult Diet & Eye Care Specialist', actionType: 'whatsapp', payload: WHATSAPP_DEFAULT_URL }
    ],
    category: 'clinical'
  },

  // 17. Digital Eye Strain & Computer Vision Syndrome
  {
    keywords: ['screen', 'computer', 'mobile', 'strain', 'dry eye', 'headache', 'tired', 'blur', 'digital', 'working hours', '20-20-20'],
    title: 'Digital Eye Strain & 20-20-20 Protection Guidelines',
    response: 'Extended screen time reduces your natural blink rate by 60%, leading to tear film evaporation and digital fatigue.\n\n**Ophthalmic Ergonomic Recommendations:**\n1. **The 20-20-20 Rule:** Every 20 minutes, gaze at an object 20 feet away for at least 20 seconds.\n2. **Conscious Blinking:** Blink fully 15–20 times every hour.\n3. **Screen Positioning:** Keep displays 20–28 inches away and slightly below eye level.\n4. **Preservative-Free Lubricants:** Use lubricating eye drops as prescribed by our cornea and ocular surface specialists.',
    quickActions: [
      { label: '📅 Book Dry Eye / Screen Strain OPD', actionType: 'appointment' },
      { label: '👓 Explore Blue-Cut & Specs Removal', actionType: 'navigate', payload: '/services/lasik' },
      { label: '💬 WhatsApp Counseling Desk', actionType: 'whatsapp', payload: WHATSAPP_DEFAULT_URL }
    ],
    category: 'clinical'
  },

  // 18. Glaucoma (The Silent Sight Thief)
  {
    keywords: ['glaucoma', 'eye pressure', 'iop', 'optic nerve', 'kala motiya', 'tunnel vision', 'field loss', 'trabeculectomy'],
    title: 'Glaucoma Detection & Non-Invasive Laser Therapy',
    response: 'Glaucoma is characterized by elevated intraocular pressure (IOP) damaging the optic nerve, often without early warning symptoms.\n\n**Sankara Glaucoma Protocol:**\n• Comprehensive Applanation Tonometry & Pachymetry\n• Humphrey Visual Field (HVF) Perimetry & RNFL OCT\n• Selective Laser Trabeculoplasty (SLT) & Micro-Invasive Glaucoma Surgeries (MIGS)\n• Advanced Valve Implants (Ahmed Glaucoma Valve) for refractory cases.',
    quickActions: [
      { label: '📅 Book Glaucoma Screening OPD', actionType: 'appointment' },
      { label: '📍 Find Nearest Glaucoma Unit', actionType: 'navigate', payload: '/hospitals' },
      { label: '💬 WhatsApp Glaucoma Clinic', actionType: 'whatsapp', payload: WHATSAPP_DEFAULT_URL }
    ],
    category: 'clinical'
  }
];

export function findChatbotResponse(userQuery: string): ChatbotResponse {
  const q = userQuery.toLowerCase().trim();

  // Handle common greetings first
  const greetingPhrases = ['hi', 'hello', 'hey', 'namaste', 'vanakkam', 'how are you', 'how r u', 'who are you'];
  if (greetingPhrases.some(g => q === g || q.startsWith(g + ' ') || q.endsWith(' ' + g))) {
    const greetingItem = CHATBOT_KNOWLEDGE_BASE.find(k => k.keywords.includes('how are you'));
    if (greetingItem) return greetingItem;
  }

  // Score each entry
  let bestMatch: ChatbotResponse | null = null;
  let highestScore = 0;

  for (const item of CHATBOT_KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of item.keywords) {
      if (q.includes(kw)) {
        score += kw.length * 2; // longer matching keywords have higher weight
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && highestScore > 0) {
    return bestMatch;
  }

  // Universal Synthesis: If query is open-ended, generate a helpful answer combining medical context + Sankara care
  return {
    keywords: [],
    title: 'Dr. Sankara AI — Universal Health Guidance',
    response: `Thank you for your question. Regarding **"${userQuery.trim()}"**:\n\nSankara Eye Hospital's medical faculty emphasizes that visual health, ocular wellness, and preventive screening are integral to overall well-being. Across our 14 NABH-accredited super-specialty units in India, our doctors provide:\n• Comprehensive sub-specialty examinations (Cornea, Retina, Pediatric, Glaucoma, Refractive LASIK).\n• German SCHWIND AMARIS 7D Laser and Robotic Cataract FLACS suites.\n• Subsidized tariffs for paying patients and 100% FREE surgery for needy rural citizens under our Unique Hybrid Model.\n\nWould you like to consult a senior ophthalmologist or schedule a priority outpatient OPD slot?`,
    quickActions: [
      { label: '📅 Book OPD Appointment', actionType: 'appointment' },
      { label: '👓 Explore LASIK & Surgery', actionType: 'navigate', payload: '/services/lasik' },
      { label: '📍 Find Nearest Hospital Unit', actionType: 'navigate', payload: '/hospitals' },
      { label: '💬 Chat on WhatsApp (+91 99528 90087)', actionType: 'whatsapp', payload: WHATSAPP_DEFAULT_URL }
    ],
    category: 'general'
  };
}
