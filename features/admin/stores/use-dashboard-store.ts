import { create } from 'zustand';

type AdminTab = 'overview' | 'products' | 'services' | 'articles';

interface DashboardState {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  activeTab: 'overview',
  setActiveTab: (activeTab) => set({ activeTab }),
}));

