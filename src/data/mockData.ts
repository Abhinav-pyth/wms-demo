import { Warehouse, Product, InventoryItem, Shipment, Truck, Forklift, Worker, Order, Alert, KPIData } from '../types';

export const warehouses: Warehouse[] = [
  {
    id: 'wh-01', name: 'Northgate Distribution Center', code: 'WH-01',
    location: 'Chicago, IL', status: 'operational', capacity: 50000, utilized: 39500,
    zones: [
      { id: 'z-a', name: 'Zone A', code: 'A', type: 'storage', capacity: 1200, utilized: 984, items: 1284 },
      { id: 'z-b', name: 'Zone B', code: 'B', type: 'storage', capacity: 1000, utilized: 720, items: 892 },
      { id: 'z-c', name: 'Zone C', code: 'C', type: 'storage', capacity: 800, utilized: 640, items: 634 },
      { id: 'z-r', name: 'Receiving', code: 'R', type: 'receiving', capacity: 200, utilized: 120, items: 87 },
      { id: 'z-s', name: 'Shipping', code: 'S', type: 'shipping', capacity: 200, utilized: 160, items: 142 },
    ]
  },
  {
    id: 'wh-02', name: 'Southgate DC', code: 'WH-02',
    location: 'Dallas, TX', status: 'operational', capacity: 40000, utilized: 28000,
    zones: [
      { id: 'z-d', name: 'Zone D', code: 'D', type: 'storage', capacity: 1000, utilized: 700, items: 950 },
      { id: 'z-e', name: 'Zone E', code: 'E', type: 'storage', capacity: 800, utilized: 560, items: 720 },
    ]
  },
  {
    id: 'wh-03', name: 'Westgate Warehouse', code: 'WH-03',
    location: 'Portland, OR', status: 'operational', capacity: 30000, utilized: 21000,
    zones: [
      { id: 'z-f', name: 'Zone F', code: 'F', type: 'storage', capacity: 600, utilized: 420, items: 580 },
      { id: 'z-g', name: 'Zone G', code: 'G', type: 'storage', capacity: 500, utilized: 350, items: 410 },
    ]
  },
];

