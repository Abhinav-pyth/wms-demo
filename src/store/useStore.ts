import { create } from 'zustand';
import { Organization, Warehouse, UserRole } from '../types/multitenant';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
}

// Demo organizations for the multi-tenant demo
const demoOrganizations: Organization[] = [
  {
    id: 'org-001',
    name: 'Northstar Logistics Pvt Ltd',
    slug: 'northstar-logistics',
    industry: 'Logistics',
    country: 'IN',
    timezone: 'Asia/Kolkata',
    currency: 'INR',
    status: 'active',
    plan_id: 'plan-pro',
    trial_ends_at: undefined,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'org-002',
    name: 'Acme Retail India',
    slug: 'acme-retail',
    industry: 'Retail',
    country: 'IN',
    timezone: 'Asia/Kolkata',
    currency: 'INR',
    status: 'trial',
    plan_id: 'plan-growth',
    trial_ends_at: '2026-10-22T00:00:00Z',
    created_at: '2024-09-20T00:00:00Z',
    updated_at: '2024-09-20T00:00:00Z',
  },
  {
    id: 'org-003',
    name: 'Demo Warehouse Co',
    slug: 'demo-warehouse',
    industry: 'Distribution',
    country: 'US',
    timezone: 'America/Chicago',
    currency: 'USD',
    status: 'trial',
    plan_id: 'plan-starter',
    trial_ends_at: '2026-10-15T00:00:00Z',
    created_at: '2024-09-24T00:00:00Z',
    updated_at: '2024-09-24T00:00:00Z',
  },
];

const demoWarehouses: Record<string, Warehouse[]> = {
  'org-001': [
    {
      id: 'wh-indore', organization_id: 'org-001', name: 'Indore Distribution Center', code: 'WH-IDR',
      address: 'Plot 45, Pithampur Industrial Area', city: 'Indore', state: 'Madhya Pradesh',
      country: 'IN', timezone: 'Asia/Kolkata', capacity: 50000, status: 'active',
      created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z',
    },
    {
      id: 'wh-mumbai', organization_id: 'org-001', name: 'Mumbai Fulfillment Center', code: 'WH-MUM',
      address: 'Gate 7, Bhiwandi Logistics Park', city: 'Mumbai', state: 'Maharashtra',
      country: 'IN', timezone: 'Asia/Kolkata', capacity: 40000, status: 'active',
      created_at: '2024-02-15T00:00:00Z', updated_at: '2024-02-15T00:00:00Z',
    },
    {
      id: 'wh-delhi', organization_id: 'org-001', name: 'Delhi Distribution Hub', code: 'WH-DEL',
      address: 'Sector 63, Noida', city: 'Delhi NCR', state: 'Uttar Pradesh',
      country: 'IN', timezone: 'Asia/Kolkata', capacity: 30000, status: 'active',
      created_at: '2024-03-10T00:00:00Z', updated_at: '2024-03-10T00:00:00Z',
    },
  ],
  'org-002': [
    {
      id: 'wh-bangalore', organization_id: 'org-002', name: 'Bangalore Central Warehouse', code: 'WH-BLR',
      address: 'Whitefield Tech Park', city: 'Bangalore', state: 'Karnataka',
      country: 'IN', timezone: 'Asia/Kolkata', capacity: 25000, status: 'active',
      created_at: '2024-09-20T00:00:00Z', updated_at: '2024-09-20T00:00:00Z',
    },
  ],
  'org-003': [
    {
      id: 'wh-demo', organization_id: 'org-003', name: 'Demo Warehouse', code: 'WH-DEMO',
      address: '123 Main Street', city: 'Chicago', state: 'IL',
      country: 'US', timezone: 'America/Chicago', capacity: 20000, status: 'active',
      created_at: '2024-09-24T00:00:00Z', updated_at: '2024-09-24T00:00:00Z',
    },
  ],
};

