-- StockFlow AI Seed Data
-- Demo organization: Northstar Logistics Pvt Ltd

-- ============================================================
-- SUBSCRIPTION PLANS
-- ============================================================
INSERT INTO subscription_plans (id, name, slug, price_monthly, price_yearly, currency, limits, features) VALUES
('plan-starter', 'Starter', 'starter', 2999, 28790, 'INR',
  '{"warehouses": 1, "users": 5, "products": 5000, "orders_per_month": 10000, "shipments_per_month": 5000, "api_requests_per_month": 10000, "ai_requests_per_month": 1000, "storage_gb": 5}',
  ARRAY['Basic analytics', 'Email support']),

('plan-growth', 'Growth', 'growth', 7999, 76790, 'INR',
  '{"warehouses": 5, "users": 25, "products": 50000, "orders_per_month": 100000, "shipments_per_month": 50000, "api_requests_per_month": 100000, "ai_requests_per_month": 10000, "storage_gb": 25}',
  ARRAY['Advanced analytics', 'AI assistant', 'Priority support']),

('plan-pro', 'Pro', 'pro', 19999, 191990, 'INR',
  '{"warehouses": 999, "users": 100, "products": 500000, "orders_per_month": 999999, "shipments_per_month": 999999, "api_requests_per_month": 1000000, "ai_requests_per_month": 50000, "storage_gb": 100}',
  ARRAY['Advanced AI', 'API access', 'Dedicated support']),

('plan-enterprise', 'Enterprise', 'enterprise', 49999, 479990, 'INR',
  '{"warehouses": 999, "users": 999, "products": 999999, "orders_per_month": 999999, "shipments_per_month": 999999, "api_requests_per_month": 999999, "ai_requests_per_month": 999999, "storage_gb": 999}',
  ARRAY['Unlimited everything', 'SSO & SAML', 'Custom integrations', 'SLA guarantee', 'Dedicated CSM']);

-- ============================================================
-- DEMO ORGANIZATION
-- ============================================================
INSERT INTO organizations (id, name, slug, industry, country, timezone, currency, status, plan_id, trial_ends_at) VALUES
('org-001', 'Northstar Logistics Pvt Ltd', 'northstar-logistics', 'Logistics', 'IN', 'Asia/Kolkata', 'INR', 'active', 'plan-pro', NULL);

-- ============================================================
-- DEMO USER (Operations Manager)
-- ============================================================
INSERT INTO users (id, email, name, password_hash) VALUES
('user-001', 'alex@northstar.io', 'Alex Chen', '$2b$10$demo_hash_not_for_production');

INSERT INTO organization_members (organization_id, user_id, role, status) VALUES
('org-001', 'user-001', 'warehouse_manager', 'active');

-- ============================================================
-- DEMO WAREHOUSES
-- ============================================================
INSERT INTO warehouses (id, organization_id, name, code, address, city, state, country, timezone, capacity, status) VALUES
('wh-indore', 'org-001', 'Indore Distribution Center', 'WH-IDR', 'Plot 45, Pithampur Industrial Area', 'Indore', 'Madhya Pradesh', 'IN', 'Asia/Kolkata', 50000, 'active'),
('wh-mumbai', 'org-001', 'Mumbai Fulfillment Center', 'WH-MUM', 'Gate 7, Bhiwandi Logistics Park', 'Mumbai', 'Maharashtra', 'IN', 'Asia/Kolkata', 40000, 'active'),
('wh-delhi', 'org-001', 'Delhi Distribution Hub', 'WH-DEL', 'Sector 63, Noida', 'Delhi NCR', 'Uttar Pradesh', 'IN', 'Asia/Kolkata', 30000, 'active');

