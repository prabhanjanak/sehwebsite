import { Initiative } from '../types';

export const INITIATIVES_DATA: Initiative[] = [
  {
    id: 'gift-of-vision',
    title: 'Gift of Vision (Rural Outreach Program)',
    shortTitle: 'Gift of Vision',
    targetGroup: 'Rural & Underserved Poor',
    description: 'Our flagship community eye care program reaches out into remote villages across India to screen, transport, surgically treat, and rehabilitate rural citizens completely free of cost with full dignity.',
    impactMetrics: [
      '2.6+ Million Free Surgeries Performed',
      '30,000+ Villages Covered Across 9 States',
      '100% Free Transport, Food, Surgery & Post-Op Medication'
    ],
    icon: '/assets/images/gift-of-vision-program.png',
    image: '/assets/images/staff-3-e1516880966588.jpg',
    keyHighlights: [
      'Comprehensive on-site eye examinations in remote rural hamlets',
      'Dedicated hospital transport buses bring identified patients to base hospitals',
      'High-quality micro-incision cataract surgery with intraocular lens implantation',
      'Free nutritious stay, food (Annadhanam), and eye drop kit provided',
      'Brought back to their village doorsteps post-surgery with vision restored'
    ]
  },
  {
    id: 'rainbow',
    title: 'Rainbow (Paediatric Vision Program)',
    shortTitle: 'Rainbow',
    targetGroup: 'School Children & Infants',
    description: 'Dedicated preventive and curative eye health program focusing on school children, providing free comprehensive vision screenings, complimentary prescription spectacles, and surgical corrections for squints and congenital cataracts.',
    impactMetrics: [
      '1.8+ Million Children Screened',
      '120,000+ Free Glasses Distributed',
      '8,500+ Children Underwent Corrective Eye Surgery'
    ],
    icon: '/assets/images/rainbow.png',
    image: '/assets/images/img-1.jpg',
    keyHighlights: [
      'Universal vision testing across government & rural schools',
      'Custom prescription eyeglasses delivered to students within 2 weeks',
      'Specialized care for amblyopia (lazy eye) to prevent permanent loss',
      'Pediatric surgery suites equipped specifically for safe child anesthesia'
    ]
  },
  {
    id: 'maitri',
    title: 'Maitri (Diabetic Retinopathy Screening)',
    shortTitle: 'Maitri',
    targetGroup: 'Rural & Semi-Urban Diabetics',
    description: 'An aggressive community screening and tele-ophthalmology initiative tackling diabetic retinopathy in rural India before irreversible blindness occurs.',
    impactMetrics: [
      '450,000+ Diabetics Screened',
      '42,000+ Preventative Retinal Lasers Administered',
      'Mobile Fundus Camera Vans on the Field'
    ],
    icon: '/assets/images/maitri.png',
    image: '/assets/images/img-3.jpg',
    keyHighlights: [
      'Mobile vans equipped with non-mydriatic digital fundus cameras',
      'Real-time tele-retinal image transmission to base hospital retina specialists',
      'Immediate spot green laser photocoagulation to halt microvascular leakage',
      'Patient lifestyle education and systemic blood glucose control guidance'
    ]
  },
  {
    id: 'vision-centers',
    title: 'Rural Vision Centers & Primary Eye Care',
    shortTitle: 'Vision Centers',
    targetGroup: 'Grassroots Rural Communities',
    description: 'Permanent primary eye care clinics established in remote taluks and villages, providing year-round refraction, primary disease screening, and direct telemedicine link to tertiary hospitals.',
    impactMetrics: [
      '120+ Rural Vision Centers Operational',
      '1.2+ Million Primary Consultations',
      'Connected via High-Speed Tele-Ophthalmology'
    ],
    icon: '/assets/images/vision-center.png',
    image: '/assets/images/v1047-36a-scaled.jpg',
    keyHighlights: [
      'Permanently stationed optometrist and ophthalmic technician',
      'Online EHR connectivity with Sankara tertiary hospitals',
      'Affordable spectacles and eye drop dispensing on site',
      'Direct priority transport referral for surgical cases'
    ]
  },
  {
    id: 'women-empowerment',
    title: 'Rural Women Empowerment in Healthcare',
    shortTitle: 'Women in Eyecare',
    targetGroup: 'Rural Young Women (Ages 18-25)',
    description: 'Selecting underprivileged young women from rural farming families and providing them full scholarship vocational training as certified vision care technicians, creating dignified healthcare careers.',
    impactMetrics: [
      '2,500+ Rural Women Trained & Employed',
      '100% Full Boarding & Education Scholarship',
      'Financial Independence for Rural Families'
    ],
    icon: '/assets/images/women-empowerment.png',
    image: '/assets/images/staff-3-e1516880966588.jpg',
    keyHighlights: [
      'Two-year comprehensive diploma in ophthalmic assistance',
      'Free boarding, uniform, stipend, and medical care throughout training',
      'Guaranteed career placement across Sankara hospital network',
      'Transforming socio-economic status of marginalized households'
    ]
  },
  {
    id: 'technology-initiatives',
    title: 'AI & Tele-Ophthalmology Innovations',
    shortTitle: 'Tech Innovations',
    targetGroup: 'Remote & Tribal Belts',
    description: 'Deploying artificial intelligence algorithms for automated diabetic retinopathy grading, handheld fundus smartphone cameras, and cloud-based tele-consultation suites in difficult terrains.',
    impactMetrics: [
      'Deep Learning AI Validated at 96% Sensitivity',
      'Cloud Tele-Retina Hubs Active in 9 States',
      'Zero Travel Barrier for Remote Villages'
    ],
    icon: '/assets/images/technology-initiatives.png',
    image: '/assets/images/SCHWIND-AMARIS.png',
    keyHighlights: [
      'Automated DR screening using validated neural networks',
      'Real-time specialist sign-off within 15 minutes of camp capture',
      'Electronic medical record integration across all 14 units'
    ]
  }
];

export const MODEL_80_20_STEPS = [
  {
    step: 1,
    title: 'Paying Patients Choose Sankara',
    badge: 'Cross-Subsidy Engine',
    description: 'Middle and upper-income patients choose Sankara for NABH-accredited super-specialty surgical excellence, advanced German lasers, and premium hospitality.'
  },
  {
    step: 2,
    title: 'Re-Investment of Operational Surplus',
    badge: '100% Non-Profit Trust',
    description: 'Every rupee of surplus generated from paying patient tariffs is immediately channeled into funding free surgeries, medical consumables, and hospital wards.'
  },
  {
    step: 3,
    title: 'Proactive Rural Outreach & Camps',
    badge: 'Doorstep Outreach',
    description: 'Our mobile medical teams visit remote villages, conduct free screenings, and bring identified cataract and glaucoma patients to our hospitals via dedicated buses.'
  },
  {
    step: 4,
    title: '80% Free Surgeries Delivered with Dignity',
    badge: 'Restoring Vision & Lives',
    description: 'Rural beneficiaries receive identical world-class surgeries, foldable lenses, free food, stay, and medicines, and are safely escorted back home.'
  }
];
