import { create } from 'zustand';
import type { Asset, FilterTab } from '@/types/library';

interface LibraryStore {
  searchQuery: string;
  recentSearches: string[];
  favorites: string[];
  activeFilter: FilterTab;
  selectedAsset: Asset | null;

  setSearchQuery: (q: string) => void;
  addRecentSearch: (q: string) => void;
  clearRecentSearches: () => void;
  toggleFavorite: (id: string) => void;
  setActiveFilter: (f: FilterTab) => void;
  setSelectedAsset: (a: Asset | null) => void;
}

export const useLibraryStore = create<LibraryStore>((set) => ({
  searchQuery: '',
  recentSearches: [],
  favorites: [],
  activeFilter: 'featured',
  selectedAsset: null,

  setSearchQuery: (q) => set({ searchQuery: q }),

  addRecentSearch: (q) =>
    set((state) => ({
      recentSearches: [q, ...state.recentSearches.filter((s) => s !== q)].slice(0, 6),
    })),

  clearRecentSearches: () => set({ recentSearches: [] }),

  toggleFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.includes(id)
        ? state.favorites.filter((f) => f !== id)
        : [...state.favorites, id],
    })),

  setActiveFilter: (f) => set({ activeFilter: f }),
  setSelectedAsset: (a) => set({ selectedAsset: a }),
}));