-- ============================================================
-- DEMO WAREHOUSE ZONES
-- ============================================================
INSERT INTO warehouse_zones (id, warehouse_id, organization_id, name, code, type, capacity) VALUES
('zone-a', 'wh-indore', 'org-001', 'Zone A - Electronics', 'A', 'storage', 1200),
('zone-b', 'wh-indore', 'org-001', 'Zone B - Furniture', 'B', 'storage', 1000),
('zone-c', 'wh-indore', 'org-001', 'Zone C - Packaging', 'C', 'storage', 800),
('zone-recv', 'wh-indore', 'org-001', 'Receiving Dock', 'R', 'receiving', 200),
('zone-ship', 'wh-indore', 'org-001', 'Shipping Dock', 'S', 'shipping', 200),
('zone-pack', 'wh-indore', 'org-001', 'Packing Area', 'P', 'packing', 150);

-- ============================================================
-- DEMO PRODUCTS (Sample of 20)
-- ============================================================
INSERT INTO products (id, organization_id, sku, name, category, barcode, unit, cost, price, reorder_level, weight) VALUES
('p-01', 'org-001', 'LED-60X60', 'LED Panel 60x60', 'Lighting', '8901234567001', 'pcs', 24.50, 42.00, 200, 3.2),
('p-02', 'org-001', 'OFC-ERG-01', 'Ergonomic Office Chair', 'Furniture', '8901234567002', 'pcs', 185.00, 349.00, 50, 18.5),
('p-03', 'org-001', 'BOX-MED-01', 'Cardboard Box Medium', 'Packaging', '8901234567003', 'pcs', 1.20, 2.50, 1000, 0.3),
('p-04', 'org-001', 'GLV-NIT-L', 'Nitrile Gloves Large', 'Safety', '8901234567004', 'box', 8.50, 14.99, 500, 0.5),
('p-05', 'org-001', 'CBL-USB-C', 'USB-C Cable 2m', 'Electronics', '8901234567005', 'pcs', 3.20, 9.99, 300, 0.08),
('p-06', 'org-001', 'PPR-A4-500', 'A4 Paper 500 Sheets', 'Office Supplies', '8901234567006', 'ream', 4.50, 8.99, 200, 2.5),
('p-07', 'org-001', 'TNR-HP-26A', 'HP Toner 26A', 'Office Supplies', '8901234567007', 'pcs', 52.00, 89.99, 30, 1.2),
('p-08', 'org-001', 'DSK-STD-01', 'Standard Desk 120cm', 'Furniture', '8901234567008', 'pcs', 120.00, 229.00, 25, 35.0),
('p-09', 'org-001', 'MON-27-4K', '27" 4K Monitor', 'Electronics', '8901234567009', 'pcs', 280.00, 449.00, 40, 6.5),
('p-10', 'org-001', 'KBD-MECH-01', 'Mechanical Keyboard', 'Electronics', '8901234567010', 'pcs', 45.00, 89.00, 60, 0.9),
('p-11', 'org-001', 'MSE-WL-01', 'Wireless Mouse', 'Electronics', '8901234567011', 'pcs', 12.00, 29.99, 100, 0.1),
('p-12', 'org-001', 'HDS-USB-01', 'USB Hub 7-Port', 'Electronics', '8901234567012', 'pcs', 15.00, 34.99, 80, 0.2),
('p-13', 'org-001', 'CAB-SRJ-01', 'Server Rack 42U', 'IT Infrastructure', '8901234567013', 'pcs', 450.00, 799.00, 10, 65.0),
('p-14', 'org-001', 'SWT-48P-01', '48-Port Network Switch', 'IT Infrastructure', '8901234567014', 'pcs', 320.00, 549.00, 15, 4.5),
('p-15', 'org-001', 'CAM-SEC-01', 'Security Camera 4K', 'Security', '8901234567015', 'pcs', 85.00, 159.00, 30, 0.8),
('p-16', 'org-001', 'EXT-CORD-5M', 'Extension Cord 5m', 'Electrical', '8901234567016', 'pcs', 8.00, 16.99, 150, 0.6),
('p-17', 'org-001', 'TAPE-PKG-01', 'Packing Tape Roll', 'Packaging', '8901234567017', 'roll', 2.50, 5.99, 500, 0.3),
('p-18', 'org-001', 'PAL-WOOD-01', 'Wooden Pallet Standard', 'Logistics', '8901234567018', 'pcs', 12.00, 22.00, 100, 22.0),
('p-19', 'org-001', 'WRAP-STR-01', 'Stretch Wrap 500mm', 'Packaging', '8901234567019', 'roll', 6.50, 12.99, 200, 1.5),
('p-20', 'org-001', 'LBL-THERM-01', 'Thermal Label Roll', 'Packaging', '8901234567020', 'roll', 4.00, 8.99, 300, 0.4);

