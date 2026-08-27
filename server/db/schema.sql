-- ============================================================================
-- SRI KANCHI KAMAKOTI MEDICAL TRUST / SANKARA EYE FOUNDATION
-- Production PostgreSQL Enterprise Database Schema
-- Version: 2.0 (50th Golden Jubilee Architecture)
-- ============================================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "citext";

-- Clean drop for idempotent setup (Optional during migrations)
-- DROP SCHEMA public CASCADE; CREATE SCHEMA public;

-- ============================================================================
-- 1. ENUMS & DOMAIN TYPES
-- ============================================================================
CREATE TYPE council_category_enum AS ENUM ('trustees', 'steering', 'leadership');
CREATE TYPE appointment_status_enum AS ENUM ('Pending', 'Confirmed', 'Completed', 'Cancelled');
CREATE TYPE donation_status_enum AS ENUM ('Pending', 'Success', 'Failed', 'Refunded');
CREATE TYPE donation_frequency_enum AS ENUM ('one-time', 'monthly', 'annual');
CREATE TYPE job_type_enum AS ENUM ('Full-time', 'Part-time', 'Fellowship', 'Consultant', 'Voluntary');
CREATE TYPE event_category_enum AS ENUM ('Conference', 'Symposium', 'Workshop', 'Rural Mega Camp', 'Screening Drive');
CREATE TYPE gallery_category_enum AS ENUM ('Hospitals', 'Rural Camps', 'Laser Tech', 'Events & Awards');

-- ============================================================================
-- 2. ADMIN AUTHENTICATION & RBAC
-- ============================================================================
CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email CITEXT UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Super Administrator',
    is_active BOOLEAN NOT NULL DEFAULT true,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 3. PROMO POPUPS & IN-POPUP ATTENDEE REGISTRATIONS
-- ============================================================================
CREATE TABLE promo_popups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    badge VARCHAR(80) NOT NULL DEFAULT '✨ Featured Announcement',
    description TEXT NOT NULL,
    image_url TEXT, -- Optional uncropped event banner / poster
    event_date VARCHAR(100),
    event_time VARCHAR(100),
    event_venue TEXT,
    cta_text VARCHAR(100) NOT NULL DEFAULT 'Register on events.sankaraeye.in →',
    cta_link TEXT NOT NULL DEFAULT 'https://events.sankaraeye.in',
    secondary_cta_text VARCHAR(100),
    secondary_cta_link TEXT,
    is_form_mode BOOLEAN NOT NULL DEFAULT false,
    form_submit_button_text VARCHAR(100) DEFAULT 'Submit Registration →',
    is_enabled BOOLEAN NOT NULL DEFAULT true,
    valid_until DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE popup_registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    popup_id UUID REFERENCES promo_popups(id) ON DELETE SET NULL,
    event_title VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    email CITEXT,
    phone VARCHAR(25) NOT NULL,
    organization VARCHAR(200),
    city VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 4. GOVERNANCE & COUNCIL MEMBERS
-- ============================================================================
CREATE TABLE council_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category council_category_enum NOT NULL,
    name VARCHAR(150) NOT NULL,
    role VARCHAR(200) NOT NULL,
    desc_text TEXT NOT NULL,
    image_url TEXT NOT NULL,
    badge VARCHAR(60),
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 5. CONFERENCES, CME & RURAL CAMPS (events.sankaraeye.in)
-- ============================================================================
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    category event_category_enum NOT NULL DEFAULT 'Conference',
    date_text VARCHAR(100) NOT NULL,
    time_text VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    is_free_camp BOOLEAN NOT NULL DEFAULT false,
    contact_number VARCHAR(30),
    banner_image TEXT,
    registration_url TEXT DEFAULT 'https://events.sankaraeye.in',
    is_external BOOLEAN NOT NULL DEFAULT false,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 6. HOSPITALS & CLINICAL NETWORK
-- ============================================================================
CREATE TABLE hospitals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(80) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    phone VARCHAR(50) NOT NULL,
    emergency_phone VARCHAR(50),
    email CITEXT NOT NULL,
    established_year INT NOT NULL,
    image_url TEXT NOT NULL,
    head_doctor VARCHAR(150),
    head_doctor_role VARCHAR(150),
    nabh_accredited BOOLEAN NOT NULL DEFAULT true,
    timings VARCHAR(100) NOT NULL DEFAULT '8:30 AM - 6:00 PM',
    sunday_timings VARCHAR(100) DEFAULT 'Closed / Emergency Only',
    specialties TEXT[] NOT NULL DEFAULT '{}',
    features TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 7. APPOINTMENTS (OPD QUEUE)
-- ============================================================================
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_ref VARCHAR(30) UNIQUE NOT NULL,
    patient_name VARCHAR(150) NOT NULL,
    phone VARCHAR(25) NOT NULL,
    email CITEXT,
    hospital_id UUID REFERENCES hospitals(id) ON DELETE SET NULL,
    hospital_location VARCHAR(100) NOT NULL,
    clinical_specialty VARCHAR(150) NOT NULL,
    preferred_date DATE NOT NULL,
    preferred_slot VARCHAR(60) NOT NULL,
    patient_type VARCHAR(20) NOT NULL DEFAULT 'New',
    symptoms TEXT,
    status appointment_status_enum NOT NULL DEFAULT 'Confirmed',
    doctor_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 8. DONATIONS & 80G CATARACT SPONSORSHIPS