export const products: Product[] = [
  { id: 'p-01', sku: 'LED-60X60', name: 'LED Panel 60x60', category: 'Lighting', barcode: '8901234567001', supplier: 'BrightLight Corp', unit: 'pcs', cost: 24.50, price: 42.00, reorderLevel: 200, weight: 3.2, dimensions: { l: 60, w: 60, h: 8 } },
  { id: 'p-02', sku: 'OFC-ERG-01', name: 'Ergonomic Office Chair', category: 'Furniture', barcode: '8901234567002', supplier: 'ComfortWorks', unit: 'pcs', cost: 185.00, price: 349.00, reorderLevel: 50, weight: 18.5, dimensions: { l: 65, w: 65, h: 110 } },
  { id: 'p-03', sku: 'BOX-MED-01', name: 'Cardboard Box Medium', category: 'Packaging', barcode: '8901234567003', supplier: 'PackRight Inc', unit: 'pcs', cost: 1.20, price: 2.50, reorderLevel: 1000, weight: 0.3, dimensions: { l: 40, w: 30, h: 25 } },
  { id: 'p-04', sku: 'GLV-NIT-L', name: 'Nitrile Gloves Large', category: 'Safety', barcode: '8901234567004', supplier: 'SafeGuard Supplies', unit: 'box', cost: 8.50, price: 14.99, reorderLevel: 500, weight: 0.5, dimensions: { l: 25, w: 12, h: 5 } },
  { id: 'p-05', sku: 'CBL-USB-C', name: 'USB-C Cable 2m', category: 'Electronics', barcode: '8901234567005', supplier: 'TechLine Ltd', unit: 'pcs', cost: 3.20, price: 9.99, reorderLevel: 300, weight: 0.08, dimensions: { l: 20, w: 5, h: 2 } },
  { id: 'p-06', sku: 'PPR-A4-500', name: 'A4 Paper 500 Sheets', category: 'Office Supplies', barcode: '8901234567006', supplier: 'PaperMill Co', unit: 'ream', cost: 4.50, price: 8.99, reorderLevel: 200, weight: 2.5, dimensions: { l: 30, w: 22, h: 3 } },
  { id: 'p-07', sku: 'TNR-HP-26A', name: 'HP Toner 26A', category: 'Office Supplies', barcode: '8901234567007', supplier: 'PrintSupply Direct', unit: 'pcs', cost: 52.00, price: 89.99, reorderLevel: 30, weight: 1.2, dimensions: { l: 35, w: 15, h: 12 } },
  { id: 'p-08', sku: 'DSK-STD-01', name: 'Standard Desk 120cm', category: 'Furniture', barcode: '8901234567008', supplier: 'OfficeFurn Plus', unit: 'pcs', cost: 120.00, price: 229.00, reorderLevel: 25, weight: 35.0, dimensions: { l: 120, w: 60, h: 75 } },
  { id: 'p-09', sku: 'MON-27-4K', name: '27" 4K Monitor', category: 'Electronics', barcode: '8901234567009', supplier: 'TechLine Ltd', unit: 'pcs', cost: 280.00, price: 449.00, reorderLevel: 40, weight: 6.5, dimensions: { l: 62, w: 18, h: 45 } },
  { id: 'p-10', sku: 'KBD-MECH-01', name: 'Mechanical Keyboard', category: 'Electronics', barcode: '8901234567010', supplier: 'TechLine Ltd', unit: 'pcs', cost: 45.00, price: 89.00, reorderLevel: 60, weight: 0.9, dimensions: { l: 44, w: 14, h: 4 } },
  { id: 'p-11', sku: 'MSE-WL-01', name: 'Wireless Mouse', category: 'Electronics', barcode: '8901234567011', supplier: 'TechLine Ltd', unit: 'pcs', cost: 12.00, price: 29.99, reorderLevel: 100, weight: 0.1, dimensions: { l: 12, w: 7, h: 4 } },
  { id: 'p-12', sku: 'HDS-USB-01', name: 'USB Hub 7-Port', category: 'Electronics', barcode: '8901234567012', supplier: 'TechLine Ltd', unit: 'pcs', cost: 15.00, price: 34.99, reorderLevel: 80, weight: 0.2, dimensions: { l: 15, w: 8, h: 3 } },
  { id: 'p-13', sku: 'CAB-SRJ-01', name: 'Server Rack 42U', category: 'IT Infrastructure', barcode: '8901234567013', supplier: 'DataCenter Pro', unit: 'pcs', cost: 450.00, price: 799.00, reorderLevel: 10, weight: 65.0, dimensions: { l: 60, w: 100, h: 200 } },
  { id: 'p-14', sku: 'SWT-48P-01', name: '48-Port Network Switch', category: 'IT Infrastructure', barcode: '8901234567014', supplier: 'NetGear Solutions', unit: 'pcs', cost: 320.00, price: 549.00, reorderLevel: 15, weight: 4.5, dimensions: { l: 44, w: 30, h: 5 } },
  { id: 'p-15', sku: 'CAM-SEC-01', name: 'Security Camera 4K', category: 'Security', barcode: '8901234567015', supplier: 'SecureVision', unit: 'pcs', cost: 85.00, price: 159.00, reorderLevel: 30, weight: 0.8, dimensions: { l: 15, w: 10, h: 10 } },
  { id: 'p-16', sku: 'EXT-CORD-5M', name: 'Extension Cord 5m', category: 'Electrical', barcode: '8901234567016', supplier: 'PowerSafe Inc', unit: 'pcs', cost: 8.00, price: 16.99, reorderLevel: 150, weight: 0.6, dimensions: { l: 25, w: 10, h: 5 } },
  { id: 'p-17', sku: 'TAPE-PKG-01', name: 'Packing Tape Roll', category: 'Packaging', barcode: '8901234567017', supplier: 'PackRight Inc', unit: 'roll', cost: 2.50, price: 5.99, reorderLevel: 500, weight: 0.3, dimensions: { l: 10, w: 10, h: 5 } },
  { id: 'p-18', sku: 'PAL-WOOD-01', name: 'Wooden Pallet Standard', category: 'Logistics', barcode: '8901234567018', supplier: 'TimberPack', unit: 'pcs', cost: 12.00, price: 22.00, reorderLevel: 100, weight: 22.0, dimensions: { l: 120, w: 100, h: 15 } },
  { id: 'p-19', sku: 'WRAP-STR-01', name: 'Stretch Wrap 500mm', category: 'Packaging', barcode: '8901234567019', supplier: 'PackRight Inc', unit: 'roll', cost: 6.50, price: 12.99, reorderLevel: 200, weight: 1.5, dimensions: { l: 35, w: 35, h: 15 } },
  { id: 'p-20', sku: 'LBL-THERM-01', name: 'Thermal Label Roll', category: 'Packaging', barcode: '8901234567020', supplier: 'LabelPro', unit: 'roll', cost: 4.00, price: 8.99, reorderLevel: 300, weight: 0.4, dimensions: { l: 15, w: 15, h: 8 } },
];

