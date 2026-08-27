-- ============================================================================
-- SANKARA EYE HOSPITAL - POSTGRESQL SEED DATA
-- Version: 2.0 (Golden Jubilee Edition)
-- ============================================================================

-- 1. Default Super Admin
INSERT INTO admin_users (email, password_hash, full_name, role)
VALUES ('admin@sankaraeye.com', '$2b$10$epRkZ.b6sEw7Yv3X0T6.wOKw9xGg6J8qjZ9C9X1wQ6p5kXvKkYyqy', 'Sankara Administrator', 'Super Administrator')
ON CONFLICT (email) DO NOTHING;

-- 2. 50th Golden Jubilee Flagship Conference Popup
INSERT INTO promo_popups (
    slug,
    title,
    badge,
    description,
    image_url,
    event_date,
    event_time,
    event_venue,
    cta_text,
    cta_link,
    secondary_cta_text,
    secondary_cta_link,
    is_form_mode,
    is_enabled,
    valid_until
) VALUES (
    'vision-2026-symposium',
    'Vision 2026: 50th Golden Jubilee National Ophthalmology Conference',
    '✨ Upcoming Flagship Conference',
    'Join over 1,200+ leading ophthalmic surgeons, DNB fellows, and healthcare pioneers at the Sankara Academy Coimbatore for masterclasses in Advanced LASIK, Vitreo-Retina, and Artificial Intelligence.',
    '/assets/images/Sankara-50th-Year-Logo.png',
    'October 15 - 18, 2026',
    '9:00 AM - 5:30 PM IST',
    'Sankara Academy of Vision, Sathy Road, Coimbatore & Virtual Webcast',
    'Register on events.sankaraeye.in →',
    'https://events.sankaraeye.in',
    'View All Academic CMEs',
    '#/events',
    false,
    true,
    '2026-11-30'
) ON CONFLICT (slug) DO NOTHING;

-- 3. Board of Trustees
INSERT INTO council_members (category, name, role, desc_text, image_url, display_order) VALUES
('trustees', 'Dr. S.V. Balasubramaniam', 'Chairman – Sri Kanchi Kamakoti Medical Trust', 'Guiding institutional governance, ethical healthcare stewardship, and national mission expansion for 45+ years.', '/assets/images/dr-sv-balasubramaniam.png', 1),
('trustees', 'Dr. R.V. Ramani', 'Founder & Managing Trustee', 'Pioneered the 80:20 self-sustaining cross-subsidy rural eye care model. Consecrated 14 super-specialty hospitals.', '/assets/images/dr-rv-ramani.jpg', 2),
('trustees', 'Dr. P.G. Visvanathan', 'Founder Trustee & Senior Surgeon', 'Co-founder of the movement in 1977. Oversees surgical excellence benchmarks and clinical ethics protocols.', '/assets/images/admin-ajax-8.png', 3),
('trustees', 'Dr. S.R. Rao', 'Founder Trustee & Senior Physician', 'Co-founder since the inception in 1977. Directs community health outreach and preventative diagnostics.', '/assets/images/admin-ajax-9.png', 4),
('trustees', 'Dr. S. Balasubramaniam', 'Founder Trustee & Senior Consultant', 'Co-founder in 1977. Champions rural eye screening logistics and scalable primary healthcare access.', '/assets/images/admin-ajax-10.png', 5),
('trustees', 'Shri. Jagdish M. Chanrai', 'Philanthropist & International Trustee', 'Global healthcare philanthropist supporting infrastructure scaling, equipment donations, and tribal outreach.', '/assets/images/admin-ajax-11.png', 6),
('trustees', 'Mrs. Seetha Chandrasekar', 'Trustee & Community Advocate', 'Leads women empowerment, patient counseling programs, and pediatric vision screening initiatives.', '/assets/images/admin-ajax-13.png', 7),
('trustees', 'Shri. M.N. Padmanaban', 'Trustee & Industrialist', 'Advising on institutional governance, rural hospital construction logistics, and audited fiscal ethics.', '/assets/images/admin-ajax-14.png', 8);

