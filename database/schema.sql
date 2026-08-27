-- =============================================================================
-- SANKARA EYE HOSPITAL & SRI KANCHI KAMAKOTI MEDICAL TRUST
-- PostgreSQL Production Database Schema
-- Database Name: sankara_eye_hospital
-- =============================================================================

-- 1. Create Database & Extensions
-- CREATE DATABASE sankara_eye_hospital;
-- \c sankara_eye_hospital;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================================
-- TABLE 1: ADMIN USERS & ROLE-BASED ACCESS CONTROL (RBAC)
-- =============================================================================
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    emp_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('super_admin', 'admin', 'finance', 'management', 'marketing', 'hr', 'administration')),
    role_label VARCHAR(100) NOT NULL,
    department VARCHAR(255) NOT NULL,
    passcode VARCHAR(255) NOT NULL, -- Stored as bcrypt hash or secure key
    phone VARCHAR(50),
    avatar VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255) DEFAULT 'System Root',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- TABLE 2: OUTPATIENT APPOINTMENTS
-- =============================================================================
CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_ref VARCHAR(50) UNIQUE NOT NULL,
    patient_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    hospital_location VARCHAR(255) NOT NULL,
    clinical_specialty VARCHAR(255) NOT NULL,
    preferred_date DATE NOT NULL,
    preferred_slot VARCHAR(50) NOT NULL,
    patient_type VARCHAR(50) DEFAULT 'New',
    symptoms TEXT,
    status VARCHAR(50) DEFAULT 'Confirmed' CHECK (status IN ('Confirmed', 'Completed', 'Cancelled', 'Rescheduled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- TABLE 3: 80G CHARITABLE DONATIONS & TAX INVOICES
-- =============================================================================
CREATE TABLE IF NOT EXISTS donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    receipt_number VARCHAR(100) UNIQUE NOT NULL,
    donor_name VARCHAR(255) NOT NULL,
    donor_email VARCHAR(255) NOT NULL,
    donor_phone VARCHAR(50) NOT NULL,
    pan VARCHAR(50),
    state VARCHAR(100),
    country VARCHAR(100) DEFAULT 'India',
    amount NUMERIC(12, 2) NOT NULL,
    surgeries_count INT DEFAULT 1,
    payment_id VARCHAR(100) NOT NULL,
    order_id VARCHAR(100),
    status VARCHAR(50) DEFAULT 'Pending Verification' CHECK (status IN ('Pending Verification', 'Verified', 'Completed', 'Refunded', 'Failed')),
    payment_verified BOOLEAN DEFAULT FALSE,
    verified_at TIMESTAMP WITH TIME ZONE,
    verified_by VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- TABLE 4: EYE DONATION PLEDGES
-- =============================================================================
CREATE TABLE IF NOT EXISTS eye_pledges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pledge_ref VARCHAR(50) UNIQUE NOT NULL,
    donor_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    age INT,
    blood_group VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pin_code VARCHAR(20),
    emergency_contact VARCHAR(255) NOT NULL,
    emergency_phone VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- TABLE 5: DNB & FELLOWSHIP ENTRANCE EXAM APPLICATIONS
-- =============================================================================
CREATE TABLE IF NOT EXISTS exam_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    roll_number VARCHAR(50) UNIQUE NOT NULL,
    course_type VARCHAR(255) NOT NULL,
    candidate_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    dob DATE,
    gender VARCHAR(20),
    medical_council_reg_no VARCHAR(100),
    qualifications TEXT NOT NULL,
    current_institution VARCHAR(255),
    preferred_exam_center VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'Application Received' CHECK (status IN ('Application Received', 'Admit Card Issued', 'Interview Shortlisted', 'Selected', 'Waitlisted', 'Rejected')),
    exam_date DATE,
    score NUMERIC(5, 2),
    interview_notes TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- TABLE 6: TALENT POOL & CAREERS JOB APPLICATIONS
-- =============================================================================
CREATE TABLE IF NOT EXISTS job_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    applicant_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    preferred_unit VARCHAR(255) NOT NULL,
    department_role VARCHAR(255) NOT NULL,
    experience_years VARCHAR(50),
    current_organization VARCHAR(255),
    qualification VARCHAR(255),
    resume_url TEXT,
    status VARCHAR(50) DEFAULT 'New' CHECK (status IN ('New', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Offer Extended', 'Rejected')),
    hr_notes TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- TABLE 7: HOSPITAL UNITS DIRECTORY & CLINICAL DATA
-- =============================================================================
CREATE TABLE IF NOT EXISTS hospitals (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    phone VARCHAR(50),
    emergency_phone VARCHAR(50),
    email VARCHAR(255),
    beds INT DEFAULT 100,
    established INT,
    image TEXT,
    head_doctor VARCHAR(255),
    head_doctor_role VARCHAR(255),
    administrator_name VARCHAR(255),
    administrator_role VARCHAR(255),
    administrator_phone VARCHAR(50),
    nabh_accredited BOOLEAN DEFAULT TRUE,
    specialties TEXT[], -- PostgreSQL Array of text
    features TEXT[],
    timings VARCHAR(255),
    sunday_timings VARCHAR(255),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- TABLE 8: OCCASION & FESTIVAL WISHES BANNER CONFIG
-- =============================================================================
CREATE TABLE IF NOT EXISTS wishes_banner_config (
    id VARCHAR(50) PRIMARY KEY DEFAULT 'primary_banner',
    is_enabled BOOLEAN DEFAULT FALSE,
    occasion_title VARCHAR(255) NOT NULL,
    greeting_message TEXT NOT NULL,
    theme VARCHAR(50) DEFAULT 'saffron-festive',
    icon_type VARCHAR(50) DEFAULT 'lamp',
    action_text VARCHAR(100),
    action_link VARCHAR(255),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- TABLE 9: SYSTEM AUDIT & ACTIVITY LOGS
-- =============================================================================
CREATE TABLE IF NOT EXISTS activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    action VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('appointment', 'donation', 'pledge', 'exam', 'career', 'admin', 'system')),
    details TEXT NOT NULL,
    location VARCHAR(255),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- TABLE 10: CONTACT MESSAGES & GENERAL INQUIRIES
-- =============================================================================
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    category VARCHAR(100),
    hospital_branch VARCHAR(255),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    is_resolved BOOLEAN DEFAULT FALSE,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- TABLE 11: NEWSLETTER SUBSCRIBERS
-- =============================================================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- SEED INITIAL DATA: ROOT SUPER ADMINS & DEFAULT ROLES
-- =============================================================================
INSERT INTO admin_users (emp_id, name, email, role, role_label, department, passcode, phone, created_by)
VALUES
    (
        '000038',
        'Saravanan D',
        'saravanan@sankaraeye.com',
        'super_admin',
        'Chief Technology Officer',
        'CTO / Central Executive IT & Technology',
        'Saravanan@1234',
        '+91 80 6903 8900',
        'System Root'
    ),
    (
        '010177',
        'Prabhanjan',
        'prabhanjan@sankaraeye.com',
        'super_admin',
        'Information Systems Lead',
        'Information Systems & Central Trust Administration',
        'Prabhanjan@1234',
        '+91 80 6903 8900',
        'System Root'
    ),
    (
        '010180',
        'Finance & Accounts Desk',
        'finance@sankaraeye.com',
        'finance',
        'Finance & Accounts Verification',
        'Donations, 80G Receipts & Accounts Audit',
        'finance2026',
        '+91 422 423 4215',
        'Saravanan D'
    ),
    (
        '010182',
        'Sankara Talent & Academic Admissions',
        'hr@sankaraeye.com',
        'hr',
        'Human Resources & Academics',
        'Doctor Fellowships, DNB & Careers',
        'hr2026',
        '+91 422 423 4220',
        'Prabhanjan'
    ),
    (
        '010185',
        'National Outreach & Communications Lead',
        'marketing@sankaraeye.com',
        'marketing',
        'Marketing & Digital Outreach',
        'Public Relations, Events & Media',
        'marketing2026',
        '+91 80 6903 8910',
        'Saravanan D'
    ),
    (
        '010188',
        'Trust Steering & Executive Board',
        'management@sankaraeye.com',
        'management',
        'Management & Governance',
        'Trustees & Executive Council',
        'sankara2026',
        '+91 422 423 4200',
        'Prabhanjan'
    ),
    (
        '010190',
        'Hospital Operations Superintendent',
        'adminops@sankaraeye.com',
        'administration',
        'Hospital Network Administration',
        'Hospital Units & Clinical Staffing',
        'admin2026',
        '+91 80 6903 8930',
        'Saravanan D'
    )
ON CONFLICT (email) DO UPDATE 
SET 
    emp_id = EXCLUDED.emp_id,
    name = EXCLUDED.name,
    role = EXCLUDED.role,
    role_label = EXCLUDED.role_label,
    department = EXCLUDED.department,
    passcode = EXCLUDED.passcode;

-- Seed Default Wishes Banner
INSERT INTO wishes_banner_config (id, is_enabled, occasion_title, greeting_message, theme, icon_type, action_text, action_link)
VALUES (
    'primary_banner',
    FALSE,
    'Golden Jubilee 50th Year Celebration',
    'Sankara Eye Foundation celebrates 50 Glorious Years of Consecrated Eyecare & 2.6M+ Free Surgeries across India!',
    'saffron-festive',
    'lamp',
    'Read Golden Chronicle',
    '/about'
)
ON CONFLICT (id) DO NOTHING;

-- Create Performance Indexes
CREATE INDEX IF NOT EXISTS idx_appointments_ref ON appointments(booking_ref);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(preferred_date);
CREATE INDEX IF NOT EXISTS idx_donations_receipt ON donations(receipt_number);
CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(status);
CREATE INDEX IF NOT EXISTS idx_exam_roll ON exam_applications(roll_number);
CREATE INDEX IF NOT EXISTS idx_admin_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_emp_id ON admin_users(emp_id);
