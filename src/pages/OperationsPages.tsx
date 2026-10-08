import React, { useState } from 'react';
import { orders, shipments, forklifts, workers, alerts as alertsData } from '../data/mockData';
import {
  ArrowDownToLine, ArrowUpFromLine, ScanLine, PackageCheck, Send,
  CheckCircle2, Clock, AlertCircle, Truck, Box, ChevronRight,
  Plus, Filter, Search, User, Battery, MapPin, MoreVertical
} from 'lucide-react';

// Receiving Page
export const ReceivingPage: React.FC = () => {
  const stats = [
    { label: 'Expected Today', value: 12, icon: <ArrowDownToLine className="w-5 h-5 text-blue-600" />, bg: 'bg-blue-50' },
    { label: 'Received', value: 7, icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />, bg: 'bg-emerald-50' },
    { label: 'Pending', value: 5, icon: <Clock className="w-5 h-5 text-amber-600" />, bg: 'bg-amber-50' },
    { label: 'Damaged', value: 2, icon: <AlertCircle className="w-5 h-5 text-red-600" />, bg: 'bg-red-50' },
  ];

  const workflow = ['Purchase Order', 'Truck Arrival', 'Dock Assignment', 'Unload', 'Inspection', 'Verification', 'Putaway'];

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Receiving</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage inbound shipments and receiving workflow</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" /> New Receiving Order
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>{stat.icon}</div>
              <div>
                <p className="text-lg font-bold text-slate-800">{stat.value}</p>
                <p className="text-[11px] text-slate-500">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Workflow */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 mb-6">
        <h3 className="text-sm font-semibold text-slate-800 mb-4">Receiving Workflow</h3>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {workflow.map((step, i) => (
            <React.Fragment key={i}>
              <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border ${
                i < 4 ? 'bg-emerald-50 border-emerald-200' : i === 4 ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  i < 4 ? 'bg-emerald-500 text-white' : i === 4 ? 'bg-blue-500 text-white' : 'bg-slate-300 text-white'
                }`}>
                  {i < 4 ? '✓' : i + 1}
                </div>
                <span className={`text-xs font-medium whitespace-nowrap ${
                  i < 4 ? 'text-emerald-700' : i === 4 ? 'text-blue-700' : 'text-slate-600'
                }`}>{step}</span>
              </div>
              {i < workflow.length - 1 && <ChevronRight className="w-4 h-4 text-slate-300 flex-shrink-0" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Recent Receiving Orders */}
      <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-800">Recent Receiving Orders</h3>
          <button className="text-xs text-blue-600 font-medium">View All</button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200">
              <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">PO Number</th>
              <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Supplier</th>
              <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Items</th>
              <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Expected</th>
              <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.filter(o => o.type === 'purchase').map((order) => (
              <tr key={order.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                <td className="px-5 py-3 text-xs font-mono font-medium text-slate-800">{order.number}</td>
                <td className="px-5 py-3 text-xs text-slate-600">{order.party}</td>
                <td className="px-5 py-3 text-xs text-slate-600">{order.items}</td>
                <td className="px-5 py-3 text-xs text-slate-500">{order.expectedDate || '-'}</td>
                <td className="px-5 py-3">
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                    order.status === 'received' ? 'bg-emerald-50 text-emerald-700' :
                    order.status === 'in-transit' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'
                  }`}>{order.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Picking Page
export const PickingPage: React.FC = () => {
  const picks = [
    { id: 'PK-88122', order: 'SO-55431', worker: 'James Wilson', zone: 'A-04', items: 14, progress: 8, status: 'picking' },
    { id: 'PK-88123', order: 'SO-55432', worker: 'Robert Kim', zone: 'B-02', items: 8, progress: 8, status: 'completed' },
    { id: 'PK-88124', order: 'SO-55434', worker: 'Amanda White', zone: 'C-01', items: 6, progress: 3, status: 'picking' },
    { id: 'PK-88125', order: 'SO-55435', worker: 'Unassigned', zone: 'D-03', items: 3, progress: 0, status: 'pending' },
  ];

  const statusColors: Record<string, string> = {
    pending: 'bg-slate-100 text-slate-700',
    picking: 'bg-blue-50 text-blue-700',
    completed: 'bg-emerald-50 text-emerald-700',
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Picking</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage pick tasks and optimize routes</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-blue-600 rounded-xl hover:bg-blue-700">
          <Plus className="w-4 h-4" /> Create Pick Task
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center"><Clock className="w-5 h-5 text-amber-600" /></div>
            <div><p className="text-lg font-bold text-slate-800">{picks.filter(p => p.status === 'pending').length}</p><p className="text-[11px] text-slate-500">Pending Picks</p></div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center"><ScanLine className="w-5 h-5 text-blue-600" /></div>
            <div><p className="text-lg font-bold text-slate-800">{picks.filter(p => p.status === 'picking').length}</p><p className="text-[11px] text-slate-500">Active Picks</p></div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-emerald-600" /></div>
            <div><p className="text-lg font-bold text-slate-800">{picks.filter(p => p.status === 'completed').length}</p><p className="text-[11px] text-slate-500">Completed</p></div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {picks.map((pick) => (
          <div key={pick.id} className="bg-white rounded-2xl border border-slate-200/80 p-5 hover:shadow-sm transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Box className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Pick #{pick.id}</p>
                  <p className="text-xs text-slate-500">Order: {pick.order} • Zone: {pick.zone}</p>
                </div>
              </div>
              <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full ${statusColors[pick.status]}`}>
                {pick.status.charAt(0).toUpperCase() + pick.status.slice(1)}
              </span>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs text-slate-600">{pick.worker}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-slate-500">Progress</span>
                  <span className="text-[10px] font-medium text-slate-700">{pick.progress}/{pick.items}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${(pick.progress / pick.items) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Packing Page
export const PackingPage: React.FC = () => (
  <div className="p-6 max-w-[1600px] mx-auto">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Packing</h1>
        <p className="text-sm text-slate-500 mt-0.5">Pack orders and generate shipping labels</p>
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-5">
        <h3 className="text-sm font-semibold text-slate-800 mb-4">Current Order: SO-55432</h3>
        <div className="space-y-3">
          {[
            { sku: 'LED-60X60', name: 'LED Panel 60x60', qty: 4, packed: true },
            { sku: 'CBL-USB-C', name: 'USB-C Cable 2m', qty: 10, packed: true },
            { sku: 'MSE-WL-01', name: 'Wireless Mouse', qty: 6, packed: false },
            { sku: 'KBD-MECH-01', name: 'Mechanical Keyboard', qty: 2, packed: false },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.packed ? 'bg-emerald-50' : 'bg-slate-50'}`}>
                  {item.packed ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Box className="w-4 h-4 text-slate-400" />}
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-800">{item.name}</p>
                  <p className="text-[10px] text-slate-500">SKU: {item.sku} • Qty: {item.qty}</p>
                </div>
              </div>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${item.packed ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                {item.packed ? 'Packed' : 'Pending'}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-3">
          <button className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700">Mark as Packed</button>
          <button className="px-4 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200">Print Label</button>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5">
        <h3 className="text-sm font-semibold text-slate-800 mb-4">Packing Details</h3>
        <div className="space-y-3">
          <div className="flex justify-between"><span className="text-xs text-slate-500">Packaging</span><span className="text-xs font-medium text-slate-800">Standard Box L</span></div>
          <div className="flex justify-between"><span className="text-xs text-slate-500">Weight</span><span className="text-xs font-medium text-slate-800">12.4 kg</span></div>
          <div className="flex justify-between"><span className="text-xs text-slate-500">Dimensions</span><span className="text-xs font-medium text-slate-800">60×40×35 cm</span></div>
          <div className="flex justify-between"><span className="text-xs text-slate-500">Carrier</span><span className="text-xs font-medium text-slate-800">FedEx Ground</span></div>
          <div className="flex justify-between"><span className="text-xs text-slate-500">Tracking</span><span className="text-xs font-medium text-blue-600">FX-7844521</span></div>
        </div>
        <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200">
          <p className="text-[10px] font-semibold text-slate-500 mb-1">PACKING SLIP</p>
          <p className="text-xs text-slate-700">TechStore Inc<br />456 Commerce Blvd<br />Austin, TX 78701</p>
        </div>
      </div>
    </div>
  </div>
);

// Shipping Page
export const ShippingPage: React.FC = () => {
  const statusCounts = { ready: 8, transit: 12, delivered: 45, delayed: 2, returned: 1 };

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Shipping</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage outbound shipments and carriers</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-blue-600 rounded-xl hover:bg-blue-700">
          <Plus className="w-4 h-4" /> Create Shipment
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
        {Object.entries(statusCounts).map(([status, count]) => (
          <div key={status} className="bg-white rounded-xl border border-slate-200 p-4 text-center">
            <p className="text-xl font-bold text-slate-800">{count}</p>
            <p className="text-[11px] text-slate-500 capitalize">{status === 'transit' ? 'In Transit' : status}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-800">Active Shipments</h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input className="pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="Search..." />
            </div>
            <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg"><Filter className="w-3 h-3" /> Filter</button>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200">
              <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Shipment</th>
              <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Route</th>
              <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Truck</th>
              <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Items</th>
              <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">ETA</th>
              <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((s) => (
              <tr key={s.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                <td className="px-5 py-3 text-xs font-mono font-medium text-slate-800">{s.number}</td>
                <td className="px-5 py-3 text-xs text-slate-600">{s.route}</td>
                <td className="px-5 py-3 text-xs text-slate-600">{s.truckId}</td>
                <td className="px-5 py-3 text-xs text-slate-600">{s.items}</td>
                <td className="px-5 py-3 text-xs text-slate-600">{s.eta}</td>
                <td className="px-5 py-3">
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                    s.status === 'delivered' ? 'bg-emerald-50 text-emerald-700' :
                    s.status === 'delayed' ? 'bg-red-50 text-red-700' :
                    s.status === 'in-transit' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'
                  }`}>{s.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Forklifts Page
export const ForkliftsPage: React.FC = () => (
  <div className="p-6 max-w-[1600px] mx-auto">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Forklifts</h1>
        <p className="text-sm text-slate-500 mt-0.5">Monitor forklift fleet status and operations</p>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {forklifts.map((fl) => (
        <div key={fl.id} className="bg-white rounded-2xl border border-slate-200/80 p-5 hover:shadow-sm transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                fl.status === 'active' ? 'bg-emerald-50' : fl.status === 'charging' ? 'bg-amber-50' : 'bg-slate-50'
              }`}>
                <Truck className={`w-5 h-5 ${fl.status === 'active' ? 'text-emerald-600' : fl.status === 'charging' ? 'text-amber-600' : 'text-slate-500'}`} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">{fl.code}</p>
                <p className="text-[10px] text-slate-500">{fl.zone}</p>
              </div>
            </div>
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
              fl.status === 'active' ? 'bg-emerald-50 text-emerald-700' : fl.status === 'charging' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-600'
            }`}>{fl.status}</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-500 flex items-center gap-1"><User className="w-3 h-3" /> Operator</span>
              <span className="text-xs text-slate-700">{fl.operator}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-500 flex items-center gap-1"><Battery className="w-3 h-3" /> Battery</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${fl.battery > 50 ? 'bg-emerald-500' : fl.battery > 20 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${fl.battery}%` }} />
                </div>
                <span className="text-[10px] font-medium text-slate-700">{fl.battery}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-500 flex items-center gap-1"><MapPin className="w-3 h-3" /> Task</span>
              <span className="text-xs text-slate-700">{fl.currentTask}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Alerts Page
export const AlertsPage: React.FC = () => {
  const alertData = alertsData;
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Alert Center</h1>
          <p className="text-sm text-slate-500 mt-0.5">Monitor and resolve operational alerts</p>
        </div>
      </div>
      <div className="space-y-3">
        {alertData.map((alert: any) => (
          <div key={alert.id} className={`bg-white rounded-2xl border p-5 hover:shadow-sm transition-all ${
            alert.severity === 'critical' ? 'border-red-200' : alert.severity === 'warning' ? 'border-amber-200' : 'border-slate-200'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  alert.severity === 'critical' ? 'bg-red-50' : alert.severity === 'warning' ? 'bg-amber-50' : 'bg-blue-50'
                }`}>
                  <AlertCircle className={`w-5 h-5 ${alert.severity === 'critical' ? 'text-red-500' : alert.severity === 'warning' ? 'text-amber-500' : 'text-blue-500'}`} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{alert.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{alert.description}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{alert.timestamp}</p>
                </div>
              </div>
              <button className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                {alert.action}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
