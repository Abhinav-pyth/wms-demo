import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { WarehouseViewer3D } from '../components/warehouse/Warehouse3D';
import {
  Box, Truck, BarChart3, Zap, Shield, Globe, Check, ArrowRight,
  Sparkles, Building2, Package, Users, Clock, Brain, Layers, Lock
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentPage } = useStore();

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
            </div>
            <span className="text-base font-bold text-slate-900">StockFlow AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-slate-600 hover:text-slate-900">Features</a>
            <a href="#pricing" className="text-sm text-slate-600 hover:text-slate-900">Pricing</a>
            <a href="#faq" className="text-sm text-slate-600 hover:text-slate-900">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setCurrentPage('login')} className="text-sm font-medium text-slate-700 hover:text-slate-900">Sign In</button>
            <button onClick={() => setCurrentPage('dashboard')} className="px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors">
              Start Free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full mb-6">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-xs font-medium text-blue-700">AI-Powered Warehouse Management</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1]">
                Your Warehouse.<br />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">One Intelligent</span><br />
                Command Center.
              </h1>
              <p className="text-lg text-slate-600 mt-6 max-w-xl leading-relaxed">
                Real-time inventory, 3D digital twins, intelligent fulfillment and AI-powered operations — all in one premium platform built for modern logistics.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-3 mt-8">
                <button onClick={() => setCurrentPage('dashboard')} className="px-6 py-3 text-sm font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2 group">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button className="px-6 py-3 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                  Watch Demo
                </button>
              </div>
              <div className="flex items-center gap-6 mt-8 pt-8 border-t border-slate-100">
                <div>
                  <p className="text-2xl font-bold text-slate-900">1,200+</p>
                  <p className="text-xs text-slate-500">Warehouses</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">18K+</p>
                  <p className="text-xs text-slate-500">Active Users</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">99.9%</p>
                  <p className="text-xs text-slate-500">Uptime</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl blur-2xl opacity-50" />
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-2xl">
                <WarehouseViewer3D className="h-[400px]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Everything you need to run a modern warehouse</h2>
            <p className="text-lg text-slate-600 mt-4">From receiving to shipping, StockFlow AI gives you complete visibility and control over your warehouse operations.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Box, title: '3D Digital Twin', desc: 'Visualize your warehouse in real-time with interactive 3D models showing racks, forklifts, and inventory.' },
              { icon: Package, title: 'Inventory Intelligence', desc: 'Track stock levels, movements, and get AI-powered reorder recommendations.' },
              { icon: Zap, title: 'Smart Fulfillment', desc: 'Optimize picking routes, batch orders, and reduce fulfillment time by up to 40%.' },
              { icon: Truck, title: 'Real-Time Logistics', desc: 'Track shipments, trucks, and deliveries with live updates and ETA predictions.' },
              { icon: Brain, title: 'AI Operations', desc: 'Get intelligent recommendations for stock optimization, layout changes, and demand forecasting.' },
              { icon: BarChart3, title: 'Advanced Analytics', desc: 'Deep insights into warehouse performance, KPIs, and operational efficiency.' },
              { icon: Globe, title: 'Multi-Warehouse', desc: 'Manage multiple warehouses from a single platform with organization-level isolation.' },
              { icon: Shield, title: 'Enterprise Security', desc: 'Row-level security, RBAC, audit logs, and SOC 2 compliance built-in.' },
              { icon: Layers, title: 'Integrations', desc: 'Connect with Shopify, Amazon, ERP systems, and shipping carriers seamlessly.' },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md hover:border-slate-300 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Simple, transparent pricing</h2>
            <p className="text-lg text-slate-600 mt-4">Start free, scale as you grow. No hidden fees.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Starter', price: '2,999', desc: 'For small warehouses', features: ['1 warehouse', '5 users', '5,000 products', 'Basic analytics', 'Email support'], popular: false },
              { name: 'Growth', price: '7,999', desc: 'For growing operations', features: ['5 warehouses', '25 users', '50,000 products', 'Advanced analytics', 'AI assistant', 'Priority support'], popular: true },
              { name: 'Pro', price: '19,999', desc: 'For large operations', features: ['Unlimited warehouses', '100 users', '500,000 products', 'Advanced AI', 'API access', 'Dedicated support'], popular: false },
              { name: 'Enterprise', price: 'Custom', desc: 'For global operations', features: ['Unlimited everything', 'SSO & SAML', 'Custom integrations', 'SLA guarantee', 'Dedicated CSM', 'On-premise option'], popular: false },
            ].map((plan, i) => (
              <div key={i} className={`rounded-2xl border p-6 relative ${plan.popular ? 'border-blue-500 bg-blue-50/30 shadow-lg' : 'border-slate-200 bg-white'}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-white text-[10px] font-semibold rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{plan.desc}</p>
                <div className="mt-4 mb-6">
                  {plan.price === 'Custom' ? (
                    <p className="text-3xl font-bold text-slate-900">Custom</p>
                  ) : (
                    <div>
                      <span className="text-3xl font-bold text-slate-900">₹{plan.price}</span>
                      <span className="text-sm text-slate-500">/month</span>
                    </div>
                  )}
                </div>
                <button className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  plan.popular ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}>
                  Start Free Trial
                </button>
                <ul className="mt-6 space-y-2.5">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-slate-600">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Ready to transform your warehouse?</h2>
          <p className="text-lg text-slate-300 mt-4">Join 1,200+ warehouses already using StockFlow AI.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <button onClick={() => setCurrentPage('dashboard')} className="px-6 py-3 text-sm font-semibold text-slate-900 bg-white rounded-xl hover:bg-slate-100 transition-colors">
              Start Free Trial
            </button>
            <button className="px-6 py-3 text-sm font-semibold text-white border border-slate-700 rounded-xl hover:bg-slate-800 transition-colors">
              Book a Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-slate-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-white">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-slate-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-slate-400 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-white">API Reference</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-slate-400 hover:text-white">Privacy</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-white">Terms</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 flex items-center justify-between">
            <p className="text-sm text-slate-500">© 2026 StockFlow AI. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-slate-500 hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="text-slate-500 hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
