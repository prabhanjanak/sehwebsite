import { ClinicalSpecialty } from '../types';

export const SPECIALTIES_DATA: ClinicalSpecialty[] = [
  {
    id: 'lasik',
    title: 'LASIK, SMILE Pro & Refractive Laser Suite',
    tagline: 'Dedicated In-House Laser OTs across Bangalore, Coimbatore, Shimoga, Guntur & Nationwide Network',
    shortDescription: 'Blade-free 100% customized laser vision correction with Germany’s SCHWIND AMARIS 1050RS 7D Eye-Tracking Laser & Zeiss SMILE Pro.',
    fullDescription: 'Sankara Eye Hospital houses state-of-the-art, dedicated In-House LASIK Operating Theatres at Bangalore, Coimbatore, Shimoga, Guntur, and across all our hospital units nationwide. Powered by Germany’s SCHWIND AMARIS 1050RS — the world’s most advanced excimer laser operating at 1050 Hz with 7-dimensional active eye tracking — along with Zeiss SMILE Pro, Contoura Vision, and ICL, we provide ultra-safe, painless vision correction with permanent freedom from spectacles.',
    icon: 'Sparkles',
    image: '/assets/images/SCHWIND-AMARIS.png',
    subSpecialties: [
      'Dedicated LASIK OTs (Shimoga, Bangalore, Coimbatore, Guntur, all units)',
      'Femtosecond Blade-Free LASIK (Femto-LASIK)',
      'SMILE Pro Lenticule Extraction (Zeiss VisuMax)',
      'Contoura Vision Topography-Guided Laser',
      'SCHWIND AMARIS 1050RS 7D Eye-Tracking Ablation',
      'Phakic Intraocular Lenses (ICL / IPCL for high power)',
      'Custom Trans-PRK (SmartSurfACE No-Touch Laser)',
    ],
    keyTreatments: [
      'Painless procedure completed in 8-10 seconds of laser time per eye',
      'Dedicated in-house laser suites in Shimoga, Bangalore, Coimbatore, Guntur & all branches',
      'Zero blade contact, highest safety margins with same-day visual recovery',
      'Top choice for software professionals, pilots, students, defense personnel, and athletes',
    ],
    equipment: [
      {
        name: 'SCHWIND AMARIS 1050RS Laser Suite',
        description: 'World-renowned 1050 Hz German excimer laser with 7D dynamic eye tracking for sub-millimeter precision.',
        image: '/assets/images/SCHWIND-AMARIS.png'
      },
      {
        name: 'Oculyzer II Topolyzer Pentacam HR',
        description: 'Corneal tomography mapping 22,000 elevation points for tailored custom vision correction.',
      }
    ],
    doctors: ['Dr. Nisha Ahuja', 'Dr. Anand Balasubramaniam', 'Dr. Pallavi Joshi', 'Dr. Y. Umesh'],
    faqs: [
      {
        question: 'Which Sankara hospitals have dedicated LASIK Laser OTs?',
        answer: 'We have dedicated state-of-the-art LASIK operating theatres in Bangalore, Coimbatore, Shimoga, Guntur, and all Sankara hospital units across India.'
      },
      {
        question: 'Is LASIK surgery painful and how fast is recovery?',
        answer: 'No. Numbing eye drops make the procedure 100% painless. Most patients achieve 6/6 HD vision and return to daily activities within 24 hours.'
      }
    ]
  },
  {
    id: 'cataract',
    title: 'Cataract & Refractive Lens Surgery',
    tagline: 'Precision blade-free Femto-Cataract (FLACS) & Premium IOL Implantation',
    shortDescription: 'World-class cataract removal with rapid visual rehabilitation using sutureless phacoemulsification, multifocal, toric, and extended depth of focus (EDOF) lenses.',
    fullDescription: 'At Sankara Eye Hospital, cataract surgery is performed using the highest global standard of robotic Femtosecond Laser-Assisted Cataract Surgery (FLACS) and micro-incision phacoemulsification. Our experienced surgeons replace cloudy natural crystalline lenses with cutting-edge premium intraocular lenses (IOLs) tailored to each patient’s lifestyle, allowing sharp vision at distance, intermediate, and near without glasses.',
    icon: 'Eye',
    image: '/assets/images/Cataract-Eye-Surgery-Recovery-Time-720x503.jpg',
    subSpecialties: [
      'Robotic Femtosecond Laser Cataract (FLACS)',
      'Micro-Coaxial Phacoemulsification (MICS)',
      'Toric Astigmatism-Correcting Lenses',
      'Multifocal & Trifocal Lifestyle Lenses',
      'Extended Depth of Focus (EDOF) IOLs',
      'Complex & Traumatic Cataract Management',
    ],
    keyTreatments: [
      'Same-day painless day-care procedure (10-15 minutes)',
      'No-injection, topical drop anesthesia option',
      'No stitches, no eye patches required',
      'Sub-2mm micro-incision for swift visual recovery',
    ],
    equipment: [
      {
        name: 'Alcon Centurion Vision System',
        description: 'Active Fluidics phacoemulsification platform optimizing intraocular pressure during cataract removal.',
      },
      {
        name: 'Zeiss IOLMaster 700 SWEPT Source OCT',
        description: 'Biometric optical calculation device ensuring sub-micron accuracy in premium IOL power calculation.',
      }
    ],
    doctors: ['Dr. Y. Umesh', 'Dr. Nisha Ahuja', 'Dr. Anand Balasubramaniam', 'Dr. Meena G Menon'],
    faqs: [
      {
        question: 'How fast can I resume normal work after cataract surgery?',
        answer: 'Most patients resume desk work, reading, and walking within 24 to 48 hours. Light exercise and driving can typically be resumed after 1 week.'
      },
      {
        question: 'What is the difference between standard and premium IOLs?',
        answer: 'Monofocal lenses provide clear distance vision (glasses needed for reading). Premium Multifocal and EDOF lenses provide clear continuous vision across all distances (near, computer screen, and far).'
      }
    ]
  },
  {
    id: 'retina',
    title: 'Vitreo-Retina & Macular Care',
    tagline: 'Tertiary retina surgery, Diabetic Retinopathy lasers & Anti-VEGF therapies',
    shortDescription: 'Comprehensive management of complex retinal detachments, diabetic eye disease, age-related macular degeneration (AMD), and macular holes.',
    fullDescription: 'Our Vitreo-Retinal department is one of South Asia’s foremost referral hubs for advanced posterior segment disease. Utilizing ultra-high-speed 25-gauge and 27-gauge sutureless vitrectomy systems, swept-source OCT angiography, and intravitreal anti-VEGF medications, our dedicated retina surgeons preserve and restore sight in vision-threatening conditions.',
    icon: 'Activity',
    image: '/assets/images/Vitro-Retina-e1674880647629.png',
    subSpecialties: [
      '25G / 27G Minimally Invasive Sutureless Vitrectomy (MIVS)',
      'Diabetic Retinopathy Green Laser Photocoagulation',
      'Anti-VEGF & Steroid Injections (Lucentis, Eylea, Ozurdex)',
      'Rhegmatogenous & Tractional Retinal Detachment Repair',
      'Macular Hole & Epiretinal Membrane Peeling',
      'Retinopathy of Prematurity (ROP) Pediatric Screening',
    ],
    keyTreatments: [
      'Rapid-action emergency retinal re-attachment',
      'Non-invasive laser therapy for diabetic microvascular leaks',
      'Painless office-based intravitreal drug delivery',
      'State-of-the-art tele-retina screening across rural outreach clinics',
    ],
    equipment: [
      {
        name: 'Constellation Vision System (Alcon)',
        description: 'High-speed 10,000 cuts/min vitrectomy platform with integrated pressurized laser and fluidics control.',
      },
      {
        name: 'Zeiss Cirrus 6000 HD-OCT Angiography',
        description: 'Ultra-fast non-invasive micro-vascular retinal capillary imaging without dye injection.',
      }
    ],
    doctors: ['Dr. Mahesh Shanmugam P', 'Dr. Anand Parthasarathy', 'Dr. Manoj Gupta', 'Dr. Divyansh K Mishra', 'Dr. Meenakshi Mahesh'],
    faqs: [
      {
        question: 'What are the warning signs of a retinal detachment?',
        answer: 'Sudden onset of flashes of light, a sudden shower of dark floating spots (floaters), or a dark shadow/curtain falling across part of your visual field.'
      },
      {
        question: 'How often should diabetic patients get their eyes screened?',
        answer: 'All individuals with diabetes should undergo a dilated retinal examination by a retina specialist at least once every year.'
      }
    ]
  },
  {
    id: 'cornea',
    title: 'Cornea, Ocular Surface & Eye Banking',
    tagline: 'Full-thickness & Lamellar Keratoplasty (DMEK/DSAEK) & 24/7 Eye Bank',
    shortDescription: 'Advanced corneal transplantation, Keratoconus cross-linking (C3R), amniotic membrane grafts, dry eye clinic, and 24/7 Sri Jayendra Eye Bank.',
    fullDescription: 'The Cornea and External Disease Service provides comprehensive diagnostic and surgical therapies for corneal dystrophies, infections, keratoconus, and chemical ocular trauma. Supported by our government-recognized Eye Banks, we perform modern selective lamellar transplants including DMEK and DSAEK which replace only damaged tissue layers for faster visual recovery and reduced rejection rates.',
    icon: 'ShieldCheck',
    image: '/assets/images/DSC_3331-scaled-1.jpg',
    subSpecialties: [
      'Descemet Membrane Endothelial Keratoplasty (DMEK)',
      'Descemet Stripping Automated Endothelial Keratoplasty (DSAEK)',
      'Deep Anterior Lamellar Keratoplasty (DALK)',
      'Corneal Collagen Cross-Linking with Riboflavin (C3R / CXL)',
      'Amniotic Membrane & Limbal Stem Cell Transplantation',
      'Advanced Dry Eye & Meibomian Gland Dysfunction Clinic',
    ],
    keyTreatments: [
      'Micro-thin endothelial layer replacements with low graft rejection',
      'Corneal strengthening for progressive Keratoconus',
      '24/7 harvest, testing, and distribution of donor corneal tissue',
    ],
    equipment: [
      {
        name: 'Corneal Cross-Linking (CXL) UVA Illumination Suite',
        description: 'Precision photochemical stabilization system halting keratoconus progression.',
      }
    ],
    doctors: ['Dr. Nisha Ahuja', 'Dr. Pallavi Joshi', 'Dr. Ashutosh Tripathi', 'Dr. Prabhu Vijayaraghavan'],
    faqs: [
      {
        question: 'What is the success rate of corneal transplantation?',
        answer: 'Modern lamellar corneal transplants (like DMEK/DSAEK) have success rates exceeding 90-95% when performed with healthy screened donor corneas.'
      }
    ]
  },
  {
    id: 'paediatric',
    title: 'Paediatric Ophthalmology & Strabismus',
    tagline: 'Child-friendly eye care, Amblyopia therapy, Squint correction & Retinoblastoma',
    shortDescription: 'Specialized diagnostic suites, lazy eye treatment, pediatric congenital cataract surgery, and custom strabismus alignments in comforting environments.',
    fullDescription: 'Children’s visual systems develop rapidly in the early years of life. Our Paediatric Ophthalmology department is dedicated to early detection and gentle treatment of pediatric eye conditions, including congenital cataracts, infantile glaucoma, amblyopia (lazy eye), and complex squints. Through our renowned Rainbow program, we have screened over 1.8 million school children.',
    icon: 'Users',
    image: '/assets/images/squint-eye-treatment-and-surgery-720x720.png',
    subSpecialties: [
      'Paediatric Cataract Surgery with Primary Posterior Capsulotomy',
      'Surgical & Non-Surgical Strabismus (Squint) Correction',
      'Amblyopia (Lazy Eye) Vision Stimulation & Patching Therapy',
      'Paediatric Glaucoma Management (Goniotomy / Trabeculotomy)',
      'Retinopathy of Prematurity (ROP) Laser & Anti-VEGF',
      'Autism & Neuro-Developmental Milestone Vision Clinic',
    ],
    keyTreatments: [
      'Specialized infant and toddler vision acuity assessment',
      'Micro-surgical squint alignment with adjustable sutures',
      'Milestone clinic for children with developmental delays',
    ],
    equipment: [
      {
        name: 'RetCam Envision Digital Pediatric Imaging',
        description: 'Wide-field digital imaging for neonatal ROP and pediatric retinal evaluation.',
      }
    ],
    doctors: ['Dr. Kaushik Murali', 'Dr. Ridhi Upadhyay', 'Dr. Rajesh Prabu', 'Dr. Sowmya R', 'Dr. Vidhya C'],
    faqs: [
      {
        question: 'At what age should my child’s eyes be first checked?',
        answer: 'Healthy children should have an eye exam between 6 to 12 months, again around age 3, and before starting school (age 5).'
      }
    ]
  },
  {
    id: 'glaucoma',
    title: 'Glaucoma & Sight Preservation',
    tagline: 'Silent sight-stealer defense: Early OCT detection, SLT laser & MIGS',
    shortDescription: 'Early diagnostic monitoring, Selective Laser Trabeculoplasty (SLT), Trabeculectomy with MMC, and Ahmed Glaucoma Valve (AGV) implants.',
    fullDescription: 'Glaucoma is often called the silent thief of sight because vision loss is painless and gradual. Sankara’s Glaucoma service provides comprehensive screening, 24-hour diurnal IOP monitoring, advanced visual field perimetry (HFA 3), and cutting-edge surgical solutions to preserve your visual nerve fibers for life.',
    icon: 'Shield',
    image: '/assets/images/10.jpg',
    subSpecialties: [
      'Humphrey Field Analyzer (HFA 3) Static Perimetry',
      'Selective Laser Trabeculoplasty (SLT) & YAG Iridotomy',
      'Micro-Invasive Glaucoma Surgery (MIGS)',
      'Trabeculectomy with Mitomycin C (MMC)',
      'Ahmed & Baerveldt Glaucoma Drainage Implants',
      'OCT Retinal Nerve Fiber Layer (RNFL) Thickness Analysis',
    ],
    keyTreatments: [
      'Drop-free IOP reduction via non-thermal SLT laser therapy',
      'Shunt valve drainage implantation for refractory glaucoma',
      'Lifelong optic nerve monitoring protocols',
    ],
    equipment: [
      {
        name: 'Humphrey Field Analyzer HFA3 (Zeiss)',
        description: 'Gold standard automated perimetry quantifying peripheral visual field sensitivity.',
      }
    ],
    doctors: ['Dr. Pallavi Joshi', 'Dr. Meena G Menon', 'Dr. Lalitha K J', 'Dr. Niharika Singri'],
    faqs: [
      {
        question: 'Can glaucoma vision loss be reversed?',
        answer: 'Vision lost to glaucoma cannot currently be restored, but early treatment with eye drops, laser, or surgery can reliably stop further deterioration.'
      }
    ]
  },
  {
    id: 'orbit-oculoplasty',
    title: 'Orbit, Oculoplasty & Ocular Oncology',
    tagline: 'Cosmetic & reconstructive eyelid surgery, tear duct repairs & ocular prosthesis',
    shortDescription: 'Ptosis correction, blepharoplasty, tear duct (DCR) bypass, orbital tumors, thyroid eye disease, and customized artificial eyes (Ocularistry).',
    fullDescription: 'Our Oculoplasty and Orbit division combines ophthalmic precision with aesthetic and reconstructive surgical expertise. We manage congenital and acquired eyelid anomalies, facial spasms, tear duct blockages, orbital fractures, and ocular tumors, alongside an advanced Ocularistry clinic providing custom acrylic prosthetic eyes.',
    icon: 'HeartPulse',
    image: '/assets/images/12.jpg',
    subSpecialties: [
      'Ptosis (Drooping Eyelid) Micro-Correction',
      'Endoscopic Dacryocystorhinostomy (DCR) Tear Duct Repair',
      'Custom 3D-Molded Ocularistry (Artificial Eye Prosthesis)',
      'Thyroid Eye Disease Orbital Decompression',
      'Orbital Trauma & Fracture Reconstruction',
      'Ocular Surface & Intraocular Oncology',
    ],
    keyTreatments: [
      'Minimally invasive scarless tear drainage surgery',
      'Handcrafted naturalistic iris color-matched prostheses',
      'Functional and cosmetic eyelid rejuvenation',
    ],
    equipment: [
      {
        name: 'Karl Storz Endoscopic Sinus / DCR Surgical Tower',
        description: 'High-definition endoscopic instrumentation for scarless endonasal tear duct surgery.',
      }
    ],
    doctors: ['Dr. Shashidhar V S', 'Dr. Divyansh K Mishra', 'Dr. Payal Naresh Shah'],
    faqs: [
      {
        question: 'What is custom ocularistry and how does it look?',
        answer: 'A custom ocular prosthesis is sculpted and hand-painted by master ocularists to match your natural eye color, shape, and movement so closely that observers rarely notice.'
      }
    ]
  },
  {
    id: 'low-vision',
    title: 'Vision Enhancement & Low Vision Rehabilitation',
    tagline: 'Empowering individuals with severe vision impairment to live independently',
    shortDescription: 'Specialized optical & electronic magnifiers, digital reading aids, orientation training, and adaptive software for legally blind individuals.',
    fullDescription: 'For patients whose vision cannot be fully restored by medical or surgical means, our Low Vision Clinic provides comprehensive rehabilitation. We prescribe high-tech telescopic glasses, video magnifiers, tactile devices, and computer screen reading tools, restoring independence and quality of life.',
    icon: 'BookOpen',
    image: '/assets/images/13.jpg',
    subSpecialties: [
      'High-Power Optical Telescopes & Prisms',
      'Electronic Video Magnifiers (CCTV Readers)',
      'Glare-Control & Contrast-Enhancing Filter Lenses',
      'Computer & Smartphone Assistive Software Training',
      'Orientation & Mobility Guidance for Daily Life',
    ],
    keyTreatments: [
      'Comprehensive functional visual capacity evaluation',
      'Individualized device prescription and vocational training',
    ],
    equipment: [
      {
        name: 'Digital Optical Magnifier Suites',
        description: 'High-definition contrast enhancement monitors for macro-reading.',
      }
    ],
    doctors: ['Dr. Nisha Ahuja', 'Dr. Minija C K'],
    faqs: [
      {
        question: 'Who benefits most from low vision aids?',
        answer: 'Individuals with advanced macular degeneration, retinitis pigmentosa, diabetic retinopathy, or optic nerve atrophy who struggle with reading, recognizing faces, or walking.'
      }
    ]
  }
];
