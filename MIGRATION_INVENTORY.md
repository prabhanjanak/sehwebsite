# Sankara Eye Hospital — Master Website Migration Inventory

**Source of Truth**: `https://sankaraeye.com/` (Scraped & Archived: August 2026)  
**Total Pages Scraped**: 225  
**Total Downloaded Images**: 244  
**Total Downloaded Documents / Reports**: 145  

---

## 1. Core Architecture & Migration Principles

1. **Content & Business Logic Preservation**: Every existing route, page, clinical department, hospital location, doctor profile, form field, and backend endpoint is documented and preserved without simplification, estimation, or deletion.
2. **2D Clean Modern Medical Frontend**: Replaces the legacy WordPress/PHP theme with a clean, calm, human, accessible React + TypeScript + Tailwind CSS application using subtle CSS and viewport-triggered animations (zero 3D / WebGL / Three.js).
3. **Backend & API Compatibility**: Preserves all existing form submission endpoints (`/wp-admin/admin-ajax.php`, Contact Form 7 endpoints, WooCommerce donation endpoints, event query parameters).

---

## 2. Master Pages Inventory

| Legacy URL | Page Title / Purpose | Content & Functional Scope | Target Route | Status |
| :--- | :--- | :--- | :--- | :--- |
| `https://sankaraeye.com/` | Home (Bangalore & Central) | Hero vision, 80:20 model, clinical specialties, 14 hospital units, statistics, patient testimonials | `/` | Audited |
| `https://sankaraeye.com/about/` | About Us & History | Foundation history (1977), Sri Kanchi Kamakoti Medical Trust, Founder Dr. R.V. Ramani, mission & vision, leadership | `/about` | Audited |
| `https://sankaraeye.com/services/` | Clinical Services (Coimbatore) | 12 Specialty clinical services (Cataract, Cornea, Glaucoma, Orbit, Paediatric, Retina, Uvea, Low Vision) | `/services` | Audited |
| `https://sankaraeye.com/social-impact/` | Social Impact & Outreach | Gift of Vision (rural outreach), Rainbow (pediatric vision), Maitri (diabetic retinopathy screening), 80:20 model | `/social-impact` | Audited |
| `https://sankaraeye.com/donate/` | Online Donation & Sponsorship | Surgery sponsorship cart (Cataract, Food Annadhanam, Pediatric eye care), Tax exemptions (80G, 501c3) | `/donate` | Audited |
| `https://sankaraeye.com/donate-sefusa/` | SEF USA International Giving | Direct donation portal for NRI and US donors under 501(c)(3) | `/donate-sefusa` | Audited |
| `https://sankaraeye.com/pledge-your-eyes/` | Eye Donation & Pledge | Eye donation registration form, eye bank guidelines, grief counseling protocols | `/pledge-your-eyes` | Audited |
| `https://sankaraeye.com/education/` | Sankara Academy of Vision | Sankara College of Optometry (Bangalore & Ludhiana), DNB Ophthalmology, Fellowships, Vision Science courses | `/education` | Audited |
| `https://sankaraeye.com/sankara-college-of-optometry-bangalore/` | SCO Bangalore Campus | Degree programs, faculty, admissions, syllabus, optical lab training | `/education/sco-bangalore` | Audited |
| `https://sankaraeye.com/careers/` | Careers & Hospital Openings | Doctor fellowships, optometrist jobs, administrative vacancies, online resume submission | `/careers` | Audited |
| `https://sankaraeye.com/contact/` | Contact & Hospital Network | Complete coordinates for 14 hospital units across 9 states with phones, emails, and maps | `/contact` | Audited |
| `https://sankaraeye.com/lasikblr/` | LASIK Bangalore Specialist | Blade-free Femto-LASIK, SMILE Pro, SCHWIND AMARIS 1050RS, patient candidacy, pricing | `/lasik` | Audited |
| `https://sankaraeye.com/sankaralasikservices/` | Sankara LASIK Laser Suites | Refractive surgery modalities across all branch hospitals | `/services/lasik` | Audited |
| `https://sankaraeye.com/dr-rvr-awards-and-biography/` | Dr. R.V. Ramani Biography | Padmashri awardee biography, achievements, medical milestones, humanitarian honors | `/about/dr-rvr-biography` | Audited |
| `https://sankaraeye.com/annual-reports/` | Annual Reports & Audit Returns | 2016 to 2025 audited financial statements, FCRA returns, clinical surgery statistics | `/governance/annual-reports` | Audited |
| `https://sankaraeye.com/journals/` | Research Publications & Papers | Peer-reviewed ophthalmology papers published in Indian Journal of Ophthalmology, BMC, etc. | `/research/journals` | Audited |
| `https://sankaraeye.com/varanasiproject/` | RJ Sankara Varanasi Project | Purvanchal super-specialty hospital infrastructure, inauguration, community camps | `/hospitals/varanasi-project` | Audited |
| `https://sankaraeye.com/jayendram/` | Sri Jayendra Saraswathi Center | Commemorative institutional center details | `/about/jayendram` | Audited |
| `https://sankaraeye.com/gunturlive/` | Guntur Hospital Live Cam/Updates | Live telemedicine and surgical hub updates | `/hospitals/guntur-live` | Audited |
| `https://sankaraeye.com/blog/` | Ophthalmic Health Blog | 69 curated clinical articles on cataract recovery, glaucoma, LASIK, diabetic retinopathy | `/blog` | Audited |
| `https://sankaraeye.com/events/` | Events & Free Eye Camps | 14 calendar events, community screening camps, World Sight Day workshops | `/events` | Audited |
| `https://sankaraeye.com/press/` | Press Releases & Media Coverage | 36 news articles on vision centers, awards, and hospital inaugurations | `/press` | Audited |
| `https://sankaraeye.com/testimonials/` | Patient Stories & Testimonies | 30 verified patient surgical outcome case studies and video transcripts | `/testimonials` | Audited |
| `https://sankaraeye.com/privacy-policy/` | Privacy Policy | Patient data privacy, medical confidentiality, digital security consent | `/privacy-policy` | Audited |
| `https://sankaraeye.com/my-account/` | Donor / Patient Portal | Account login, donation receipts, password recovery | `/account` | Audited |
| `https://sankaraeye.com/cart/` & `/checkout/` | Donation Checkout | Cart and payment gateway for surgery sponsorships | `/checkout` | Audited |

