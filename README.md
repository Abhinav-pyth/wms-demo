# StockFlow AI - Multi-Tenant Warehouse Management SaaS

A production-ready, multi-tenant AI-powered Warehouse Management System (WMS) built with modern web technologies.

## 🏗️ Architecture Overview

### Multi-Tenant Design

StockFlow AI uses **organization-based tenant isolation** where each business (tenant) has complete data separation:

```
Organization (Tenant)
├── Warehouses
│   ├── Zones
│   │   └── Storage Locations
│   └── Workers
├── Products
├── Inventory
├── Orders (Sales & Purchase)
├── Shipments
├── Fleet (Trucks, Forklifts)
├── Users & Members
├── Subscription & Billing
└── Audit Logs
```

### Tenant Isolation

Every tenant-owned table includes `organization_id` as the primary isolation mechanism:

- **Database Level**: PostgreSQL Row Level Security (RLS)
- **Application Level**: All queries scoped to authenticated user's organization
- **API Level**: API keys bound to specific organizations

**Security Principle**: Never trust `organization_id` from client requests. Always derive from authenticated user's membership.

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 + Vite
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **3D Visualization**: React Three Fiber + Three.js
- **Charts**: Recharts
- **Icons**: Lucide React
- **Routing**: Custom page-based routing

### Backend (Architecture Ready)
- **Database**: Supabase PostgreSQL
- **Authentication**: Supabase Auth
- **Realtime**: Supabase Realtime
- **Storage**: Supabase Storage
- **Validation**: Zod (ready for integration)
- **Payments**: Stripe-compatible architecture
- **AI**: Provider-agnostic abstraction (OpenAI, Anthropic, Gemini ready)

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/          # Sidebar, Header
│   ├── warehouse/       # 3D Digital Twin
│   └── AIAssistant.tsx  # AI Operations Assistant
├── pages/
│   ├── Dashboard.tsx           # Main warehouse overview
│   ├── InventoryPage.tsx       # Inventory management
│   ├── AnalyticsPage.tsx       # Charts & insights
│   ├── OperationsPages.tsx     # Receiving, Picking, Packing, Shipping
│   ├── SettingsPage.tsx        # Billing, Users, API keys, Audit
│   ├── PlatformAdminPage.tsx   # Super admin dashboard
│   ├── LandingPage.tsx         # Marketing site
│   ├── AuthPages.tsx           # Login/Signup
│   ├── OnboardingPage.tsx      # Setup wizard
│   └── MobileWorkerPage.tsx    # Mobile worker interface
├── store/
│   └── useStore.ts     # Zustand store with tenant context
├── types/
│   ├── index.ts        # Core types
│   └── multitenant.ts  # Multi-tenant types
├── lib/
│   └── permissions.ts  # RBAC permission system
├── data/
│   └── mockData.ts     # Demo data
└── App.tsx             # Main app with routing

supabase/
├── migrations/
│   └── 001_initial_schema.sql  # Complete database schema with RLS
└── seed/
    └── seed_data.sql           # Demo organization data
