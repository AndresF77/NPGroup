export type AssetType = 'kpi' | 'layout' | 'dataviz' | 'storyboard';

export interface Asset {
  id: string;
  name: string;
  description: string;
  type: AssetType;
  date: string;
  featured?: boolean;
  trending?: boolean;

  // kpi
  businessQuestions?: string[];
  metricIds?: string[];
  calculation?: string;
  visuals?: string[];
  affiliateApplicability?: string[];

  // dataviz
  relatedKpis?: string[];
  chartType?: string;

  // layout
  pageCount?: number;
  kpisUsed?: string[];

  // storyboard
  coupledKpis?: string[];
  coupledFilters?: string[];
  applicableAffiliates?: string[];
  requiresAccess?: boolean;
}

export type FilterTab = 'featured' | 'kpi' | 'layouts' | 'storyboards';

export interface LibraryState {
  searchQuery: string;
  recentSearches: string[];
  favorites: string[];
  activeFilter: FilterTab;
  selectedAsset: Asset | null;
}
