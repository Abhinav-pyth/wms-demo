import { create } from 'zustand';

interface AppState {
  sidebarCollapsed: boolean;
  darkMode: boolean;
  currentPage: string;
  selectedWarehouse: string;
  commandPaletteOpen: boolean;
  aiAssistantOpen: boolean;
  notifications: number;
  toasts: Toast[];
  toggleSidebar: () => void;
  toggleDarkMode: () => void;
  setCurrentPage: (page: string) => void;
  setSelectedWarehouse: (warehouse: string) => void;
  setCommandPaletteOpen: (open: boolean) => void;
  setAiAssistantOpen: (open: boolean) => void;
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
}

export const useStore = create<AppState>((set) => ({
  sidebarCollapsed: false,
  darkMode: false,
  currentPage: 'dashboard',
  selectedWarehouse: 'Northgate Distribution Center',
  commandPaletteOpen: false,
  aiAssistantOpen: false,
  notifications: 5,
  toasts: [],
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  toggleDarkMode: () => set((state) => {
    const newMode = !state.darkMode;
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return { darkMode: newMode };
  }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setSelectedWarehouse: (warehouse) => set({ selectedWarehouse: warehouse }),
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
  setAiAssistantOpen: (open) => set({ aiAssistantOpen: open }),
  addToast: (toast) => set((state) => ({
    toasts: [...state.toasts, { ...toast, id: Date.now().toString() }]
  })),
  removeToast: (id) => set((state) => ({
    toasts: state.toasts.filter(t => t.id !== id)
  })),
}));
