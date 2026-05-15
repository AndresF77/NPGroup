'use client';

import { useRef } from 'react';
import { useLibraryStore } from '@/store/libraryStore';

export default function SearchBar() {
  const { searchQuery, setSearchQuery, recentSearches, addRecentSearch, clearRecentSearches } =
    useLibraryStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      addRecentSearch(searchQuery.trim());
    }
  };

  const handleChipClick = (s: string) => {
    setSearchQuery(s);
    inputRef.current?.focus();
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="relative">
        {/* search icon */}
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search assets by name..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {recentSearches.length > 0 && (
        <div className="flex items-center gap-2 mt-2.5 flex-wrap">
          <span className="text-xs text-gray-400">Recent:</span>
          {recentSearches.map((s) => (
            <button
              key={s}
              onClick={() => handleChipClick(s)}
              className="text-xs px-2.5 py-1 bg-gray-100 hover:bg-amber-50 hover:text-amber-700 rounded-full text-gray-600 transition-colors"
            >
              {s}
            </button>
          ))}
          <button
            onClick={clearRecentSearches}
            className="text-xs text-gray-400 hover:text-gray-600 ml-auto"
          >
            clear
          </button>
        </div>
      )}
    </div>
  );
}