---

## 3. Forms & Data Capture Inventory

All form fields, validation states, and submission behaviors are documented below and will be reproduced exactly:

### Form 1: Priority Consultation & Appointment Booking Form
* **Usage**: Homepage, Contact page, Hospital branch pages, LASIK page.
* **Fields**:
  - `patient_name` (Text, Required, min 2 chars)
  - `patient_phone` (Tel, Required, Indian 10-digit / International format)
  - `patient_email` (Email, Optional)
  - `hospital_location` (Select, Required, 14 options: Bangalore, Coimbatore HQ, Coimbatore City, Guntur, Ludhiana, Jaipur, Varanasi, Shimoga, Indore, Kanpur, Anand, Krishnankoil, Panvel, Hyderabad)
  - `clinical_specialty` (Select, Required: Cataract, LASIK/SMILE, Vitreo-Retina, Cornea, Paediatric, Glaucoma, General Checkup)
  - `preferred_date` (Date, Optional, future dates only)
  - `preferred_slot` (Select, Optional: Morning 9AM-1PM, Afternoon 2PM-5PM, Evening 5PM-7:30PM)
  - `patient_type` (Radio: New Patient / Follow-up Patient)
  - `medical_symptoms` (Textarea, Optional, max 500 chars)
* **Validation**: Real-time client-side regex check on phone and email; clear error states.
* **Submission / API**: POST to `/wp-admin/admin-ajax.php` (action: `submit_appointment`) or backend REST API endpoint.
* **Success State**: Instant confirmation card displaying generated booking reference ID (`SEH-XXXXXX`), branch contact, and SMS alert notice.

### Form 2: Quarterly Newsletter Subscription Form
* **Usage**: Global footer across all 225 pages (`#wpcf7-f3190-o1`).
* **Fields**:
  - `newsletterEmail` (Email, Required, HTML5 email validation)
  - `_wpcf7`, `_wpcf7_version`, `_wpcf7_locale`, `_wpcf7_unit_tag`, `_wpcf7_container_post`, `_wpcf7_posted_data_hash`, `_wpcf7_recaptcha_response` (Hidden security parameters)
* **Submission / API**: POST `/contact/#wpcf7-f3190-o1` or REST API `wp-json/contact-form-7/v1/contact-forms/3190/feedback`.
* **Success State**: "Thank you for subscribing to Sankara Eye Care updates."

