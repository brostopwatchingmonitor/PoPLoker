-- LokerPintar Database Schema
-- PostgreSQL (Neon Serverless Postgres)
-- Compatible with Vercel deployment

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ENUM TYPES
-- ============================================

DO $$ BEGIN
    CREATE TYPE connectivity_status AS ENUM ('Online', 'Offline', 'Maintenance');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE size_type AS ENUM ('S', 'M', 'L', 'XL');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE door_status AS ENUM ('Open', 'Closed', 'Locked', 'Error');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE transaction_type AS ENUM ('RENTAL', 'DELEGATION', 'EXTENSION');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE transaction_status AS ENUM ('Pending', 'Active', 'Completed', 'Canceled', 'Expired');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_method AS ENUM ('Wallet', 'Bank Transfer', 'E-Wallet', 'Credit Card', 'QRIS');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_status AS ENUM ('Pending', 'Paid', 'Failed', 'Refunded');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE authorization_status AS ENUM ('Pending', 'Active', 'Revoked', 'Expired');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ============================================
-- TABLES
-- ============================================

-- LOCKER_STATION
CREATE TABLE IF NOT EXISTS locker_station (
    station_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    location_name VARCHAR(150) NOT NULL,
    address VARCHAR(255),
    latitude DECIMAL(10,7),
    longitude DECIMAL(10,7),
    connectivity_status connectivity_status DEFAULT 'Offline',
    last_heartbeat TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- LOCKER_BOX
CREATE TABLE IF NOT EXISTS locker_box (
    box_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    station_id UUID NOT NULL REFERENCES locker_station(station_id) ON DELETE CASCADE,
    box_number VARCHAR(10) NOT NULL,
    size_type size_type NOT NULL,
    is_available BOOLEAN DEFAULT true,
    door_status door_status DEFAULT 'Closed',
    price_per_hour DECIMAL(10,2) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(station_id, box_number)
);

-- USER (escaped since user is a reserved keyword)
CREATE TABLE IF NOT EXISTS "user" (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    account_code VARCHAR(20) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(20),
    hashed_password VARCHAR(255) NOT NULL,
    hashed_pin VARCHAR(255),
    wallet_balance DECIMAL(15,2) DEFAULT 0.00,
    fcm_token VARCHAR(255),
    email_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TRANSACTION
CREATE TABLE IF NOT EXISTS transaction (
    transaction_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    box_id UUID NOT NULL REFERENCES locker_box(box_id),
    owner_id UUID NOT NULL REFERENCES "user"(user_id),
    sender_id UUID REFERENCES "user"(user_id),
    transaction_type transaction_type NOT NULL DEFAULT 'RENTAL',
    status transaction_status DEFAULT 'Pending',
    base_fee DECIMAL(15,2),
    penalty_fee DECIMAL(15,2) DEFAULT 0,
    total_fee DECIMAL(15,2),
    started_at TIMESTAMP WITH TIME ZONE,
    due_at TIMESTAMP WITH TIME ZONE,
    ended_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PAYMENT
CREATE TABLE IF NOT EXISTS payment (
    payment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_id UUID NOT NULL REFERENCES transaction(transaction_id),
    payment_method payment_method NOT NULL,
    payment_status payment_status DEFAULT 'Pending',
    amount DECIMAL(15,2) NOT NULL,
    gateway_ref VARCHAR(100),
    midtrans_order_id VARCHAR(100),
    paid_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- EVENT_TYPE
CREATE TABLE IF NOT EXISTS event_type (
    event_type_id SERIAL PRIMARY KEY,
    event_name VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR(200)
);

-- ACTIVITY_LOG
CREATE TABLE IF NOT EXISTS activity_log (
    log_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_id UUID REFERENCES transaction(transaction_id),
    actor_id UUID REFERENCES "user"(user_id),
    event_type_id INT REFERENCES event_type(event_type_id),
    metadata_iot JSONB,
    logged_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AUTHORIZED_USER (Delegation)
CREATE TABLE IF NOT EXISTS authorized_user (
    auth_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_id UUID NOT NULL REFERENCES transaction(transaction_id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES "user"(user_id),
    status authorization_status DEFAULT 'Pending',
    granted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(transaction_id, user_id)
);

-- ============================================
-- INDEXES
-- ============================================

-- Station indexes
CREATE INDEX IF NOT EXISTS idx_station_location ON locker_station (latitude, longitude);

-- Box indexes
CREATE INDEX IF NOT EXISTS idx_locker_box_station ON locker_box (station_id);
CREATE INDEX IF NOT EXISTS idx_locker_box_available ON locker_box (is_available, size_type) WHERE is_available = true;

-- User indexes
CREATE INDEX IF NOT EXISTS idx_user_email ON "user" (email);
CREATE INDEX IF NOT EXISTS idx_user_account ON "user" (account_code);
CREATE INDEX IF NOT EXISTS idx_user_phone ON "user" (phone);

-- Transaction indexes
CREATE INDEX IF NOT EXISTS idx_transaction_owner ON transaction (owner_id, started_at DESC);
CREATE INDEX IF NOT EXISTS idx_transaction_sender ON transaction (sender_id, started_at DESC);
CREATE INDEX IF NOT EXISTS idx_transaction_box ON transaction (box_id, due_at) WHERE status = 'Active';

-- Payment indexes
CREATE INDEX IF NOT EXISTS idx_payment_transaction ON payment (transaction_id);
CREATE INDEX IF NOT EXISTS idx_payment_status ON payment (payment_status, paid_at) WHERE payment_status = 'Paid';

-- Activity log indexes
CREATE INDEX IF NOT EXISTS idx_activity_transaction ON activity_log (transaction_id, logged_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_actor ON activity_log (actor_id, logged_at DESC);

-- Authorized user indexes
CREATE INDEX IF NOT EXISTS idx_auth_user_transaction ON authorized_user (user_id, transaction_id) WHERE status = 'Active';

-- ============================================
-- TRIGGERS
-- ============================================

-- Function untuk update timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger untuk locker_box
DROP TRIGGER IF EXISTS update_locker_box_timestamp ON locker_box;
CREATE TRIGGER update_locker_box_timestamp
    BEFORE UPDATE ON locker_box
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

-- Trigger untuk user
DROP TRIGGER IF EXISTS update_user_timestamp ON "user";
CREATE TRIGGER update_user_timestamp
    BEFORE UPDATE ON "user"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

-- Trigger untuk transaction
DROP TRIGGER IF EXISTS update_transaction_timestamp ON transaction;
CREATE TRIGGER update_transaction_timestamp
    BEFORE UPDATE ON transaction
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

-- ============================================
-- SEED DATA
-- ============================================

-- Insert Event Types
INSERT INTO event_type (event_name, description) VALUES
    ('OPEN_DOOR', 'Pintu loker dibuka'),
    ('CLOSE_DOOR', 'Pintu loker ditutup'),
    ('LOCK_DOOR', 'Pintu dikunci'),
    ('UNLOCK_DOOR', 'Pintu dibuka kuncinya'),
    ('DOOR_TIMEOUT', 'Pintu terbuka terlalu lama'),
    ('BATTERY_LOW', 'Baterai loker rendah'),
    ('TEMPERATURE_ALERT', 'Suhu tidak normal'),
    ('TAMPER_ALERT', 'Indikasi upaya pembongkaran'),
    ('RENTAL_START', 'Penyewaan dimulai'),
    ('RENTAL_END', 'Penyewaan selesai')
ON CONFLICT (event_name) DO NOTHING;

-- Insert Locker Stations (sample data)
INSERT INTO locker_station (station_id, location_name, address, latitude, longitude, connectivity_status) VALUES
    ('a1b2c3d4-e5f6-7890-1234-567890abcdef', 'Stasiun MRT Jakarta Selatan', 'Jl. Sudirman, Jakarta Selatan', -6.261500, 106.811000, 'Online'),
    ('b2c3d4e5-f6a7-8901-2345-678901bcdefg', 'Stasiun Bandung', 'Jl. Asia Afrika, Bandung', -6.917500, 107.619000, 'Online'),
    ('c3d4e5f6-a7b8-9012-3456-789012cdefab', 'Mall Grand Indonesia', 'Jl. M.H. Thamrin, Jakarta', -6.195400, 106.816500, 'Online')
ON CONFLICT (station_id) DO NOTHING;

-- Insert Locker Boxes (sample data)
INSERT INTO locker_box (box_id, station_id, box_number, size_type, price_per_hour) VALUES
    ('d4e5f6a7-b8c9-0123-4567-890123def012', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', 'A1', 'S', 2000),
    ('e5f6a7b8-c9d0-1234-5678-901234ef0123', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', 'A2', 'M', 3000),
    ('f6a7b8c9-d0e1-2345-6789-012345f01234', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', 'B1', 'L', 5000),
    ('a7b8c9d0-e1f2-3456-7890-123456789012', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', 'B2', 'XL', 7000),
    ('b8c9d0e1-f2a3-4567-8901-234567890123', 'b2c3d4e5-f6a7-8901-2345-678901bcdefg', 'A1', 'M', 3000),
    ('c9d0e1f2-a3b4-5678-9012-345678901234', 'c3d4e5f6-a7b8-9012-3456-789012cdefab', '01', 'S', 2500),
    ('d0e1f2a3-b4c5-6789-0123-456789012345', 'c3d4e5f6-a7b8-9012-3456-789012cdefab', '02', 'L', 5000)
ON CONFLICT (station_id, box_number) DO NOTHING;