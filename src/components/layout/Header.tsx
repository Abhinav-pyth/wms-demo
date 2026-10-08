import React from 'react';
import { useStore } from '../../store/useStore';
import { Search, Bell, HelpCircle, ChevronDown, Moon, Keyboard, Menu, Building2, MapPin } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    darkMode, toggleDarkMode, setCommandPaletteOpen, notifications,
    currentOrganization, organizations, switchOrganization, orgSwitcherOpen, setOrgSwitcherOpen,
    currentWarehouse, warehouses, switchWarehouse, warehouseSwitcherOpen, setWarehouseSwitcherOpen,
    user, setMobileMenuOpen, isMobileView
  } = useStore();

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
      {/* Left: Mobile menu + Search */}
      <div className="flex items-center gap-3 flex-1">
        {isMobileView && (
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* Organization Switcher */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setOrgSwitcherOpen(!orgSwitcherOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">
                {currentOrganization?.name.charAt(0) || 'N'}
              </span>
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-slate-800 leading-tight max-w-[140px] truncate">
                {currentOrganization?.name}
              </p>
              <p className="text-[10px] text-slate-400 leading-tight capitalize">
                {currentOrganization?.status === 'trial' ? 'Trial' : currentOrganization?.status}
              </p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {orgSwitcherOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setOrgSwitcherOpen(false)} />
              <div className="absolute left-0 top-full mt-1 w-72 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-50">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-3 py-2">Your Organizations</p>
                {organizations.map((org) => (
                  <button
                    key={org.id}
                    onClick={() => switchOrganization(org.id)}
                    className={`w-full text-left px-3 py-2.5 hover:bg-slate-50 transition-colors flex items-center gap-3 ${
                      currentOrganization?.id === org.id ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-white">{org.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">{org.name}</p>
                      <p className="text-[10px] text-slate-500">{org.industry} • {org.country}</p>
                    </div>
                    {currentOrganization?.id === org.id && (
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    )}
                  </button>
                ))}
                <div className="border-t border-slate-100 mt-1 pt-1">
                  <button className="w-full text-left px-3 py-2 text-xs text-blue-600 font-medium hover:bg-slate-50">
                    + Create new organization
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Warehouse Switcher */}
        <div className="relative hidden lg:block">
          <button
            onClick={() => setWarehouseSwitcherOpen(!warehouseSwitcherOpen)}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs font-medium text-slate-700 max-w-[160px] truncate">
              {currentWarehouse?.name || 'Select Warehouse'}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {warehouseSwitcherOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setWarehouseSwitcherOpen(false)} />
              <div className="absolute left-0 top-full mt-1 w-72 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-50">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-3 py-2">Warehouses</p>
                {warehouses.map((wh) => (
                  <button
                    key={wh.id}
                    onClick={() => switchWarehouse(wh.id)}
                    className={`w-full text-left px-3 py-2.5 hover:bg-slate-50 transition-colors ${
                      currentWarehouse?.id === wh.id ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${wh.status === 'active' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-slate-800 truncate">{wh.name}</p>
                        <p className="text-[10px] text-slate-500">{wh.city}, {wh.country}</p>
                      </div>
                      {currentWarehouse?.id === wh.id && (
                        <span className="text-[10px] font-medium text-blue-600">Active</span>
                      )}
                    </div>
                  </button>
                ))}
                <div className="border-t border-slate-100 mt-1 pt-1">
                  <button className="w-full text-left px-3 py-2 text-xs text-blue-600 font-medium hover:bg-slate-50">
                    + Add warehouse
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-md ml-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-12 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all"
            onFocus={() => setCommandPaletteOpen(true)}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:block">
            <kbd className="px-1.5 py-0.5 text-[10px] font-medium text-slate-400 bg-white border border-slate-200 rounded">⌘K</kbd>
          </div>
        </div>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-2 ml-4">
        {/* Trial banner */}
        {currentOrganization?.status === 'trial' && (
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-50 border border-amber-200 rounded-lg">
            <span className="text-[10px] font-medium text-amber-700">11 days left in trial</span>
          </div>
        )}

        {/* Live indicator */}
        <div className="hidden md:flex items-center gap-1.5 px-2 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-medium text-emerald-700">Live</span>
        </div>

        {/* Dark mode */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
        >
          <Moon className="w-4 h-4" />
        </button>

        {/* Command palette */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="hidden md:flex p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
        >
          <Keyboard className="w-4 h-4" />
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors">
          <Bell className="w-4 h-4" />
          {notifications > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {notifications}
            </span>
          )}
        </button>

        {/* Help */}
        <button className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors hidden md:block">
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200 ml-1">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <span className="text-xs font-semibold text-white">
              {user?.name.split(' ').map(n => n[0]).join('') || 'U'}
            </span>
          </div>
          <div className="hidden lg:block">
            <p className="text-xs font-semibold text-slate-800 leading-tight">{user?.name}</p>
            <p className="text-[10px] text-slate-400 leading-tight capitalize">{useStore.getState().userRole.replace('_', ' ')}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