export const inventoryItems: InventoryItem[] = [
  { id: 'inv-01', productId: 'p-01', product: products[0], warehouseId: 'wh-01', location: 'A-04-12', available: 1450, reserved: 337, total: 1787, status: 'in-stock' },
  { id: 'inv-02', productId: 'p-02', product: products[1], warehouseId: 'wh-01', location: 'B-02-05', available: 520, reserved: 154, total: 674, status: 'in-stock' },
  { id: 'inv-03', productId: 'p-03', product: products[2], warehouseId: 'wh-01', location: 'C-01-01', available: 845, reserved: 400, total: 1245, status: 'low-stock' },
  { id: 'inv-04', productId: 'p-04', product: products[3], warehouseId: 'wh-01', location: 'A-02-08', available: 5293, reserved: 500, total: 5793, status: 'in-stock' },
  { id: 'inv-05', productId: 'p-05', product: products[4], warehouseId: 'wh-01', location: 'B-05-03', available: 2100, reserved: 200, total: 2300, status: 'in-stock' },
  { id: 'inv-06', productId: 'p-06', product: products[5], warehouseId: 'wh-01', location: 'C-03-07', available: 1800, reserved: 150, total: 1950, status: 'in-stock' },
  { id: 'inv-07', productId: 'p-07', product: products[6], warehouseId: 'wh-01', location: 'A-06-01', available: 45, reserved: 12, total: 57, status: 'low-stock' },
  { id: 'inv-08', productId: 'p-08', product: products[7], warehouseId: 'wh-01', location: 'B-01-02', available: 38, reserved: 8, total: 46, status: 'in-stock' },
  { id: 'inv-09', productId: 'p-09', product: products[8], warehouseId: 'wh-01', location: 'A-07-04', available: 120, reserved: 35, total: 155, status: 'in-stock' },
  { id: 'inv-10', productId: 'p-10', product: products[9], warehouseId: 'wh-01', location: 'B-04-06', available: 280, reserved: 45, total: 325, status: 'in-stock' },
  { id: 'inv-11', productId: 'p-11', product: products[10], warehouseId: 'wh-02', location: 'D-02-01', available: 450, reserved: 80, total: 530, status: 'in-stock' },
  { id: 'inv-12', productId: 'p-12', product: products[11], warehouseId: 'wh-02', location: 'D-03-05', available: 320, reserved: 60, total: 380, status: 'in-stock' },
  { id: 'inv-13', productId: 'p-13', product: products[12], warehouseId: 'wh-02', location: 'E-01-01', available: 8, reserved: 3, total: 11, status: 'low-stock' },
  { id: 'inv-14', productId: 'p-14', product: products[13], warehouseId: 'wh-02', location: 'E-02-03', available: 22, reserved: 5, total: 27, status: 'in-stock' },
  { id: 'inv-15', productId: 'p-15', product: products[14], warehouseId: 'wh-03', location: 'F-01-02', available: 85, reserved: 20, total: 105, status: 'in-stock' },
  { id: 'inv-16', productId: 'p-16', product: products[15], warehouseId: 'wh-03', location: 'F-03-04', available: 620, reserved: 100, total: 720, status: 'in-stock' },
  { id: 'inv-17', productId: 'p-17', product: products[16], warehouseId: 'wh-03', location: 'G-01-01', available: 1800, reserved: 300, total: 2100, status: 'in-stock' },
  { id: 'inv-18', productId: 'p-18', product: products[17], warehouseId: 'wh-01', location: 'C-05-01', available: 145, reserved: 30, total: 175, status: 'in-stock' },
  { id: 'inv-19', productId: 'p-19', product: products[18], warehouseId: 'wh-01', location: 'C-05-03', available: 950, reserved: 200, total: 1150, status: 'in-stock' },
  { id: 'inv-20', productId: 'p-20', product: products[19], warehouseId: 'wh-01', location: 'C-05-05', available: 1200, reserved: 250, total: 1450, status: 'in-stock' },
];

