// Database Types for LokerPintar
// Generated from schema definitions

// Enums
export type ConnectivityStatus = 'Online' | 'Offline' | 'Maintenance';
export type SizeType = 'S' | 'M' | 'L' | 'XL';
export type DoorStatus = 'Open' | 'Closed' | 'Locked' | 'Error';
export type TransactionType = 'RENTAL' | 'DELEGATION' | 'EXTENSION';
export type TransactionStatus = 'Pending' | 'Active' | 'Completed' | 'Canceled' | 'Expired';
export type PaymentMethod = 'Wallet' | 'Bank Transfer' | 'E-Wallet' | 'Credit Card' | 'QRIS';
export type PaymentStatus = 'Pending' | 'Paid' | 'Failed' | 'Refunded';
export type AuthorizationStatus = 'Pending' | 'Active' | 'Revoked' | 'Expired';

// Table Types
export interface LockerStation {
  station_id: string;
  location_name: string;
  address?: string;
  latitude: number;
  longitude: number;
  connectivity_status: ConnectivityStatus;
  last_heartbeat?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface LockerBox {
  box_id: string;
  station_id: string;
  box_number: string;
  size_type: SizeType;
  is_available: boolean;
  door_status: DoorStatus;
  price_per_hour: number;
  updated_at: Date;
  created_at: Date;
}

export interface User {
  user_id: string;
  account_code: string;
  full_name: string;
  email: string;
  phone?: string;
  hashed_password: string;
  hashed_pin?: string;
  wallet_balance: number;
  fcm_token?: string;
  email_verified: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Transaction {
  transaction_id: string;
  box_id: string;
  owner_id: string;
  sender_id?: string;
  transaction_type: TransactionType;
  status: TransactionStatus;
  base_fee?: number;
  penalty_fee: number;
  total_fee?: number;
  started_at?: Date;
  due_at?: Date;
  ended_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface Payment {
  payment_id: string;
  transaction_id: string;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  amount: number;
  gateway_ref?: string;
  midtrans_order_id?: string;
  paid_at?: Date;
  created_at: Date;
}

export interface EventType {
  event_type_id: number;
  event_name: string;
  description?: string;
}

export interface ActivityLog {
  log_id: string;
  transaction_id?: string;
  actor_id?: string;
  event_type_id?: number;
  metadata_iot?: Record<string, unknown>;
  logged_at: Date;
}

export interface AuthorizedUser {
  auth_id: string;
  transaction_id: string;
  user_id: string;
  status: AuthorizationStatus;
  granted_at: Date;
  expires_at?: Date;
}

// View Types
export interface ActiveRental {
  transaction_id: string;
  owner_name: string;
  owner_email: string;
  box_number: string;
  location_name: string;
  started_at: Date;
  due_at: Date;
  total_fee: number;
  hours_remaining: number;
}

export interface DailySummary {
  date: Date;
  total_transactions: number;
  total_revenue: number;
  unique_transactions: number;
}

export interface LockerUtilization {
  station_id: string;
  location_name: string;
  total_boxes: number;
  rented: number;
  utilization_pct: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Input Types for CRUD operations
export interface CreateUserInput {
  full_name: string;
  email: string;
  phone?: string;
  password: string;
}

export interface CreateTransactionInput {
  box_id: string;
  owner_id: string;
  sender_id?: string;
  transaction_type?: TransactionType;
  base_fee: number;
  due_at: Date;
}

export interface CreatePaymentInput {
  transaction_id: string;
  payment_method: PaymentMethod;
  amount: number;
  midtrans_order_id?: string;
}

export interface UpdateBoxStatusInput {
  is_available?: boolean;
  door_status?: DoorStatus;
}