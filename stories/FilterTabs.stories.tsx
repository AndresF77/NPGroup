import type { Meta, StoryObj } from '@storybook/react';
import FilterTabs from '../components/library/FilterTabs';

const meta: Meta<typeof FilterTabs> = {
  title: 'Library/FilterTabs',
  component: FilterTabs,
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'white' },
  },
  args: {
    onFilterChange: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof FilterTabs>;

export const Default: Story = {
  args: { activeFilter: 'featured' },
};

export const KPIActive: Story = {
  name: 'KPI tab active',
  args: { activeFilter: 'kpi' },
};

export const LayoutsActive: Story = {
  name: 'Layouts tab active',
  args: { activeFilter: 'layouts' },
};

export const StoryboardsActive: Story = {
  name: 'Storyboards tab active',
  args: { activeFilter: 'storyboards' },
};
