'use client';

import { useLibraryStore } from '@/store/libraryStore';
import type { FilterTab } from '@/types/library';

const TABS: { id: FilterTab; label: string }[] = [
  { id: 'featured', label: 'Featured' },
  { id: 'kpi', label: 'KPI' },
  { id: 'layouts', label: 'Layouts' },
  { id: 'storyboards', label: 'Storyboards' },
];

interface Props {
  activeFilter?: FilterTab;
  onFilterChange?: (f: FilterTab) => void;
}

export default function FilterTabs({ activeFilter: controlled, onFilterChange }: Props = {}) {
  const store = useLibraryStore();
  const active = controlled ?? store.activeFilter;
  const onChange = onFilterChange ?? store.setActiveFilter;

  return (
    <div className="flex gap-0.5 border-b border-gray-200">
      {TABS.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`relative px-4 py-2.5 text-sm font-medium transition-colors ${
              isActive ? 'text-amber-600' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {tab.label}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-t-full" />
            )}
          </button>
        );
      })}
    </div>
  );
}
