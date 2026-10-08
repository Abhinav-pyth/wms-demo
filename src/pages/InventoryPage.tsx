import React, { useState } from 'react';
import { inventoryItems } from '../data/mockData';
import { Search, Filter, Download, Upload, Plus, ChevronDown, ArrowUpDown, Package, Box, AlertTriangle } from 'lucide-react';


export const InventoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState<string>('product.name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const filtered = inventoryItems.filter(item => {
    const matchesSearch = item.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      'in-stock': 'bg-emerald-50 text-emerald-700',
      'low-stock': 'bg-amber-50 text-amber-700',
      'out-of-stock': 'bg-red-50 text-red-700',
      'overstocked': 'bg-blue-50 text-blue-700',
    };
    return (
      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${colors[status] || 'bg-slate-50 text-slate-700'}`}>
        {status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
      </span>
    );
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Inventory</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage stock levels across all warehouses</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
            <Upload className="w-4 h-4" /> Import
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-slate-800">{inventoryItems.length}</p>
              <p className="text-[11px] text-slate-500">Total SKUs</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
              <Box className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-slate-800">{inventoryItems.filter(i => i.status === 'in-stock').length}</p>
              <p className="text-[11px] text-slate-500">In Stock</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-slate-800">{inventoryItems.filter(i => i.status === 'low-stock').length}</p>
              <p className="text-[11px] text-slate-500">Low Stock</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
              <Package className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-slate-800">{inventoryItems.reduce((a, b) => a + b.total, 0).toLocaleString()}</p>
              <p className="text-[11px] text-slate-500">Total Units</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 mb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by SKU or product name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300"
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="all">All Status</option>
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
            <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-100">
              <Filter className="w-4 h-4" /> More Filters <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200">
                <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">
                  <input type="checkbox" className="w-3.5 h-3.5 rounded border-slate-300" />
                </th>
                <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3 cursor-pointer hover:text-slate-700" onClick={() => { setSortField('product.sku'); setSortDir(d => d === 'asc' ? 'desc' : 'asc') }}>
                  <div className="flex items-center gap-1">SKU <ArrowUpDown className="w-3 h-3" /></div>
                </th>
                <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Product</th>
                <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Category</th>
                <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Warehouse</th>
                <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Location</th>
                <th className="text-right text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Available</th>
                <th className="text-right text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Reserved</th>
                <th className="text-right text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Total</th>
                <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-3"><input type="checkbox" className="w-3.5 h-3.5 rounded border-slate-300" /></td>
                  <td className="px-5 py-3"><span className="text-xs font-mono font-medium text-slate-800">{item.product.sku}</span></td>
                  <td className="px-5 py-3"><span className="text-xs text-slate-700">{item.product.name}</span></td>
                  <td className="px-5 py-3"><span className="text-xs text-slate-500">{item.product.category}</span></td>
                  <td className="px-5 py-3"><span className="text-xs text-slate-500">{item.warehouseId.toUpperCase()}</span></td>
                  <td className="px-5 py-3"><span className="text-xs font-mono text-slate-600">{item.location}</span></td>
                  <td className="px-5 py-3 text-right"><span className="text-xs font-medium text-slate-800">{item.available.toLocaleString()}</span></td>
                  <td className="px-5 py-3 text-right"><span className="text-xs text-slate-500">{item.reserved.toLocaleString()}</span></td>
                  <td className="px-5 py-3 text-right"><span className="text-xs font-semibold text-slate-800">{item.total.toLocaleString()}</span></td>
                  <td className="px-5 py-3">{statusBadge(item.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 bg-slate-50/50">
          <p className="text-xs text-slate-500">Showing {filtered.length} of {inventoryItems.length} items</p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">Previous</button>
            <button className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-lg">1</button>
            <button className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">2</button>
            <button className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};
