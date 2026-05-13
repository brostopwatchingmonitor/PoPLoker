-- ENUM Types
CREATE TYPE connectivity_status AS ENUM ('Online', 'Offline', 'Maintenance');
CREATE TYPE size_type AS ENUM ('S', 'M', 'L', 'XL');
CREATE TYPE door_status AS ENUM ('Open', 'Closed', 'Locked', 'Error');
CREATE TYPE transaction_type AS ENUM ('RENTAL', 'DELEGATION', 'EXTENSION');
CREATE TYPE transaction_status AS ENUM ('Pending', 'Active', 'Completed', 'Canceled', 'Expired');
CREATE TYPE payment_method AS ENUM ('Wallet', 'Bank Transfer', 'E-Wallet', 'Credit Card');
CREATE TYPE payment_status AS ENUM ('Pending', 'Paid', 'Failed', 'Refunded');
CREATE TYPE authorization_status AS ENUM ('Pending', 'Active', 'Revoked', 'Expired');

-- LOCKER_STATION
CREATE TABLE locker_station (
    station_id CHAR(36) PRIMARY KEY,
    location_name VARCHAR(150) NOT NULL,
    latitude DECIMAL(10,7),
    longitude DECIMAL(10,7),
    connectivity_status connectivity_status DEFAULT 'Offline',
    last_heartbeat TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- LOCKER_BOX
CREATE TABLE locker_box (
    box_id CHAR(36) PRIMARY KEY,
    station_id CHAR(36) NOT NULL REFERENCES locker_station(station_id),
    box_number VARCHAR(10) NOT NULL,
    size_type size_type NOT NULL,
    is_available BOOLEAN DEFAULT true,
    door_status door_status DEFAULT 'Closed',
    price_per_hour DECIMAL(10,2) NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(station_id, box_number)
);

-- USER
CREATE TABLE "user" (
    user_id CHAR(36) PRIMARY KEY,
    account_code VARCHAR(20) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    hashed_pin VARCHAR(255),
    wallet_balance DECIMAL(15,2) DEFAULT 0.00,
    fcm_token VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- TRANSACTION
CREATE TABLE transaction (
    transaction_id CHAR(36) PRIMARY KEY,
    box_id CHAR(36) NOT NULL REFERENCES locker_box(box_id),
    owner_id CHAR(36) NOT NULL REFERENCES "user"(user_id),
    sender_id CHAR(36) REFERENCES "user"(user_id),
    transaction_type transaction_type NOT NULL,
    status transaction_status DEFAULT 'Pending',
    base_fee DECIMAL(15,2),
    penalty_fee DECIMAL(15,2) DEFAULT 0,
    total_fee DECIMAL(15,2),
    started_at TIMESTAMP,
    due_at TIMESTAMP,
    ended_at TIMESTAMP
);

-- PAYMENT
CREATE TABLE payment (
    payment_id CHAR(36) PRIMARY KEY,
    transaction_id CHAR(36) NOT NULL REFERENCES transaction(transaction_id),
    payment_method payment_method NOT NULL,
    payment_status payment_status DEFAULT 'Pending',
    amount DECIMAL(15,2) NOT NULL,
    gateway_ref VARCHAR(100),
    paid_at TIMESTAMP
);

-- EVENT_TYPE
CREATE TABLE event_type (
    event_type_id SERIAL PRIMARY KEY,
    event_name VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR(200)
);

-- ACTIVITY_LOG
CREATE TABLE activity_log (
    log_id CHAR(36) PRIMARY KEY,
    transaction_id CHAR(36) REFERENCES transaction(transaction_id),
    actor_id CHAR(36) REFERENCES "user"(user_id),
    event_type_id INT REFERENCES event_type(event_type_id),
    metadata_iot JSONB,
    logged_at TIMESTAMP DEFAULT NOW()
);

-- AUTHORIZED_USER
CREATE TABLE authorized_user (
    auth_id CHAR(36) PRIMARY KEY,
    transaction_id CHAR(36) NOT NULL REFERENCES transaction(transaction_id),
    user_id CHAR(36) NOT NULL REFERENCES "user"(user_id),
    status authorization_status DEFAULT 'Pending',
    granted_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP,
    UNIQUE(transaction_id, user_id)
);

-- Insert Event Types
INSERT INTO event_type (event_name, description) VALUES
    ('OPEN_DOOR', 'Pintu loker dibuka'),
    ('CLOSE_DOOR', 'Pintu loker ditutup'),
    ('LOCK_DOOR', 'Pintu dikunci'),
    ('UNLOCK_DOOR', 'Pintu dibuka kuncinya'),
    ('DOOR_TIMEOUT', 'Pintu terbuka terlalu lama'),
    ('BATTERY_LOW', 'Baterai loker rendah'),
    ('TEMPERATURE_ALERT', 'Suhu tidak normal'),
    ('TAMPER_ALERT', 'Indikasi upaya pembongkaran');

-- Insert Locker Station
INSERT INTO locker_station (station_id, location_name, latitude, longitude, connectivity_status)
VALUES
    ('a1b2c3d4-e5f6-7890-1234-567890abcdef', 'Stasiun MRT Jakarta Selatan', -6.261500, 106.811000, 'Online'),
    ('b2c3d4e5-f6a7-8901-2345-678901bcdefg', 'Stasiun Bandung', -6.917500, 107.619000, 'Online');

-- Insert Locker Boxes
INSERT INTO locker_box (box_id, station_id, box_number, size_type, price_per_hour)
VALUES
    ('c3d4e5f6-a7b8-9012-3456-789012cdef01', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', 'A1', 'S', 5000),
    ('d4e5f6a7-b8c9-0123-4567-890123def012', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', 'A2', 'M', 7500),
    ('e5f6a7b8-c9d0-1234-5678-901234ef0123', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', 'B1', 'L', 10000);

-- Insert User
INSERT INTO "user" (user_id, account_code, full_name, email, hashed_password, wallet_balance)
VALUES
    ('f6a7b8c9-d0e1-2345-6789-012345678901', 'USR001', 'John Doe', 'john@example.com', '$2b$10$xxxx', 500000),
    ('a7b8c9d0-e1f2-3456-7890-123456789012', 'USR002', 'Jane Smith', 'jane@example.com', '$2b$10$xxxx', 250000);

-- Station indexes
CREATE INDEX idx_station_location ON locker_station (latitude, longitude);

-- Box indexes
CREATE INDEX idx_locker_box_station ON locker_box (station_id);
CREATE INDEX idx_locker_box_available ON locker_box (is_available, size_type)
    WHERE is_available = true;

-- User indexes
CREATE INDEX idx_user_email ON "user" (email);
CREATE INDEX idx_user_account ON "user" (account_code);

-- Transaction indexes
CREATE INDEX idx_transaction_owner ON transaction (owner_id, started_at DESC);
CREATE INDEX idx_transaction_sender ON transaction (sender_id, started_at DESC);
CREATE INDEX idx_transaction_box ON transaction (box_id, due_at)
    WHERE status = 'Active';

-- Payment indexes
CREATE INDEX idx_payment_transaction ON payment (transaction_id);
CREATE INDEX idx_payment_status ON payment (payment_status, paid_at)
    WHERE payment_status = 'Paid';

-- Activity log indexes
CREATE INDEX idx_activity_transaction ON activity_log (transaction_id, logged_at DESC);
CREATE INDEX idx_activity_actor ON activity_log (actor_id, logged_at DESC);

-- Authorized user indexes
CREATE INDEX idx_auth_user_transaction ON authorized_user (user_id, transaction_id)
    WHERE status = 'Active';

-- Add constraints
ALTER TABLE authorized_user
ADD CONSTRAINT no_self_delegation
CHECK (user_id != (SELECT owner_id FROM transaction t WHERE t.transaction_id = authorized_user.transaction_id));

ALTER TABLE transaction
ADD CONSTRAINT valid_dates
CHECK (ended_at IS NULL OR ended_at >= started_at);

ALTER TABLE transaction
ADD CONSTRAINT positive_base_fee
CHECK (base_fee >= 0);

ALTER TABLE payment
ADD CONSTRAINT positive_amount
CHECK (amount > 0);