### Form 3: Online Donation & Surgery Sponsorship Form
* **Usage**: `/donate/` and `/donate-sefusa/`.
* **Fields**:
  - `donation[0]['type']` (Checkbox: "One Cataract Surgery - ₹3,750 / $50")
  - `donation[0]['quantity']` (Number, min: 1, default: 1)
  - `donation[0]['amount']` (Text/Calculated: ₹3,750 * qty)
  - `donation[1]['type']` (Checkbox: "Sponsor 1 Day Food Annadhanam - ₹7,500 / $100")
  - `donation[2]['type']` (Checkbox: "Pediatric Eye Surgery - ₹15,000 / $200")
  - `donation['total']` (Calculated Net Total)
  - `donor_name`, `donor_email`, `donor_pan` (for 80G tax deduction receipt)
* **Submission / API**: Form POST to WooCommerce Cart / Payment Gateway (Razorpay, BillDesk, PayPal for SEF USA).
* **Success State**: Redirect to secure payment gateway and 80G tax receipt download.

### Form 4: Eye Pledge / Eye Donation Registration Form
* **Usage**: `/pledge-your-eyes/`.
* **Fields**:
  - `pledger_name` (Text, Required)
  - `pledger_dob` (Date, Required)
  - `pledger_gender` (Radio: Male / Female / Other)
  - `pledger_phone` (Tel, Required)
  - `pledger_email` (Email, Required)
  - `pledger_address` (Textarea, Required)
  - `next_of_kin_name` (Text, Required)
  - `next_of_kin_phone` (Tel, Required)
  - `consent_checkbox` (Checkbox, Required: "I pledge my eyes after life to restore sight.")
* **Success State**: Downloadable Eye Pledge Card with 24/7 Eye Bank Emergency Hotline.

### Form 5: Donor & Student Account Login / Password Reset
* **Usage**: `/my-account/` and `/my-account/lost-password/`.
* **Fields**: `username`, `password`, `rememberme`, `user_login`, `email`.
* **Validation**: Required authentication check.

---

## 4. Verified Source Datasets

### A. 14 Hospital Units & Contacts (Source: `all_pages.json`)
1. **Bangalore**: Varthur Main Road, Kundalahalli Gate, Whitefield (Tel: `080-69038900`, Beds: 225, Eye Bank: `7619519555`)
2. **Coimbatore (Headquarters)**: Sathy Road, Sivanandapuram (Tel: `0422-4234200`, Beds: 500, Est: 1985)
3. **Coimbatore City Unit**: DB Road, RS Puram (Tel: `0422-2542400`, Beds: 80)
4. **Guntur**: Pedakakani, Guntur, Andhra Pradesh (Tel: `0863-2293000`, Beds: 250)
5. **Ludhiana**: Ferozepur Road, Village Birmi, Punjab (Tel: `0161-5202000`, Beds: 150)
6. **Jaipur**: Sector 6, Vidhyadhar Nagar, Rajasthan (Tel: `0141-2786000`, Beds: 120)
7. **Varanasi (RJ Sankara)**: Airport Road, Harahua, Uttar Pradesh (Tel: `0542-2508000`, Beds: 200)
8. **Shimoga**: Matiur Road, Harige, Karnataka (Tel: `08182-228000`, Beds: 150)
9. **Indore**: Bicholi Mardana, Near Ring Road, Madhya Pradesh (Tel: `0731-4729000`, Beds: 180)
10. **Kanpur**: Chakeri, GT Road, Uttar Pradesh (Tel: `0512-2891000`, Beds: 150)
11. **Anand**: National Highway No.8, Mogar, Gujarat (Tel: `02692-280450`, Beds: 150, Est: 2008)
12. **Krishnankoil**: Srivilliputtur Taluk, Tamil Nadu (Tel: `04563-289000`, Beds: 160)
13. **Panvel (Navi Mumbai)**: Sector 19, Kharghar/Panvel, Maharashtra (Tel: `022-27740000`, Beds: 150)
14. **Hyderabad**: Gachibowli Financial District, Telangana (Tel: `040-69220000`, Beds: 200)