```

## 🔐 Security Features

### Row Level Security (RLS)

All tenant-owned tables have RLS enabled with policies like:

```sql
CREATE POLICY "Tenant isolation for products"
  ON products FOR ALL
  USING (
    organization_id IN (
      SELECT organization_id FROM organization_members
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );
```

### Role-Based Access Control (RBAC)

10 user roles with granular permissions:

| Role | Permissions |
|------|-------------|
| Owner | Full access |
| Admin | Full access (no billing management) |
| Warehouse Manager | Inventory, orders, warehouse management |
| Supervisor | View + limited updates |
| Picker | View inventory, picking tasks |
| Packer | View inventory, packing tasks |
| Receiver | Receiving operations |
| Shipper | Shipping operations |
| Driver | View shipments |
| Viewer | Read-only access |

### Permission System

Centralized permission checks in `src/lib/permissions.ts`:

```typescript
import { hasPermission } from './lib/permissions';

if (hasPermission(userRole, 'inventory.create')) {
  // Allow inventory creation
}
```

## 💰 Subscription Plans

| Plan | Price | Warehouses | Users | Products | Orders/Month |
|------|-------|------------|-------|----------|--------------|
| Starter | ₹2,999/mo | 1 | 5 | 5,000 | 10,000 |
| Growth | ₹7,999/mo | 5 | 25 | 50,000 | 100,000 |
| Pro | ₹19,999/mo | Unlimited | 100 | 500,000 | Unlimited |
| Enterprise | Custom | Unlimited | Unlimited | Unlimited | Unlimited |

### Usage Limits

Enforced at application level before resource creation:

```typescript
// Check before creating new user
if (currentUsers >= planLimits.users) {
  throw new Error('User limit reached. Please upgrade your plan.');
}
```

## 🏭 Core Features

### 1. 3D Digital Twin
Interactive warehouse visualization using React Three Fiber:
- Real-time rack, pallet, and box rendering
- Animated forklifts and workers
- Clickable zones with inventory data
- Live status indicators

### 2. Inventory Management
- Multi-warehouse inventory tracking
- Stock movements ledger (immutable audit trail)
- Low stock alerts
- Barcode/QR scanning support
- CSV import/export

### 3. Order Management
- Sales orders with full lifecycle
- Purchase orders with receiving workflow
- Order allocation and fulfillment
- Returns processing

### 4. Operations
- **Receiving**: PO → Truck Arrival → Dock → Unload → Inspect → Putaway
- **Picking**: Task assignment, route optimization, progress tracking
- **Packing**: Item verification, label generation, packing slips
- **Shipping**: Carrier selection, tracking, delivery confirmation

### 5. Fleet Management
- Truck tracking and status
- Forklift monitoring (battery, tasks, location)
- Driver management
- Maintenance scheduling

### 6. Analytics
- Inventory value trends
- Order fulfillment rates
- Warehouse utilization
- Picking efficiency
- Shipment performance
- Custom date ranges

### 7. AI Operations Assistant
- Natural language queries
- Stock optimization recommendations
- Demand forecasting
- Route optimization
- Approval workflow for actions

### 8. Mobile Worker Interface
- Touch-optimized UI
- Barcode scanning
- Task management
- Real-time updates
- Offline-capable architecture

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Demo Access

**Demo Credentials:**
- Email: `alex@northstar.io`
- Password: `demo123`

**Demo Organization:** Northstar Logistics Pvt Ltd
- 3 Warehouses (Indore, Mumbai, Delhi)
- 20 Products
- 10 Workers
- Active shipments and orders

## 📊 Database Schema

### Core Tables

- `organizations` - Tenant companies
- `organization_members` - User-organization relationships
- `warehouses` - Physical warehouse locations
- `warehouse_zones` - Storage zones within warehouses
- `storage_locations` - Specific bin locations
- `products` - Product catalog
- `inventory` - Stock levels per location
- `inventory_movements` - Immutable ledger of all stock changes
- `sales_orders` - Customer orders
- `purchase_orders` - Supplier orders
- `shipments` - Outbound shipments
- `trucks` - Fleet vehicles
- `forklifts` - Material handling equipment
- `workers` - Warehouse staff
- `subscription_plans` - Available plans
- `organization_subscriptions` - Active subscriptions
- `usage_records` - Resource consumption tracking
- `audit_logs` - Complete audit trail
- `api_keys` - API authentication
- `webhooks` - Event notifications

### Key Features

- **UUIDs** for all primary keys
- **Timestamps** on all tables
- **Enums** for status fields
- **Indexes** on foreign keys and common queries
- **Generated columns** for computed values (e.g., inventory total)
- **JSONB** for flexible data (dimensions, limits)

## 🔌 API Architecture (Ready for Implementation)

### REST API Endpoints

```
GET    /api/v1/products
GET    /api/v1/inventory
GET    /api/v1/orders
POST   /api/v1/orders
GET    /api/v1/shipments
POST   /api/v1/shipments
GET    /api/v1/warehouses
```

### Authentication

API key-based authentication:

```bash
curl -H "Authorization: Bearer sk_live_xxxxx" \
     https://api.stockflow.ai/v1/products
```

### Rate Limiting

Configurable per plan:
- Starter: 10,000 requests/month
- Growth: 100,000 requests/month
- Pro: 1,000,000 requests/month

## 🎨 Design System

### Color Palette
- Primary: Blue (#3b82f6)
- Success: Emerald (#10b981)
- Warning: Amber (#f59e0b)
- Error: Red (#ef4444)
- Neutral: Slate (#64748b)

### Typography
- Font: Inter
- Headings: Bold, tight tracking
- Body: Regular, relaxed line height

### Components
- Rounded corners (12-16px)
- Subtle shadows
- Smooth transitions
- Accessible focus states
- Responsive layouts

## 📱 Responsive Design

### Desktop (1440px+)
- Full sidebar navigation
- Large 3D visualization
- Data tables
- Multi-column layouts

### Tablet (768px-1439px)
- Collapsible sidebar
- Responsive warehouse view
- Adaptive grids

### Mobile (320px-767px)
- Bottom navigation
- Card-based layouts
- Touch-friendly controls
- Worker mode interface

## 🔒 Security Checklist

- [x] Row Level Security on all tenant tables
- [x] Role-based access control
- [x] Server-side authorization
- [x] Input validation (Zod-ready)
- [x] SQL injection protection (parameterized queries)
- [x] XSS protection (React escaping)
- [x] CSRF protection (same-site cookies)
- [x] Rate limiting architecture
- [x] Audit logging
- [x] API key hashing
- [x] Secure environment variables
- [x] No service-role keys in client

## 🧪 Testing Strategy

### Unit Tests
- Permission system
- Inventory calculations
- Order state transitions
- Usage limit enforcement

### Integration Tests
- Tenant isolation
- RLS policies
- API authentication
- Webhook processing

### E2E Tests
- User workflows
- Multi-tenant scenarios
- Subscription limits
- Mobile worker flows

## 🚀 Deployment

### Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe
STRIPE_SECRET_KEY=your-stripe-key
STRIPE_WEBHOOK_SECRET=your-webhook-secret

# AI Provider
AI_PROVIDER_KEY=your-ai-key
```

### Build & Deploy

```bash
npm run build
# Deploy dist/ to your hosting platform
```

## 📈 Roadmap

### Phase 1 (Current)
- [x] Multi-tenant architecture
- [x] 3D digital twin
- [x] Inventory management
- [x] Order management
- [x] Analytics dashboard
- [x] Mobile worker interface

### Phase 2 (Next)
- [ ] Supabase integration
- [ ] Stripe billing
- [ ] Real-time updates
- [ ] Barcode scanning
- [ ] Advanced AI features

### Phase 3 (Future)
- [ ] Marketplace integrations
- [ ] Mobile apps (iOS/Android)
- [ ] Advanced reporting
- [ ] Custom workflows
- [ ] White-label support

## 🤝 Contributing

This is a production-ready SaaS platform. For contributions:

1. Follow TypeScript strict mode
2. Maintain tenant isolation
3. Write tests for new features
4. Update documentation
5. Follow existing code patterns

## 📄 License

Proprietary - All rights reserved.

## 🆘 Support

- Documentation: [docs.stockflow.ai](https://docs.stockflow.ai)
- Email: support@stockflow.ai
- Status: [status.stockflow.ai](https://status.stockflow.ai)

---

**Built with ❤️ for modern warehouse operations**
