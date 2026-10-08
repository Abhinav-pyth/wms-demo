import React from 'react';
import { useStore } from '../../store/useStore';
import {
  LayoutDashboard, Package, Truck, BarChart3, Bell, Settings,
  ChevronLeft, ChevronRight, Warehouse, ClipboardList, ArrowDownToLine,
  ArrowUpFromLine, ScanLine, PackageCheck, Send, RotateCcw,
  Boxes, MapPin, ArrowRightLeft, Users, Building2, UserCog,
  AlertTriangle, Puzzle, Tractor, UsersRound
} from 'lucide-react';

const navItems = [
  { section: 'Overview', items: [{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }] },
  { section: 'Operations', items: [
    { id: 'receiving', label: 'Receiving', icon: ArrowDownToLine },
    { id: 'putaway', label: 'Putaway', icon: ArrowUpFromLine },
    { id: 'picking', label: 'Picking', icon: ScanLine },
    { id: 'packing', label: 'Packing', icon: PackageCheck },
    { id: 'shipping', label: 'Shipping', icon: Send },
    { id: 'returns', label: 'Returns', icon: RotateCcw },
  ]},
  { section: 'Inventory', items: [
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'products', label: 'Products', icon: Boxes },
    { id: 'locations', label: 'Locations', icon: MapPin },
    { id: 'movements', label: 'Stock Movements', icon: ArrowRightLeft },
  ]},
  { section: 'Logistics', items: [
    { id: 'shipments', label: 'Shipments', icon: Truck },
    { id: 'trucks', label: 'Trucks', icon: Truck },
    { id: 'forklifts', label: 'Forklifts', icon: Tractor },
    { id: 'drivers', label: 'Drivers', icon: UsersRound },
  ]},
  { section: 'Management', items: [
    { id: 'purchase-orders', label: 'Purchase Orders', icon: ClipboardList },
    { id: 'sales-orders', label: 'Sales Orders', icon: ClipboardList },
    { id: 'suppliers', label: 'Suppliers', icon: Building2 },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'workers', label: 'Workers', icon: UserCog },
  ]},
  { section: 'Analytics', items: [
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
  ]},
  { section: 'System', items: [
    { id: 'integrations', label: 'Integrations', icon: Puzzle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]},
];

export const Sidebar: React.FC = () => {
  const { sidebarCollapsed, toggleSidebar, currentPage, setCurrentPage } = useStore();

  return (
    <aside className={`fixed left-0 top-0 h-full bg-white border-r border-slate-200 z-40 transition-all duration-300 flex flex-col ${sidebarCollapsed ? 'w-[68px]' : 'w-[260px]'}`}>
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
            <Warehouse className="w-4.5 h-4.5 text-white" />
          </div>
          {!sidebarCollapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-900 leading-tight">StockFlow AI</span>
              <span className="text-[10px] text-slate-400 leading-tight">Intelligent Operations</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {navItems.map((section) => (
          <div key={section.section} className="mb-3">
            {!sidebarCollapsed && (
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-1.5">{section.section}</p>
            )}
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150 mb-0.5 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  } ${sidebarCollapsed ? 'justify-center' : ''}`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <Icon className={`w-4.5 h-4.5 flex-shrink-0 ${isActive ? 'text-blue-600' : ''}`} />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className="p-3 border-t border-slate-100">
        <button
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-500 hover:bg-slate-50 transition-colors"
        >
          {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {!sidebarCollapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
};
