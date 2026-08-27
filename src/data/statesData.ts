export interface HospitalUnit {
  district: string;
  unitName: string;
  address: string;
  status: string;
  specialties: string[];
  isUpcoming?: boolean;
}

export interface StateInfo {
  code: string;
  name: string;
  status: 'operational' | 'upcoming' | 'outreach';
  statusBadge: string;
  hospitalCount: number;
  districtsCovered: string[];
  units: HospitalUnit[];
  hospitals: string[];
  accreditationBadge: string;
  freeSurgeriesShare: string;
  description: string;
  pinCoordinates?: { x: number; y: number };
  districtPins?: { district: string; x: number; y: number }[];
}

export const STATES_DATABASE: Record<string, StateInfo> = {
  INTN: {
    code: 'INTN',
    name: 'Tamil Nadu',
    status: 'operational',
    statusBadge: 'Birthplace & Mission Head Quarters',
    hospitalCount: 2,
    districtsCovered: ['Coimbatore District', 'Virudhunagar District'],
    units: [
      {
        district: 'Coimbatore District',
        unitName: 'Sankara Eye Hospital, Coimbatore (Mission Head Quarters & DNB Academy)',
        address: 'Sivanandapuram, Sathy Road, Coimbatore - 641035',
        status: 'NABH Accredited Mission Head Quarters',
        specialties: ['Cataract & Premium IOL', 'Cornea Transplants', 'Vitreoretina', 'Pediatric Ophthalmology', 'Glaucoma', 'Oculoplasty']
      },
      {
        district: 'Virudhunagar District',
        unitName: 'Sankara Eye Hospital, Krishnankoil',
        address: 'NH 744, Krishnankoil, Srivilliputhur Taluk - 626126',
        status: 'Super-Specialty Rural Center',
        specialties: ['High-Volume Cataract', 'Rural Outreach Screening', 'General Ophthalmology']
      }
    ],
    hospitals: [
      'Coimbatore Mission Head Quarters (Tertiary Hub & DNB Academy)',
      'Krishnankoil (Rural Super-Specialty Unit)'
    ],
    accreditationBadge: '100% NABH Accredited',
    freeSurgeriesShare: '85% Free Rural Care',
    description: 'The historic founding state of Sankara Eye Hospital (May 1977). Features our Coimbatore Mission Head Quarters 500-capacity base hospital, DNB ophthalmic fellowship academy, and mobile rural retina screening fleets covering all districts of Tamil Nadu.',
    pinCoordinates: { x: 379.6, y: 835.6 },
    districtPins: [
      { district: 'Coimbatore Mission Head Quarters', x: 360, y: 840 },
      { district: 'Virudhunagar (Krishnankoil)', x: 375, y: 880 }
    ]
  },
  INKA: {
    code: 'INKA',
    name: 'Karnataka',
    status: 'operational',
    statusBadge: 'Operational Tertiary Hubs',
    hospitalCount: 2,
    districtsCovered: ['Bengaluru Urban District', 'Shivamogga (Shimoga) District'],
    units: [
      {
        district: 'Bengaluru Urban District',
        unitName: 'Sankara Eye Hospital, Bangalore',
        address: 'Varthur Main Road, Kundalahalli Gate, Whitefield, Bengaluru - 560037',
        status: 'NABH Accredited Tertiary Center',
        specialties: ['German Schwind Amaris LASIK', 'Retina & Macula Surgery', 'Corneal Refractive', 'Pediatric Strabismus']
      },
      {
        district: 'Shivamogga District',
        unitName: 'Sankara Eye Hospital, Shimoga',
        address: 'Harakere, NH 206, Honnali Road, Shivamogga - 577202',
        status: 'Super-Specialty Eye Hospital',
        specialties: ['Cataract Eradication', 'Diabetic Retinopathy', 'Malnad Outreach Camps']
      }
    ],
    hospitals: [
      'Bangalore (Varthur Main Road / Whitefield)',
      'Shimoga (Harakere, NH 206)'
    ],
    accreditationBadge: '100% NABH Standards',
    freeSurgeriesShare: '80% Free Rural Care',
    description: 'Tertiary eye care hospitals equipped with German Schwind Amaris laser suites and rural outreach screening networks across Malnad, Bangalore rural, and central Karnataka districts.',
    pinCoordinates: { x: 302.1, y: 728.1 },
    districtPins: [
      { district: 'Bengaluru Urban District', x: 330, y: 760 },
      { district: 'Shivamogga District', x: 295, y: 710 }
    ]
  },
  INAP: {
    code: 'INAP',
    name: 'Andhra Pradesh',
    status: 'operational',
    statusBadge: 'Operational Tertiary Hub',
    hospitalCount: 1,
    districtsCovered: ['Guntur District (Amaravati Region)'],
    units: [
      {
        district: 'Guntur District',
        unitName: 'Sankara Eye Hospital, Guntur',
        address: 'Pedakakani, Guntur-Vijayawada Highway, Guntur - 522509',
        status: 'NABH Accredited Tertiary Center',
        specialties: ['Micro-Incision Cataract', 'Vitreo-Retina Services', 'Gift of Vision Rural Outreach']
      }
    ],
    hospitals: [
      'Guntur / Vijayawada (Pedakakani)'
    ],
    accreditationBadge: 'NABH Accredited',
    freeSurgeriesShare: '80% Free Rural Care',
    description: 'Situated in Guntur district serving coastal Andhra Pradesh and Rayalaseema districts with premier pediatric ophthalmology, vitreo-retinal surgery, and village vision camps.',
    pinCoordinates: { x: 392.3, y: 730.7 },
    districtPins: [
      { district: 'Guntur District', x: 395, y: 715 }
    ]
  },
  INBR: {
    code: 'INBR',
    name: 'Bihar (Patna)',
    status: 'upcoming',
    statusBadge: '✨ New Unit Coming Soon',
    hospitalCount: 1,
    districtsCovered: ['Patna District (Serving Bihar & Northeast India)'],
    units: [
      {
        district: 'Patna District',
        unitName: 'Sankara Eye Hospital, Patna (Under Construction)',
        address: 'Patna Metropolitan Region, Bihar',
        status: 'Upcoming Super-Specialty Eye Hospital',
        specialties: ['Tertiary Eye Care', 'Pediatric Ophthalmology', 'Rural Gangetic Outreach'],
        isUpcoming: true
      }
    ],
    hospitals: [
      'Sankara Eye Hospital, Patna (Under Construction)'
    ],
    accreditationBadge: 'High-Tech Modern Hub',
    freeSurgeriesShare: '80% Free Rural Care Planned',
    description: '🌟 NEW TERTIARY UNIT COMING SOON in Patna District: Specifically architected to serve the underprivileged and rural poor across Bihar, Mithila region, and neighboring states of Northeast India with state-of-the-art super-specialty eye care.',
    pinCoordinates: { x: 575.8, y: 411.0 },
    districtPins: [
      { district: 'Patna District (Coming Soon)', x: 565, y: 410 }
    ]
  },
  INUP: {
    code: 'INUP',
    name: 'Uttar Pradesh',
    status: 'operational',
    statusBadge: 'Operational Tertiary Hubs',
    hospitalCount: 2,
    districtsCovered: ['Kanpur Nagar District', 'Varanasi District'],
    units: [
      {
        district: 'Kanpur Nagar District',
        unitName: 'Sankara Eye Hospital, Kanpur',
        address: 'Panki Industrial Area, Site No. 1, Kanpur - 208022',
        status: 'NABH Accredited Tertiary Center',
        specialties: ['Cataract Surgery', 'Retina Suite', 'Glaucoma Clinics']
      },
      {
        district: 'Varanasi District',
        unitName: 'R. Jhunjhunwala Sankara Eye Hospital, Varanasi',
        address: 'Varanasi-Prayagraj Highway, Varanasi - 221011',
        status: 'Super-Specialty Hospital',
        specialties: ['Super-Specialty Eye Care', 'Eastern UP Outreach', 'Corneal Transplants']
      }
    ],
    hospitals: [
      'Kanpur (Panki Industrial Area)',
      'Varanasi (Varanasi-Prayagraj Highway)'
    ],
    accreditationBadge: '100% NABH Standards',
    freeSurgeriesShare: '80% Free Rural Care',
    description: 'Extensive footprint in Kanpur Nagar and Varanasi districts across the Gangetic plains providing world-class surgical eye care, pediatric squint corrections, and outreach to underprivileged rural communities.',
    pinCoordinates: { x: 438.7, y: 375.5 },
    districtPins: [
      { district: 'Kanpur Nagar District', x: 430, y: 380 },
      { district: 'Varanasi District', x: 490, y: 405 }
    ]
  },
  INPB: {
    code: 'INPB',
    name: 'Punjab',
    status: 'operational',
    statusBadge: 'Operational Tertiary Hub',
    hospitalCount: 1,
    districtsCovered: ['Ludhiana District'],
    units: [
      {
        district: 'Ludhiana District',
        unitName: 'Sankara Eye Hospital, Ludhiana',
        address: 'Delhi-GT Road, Near Doraha, Ludhiana - 141421',
        status: 'NABH Accredited Tertiary Hub',
        specialties: ['Sutureless Cataract', 'Vitreo-Retina Clinic', 'Community Screening']
      }
    ],
    hospitals: [
      'Ludhiana (Delhi-GT Road)'
    ],
    accreditationBadge: 'NABH Accredited',
    freeSurgeriesShare: '80% Free Rural Care',
    description: 'Located in Ludhiana district serving Malwa, Doaba, and Majha regions of Punjab and neighboring states with modern eye care and surgical facilities.',
    pinCoordinates: { x: 300.5, y: 254.4 },
    districtPins: [
      { district: 'Ludhiana District', x: 300, y: 255 }
    ]
  },
  INRJ: {
    code: 'INRJ',
    name: 'Rajasthan',
    status: 'operational',
    statusBadge: 'Operational Tertiary Hub',
    hospitalCount: 1,
    districtsCovered: ['Jaipur District'],
    units: [
      {
        district: 'Jaipur District',
        unitName: 'Sankara Eye Hospital, Jaipur',
        address: 'Delhi-Jaipur Highway, Kukas, Jaipur - 302028',
        status: 'NABH Accredited Super-Specialty Hub',
        specialties: ['Desert Mobile Clinics', 'Cataract & Lens Replacement', 'Diabetic Eye Care']
      }
    ],
    hospitals: [
      'Jaipur (Delhi-Jaipur Highway)'
    ],
    accreditationBadge: 'NABH Accredited',
    freeSurgeriesShare: '80% Free Rural Care',
    description: 'Located in Jaipur district bringing sight to the desert state with specialized mobile clinics screening rural elders in Shekhawati and eastern Rajasthan districts.',
    pinCoordinates: { x: 256.7, y: 375.8 },
    districtPins: [
      { district: 'Jaipur District', x: 275, y: 360 }
    ]
  },
  INGJ: {
    code: 'INGJ',
    name: 'Gujarat',
    status: 'operational',
    statusBadge: 'Operational Tertiary Hub',
    hospitalCount: 1,
    districtsCovered: ['Anand District'],
    units: [
      {
        district: 'Anand District',
        unitName: 'Sankara Eye Hospital, Anand',
        address: 'Mogar, NH 48, Near Express Highway, Anand - 388340',
        status: 'NABH Accredited Tertiary Center',
        specialties: ['Corneal Transplants', 'Phacoemulsification', 'Charotar Outreach']
      }
    ],
    hospitals: [
      'Anand / Vadodara (Mogar, NH 48)'
    ],
    accreditationBadge: 'NABH Accredited',
    freeSurgeriesShare: '80% Free Rural Care',
    description: 'Located in the milk capital in Anand district, delivering advanced corneal transplants, micro-incision cataract surgeries, and outreach across central Gujarat.',
    pinCoordinates: { x: 199.2, y: 481.0 },
    districtPins: [
      { district: 'Anand District', x: 215, y: 505 }
    ]
  },
  INMP: {
    code: 'INMP',
    name: 'Madhya Pradesh',
    status: 'operational',
    statusBadge: 'Operational Tertiary Hub',
    hospitalCount: 1,
    districtsCovered: ['Indore District'],
    units: [
      {
        district: 'Indore District',
        unitName: 'Sankara Eye Hospital, Indore',
        address: 'AB Road, Near Bypass, Indore - 452016',
        status: 'NABH Accredited Tertiary Center',
        specialties: ['High-Volume Cataract Eradication', 'Pediatric Eye Care', 'Tribal Screening Camps']
      }
    ],
    hospitals: [
      'Indore (AB Road / Bypass)'
    ],
    accreditationBadge: 'NABH Accredited',
    freeSurgeriesShare: '80% Free Rural Care',
    description: 'Located in Indore district, serving central India, Malwa, and Nimar regions with high-volume cataract eradication programs and tertiary pediatric eye care.',
    pinCoordinates: { x: 378.4, y: 494.2 },
    districtPins: [
      { district: 'Indore District', x: 310, y: 500 }
    ]
  },
  INMH: {
    code: 'INMH',
    name: 'Maharashtra',
    status: 'operational',
    statusBadge: 'Operational Tertiary Hub',
    hospitalCount: 1,
    districtsCovered: ['Raigad District / Navi Mumbai'],
    units: [
      {
        district: 'Raigad District (Panvel)',
        unitName: 'Sankara Eye Hospital, Panvel',
        address: 'Plot No. 17, Sector 12, Old Mumbai-Pune Highway, Panvel, Raigad - 410206',
        status: 'NABH Accredited Super-Specialty Hub',
        specialties: ['Advanced LASIK & Cornea', 'Retina Vitrectomy', 'Glaucoma & Pediatric Clinics']
      }
    ],
    hospitals: [
      'Panvel / Navi Mumbai (Old Mumbai-Pune Highway)'
    ],
    accreditationBadge: 'NABH Accredited',
    freeSurgeriesShare: '80% Free Rural Care',
    description: 'Super-specialty eye hospital in Raigad district catering to Mumbai MMR, Konkan region, and western Maharashtra with specialized Cornea, Glaucoma, and LASIK wings.',
    pinCoordinates: { x: 305.7, y: 597.9 },
    districtPins: [
      { district: 'Raigad District (Panvel)', x: 255, y: 595 }
    ]
  },
  INTG: {
    code: 'INTG',
    name: 'Telangana',
    status: 'operational',
    statusBadge: 'Operational Vision Hub',
    hospitalCount: 1,
    districtsCovered: ['Hyderabad District'],
    units: [
      {
        district: 'Hyderabad District',
        unitName: 'Sankara Vision & Community Hub, Hyderabad',
        address: 'Banjara Hills / Jubilee Hills, Hyderabad - 500034',
        status: 'Specialized Vision & Outreach Hub',
        specialties: ['Tele-Ophthalmology', 'Pediatric Vision Screening', 'Clinical Diagnostics']
      }
    ],
    hospitals: [
      'Hyderabad (Vision & Outreach Hub)'
    ],
    accreditationBadge: 'Clinical Excellence Hub',
    freeSurgeriesShare: '80% Free Rural Care',
    description: 'Located in Hyderabad district, partnering in clinical research, community tele-ophthalmology, and pediatric vision screening initiatives.',
    pinCoordinates: { x: 396.7, y: 641.9 },
    districtPins: [
      { district: 'Hyderabad District', x: 380, y: 645 }
    ]
  },
  INKL: {
    code: 'INKL',
    name: 'Kerala',
    status: 'outreach',
    statusBadge: 'Rural Screening Outreach',
    hospitalCount: 0,
    districtsCovered: ['Palakkad, Wayanad & Idukki Border Districts'],
    units: [],
    hospitals: ['Cross-Border Rural Screening Network'],
    accreditationBadge: 'Community Outreach',
    freeSurgeriesShare: 'Coimbatore Referral Link',
    description: 'Bordering communities actively screened by mobile vans and referred to Coimbatore and Krishnankoil base hospitals for free surgeries.',
    pinCoordinates: { x: 325.5, y: 848.9 }
  },
  INWB: {
    code: 'INWB',
    name: 'West Bengal',
    status: 'outreach',
    statusBadge: 'Rural Screening Outreach',
    hospitalCount: 0,
    districtsCovered: ['Purulia & Bankura Districts'],
    units: [],
    hospitals: ['Eastern Screening Support'],
    accreditationBadge: 'Community Outreach',
    freeSurgeriesShare: 'Partner Outreach',
    description: 'Collaborating on tribal eye screenings in Purulia, Bankura, and adjacent rural districts with free surgical care.',
    pinCoordinates: { x: 637.1, y: 485.8 }
  }
};