-- 4. Steering Council
INSERT INTO council_members (category, name, role, desc_text, image_url, display_order) VALUES
('steering', 'Mrs. Rekha Jhunjhunwala', 'Philanthropist & Investor', 'Key patron for the R. Jhunjhunwala Sankara Eye Hospital in Varanasi, bringing tertiary vision care to Eastern UP & Bihar.', '/assets/images/Mrs.Rekha-Jhunjhunwala.jpeg', 1),
('steering', 'Prof. V. Kamakoti', 'Director – IIT Madras', 'Guiding biomedical technology integration, tele-retina AI diagnostics, and indigenous surgical innovations.', '/assets/images/prof-kamakoti.jpg', 2),
('steering', 'Mr. S.V. Veerramani', 'Chairman – Fourrts (India) Laboratories Pvt Ltd', 'Providing pharmaceutical supply chain advisory, pharmaceutical quality control, and clinical support.', '/assets/images/admin-ajax-17.png', 3),
('steering', 'Mr. S.G. Murali', 'Chief Financial Officer – T.V.S. Motor Company Ltd', 'Advising on institutional fiscal strategy, capital budgeting, and sustainable operational scaling.', '/assets/images/admin-ajax-18.png', 4),
('steering', 'Mr. Bhaskar Bhat', 'Chairman – Tata SIA Airlines Ltd & Former MD Titan', 'Guiding corporate governance, service excellence benchmarks, and brand stewardship.', '/assets/images/admin-ajax-20.png', 5),
('steering', 'Dr. P. Janakiraman', 'Senior Eye Surgeon', 'Providing clinical mentorship, surgical fellowship standards, and tertiary subspecialty development.', '/assets/images/admin-ajax-21.png', 6),
('steering', 'Mr. D. Balasundaram', 'Managing Director – Power Link System Pvt Ltd', 'Advising on green hospital infrastructure, energy efficiency, and operational logistics.', '/assets/images/balasundaram.png', 7);

-- 5. Leadership Council
INSERT INTO council_members (category, name, role, desc_text, image_url, display_order) VALUES
('leadership', 'Dr. Kaushik Murali', 'President – Medical Administration, Quality & Training', 'Directs clinical administration across 14 units, pediatric ophthalmology, and DNB fellowship academies.', '/assets/images/kaushik.png', 1),
('leadership', 'Mr. Bharath Balasubramaniam', 'President – Operations & Administration', 'Oversees nationwide hospital supply chain, rural camp logistics, and infrastructure execution.', '/assets/images/bharath-balasubramaniam.png', 2),
('leadership', 'Ms. Srini Karthikeyan', 'Chief People Officer', 'Directs talent acquisition, employee development, and community nurse empowerment initiatives.', '/assets/images/srini-madam.jpg', 3),
('leadership', 'Mr. Sankaran G. Sreenivasan', 'Head – ID, RM & Information Security', 'Leads digital health infrastructure, donor data security, and enterprise information systems.', '/assets/images/sankaran-1.jpg', 4);

-- 6. Events & Conferences
INSERT INTO events (title, category, date_text, time_text, location, description, is_free_camp, contact_number, registration_url, banner_image) VALUES
('Vision 2026: 50th Golden Jubilee National Ophthalmology Conference', 'Conference', 'Oct 15 - 18, 2026', '9:00 AM - 5:30 PM IST', 'Sankara Academy of Vision, Coimbatore & Virtual', 'Flagship symposium bringing together 1,200+ surgeons, DNB fellows, and researchers for masterclasses in LASIK, Vitreo-Retina, and AI.', false, '0422-4234200', 'https://events.sankaraeye.in', '/assets/images/Sankara-50th-Year-Logo.png'),
('Advanced Pediatric Strabismus & Neuro-Ophthalmology CME', 'Symposium', 'Nov 08, 2026', '10:00 AM - 4:00 PM IST', 'Sankara Eye Hospital, Kundalahalli Gate, Bangalore', 'Specialized surgical workshop on complex pediatric squint correction and amblyopia therapy.', false, '080-28542727', 'https://events.sankaraeye.in', '/assets/images/Sankara-Bangalore-sq.jpg'),
('Rural Free Cataract & Refraction Mega Camp – Virudhunagar District', 'Rural Mega Camp', 'Sept 12 - 14, 2026', '8:00 AM - 2:00 PM IST', 'Community Health Center, Krishnankoil, Tamil Nadu', 'Complete free vision screening, refraction tests, and transport for cataract surgeries.', true, '04563-289500', 'https://events.sankaraeye.in', '/assets/images/gift-of-vision-program.png');
