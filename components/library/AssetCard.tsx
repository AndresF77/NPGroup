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
  isFavorite: boolean;
  onClick: () => void;
}

export default function AssetCard({ asset, isFavorite, onClick }: Props) {
  const dateStr = new Date(asset.date).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md hover:border-gray-200 transition-all group"
    >
      {/* top row: type badge + trending / favorite indicators */}
      <div className="flex items-start justify-between mb-3">
        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${TYPE_BADGE[asset.type]}`}>
          {TYPE_LABEL[asset.type]}
        </span>
        <div className="flex items-center gap-1.5">
          {asset.trending && (
            <span className="text-xs px-2 py-0.5 bg-amber-50 text-amber-600 rounded-full border border-amber-200 font-medium">
              Trending
            </span>
          )}
          {isFavorite && (
            <svg
              className="w-4 h-4 text-amber-400 fill-amber-400"
              viewBox="0 0 20 20"
              aria-label="Favorited"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          )}
        </div>
      </div>

      <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-amber-700 transition-colors line-clamp-1 text-sm">
        {asset.name}
      </h3>
      <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">
        {asset.description}
      </p>
      <p className="text-xs text-gray-400">{dateStr}</p>
    </button>
  );
}
