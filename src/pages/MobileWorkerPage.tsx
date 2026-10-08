import React, { useState } from 'react';
import { Scan, Check, X, AlertTriangle, MapPin, Package, ArrowRight, Camera } from 'lucide-react';

export const MobileWorkerPage: React.FC = () => {
  const [mode, setMode] = useState<'home' | 'pick' | 'receive' | 'scan'>('home');
  const [scanned, setScanned] = useState(18);
  const required = 24;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500">Northstar Logistics</p>
            <p className="text-sm font-semibold text-slate-900">Worker Mode</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">SW</span>
            </div>
          </div>
        </div>
      </div>

      {mode === 'home' && (
        <div className="p-4 space-y-4">
          {/* Greeting */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
            <p className="text-xs text-blue-100">Good morning</p>
            <p className="text-lg font-bold mt-1">Sneha Patel</p>
            <p className="text-xs text-blue-100 mt-2">You have 3 active tasks today</p>
          </div>

          {/* Quick Actions */}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Quick Actions</p>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setMode('pick')} className="bg-white rounded-2xl border border-slate-200 p-4 text-left hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
                  <Scan className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-sm font-semibold text-slate-800">Pick Items</p>
                <p className="text-[10px] text-slate-500 mt-0.5">3 tasks pending</p>
              </button>
              <button onClick={() => setMode('receive')} className="bg-white rounded-2xl border border-slate-200 p-4 text-left hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-3">
                  <Package className="w-5 h-5 text-emerald-600" />
                </div>
                <p className="text-sm font-semibold text-slate-800">Receive</p>
                <p className="text-[10px] text-slate-500 mt-0.5">2 shipments</p>
              </button>
              <button onClick={() => setMode('scan')} className="bg-white rounded-2xl border border-slate-200 p-4 text-left hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center mb-3">
                  <Camera className="w-5 h-5 text-purple-600" />
                </div>
                <p className="text-sm font-semibold text-slate-800">Scan Barcode</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Quick lookup</p>
              </button>
              <button className="bg-white rounded-2xl border border-slate-200 p-4 text-left hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mb-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
                <p className="text-sm font-semibold text-slate-800">Report Issue</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Damage/Exception</p>
              </button>
            </div>
          </div>

          {/* Active Tasks */}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Active Tasks</p>
            <div className="space-y-3">
              {[
                { id: 'PK-88122', order: 'SO-55431', zone: 'A-04', items: 14, progress: 8, status: 'Picking' },
                { id: 'PK-88124', order: 'SO-55434', zone: 'C-01', items: 6, progress: 3, status: 'Picking' },
                { id: 'RC-44201', order: 'PO-33201', zone: 'Receiving', items: 500, progress: 120, status: 'Receiving' },
              ].map((task, i) => (
                <button key={i} onClick={() => setMode('pick')} className="w-full bg-white rounded-2xl border border-slate-200 p-4 text-left hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-semibold text-slate-800">{task.id}</span>
                    <span className="text-[10px] font-medium px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full">{task.status}</span>
                  </div>
                  <p className="text-[10px] text-slate-500">Order: {task.order} • Zone: {task.zone}</p>
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-slate-500">Progress</span>
                      <span className="text-[10px] font-medium text-slate-700">{task.progress}/{task.items}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(task.progress / task.items) * 100}%` }} />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {mode === 'pick' && (
        <div className="p-4 space-y-4">
          {/* Task Header */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-semibold text-slate-800">PK-88122</span>
              <button onClick={() => setMode('home')} className="text-xs text-slate-500">← Back</button>
            </div>
            <p className="text-sm font-semibold text-slate-800">Pick Task</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs text-slate-600">A-04-12</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs text-slate-600">LED Panel 60x60</span>
              </div>
            </div>
          </div>

          {/* Pick Item */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="text-center mb-4">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Current Item</p>
              <p className="text-lg font-bold text-slate-900">LED Panel 60x60</p>
              <p className="text-xs font-mono text-slate-500 mt-1">SKU: LED-60X60</p>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center p-3 bg-blue-50 rounded-xl">
                <p className="text-lg font-bold text-blue-700">{required}</p>
                <p className="text-[10px] text-blue-600">Required</p>
              </div>
              <div className="text-center p-3 bg-emerald-50 rounded-xl">
                <p className="text-lg font-bold text-emerald-700">{scanned}</p>
                <p className="text-[10px] text-emerald-600">Scanned</p>
              </div>
              <div className="text-center p-3 bg-amber-50 rounded-xl">
                <p className="text-lg font-bold text-amber-700">{required - scanned}</p>
                <p className="text-[10px] text-amber-600">Remaining</p>
              </div>
            </div>

            {/* Scan Button */}
            <button
              onClick={() => setScanned(s => Math.min(s + 1, required))}
              className="w-full py-4 bg-blue-600 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-[0.98] transition-all"
            >
              <Scan className="w-5 h-5" />
              SCAN BARCODE
            </button>

            <div className="grid grid-cols-2 gap-3 mt-3">
              <button className="py-3 bg-slate-100 text-slate-700 rounded-xl text-xs font-medium">
                Manual Entry
              </button>
              <button className="py-3 bg-red-50 text-red-700 rounded-xl text-xs font-medium">
                Report Issue
              </button>
            </div>
          </div>

          {/* Confirm */}
          {scanned >= required && (
            <button className="w-full py-4 bg-emerald-600 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
              <Check className="w-5 h-5" />
              CONFIRM PICK COMPLETE
            </button>
          )}
        </div>
      )}

      {mode === 'receive' && (
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Receiving</h2>
            <button onClick={() => setMode('home')} className="text-xs text-slate-500">← Back</button>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <p className="text-xs font-mono font-semibold text-slate-800">PO-33201</p>
            <p className="text-sm text-slate-600 mt-1">BrightLight Corp</p>
            <p className="text-xs text-slate-500 mt-2">Expected: 500 units of LED Panel 60x60</p>
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-slate-500">Received</span>
                <span className="text-[10px] font-medium text-slate-700">120/500</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '24%' }} />
              </div>
            </div>
            <button className="w-full mt-4 py-3 bg-emerald-600 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
              <Scan className="w-4 h-4" />
              SCAN NEXT ITEM
            </button>
          </div>
        </div>
      )}

      {mode === 'scan' && (
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Scan Barcode</h2>
            <button onClick={() => setMode('home')} className="text-xs text-slate-500">← Back</button>
          </div>
          <div className="bg-slate-900 rounded-2xl aspect-square flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-8 border-2 border-white/50 rounded-xl" />
            <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-blue-400 rounded-tl-lg" />
            <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-blue-400 rounded-tr-lg" />
            <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-blue-400 rounded-bl-lg" />
            <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-blue-400 rounded-br-lg" />
            <Camera className="w-10 h-10 text-white/50" />
            <p className="absolute bottom-12 text-xs text-white/70">Position barcode in frame</p>
          </div>
          <div className="flex items-center gap-3">
            <input type="text" placeholder="Or enter barcode manually..." className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm" />
            <button className="px-4 py-3 bg-blue-600 text-white rounded-xl text-sm font-medium">Go</button>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2 flex items-center justify-around">
        <button onClick={() => setMode('home')} className="flex flex-col items-center gap-0.5 py-1">
          <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          <span className="text-[9px] font-medium text-blue-600">Home</span>
        </button>
        <button onClick={() => setMode('pick')} className="flex flex-col items-center gap-0.5 py-1">
          <Scan className="w-5 h-5 text-slate-400" />
          <span className="text-[9px] font-medium text-slate-400">Tasks</span>
        </button>
        <button onClick={() => setMode('scan')} className="flex flex-col items-center gap-0.5 py-1">
          <Camera className="w-5 h-5 text-slate-400" />
          <span className="text-[9px] font-medium text-slate-400">Scan</span>
        </button>
        <button className="flex flex-col items-center gap-0.5 py-1">
          <Package className="w-5 h-5 text-slate-400" />
          <span className="text-[9px] font-medium text-slate-400">More</span>
        </button>
      </div>
    </div>
  );
};
