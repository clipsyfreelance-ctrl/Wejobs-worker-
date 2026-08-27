import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { AvatarDisplay } from './AvatarDisplay';
import { User, NotificationItem } from '../types';
import {
  Bell,
  Check,
  LogOut,
  User as UserIcon,
  Briefcase,
  Wallet,
  ShieldCheck,
  FileText,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';

interface NavbarProps {
  user: User | null;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onOpenAdminLogin: () => void;
  onLogout: () => void;
  currentRoute: string;
  onNavigate: (route: string) => void;
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  onMarkAllNotificationsRead: () => void;
  onMarkNotificationRead?: (id: string) => void;
  availableBalance: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  onOpenLogin,
  onOpenRegister,
  onOpenAdminLogin,
  onLogout,
  currentRoute,
  onNavigate,
  notifications,
  unreadNotificationCount,
  onMarkAllNotificationsRead,
  onMarkNotificationRead,
  availableBalance,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifFilter, setNotifFilter] = useState<'all' | 'unread'>('all');

  const navLinks = [
    { label: 'Explore Jobs', route: '/tasks' },
    { label: 'Monthly Challenge 🏆', route: '/challenge' },
    { label: 'Categories', route: '/categories' },
    { label: 'About', route: '/about' },
    { label: 'FAQ', route: '/faq' },
    { label: 'Sponsors', route: '/sponsors' },
    { label: 'Help Center', route: '/help' },
  ];

  return (
    <header
      id="main-navbar"
      className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-neutral-900/90 border-b border-neutral-200/80 dark:border-neutral-800/80 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Logo with 5-Click Admin Shortcut */}
          <div className="flex items-center gap-8">
            <BrandLogo
              size="md"
              onAdminTrigger={() => {
                onOpenAdminLogin();
              }}
            />

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.route}
                  onClick={() => onNavigate(link.route)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    currentRoute === link.route
                      ? 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 font-semibold'
                      : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Authenticated Controls */}
            {user ? (
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Available Balance Pill */}
                <button
                  onClick={() => onNavigate('/balance')}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold hover:bg-emerald-100 transition-colors cursor-pointer"
                  title="Your Available Balance (USD)"
                >
                  <Wallet className="w-3.5 h-3.5 text-emerald-500" />
                  <span>${availableBalance.toFixed(2)} USD</span>
                </button>

                {/* Notifications Bell */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setNotificationsOpen(!notificationsOpen);
                      setUserDropdownOpen(false);
                    }}
                    className="relative p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                    title="Notifications"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadNotificationCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white dark:ring-neutral-900 animate-pulse">
                        {unreadNotificationCount > 9 ? '9+' : unreadNotificationCount}
                      </span>
                    )}
                  </button>

                  {/* Notifications Popover */}
                  {notificationsOpen && (
                    <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 py-3 z-50 animate-in fade-in zoom-in-95 duration-100">
                      <div className="flex items-center justify-between px-4 pb-2 border-b border-neutral-100 dark:border-neutral-800">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-neutral-900 dark:text-white">
                            Notifications
                          </span>
                          {unreadNotificationCount > 0 && (
                            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300">
                              {unreadNotificationCount} new
                            </span>
                          )}
                        </div>
                        {unreadNotificationCount > 0 && (
                          <button
                            onClick={onMarkAllNotificationsRead}
                            className="text-xs text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1 cursor-pointer font-medium"
                          >
                            <Check className="w-3 h-3" /> Mark all read
                          </button>
                        )}
                      </div>

                      {/* Filter subtabs (All vs Unread) */}
                      <div className="flex items-center gap-1 px-3 pt-2 pb-1 text-xs">
                        <button
                          type="button"
                          onClick={() => setNotifFilter('all')}
                          className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                            notifFilter === 'all'
                              ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white'
                              : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                          }`}
                        >
                          All ({notifications.length})
                        </button>
                        <button
                          type="button"
                          onClick={() => setNotifFilter('unread')}
                          className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                            notifFilter === 'unread'
                              ? 'bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400'
                              : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                          }`}
                        >
                          Unread ({unreadNotificationCount})
                        </button>
                      </div>

                      <div className="max-h-80 overflow-y-auto divide-y divide-neutral-100 dark:divide-neutral-800/60">
                        {(() => {
                          const listToRender = notifications.filter((n) => {
                            if (notifFilter === 'unread') return !n.read && !n.isRead;
                            return true;
                          });

                          if (listToRender.length === 0) {
                            return (
                              <div className="py-8 text-center text-xs text-neutral-400">
                                {notifFilter === 'unread'
                                  ? 'Tidak ada notifikasi belum dibaca'
                                  : 'Belum ada notifikasi'}
                              </div>
                            );
                          }

                          return listToRender.map((notif) => {
                            const isUnread = !notif.read && !notif.isRead;
                            return (
                              <div
                                key={notif.id}
                                onClick={() => {
                                  if (isUnread && onMarkNotificationRead) {
                                    onMarkNotificationRead(notif.id);
                                  }
                                  if (notif.link) {
                                    onNavigate(notif.link);
                                    setNotificationsOpen(false);
                                  }
                                }}
                                className={`p-3 text-left transition-colors cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/50 ${
                                  isUnread
                                    ? 'bg-orange-50/60 dark:bg-orange-950/30 border-l-2 border-orange-500'
                                    : ''
                                }`}
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <p className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                                    <span>{notif.title}</span>
                                  </p>
                                  {isUnread && (
                                    <span className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0 mt-1" />
                                  )}
                                </div>
                                <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1 line-clamp-2">
                                  {notif.message}
                                </p>
                                <span className="text-[10px] text-neutral-400 mt-1 block">
                                  {new Date(notif.createdAt).toLocaleDateString([], {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </span>
                              </div>
                            );
                          });
                        })()}
                      </div>
                    </div>
                  )}
                </div>

                {/* User Avatar Menu Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setUserDropdownOpen(!userDropdownOpen);
                      setNotificationsOpen(false);
                    }}
                    className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-orange-500/40 transition-all cursor-pointer"
                  >
                    <AvatarDisplay
                      user={user}
                      avatarType={user.avatarType}
                      builtinAvatarId={user.builtinAvatarId}
                      avatarId={user.avatarId}
                      customAvatarUrl={user.customAvatarUrl}
                      name={user.fullName}
                      size="sm"
                      showStatus
                    />
                    <ChevronDown className="w-3.5 h-3.5 text-neutral-400 hidden sm:block" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-xl shadow-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 py-2 z-50">
                      <div className="px-4 py-2 border-b border-neutral-100 dark:border-neutral-800">
                        <p className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                          {user.fullName}
                        </p>
                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                          {user.email}
                        </p>
                        <span className="inline-block mt-1 px-1.5 py-0.5 text-[9px] font-bold rounded uppercase bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                          {user.role}
                        </span>
                      </div>

                      <div className="py-1">
                        <button
                          onClick={() => {
                            onNavigate('/dashboard');
                            setUserDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2 text-left text-xs font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center gap-2 cursor-pointer"
                        >
                          <Briefcase className="w-4 h-4 text-orange-500" />
                          <span>Dashboard</span>
                        </button>

                        <button
                          onClick={() => {
                            onNavigate('/my-tasks');
                            setUserDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2 text-left text-xs font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center gap-2 cursor-pointer"
                        >
                          <FileText className="w-4 h-4 text-blue-500" />
                          <span>My Tasks & Submissions</span>
                        </button>

                        <button
                          onClick={() => {
                            onNavigate('/balance');
                            setUserDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2 text-left text-xs font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center gap-2 cursor-pointer"
                        >
                          <Wallet className="w-4 h-4 text-emerald-500" />
                          <span>Balance & Payouts</span>
                        </button>

                        <button
                          onClick={() => {
                            onNavigate('/profile');
                            setUserDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2 text-left text-xs font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center gap-2 cursor-pointer"
                        >
                          <UserIcon className="w-4 h-4 text-amber-500" />
                          <span>Profile & Avatars</span>
                        </button>

                        {/* If Admin / Super Admin */}
                        {(user.role === 'admin' || user.role === 'super_admin') && (
                          <button
                            onClick={() => {
                              onNavigate('/admin');
                              setUserDropdownOpen(false);
                            }}
                            className="w-full px-4 py-2 text-left text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-50/60 dark:bg-orange-950/30 hover:bg-orange-100 flex items-center gap-2 cursor-pointer"
                          >
                            <ShieldCheck className="w-4 h-4 text-orange-600" />
                            <span>Admin Dashboard</span>
                          </button>
                        )}
                      </div>

                      <div className="pt-1 border-t border-neutral-100 dark:border-neutral-800">
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            onLogout();
                          }}
                          className="w-full px-4 py-2 text-left text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2 cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Log Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Guest Controls */
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onOpenLogin}
                  className="px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-200 hover:text-orange-600 dark:hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={onOpenRegister}
                  className="px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-sm shadow-orange-500/25 transition-all cursor-pointer"
                >
                  Start Earning
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.route}
              onClick={() => {
                onNavigate(link.route);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg ${
                currentRoute === link.route
                  ? 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 font-semibold'
                  : 'text-neutral-600 dark:text-neutral-300'
              }`}
            >
              {link.label}
            </button>
          ))}

          {!user && (
            <div className="pt-2 flex flex-col gap-2 border-t border-neutral-100 dark:border-neutral-800 mt-2">
              <button
                onClick={() => {
                  onOpenLogin();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 text-center text-sm font-semibold rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  onOpenRegister();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 text-center text-sm font-semibold rounded-lg bg-orange-500 text-white"
              >
                Start Earning (Free Account)
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

