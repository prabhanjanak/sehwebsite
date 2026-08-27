# 🐘 PostgreSQL Database Setup Guide

### Database Details:
- **Database Name**: `sankara_eye_hospital`
- **Default Super Users**:
  - `Saravanan D` (CTO / Emp ID: `000038`, Email: `saravanan@sankaraeye.com`, Passcode: `Saravanan@1234`)
  - `Prabhanjan` (Information Systems / Emp ID: `010177`, Email: `prabhanjan@sankaraeye.com`, Passcode: `Prabhanjan@1234`)

---

## 🛠️ Step 1: Install PostgreSQL (If not already installed)

### On Ubuntu / Debian:
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib -y
sudo systemctl enable postgresql
sudo systemctl start postgresql
```

### On RHEL / Rocky / CentOS:
```bash
sudo dnf install -y postgresql-server postgresql-contrib
sudo postgresql-setup --initdb
sudo systemctl enable postgresql
sudo systemctl start postgresql
```

### Via Docker (Quick Containerized Setup):
```bash
docker run --name sankara-postgres \
  -e POSTGRES_DB=sankara_eye_hospital \
  -e POSTGRES_USER=sankara_admin \
  -e POSTGRES_PASSWORD=SankaraDbPass@2026 \
  -p 5432:5432 \
  -d postgres:16-alpine
```

---

## 🚀 Step 2: Create Database & Run Schema Migration

Log into PostgreSQL shell as `postgres` user:

```bash
sudo -u postgres psql
```

Inside the PostgreSQL terminal (`psql`):

```sql
-- 1. Create dedicated user and database
CREATE USER sankara_admin WITH PASSWORD 'SankaraDbPass@2026';
CREATE DATABASE sankara_eye_hospital OWNER sankara_admin;
GRANT ALL PRIVILEGES ON DATABASE sankara_eye_hospital TO sankara_admin;

-- 2. Connect to database
\c sankara_eye_hospital;

-- 3. Grant schema permissions
GRANT ALL ON SCHEMA public TO sankara_admin;
\q
```

Now execute the schema and initial seed data:

```bash
# Run schema migration directly from terminal
psql -h localhost -U sankara_admin -d sankara_eye_hospital -f database/schema.sql
```

---

## 📋 Step 3: Database Tables Created

1. `admin_users` — Role-Based Access Control (RBAC), Emp IDs, credentials & audit history.
2. `appointments` — OPD appointments, clinical specialties, and status.
3. `donations` — 80G tax receipts, Form 10BD records, payment IDs, verification logs.
4. `eye_pledges` — 24/7 Sri Jayendra Eye Bank donor pledges.
5. `exam_applications` — DNB Ophthalmology & Fellowship admissions entrance records.
6. `job_applications` — HR Talent Pool & clinical candidate tracking.
7. `hospitals` — Hospital network locations, emergency numbers, timings, bed counts.
8. `wishes_banner_config` — Header festival/occasion announcement banner.
9. `activity_logs` — System activity audit stream.
10. `contact_messages` — Inquiries & feedback.
11. `newsletter_subscribers` — Community mailing list.

---

## 🔒 Step 4: Environment Variables (`.env`)

Add your PostgreSQL connection string to your `.env` file:

```env
DATABASE_URL="postgresql://sankara_admin:SankaraDbPass@2026@localhost:5432/sankara_eye_hospital"
PGHOST="localhost"
PGPORT="5432"
PGDATABASE="sankara_eye_hospital"
PGUSER="sankara_admin"
PGPASSWORD="SankaraDbPass@2026"
```
