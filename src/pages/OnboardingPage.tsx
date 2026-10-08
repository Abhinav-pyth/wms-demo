import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Building2, MapPin, Users, Package, Check, ArrowRight, ArrowLeft } from 'lucide-react';

const steps = [
  { id: 1, label: 'Company', icon: Building2 },
  { id: 2, label: 'Warehouse', icon: MapPin },
  { id: 3, label: 'Team', icon: Users },
  { id: 4, label: 'Products', icon: Package },
  { id: 5, label: 'Complete', icon: Check },
];

export const OnboardingPage: React.FC = () => {
  const { setCurrentPage } = useStore();
  const [currentStep, setCurrentStep] = useState(1);

  const handleComplete = () => {
    setCurrentPage('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-slate-900">StockFlow AI</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Set up your warehouse</h1>
          <p className="text-sm text-slate-500 mt-1">Let's get you started in just a few minutes</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            return (
              <React.Fragment key={step.id}>
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-50 border border-blue-200' : isCompleted ? 'bg-emerald-50' : 'bg-white border border-slate-200'
                }`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isActive ? 'bg-blue-600 text-white' : isCompleted ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {isCompleted ? '✓' : step.id}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block ${
                    isActive ? 'text-blue-700' : isCompleted ? 'text-emerald-700' : 'text-slate-500'
                  }`}>{step.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-8 h-0.5 ${isCompleted ? 'bg-emerald-300' : 'bg-slate-200'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-900">Company Information</h2>
              <div>
                <label className="text-xs font-medium text-slate-700 mb-1.5 block">Company Name</label>
                <input type="text" defaultValue="Northstar Logistics Pvt Ltd" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-700 mb-1.5 block">Industry</label>
                  <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
                    <option>Logistics</option>
                    <option>Retail</option>
                    <option>Distribution</option>
                    <option>Manufacturing</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700 mb-1.5 block">Country</label>
                  <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
                    <option>India</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-700 mb-1.5 block">Timezone</label>
                  <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
                    <option>Asia/Kolkata (IST)</option>
                    <option>America/New_York (EST)</option>
                    <option>Europe/London (GMT)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700 mb-1.5 block">Currency</label>
                  <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
                    <option>INR (₹)</option>
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-900">Create Your First Warehouse</h2>
              <div>
                <label className="text-xs font-medium text-slate-700 mb-1.5 block">Warehouse Name</label>
                <input type="text" defaultValue="Indore Distribution Center" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-700 mb-1.5 block">Address</label>
                <input type="text" defaultValue="Plot 45, Pithampur Industrial Area" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-700 mb-1.5 block">City</label>
                  <input type="text" defaultValue="Indore" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700 mb-1.5 block">State</label>
                  <input type="text" defaultValue="Madhya Pradesh" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700 mb-1.5 block">Capacity</label>
                  <input type="number" defaultValue="50000" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-900">Invite Your Team</h2>
              <p className="text-sm text-slate-500">Add team members to get started. You can invite more later.</p>
              <div className="space-y-3">
                {[
                  { email: 'priya@northstar.io', role: 'Admin' },
                  { email: 'rahul@northstar.io', role: 'Supervisor' },
                ].map((member, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <input type="email" defaultValue={member.email} className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
                    <select defaultValue={member.role} className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
                      <option>Admin</option>
                      <option>Warehouse Manager</option>
                      <option>Supervisor</option>
                      <option>Picker</option>
                      <option>Viewer</option>
                    </select>
                  </div>
                ))}
                <button className="w-full py-2.5 border border-dashed border-slate-300 rounded-xl text-sm text-slate-500 hover:bg-slate-50">
                  + Add another team member
                </button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-900">Import Products</h2>
              <p className="text-sm text-slate-500">Upload your product catalog via CSV or add products manually.</p>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center">
                <Package className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <p className="text-sm font-medium text-slate-700">Drop your CSV file here</p>
                <p className="text-xs text-slate-500 mt-1">or click to browse</p>
                <button className="mt-4 px-4 py-2 bg-slate-900 text-white text-xs font-medium rounded-lg">Upload CSV</button>
              </div>
              <div className="text-center">
                <button className="text-sm text-blue-600 font-medium hover:text-blue-700">Or add products manually →</button>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Your warehouse is ready!</h2>
              <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
                Welcome to StockFlow AI. Your warehouse has been configured and you're ready to start managing operations.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4 max-w-md mx-auto">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-lg font-bold text-slate-800">1</p>
                  <p className="text-[10px] text-slate-500">Warehouse</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-lg font-bold text-slate-800">2</p>
                  <p className="text-[10px] text-slate-500">Team Members</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-lg font-bold text-slate-800">Pro</p>
                  <p className="text-[10px] text-slate-500">Plan</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
            {currentStep > 1 ? (
              <button onClick={() => setCurrentStep(s => s - 1)} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : <div />}
            {currentStep < 5 ? (
              <button onClick={() => setCurrentStep(s => s + 1)} className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800">
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={handleComplete} className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700">
                Go to Dashboard <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
