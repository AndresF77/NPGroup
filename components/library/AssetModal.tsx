'use client';

import { useState } from 'react';
import { useLibraryStore } from '@/store/libraryStore';
import type { Asset } from '@/types/library';

const TYPE_BADGE: Record<Asset['type'], string> = {
  kpi:        'bg-blue-100 text-blue-700',
  layout:     'bg-purple-100 text-purple-700',
  dataviz:    'bg-emerald-100 text-emerald-700',
  storyboard: 'bg-orange-100 text-orange-700',
};

const TYPE_LABEL: Record<Asset['type'], string> = {
  kpi:        'KPI',
  layout:     'Layout',
  dataviz:    'Data Viz',
  storyboard: 'Storyboard',
};

interface Props {
  asset: Asset;
  onClose: () => void;
}

export default function AssetModal({ asset, onClose }: Props) {
  const { favorites, toggleFavorite } = useLibraryStore();
  const isFav = favorites.includes(asset.id);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const url = `${window.location.origin}/library?asset=${asset.id}`;
    navigator.clipboard.writeText(url).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedDate = new Date(asset.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[88vh] flex flex-col shadow-2xl">

        {/* ── modal header ─────────────────────────────────────── */}
        <div className="px-6 pt-5 pb-4 border-b border-gray-100 shrink-0">
          {/* tags row */}
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${TYPE_BADGE[asset.type]}`}>
              {TYPE_LABEL[asset.type]}
            </span>
            {asset.featured && (
              <span className="text-xs px-2.5 py-0.5 bg-amber-50 text-amber-600 border border-amber-200 rounded-full font-medium">
                Featured
              </span>
            )}
            {asset.trending && (
              <span className="text-xs px-2.5 py-0.5 bg-amber-50 text-amber-600 border border-amber-200 rounded-full font-medium">
                Trending
              </span>
            )}
          </div>

          {/* title + actions */}
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 className="text-xl font-bold text-gray-900 leading-tight">{asset.name}</h2>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">{asset.description}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => toggleFavorite(asset.id)}
                title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                className={`p-2 rounded-lg transition-colors ${
                  isFav
                    ? 'text-amber-500 bg-amber-50'
                    : 'text-gray-400 hover:text-amber-500 hover:bg-amber-50'
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill={isFav ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
              </button>

              <button
                onClick={handleCopy}
                title="Copy link"
                className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                {copied ? (
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                  </svg>
                )}
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* stats row */}
          <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
            <span>Added {formattedDate}</span>
            {asset.type === 'layout' && asset.pageCount != null && (
              <span>{asset.pageCount} pages</span>
            )}
            {asset.type === 'dataviz' && asset.chartType && (
              <span>{asset.chartType}</span>
            )}
          </div>
        </div>

        {/* ── modal body ───────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <ModalContent asset={asset} />
        </div>
      </div>
    </div>
  );
}

// ─── private helpers ────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
        {title}
      </h4>
      {children}
    </div>
  );
}

function TagList({ items, color = 'gray' }: { items: string[]; color?: 'gray' | 'blue' | 'amber' }) {
  const cls = {
    gray:  'bg-gray-100 text-gray-600',
    blue:  'bg-blue-50 text-blue-700 border border-blue-100',
    amber: 'bg-amber-50 text-amber-700 border border-amber-200',
  }[color];

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className={`text-xs px-2.5 py-1 rounded-full ${cls}`}>
          {item}
        </span>
      ))}
    </div>
  );
}

function ModalContent({ asset }: { asset: Asset }) {
  switch (asset.type) {
    case 'kpi':
      return (
        <div className="space-y-6">
          {asset.businessQuestions && (
            <Section title="Business Questions">
              <ul className="space-y-2">
                {asset.businessQuestions.map((q, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-700 leading-snug">
                    <span className="text-amber-400 font-bold mt-0.5 shrink-0">→</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}
          {asset.metricIds && (
            <Section title="Metric IDs">
              <div className="flex flex-wrap gap-2">
                {asset.metricIds.map((id) => (
                  <span key={id} className="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md font-mono">
                    {id}
                  </span>
                ))}
              </div>
            </Section>
          )}
          {asset.calculation && (
            <Section title="Calculation">
              <div className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-sm text-gray-700 font-mono">
                {asset.calculation}
              </div>
            </Section>
          )}
          {asset.visuals && (
            <Section title="Visuals Available">
              <TagList items={asset.visuals} color="blue" />
            </Section>
          )}
          {asset.affiliateApplicability && (
            <Section title="Affiliate Applicability">
              <TagList items={asset.affiliateApplicability} color="gray" />
            </Section>
          )}
        </div>
      );

    case 'dataviz':
      return (
        <div className="space-y-6">
          {/* chart placeholder */}
          <div className="w-full h-52 bg-gray-50 border border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-400">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
            <p className="text-xs">Interactive chart — connects to live data in production</p>
          </div>
          {asset.relatedKpis && (
            <Section title="Related KPI Favorites">
              <TagList items={asset.relatedKpis} color="blue" />
            </Section>
          )}
          {asset.chartType && (
            <Section title="Chart Type">
              <p className="text-sm text-gray-700">{asset.chartType}</p>
            </Section>
          )}
          <Section title="Asset Info">
            <p className="text-sm text-gray-600 leading-relaxed">{asset.description}</p>
          </Section>
        </div>
      );

    case 'layout':
      return (
        <div className="space-y-6">
          {/* layout preview placeholder */}
          <div className="w-full h-48 bg-gray-50 border border-dashed border-gray-200 rounded-xl overflow-hidden p-4">
            <div className="flex gap-3 h-full">
              <div className="flex-1 flex flex-col gap-2">
                <div className="h-6 bg-gray-200 rounded" />
                <div className="flex-1 bg-gray-200 rounded" />
              </div>
              <div className="w-1/3 flex flex-col gap-2">
                <div className="h-6 bg-gray-200 rounded" />
                <div className="h-1/2 bg-gray-200 rounded" />
                <div className="flex-1 bg-gray-200 rounded" />
              </div>
            </div>
            <p className="text-center text-xs text-gray-400 mt-2">Layout preview</p>
          </div>

          <div className="flex gap-6">
            <div>
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Pages</p>
              <p className="text-2xl font-bold text-gray-900 mt-0.5">{asset.pageCount ?? '—'}</p>
            </div>
            {asset.kpisUsed && (
              <div>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">KPIs Included</p>
                <p className="text-2xl font-bold text-gray-900 mt-0.5">{asset.kpisUsed.length}</p>
              </div>
            )}
          </div>

          {asset.kpisUsed && (
            <Section title="KPIs Used">
              <TagList items={asset.kpisUsed} color="blue" />
            </Section>
          )}
        </div>
      );

    case 'storyboard':
      return (
        <div className="space-y-6">
          {asset.coupledKpis && (
            <Section title="Coupled KPIs">
              <TagList items={asset.coupledKpis} color="blue" />
            </Section>
          )}
          {asset.coupledFilters && (
            <Section title="Coupled Filters">
              <TagList items={asset.coupledFilters} color="gray" />
            </Section>
          )}
          {asset.applicableAffiliates && (
            <Section title="Applicable Affiliates">
              <TagList items={asset.applicableAffiliates} color="gray" />
            </Section>
          )}
          {asset.requiresAccess && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
              <svg className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-amber-800">Access Required</p>
                <p className="text-xs text-amber-700 mt-0.5">
                  This storyboard requires approval before access is granted.
                </p>
                <button className="mt-3 px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-medium rounded-lg transition-colors">
                  Request Access
                </button>
              </div>
            </div>
          )}
        </div>
      );
  }
}
