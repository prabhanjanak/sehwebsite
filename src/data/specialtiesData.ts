import { ClinicalSpecialty } from '../types';

export const SPECIALTIES_DATA: ClinicalSpecialty[] = [
  // 1. Cataract & Refractive Lens Surgery
  {
    id: 'cataract',
    title: 'Cataract & Refractive Lens Surgery',
    tagline: 'Robotic Femtosecond Laser (FLACS), Micro-Incision Phaco (MICS) & Premium Foldable IOLs',
    shortDescription: 'World-class sutureless cataract surgery with rapid visual recovery using advanced Monofocal, Toric, Trifocal, and EDOF lifestyle lenses.',
    fullDescription: 'At Sankara Eye Hospital, cataract care represents over 45 years of clinical surgical mastery. We utilize both stitchless Micro-Incision Phacoemulsification (MICS) and robotic Femtosecond Laser-Assisted Cataract Surgery (FLACS). Our fellowship-trained surgeons replace cloudy natural crystalline lenses with cutting-edge premium intraocular lenses (IOLs) tailored to each patient’s occupational visual demands, providing crisp, clear vision at distance, intermediate (computer), and near without glasses.',
    icon: 'Eye',
    image: '/assets/images/Cataract-Eye-Surgery-Recovery-Time-720x503.jpg',
    subSpecialties: [
      'Robotic Femtosecond Laser Cataract (FLACS)',
      'Stitchless Micro-Incision Phacoemulsification (MICS < 2.2mm)',
      'Toric Astigmatism-Correcting Intraocular Lenses',
      'Multifocal & Trifocal Lifestyle Presbyopia Lenses',
      'Extended Depth of Focus (EDOF) IOLs',
      'Complex, Hard & Traumatic Cataract Reconstruction',
      'Pediatric Cataract Surgery with Primary Posterior Capsulotomy'
    ],
    keyTreatments: [
      'Same-day stitchless day-care procedure (10–15 minutes surgical time)',
      'No-injection, painless topical anesthetic eye drop technique',
      'Zero eye patches or hospital stay required under normal recovery',
      'Microscopic sub-2mm incision enabling immediate return to daily activities'
    ],
    equipment: [
      {
        name: 'Alcon Centurion Vision System with Active Fluidics',
        description: 'Advanced phacoemulsification platform that continuously maintains physiological intraocular pressure during lens emulsification.',
        image: '/assets/images/services29-e1674881195606.jpg'
      },
      {
        name: 'Zeiss IOLMaster 700 SWEPT Source OCT Biometry',
        description: 'Sub-micron accurate optical biometer that visualizes the fovea to guarantee exact customized intraocular lens calculation.'
      }
    ],
    doctors: ['Dr. Y. Umesh', 'Dr. Shruthi Tara', 'Dr. Nisha Ahuja', 'Dr. Sudhakar Potti', 'Dr. Neeraj Shah'],
    faqs: [
      {
        question: 'What are the primary causes of cataract formation?',
        answer: 'Cataract is primarily a natural physiological aging process where proteins in the eye’s crystalline lens break down and clump together, causing progressive cloudiness. Secondary causes include diabetes mellitus, chronic UV radiation exposure, long-term corticosteroid medication use, eye injuries or blunt trauma, previous intraocular surgeries, and congenital or genetic predisposition.'
      },
      {
        question: 'What are the early warning symptoms and detection methods for cataract?',
        answer: 'Early signs include painless gradual blurring of vision, increased sensitivity to light and night glare from oncoming headlights, perceived fading or yellowing of colors, poor contrast in dim lighting, frequent changes in eyeglass prescriptions, and double vision in one eye. Detection is confirmed through a comprehensive slit-lamp biomicroscopy examination and dilated pupil evaluation by a senior ophthalmologist.'
      },
      {
        question: 'When is the right time to undergo cataract surgery? Do I need to wait for it to mature?',
        answer: 'No. The obsolete notion of waiting for a cataract to "ripen" or mature is medically outdated and dangerous. Modern micro-incision phacoemulsification is safest and easiest when performed in the early to moderate stages. You should consider surgery as soon as reduced vision begins interfering with your daily life — such as night driving, reading, computer work, cooking, or personal hobbies. Delaying surgery excessively increases surgical complexity and risk of secondary glaucoma.'
      },
      {
        question: 'What are the different types of Intraocular Lenses (IOLs) and how do I choose?',
        answer: 'There are four major IOL categories: 1) Monofocal IOLs: provide sharp vision at one fixed distance (usually far distance), requiring reading glasses for close work. 2) Toric IOLs: specially engineered to correct pre-existing corneal astigmatism for patients with cylindrical numbers. 3) Multifocal / Trifocal IOLs: feature diffractive optical rings that provide clear vision across distance, intermediate (computer), and near without glasses. 4) Extended Depth of Focus (EDOF) IOLs: create an elongated focal zone for seamless distance and intermediate vision with minimal night glare or halos. Your surgeon will recommend the best lens based on your corneal tomography, axial length, and personal visual lifestyle.'
      },
      {
        question: 'How fast is recovery and what precautions are needed after cataract surgery?',
        answer: 'Most patients notice significantly clearer vision within 24 to 48 hours. You can resume walking, reading, watching television, and light office work within 2 days. For the first 2 weeks: avoid splashing tap water directly into the eye, refrain from rubbing the eye, wear protective sunglasses outdoors, avoid heavy weightlifting or swimming, and instill prescribed antibiotic-anti-inflammatory eye drops strictly as directed.'
      }
    ]
  },

  // 2. LASIK, SMILE Pro & Refractive Laser Suite
  {
    id: 'lasik',
    title: 'LASIK, SMILE Pro & Refractive Laser Suite',
    tagline: 'Dedicated Excimer & Femtosecond Laser Suites for Permanent Spectacle Freedom',
    shortDescription: 'Blade-free 100% customized laser vision correction. Featuring Germany’s SCHWIND AMARIS 1050RS at Bangalore & Coimbatore (Sathy Road), plus Femto-LASIK, Contoura, and ICL.',
    fullDescription: 'Sankara Eye Hospital houses dedicated In-House Refractive Laser Operating Suites across select tertiary units in our national network. Powered by Germany’s SCHWIND AMARIS 1050RS Excimer Laser — featuring a 1050 Hz repetition rate with 7-dimensional active eye tracking at our Bangalore and Coimbatore (Sathy Road) centers — along with Femto-LASIK, Contoura Vision, SmartSurfACE PRK, and Phakic ICL implants, we deliver sub-micron precision for permanent visual freedom from glasses and contact lenses.',
    icon: 'Sparkles',
    image: '/assets/images/SCHWIND-AMARIS.png',
    subSpecialties: [
      'Dedicated LASIK Theatres (Bangalore, Coimbatore Sathy Rd, Guntur, Jaipur, Shimoga, Indore, Hyderabad)',
      'SCHWIND AMARIS 1050RS 7D Eye-Tracking Laser (Bangalore & Coimbatore Sathy Rd)',
      'Blade-Free Femtosecond Laser LASIK (Femto-LASIK)',
      'Contoura Vision Topography-Guided Custom Ablation',
      'SmartSurfACE Trans-PRK (Touch-Free, 100% Surface Laser)',
      'Phakic Intraocular Lens Implantation (EVO+ ICL / IPCL for High Myopia)',
      'PresbyMAX Laser Profile for Reading Glass Independence'
    ],
    keyTreatments: [
      '8 to 10 seconds of painless laser delivery time per eye',
      'Zero surgical blade contact with rapid next-day visual rehabilitation',
      'Sub-micron corneal wavefront topography mapping 22,000 elevation points',
      'Ideal for IT software professionals, defense aspirants, pilots, athletes, and students'
    ],
    equipment: [
      {
        name: 'SCHWIND AMARIS 1050RS Excimer Laser Suite',
        description: 'German-engineered 1050 Hz repetition rate laser with latency-free 7D active eye tracking (Available at Bangalore & Coimbatore Sathy Road).',
        image: '/assets/images/SCHWIND-AMARIS.png'
      },
      {
        name: 'SCHWIND SIRIUS 3D Corneal Tomography & Aberrometer',
        description: 'Precision Scheimpflug rotating camera measuring anterior/posterior corneal elevation and total ocular wavefront aberrations.'
      }
    ],
    doctors: ['Dr. Y. Umesh (Bangalore)', 'Dr. Shruthi Tara (Coimbatore)', 'Dr. Sudhakar Potti (Guntur)', 'Dr. Neeraj Shah (Jaipur)', 'Dr. Mallikarjun M H (Shimoga)'],
    faqs: [
      {
        question: 'Which Sankara Eye Hospital units have dedicated LASIK Laser Suites?',
        answer: 'Dedicated In-House LASIK and Refractive Laser suites are available at: Bangalore, Coimbatore (Sathy Road), Guntur, Jaipur, Shimoga, Indore, and Hyderabad. Note: Our flagship SCHWIND AMARIS 1050RS 7D Laser is installed at Bangalore and Coimbatore (Sathy Road). For units without refractive suites (Anand, Kanpur, Krishnankoil, Ludhiana, Panvel, Varanasi), patients receive comprehensive pre-refractive evaluations and referral coordination to our nearest regional laser hub.'
      },
      {
        question: 'Is LASIK surgery painful and how quickly can I resume work?',
        answer: 'The procedure is virtually painless. Numbing topical anesthetic eye drops are placed in the eye, so you feel only mild pressure for a few seconds. Most patients achieve 20/20 or better visual acuity by the next morning and safely return to computer work, smartphone use, and office duties within 24 to 48 hours.'
      },
      {
        question: 'What are the eligibility criteria for LASIK or specs removal surgery?',
        answer: 'Candidates must: 1) Be at least 18 years of age, 2) Have a stable eyeglass prescription with variance ≤ 0.5D over the past 12 months, 3) Have adequate corneal thickness and normal corneal curvature confirmed on Pentacam/Sirius tomography, 4) Be free from active eye infections, keratoconus, severe dry eye, or uncontrolled glaucoma, and 5) Not be pregnant or nursing at the time of procedure.'
      },
      {
        question: 'What if my corneal thickness is too thin for LASIK?',
        answer: 'Patients with thin corneas, extreme dry eyes, or high refractive errors (above -8.00D or -10.00D) are excellent candidates for alternative advanced solutions such as Touch-Free SmartSurfACE Trans-PRK or EVO+ ICL (Implantable Collamer Lens), which preserves your natural cornea without tissue removal.'
      }
    ]
  },

  // 3. Vitreo-Retina & Macular Care
  {
    id: 'retina',
    title: 'Vitreo-Retina & Macular Care',
    tagline: 'Tertiary Sutureless Vitrectomy (MIVS), Diabetic Retinopathy & Anti-VEGF Injections',
    shortDescription: 'Advanced clinical and surgical management of retinal detachment, diabetic macular edema, age-related macular degeneration (AMD), and pediatric ROP.',
    fullDescription: 'Our Vitreo-Retinal department is a premier national referral destination for complex posterior segment pathology. Utilizing sutureless 25G and 27G minimally invasive vitrectomy systems (MIVS), high-definition OCT angiography, and targeted intravitreal anti-VEGF pharmacotherapies, our faculty prevents permanent visual loss in sight-threatening retinal conditions.',
    icon: 'Activity',
    image: '/assets/images/Vitro-Retina-e1674880647629.png',
    subSpecialties: [
      '25G / 27G Minimally Invasive Sutureless Vitrectomy (MIVS)',
      'Diabetic Retinopathy Green Laser & Pan-Retinal Photocoagulation',
      'Anti-VEGF Therapy (Lucentis, Eylea, Accentrix, Vabysmo, Ozurdex)',
      'Rhegmatogenous & Tractional Retinal Detachment Repair with Gas/Silicone Oil',
      'Macular Hole Closure & Epiretinal Membrane (ERM) Peeling',
      'Retinopathy of Prematurity (ROP) Screening & Laser in Neonates',
      'Central Serous Chorioretinopathy (CSCR) & Vein Occlusion Management'
    ],
    keyTreatments: [
      'Emergency intervention for sudden retinal detachment tears',
      'Targeted microvascular leak sealing with green retinal lasers',
      'Painless outpatient intravitreal injections in sterile minor OTs',
      'State-of-the-art tele-retina AI diabetic screening across rural outreach clinics'
    ],
    equipment: [
      {
        name: 'Alcon Constellation Vision System',
        description: 'High-speed 10,000 cuts/min vitrectomy console with pressurized infusion control and dual-pneumatic probe technology.',
        image: '/assets/images/Vitro-Retina-e1674880647629.png'
      },
      {
        name: 'Zeiss Cirrus 6000 HD-OCT Angiography',
        description: 'Ultra-fast 100,000 A-scans/sec non-invasive vascular mapping of retinal capillary networks without intravenous fluorescein dye.'
      }
    ],
    doctors: ['Dr. Mahesh Shanmugam P', 'Dr. Anand Parthasarathy', 'Dr. Manoj Gupta', 'Dr. Saptagirish Rambhatla', 'Dr. Birva Dave'],
    faqs: [
      {
        question: 'What are the emergency warning signs of a retinal tear or detachment?',
        answer: 'Immediate medical attention is required if you experience: 1) Sudden appearance of bright flashes of light (photopsia), 2) A sudden burst or shower of dark floating spots (floaters), or 3) A dark shadow or "curtain" descending over part of your visual field. A retinal detachment is an ocular emergency requiring prompt surgical reattachment to prevent irreversible blindness.'
      },
      {
        question: 'How does diabetes affect the retina and how can I prevent vision loss?',
        answer: 'Chronic high blood sugar damages delicate micro-blood vessels in the retina, causing them to leak fluid, bleed, and proliferate into fragile abnormal vessels (Diabetic Retinopathy). Prevention requires strict glycemic control (HbA1c < 7%), blood pressure and lipid management, and a mandatory dilated retinal fundus examination at least once every 12 months.'
      },
      {
        question: 'What is anti-VEGF therapy and is the injection into the eye painful?',
        answer: 'Anti-VEGF medications inhibit vascular endothelial growth factor, a chemical that promotes abnormal leaky blood vessel growth in macular degeneration, diabetic macular edema, and retinal vein occlusions. Injections are performed under strict sterile precautions using topical numbing drops — patients experience only mild pressure for a few seconds, with zero sharp pain.'
      }
    ]
  },

  // 4. Cornea, Ocular Surface & Eye Banking
  {
    id: 'cornea',
    title: 'Cornea, Ocular Surface & Eye Banking',
    tagline: 'Lamellar Keratoplasty (DMEK/DSAEK), Keratoconus C3R Cross-Linking & 24/7 Eye Bank',
    shortDescription: 'Advanced corneal transplants, keratoconus stabilization, limbal stem cell grafting, dry eye clinic, and 24/7 Sri Jayendra Eye Bank network.',
    fullDescription: 'The Cornea and External Disease Service provides tertiary clinical and surgical therapies for corneal dystrophies, severe infections, keratoconus, and chemical burns. Supported by our government-recognized 24/7 Eye Banks, we perform sutureless selective lamellar transplants including DMEK and DSAEK which replace only diseased tissue layers, dramatically reducing graft rejection risk.',
    icon: 'ShieldCheck',
    image: '/assets/images/DSC_3331-scaled-1.jpg',
    subSpecialties: [
      'Descemet Membrane Endothelial Keratoplasty (DMEK)',
      'Descemet Stripping Automated Endothelial Keratoplasty (DSAEK)',
      'Deep Anterior Lamellar Keratoplasty (DALK)',
      'Corneal Collagen Cross-Linking with Riboflavin (C3R / CXL for Keratoconus)',
      'Amniotic Membrane & Autologous Limbal Stem Cell Grafting',
      'Advanced Dry Eye & Meibomian Gland Dysfunction (MGD) Therapy',
      'Therapeutic & Optical Penetrating Keratoplasty (PKP)'
    ],
    keyTreatments: [
      'Micro-thin endothelial cell replacement with rapid visual clearance',
      'Ultraviolet-A crosslinking halting keratoconus progression in teens and young adults',
      '24/7 corneal harvesting, quality evaluation, and tissue distribution'
    ],
    equipment: [
      {
        name: 'Avedro KXL Corneal Cross-Linking System',
        description: 'High-intensity UVA photochemical illumination platform for accelerated riboflavin crosslinking.',
        image: '/assets/images/DSC_3331-scaled-1.jpg'
      },
      {
        name: 'Oculus Keratograph 5M Ocular Surface Analyzer',
        description: 'Advanced non-invasive tear film break-up time, meibography, and lipid layer thickness diagnostics.'
      }
    ],
    doctors: ['Dr. Nisha Ahuja', 'Dr. Shruthi Tara', 'Dr. Pallavi Joshi', 'Dr. Ashutosh Tripathi', 'Dr. Prabhu Vijayaraghavan'],
    faqs: [
      {
        question: 'What is Keratoconus and how does Corneal Cross-Linking (C3R) help?',
        answer: 'Keratoconus is a progressive condition where the cornea thins and bulges into a cone shape, causing irregular astigmatism and blurred vision. Corneal Cross-Linking (C3R/CXL) uses riboflavin (Vitamin B2) eye drops activated by precision UVA light to create chemical cross-links between collagen fibers, strengthening the cornea and permanently halting disease progression.'
      },
      {
        question: 'What is the difference between full-thickness and lamellar (DMEK/DSAEK) corneal transplants?',
        answer: 'Full-thickness transplantation (Penetrating Keratoplasty) replaces the entire cornea with sutures that take over a year to heal. Modern Lamellar Transplants (DMEK/DSAEK) replace only the ultra-thin damaged endothelial layer through a tiny micro-incision without surface sutures. This yields much faster visual recovery (weeks instead of months) and slashes graft rejection rates below 1-2%.'
      }
    ]
  },

  // 5. Paediatric Ophthalmology & Strabismus
  {
    id: 'paediatric',
    title: 'Paediatric Ophthalmology & Strabismus',
    tagline: 'Child-Friendly Eye Care, Amblyopia Therapy, Squint Alignment & Rainbow School Screening',
    shortDescription: 'Specialized infant and child examinations, lazy eye patching, congenital cataract surgery, and micro-surgical squint corrections in comforting clinical environments.',
    fullDescription: 'A child’s visual system develops rapidly during early childhood. Our Paediatric Ophthalmology department specializes in early diagnosis and gentle intervention for pediatric visual disorders, including strabismus (squint), amblyopia (lazy eye), congenital cataracts, and infantile glaucoma. Through our signature Rainbow program, we have screened over 1.8 million school children nationwide.',
    icon: 'Users',
    image: '/assets/images/squint-eye-treatment-and-surgery-720x720.png',
    subSpecialties: [
      'Paediatric Cataract Surgery with Primary Posterior Capsulotomy & IOL',
      'Surgical & Non-Surgical Strabismus (Squint) Alignment',
      'Amblyopia (Lazy Eye) Occlusion & Vision Therapy',
      'Paediatric Glaucoma (Goniotomy & Trabeculotomy)',
      'Retinopathy of Prematurity (ROP) Laser & Anti-VEGF',
      'Autism & Developmental Milestone Pediatric Vision Clinic'
    ],
    keyTreatments: [
      'Child-friendly non-threatening visual assessment suites',
      'Micro-surgical squint alignment with adjustable suture options',
      'Comprehensive lazy eye rehabilitation protocols preventing permanent deficit'
    ],
    equipment: [
      {
        name: 'RetCam Envision Digital Pediatric Retinal Imaging',
        description: 'Wide-field 130-degree digital camera for bedside neonatal ROP screening and pediatric fundus documentation.',
        image: '/assets/images/squint-eye-treatment-and-surgery-720x720.png'
      }
    ],
    doctors: ['Dr. Kaushik Murali', 'Dr. Ridhi Upadhyay', 'Dr. Rajesh Prabu', 'Dr. Sowmya R', 'Dr. Vidhya C'],
    faqs: [
      {
        question: 'At what age should a child have their first comprehensive eye exam?',
        answer: 'Healthy infants should undergo basic visual tracking evaluation by 6 months of age. A comprehensive pediatric eye examination is recommended at age 3, and again at age 5 before entering school. If you notice any eye turn, white reflex in photos, constant eye rubbing, or head tilting, consult a pediatric ophthalmologist immediately regardless of age.'
      },
      {
        question: 'Can squint (strabismus) in children be cured without surgery?',
        answer: 'Yes, certain types of squints (such as accommodative esotropia) are caused by focusing effort due to high hyperopia (farsightedness) and can be completely corrected with specialized eyeglasses. For other squints, micro-surgical realignment of the extraocular muscles safely straightens the eyes and allows normal binocular 3D depth perception.'
      }
    ]
  },

  // 6. Glaucoma & Sight Preservation
  {
    id: 'glaucoma',
    title: 'Glaucoma & Sight Preservation',
    tagline: 'Silent Sight Thief Defense: Early OCT RNFL Detection, SLT Laser & Micro-Invasive Shunts',
    shortDescription: 'Comprehensive glaucoma screening, 24-hour diurnal IOP monitoring, non-invasive Selective Laser Trabeculoplasty (SLT), Trabeculectomy, and Ahmed Valve Implants.',
    fullDescription: 'Glaucoma is often termed the silent thief of sight because progressive optic nerve damage occurs gradually without pain or early noticeable symptoms. Sankara’s Glaucoma service provides gold-standard Applanation Tonometry, Humphrey visual field perimetry, and optic nerve OCT diagnostics alongside advanced medical, laser, and surgical therapies to preserve vision for life.',
    icon: 'Shield',
    image: '/assets/images/10.jpg',
    subSpecialties: [
      'Humphrey Field Analyzer (HFA3) Swedish Interactive Perimetry',
      'Selective Laser Trabeculoplasty (SLT) & Nd:YAG Peripheral Iridotomy',
      'Micro-Invasive Glaucoma Surgeries (MIGS)',
      'Trabeculectomy with Antimetabolites (Mitomycin C / 5-FU)',
      'Ahmed Glaucoma Valve (AGV) & Baerveldt Aqueous Shunt Implants',
      'Spectral-Domain OCT Retinal Nerve Fiber Layer (RNFL) Tracking'
    ],
    keyTreatments: [
      'Non-thermal SLT laser reducing dependence on daily pressure drops',
      'Aqueous shunt drainage surgery for complicated and refractory glaucoma',
      'Lifelong computerized optic disc progression analysis protocols'
    ],
    equipment: [
      {
        name: 'Zeiss Humphrey Field Analyzer (HFA3)',
        description: 'World benchmark for computerized automated perimetry with SITA Faster algorithms for visual field mapping.',
        image: '/assets/images/10.jpg'
      }
    ],
    doctors: ['Dr. Pallavi Joshi', 'Dr. Meena G Menon', 'Dr. Lalitha K J', 'Dr. Niharika Singri', 'Dr. Sudhakar Potti'],
    faqs: [
      {
        question: 'Why is glaucoma called the "Silent Thief of Sight"?',
        answer: 'Open-angle glaucoma typically has zero pain, redness, or early visual blur. Optic nerve damage starts by eroding peripheral (side) vision first. Because the brain compensates and the other eye fills in gaps, patients rarely notice vision loss until central vision is threatened at advanced stages. Only regular eye pressure and optic nerve screenings can detect it early.'
      },
      {
        question: 'Can vision lost to glaucoma be restored, and what is the treatment goal?',
        answer: 'Vision lost to glaucoma cannot be recovered because damaged optic nerve axons cannot regenerate. The sole goal of treatment is to arrest further damage by lowering intraocular pressure (IOP) to a safe "target pressure" via pressure-lowering eye drops, non-invasive SLT laser, or surgical filtering procedures.'
      }
    ]
  },

  // 7. Orbit, Oculoplasty & Aesthetics
  {
    id: 'orbit-oculoplasty',
    title: 'Orbit, Oculoplasty & Aesthetics',
    tagline: 'Cosmetic Eyelid Rejuvenation, Ptosis Correction, Endoscopic DCR & Custom Artificial Eyes',
    shortDescription: 'Functional and aesthetic eyelid repairs, droopy eyelid ptosis correction, scarless tear duct surgery (DCR), orbital fracture management, and custom ocularistry.',
    fullDescription: 'Our Oculoplasty, Orbit, and Facial Ophthalmic Plastic Surgery service bridges microsurgical precision with cosmetic and reconstructive expertise. We treat drooping eyelids (ptosis), eyelid malpositions (entropion/ectropion), blocked tear ducts, facial spasms, thyroid eye disease, and orbital tumors, alongside a dedicated Ocularistry wing providing handcrafted 3D custom prosthetic eyes.',
    icon: 'HeartPulse',
    image: '/assets/images/12.jpg',
    subSpecialties: [
      'Ptosis (Drooping Eyelid) Correction (Levator Resection / Frontalis Sling)',
      'Endoscopic Dacryocystorhinostomy (Endo-DCR Tear Duct Bypass)',
      'Cosmetic Blepharoplasty (Under-Eye Bags & Dermatochalasis)',
      'Thyroid Eye Disease (Graves Ophthalmopathy Orbital Decompression)',
      'Orbital Trauma, Blowout Fracture & Soft Tissue Reconstruction',
      'Custom Acrylic Prosthetic Eyes (Ocularistry)'
    ],
    keyTreatments: [
      'Scarless endonasal endoscopic tear duct clearance for chronic watering eyes',
      'Aesthetic eyelid alignment restoring youthful appearance and superior visual fields',
      'Color-matched handcrafted artificial eyes with realistic movement'
    ],
    equipment: [
      {
        name: 'Karl Storz Endoscopic Sinus / DCR Surgical Tower',
        description: 'HD video endoscopic instrumentation enabling incision-free endonasal tear duct clearance.',
        image: '/assets/images/12.jpg'
      }
    ],
    doctors: ['Dr. Shashidhar V S', 'Dr. Divyansh K Mishra', 'Dr. Payal Naresh Shah'],
    faqs: [
      {
        question: 'What causes drooping eyelids (Ptosis) and can it be corrected safely?',
        answer: 'Ptosis occurs when the levator muscle responsible for raising the upper eyelid is stretched, weakened, or detached due to aging, congenital muscle weakness, prolonged contact lens wear, or nerve conditions. Ptosis surgery tightens or reattaches the muscle through a tiny natural skin crease incision, restoring normal eyelid height, unobstructed visual fields, and symmetrical aesthetics.'
      },
      {
        question: 'How are watery eyes treated without external facial scars?',
        answer: 'Chronic tearing is often caused by nasolacrimal tear duct blockage. Through Endoscopic Endonasal DCR, our surgeons bypass the obstruction from inside the nose using high-definition endoscopes. This completely eliminates any external skin cuts, facial scars, or visible stitches.'
      }
    ]
  },

  // 8. Uveitis & Ocular Immunology
  {
    id: 'uvea',
    title: 'Uveitis & Ocular Immunology',
    tagline: 'Targeted Management of Complex Intraocular Inflammation & Autoimmune Diseases',
    shortDescription: 'Diagnostic evaluation, immunosuppressive therapy, intravitreal implants, and biologicals for anterior, intermediate, posterior, and panuveitis.',
    fullDescription: 'Uveitis is an inflammatory condition affecting the vascular uveal tract (iris, ciliary body, and choroid) and adjacent ocular tissues. Our Uveitis service combines advanced diagnostic imaging with systemic rheumatologic and infectious disease workups, delivering customized immunosuppressive regimens, biologic therapies, and sustained-release steroid implants to control inflammation while protecting the optic nerve and macula.',
    icon: 'Activity',
    image: '/assets/images/11.jpg',
    subSpecialties: [
      'Anterior Uveitis & Iridocyclitis Management',
      'Intermediate Uveitis & Pars Planitis Therapy',
      'Posterior Uveitis, Choroiditis & Retinal Vasculitis',
      'Sustained-Release Intraocular Steroid Implants (Ozurdex / Iluvien)',
      'Systemic Immunosuppressive & Biologic Monoclonal Therapy',
      'Infectious Uveitis (Tuberculosis, Toxoplasmosis, Viral Necrosis)'
    ],
    keyTreatments: [
      'Comprehensive autoimmune and systemic infection panels',
      'Targeted non-steroidal immunosuppression saving sight and systemic health',
      'Collaborative multidisciplinary rheumatology consultations'
    ],
    equipment: [
      {
        name: 'Heidelberg Spectralis Multimodal Imaging Platform',
        description: 'Simultaneous Fluorescein and Indocyanine Green (ICG) Angiography visualizing deep choroidal inflammatory foci.',
        image: '/assets/images/11.jpg'
      }
    ],
    doctors: ['Dr. Nisha Ahuja', 'Dr. Anand Parthasarathy', 'Dr. Meena G Menon'],
    faqs: [
      {
        question: 'What are the classic symptoms of Uveitis and when should I see a doctor?',
        answer: 'Classic symptoms include eye redness, deep aching eye pain, marked light sensitivity (photophobia), blurred vision, and a sudden onset of dark floaters. Unlike simple conjunctivitis, uveitis causes deep ocular pain and requires immediate specialist intervention to prevent secondary cataracts, glaucoma, or macular edema.'
      },
      {
        question: 'Is Uveitis linked to other diseases in the body?',
        answer: 'Yes. In over 50% of non-infectious cases, uveitis is associated with underlying systemic autoimmune conditions such as Ankylosing Spondylitis (HLA-B27), Rheumatoid Arthritis, Sarcoidosis, Lupus, or Inflammatory Bowel Disease. Our specialists coordinate comprehensive blood and radiographic investigations to treat the root systemic condition.'
      }
    ]
  },

  // 9. Neuro-Ophthalmology & Visual Pathways
  {
    id: 'neuro-ophthalmology',
    title: 'Neuro-Ophthalmology & Visual Pathways',
    tagline: 'Specialized Interface between Ophthalmology, Neurology & Neurosurgery',
    shortDescription: 'Evaluation of optic nerve disorders, unexplained vision loss, double vision (diplopia), papilledema, cranial nerve palsies, and brain-related visual symptoms.',
    fullDescription: 'Neuro-Ophthalmology addresses visual symptoms originating from the brain, cranial nerves, and optic pathways. Our faculty evaluates complex conditions including optic neuritis, ischemic optic neuropathy, intracranial hypertension with papilledema, myasthenia gravis, and visual field defects caused by pituitary adenomas and stroke.',
    icon: 'Sparkles',
    image: '/assets/images/14-2.jpg',
    subSpecialties: [
      'Optic Neuritis & Multiple Sclerosis Ophthalmic Workup',
      'Idiopathic Intracranial Hypertension (IIH) & Papilledema Monitoring',
      'Diplopia (Double Vision) & Cranial Nerve III, IV, VI Palsies',
      'Ischemic Optic Neuropathies (AION & PION)',
      'Myasthenia Gravis Ocular Manifestations',
      'Visual Field Loss from Brain Tumors & Cerebrovascular Stroke'
    ],
    keyTreatments: [
      'High-resolution Optical Coherence Tomography of the retinal nerve fiber layer',
      'Automated kinetic and static perimetric visual pathway localization',
      'Coordinated neuro-imaging (MRI/MRV/CT) referral and medical management'
    ],
    equipment: [
      {
        name: 'Zeiss Humphrey Visual Field Analyzer with Neurological Protocols',
        description: 'Mapping chiasmal and retrochiasmal neurological field deficits including bitemporal hemianopia.',
        image: '/assets/images/14-2.jpg'
      }
    ],
    doctors: ['Dr. Ridhi Upadhyay', 'Dr. Shashidhar V S', 'Dr. Kaushik Murali'],
    faqs: [
      {
        question: 'What causes sudden double vision (Diplopia) and what should I do?',
        answer: 'Sudden double vision can result from weakness in the cranial nerves controlling the eye muscles (often triggered by diabetes, hypertension, microvascular ischemia, or neurological conditions) or muscle disorders like Myasthenia Gravis. A comprehensive neuro-ophthalmic evaluation is crucial to determine if emergent brain imaging is required.'
      },
      {
        question: 'What is Papilledema and why is it dangerous?',
        answer: 'Papilledema is swelling of both optic nerves caused by elevated pressure inside the skull (intracranial hypertension). It can stem from brain tumors, blood clots in intracranial veins, or idiopathic intracranial hypertension. If left untreated, severe pressure damages optic nerve fibers permanently, causing irreversible blindness.'
      }
    ]
  },

  // 10. Ocular Oncology & Retinoblastoma
  {
    id: 'ocular-oncology',
    title: 'Ocular Oncology & Retinoblastoma',
    tagline: 'Life-Saving & Eye-Preserving Care for Intraocular Tumors & Retinoblastoma',
    shortDescription: 'Comprehensive management of childhood retinoblastoma, choroidal melanoma, ocular surface squamous neoplasia (OSSN), and eyelid tumors.',
    fullDescription: 'Our Ocular Oncology service provides compassionate, evidence-based management for benign and malignant tumors of the eye and surrounding structures. Focusing primarily on childhood Retinoblastoma, ocular surface neoplasms, and choroidal tumors, our multi-disciplinary team prioritizes saving life, saving the eye, and preserving visual function through intra-arterial chemotherapy, plaque radiotherapy, cryotherapy, and micro-surgery.',
    icon: 'Shield',
    image: '/assets/images/15-1.jpg',
    subSpecialties: [
      'Childhood Retinoblastoma Multi-Modal Therapy',
      'Ocular Surface Squamous Neoplasia (OSSN) Topical Chemotherapy & Excision',
      'Choroidal Melanoma & Hemangioma Diagnosis',
      'Eyelid Basal Cell & Sebaceous Carcinoma Micro-Surgery',
      'Transpupillary Thermotherapy (TTT) & Retinal Cryopexy'
    ],
    keyTreatments: [
      'Systemic, intra-arterial, and intravitreal chemotherapy delivery',
      'No-touch surgical excisions with cryotherapy margin clearance',
      'Long-term tumor surveillance and genetic counseling for families'
    ],
    equipment: [
      {
        name: 'RetCam Envision Wide-Angle Pediatric Digital Imaging',
        description: 'Documenting retinoblastoma tumor regression and calcification throughout chemotherapy cycles.',
        image: '/assets/images/15-1.jpg'
      }
    ],
    doctors: ['Dr. Mahesh Shanmugam P', 'Dr. Kaushik Murali', 'Dr. Shashidhar V S'],
    faqs: [
      {
        question: 'What is a "White Reflex" (Leukocoria) in a child’s pupil and why is it urgent?',
        answer: 'A white reflex (cat’s eye glow), where the child’s pupil looks whitish or shiny in dim light or flash photographs instead of normal red, is the most common early sign of Retinoblastoma (childhood eye cancer). Any child with a white pupil must be examined by an ocular oncologist or pediatric ophthalmologist within 24–48 hours for life-saving care.'
      },
      {
        question: 'Can children with eye cancer keep their eyes and vision?',
        answer: 'Yes! With modern advancements such as systemic and intra-arterial chemotherapy combined with laser thermotherapy and cryotherapy, over 90-95% of children survive and many retain their eyes and useful vision when diagnosed in the early to intermediate stages.'
      }
    ]
  },

  // 11. Vision Enhancement & Low Vision Rehabilitation
  {
    id: 'low-vision',
    title: 'Vision Enhancement & Low Vision Rehabilitation',
    tagline: 'Empowering Severely Visually Impaired Individuals to Live Independently',
    shortDescription: 'Optical and electronic magnifiers, high-tech digital reading aids, glare filters, and mobility training for individuals with irreversible vision loss.',
    fullDescription: 'For patients whose vision cannot be restored through medical or surgical interventions (such as advanced retinitis pigmentosa, severe AMD, or end-stage glaucoma), our Low Vision Clinic provides transformative rehabilitation. We prescribe optical telescopes, electronic video magnifiers, tactile devices, and adaptive software to rebuild daily reading, vocational, and personal independence.',
    icon: 'BookOpen',
    image: '/assets/images/13.jpg',
    subSpecialties: [
      'High-Power Optical Telescopes & Handheld Magnifiers',
      'Electronic Digital Video Magnifiers (CCTV Desktop Readers)',
      'Contrast-Enhancing Medical Filter Lenses',
      'Computer Screen Reading & Text-to-Speech Software Training',
      'Orientation & Safe Mobility Skills for Daily Living'
    ],
    keyTreatments: [
      'Comprehensive functional visual acuity and contrast testing',
      'Personalized device selection tailored to reading, vocational, or student tasks',
      'Family counseling and educational adaptation guidance'
    ],
    equipment: [
      {
        name: 'High-Definition Digital Optical Magnification Console',
        description: 'Macro contrast enhancement consoles providing up to 60x magnification with inverted color contrast.',
        image: '/assets/images/13.jpg'
      }
    ],
    doctors: ['Dr. Nisha Ahuja', 'Dr. Minija C K', 'Dr. Vidhya C'],
    faqs: [
      {
        question: 'Who can benefit from Low Vision aids?',
        answer: 'Anyone with significant vision impairment that cannot be fully corrected with standard eyeglasses, contact lenses, or surgery. Common beneficiaries include individuals with age-related macular degeneration, diabetic retinopathy, Stargardt disease, retinitis pigmentosa, optic atrophy, or congenital nystagmus.'
      },
      {
        question: 'Are there aids that help students or working professionals read computer screens?',
        answer: 'Yes. We prescribe specialized optical telescopes for blackboard reading, portable electronic video magnifiers, and screen-reading software (such as JAWS, NVDA, and ZoomText) that converts text to high-contrast speech or braille displays.'
      }
    ]
  },

  // 12. Specialized Contact Lens & Keratoconus Clinic
  {
    id: 'contact-lens',
    title: 'Specialized Contact Lens & Keratoconus Clinic',
    tagline: 'Custom Scleral, Mini-Scleral, Rose K & Orthokeratology Fittings for Irregular Corneas',
    shortDescription: 'Advanced customized contact lens solutions for keratoconus, post-corneal transplant astigmatism, severe dry eye disease, and myopia control.',
    fullDescription: 'Our Specialized Contact Lens Clinic caters to complex corneas that cannot achieve sharp vision with ordinary eyeglasses or soft lenses. We specialize in custom-fit Scleral and Mini-Scleral lenses, Rose K keratoconus designs, Rigid Gas Permeable (RGP) lenses, Orthokeratology (Ortho-K overnight lenses), and prosthetic colored lenses for disfigured or traumatized eyes.',
    icon: 'Eye',
    image: '/assets/images/16.jpg',
    subSpecialties: [
      'Custom Scleral & Mini-Scleral Lenses for Severe Keratoconus',
      'Rose K Geometry Lenses for Irregular Astigmatism',
      'Rigid Gas Permeable (RGP) High-Oxygen Lenses',
      'Orthokeratology (Ortho-K) Overnight Lenses for Pediatric Myopia Control',
      'Prosthetic Hand-Painted Soft Contact Lenses for Corneal Scars',
      'Bandage Contact Lenses (BCL) for Non-Healing Corneal Epithelial Defects'
    ],
    keyTreatments: [
      'Vaulted scleral lenses creating a continuous fluid reservoir over irregular corneas',
      'Dramatically improving visual acuity from 6/60 to 6/6 in advanced keratoconus',
      'Precision diagnostic trial fitting guided by corneal anterior segment OCT'
    ],
    equipment: [
      {
        name: 'Oculus Pentacam HR Rotating Scheimpflug Tomograph',
        description: 'Generating elevation maps of both anterior and posterior corneal surfaces to customize exact lens vaults.',
        image: '/assets/images/16.jpg'
      }
    ],
    doctors: ['Dr. Nisha Ahuja', 'Dr. Shruthi Tara', 'Dr. Pallavi Joshi'],
    faqs: [
      {
        question: 'Why are Scleral lenses so effective for Keratoconus and irregular corneas?',
        answer: 'Unlike regular contact lenses that rest directly on the sensitive, irregular cornea, Scleral lenses are large-diameter gas-permeable lenses that vault completely over the diseased cornea and rest comfortably on the sclera (white of the eye). The space between the lens and cornea is filled with sterile saline, creating a perfectly smooth artificial optical surface that neutralizes irregular astigmatism and provides crisp 6/6 vision.'
      },
      {
        question: 'Can contact lenses slow down the progression of nearsightedness (myopia) in children?',
        answer: 'Yes! Orthokeratology (Ortho-K) lenses are specialized gas-permeable lenses worn only while sleeping at night to gently reshape the corneal epithelium. When removed in the morning, the child enjoys sharp 20/20 vision all day without glasses, while clinical studies demonstrate a 50-60% reduction in childhood myopia progression.'
      }
    ]
  }
];
