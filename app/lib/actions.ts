// Database helper functions for LokerPintar
// These functions handle common CRUD operations

import { sql } from './db';
import type {
  LockerStation,
  LockerBox,
  User,
  Transaction,
  Payment,
  CreateUserInput,
  CreateTransactionInput,
  SizeType
} from './types';

// =====================
// USER OPERATIONS
// =====================

export async function createUser(input: CreateUserInput): Promise<User> {
  const accountCode = `USR${Date.now().toString().slice(-6)}`;

  // Note: In production, use proper password hashing (bcrypt/argon2)
  const hashedPassword = `hashed_${input.password}`;

  const [user] = await sql`
    INSERT INTO "user" (account_code, full_name, email, phone, hashed_password)
    VALUES (${accountCode}, ${input.full_name}, ${input.email}, ${input.phone}, ${hashedPassword})
    RETURNING *
  `;

  return user as User;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const [user] = await sql`
    SELECT * FROM "user" WHERE email = ${email}
  `;
  return user as User | null;
}

export async function getUserById(userId: string): Promise<User | null> {
  const [user] = await sql`
    SELECT * FROM "user" WHERE user_id = ${userId}
  `;
  return user as User | null;
}

export async function updateUserBalance(userId: string, amount: number): Promise<void> {
  await sql`
    UPDATE "user"
    SET wallet_balance = wallet_balance + ${amount}
    WHERE user_id = ${userId}
  `;
}

// =====================
// LOCKER STATION OPERATIONS
// =====================

export async function getAllStations(): Promise<LockerStation[]> {
  return await sql`SELECT * FROM locker_station ORDER BY location_name` as LockerStation[];
}

export async function getStationsNearby(
  lat: number,
  lng: number,
  radiusKm: number = 10
): Promise<LockerStation[]> {
  // Simple bounding box query - in production use PostGIS
  const latRange = radiusKm / 111; // rough conversion
  const lngRange = radiusKm / (111 * Math.cos(lat * Math.PI / 180));

  return await sql`
    SELECT * FROM locker_station
    WHERE latitude BETWEEN ${lat - latRange} AND ${lat + latRange}
      AND longitude BETWEEN ${lng - lngRange} AND ${lng + lngRange}
      AND connectivity_status = 'Online'
    ORDER BY location_name
  ` as LockerStation[];
}

export async function getStationById(stationId: string): Promise<LockerStation | null> {
  const [station] = await sql`
    SELECT * FROM locker_station WHERE station_id = ${stationId}
  `;
  return station as LockerStation | null;
}

// =====================
// LOCKER BOX OPERATIONS
// =====================

export async function getAvailableBoxes(
  stationId?: string,
  sizeType?: SizeType
): Promise<LockerBox[]> {
  let query = sql`
    SELECT lb.*, ls.location_name
    FROM locker_box lb
    JOIN locker_station ls ON lb.station_id = ls.station_id
    WHERE lb.is_available = true
  `;

  if (stationId) {
    query = sql`${query} AND lb.station_id = ${stationId}`;
  }

  if (sizeType) {
    query = sql`${query} AND lb.size_type = ${sizeType}`;
  }

  return await query as LockerBox[];
}

export async function getBoxById(boxId: string): Promise<LockerBox | null> {
  const [box] = await sql`
    SELECT lb.*, ls.location_name
    FROM locker_box lb
    JOIN locker_station ls ON lb.station_id = ls.station_id
    WHERE lb.box_id = ${boxId}
  `;
  return box as LockerBox | null;
}

export async function updateBoxAvailability(
  boxId: string,
  isAvailable: boolean
): Promise<void> {
  await sql`
    UPDATE locker_box
    SET is_available = ${isAvailable}, updated_at = NOW()
    WHERE box_id = ${boxId}
  `;
}

export async function updateBoxStatus(
  boxId: string,
  status: 'Open' | 'Closed' | 'Locked' | 'Error'
): Promise<void> {
  await sql`
    UPDATE locker_box
    SET door_status = ${status}, updated_at = NOW()
    WHERE box_id = ${boxId}
  `;
}

// =====================
// TRANSACTION OPERATIONS
// =====================

export async function createTransaction(input: CreateTransactionInput): Promise<Transaction> {
  const [transaction] = await sql`
    INSERT INTO transaction (
      box_id, owner_id, sender_id, transaction_type,
      base_fee, status, started_at, due_at
    )
    VALUES (
      ${input.box_id}, ${input.owner_id}, ${input.sender_id},
      ${input.transaction_type || 'RENTAL'}, ${input.base_fee},
      'Pending', NOW(), ${input.due_at}
    )
    RETURNING *
  `;

  // Mark box as unavailable
  await updateBoxAvailability(input.box_id, false);

  return transaction as Transaction;
}

