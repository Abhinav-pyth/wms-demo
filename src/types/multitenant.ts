// Multi-tenant types for StockFlow AI

export interface Organization {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  industry: string;
  country: string;
  timezone: string;
  currency: string;
  status: 'active' | 'trial' | 'suspended' | 'cancelled';
  plan_id: string;
  stripe_customer_id?: string;
  trial_ends_at?: string;
  created_at: string;
  updated_at: string;
}

export interface OrganizationMember {
  id: string;
  organization_id: string;
  user_id: string;
  role: UserRole;
  status: 'active' | 'invited' | 'suspended';
  joined_at: string;
  created_at: string;
  updated_at: string;
}

export type UserRole =
  | 'owner'
  | 'admin'
  | 'warehouse_manager'
  | 'supervisor'
  | 'picker'
  | 'packer'
  | 'receiver'
  | 'shipper'
  | 'driver'
  | 'viewer';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  slug: string;
  price_monthly: number;
  price_yearly: number;
  currency: string;
  limits: PlanLimits;
  features: string[];
  stripe_price_id_monthly?: string;
  stripe_price_id_yearly?: string;
}

export interface PlanLimits {
  warehouses: number;
  users: number;
  products: number;
  orders_per_month: number;
  shipments_per_month: number;
  api_requests_per_month: number;
  ai_requests_per_month: number;
  storage_gb: number;
}

export interface OrganizationSubscription {
  id: string;
  organization_id: string;
  plan_id: string;
  status: 'active' | 'trialing' | 'past_due' | 'cancelled';
  current_period_start: string;
  current_period_end: string;
  stripe_subscription_id?: string;
  created_at: string;
  updated_at: string;
}

export interface UsageRecord {
  id: string;
  organization_id: string;
  resource_type: 'users' | 'warehouses' | 'products' | 'orders' | 'shipments' | 'api_requests' | 'ai_requests' | 'storage';
  period: string; // YYYY-MM
  quantity: number;
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  organization_id: string;
  user_id: string;
  action: string;
  resource_type: string;
  resource_id: string;
  before_data?: Record<string, any>;
  after_data?: Record<string, any>;
  ip_address: string;
  user_agent: string;
  created_at: string;
}

export interface ApiKey {
  id: string;
  organization_id: string;
  name: string;
  key_hash: string;
  key_prefix: string; // First 8 chars for display
  permissions: string[];
  last_used_at?: string;
  expires_at?: string;
  created_by: string;
  created_at: string;
  revoked_at?: string;
}

export interface Webhook {
  id: string;
  organization_id: string;
  url: string;
  events: string[];
  secret: string;
  active: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Warehouse {
  id: string;
  organization_id: string;
  name: string;
  code: string;
  address: string;
  city: string;
  state: string;
  country: string;
  timezone: string;
  latitude?: number;
  longitude?: number;
  capacity: number;
  status: 'active' | 'inactive' | 'maintenance';
  created_at: string;
  updated_at: string;
}

export interface WarehouseZone {
  id: string;
  warehouse_id: string;
  organization_id: string;
  name: string;
  code: string;
  type: 'receiving' | 'storage' | 'picking' | 'packing' | 'shipping' | 'returns' | 'quarantine' | 'cold_storage' | 'high_value';
  capacity: number;
  created_at: string;
  updated_at: string;
}

export interface StorageLocation {
  id: string;
  warehouse_id: string;
  zone_id: string;
  organization_id: string;
  code: string;
  aisle: string;
  rack: string;
  shelf: string;
  bin: string;
  capacity: number;
  occupied: number;
  status: 'available' | 'occupied' | 'blocked' | 'maintenance';
  created_at: string;
  updated_at: string;
}
