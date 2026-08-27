// Supported payout providers for the Balance / Withdrawal page.
// Each entry drives a colored badge (see PaymentProviderBadge.tsx) rather than
// an externally hosted logo image, so the app keeps working fully offline
// and inside the Android/Capacitor build without extra network/image assets.

export interface PaymentProvider {
  id: string;
  name: string;
  shortName: string;
  country: string;
  type: 'bank' | 'ewallet';
  bg: string; // badge background color (hex)
  fg: string; // badge text color (hex)
}

export const BANK_PROVIDERS: PaymentProvider[] = [
  { id: 'hsbc_uk', name: 'HSBC UK', shortName: 'HSBC', country: 'United Kingdom', type: 'bank', bg: '#DB0011', fg: '#FFFFFF' },
  { id: 'bank_of_america', name: 'Bank of America', shortName: 'BoA', country: 'United States', type: 'bank', bg: '#012169', fg: '#FFFFFF' },
  { id: 'bsi', name: 'Bank Syariah Indonesia (BSI)', shortName: 'BSI', country: 'Indonesia', type: 'bank', bg: '#00A99D', fg: '#FFFFFF' },
  { id: 'bri', name: 'Bank BRI', shortName: 'BRI', country: 'Indonesia', type: 'bank', bg: '#00529C', fg: '#FFFFFF' },
  { id: 'bca', name: 'Bank Central Asia (BCA)', shortName: 'BCA', country: 'Indonesia', type: 'bank', bg: '#0056A8', fg: '#FFFFFF' },
  { id: 'bangkok_bank', name: 'Bangkok Bank', shortName: 'BBL', country: 'Thailand', type: 'bank', bg: '#1B3F8B', fg: '#FFFFFF' },
  { id: 'vietcombank', name: 'Vietcombank', shortName: 'VCB', country: 'Vietnam', type: 'bank', bg: '#00693E', fg: '#FFFFFF' },
  { id: 'maybank', name: 'Maybank', shortName: 'MBB', country: 'Malaysia', type: 'bank', bg: '#FFC72C', fg: '#111111' },
  { id: 'other_bank', name: 'Other Bank', shortName: '\u00b7\u00b7\u00b7', country: 'Global', type: 'bank', bg: '#6B7280', fg: '#FFFFFF' },
];

export const EWALLET_PROVIDERS: PaymentProvider[] = [
  { id: 'ovo', name: 'OVO', shortName: 'OVO', country: 'Indonesia', type: 'ewallet', bg: '#4B2E83', fg: '#FFFFFF' },
  { id: 'gopay', name: 'GoPay', shortName: 'GP', country: 'Indonesia', type: 'ewallet', bg: '#00AED6', fg: '#FFFFFF' },
  { id: 'dana', name: 'DANA', shortName: 'DANA', country: 'Indonesia', type: 'ewallet', bg: '#118EEA', fg: '#FFFFFF' },
  { id: 'other_ewallet', name: 'Other e-Wallet', shortName: '\u00b7\u00b7\u00b7', country: 'Global', type: 'ewallet', bg: '#6B7280', fg: '#FFFFFF' },
];

export const ALL_PROVIDERS: PaymentProvider[] = [...BANK_PROVIDERS, ...EWALLET_PROVIDERS];

export const findProvider = (id: string): PaymentProvider | undefined =>
  ALL_PROVIDERS.find((p) => p.id === id);
