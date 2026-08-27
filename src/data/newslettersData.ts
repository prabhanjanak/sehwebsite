import { NewsletterItem } from '../types';

export const INITIAL_NEWSLETTERS: NewsletterItem[] = [
  {
    id: 'nl-2026-q2',
    title: '50 Years Golden Jubilee Commemorative Chronicle',
    edition: 'Q2 2026 Special Edition',
    date: 'June 2026',
    coverImage: '/assets/images/Sankara-50th-Year-Logo.png',
    pdfUrl: '#/newsletters',
    description: 'Special Golden Jubilee bulletin celebrating our 50-year crusade against avoidable blindness, 2.6M surgeries milestone, and national network expansion.',
    fileSize: '4.8 MB PDF',
    editorialMessage: 'As we commemorate five decades of compassionate service since May 1977, we reaffirm our sacred credo: no person shall remain needlessly blind for want of money.',
    pages: [
      {
        pageNumber: 1,
        title: 'Five Decades of Sight Restored: 1977 to 2026',
        subtitle: 'From a small dispensary in Coimbatore to India’s premier charitable eye care institution.',
        content: [
          'Founded in May 1977 by Dr. R.V. Ramani and Dr. Radha Ramani with the blessings of the Sankaracharyas of Kanchi, Sri Kanchi Kamakoti Medical Trust began as a modest community healthcare centre.',
          'Today, with 14 super-specialty hospitals operating across 9 Indian states, Sankara has performed over 2.6 Million free eye surgeries with world-class clinical outcomes.',
          'Our unique 80:20 self-sustaining cross-subsidy healthcare model ensures that premium paying patients empower the gift of free sight to underserved rural brethren with zero disparity in clinical standards.'
        ],
        highlights: [
          '2.6+ Million free eye surgeries performed till date',
          '80:20 cross-subsidy social enterprise model',
          '100% NABH certified clinical excellence'
        ],
        quote: 'Sight is not a privilege; it is a fundamental human right.'
      },
      {
        pageNumber: 2,
        title: 'New Frontiers: AI Tele-Ophthalmology & Patna Project',
        subtitle: 'Scaling surgical capacity and rural deep-tech diagnostics to eradicate curable blindness.',
        content: [
          'The Foundation has deployed indigenous Computer Vision AI retinal diagnostic software in our rural vision vans, screening over 140,000 diabetic patients in remote hamlets.',
          'Construction of our upcoming 250-bed super-specialty hospital in Patna, Bihar is progressing ahead of schedule to serve the Gangetic plains.',
          'Our advanced femtosecond laser surgical suites in Bangalore, Coimbatore, and Guntur have trained 85 DNB residents and fellows in blade-free cataract and refractive precision.'
        ],
        highlights: [
          '140,000+ rural patients screened with AI tele-retina',
          'Upcoming 250-bed Patna hospital to inaugurate in late 2026',
          '85 surgical fellows currently in advanced cornea & vitreoretina residency'
        ]
      },
      {
        pageNumber: 3,
        title: 'Community Voices & Global Partner Recognition',
        subtitle: 'Honoring our generous donors, healthcare volunteers, and corporate CSR champions.',
        content: [
          'We extend our heartfelt gratitude to SEF USA, the Jhunjhunwala Foundation, Rotary International, and our corporate partners for their steadfast commitment.',
          'Special tribute to our 600+ paramedical vision technicians and hospital administrators working 24/7 across our national hospital network.'
        ],
        highlights: [
          'SEF USA 501(c)(3) chapters across 24 American cities',
          'Over 600+ dedicated healthcare professionals in rural outreach'
        ]
      }
    ]
  },
  {
    id: 'nl-2026-q1',
    title: 'Vision Spring 2026: Advances in Corneal & AI Screening',
    edition: 'Q1 2026 Edition',
    date: 'March 2026',
    coverImage: '/assets/images/Sankara-hq-sq.jpg',
    pdfUrl: '#/newsletters',
    description: 'Highlights our indigenous AI tele-retina diabetic retinopathy screening in rural villages and DNB surgical convocation highlights.',
    fileSize: '3.9 MB PDF',
    editorialMessage: 'Embracing next-generation diagnostic robotics while maintaining unconditional bedside empathy for rural families.',
    pages: [
      {
        pageNumber: 1,
        title: 'AI in Preventive Ophthalmology',
        subtitle: 'Detecting diabetic macular edema and glaucoma before irreversible optic nerve damage.',
        content: [
          'Our AI-assisted screening cameras in mobile vision vans provide diagnostic reports within 45 seconds, enabling immediate tele-consultation with retina specialists.',
          'Over 12,000 patients with sight-threatening retinopathy received emergency green laser photocoagulation and anti-VEGF therapy free of cost.'
        ],
        highlights: [
          '45-second automated diagnostic screening',
          '12,000+ rural patients treated for diabetic retinopathy'
        ]
      },
      {
        pageNumber: 2,
        title: 'DNB Residency & Fellowship Convocation',
        subtitle: 'Graduating the next generation of compassionate ophthalmologists.',
        content: [
          'The Sankara Academy of Vision celebrated the convocation of 42 DNB post-graduates and sub-specialty fellows with a 100% national board pass rate.',
          'Fellows completed over 1,500 independent phacoemulsification and corneal transplant procedures during their 2-year tenure.'
        ],
        highlights: [
          '100% DNB Board Examination pass rate',
          'Over 1,500 surgeries performed per graduating surgical fellow'
        ]
      }
    ]
  },
  {
    id: 'nl-2025-q4',
    title: 'Winter Vision: Varanasi Hospital Inauguration Retrospective',
    edition: 'Q4 2025 Edition',
    date: 'December 2025',
    coverImage: '/assets/images/Sankara-Bangalore-sq.jpg',
    pdfUrl: '#/newsletters',
    description: 'Comprehensive report on the R. Jhunjhunwala Varanasi super-specialty hospital milestone and rural outreach impact across eastern UP.',
    fileSize: '5.2 MB PDF',
    editorialMessage: 'Bringing tertiary ophthalmic care to the doorstep of Purvanchal and neighboring states.',
    pages: [
      {
        pageNumber: 1,
        title: 'RJ Sankara Eye Hospital Varanasi Milestone',
        subtitle: 'A state-of-the-art 225-bed eye hospital serving Eastern UP and Bihar.',
        content: [
          'Dedicated to the nation with 9 modern modular operation theatres, a dedicated LASIK suite, and a 24/7 emergency eye bank.',
          'In its first 6 months of operation, the hospital screened over 45,000 rural citizens and completed 6,800 free cataract and glaucoma surgeries.'
        ],
        highlights: [
          '225-bed tertiary eye care hub',
          '45,000+ rural screenings in first 180 days',
          'Full-scale 24/7 eye bank and corneal transplantation facility'
        ]
      }
    ]
  },
  {
    id: 'nl-2025-q3',
    title: 'Gift of Vision Autumn 2025 Impact Report',
    edition: 'Q3 2025 Edition',
    date: 'September 2025',
    coverImage: '/assets/images/gift-of-vision-program.png',
    pdfUrl: '#/newsletters',
    description: 'Detailed analysis of rural cross-subsidy surgery volume, school eye screening metrics (Rainbow Program), and donor spotlight.',
    fileSize: '3.4 MB PDF',
    editorialMessage: 'Every cataract surgery sponsored is an entire rural household lifted out of economic helplessness.',
    pages: [
      {
        pageNumber: 1,
        title: 'The Rainbow School Screening Crusade',
        subtitle: 'Ensuring pediatric visual health in government schools.',
        content: [
          'The Rainbow Program screened 280,000 school children across rural districts, providing 18,500 customized prescription spectacles free of cost.',
          'Over 420 children with pediatric cataracts, squint, and ptosis underwent successful corrective surgery.'
        ],
        highlights: [
          '280,000 school children screened in 2025',
          '18,500 free prescription glasses distributed'
        ]
      }
    ]
  }
];
