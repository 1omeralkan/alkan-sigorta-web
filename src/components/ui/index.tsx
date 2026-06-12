"use client";

import React from "react";

// ─── Button ────────────────────────────────────────────────────────────────────
type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize    = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:  ButtonVariant;
  size?:     ButtonSize;
  loading?:  boolean;
  icon?:     React.ReactNode;
  iconRight?: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  iconRight,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const variantClass: Record<ButtonVariant, string> = {
    primary:   "btn-primary",
    secondary: "btn-secondary",
    danger:    "btn-danger",
    ghost:     "btn-ghost",
  };
  const sizeClass: Record<ButtonSize, string> = {
    sm: "btn-sm",
    md: "btn-md",
    lg: "btn-lg",
  };

  return (
    <button
      className={`${variantClass[variant]} ${sizeClass[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className={`spinner ${size === "sm" ? "spinner-sm" : ""}`} />
      ) : icon ? (
        icon
      ) : null}
      {children}
      {iconRight && !loading && iconRight}
    </button>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
interface CardProps {
  children:    React.ReactNode;
  className?:  string;
  interactive?: boolean;
  onClick?:    () => void;
  padding?:    "none" | "sm" | "md" | "lg";
}

export function Card({
  children,
  className = "",
  interactive = false,
  onClick,
  padding = "md",
}: CardProps) {
  const paddingClass = { none: "", sm: "p-sm", md: "p-md", lg: "p-lg" }[padding];
  const base = interactive || onClick ? "card-interactive" : "card";
  return (
    <div
      className={`${base} ${paddingClass} ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
    >
      {children}
    </div>
  );
}

// ─── Badge ─────────────────────────────────────────────────────────────────────
type BadgeVariant = "pending" | "success" | "error" | "info" | "neutral";

interface BadgeProps {
  variant?:  BadgeVariant;
  children:  React.ReactNode;
  className?: string;
  dot?:      boolean;
}

export function Badge({ variant = "neutral", children, className = "", dot = false }: BadgeProps) {
  return (
    <span className={`badge-${variant} ${className}`}>
      {dot && (
        <span
          className="inline-block w-[6px] h-[6px] rounded-full"
          style={{ backgroundColor: "currentColor" }}
        />
      )}
      {children}
    </span>
  );
}

// ─── Input ─────────────────────────────────────────────────────────────────────
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?:      string;
  error?:      string;
  hint?:       string;
  leftIcon?:   React.ReactNode;
  rightIcon?:  React.ReactNode;
  containerClass?: string;
}

