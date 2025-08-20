-- Enums driven by UI; extend as needed
create type lead_stage as enum ('new', 'sanction', 'disbursed', 'rejected', 'in_progress');
create type profile_type as enum ('individual', 'company', 'proprietor', 'other');

create table lead (
  id uuid primary key default gen_random_uuid(),
  loan_id text not null unique,
  date_time timestamptz not null default now(),
  source text not null,
  stage lead_stage not null,

  -- Profile
  profile_type profile_type not null,
  name text not null,
  gender text not null,
  customer_profile text not null,
  marital_status text not null,
  pan_no text not null, -- validated in app; add check if desired
  mobile_no text not null,
  alt_mobile_no text,
  email citext not null,
  mother_name text,
  loan_amount numeric(12,2) not null check (loan_amount > 0),
  dsa text not null,

  -- Vehicle
  rc_no text not null,
  vehicle_verient text not null,
  mfg_year text not null,
  os_no text not null,
  kilometre_reading text,
  vehicle_owner_contact_no text not null,
  vehicle_location text,

  -- Ref contacts
  ref_first_name text,
  ref_first_mob_no text,
  ref_second_name text,
  ref_second_mob_no text,

  -- Nominee
  nominee_name text,
  nominee_dob date,
  nominee_relationship text,

  -- Permanent address
  permanent_address_type text not null,
  permanent_address_landmark text not null,
  permanent_address_category text not null,

  -- Current address
  is_current_address_same boolean not null default false,
  current_address_type text,
  current_address_landmark text,
  current_address_category text,

  -- Office address
  is_office_address_same boolean not null default false,
  employment_detail text not null,
  office_address_type text,
  office_address_landmark text,

  -- Bank / Finance
  bank_finance text,
  branch text,
  login_executive_name text,

  -- Dealer
  case_dealer text not null,
  ref_name_mob_no text,

  remarks text,

  created_by uuid references app_user(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- Useful checks to mirror superRefine
  check (is_current_address_same or (current_address_type is not null and current_address_landmark is not null and current_address_category is not null)),
  check (is_office_address_same or (office_address_type is not null and office_address_landmark is not null))
);

create index idx_lead_date_time on lead(date_time desc);
create index idx_lead_stage on lead(stage);
create index idx_lead_name on lead using gin (name gin_trgm_ops);
create index idx_lead_mobile on lead (mobile_no);
create index idx_lead_pan on lead (pan_no);
create index idx_lead_email on lead (email);