-- ============================================================
-- DEMO INVENTORY
-- ============================================================
INSERT INTO inventory (organization_id, product_id, warehouse_id, location_id, available, reserved, damaged, quarantine) VALUES
('org-001', 'p-01', 'wh-indore', NULL, 1450, 337, 0, 0),
('org-001', 'p-02', 'wh-indore', NULL, 520, 154, 0, 0),
('org-001', 'p-03', 'wh-indore', NULL, 845, 400, 0, 0),
('org-001', 'p-04', 'wh-indore', NULL, 234, 500, 0, 0), -- Low stock!
('org-001', 'p-05', 'wh-indore', NULL, 2100, 200, 0, 0),
('org-001', 'p-06', 'wh-indore', NULL, 1800, 150, 0, 0),
('org-001', 'p-07', 'wh-indore', NULL, 45, 12, 0, 0), -- Low stock!
('org-001', 'p-08', 'wh-indore', NULL, 38, 8, 0, 0),
('org-001', 'p-09', 'wh-indore', NULL, 120, 35, 0, 0),
('org-001', 'p-10', 'wh-indore', NULL, 280, 45, 0, 0);

-- ============================================================
-- DEMO SUPPLIERS
-- ============================================================
INSERT INTO suppliers (organization_id, name, contact_name, email, phone, country, lead_time_days, rating) VALUES
('org-001', 'BrightLight Corp', 'Rajesh Kumar', 'sales@brightlight.in', '+91-9876543210', 'IN', 7, 4.5),
('org-001', 'ComfortWorks', 'Priya Sharma', 'orders@comfortworks.in', '+91-9876543211', 'IN', 14, 4.2),
('org-001', 'PackRight Inc', 'Amit Patel', 'supply@packright.in', '+91-9876543212', 'IN', 3, 4.8),
('org-001', 'SafeGuard Supplies', 'Sneha Reddy', 'info@safeguard.in', '+91-9876543213', 'IN', 5, 4.6),
('org-001', 'TechLine Ltd', 'Vikram Singh', 'orders@techline.in', '+91-9876543214', 'IN', 10, 4.3);

-- ============================================================
-- DEMO CUSTOMERS
-- ============================================================
INSERT INTO customers (organization_id, name, email, phone, city, country, customer_type) VALUES
('org-001', 'Acme Electronics', 'orders@acme.in', '+91-9988776655', 'Bangalore', 'IN', 'business'),
('org-001', 'TechStore Inc', 'procurement@techstore.in', '+91-9988776656', 'Mumbai', 'IN', 'business'),
('org-001', 'Office Depot India', 'supply@officedepot.in', '+91-9988776657', 'Delhi', 'IN', 'business'),
('org-001', 'BuildRight Co', 'purchase@buildright.in', '+91-9988776658', 'Pune', 'IN', 'business'),
('org-001', 'DataCenter Pro', 'ops@datacenterpro.in', '+91-9988776659', 'Chennai', 'IN', 'business');

