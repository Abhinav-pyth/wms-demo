import React from 'react';
import { useStore } from '../../store/useStore';
import {
  LayoutDashboard, Package, Truck, BarChart3, Settings,
  ChevronLeft, ChevronRight, Building, ClipboardList, ArrowDownToLine,
  ArrowUpFromLine, Scan, PackageCheck, Send, RotateCcw,
  Boxes, MapPin, ArrowRightLeft, Users, AlertTriangle, Link, User
} from 'lucide-react';

const navItems = [
  { section: 'Overview', items: [{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }] },
  { section: 'Operations', items: [
    { id: 'receiving', label: 'Receiving', icon: ArrowDownToLine },
    { id: 'putaway', label: 'Putaway', icon: ArrowUpFromLine },
    { id: 'picking', label: 'Picking', icon: Scan },
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
    { id: 'forklifts', label: 'Forklifts', icon: Truck },
    { id: 'drivers', label: 'Drivers', icon: User },
  ]},
  { section: 'Management', items: [
    { id: 'purchase-orders', label: 'Purchase Orders', icon: ClipboardList },
    { id: 'sales-orders', label: 'Sales Orders', icon: ClipboardList },
    { id: 'suppliers', label: 'Suppliers', icon: Building },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'workers', label: 'Workers', icon: Users },
  ]},
  { section: 'Analytics', items: [
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
  ]},
  { section: 'System', items: [
    { id: 'integrations', label: 'Integrations', icon: Link },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]},
];

export const Sidebar: React.FC = () => {
  const { sidebarCollapsed, toggleSidebar, currentPage, setCurrentPage } = useStore();

  return (
    <aside className={`fixed left-0 top-0 h-screen bg-white border-r border-slate-200 z-40 transition-all duration-300 flex flex-col ${sidebarCollapsed ? 'w-[68px]' : 'w-[260px]'}`}>
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-slate-100 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-sm shadow-blue-200">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
          </div>
          {!sidebarCollapsed && (
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-slate-900 leading-tight tracking-tight">StockFlow AI</span>
              <span className="text-[10px] text-slate-400 leading-tight font-medium">Intelligent Operations</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2.5">
        {navItems.map((section) => (
          <div key={section.section} className="mb-4">
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
                  className={`w-full flex items-center gap-2.5 px-3 py-[9px] rounded-lg text-[13px] transition-all duration-150 mb-[2px] ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold shadow-sm shadow-blue-100'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
                  } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <Icon className={`w-[18px] h-[18px] flex-shrink-0 ${isActive ? 'text-blue-600' : ''}`} strokeWidth={isActive ? 2.2 : 1.8} />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className="p-3 border-t border-slate-100 shrink-0">
        <button
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors"
        >
          {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {!sidebarCollapsed && <span className="text-xs font-medium">Collapse</span>}
        </button>
      </div>
    </aside>
  );
};
