import type { Meta, StoryObj } from '@storybook/react';
import AssetCard from '../components/library/AssetCard';
import type { Asset } from '../types/library';

const kpiAsset: Asset = {
  id: 'kpi-001',
  name: 'Revenue per User',
  description: 'Average revenue generated per active user across all business segments and affiliates.',
  type: 'kpi',
  date: '2024-06-15',
  featured: true,
};

const meta: Meta<typeof AssetCard> = {
  title: 'Library/AssetCard',
  component: AssetCard,
  parameters: { layout: 'padded' },
  args: {
    asset: kpiAsset,
    isFavorite: false,
    onClick: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof AssetCard>;

export const Default: Story = {};

export const WithFavorite: Story = {
  args: { isFavorite: true },
};

export const Trending: Story = {
  args: {
    asset: { ...kpiAsset, trending: true, featured: false },
  },
};

export const DataViz: Story = {
  args: {
    asset: {
      id: 'viz-001',
      name: 'Revenue Trend Chart',
      description: 'Interactive line chart visualizing MoM and YoY revenue trends with 90-day forecast bands.',
      type: 'dataviz',
      date: '2024-07-01',
      trending: true,
    },
  },
};

export const Storyboard: Story = {
  args: {
    asset: {
      id: 'story-001',
      name: 'EBITDA Storyboard',
      description: 'End-to-end narrative of EBITDA drivers, cost levers, and margin improvement opportunities.',
      type: 'storyboard',
      date: '2024-06-01',
      featured: true,
    },
  },
};