export const shipments: Shipment[] = [
  {
    id: 'shp-01', number: 'SHP-78444', truckId: 'TRK-2104', driverId: 'drv-01',
    route: 'WH-01 → Customer A', status: 'in-transit', eta: '15:30', weight: 2400, items: 48,
    timeline: [
      { label: 'Order Confirmed', time: '06:44', completed: true },
      { label: 'Picked', time: '08:21', completed: true },
      { label: 'Loaded', time: '09:15', completed: true },
      { label: 'In Transit', time: '09:42', completed: true },
      { label: 'Unloading', time: '15:00', completed: false },
    ]
  },
  {
    id: 'shp-02', number: 'SHP-78445', truckId: 'TRK-2127', driverId: 'drv-02',
    route: 'WH-01 → Bay 3', status: 'loaded', eta: '14:00', weight: 1800, items: 32,
    timeline: [
      { label: 'Order Confirmed', time: '07:00', completed: true },
      { label: 'Picked', time: '08:45', completed: true },
      { label: 'Loaded', time: '09:30', completed: true },
      { label: 'In Transit', time: '10:00', completed: false },
      { label: 'Unloading', time: '13:30', completed: false },
    ]
  },
  {
    id: 'shp-03', number: 'SHP-78446', truckId: 'TRK-2658', driverId: 'drv-03',
    route: 'WH-01 → Customer B', status: 'delayed', eta: '16:15', weight: 3200, items: 64,
    timeline: [
      { label: 'Order Confirmed', time: '05:30', completed: true },
      { label: 'Picked', time: '07:15', completed: true },
      { label: 'Loaded', time: '08:00', completed: true },
      { label: 'In Transit', time: '08:30', completed: true },
      { label: 'Unloading', time: '15:45', completed: false },
    ]
  },
  {
    id: 'shp-04', number: 'SHP-78447', truckId: 'TRK-2526', driverId: 'drv-04',
    route: 'WH-02 → Distribution Hub', status: 'en-transit' as any, eta: '17:00', weight: 4100, items: 96,
    timeline: [
      { label: 'Order Confirmed', time: '06:00', completed: true },
      { label: 'Picked', time: '07:30', completed: true },
      { label: 'Loaded', time: '08:15', completed: true },
      { label: 'In Transit', time: '09:00', completed: true },
      { label: 'Unloading', time: '16:30', completed: false },
    ]
  },
];

export const trucks: Truck[] = [
  { id: 'trk-01', number: 'TRK-2127', driver: 'John Smith', route: 'WH-01 → Bay 3', status: 'loading', eta: '4/7', capacity: 8000, load: 5600 },
  { id: 'trk-02', number: 'TRK-2104', driver: 'Michael Lee', route: 'WH-01 → Bay 1', status: 'unloading', eta: '-', capacity: 8000, load: 2400 },
  { id: 'trk-03', number: 'TRK-2658', driver: 'David Kim', route: 'WH-01 → Customer B', status: 'docking', eta: '-', capacity: 10000, load: 3200 },
  { id: 'trk-04', number: 'TRK-2526', driver: 'Robert Chen', route: 'WH-02 → Hub', status: 'en-route', eta: '17:00', capacity: 12000, load: 4100 },
  { id: 'trk-05', number: 'TRK-2890', driver: 'Sarah Johnson', route: 'WH-01 → Customer C', status: 'idle', eta: '-', capacity: 8000, load: 0 },
  { id: 'trk-06', number: 'TRK-3102', driver: 'James Wilson', route: 'WH-03 → Customer D', status: 'en-route', eta: '16:45', capacity: 6000, load: 3800 },
  { id: 'trk-07', number: 'TRK-3245', driver: 'Emily Davis', route: 'WH-02 → Customer E', status: 'loading', eta: '15:30', capacity: 10000, load: 6200 },
  { id: 'trk-08', number: 'TRK-3401', driver: 'Chris Brown', route: '-', status: 'maintenance', eta: '-', capacity: 8000, load: 0 },
];

export const forklifts: Forklift[] = [
  { id: 'fl-01', code: 'FL-01', status: 'active', operator: 'Daniel Smith', battery: 78, currentTask: 'Loading TRK-2127', zone: 'Zone A' },
  { id: 'fl-02', code: 'FL-02', status: 'active', operator: 'Maria Garcia', battery: 92, currentTask: 'Putaway PAL-88422', zone: 'Zone B' },
  { id: 'fl-03', code: 'FL-03', status: 'active', operator: 'James Wilson', battery: 14, currentTask: 'Loading TRK-2127', zone: 'Zone A' },
  { id: 'fl-04', code: 'FL-04', status: 'idle', operator: '-', battery: 95, currentTask: '-', zone: 'Zone C' },
  { id: 'fl-05', code: 'FL-05', status: 'charging', operator: '-', battery: 34, currentTask: '-', zone: 'Charging Bay' },
  { id: 'fl-06', code: 'FL-06', status: 'active', operator: 'Lisa Chen', battery: 67, currentTask: 'Unloading TRK-2104', zone: 'Receiving' },
];

