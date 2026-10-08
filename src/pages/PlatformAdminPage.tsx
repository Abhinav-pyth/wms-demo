import React from 'react';
import { Building2, Users, DollarSign, TrendingUp, Activity, Server, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const platformKPIs = [
  { label: 'Total Organizations', value: '1,284', trend: '+124', icon: Building2, color: 'bg-blue-50 text-blue-600' },
  { label: 'Active Organizations', value: '1,172', trend: '+98', icon: Activity, color: 'bg-emerald-50 text-emerald-600' },
  { label: 'MRR', value: '₹48.2L', trend: '+₹3.1L', icon: DollarSign, color: 'bg-purple-50 text-purple-600' },
  { label: 'Active Users', value: '18,492', trend: '+1,204', icon: Users, color: 'bg-amber-50 text-amber-600' },
  { label: 'Warehouses', value: '3,821', trend: '+214', icon: Building2, color: 'bg-rose-50 text-rose-600' },
  { label: 'Shipments Today', value: '126,442', trend: '+8.4%', icon: TrendingUp, color: 'bg-indigo-50 text-indigo-600' },
];

const revenueData = [
  { month: 'Apr', mrr: 32.5 }, { month: 'May', mrr: 35.2 }, { month: 'Jun', mrr: 38.1 },
  { month: 'Jul', mrr: 41.0 }, { month: 'Aug', mrr: 44.3 }, { month: 'Sep', mrr: 46.8 },
  { month: 'Oct', mrr: 48.2 },
];

const orgGrowthData = [
  { month: 'Apr', new: 82, churned: 12 }, { month: 'May', new: 95, churned: 14 },
  { month: 'Jun', new: 110, churned: 18 }, { month: 'Jul', new: 124, churned: 15 },
  { month: 'Aug', new: 142, churned: 19 }, { month: 'Sep', new: 158, churned: 22 },
  { month: 'Oct', new: 124, churned: 16 },
];

const planDistribution = [
  { name: 'Starter', value: 482, color: '#3b82f6' },
  { name: 'Growth', value: 512, color: '#10b981' },
  { name: 'Pro', value: 234, color: '#8b5cf6' },
  { name: 'Enterprise', value: 56, color: '#f59e0b' },
];

const topOrgs = [
  { name: 'Northstar Logistics', plan: 'Pro', mrr: '₹19,999', users: 45, warehouses: 3 },
  { name: 'Acme Retail India', plan: 'Growth', mrr: '₹7,999', users: 18, warehouses: 2 },
  { name: 'MegaCorp Distribution', plan: 'Enterprise', mrr: '₹49,999', users: 120, warehouses: 8 },
  { name: 'SwiftShip Express', plan: 'Pro', mrr: '₹19,999', users: 32, warehouses: 4 },
  { name: 'Global Warehousing', plan: 'Growth', mrr: '₹7,999', users: 15, warehouses: 1 },
];

export const PlatformAdminPage: React.FC = () => {
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Platform Admin</h1>
            <span className="px-2 py-0.5 text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-200 rounded-full">SUPER ADMIN</span>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">Monitor platform health, revenue, and usage</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {platformKPIs.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${kpi.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              <p className="text-lg font-bold text-slate-800">{kpi.value}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">{kpi.label}</p>
              <p className="text-[10px] font-medium text-emerald-600 mt-1">{kpi.trend} this month</p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Monthly Recurring Revenue (₹ Lakhs)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
              <Area type="monotone" dataKey="mrr" stroke="#8b5cf6" strokeWidth={2} fill="url(#mrrGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Organization Growth</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={orgGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
              <Bar dataKey="new" fill="#3b82f6" radius={[4, 4, 0, 0]} name="New" />
              <Bar dataKey="churned" fill="#ef4444" radius={[4, 4, 0, 0]} name="Churned" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Plan Distribution */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Plan Distribution</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie data={planDistribution} dataKey="value" cx="50%" cy="50%" outerRadius={70} innerRadius={45} paddingAngle={3}>
                  {planDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {planDistribution.map((plan, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: plan.color }} />
                <span className="text-xs text-slate-600">{plan.name}</span>
                <span className="text-xs font-semibold text-slate-800 ml-auto">{plan.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Organizations */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 lg:col-span-2">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Top Organizations by Revenue</h3>
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider pb-2">Organization</th>
                <th className="text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider pb-2">Plan</th>
                <th className="text-right text-[10px] font-semibold text-slate-500 uppercase tracking-wider pb-2">MRR</th>
                <th className="text-right text-[10px] font-semibold text-slate-500 uppercase tracking-wider pb-2">Users</th>
                <th className="text-right text-[10px] font-semibold text-slate-500 uppercase tracking-wider pb-2">Warehouses</th>
              </tr>
            </thead>
            <tbody>
              {topOrgs.map((org, i) => (
                <tr key={i} className="border-b border-slate-50 last:border-0">
                  <td className="py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <span className="text-[9px] font-bold text-white">{org.name.charAt(0)}</span>
                      </div>
                      <span className="text-xs font-medium text-slate-800">{org.name}</span>
                    </div>
                  </td>
                  <td className="py-2.5">
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">{org.plan}</span>
                  </td>
                  <td className="py-2.5 text-right text-xs font-semibold text-slate-800">{org.mrr}</td>
                  <td className="py-2.5 text-right text-xs text-slate-600">{org.users}</td>
                  <td className="py-2.5 text-right text-xs text-slate-600">{org.warehouses}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
