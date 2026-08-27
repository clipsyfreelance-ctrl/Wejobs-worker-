import React from 'react';
import { BrandLogo } from './BrandLogo';
import { ShieldCheck, Lock, Globe, DollarSign, Heart, Users, Briefcase, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: string) => void;
  onOpenAdminLogin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdminLogin }) => {
  return (
    <footer
      id="main-footer"
      className="bg-neutral-900 text-neutral-400 text-sm border-t border-neutral-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Top summary stats banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-10 mb-10 border-b border-neutral-800 text-xs">
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-neutral-800/40 border border-neutral-800">
            <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] text-neutral-400">Jumlah Pekerja Terdaftar</p>
              <p className="text-sm font-bold text-white">14.221 Freelancer</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-neutral-800/40 border border-neutral-800">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] text-neutral-400">Jumlah Pekerjaan Aktif</p>
              <p className="text-sm font-bold text-white">4.421 Tugas Tersedia</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-neutral-800/40 border border-neutral-800">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] text-neutral-400">Total Imbalan Terbayar</p>
              <p className="text-sm font-bold text-emerald-400">$1,728,000.00+ USD</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1 & 2: Brand & Platform Summary */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="md" showTagline onAdminTrigger={onOpenAdminLogin} />
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              WEJOBS adalah platform micro-job dan freelance editorial terpercaya yang memberdayakan penulis, editor, peneliti, dan penerjemah di seluruh dunia untuk meraih imbalan USD nyata melalui tugas-tugas mikro bergaransi escrow.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500">
              <span className="flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> 100% USD Settlement
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-orange-400" /> Escrow Protected
              </span>
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-blue-400" /> Argon2id Security
              </span>
            </div>
          </div>

          {/* Col 3: Task Disciplines */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Kategori Tugas
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/tasks?cat=Writing')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Artikel SEO & Copywriting
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/tasks?cat=Creative Writing')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Novel Fiksi & Cerpen
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/tasks?cat=Editing')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Proofreading & Penyuntingan
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/tasks?cat=Research & Writing')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Riset & Literature Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/tasks?cat=Translation')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Terjemahan & Lokalisasi
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Navigasi Platform</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Tentang WEJOBS
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/tasks')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Jelajahi 4.421 Pekerjaan
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/faq')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Frequently Asked Questions (FAQ)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/sponsors')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Mitra Penerbit & Sponsor
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/help')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Help Desk & Tiket Bantuan
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Compliance & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Kepatuhan & Hukum
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/terms')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Syarat & Ketentuan Layanan
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/privacy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Kebijakan Privasi
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/rules')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Aturan Anti-Plagiarisme
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/rules')}
                  className="hover:text-white transition-colors cursor-pointer text-emerald-400"
                >
                  Kebijakan Min. Penarikan $100.00
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom trademark & copyright */}
        <div className="mt-12 pt-8 border-t border-neutral-800/80 space-y-4 text-xs">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-400">
            <p className="text-center sm:text-left leading-relaxed">
              wejobs Freelancer ® adalah Merek Dagang terdaftar dari Freelancer Technology Pty Limited (ACN 142 189 759)
              <br />
              Hak cipta &copy; 2026 Freelancer Technology Pty Limited (ACN 142 189 759)
            </p>
            <div className="flex items-center gap-3 text-neutral-500 text-[11px] shrink-0">
              <span>Settled in USD ($)</span>
              <span>•</span>
              <span>Protected by CAPTCHA</span>
              <span>•</span>
              <button
                onClick={onOpenAdminLogin}
                className="text-neutral-600 hover:text-neutral-400 transition-colors"
                title="Editorial Staff Portal"
              >
                Staff Portal
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
