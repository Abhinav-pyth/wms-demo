import React from 'react';
import { WarehouseViewer3D } from '../components/warehouse/Warehouse3D';
import { kpiData, shipments, trucks, inventoryItems, alerts } from '../data/mockData';
import {
  Package, Truck, Clock, ClipboardList, Building,
  TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle,
  ArrowRight, MoreHorizontal, Box, Loader
} from 'lucide-react';

// Sparkline Component
const Sparkline: React.FC<{ data: number[]; color?: string }> = ({ data, color = '#3b82f6' }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 80;
  const height = 28;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * height}`).join(' ');

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline fill="none" stroke={color} strokeWidth="1.5" points={points} />
      <circle cx={(data.length - 1) / (data.length - 1) * width} cy={height - ((data[data.length - 1] - min) / range) * height} r="2.5" fill={color} />
    </svg>
  );
};

// KPI Card
const KPICard: React.FC<{ data: typeof kpiData[0]; index: number }> = ({ data, index }) => {
  const icons: Record<string, React.ReactNode> = {
    package: <Package className="w-5 h-5" />,
    truck: <Truck className="w-5 h-5" />,
    clock: <Clock className="w-5 h-5" />,
    clipboard: <ClipboardList className="w-5 h-5" />,
    warehouse: <Building className="w-5 h-5" />,
  };

  const colors = ['bg-blue-50 text-blue-600', 'bg-emerald-50 text-emerald-600', 'bg-purple-50 text-purple-600', 'bg-amber-50 text-amber-600', 'bg-rose-50 text-rose-600'];
  const sparkColors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'];

  return (
    <div
      className="bg-white rounded-2xl border border-slate-200/80 p-5 hover:shadow-md hover:border-slate-300 transition-all duration-200 animate-slide-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors[index]}`}>
          {icons[data.icon]}
        </div>
        <Sparkline data={data.sparkline} color={sparkColors[index]} />
      </div>
      <div className="mt-2">
        <p className="text-2xl font-bold text-slate-900">{data.value}</p>
        <p className="text-sm text-slate-500 mt-0.5">{data.label}</p>
      </div>
      <div className="flex items-center gap-1.5 mt-2">
        {data.trend > 0 ? (
          <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
        ) : data.trend < 0 ? (
          <TrendingDown className="w-3.5 h-3.5 text-red-500" />
        ) : (
          <Minus className="w-3.5 h-3.5 text-slate-400" />
        )}
        <span className={`text-xs font-medium ${data.trend > 0 ? 'text-emerald-600' : data.trend < 0 ? 'text-red-600' : 'text-slate-500'}`}>
          {data.trendLabel}
        </span>
      </div>
    </div>
  );
};