export const workers: Worker[] = [
  { id: 'w-01', name: 'Alex Chen', role: 'Operations Manager', status: 'active', zone: 'Office', tasksCompleted: 0, shift: '08:00 - 17:00' },
  { id: 'w-02', name: 'Daniel Smith', role: 'Forklift Operator', status: 'active', zone: 'Zone A', tasksCompleted: 24, shift: '06:00 - 14:00' },
  { id: 'w-03', name: 'Maria Garcia', role: 'Forklift Operator', status: 'active', zone: 'Zone B', tasksCompleted: 18, shift: '06:00 - 14:00' },
  { id: 'w-04', name: 'James Wilson', role: 'Picker', status: 'active', zone: 'Zone A', tasksCompleted: 42, shift: '06:00 - 14:00' },
  { id: 'w-05', name: 'Sarah Johnson', role: 'Packer', status: 'active', zone: 'Packing', tasksCompleted: 56, shift: '07:00 - 15:00' },
  { id: 'w-06', name: 'Lisa Chen', role: 'Receiver', status: 'active', zone: 'Receiving', tasksCompleted: 8, shift: '06:00 - 14:00' },
  { id: 'w-07', name: 'Robert Kim', role: 'Picker', status: 'on-break', zone: 'Zone B', tasksCompleted: 31, shift: '07:00 - 15:00' },
  { id: 'w-08', name: 'Emily Davis', role: 'Shipping Clerk', status: 'active', zone: 'Shipping', tasksCompleted: 12, shift: '08:00 - 17:00' },
  { id: 'w-09', name: 'Chris Brown', role: 'Supervisor', status: 'active', zone: 'All Zones', tasksCompleted: 0, shift: '06:00 - 14:00' },
  { id: 'w-10', name: 'Amanda White', role: 'Picker', status: 'active', zone: 'Zone C', tasksCompleted: 38, shift: '07:00 - 15:00' },
];

export const orders: Order[] = [
  { id: 'so-01', number: 'SO-55431', type: 'sales', party: 'Acme Electronics', items: 14, value: 12450, warehouse: 'WH-01', status: 'picking', created: '2024-01-15 06:44' },
  { id: 'so-02', number: 'SO-55432', type: 'sales', party: 'TechStore Inc', items: 8, value: 8920, warehouse: 'WH-01', status: 'packed', created: '2024-01-15 07:12' },
  { id: 'so-03', number: 'SO-55433', type: 'sales', party: 'Office Depot', items: 24, value: 34200, warehouse: 'WH-01', status: 'shipped', created: '2024-01-14 14:30' },
  { id: 'so-04', number: 'SO-55434', type: 'sales', party: 'BuildRight Co', items: 6, value: 5670, warehouse: 'WH-02', status: 'confirmed', created: '2024-01-15 08:00' },
  { id: 'so-05', number: 'SO-55435', type: 'sales', party: 'DataCenter Pro', items: 3, value: 18500, warehouse: 'WH-02', status: 'picking', created: '2024-01-15 07:45' },
  { id: 'po-01', number: 'PO-33201', type: 'purchase', party: 'BrightLight Corp', items: 500, value: 12250, warehouse: 'WH-01', status: 'confirmed', created: '2024-01-14 09:00', expectedDate: '2024-01-18' },
  { id: 'po-02', number: 'PO-33202', type: 'purchase', party: 'PackRight Inc', items: 2000, value: 7400, warehouse: 'WH-01', status: 'in-transit', created: '2024-01-12 11:30', expectedDate: '2024-01-16' },
  { id: 'po-03', number: 'PO-33203', type: 'purchase', party: 'TechLine Ltd', items: 200, value: 9000, warehouse: 'WH-02', status: 'received', created: '2024-01-10 08:00', expectedDate: '2024-01-14' },
  { id: 'po-04', number: 'PO-33204', type: 'purchase', party: 'SafeGuard Supplies', items: 1000, value: 8500, warehouse: 'WH-01', status: 'confirmed', created: '2024-01-15 10:00', expectedDate: '2024-01-20' },
];

