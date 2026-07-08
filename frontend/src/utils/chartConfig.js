import { compactTickFormatter, compactTooltipFormatter } from './formatNumber';

export const chartAxisStyle = {
  tick: { fontSize: 12, fill: '#475569' },
  axisLine: false,
  tickLine: false,
};

export const chartTooltipStyle = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
  boxShadow: '0 10px 28px rgba(15, 23, 42, 0.12)',
};

export const defaultYAxisProps = {
  ...chartAxisStyle,
  tickFormatter: compactTickFormatter,
  width: 84,
  tickCount: 5,
  minTickGap: 12,
};

export const defaultXAxisProps = {
  ...chartAxisStyle,
  dy: 10,
  interval: 'preserveStartEnd',
  minTickGap: 12,
  textAnchor: 'middle',
};

export const defaultTooltipProps = {
  contentStyle: chartTooltipStyle,
  formatter: compactTooltipFormatter,
  labelStyle: { color: '#475569', fontWeight: 500 },
  itemStyle: { color: '#0f172a' },
};