// Operations Panel
const OperationsPanel: React.FC = () => (
  <div className="bg-white rounded-2xl border border-slate-200/80 p-5 h-full">
    <div className="flex items-center justify-between mb-4">
      <div>
        <h3 className="text-sm font-semibold text-slate-800">Northgate DC</h3>
        <div className="flex items-center gap-1.5 mt-0.5">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-xs text-emerald-600 font-medium">Operational</span>
        </div>
      </div>
      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400">
        <MoreHorizontal className="w-4 h-4" />
      </button>
    </div>

    {/* Quick Stats */}
    <div className="grid grid-cols-2 gap-3 mb-4">
      <div className="bg-slate-50 rounded-xl p-3">
        <p className="text-lg font-bold text-slate-800">3,310</p>
        <p className="text-[11px] text-slate-500">Stock on hand</p>
      </div>
      <div className="bg-slate-50 rounded-xl p-3">
        <p className="text-lg font-bold text-slate-800">4/4</p>
        <p className="text-[11px] text-slate-500">Dock activity</p>
      </div>
      <div className="bg-slate-50 rounded-xl p-3">
        <p className="text-lg font-bold text-slate-800">21</p>
        <p className="text-[11px] text-slate-500">Outbound today</p>
      </div>
      <div className="bg-slate-50 rounded-xl p-3">
        <p className="text-lg font-bold text-slate-800">4</p>
        <p className="text-[11px] text-slate-500">Forklifts active</p>
      </div>
    </div>

    {/* Dock Status */}
    <div className="mb-4">
      <p className="text-xs font-semibold text-slate-500 mb-2">DOCK STATUS</p>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-xs text-slate-700">Dock 1 - Unloading</span>
          </div>
          <span className="text-[10px] text-slate-500">TRK-2104</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-xs text-slate-700">Dock 2 - Loading</span>
          </div>
          <span className="text-[10px] text-slate-500">TRK-2127</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-xs text-slate-700">Dock 3 - Loading</span>
          </div>
          <span className="text-[10px] text-slate-500">TRK-3245</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs text-slate-700">Dock 4 - Staged</span>
          </div>
          <span className="text-[10px] text-slate-500">TRK-2890</span>
        </div>
      </div>
    </div>

    {/* Inventory Alerts */}
    <div>
      <p className="text-xs font-semibold text-slate-500 mb-2">INVENTORY ALERTS</p>
      <div className="space-y-2">
        {inventoryItems.filter(i => i.status === 'low-stock').slice(0, 4).map((item) => (
          <div key={item.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
              <Box className="w-4 h-4 text-amber-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-slate-800 truncate">{item.product.name}</p>
              <p className="text-[10px] text-slate-500">{item.total} units</p>
            </div>
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">Low</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Shipment Timeline
const ShipmentTracking: React.FC = () => {
  const shipment = shipments[0];
  const progress = (shipment.timeline.filter(t => t.completed).length / shipment.timeline.length) * 100;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
            <Truck className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-800">Shipment #{shipment.number}</h3>
            <p className="text-xs text-slate-500">Truck: {shipment.truckId} • Route: {shipment.route}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-slate-800">ETA: {shipment.eta}</p>
          <p className="text-[10px] text-slate-500">{shipment.items} items • {shipment.weight}kg</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute top-3 left-0 right-0 h-0.5 bg-slate-200 rounded-full" />
        <div className="absolute top-3 left-0 h-0.5 bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        <div className="relative flex justify-between">
          {shipment.timeline.map((event, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                event.completed ? 'bg-blue-500 border-blue-500' : 'bg-white border-slate-300'
              }`}>
                {event.completed && <CheckCircle className="w-3.5 h-3.5 text-white" />}
              </div>
              <p className="text-[10px] font-medium text-slate-700 mt-1.5">{event.label}</p>
              <p className="text-[10px] text-slate-400">{event.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Truck Fleet Table
const TruckFleet: React.FC = () => {
  const statusColors: Record<string, string> = {
    loading: 'bg-amber-50 text-amber-700',
    unloading: 'bg-blue-50 text-blue-700',
    docking: 'bg-purple-50 text-purple-700',
    'en-route': 'bg-emerald-50 text-emerald-700',
    idle: 'bg-slate-50 text-slate-700',
    maintenance: 'bg-red-50 text-red-700',
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-800">Truck Fleet</h3>
        <button className="text-xs text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
          View all <ArrowRight className="w-3 h-3" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider pb-2">Truck</th>
              <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider pb-2">Driver</th>
              <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider pb-2">Route</th>
              <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider pb-2">Status</th>
              <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider pb-2">ETA</th>
            </tr>
          </thead>
          <tbody>
            {trucks.slice(0, 5).map((truck) => (
              <tr key={truck.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                <td className="py-2.5">
                  <span className="text-xs font-medium text-slate-800">{truck.number}</span>
                </td>
                <td className="py-2.5">
                  <span className="text-xs text-slate-600">{truck.driver}</span>
                </td>
                <td className="py-2.5">
                  <span className="text-xs text-slate-600">{truck.route}</span>
                </td>
                <td className="py-2.5">
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusColors[truck.status] || 'bg-slate-50 text-slate-700'}`}>
                    {truck.status}
                  </span>
                </td>
                <td className="py-2.5">
                  <span className="text-xs text-slate-600">{truck.eta}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Recent Alerts
const RecentAlerts: React.FC = () => {
  const severityColors: Record<string, string> = {
    critical: 'bg-red-50 border-red-200',
    warning: 'bg-amber-50 border-amber-200',
    info: 'bg-blue-50 border-blue-200',
  };
  const severityIcons: Record<string, React.ReactNode> = {
    critical: <AlertTriangle className="w-4 h-4 text-red-500" />,
    warning: <AlertTriangle className="w-4 h-4 text-amber-500" />,
    info: <Loader className="w-4 h-4 text-blue-500" />,
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-800">Recent Alerts</h3>
        <button className="text-xs text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
          View all <ArrowRight className="w-3 h-3" />
        </button>
      </div>
      <div className="space-y-2.5">
        {alerts.slice(0, 4).map((alert) => (
          <div key={alert.id} className={`p-3 rounded-xl border ${severityColors[alert.severity]} transition-all hover:shadow-sm`}>
            <div className="flex items-start gap-2.5">
              <div className="mt-0.5">{severityIcons[alert.severity]}</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-800">{alert.title}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{alert.description}</p>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-[10px] text-slate-400">{alert.timestamp}</span>
                  <button className="text-[10px] font-medium text-blue-600 hover:text-blue-700">{alert.action}</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Dashboard
export const Dashboard: React.FC = () => {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Warehouse Overview</h1>
          <p className="text-sm text-slate-500 mt-0.5">Real-time operational intelligence</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-slate-700">{dateStr}</p>
            <p className="text-xs text-slate-500">{timeStr}</p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {kpiData.map((kpi, i) => (
          <KPICard key={i} data={kpi} index={i} />
        ))}
      </div>

      {/* Main Content: 3D Warehouse + Operations Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-6">
        <div className="xl:col-span-3">
          <WarehouseViewer3D className="h-[480px]" />
        </div>
        <div className="xl:col-span-1">
          <OperationsPanel />
        </div>
      </div>

      {/* Shipment Tracking */}
      <div className="mb-6">
        <ShipmentTracking />
      </div>

      {/* Bottom Grid: Trucks + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TruckFleet />
        <RecentAlerts />
      </div>
    </div>
  );
};