interface AppState {
  // Auth state
  isAuthenticated: boolean;
  user: { id: string; email: string; name: string; avatar_url?: string } | null;
  userRole: UserRole;

  // Tenant state
  organizations: Organization[];
  currentOrganization: Organization | null;
  currentWarehouse: Warehouse | null;
  warehouses: Warehouse[];

  // UI state
  sidebarCollapsed: boolean;
  darkMode: boolean;
  currentPage: string;
  commandPaletteOpen: boolean;
  aiAssistantOpen: boolean;
  notifications: number;
  toasts: Toast[];
  orgSwitcherOpen: boolean;
  warehouseSwitcherOpen: boolean;
  mobileMenuOpen: boolean;
  isMobileView: boolean;

  // Actions
  login: (email: string) => void;
  logout: () => void;
  toggleSidebar: () => void;
  toggleDarkMode: () => void;
  setCurrentPage: (page: string) => void;
  setCommandPaletteOpen: (open: boolean) => void;
  setAiAssistantOpen: (open: boolean) => void;
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  switchOrganization: (orgId: string) => void;
  switchWarehouse: (warehouseId: string) => void;
  setOrgSwitcherOpen: (open: boolean) => void;
  setWarehouseSwitcherOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setIsMobileView: (isMobile: boolean) => void;
}

export const useStore = create<AppState>((set, get) => ({
  // Auth state
  isAuthenticated: true, // Demo mode
  user: { id: 'user-001', email: 'alex@northstar.io', name: 'Alex Chen', avatar_url: undefined },
  userRole: 'warehouse_manager',

  // Tenant state
  organizations: demoOrganizations,
  currentOrganization: demoOrganizations[0],
  currentWarehouse: demoWarehouses['org-001'][0],
  warehouses: demoWarehouses['org-001'],

  // UI state
  sidebarCollapsed: false,
  darkMode: false,
  currentPage: 'dashboard',
  commandPaletteOpen: false,
  aiAssistantOpen: false,
  notifications: 5,
  toasts: [],
  orgSwitcherOpen: false,
  warehouseSwitcherOpen: false,
  mobileMenuOpen: false,
  isMobileView: false,

  // Actions
  login: (email) => set({
    isAuthenticated: true,
    user: { id: 'user-001', email, name: 'Alex Chen' },
  }),
  logout: () => set({ isAuthenticated: false, user: null }),

  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  toggleDarkMode: () => set((state) => {
    const newMode = !state.darkMode;
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return { darkMode: newMode };
  }),
  setCurrentPage: (page) => set({ currentPage: page, mobileMenuOpen: false }),
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
  setAiAssistantOpen: (open) => set({ aiAssistantOpen: open }),
  addToast: (toast) => set((state) => ({
    toasts: [...state.toasts, { ...toast, id: Date.now().toString() }]
  })),
  removeToast: (id) => set((state) => ({
    toasts: state.toasts.filter(t => t.id !== id)
  })),

  switchOrganization: (orgId) => {
    const org = get().organizations.find(o => o.id === orgId);
    const warehouses = demoWarehouses[orgId] || [];
    set({
      currentOrganization: org || null,
      warehouses,
      currentWarehouse: warehouses[0] || null,
      orgSwitcherOpen: false,
      currentPage: 'dashboard', // Reset to dashboard on org switch
    });
  },

  switchWarehouse: (warehouseId) => {
    const warehouse = get().warehouses.find(w => w.id === warehouseId);
    set({ currentWarehouse: warehouse || null, warehouseSwitcherOpen: false });
  },

  setOrgSwitcherOpen: (open) => set({ orgSwitcherOpen: open, warehouseSwitcherOpen: false }),
  setWarehouseSwitcherOpen: (open) => set({ warehouseSwitcherOpen: open, orgSwitcherOpen: false }),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  setIsMobileView: (isMobile) => set({ isMobileView: isMobile }),
}));
