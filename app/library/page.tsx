'use client';

import { useMemo, useState } from 'react';
import { assets } from '@/lib/mockData';
import { useLibraryStore } from '@/store/libraryStore';
import AssetCard from '@/components/library/AssetCard';
import AssetModal from '@/components/library/AssetModal';
import RequestAssetModal from '@/components/library/RequestAssetModal';
import SearchBar from '@/components/library/SearchBar';
import FilterTabs from '@/components/library/FilterTabs';

export default function LibraryPage() {
  const [requestOpen, setRequestOpen] = useState(false);
  const { searchQuery, activeFilter, favorites, selectedAsset, setSelectedAsset } =
    useLibraryStore();

  const filtered = useMemo(() => {
    return assets.filter((a) => {
      if (searchQuery && !a.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (activeFilter === 'featured') return !!a.featured;
      if (activeFilter === 'kpi') return a.type === 'kpi';
      if (activeFilter === 'layouts') return a.type === 'layout';
      if (activeFilter === 'storyboards') return a.type === 'storyboard';
      return true;
    });
  }, [searchQuery, activeFilter]);

  const trending = useMemo(() => assets.filter((a) => a.trending), []);

  const showTrending = activeFilter === 'featured' && !searchQuery;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── top bar ──────────────────────────────────────────── */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-tight">Asset Library</h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Start here — search, filter by type, open an asset for details (mock catalog).
            </p>
          </div>
          <button
            type="button"
            onClick={() => setRequestOpen(true)}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
          >
            + Request Asset
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* ── search + tabs ─────────────────────────────────── */}
        <div className="mb-6">
          <SearchBar />
          <div className="mt-4">
            <FilterTabs />
          </div>
        </div>

        {/* ── trending strip (featured tab only) ───────────── */}
        {showTrending && trending.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
              Trending
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {trending.map((a) => (
                <AssetCard
                  key={a.id}
                  asset={a}
                  isFavorite={favorites.includes(a.id)}
                  onClick={() => setSelectedAsset(a)}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── main grid ─────────────────────────────────────── */}
        {filtered.length > 0 ? (
          <section>
            {showTrending && (
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                Featured
              </h2>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((a) => (
                <AssetCard
                  key={a.id}
                  asset={a}
                  isFavorite={favorites.includes(a.id)}
                  onClick={() => setSelectedAsset(a)}
                />
              ))}
            </div>
          </section>
        ) : (
          <div className="py-20 text-center">
            <p className="text-gray-400 text-sm">
              No results for{' '}
              <span className="font-medium text-gray-600">"{searchQuery}"</span>
            </p>
            <p className="text-gray-300 text-xs mt-1">
              Not seeing it? Try a broader search term.
            </p>
          </div>
        )}
      </main>

      <RequestAssetModal open={requestOpen} onClose={() => setRequestOpen(false)} />

      {selectedAsset && (
        <AssetModal asset={selectedAsset} onClose={() => setSelectedAsset(null)} />
      )}
    </div>
  );
}
