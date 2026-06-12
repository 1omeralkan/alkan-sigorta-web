"use client";

import React from "react";
import { accentColors, getBadgeClass, getStatusInfo } from "@/lib/design-tokens";
import { Badge } from "@/components/ui";

// ─── DashboardStatCard ──────────────────────────────────────────────────────────
// Mobil dashboard_stat_card.dart'ın web karşılığı
type AccentKey = keyof typeof accentColors;

interface DashboardStatCardProps {
  icon:       React.ReactNode;
  title:      string;
  value:      string | number;
  accent:     AccentKey;
  onClick?:   () => void;
  className?: string;
}

export function DashboardStatCard({
  icon,
  title,
  value,
  accent,
  onClick,
  className = "",
}: DashboardStatCardProps) {
  const colors = accentColors[accent];
  return (
    <div
      className={`stat-card animate-in ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
    >
      <div className="flex items-start justify-between">
        {/* İkon kutusu */}
        <div
          className="stat-card-icon"
          style={{ backgroundColor: colors.bg, color: colors.base }}
        >
          {icon}
        </div>
        {/* Tıklanabilir ok */}
        {onClick && (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-text-tertiary mt-sm"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        )}
      </div>
      <p className="stat-card-value" style={{ color: colors.base }}>
        {value}
      </p>
      <p className="stat-card-label">{title}</p>
    </div>
  );
}

// ─── QuickActionCard ────────────────────────────────────────────────────────────
// Mobil quick_action_card.dart'ın web karşılığı
interface QuickActionCardProps {
  icon:       React.ReactNode;
  title:      string;
  subtitle?:  string;
  accent:     AccentKey;
  onClick:    () => void;
  className?: string;
}

export function QuickActionCard({
  icon,
  title,
  subtitle,
  accent,
  onClick,
  className = "",
}: QuickActionCardProps) {
  const colors = accentColors[accent];
  return (
    <div
      className={`quick-action-card animate-in ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      style={{ boxShadow: `0 4px 12px ${colors.shadow}` }}
    >
      <div
        className="quick-action-icon"
        style={{ backgroundColor: colors.bg, color: colors.base }}
      >
        {icon}
      </div>
      <p className="quick-action-title line-clamp-2">{title}</p>
      {subtitle && <p className="quick-action-subtitle line-clamp-1">{subtitle}</p>}
    </div>
  );
}

// ─── UpcomingPaymentCard ───────────────────────────────────────────────────────
// Mobil upcoming_payment_card.dart'ın web karşılığı
import { getDueDateText } from "@/lib/design-tokens";

interface UpcomingPaymentCardProps {
  title:             string;
  amount:            number;
  dueDate:           string;
  installmentNumber: number;
  onClick?:          () => void;
  className?:        string;
}

export function UpcomingPaymentCard({
  title,
  amount,
  dueDate,
  installmentNumber,
  onClick,
  className = "",
}: UpcomingPaymentCardProps) {
  const { text: dateText, isOverdue } = getDueDateText(dueDate);
  const accentColor = isOverdue ? "#D32F2F" : "#F57C00";
  const accentBg    = isOverdue ? "rgba(211, 47, 47, 0.10)" : "rgba(245, 124, 0, 0.10)";
  const borderColor = isOverdue ? "rgba(211, 47, 47, 0.25)" : "var(--color-border)";

  return (
    <div
      className={`payment-card animate-in ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
      style={{ borderColor }}
    >
      {/* İkon */}
      <div
        className="flex items-center justify-center rounded-small flex-shrink-0"
        style={{ width: 44, height: 44, backgroundColor: accentBg, color: accentColor }}
      >
        {isOverdue ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        )}
      </div>

      {/* İçerik */}
      <div className="flex-1 min-w-0">
        <p className="text-title-sm text-text-primary line-clamp-1">{title}</p>
        <p className="text-caption text-text-secondary mt-xs">Taksit {installmentNumber}</p>
        <p className="text-caption font-medium mt-xs" style={{ color: accentColor }}>
          {dateText}
        </p>
      </div>

      {/* Tutar + ok */}
      <div className="flex flex-col items-end gap-xs flex-shrink-0">
        <p className="text-title-md font-bold" style={{ color: isOverdue ? "#D32F2F" : "var(--color-primary)" }}>
          {amount.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
        </p>
        {onClick && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-text-tertiary">
            <path d="M9 18l6-6-6-6" />
          </svg>
        )}
      </div>
    </div>
  );
}

// ─── ActivityTimelineItem ──────────────────────────────────────────────────────
// Mobil activity_timeline_item.dart'ın web karşılığı
import { formatRelativeDate } from "@/lib/design-tokens";

type ActivityType = "application" | "payment" | "policy";

interface Activity {
  id:       number | string;
  type:     ActivityType;
  title:    string;
  subtitle: string;
  date:     string;
  status?:  string;
}

interface ActivityTimelineItemProps {
  activity:   Activity;
  isLast?:    boolean;
  className?: string;
}

const activityConfig: Record<ActivityType, { color: string; bg: string; icon: React.ReactNode }> = {
  application: {
    color: "#4A90E2",
    bg: "rgba(74, 144, 226, 0.15)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  payment: {
    color: "#388E3C",
    bg: "rgba(56, 142, 60, 0.15)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  policy: {
    color: "#009688",
    bg: "rgba(0, 150, 136, 0.15)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
};

export function ActivityTimelineItem({ activity, isLast = false, className = "" }: ActivityTimelineItemProps) {
  const config = activityConfig[activity.type];
  const badgeClass = getBadgeClass(activity.status);
  const statusInfo = getStatusInfo(activity.status);

  return (
    <div className={`timeline-item animate-in ${className}`}>
      {/* Sol: nokta ve çizgi */}
      <div className="timeline-connector">
        <div
          className="timeline-dot"
          style={{ backgroundColor: config.bg, color: config.color }}
        >
          {config.icon}
        </div>
        {!isLast && <div className="timeline-line" />}
      </div>

      {/* Sağ: içerik */}
      <div className="timeline-content">
        <div className="flex items-start justify-between gap-sm">
          <p className="text-title-sm text-text-primary font-semibold flex-1 min-w-0 line-clamp-1">
            {activity.title}
          </p>
          {activity.status && (
            <span className={`${badgeClass} flex-shrink-0`}>
              {statusInfo.label || activity.status}
            </span>
          )}
        </div>
        <p className="text-body-sm text-text-secondary mt-xs">{activity.subtitle}</p>
        <div className="flex items-center gap-xs mt-sm text-caption text-text-tertiary">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {formatRelativeDate(activity.date)}
        </div>
      </div>
    </div>
  );
}

// ─── WelcomeHeader ─────────────────────────────────────────────────────────────
// Mobil welcome_header.dart'ın web karşılığı
import { getGreeting } from "@/lib/design-tokens";

interface WelcomeHeaderProps {
  userName:     string;
  onLogout?:    () => void;
  children?:    React.ReactNode;
  className?:   string;
}

export function WelcomeHeader({ userName, onLogout, children, className = "" }: WelcomeHeaderProps) {
  const greeting = getGreeting();
  return (
    <div className={`welcome-header ${className}`}>
      <div className="flex items-start justify-between gap-md">
        {/* Selamlama */}
        <div>
          <p className="text-sm font-normal" style={{ color: "rgba(255,255,255,0.85)" }}>
            Merhaba,
          </p>
          <h1 className="text-2xl font-bold text-white mt-xs truncate max-w-xs">
            {userName}
          </h1>
        </div>

        {/* Sağ aksiyonlar */}
        <div className="flex items-center gap-sm flex-shrink-0">
          {children}
          {onLogout && (
            <button
              onClick={onLogout}
              className="glass btn-icon rounded-medium text-white hover:bg-white/30 transition-colors"
              aria-label="Çıkış yap"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Zaman selaması */}
      <div className="mt-md inline-flex items-center gap-sm glass rounded-xlarge px-md py-xs">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
        <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>
          {greeting}
        </span>
      </div>
    </div>
  );
}

// ─── Re-export activity type for external use ──────────────────────────────────
export type { Activity, ActivityType };
