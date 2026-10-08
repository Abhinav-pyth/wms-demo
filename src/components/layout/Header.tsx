import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Search, Bell, HelpCircle, ChevronDown, Sun, Moon, Keyboard } from 'lucide-react';

export const Header: React.FC = () => {
  const { darkMode, toggleDarkMode, selectedWarehouse, setSelectedWarehouse, setCommandPaletteOpen, notifications } = useStore();
  const [warehouseDropdown, setWarehouseDropdown] = useState(false);

  const warehouseOptions = [
    'Northgate Distribution Center',
    'Southgate DC',
    'Westgate Warehouse',
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Left: Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search products, orders, shipments, trucks..."
            className="w-full pl-10 pr-12 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all"
            onFocus={() => setCommandPaletteOpen(true)}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <kbd className="px-1.5 py-0.5 text-[10px] font-medium text-slate-400 bg-white border border-slate-200 rounded">⌘K</kbd>
          </div>
        </div>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-3 ml-6">
        {/* Warehouse Selector */}
        <div className="relative">
          <button
            onClick={() => setWarehouseDropdown(!warehouseDropdown)}
            className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="hidden md:inline max-w-[180px] truncate font-medium">{selectedWarehouse}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
          {warehouseDropdown && (
            <div className="absolute right-0 top-full mt-1 w-64 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-50">
              {warehouseOptions.map((wh) => (
                <button
                  key={wh}
                  onClick={() => { setSelectedWarehouse(wh); setWarehouseDropdown(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors ${
                    selectedWarehouse === wh ? 'text-blue-600 font-medium bg-blue-50/50' : 'text-slate-700'
                  }`}
                >
                  {wh}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Live indicator */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-medium text-emerald-700">Live</span>
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Command palette shortcut */}
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
        <button className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors">
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <span className="text-xs font-semibold text-white">AC</span>
          </div>
          <div className="hidden lg:block">
            <p className="text-sm font-medium text-slate-800 leading-tight">Alex Chen</p>
            <p className="text-[11px] text-slate-400 leading-tight">Operations Manager</p>
          </div>
        </div>
      </div>
    </header>
  );
};