export const alerts: Alert[] = [
  { id: 'al-01', type: 'low-stock', severity: 'warning', title: 'Low Stock: Nitrile Gloves', description: 'Stock level at 234 units, below reorder level of 500', action: 'Create Purchase Order', timestamp: '10 min ago', resolved: false },
  { id: 'al-02', type: 'delayed-shipment', severity: 'critical', title: 'Delayed Shipment: SHP-78446', description: 'Expected arrival 14:30, current ETA 16:15', action: 'View Shipment', timestamp: '25 min ago', resolved: false },
  { id: 'al-03', type: 'equipment', severity: 'warning', title: 'Forklift FL-03 Low Battery', description: 'Battery at 14%, return to charging station', action: 'Return to Charging', timestamp: '5 min ago', resolved: false },
  { id: 'al-04', type: 'capacity', severity: 'info', title: 'Zone A at 82% Capacity', description: 'Approaching maximum storage capacity', action: 'Review Putaway', timestamp: '1 hour ago', resolved: false },
  { id: 'al-05', type: 'low-stock', severity: 'critical', title: 'Low Stock: HP Toner 26A', description: 'Stock level at 45 units, below reorder level of 30 (near threshold)', action: 'Create Purchase Order', timestamp: '30 min ago', resolved: false },
  { id: 'al-06', type: 'equipment', severity: 'info', title: 'Forklift FL-05 Charging', description: 'Currently at 34%, estimated full charge at 14:00', action: 'View Status', timestamp: '45 min ago', resolved: false },
];

export const kpiData: KPIData[] = [
  { label: 'Stock on Hand', value: '3,310', trend: 4.2, trendLabel: '+4.2% vs last week', icon: 'package', sparkline: [2800, 2950, 3100, 3050, 3200, 3150, 3310] },
  { label: 'Trucks On Site', value: '3', trend: 0, trendLabel: '2 inbound, 1 outbound', icon: 'truck', sparkline: [2, 3, 4, 3, 2, 3, 3] },
  { label: 'On-Time Delivery', value: '98.2%', trend: 0.4, trendLabel: '+0.4% last 30 days', icon: 'clock', sparkline: [96, 97, 97.5, 98, 97.8, 98.1, 98.2] },
  { label: 'Pending Orders', value: '127', trend: -8.4, trendLabel: '-8.4% vs yesterday', icon: 'clipboard', sparkline: [145, 138, 140, 135, 130, 128, 127] },
  { label: 'Warehouse Utilization', value: '79%', trend: 2.1, trendLabel: '+2.1% capacity', icon: 'warehouse', sparkline: [72, 74, 75, 76, 77, 78, 79] },
];

export const chartData = {
  inventoryValue: [
    { month: 'Jul', value: 420000 }, { month: 'Aug', value: 445000 },
    { month: 'Sep', value: 460000 }, { month: 'Oct', value: 480000 },
    { month: 'Nov', value: 510000 }, { month: 'Dec', value: 530000 },
    { month: 'Jan', value: 548000 },
  ],
  orderFulfillment: [
    { day: 'Mon', rate: 96 }, { day: 'Tue', rate: 98 }, { day: 'Wed', rate: 97 },
    { day: 'Thu', rate: 99 }, { day: 'Fri', rate: 95 }, { day: 'Sat', rate: 92 },
    { day: 'Sun', rate: 88 },
  ],
  warehouseUtilization: [
    { zone: 'Zone A', utilization: 82 }, { zone: 'Zone B', utilization: 72 },
    { zone: 'Zone C', utilization: 80 }, { zone: 'Receiving', utilization: 60 },
    { zone: 'Shipping', utilization: 80 },
  ],
  shipmentsPerDay: [
    { day: 'Mon', outbound: 24, inbound: 18 }, { day: 'Tue', outbound: 28, inbound: 22 },
    { day: 'Wed', outbound: 22, inbound: 20 }, { day: 'Thu', outbound: 30, inbound: 16 },
    { day: 'Fri', outbound: 26, inbound: 24 }, { day: 'Sat', outbound: 12, inbound: 8 },
    { day: 'Sun', outbound: 6, inbound: 4 },
  ],
  pickingEfficiency: [
    { hour: '6am', picks: 45 }, { hour: '7am', picks: 68 }, { hour: '8am', picks: 82 },
    { hour: '9am', picks: 95 }, { hour: '10am', picks: 88 }, { hour: '11am', picks: 76 },
    { hour: '12pm', picks: 42 }, { hour: '1pm', picks: 65 }, { hour: '2pm', picks: 78 },
  ],
};
