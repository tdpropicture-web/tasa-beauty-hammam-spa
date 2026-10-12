export type CurrencyCode = 'NGN' | 'USD' | 'GBP' | 'EUR';

export const CURRENCY_RATES: Record<CurrencyCode, { symbol: string; rate: number; label: string }> = {
  NGN: { symbol: '₦', rate: 1, label: 'NGN (₦)' },
  USD: { symbol: '$', rate: 0.00067, label: 'USD ($)' },
  GBP: { symbol: '£', rate: 0.00052, label: 'GBP (£)' },
  EUR: { symbol: '€', rate: 0.00062, label: 'EUR (€)' },
};

export function formatPrice(amountNGN: number, currency: CurrencyCode = 'NGN'): string {
  const info = CURRENCY_RATES[currency];
  if (currency === 'NGN') {
    return `${info.symbol}${amountNGN.toLocaleString('en-NG')}`;
  }
  const converted = Math.round(amountNGN * info.rate);
  return `${info.symbol}${converted.toLocaleString('en-US')}`;
}
