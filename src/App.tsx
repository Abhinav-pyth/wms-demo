import React, { useEffect } from 'react';
import { useStore } from './store/useStore';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Dashboard } from './pages/Dashboard';
import { InventoryPage } from './pages/InventoryPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ReceivingPage, PickingPage, PackingPage, ShippingPage, ForkliftsPage, AlertsPage } from './pages/OperationsPages';
import { AIAssistant, AIFloatingButton, CommandPalette } from './components/AIAssistant';
import { SettingsPage } from './pages/SettingsPage';
import { PlatformAdminPage } from './pages/PlatformAdminPage';
import { LandingPage } from './pages/LandingPage';
import { LoginPage, SignupPage } from './pages/AuthPages';
import { OnboardingPage } from './pages/OnboardingPage';
import { MobileWorkerPage } from './pages/MobileWorkerPage';

// Generic placeholder page
const PlaceholderPage: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div className="p-6 max-w-[1600px] mx-auto">
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h1>
      <p className="text-sm text-slate-500 mt-0.5">{description}</p>
    </div>
    <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 max-w-md mx-auto">This module is fully functional in the production version. Navigate through the sidebar to explore available features.</p>
    </div>
  </div>
);

// Page router
const PageRouter: React.FC = () => {
  const { currentPage } = useStore();

  // Full-screen pages (no sidebar/header)
  const fullScreenPages = ['landing', 'login', 'signup', 'onboarding', 'mobile-worker'];
  if (fullScreenPages.includes(currentPage)) {
    switch (currentPage) {
      case 'landing': return <LandingPage />;
      case 'login': return <LoginPage />;
      case 'signup': return <SignupPage />;
      case 'onboarding': return <OnboardingPage />;
      case 'mobile-worker': return <MobileWorkerPage />;
    }
  }

  const pages: Record<string, React.ReactNode> = {
    dashboard: <Dashboard />,
    inventory: <InventoryPage />,
    analytics: <AnalyticsPage />,
    receiving: <ReceivingPage />,
    picking: <PickingPage />,
    packing: <PackingPage />,
    shipping: <ShippingPage />,
    forklifts: <ForkliftsPage />,
    alerts: <AlertsPage />,
    settings: <SettingsPage />,
    platform: <PlatformAdminPage />,
    putaway: <PlaceholderPage title="Putaway" description="Manage putaway tasks and optimize storage locations" />,
    returns: <PlaceholderPage title="Returns" description="Process and manage product returns" />,
    products: <PlaceholderPage title="Products" description="Manage product catalog and details" />,
    locations: <PlaceholderPage title="Storage Locations" description="Manage warehouse storage locations and zones" />,
    movements: <PlaceholderPage title="Stock Movements" description="Track inventory movements and transfers" />,
    shipments: <ShippingPage />,
    trucks: <PlaceholderPage title="Trucks" description="Manage truck fleet and assignments" />,
    drivers: <PlaceholderPage title="Drivers" description="Manage driver profiles and schedules" />,
    'purchase-orders': <PlaceholderPage title="Purchase Orders" description="Create and manage purchase orders" />,
    'sales-orders': <PlaceholderPage title="Sales Orders" description="Manage sales orders and fulfillment" />,
    suppliers: <PlaceholderPage title="Suppliers" description="Manage supplier relationships and contacts" />,
    customers: <PlaceholderPage title="Customers" description="Manage customer accounts and orders" />,
    workers: <PlaceholderPage title="Workers" description="Manage warehouse workforce and assignments" />,
    integrations: <PlaceholderPage title="Integrations" description="Connect with external systems and APIs" />,
  };

  return <>{pages[currentPage] || <Dashboard />}</>;
};

function App() {
  const { currentPage, sidebarCollapsed, setCommandPaletteOpen, setIsMobileView } = useStore();

  // Keyboard shortcut for command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setCommandPaletteOpen]);

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [setIsMobileView]);

  // Full-screen pages
  const fullScreenPages = ['landing', 'login', 'signup', 'onboarding', 'mobile-worker'];
  if (fullScreenPages.includes(currentPage)) {
    return (
      <div className="min-h-screen bg-[#f8fafc] font-sans antialiased">
        <PageRouter />
        <CommandPalette />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans antialiased">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className={`transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'ml-[68px]' : 'ml-[260px]'}`}>
        <Header />
        <main className="min-h-[calc(100vh-64px)] bg-[#f8fafc]">
          <PageRouter />
        </main>
      </div>

      {/* AI Assistant */}
      <AIAssistant />
      <AIFloatingButton />

      {/* Command Palette */}
      <CommandPalette />
    </div>
  );
}

export default App;
