import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Building2, Users, CreditCard, Bell, Shield, Key, Webhook, FileText, Check, Zap, ArrowRight } from 'lucide-react';

const tabs = [
  { id: 'profile', label: 'Company Profile', icon: Building2 },
  { id: 'warehouses', label: 'Warehouses', icon: Building2 },
  { id: 'users', label: 'Users & Roles', icon: Users },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'api', label: 'API Keys', icon: Key },
  { id: 'webhooks', label: 'Webhooks', icon: Webhook },
  { id: 'audit', label: 'Audit Logs', icon: FileText },
];

export const SettingsPage: React.FC = () => {
  const { currentOrganization } = useStore();
  const [activeTab, setActiveTab] = useState('billing');

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Settings</h1>
        <p className="text-sm text-slate-500 mt-0.5">Manage your organization settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="bg-white rounded-2xl border border-slate-200/80 p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors mb-0.5 ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 font-medium'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'billing' && <BillingSection />}
          {activeTab === 'profile' && <ProfileSection />}
          {activeTab === 'users' && <UsersSection />}
          {activeTab === 'api' && <ApiSection />}
          {activeTab === 'audit' && <AuditSection />}
          {activeTab !== 'billing' && activeTab !== 'profile' && activeTab !== 'users' && activeTab !== 'api' && activeTab !== 'audit' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-8 text-center">
              <p className="text-sm text-slate-500">Coming soon</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const BillingSection: React.FC = () => {
  const { currentOrganization } = useStore();
  const isTrial = currentOrganization?.status === 'trial';

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-800">Current Plan</h3>
            <p className="text-xs text-slate-500 mt-0.5">Manage your subscription and billing</p>
          </div>
          {isTrial && (
            <span className="px-2.5 py-1 text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200 rounded-full">
              TRIAL • 11 days left
            </span>
          )}
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-blue-100 uppercase tracking-wider">Pro Plan</p>
              <p className="text-3xl font-bold mt-1">₹19,999<span className="text-base font-normal text-blue-200">/month</span></p>
              <p className="text-xs text-blue-100 mt-2">Next billing: November 8, 2026</p>
            </div>
            <div className="text-right">
              <button className="px-4 py-2 bg-white text-blue-700 text-xs font-semibold rounded-lg hover:bg-blue-50 transition-colors">
                Upgrade Plan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Meters */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6">
        <h3 className="text-sm font-semibold text-slate-800 mb-4">Usage This Period</h3>
        <div className="space-y-4">
          {[
            { label: 'Users', used: 12, limit: 100, unit: 'users' },
            { label: 'Warehouses', used: 3, limit: 999, unit: 'warehouses' },
            { label: 'Products', used: 487, limit: 500000, unit: 'SKUs' },
            { label: 'Orders (Monthly)', used: 2340, limit: 999999, unit: 'orders' },
            { label: 'API Requests', used: 12450, limit: 1000000, unit: 'requests' },
            { label: 'AI Requests', used: 342, limit: 50000, unit: 'requests' },
            { label: 'Storage', used: 2.4, limit: 100, unit: 'GB' },
          ].map((item, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-slate-700">{item.label}</span>
                <span className="text-xs text-slate-500">
                  {typeof item.used === 'number' && item.used > 1000 ? item.used.toLocaleString() : item.used} / {item.limit === 999 || item.limit === 999999 || item.limit === 1000000 ? '∞' : item.limit.toLocaleString()} {item.unit}
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all"
                  style={{ width: `${Math.min((item.used / item.limit) * 100, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invoices */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6">
        <h3 className="text-sm font-semibold text-slate-800 mb-4">Recent Invoices</h3>
        <div className="space-y-2">
          {[
            { date: 'Oct 8, 2026', amount: '₹19,999', status: 'Paid', id: 'INV-2026-010' },
            { date: 'Sep 8, 2026', amount: '₹19,999', status: 'Paid', id: 'INV-2026-009' },
            { date: 'Aug 8, 2026', amount: '₹19,999', status: 'Paid', id: 'INV-2026-008' },
          ].map((inv, i) => (
            <div key={i} className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0">
              <div>
                <p className="text-xs font-medium text-slate-800">{inv.id}</p>
                <p className="text-[10px] text-slate-500">{inv.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-800">{inv.amount}</span>
                <span className="px-2 py-0.5 text-[10px] font-medium bg-emerald-50 text-emerald-700 rounded-full">{inv.status}</span>
                <button className="text-xs text-blue-600 font-medium hover:text-blue-700">Download</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProfileSection: React.FC = () => {
  const { currentOrganization } = useStore();
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6">
      <h3 className="text-sm font-semibold text-slate-800 mb-4">Company Profile</h3>
      <div className="space-y-4">
        <div>
          <label className="text-xs font-medium text-slate-600 mb-1.5 block">Company Name</label>
          <input type="text" defaultValue={currentOrganization?.name} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-slate-600 mb-1.5 block">Industry</label>
            <input type="text" defaultValue={currentOrganization?.industry} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600 mb-1.5 block">Country</label>
            <input type="text" defaultValue={currentOrganization?.country} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-slate-600 mb-1.5 block">Timezone</label>
            <input type="text" defaultValue={currentOrganization?.timezone} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600 mb-1.5 block">Currency</label>
            <input type="text" defaultValue={currentOrganization?.currency} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
          </div>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700">Save Changes</button>
      </div>
    </div>
  );
};

const UsersSection: React.FC = () => (
  <div className="bg-white rounded-2xl border border-slate-200/80 p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-semibold text-slate-800">Team Members</h3>
      <button className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700">+ Invite User</button>
    </div>
    <div className="space-y-2">
      {[
        { name: 'Alex Chen', email: 'alex@northstar.io', role: 'Warehouse Manager', status: 'Active' },
        { name: 'Priya Sharma', email: 'priya@northstar.io', role: 'Admin', status: 'Active' },
        { name: 'Rahul Verma', email: 'rahul@northstar.io', role: 'Supervisor', status: 'Active' },
        { name: 'Sneha Patel', email: 'sneha@northstar.io', role: 'Picker', status: 'Active' },
        { name: 'Amit Kumar', email: 'amit@northstar.io', role: 'Driver', status: 'Active' },
      ].map((user, i) => (
        <div key={i} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">{user.name.split(' ').map(n => n[0]).join('')}</span>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-800">{user.name}</p>
              <p className="text-[10px] text-slate-500">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-medium px-2 py-0.5 bg-slate-100 text-slate-700 rounded-full">{user.role}</span>
            <span className="text-[10px] text-emerald-600 font-medium">{user.status}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ApiSection: React.FC = () => (
  <div className="space-y-6">
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">API Keys</h3>
          <p className="text-xs text-slate-500 mt-0.5">Manage API keys for programmatic access</p>
        </div>
        <button className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700">+ Create API Key</button>
      </div>
      <div className="space-y-2">
        {[
          { name: 'Production', prefix: 'sk_live_7f3a', lastUsed: '2 hours ago', created: 'Sep 1, 2026' },
          { name: 'Development', prefix: 'sk_test_9b2c', lastUsed: '1 day ago', created: 'Aug 15, 2026' },
          { name: 'Integration - Shopify', prefix: 'sk_live_4d8e', lastUsed: '5 min ago', created: 'Jul 22, 2026' },
        ].map((key, i) => (
          <div key={i} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
            <div>
              <p className="text-xs font-medium text-slate-800">{key.name}</p>
              <p className="text-[10px] font-mono text-slate-500">{key.prefix}••••••••••••</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-[10px] text-slate-500">Last used</p>
                <p className="text-[10px] font-medium text-slate-700">{key.lastUsed}</p>
              </div>
              <button className="text-xs text-red-600 font-medium hover:text-red-700">Revoke</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const AuditSection: React.FC = () => (
  <div className="bg-white rounded-2xl border border-slate-200/80 p-6">
    <h3 className="text-sm font-semibold text-slate-800 mb-4">Recent Activity</h3>
    <div className="space-y-2">
      {[
        { action: 'INVENTORY_ADJUSTED', user: 'Alex Chen', resource: 'LED Panel 60x60', time: '5 min ago' },
        { action: 'ORDER_CREATED', user: 'Priya Sharma', resource: 'SO-55431', time: '12 min ago' },
        { action: 'SHIPMENT_DISPATCHED', user: 'Rahul Verma', resource: 'SHP-78444', time: '25 min ago' },
        { action: 'USER_INVITED', user: 'Alex Chen', resource: 'sneha@northstar.io', time: '1 hour ago' },
        { action: 'PRODUCT_UPDATED', user: 'Priya Sharma', resource: 'USB-C Cable 2m', time: '2 hours ago' },
        { action: 'WAREHOUSE_CREATED', user: 'Alex Chen', resource: 'Delhi Distribution Hub', time: '1 day ago' },
      ].map((log, i) => (
        <div key={i} className="flex items-center gap-3 py-2.5 border-b border-slate-50 last:border-0">
          <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
            <FileText className="w-4 h-4 text-slate-400" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-slate-800">
              <span className="font-medium">{log.user}</span>{' '}
              <span className="text-slate-500">{log.action.replace(/_/g, ' ').toLowerCase()}</span>{' '}
              <span className="font-mono text-slate-600">{log.resource}</span>
            </p>
            <p className="text-[10px] text-slate-400">{log.time}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