export function Input({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  containerClass = "",
  id,
  className = "",
  ...props
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className={`form-field ${containerClass}`}>
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
          {props.required && <span className="text-status-error ml-xs">*</span>}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="absolute left-md top-1/2 -translate-y-1/2 text-text-tertiary">
            {leftIcon}
          </span>
        )}
        <input
          id={inputId}
          className={`form-input ${leftIcon ? "pl-xl" : ""} ${rightIcon ? "pr-xl" : ""} ${error ? "error" : ""} ${className}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-md top-1/2 -translate-y-1/2 text-text-tertiary">
            {rightIcon}
          </span>
        )}
      </div>
      {error && (
        <p id={`${inputId}-error`} className="form-error" role="alert">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={`${inputId}-hint`} className="form-hint">
          {hint}
        </p>
      )}
    </div>
  );
}

// ─── Select ────────────────────────────────────────────────────────────────────
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?:    string;
  error?:    string;
  hint?:     string;
  options:   { value: string; label: string }[];
  containerClass?: string;
}

export function Select({
  label,
  error,
  hint,
  options,
  containerClass = "",
  id,
  className = "",
  ...props
}: SelectProps) {
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className={`form-field ${containerClass}`}>
      {label && (
        <label htmlFor={selectId} className="form-label">
          {label}
          {props.required && <span className="text-status-error ml-xs">*</span>}
        </label>
      )}
      <select
        id={selectId}
        className={`form-select ${error ? "error" : ""} ${className}`}
        aria-invalid={!!error}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="form-error" role="alert">{error}</p>}
      {hint && !error && <p className="form-hint">{hint}</p>}
    </div>
  );
}

// ─── Spinner / Loading ─────────────────────────────────────────────────────────
interface SpinnerProps {
  size?:      "sm" | "md" | "lg";
  color?:     string;
  className?: string;
}

export function Spinner({ size = "md", color = "var(--color-primary)", className = "" }: SpinnerProps) {
  const sizeClass = { sm: "spinner-sm", md: "", lg: "spinner-lg" }[size];
  return (
    <span
      className={`spinner ${sizeClass} ${className}`}
      style={{ borderColor: color, borderTopColor: "transparent" }}
      role="status"
      aria-label="Yükleniyor"
    />
  );
}

// ─── Skeleton ──────────────────────────────────────────────────────────────────
interface SkeletonProps {
  width?:     string | number;
  height?:    string | number;
  rounded?:   boolean;
  className?: string;
}

export function Skeleton({ width, height = "1rem", rounded = false, className = "" }: SkeletonProps) {
  return (
    <span
      className={`skeleton ${rounded ? "rounded-full" : "rounded-small"} block ${className}`}
      style={{ width: width ?? "100%", height }}
      aria-hidden="true"
    />
  );
}

// ─── Section Header ────────────────────────────────────────────────────────────
interface SectionHeaderProps {
  title:       string;
  icon?:       React.ReactNode;
  actionText?: string;
  onAction?:   () => void;
  className?:  string;
}

export function SectionHeader({ title, icon, actionText, onAction, className = "" }: SectionHeaderProps) {
  return (
    <div className={`section-header ${className}`}>
      <span className="section-header-title">
        {icon && <span className="text-primary">{icon}</span>}
        {title}
      </span>
      {actionText && onAction && (
        <button className="section-header-action" onClick={onAction}>
          {actionText}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}
    </div>
  );
}

// ─── Empty State ───────────────────────────────────────────────────────────────
interface EmptyStateProps {
  icon:         React.ReactNode;
  title:        string;
  description?: string;
  action?:      React.ReactNode;
  className?:   string;
}

export function EmptyState({ icon, title, description, action, className = "" }: EmptyStateProps) {
  return (
    <div className={`empty-state animate-in ${className}`}>
      <span className="empty-state-icon">{icon}</span>
      <p className="empty-state-title">{title}</p>
      {description && <p className="empty-state-description">{description}</p>}
      {action && <div className="mt-md">{action}</div>}
    </div>
  );
}

// ─── Alert ─────────────────────────────────────────────────────────────────────
type AlertVariant = "success" | "error" | "warning" | "info";

interface AlertProps {
  variant:    AlertVariant;
  title?:     string;
  children:   React.ReactNode;
  icon?:      React.ReactNode;
  onClose?:   () => void;
  className?: string;
}

const defaultAlertIcons: Record<AlertVariant, React.ReactNode> = {
  success: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  error: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  warning: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  info: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
};

export function Alert({ variant, title, children, icon, onClose, className = "" }: AlertProps) {
  return (
    <div className={`alert-${variant} ${className}`} role="alert">
      <span className="flex-shrink-0 mt-[1px]">{icon ?? defaultAlertIcons[variant]}</span>
      <div className="flex-1">
        {title && <p className="font-semibold text-sm mb-xs">{title}</p>}
        <div className="text-sm opacity-90">{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity p-xs rounded-small"
          aria-label="Kapat"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
}

// ─── Modal ─────────────────────────────────────────────────────────────────────
interface ModalProps {
  isOpen:     boolean;
  onClose:    () => void;
  title:      string;
  children:   React.ReactNode;
  footer?:    React.ReactNode;
  maxWidth?:  string;
}

export function Modal({ isOpen, onClose, title, children, footer, maxWidth = "max-w-md" }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={`modal-content ${maxWidth}`}>
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">{title}</h2>
          <button
            onClick={onClose}
            className="btn-icon text-text-secondary hover:text-text-primary"
            aria-label="Kapat"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div>{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

// ─── Progress Bar ───────────────────────────────────────────────────────────────
interface ProgressBarProps {
  value:      number; // 0-100
  color?:     string;
  className?: string;
  label?:     string;
}

export function ProgressBar({ value, color = "var(--color-primary)", className = "", label }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className={className}>
      {label && (
        <div className="flex justify-between text-caption text-text-secondary mb-xs">
          <span>{label}</span>
          <span>{clamped}%</span>
        </div>
      )}
      <div className="progress-bar" role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100}>
        <div className="progress-fill" style={{ width: `${clamped}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

// ─── Divider ───────────────────────────────────────────────────────────────────
interface DividerProps {
  className?: string;
  label?:     string;
}

export function Divider({ className = "", label }: DividerProps) {
  if (label) {
    return (
      <div className={`flex items-center gap-md ${className}`}>
        <hr className="divider flex-1" />
        <span className="text-caption text-text-tertiary whitespace-nowrap">{label}</span>
        <hr className="divider flex-1" />
      </div>
    );
  }
  return <hr className={`divider ${className}`} />;
}

// ─── Breadcrumb ─────────────────────────────────────────────────────────────────
interface BreadcrumbItem {
  label:  string;
  href?:  string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items:      BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={`breadcrumb ${className}`}>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            {idx > 0 && (
              <svg className="breadcrumb-separator" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            )}
            <span
              className={`breadcrumb-item ${isLast ? "active" : ""}`}
              onClick={!isLast ? item.onClick : undefined}
              role={!isLast && item.onClick ? "button" : undefined}
              tabIndex={!isLast && item.onClick ? 0 : undefined}
              aria-current={isLast ? "page" : undefined}
            >
              {item.label}
            </span>
          </React.Fragment>
        );
      })}
    </nav>
  );
}
