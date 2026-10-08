// Centralized permission system for StockFlow AI

import { UserRole } from '../types/multitenant';

export type Permission =
  | 'dashboard.view'
  | 'inventory.view' | 'inventory.create' | 'inventory.update' | 'inventory.delete' | 'inventory.adjust'
  | 'products.view' | 'products.create' | 'products.update' | 'products.delete'
  | 'orders.view' | 'orders.create' | 'orders.update' | 'orders.cancel'
  | 'receiving.view' | 'receiving.create' | 'receiving.update'
  | 'picking.view' | 'picking.create' | 'picking.assign'
  | 'packing.view' | 'packing.create'
  | 'shipping.view' | 'shipping.create' | 'shipping.dispatch'
  | 'warehouse.view' | 'warehouse.create' | 'warehouse.update' | 'warehouse.delete'
  | 'workers.view' | 'workers.manage'
  | 'fleet.view' | 'fleet.manage'
  | 'analytics.view'
  | 'billing.view' | 'billing.manage'
  | 'settings.manage'
  | 'audit.view'
  | 'users.manage'
  | 'api.manage';

// Role-based permission matrix
const rolePermissions: Record<UserRole, Permission[]> = {
  owner: [
    'dashboard.view',
    'inventory.view', 'inventory.create', 'inventory.update', 'inventory.delete', 'inventory.adjust',
    'products.view', 'products.create', 'products.update', 'products.delete',
    'orders.view', 'orders.create', 'orders.update', 'orders.cancel',
    'receiving.view', 'receiving.create', 'receiving.update',
    'picking.view', 'picking.create', 'picking.assign',
    'packing.view', 'packing.create',
    'shipping.view', 'shipping.create', 'shipping.dispatch',
    'warehouse.view', 'warehouse.create', 'warehouse.update', 'warehouse.delete',
    'workers.view', 'workers.manage',
    'fleet.view', 'fleet.manage',
    'analytics.view',
    'billing.view', 'billing.manage',
    'settings.manage',
    'audit.view',
    'users.manage',
    'api.manage',
  ],
  admin: [
    'dashboard.view',
    'inventory.view', 'inventory.create', 'inventory.update', 'inventory.delete', 'inventory.adjust',
    'products.view', 'products.create', 'products.update', 'products.delete',
    'orders.view', 'orders.create', 'orders.update', 'orders.cancel',
    'receiving.view', 'receiving.create', 'receiving.update',
    'picking.view', 'picking.create', 'picking.assign',
    'packing.view', 'packing.create',
    'shipping.view', 'shipping.create', 'shipping.dispatch',
    'warehouse.view', 'warehouse.create', 'warehouse.update', 'warehouse.delete',
    'workers.view', 'workers.manage',
    'fleet.view', 'fleet.manage',
    'analytics.view',
    'billing.view',
    'settings.manage',
    'audit.view',
    'users.manage',
    'api.manage',
  ],
  warehouse_manager: [
    'dashboard.view',
    'inventory.view', 'inventory.create', 'inventory.update', 'inventory.adjust',
    'products.view', 'products.create', 'products.update',
    'orders.view', 'orders.create', 'orders.update',
    'receiving.view', 'receiving.create', 'receiving.update',
    'picking.view', 'picking.create', 'picking.assign',
    'packing.view', 'packing.create',
    'shipping.view', 'shipping.create', 'shipping.dispatch',
    'warehouse.view', 'warehouse.update',
    'workers.view', 'workers.manage',
    'fleet.view', 'fleet.manage',
    'analytics.view',
  ],
  supervisor: [
    'dashboard.view',
    'inventory.view', 'inventory.update', 'inventory.adjust',
    'products.view',
    'orders.view', 'orders.update',
    'receiving.view', 'receiving.update',
    'picking.view', 'picking.assign',
    'packing.view',
    'shipping.view',
    'warehouse.view',
    'workers.view',
    'fleet.view',
    'analytics.view',
  ],
  picker: [
    'dashboard.view',
    'inventory.view',
    'picking.view',
  ],
  packer: [
    'dashboard.view',
    'inventory.view',
    'packing.view', 'packing.create',
  ],
  receiver: [
    'dashboard.view',
    'inventory.view',
    'receiving.view', 'receiving.create', 'receiving.update',
  ],
  shipper: [
    'dashboard.view',
    'inventory.view',
    'shipping.view', 'shipping.create', 'shipping.dispatch',
  ],
  driver: [
    'dashboard.view',
    'shipping.view',
  ],
  viewer: [
    'dashboard.view',
    'inventory.view',
    'products.view',
    'orders.view',
    'warehouse.view',
    'analytics.view',
  ],
};

/**
 * Check if a user role has a specific permission
 */
export function hasPermission(role: UserRole, permission: Permission): boolean {
  const permissions = rolePermissions[role];
  return permissions.includes(permission);
}

/**
 * Get all permissions for a role
 */
export function getPermissions(role: UserRole): Permission[] {
  return rolePermissions[role] || [];
}

/**
 * Check if user can access a page/route
 */
export function canAccessPage(role: UserRole, page: string): boolean {
  const pagePermissions: Record<string, Permission> = {
    dashboard: 'dashboard.view',
    inventory: 'inventory.view',
    products: 'products.view',
    orders: 'orders.view',
    receiving: 'receiving.view',
    picking: 'picking.view',
    packing: 'packing.view',
    shipping: 'shipping.view',
    warehouses: 'warehouse.view',
    workers: 'workers.view',
    fleet: 'fleet.view',
    analytics: 'analytics.view',
    billing: 'billing.view',
    settings: 'settings.manage',
    audit: 'audit.view',
  };

  const requiredPermission = pagePermissions[page];
  if (!requiredPermission) return true; // No permission required

  return hasPermission(role, requiredPermission);
}
