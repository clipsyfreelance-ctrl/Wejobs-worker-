import React from 'react';
import { SponsorItem } from '../types';
import { ExternalLink } from 'lucide-react';

interface SponsorsSectionProps {
  sponsors: SponsorItem[];
  trustText?: string;
  className?: string;
}

// Map sponsor IDs to clean industry/category classification labels
const SPONSOR_CATEGORY_LABELS: Record<string, string> = {
  'sp-1': 'Book Publisher',
  'sp-2': 'Digital Publisher',
  'sp-3': 'Media Network',
  'sp-4': 'Educational Group',
  'sp-5': 'Editorial Network',
  'sp-6': 'Fiction Studio',
  'sp-7': 'Creative Lab',
  'sp-8': 'Heritage Press',
  'sp-9': 'News Syndicate',
  'sp-10': 'Scientific Press',
};

export const SponsorsSection: React.FC<SponsorsSectionProps> = ({
  sponsors,
  trustText = 'dan website kami di percaya oleh ribuan penerbit lainnya',
  className = '',
}) => {
  const activeSponsors = sponsors.filter((s) => s.active).sort((a, b) => a.order - b.order);

  return (
    <section
      id="sponsors-section"
      className={`py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-y border-neutral-200/70 dark:border-neutral-800/80 bg-neutral-50/70 dark:bg-[#171614] ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Subtitle */}
        <div className="text-center mb-10 sm:mb-12 space-y-2">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400">
            Jaringan Penerbit & Mitra Editorial Terpercaya
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
            Official Publishing Partners & Syndicates
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
            Didukung oleh berbagai penerbit buku, media massa nasional, dan institusi akademik terkemuka.
          </p>
        </div>

        {/* 10 Enlarged Monochrome Logos with Category Classification Labels Only */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
          {activeSponsors.map((sponsor) => {
            const categoryLabel =
              SPONSOR_CATEGORY_LABELS[sponsor.id] ||
              sponsor.category ||
              'Publishing Partner';

            return (
              <a
                key={sponsor.id}
                href={sponsor.websiteUrl || '#'}
                target={sponsor.websiteUrl ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="group relative flex flex-col items-center justify-between p-5 rounded-2xl bg-white dark:bg-[#1f1e1b] border border-neutral-200/80 dark:border-[#2d2a26] shadow-xs hover:shadow-lg hover:border-orange-300 dark:hover:border-orange-500/50 hover:-translate-y-1 transition-all duration-200 text-center cursor-pointer"
                title={`${categoryLabel} — ${sponsor.description || sponsor.name}`}
              >
                {/* Logo Area (Enlarged & Strictly Monochrome) */}
                <div className="w-full h-20 sm:h-24 flex items-center justify-center p-2 rounded-xl bg-neutral-50/70 dark:bg-[#272522] group-hover:bg-neutral-100/80 dark:group-hover:bg-[#2e2b27] transition-colors">
                  <img
                    src={sponsor.logoUrl}
                    alt={categoryLabel}
                    referrerPolicy="no-referrer"
                    className="max-h-16 sm:max-h-20 max-w-[150px] sm:max-w-[170px] w-auto h-auto object-contain filter grayscale contrast-125 opacity-70 group-hover:opacity-100 group-hover:grayscale transition-all duration-200 dark:grayscale dark:contrast-125 dark:opacity-65 dark:group-hover:opacity-95"
                  />
                </div>

                {/* Classification Category Label Only (No Company Name) */}
                <div className="mt-3.5 w-full flex items-center justify-center">
                  <span className="inline-block px-3 py-1 rounded-full bg-neutral-100 dark:bg-[#2b2824] group-hover:bg-orange-50 dark:group-hover:bg-orange-950/40 text-xs font-bold text-neutral-700 dark:text-neutral-300 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    {categoryLabel}
                  </span>
                </div>

                {/* Subtle External Link Cue on Hover */}
                {sponsor.websiteUrl && (
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-orange-500">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                )}
              </a>
            );
          })}
        </div>

        {/* Mandatory Trust Copy Underneath the Sponsor Logos */}
        <div className="mt-10 sm:mt-12 text-center">
          <p className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400 italic">
            "{trustText}"
          </p>
        </div>
      </div>
    </section>
  );
};