export async function getActiveTransaction(boxId: string): Promise<Transaction | null> {
  const [transaction] = await sql`
    SELECT * FROM transaction
    WHERE box_id = ${boxId} AND status = 'Active'
    ORDER BY created_at DESC
    LIMIT 1
  `;
  return transaction as Transaction | null;
}

export async function getUserTransactions(userId: string): Promise<Transaction[]> {
  return await sql`
    SELECT t.*, lb.box_number, ls.location_name
    FROM transaction t
    JOIN locker_box lb ON t.box_id = lb.box_id
    JOIN locker_station ls ON lb.station_id = ls.station_id
    WHERE t.owner_id = ${userId}
    ORDER BY t.created_at DESC
  ` as Transaction[];
}

export async function updateTransactionStatus(
  transactionId: string,
  status: 'Pending' | 'Active' | 'Completed' | 'Canceled' | 'Expired'
): Promise<void> {
  const endAt = status === 'Completed' ? 'NOW()' : null;

  await sql`
    UPDATE transaction
    SET status = ${status},
        ended_at = ${status === 'Completed' ? sql`NOW()` : sql`NULL`},
        updated_at = NOW()
    WHERE transaction_id = ${transactionId}
  `;

  // If completed/canceled, make box available again
  if (status === 'Completed' || status === 'Canceled') {
    const [trans] = await sql`
      SELECT box_id FROM transaction WHERE transaction_id = ${transactionId}
    `;
    if (trans) {
      await updateBoxAvailability(trans.box_id, true);
    }
  }
}

// =====================
// PAYMENT OPERATIONS
// =====================

export async function createPayment(
  transactionId: string,
  amount: number,
  paymentMethod: 'Wallet' | 'Bank Transfer' | 'E-Wallet' | 'Credit Card' | 'QRIS'
): Promise<Payment> {
  const [payment] = await sql`
    INSERT INTO payment (transaction_id, payment_method, amount, payment_status)
    VALUES (${transactionId}, ${paymentMethod}, ${amount}, 'Pending')
    RETURNING *
  `;

  return payment as Payment;
}

export async function updatePaymentStatus(
  paymentId: string,
  status: 'Pending' | 'Paid' | 'Failed' | 'Refunded',
  gatewayRef?: string
): Promise<void> {
  const paidAt = status === 'Paid' ? 'NOW()' : null;

  await sql`
    UPDATE payment
    SET payment_status = ${status},
        gateway_ref = ${gatewayRef},
        paid_at = ${status === 'Paid' ? sql`NOW()` : sql`NULL`}
    WHERE payment_id = ${paymentId}
  `;
}

export async function getPaymentByTransaction(transactionId: string): Promise<Payment | null> {
  const [payment] = await sql`
    SELECT * FROM payment WHERE transaction_id = ${transactionId}
  `;
  return payment as Payment | null;
}

// =====================
// AUTHORIZATION OPERATIONS
// =====================

export async function grantAccess(
  transactionId: string,
  userId: string,
  expiresAt?: Date
): Promise<void> {
  await sql`
    INSERT INTO authorized_user (transaction_id, user_id, status, expires_at)
    VALUES (${transactionId}, ${userId}, 'Active', ${expiresAt})
    ON CONFLICT (transaction_id, user_id)
    DO UPDATE SET status = 'Active', expires_at = ${expiresAt}
  `;
}

export async function revokeAccess(transactionId: string, userId: string): Promise<void> {
  await sql`
    UPDATE authorized_user
    SET status = 'Revoked'
    WHERE transaction_id = ${transactionId} AND user_id = ${userId}
  `;
}

export async function isUserAuthorized(transactionId: string, userId: string): Promise<boolean> {
  const [auth] = await sql`
    SELECT 1 FROM authorized_user
    WHERE transaction_id = ${transactionId}
      AND user_id = ${userId}
      AND status = 'Active'
      AND (expires_at IS NULL OR expires_at > NOW())
  `;
  return !!auth;
}

// =====================
// ACTIVITY LOG
// =====================

export async function logActivity(
  transactionId: string | null,
  actorId: string | null,
  eventTypeId: number,
  metadata?: Record<string, unknown>
): Promise<void> {
  await sql`
    INSERT INTO activity_log (transaction_id, actor_id, event_type_id, metadata_iot)
    VALUES (${transactionId}, ${actorId}, ${eventTypeId}, ${JSON.stringify(metadata || {})})
  `;
}

// =====================
// ANALYTICS
// =====================

export async function getLockerUtilization(): Promise<{
  station_id: string;
  location_name: string;
  total: number;
  available: number;
}[]> {
  return await sql`
    SELECT
      ls.station_id,
      ls.location_name,
      COUNT(lb.box_id) as total,
      COUNT(lb.box_id) FILTER (WHERE lb.is_available = true) as available
    FROM locker_station ls
    LEFT JOIN locker_box lb ON ls.station_id = lb.station_id
    GROUP BY ls.station_id, ls.location_name
  ` as { station_id: string; location_name: string; total: number; available: number }[];
}