-- ============================================================
-- DEMO SALES ORDERS
-- ============================================================
INSERT INTO sales_orders (organization_id, order_number, customer_id, warehouse_id, status, total_amount, items_count) VALUES
('org-001', 'SO-55431', (SELECT id FROM customers WHERE name = 'Acme Electronics'), 'wh-indore', 'picking', 12450.00, 14),
('org-001', 'SO-55432', (SELECT id FROM customers WHERE name = 'TechStore Inc'), 'wh-indore', 'packed', 8920.00, 8),
('org-001', 'SO-55433', (SELECT id FROM customers WHERE name = 'Office Depot India'), 'wh-indore', 'shipped', 34200.00, 24),
('org-001', 'SO-55434', (SELECT id FROM customers WHERE name = 'BuildRight Co'), 'wh-mumbai', 'confirmed', 5670.00, 6),
('org-001', 'SO-55435', (SELECT id FROM customers WHERE name = 'DataCenter Pro'), 'wh-mumbai', 'picking', 18500.00, 3);

-- ============================================================
-- DEMO PURCHASE ORDERS
-- ============================================================
INSERT INTO purchase_orders (organization_id, order_number, supplier_id, warehouse_id, status, total_amount, expected_date) VALUES
('org-001', 'PO-33201', (SELECT id FROM suppliers WHERE name = 'BrightLight Corp'), 'wh-indore', 'confirmed', 12250.00, '2026-10-18'),
('org-001', 'PO-33202', (SELECT id FROM suppliers WHERE name = 'PackRight Inc'), 'wh-indore', 'in_transit', 7400.00, '2026-10-16'),
('org-001', 'PO-33203', (SELECT id FROM suppliers WHERE name = 'TechLine Ltd'), 'wh-mumbai', 'received', 9000.00, '2026-10-14'),
('org-001', 'PO-33204', (SELECT id FROM suppliers WHERE name = 'SafeGuard Supplies'), 'wh-indore', 'confirmed', 8500.00, '2026-10-20');

-- ============================================================
-- DEMO SHIPMENTS
-- ============================================================
INSERT INTO shipments (organization_id, shipment_number, order_id, warehouse_id, status, route, eta, weight, items_count) VALUES
('org-001', 'SHP-78444', (SELECT id FROM sales_orders WHERE order_number = 'SO-55431'), 'wh-indore', 'in_transit', 'WH-IDR → Customer A', '2026-10-08 15:30:00', 2400, 48),
('org-001', 'SHP-78445', (SELECT id FROM sales_orders WHERE order_number = 'SO-55432'), 'wh-indore', 'loaded', 'WH-IDR → Bay 3', '2026-10-08 14:00:00', 1800, 32),
('org-001', 'SHP-78446', (SELECT id FROM sales_orders WHERE order_number = 'SO-55433'), 'wh-indore', 'delayed', 'WH-IDR → Customer B', '2026-10-08 16:15:00', 3200, 64),
('org-001', 'SHP-78447', (SELECT id FROM sales_orders WHERE order_number = 'SO-55434'), 'wh-mumbai', 'in_transit', 'WH-MUM → Distribution Hub', '2026-10-08 17:00:00', 4100, 96);

-- ============================================================
-- DEMO TRUCKS
-- ============================================================
INSERT INTO trucks (organization_id, truck_number, driver_name, route, status, capacity, current_load) VALUES
('org-001', 'TRK-2127', 'John Smith', 'WH-IDR → Bay 3', 'loading', 8000, 5600),
('org-001', 'TRK-2104', 'Michael Lee', 'WH-IDR → Bay 1', 'unloading', 8000, 2400),
('org-001', 'TRK-2658', 'David Kim', 'WH-IDR → Customer B', 'docking', 10000, 3200),
('org-001', 'TRK-2526', 'Robert Chen', 'WH-MUM → Hub', 'en_route', 12000, 4100),
('org-001', 'TRK-2890', 'Sarah Johnson', 'WH-IDR → Customer C', 'idle', 8000, 0);