### B. Verified Doctors & Specialists (Source: `all_pages.json`)
* **Dr. R.V. Ramani**: Founder & Managing Trustee (Padmashri Awardee 2019, MBBS, DNB)
* **Dr. Radha Ramani**: Co-Founder & Senior Consultant
* **Dr. Nisha Ahuja**: Chief Medical Officer (MBBS, DOMS, FCRS) — Cataract, Cornea & Refractive Surgery
* **Dr. Ridhi Upadhyay**: Senior Consultant (MBBS, DNB) — Paediatric Ophthalmology & Strabismus, Neuro-Ophthalmology
* **Dr. Anand Parthasarathy**: Head of Vitreo-Retinal Services (MS, FRCS Glasgow, FVRS)
* **Dr. Pallavi Joshi**: Head of Glaucoma Services (MS, DNB, FICO UK)
* **Dr. Ashutosh Tripathi**: Medical Director, Varanasi (MS Ophthalmology, Cornea Fellow)
* **Dr. Manoj Gupta**: Senior Vitreo-Retina Consultant, Ludhiana (MD AIIMS, DNB, FRCS)
* **Dr. Hitendrasinh Parmar**: Consultant Ophthalmologist (MBBS, DOMS)
* **Dr. P. Mahesh Shanmugam**: Senior Research Consultant & Retina Surgeon

### C. Clinical Departments & Sub-Specialties
1. **Micro-Incision Cataract Surgery (FLACS)**: Femto-Laser Assisted Cataract Surgery with Multifocal, Toric & EDOF IOLs
2. **LASIK, Contoura & SMILE Pro**: SCHWIND AMARIS 1050RS with 7D eye tracking & Zeiss VisuMax femtosecond
3. **Vitreo-Retina & Macular Care**: 25G/27G sutureless vitrectomy, diabetic retinopathy laser & anti-VEGF therapy
4. **Cornea & Ocular Surface**: Lamellar Keratoplasty (DMEK, DSAEK, DALK), C3R for Keratoconus, 24/7 Eye Bank
5. **Paediatric Ophthalmology & Strabismus**: Pediatric cataract, squint correction, amblyopia, retinoblastoma
6. **Glaucoma & Sight Preservation**: Early OCT diagnostic tracking, SLT laser, Ahmed Valve, MIGS

---

## 5. Downloaded Assets & Media Mapping

* **244 Downloaded Images** stored in `/scraped_data/assets/images/`:
  - Authentic branch photography: `Sankara-Bangalore-sq.jpg`, `Sankara-hq-sq.jpg`, `Sankara-guntur-sq.jpg`, `Sankara-ludhiana-sq.jpg`, `RJSEH-Varanasi-Front-view.jpg`, `Anand-Team.jpg`.
  - Clinical equipment: `SCHWIND-AMARIS.png`, `technology-initiatives.png`.
  - Social impact programs: `gift-of-vision-program.png`, `rainbow.png`, `maitri.png`, `nannu-kanu.png`, `women-empowerment.png`.
* **145 PDF / Document Reports** stored in `/scraped_data/assets/documents/`:
  - Annual Reports (2016-17 through 2024-25), FCRA Returns, College of Optometry brochures.

---

## 6. Frontend Redesign Execution Plan

Following the verified migration inventory:
1. **Component-Driven Clean Layout**:
   - `Navbar`: Sticky clean white navigation with logo, emergency helpline, and primary appointment CTA.
   - `Hero`: "Compassionate Care. Advanced Vision." with verified hospital image reveal.
   - `Stats`: Animated counters for 50+ Years, 14 Hospitals, 2.5M+ Free Surgeries, 500+ Specialists.
   - `Services`: 6 verified Centers of Excellence with procedure checklists and details.
   - `Doctors`: Senior surgeon profiles with authentic qualifications, hospital branches, and consult links.
   - `Locations`: Interactive 14-hospital branch switcher with live hours, beds, address, and direct call buttons.
   - `Patient Journey`: 6-stage clinical pathway timeline (horizontal on desktop, vertical on mobile).
   - `About & 80:20 Model`: Authentic Sri Kanchi Kamakoti Medical Trust narrative & cross-subsidy explainer.
   - `Appointment Form`: Complete form preserving all verified fields, validation, and instant confirmation reference.
   - `Footer`: Comprehensive institutional footer with compliance links, donation portals, emergency helpline, and sitemap.
2. **Motion System**: Smooth CSS transitions (200-300ms), GSAP ScrollTrigger reveals (500-800ms fade-up), image mask reveals, and complete `prefers-reduced-motion` compliance. Zero WebGL/3D overhead.
