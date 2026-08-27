/**
 * PostgreSQL Database Client & Connection Pool for Sankara Backend
 * Supports standard connection strings (e.g. Supabase, Neon, AWS RDS, Localhost)
 */

export interface DbConfig {
  connectionString?: string;
  host?: string;
  port?: number;
  database?: string;
  user?: string;
  password?: string;
  ssl?: boolean;
}

export const DEFAULT_DB_CONFIG: DbConfig = {
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/sankara_eye_db',
  ssl: process.env.NODE_ENV === 'production' ? true : false
};

/**
 * Example SQL Query Generator for API Endpoints / Microservices
 */
export const SQL_QUERIES = {
  // Popups
  GET_ACTIVE_POPUP: `
    SELECT * FROM promo_popups 
    WHERE is_enabled = true 
      AND (valid_until IS NULL OR valid_until >= CURRENT_DATE)
    ORDER BY created_at DESC 
    LIMIT 1;
  `,
  SAVE_POPUP_REGISTRATION: `
    INSERT INTO popup_registrations (popup_id, event_title, full_name, email, phone, organization, city)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `,

  // Council
  GET_COUNCIL_MEMBERS: `
    SELECT * FROM council_members 
    WHERE is_active = true 
    ORDER BY category, display_order ASC;
  `,
  UPDATE_COUNCIL_MEMBER: `
    UPDATE council_members 
    SET name = $1, role = $2, desc_text = $3, image_url = $4, updated_at = NOW()
    WHERE id = $5
    RETURNING *;
  `,

  // Events
  GET_EVENTS: `
    SELECT * FROM events 
    ORDER BY display_order ASC, created_at DESC;
  `,
  CREATE_EVENT: `
    INSERT INTO events (title, category, date_text, time_text, location, description, is_free_camp, contact_number, registration_url, banner_image)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *;
  `,

  // Appointments
  CREATE_APPOINTMENT: `
    INSERT INTO appointments (booking_ref, patient_name, phone, email, hospital_location, clinical_specialty, preferred_date, preferred_slot, patient_type, symptoms)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *;
  `,

  // Donations
  CREATE_DONATION: `
    INSERT INTO donations (receipt_number, donor_name, email, phone, pan_number, amount, surgeries_count, program_type, frequency, is_80g_eligible)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *;
  `
};