-- ============================================================
-- DEMO FORKLIFTS
-- ============================================================
INSERT INTO forklifts (organization_id, code, operator_name, status, battery_level, current_task, zone) VALUES
('org-001', 'FL-01', 'Daniel Smith', 'active', 78, 'Loading TRK-2127', 'Zone A'),
('org-001', 'FL-02', 'Maria Garcia', 'active', 92, 'Putaway PAL-88422', 'Zone B'),
('org-001', 'FL-03', 'James Wilson', 'active', 14, 'Loading TRK-2127', 'Zone A'), -- Low battery!
('org-001', 'FL-04', NULL, 'idle', 95, NULL, 'Zone C'),
('org-001', 'FL-05', NULL, 'charging', 34, NULL, 'Charging Bay'),
('org-001', 'FL-06', 'Lisa Chen', 'active', 67, 'Unloading TRK-2104', 'Receiving');

-- ============================================================
-- DEMO WORKERS
-- ============================================================
INSERT INTO workers (organization_id, name, role, status, zone, tasks_completed, shift) VALUES
('org-001', 'Alex Chen', 'Operations Manager', 'active', 'Office', 0, '08:00 - 17:00'),
('org-001', 'Daniel Smith', 'Forklift Operator', 'active', 'Zone A', 24, '06:00 - 14:00'),
('org-001', 'Maria Garcia', 'Forklift Operator', 'active', 'Zone B', 18, '06:00 - 14:00'),
('org-001', 'James Wilson', 'Picker', 'active', 'Zone A', 42, '06:00 - 14:00'),
('org-001', 'Sarah Johnson', 'Packer', 'active', 'Packing', 56, '07:00 - 15:00'),
('org-001', 'Lisa Chen', 'Receiver', 'active', 'Receiving', 8, '06:00 - 14:00'),
('org-001', 'Robert Kim', 'Picker', 'on_break', 'Zone B', 31, '07:00 - 15:00'),
('org-001', 'Emily Davis', 'Shipping Clerk', 'active', 'Shipping', 12, '08:00 - 17:00'),
('org-001', 'Chris Brown', 'Supervisor', 'active', 'All Zones', 0, '06:00 - 14:00'),
('org-001', 'Amanda White', 'Picker', 'active', 'Zone C', 38, '07:00 - 15:00');

-- ============================================================
-- DEMO ORGANIZATION SUBSCRIPTION
-- ============================================================
INSERT INTO organization_subscriptions (organization_id, plan_id, status, current_period_start, current_period_end) VALUES
('org-001', 'plan-pro', 'active', '2026-10-08 00:00:00', '2026-11-08 00:00:00');

-- ============================================================
-- DEMO USAGE RECORDS
-- ============================================================
INSERT INTO usage_records (organization_id, resource_type, period, quantity) VALUES
('org-001', 'users', '2026-10', 12),
('org-001', 'warehouses', '2026-10', 3),
('org-001', 'products', '2026-10', 487),
('org-001', 'orders', '2026-10', 2340),
('org-001', 'api_requests', '2026-10', 12450),
('org-001', 'ai_requests', '2026-10', 342),
('org-001', 'storage', '2026-10', 2.4);

-- ============================================================
-- DEMO AUDIT LOGS
-- ============================================================
INSERT INTO audit_logs (organization_id, user_id, action, resource_type, resource_id, ip_address, user_agent) VALUES
('org-001', 'user-001', 'INVENTORY_ADJUSTED', 'inventory', 'inv-01', '192.168.1.100', 'Mozilla/5.0'),
('org-001', 'user-001', 'ORDER_CREATED', 'sales_order', 'so-01', '192.168.1.100', 'Mozilla/5.0'),
('org-001', 'user-001', 'SHIPMENT_DISPATCHED', 'shipment', 'shp-01', '192.168.1.100', 'Mozilla/5.0'),
('org-001', 'user-001', 'USER_INVITED', 'user', 'user-002', '192.168.1.100', 'Mozilla/5.0'),
('org-001', 'user-001', 'PRODUCT_UPDATED', 'product', 'p-01', '192.168.1.100', 'Mozilla/5.0'),
('org-001', 'user-001', 'WAREHOUSE_CREATED', 'warehouse', 'wh-delhi', '192.168.1.100', 'Mozilla/5.0');
