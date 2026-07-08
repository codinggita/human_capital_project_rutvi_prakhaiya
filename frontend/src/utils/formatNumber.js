function trimTrailingZeros(value) {
  return String(value)
    .replace(/(\.\d*?[1-9])0+(?=$|e)/i, '$1')
    .replace(/\.0+(?=$|e)/i, '');
}

export function formatCompactNumber(value, decimals = 1) {
  if (value == null || Number.isNaN(Number(value))) return '-';

  const num = Number(value);
  if (num === 0) return '0';

  const sign = num < 0 ? '-' : '';
  const abs = Math.abs(num);

  if (abs >= 1e15) {
    return `${sign}${trimTrailingZeros(abs.toExponential(decimals))}`;
  }

  const units = [
    { value: 1e12, suffix: 'T' },
    { value: 1e9, suffix: 'B' },
    { value: 1e6, suffix: 'M' },
    { value: 1e3, suffix: 'K' },
  ];

  const unit = units.find(({ value: unitValue }) => abs >= unitValue);
  if (unit) {
    return `${sign}${trimTrailingZeros((abs / unit.value).toFixed(decimals))}${unit.suffix}`;
  }

  if (abs >= 100) return `${sign}${trimTrailingZeros(abs.toFixed(0))}`;
  if (abs >= 10) return `${sign}${trimTrailingZeros(abs.toFixed(1))}`;
  return `${sign}${trimTrailingZeros(abs.toFixed(2))}`;
}

export function formatNumberWithCommas(value) {
  if (value == null || Number.isNaN(Number(value))) return '0';
  return Number(value).toLocaleString('en-US');
}

export const compactTickFormatter = (value) => formatCompactNumber(value);

export const compactTooltipFormatter = (value) => formatCompactNumber(value, 2);

export function shouldUseLogScale(values, threshold = 100) {
  const nums = values.filter((value) => value != null && value > 0);
  if (nums.length < 2) return false;

  const max = Math.max(...nums);
  const min = Math.min(...nums);
  return max / min > threshold;
}

export function getLogTicks(values, maxTicks = 6) {
  const nums = values.filter((value) => value != null && value > 0);
  if (nums.length === 0) return [1, 10, 100];

  const min = Math.min(...nums);
  const max = Math.max(...nums);
  let minPower = Math.floor(Math.log10(min));
  let maxPower = Math.ceil(Math.log10(max));

  if (minPower === maxPower) {
    minPower -= 1;
    maxPower += 1;
  }

  const ticks = [];
  for (let power = minPower; power <= maxPower; power += 1) {
    ticks.push(10 ** power);
  }

  if (ticks.length <= maxTicks) return ticks;

  const step = Math.ceil((ticks.length - 1) / (maxTicks - 1));
  const reduced = ticks.filter((_, index) => index % step === 0);
  const last = ticks[ticks.length - 1];

  return reduced[reduced.length - 1] === last ? reduced : [...reduced, last];
}