-- ============================================================================
CREATE TABLE donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    receipt_number VARCHAR(40) UNIQUE NOT NULL,
    donor_name VARCHAR(150) NOT NULL,
    email CITEXT NOT NULL,
    phone VARCHAR(25) NOT NULL,
    pan_number VARCHAR(20),
    amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
    surgeries_count INT NOT NULL DEFAULT 1,
    program_type VARCHAR(100) NOT NULL DEFAULT 'Gift of Vision (Rural Cataract)',
    frequency donation_frequency_enum NOT NULL DEFAULT 'one-time',
    tax_exemption_claimed BOOLEAN NOT NULL DEFAULT true,
    is_80g_eligible BOOLEAN NOT NULL DEFAULT true,
    payment_gateway VARCHAR(50) DEFAULT 'Razorpay',
    transaction_id VARCHAR(100),
    status donation_status_enum NOT NULL DEFAULT 'Success',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 9. EYE PLEDGES & REGISTRATIONS
-- ============================================================================
CREATE TABLE eye_pledges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pledge_id VARCHAR(40) UNIQUE NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    age INT,
    dob DATE,
    gender VARCHAR(20),
    phone VARCHAR(25) NOT NULL,
    email CITEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    next_of_kin_name VARCHAR(150) NOT NULL,
    next_of_kin_phone VARCHAR(25) NOT NULL,
    consent BOOLEAN NOT NULL DEFAULT true,
    certificate_pdf_url TEXT,
    pledged_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 10. NEWS, PRESS & PUBLICATIONS
-- ============================================================================
CREATE TABLE news_articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    published_date VARCHAR(60) NOT NULL,
    source VARCHAR(120) NOT NULL DEFAULT 'Sankara Press Bureau',
    category VARCHAR(80) NOT NULL DEFAULT 'Press Release',
    summary TEXT NOT NULL,
    image_url TEXT,
    article_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE newsletters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    edition VARCHAR(80) NOT NULL,
    published_date VARCHAR(60) NOT NULL,
    cover_image TEXT NOT NULL,
    pdf_url TEXT NOT NULL,
    description TEXT NOT NULL,
    file_size VARCHAR(40) DEFAULT '4.5 MB PDF',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE gallery_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    category gallery_category_enum NOT NULL DEFAULT 'Hospitals',
    image_url TEXT NOT NULL,
    capture_date VARCHAR(60) DEFAULT '2026',
    caption TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 11. CAREERS & CANDIDATE APPLICATIONS
-- ============================================================================
CREATE TABLE job_openings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    department VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    experience_required VARCHAR(100) NOT NULL,
    type job_type_enum NOT NULL DEFAULT 'Full-time',
    qualification VARCHAR(255) NOT NULL,
    description TEXT,
    responsibilities TEXT[] NOT NULL DEFAULT '{}',
    requirements TEXT[] NOT NULL DEFAULT '{}',
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE job_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID REFERENCES job_openings(id) ON DELETE SET NULL,
    job_title VARCHAR(200) NOT NULL,
    candidate_name VARCHAR(150) NOT NULL,
    email CITEXT NOT NULL,
    phone VARCHAR(25) NOT NULL,
    experience_years VARCHAR(50),
    current_location VARCHAR(100),
    current_organization VARCHAR(150),
    cover_note TEXT,
    resume_file_url TEXT,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(150) NOT NULL,
    email CITEXT NOT NULL,
    phone VARCHAR(25) NOT NULL,
    category VARCHAR(100),
    hospital_branch VARCHAR(100),
    subject VARCHAR(200),
    message TEXT NOT NULL,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email CITEXT UNIQUE NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 12. PERFORMANCE INDEXES
-- ============================================================================
CREATE INDEX idx_appointments_booking_ref ON appointments(booking_ref);
CREATE INDEX idx_appointments_hospital_date ON appointments(hospital_location, preferred_date);
CREATE INDEX idx_appointments_phone ON appointments(phone);
CREATE INDEX idx_donations_receipt ON donations(receipt_number);
CREATE INDEX idx_donations_email ON donations(email);
CREATE INDEX idx_pledges_pledge_id ON eye_pledges(pledge_id);
CREATE INDEX idx_events_category ON events(category);
CREATE INDEX idx_council_category ON council_members(category, display_order);
CREATE INDEX idx_popup_registrations_popup ON popup_registrations(popup_id);

-- ============================================================================
-- 13. AUTOMATED UPDATED_AT TRIGGER
-- ============================================================================
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_admin_users_updated BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER trg_promo_popups_updated BEFORE UPDATE ON promo_popups FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER trg_council_members_updated BEFORE UPDATE ON council_members FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER trg_events_updated BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER trg_hospitals_updated BEFORE UPDATE ON hospitals FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER trg_appointments_updated BEFORE UPDATE ON appointments FOR EACH ROW EXECUTE FUNCTION update_timestamp();
