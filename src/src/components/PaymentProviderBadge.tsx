import React from 'react';
import { Check } from 'lucide-react';
import { PaymentProvider } from '../data/paymentProviders';

interface PaymentProviderCardProps {
  provider: PaymentProvider;
  selected?: boolean;
  onClick?: () => void;
}

/**
 * Compact, tappable card representing a bank / e-wallet payout provider.
 * Uses a colored initials badge instead of a hosted brand logo image, so
 * the picker renders instantly and works offline in the packaged app.
 */
export const PaymentProviderCard: React.FC<PaymentProviderCardProps> = ({
  provider,
  selected = false,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      title={`${provider.name} \u2022 ${provider.country}`}
      className={`relative flex items-center gap-2 p-2 rounded-xl border text-left transition-all cursor-pointer ${
        selected
          ? 'border-orange-500 bg-orange-50/60 dark:bg-orange-950/40 shadow-xs'
          : 'border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800'
      }`}
    >
      <div
        className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-lg font-black text-[10px] tracking-tight shadow-sm"
        style={{ backgroundColor: provider.bg, color: provider.fg }}
      >
        {provider.shortName}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-bold text-neutral-800 dark:text-neutral-100 truncate">
          {provider.name}
        </p>
        <p className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">
          {provider.country}
        </p>
      </div>
      {selected && (
        <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center">
          <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
        </span>
      )}
    </button>
  );
};
