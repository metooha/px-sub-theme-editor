import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  LineChart,
  Area,
  AreaChart,
  Pie,
  PieChart,
  Cell,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from '@/components/ui/Chart';

// ── Shared data from the project's CampaignChart ──

const campaignData = [
  { date: 'Dec 30', impressions: 15.2, clicks: 121, cpc: 1.42 },
  { date: 'Jan 6', impressions: 16.1, clicks: 127, cpc: 1.39 },
  { date: 'Jan 13', impressions: 16.2, clicks: 130, cpc: 1.38 },
  { date: 'Jan 20', impressions: 17.5, clicks: 135, cpc: 1.41 },
  { date: 'Jan 27', impressions: 17.8, clicks: 139, cpc: 1.37 },
  { date: 'Feb 3', impressions: 18.2, clicks: 142, cpc: 1.36 },
  { date: 'Feb 10', impressions: 18.5, clicks: 144, cpc: 1.35 },
  { date: 'Feb 17', impressions: 18.6, clicks: 145, cpc: 1.34 },
  { date: 'Feb 24', impressions: 18.7, clicks: 147, cpc: 1.35 },
  { date: 'Mar 3', impressions: 18.7, clicks: 147, cpc: 1.36 },
  { date: 'Mar 10', impressions: 18.7, clicks: 149, cpc: 1.36 },
  { date: 'Mar 17', impressions: 18.7, clicks: 148, cpc: 1.37 },
];

const revenueData = [
  { month: 'Jul', revenue: 186, cost: 80 },
  { month: 'Aug', revenue: 305, cost: 200 },
  { month: 'Sep', revenue: 237, cost: 120 },
  { month: 'Oct', revenue: 273, cost: 190 },
  { month: 'Nov', revenue: 209, cost: 130 },
  { month: 'Dec', revenue: 314, cost: 140 },
];

// Chart colors use LD data visualization palette tokens
const CHART_COLORS = {
  primary: 'var(--ld-semantic-color-data-viz-1, #0071DC)',
  secondary: 'var(--ld-semantic-color-data-viz-2, #993EF4)',
  tertiary: 'var(--ld-semantic-color-data-viz-3, #4DBDF5)',
  quaternary: 'var(--ld-semantic-color-text, #2E2F32)',
  muted: 'var(--ld-semantic-color-text-subtle, #74767C)',
};

const channelData = [
  { name: 'Sponsored Search', value: 42, fill: CHART_COLORS.primary },
  { name: 'Display', value: 28, fill: CHART_COLORS.secondary },
  { name: 'In-Store', value: 18, fill: CHART_COLORS.tertiary },
  { name: 'Social', value: 12, fill: CHART_COLORS.quaternary },
];

// ── Chart Configs ──

const lineChartConfig: ChartConfig = {
  impressions: { label: 'Impressions (M)', color: CHART_COLORS.secondary },
  clicks: { label: 'Clicks (K)', color: CHART_COLORS.tertiary },
};

const barChartConfig: ChartConfig = {
  revenue: { label: 'Revenue', color: CHART_COLORS.primary },
  cost: { label: 'Cost', color: CHART_COLORS.muted },
};

const areaChartConfig: ChartConfig = {
  impressions: { label: 'Impressions (M)', color: CHART_COLORS.primary },
  clicks: { label: 'Clicks (K)', color: CHART_COLORS.secondary },
};

const pieChartConfig: ChartConfig = {
  'Sponsored Search': { label: 'Sponsored Search', color: CHART_COLORS.primary },
  Display: { label: 'Display', color: CHART_COLORS.secondary },
  'In-Store': { label: 'In-Store', color: CHART_COLORS.tertiary },
  Social: { label: 'Social', color: CHART_COLORS.quaternary },
};

// ── Section wrapper ──

const sectionStyle: React.CSSProperties = {
  fontFamily: 'var(--ld-semantic-font-family-sans)',
};

const headingStyle: React.CSSProperties = {
  fontSize: '20px',
  fontWeight: 700,
  fontFamily: 'var(--ld-semantic-font-family-sans)',
  color: 'var(--ld-semantic-color-text, #2e2f32)',
  marginBottom: '8px',
};

const descStyle: React.CSSProperties = {
  fontSize: '14px',
  color: 'var(--ld-semantic-color-text-subtle, #515357)',
  marginBottom: '24px',
  lineHeight: '20px',
};

const chartWrapperStyle: React.CSSProperties = {
  borderRadius: '8px',
  boxShadow: 'var(--ld-semantic-elevation-100)',
  background: 'var(--ld-semantic-color-surface, #ffffff)',
  padding: '24px',
};

// ── Component ──

export default function ChartExample() {
  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      {/* Line Chart */}
      <section style={sectionStyle}>
        <h3 style={headingStyle}>Line Chart - Campaign Performance</h3>
        <p style={descStyle}>
          Multi-series line chart showing impressions and clicks over time, using data from the Campaign dashboard.
        </p>
        <div style={chartWrapperStyle}>
          <ChartContainer config={lineChartConfig} className="h-[300px] w-full">
            <LineChart data={campaignData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line
                type="monotone"
                dataKey="impressions"
                stroke="var(--color-impressions)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="clicks"
                stroke="var(--color-clicks)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </section>

      {/* Bar Chart */}
      <section style={sectionStyle}>
        <h3 style={headingStyle}>Bar Chart - Revenue vs Cost</h3>
        <p style={descStyle}>
          Grouped bar chart comparing revenue and cost across months.
        </p>
        <div style={chartWrapperStyle}>
          <ChartContainer config={barChartConfig} className="h-[300px] w-full">
            <BarChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="cost" fill="var(--color-cost)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </div>
      </section>

      {/* Area Chart */}
      <section style={sectionStyle}>
        <h3 style={headingStyle}>Area Chart - Campaign Trends</h3>
        <p style={descStyle}>
          Stacked area chart visualizing campaign performance trends over time.
        </p>
        <div style={chartWrapperStyle}>
          <ChartContainer config={areaChartConfig} className="h-[300px] w-full">
            <AreaChart data={campaignData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <defs>
                <linearGradient id="fillImpressions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-impressions)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-impressions)" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="fillClicks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-clicks)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-clicks)" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="impressions"
                stroke="var(--color-impressions)"
                fill="url(#fillImpressions)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="clicks"
                stroke="var(--color-clicks)"
                fill="url(#fillClicks)"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </section>

      {/* Pie Chart */}
      <section style={sectionStyle}>
        <h3 style={headingStyle}>Pie Chart - Channel Distribution</h3>
        <p style={descStyle}>
          Donut chart showing ad spend distribution across advertising channels.
        </p>
        <div style={chartWrapperStyle}>
          <ChartContainer config={pieChartConfig} className="h-[300px] w-full">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
              <Pie
                data={channelData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                nameKey="name"
              >
                {channelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartLegend content={<ChartLegendContent nameKey="name" />} />
            </PieChart>
          </ChartContainer>
        </div>
      </section>
    </div>
  );
}
