export interface Warehouse {
  id: string;
  name: string;
  code: string;
  location: string;
  status: 'operational' | 'maintenance' | 'offline';
  capacity: number;
  utilized: number;
  zones: WarehouseZone[];
}

export interface WarehouseZone {
  id: string;
  name: string;
  code: string;
  type: 'storage' | 'receiving' | 'shipping' | 'picking' | 'packing';
  capacity: number;
  utilized: number;
  items: number;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  barcode: string;
  supplier: string;
  unit: string;
  cost: number;
  price: number;
  reorderLevel: number;
  weight: number;
  dimensions: { l: number; w: number; h: number };
}

export interface InventoryItem {
  id: string;
  productId: string;
  product: Product;
  warehouseId: string;
  location: string;
  available: number;
  reserved: number;
  total: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'overstocked';
}

export interface Shipment {
  id: string;
  number: string;
  truckId: string;
  driverId: string;
  route: string;
  status: 'pending' | 'picked' | 'loaded' | 'in-transit' | 'unloading' | 'delivered' | 'delayed';
  eta: string;
  weight: number;
  items: number;
  timeline: TimelineEvent[];
}

export interface TimelineEvent {
  label: string;
  time: string;
  completed: boolean;
}

export interface Truck {
  id: string;
  number: string;
  driver: string;
  route: string;
  status: 'loading' | 'unloading' | 'docking' | 'en-route' | 'idle' | 'maintenance';
  eta: string;
  capacity: number;
  load: number;
}

export interface Forklift {
  id: string;
  code: string;
  status: 'active' | 'idle' | 'charging' | 'maintenance';
  operator: string;
  battery: number;
  currentTask: string;
  zone: string;
}

export interface Worker {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'on-break' | 'offline';
  zone: string;
  tasksCompleted: number;
  shift: string;
}

export interface Order {
  id: string;
  number: string;
  type: 'sales' | 'purchase';
  party: string;
  items: number;
  value: number;
  warehouse: string;
  status: string;
  created: string;
  expectedDate?: string;
}

export interface Alert {
  id: string;
  type: 'low-stock' | 'delayed-shipment' | 'equipment' | 'capacity' | 'safety';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  action: string;
  timestamp: string;
  resolved: boolean;
}

export interface KPIData {
  label: string;
  value: string | number;
  trend: number;
  trendLabel: string;
  icon: string;
  sparkline: number[];
}
