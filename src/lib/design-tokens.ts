/**
 * Alkan Sigorta Web - Design Tokens
 *
 * Bu dosya, mobil uygulamadaki (Flutter) tasarım sisteminin
 * web eşdeğerini TypeScript sabitleri olarak tanımlar.
 *
 * Kaynak: alkan_sigorta_mobile/lib/core/constants/
 *   - app_colors.dart     → colors
 *   - app_sizes.dart      → spacing, radius, iconSizes, buttonHeights
 *   - app_text_styles.dart → typography
 *   - app_theme.dart      → componentTokens
 */

// ─── Color Palette ─────────────────────────────────────────────────────────────
export const colors = {
  // Ana renkler (AppColors.primary*)
  primary: {
    DEFAULT: "#1A3A5C",
    light:   "#2B4E73",
    dark:    "#0F2438",
  },
  // İkincil renkler (AppColors.secondary*)
  secondary: {
    DEFAULT: "#4A90E2",
    light:   "#7CB3F0",
    dark:    "#2868B8",
  },
  // Arkaplan renkleri
  background: {
    DEFAULT: "#FFFFFF",
    light:   "#F5F7FA",
  },
  surface: {
    DEFAULT: "#FFFFFF",
    variant: "#F0F2F5",
  },
  // Metin renkleri
  text: {
    primary:   "#1A1A1A",
    secondary: "#666666",
    tertiary:  "#999999",
    onPrimary: "#FFFFFF",
  },
  // Durum renkleri
  status: {
    error:   "#D32F2F",
    success: "#388E3C",
    warning: "#F57C00",
    info:    "#1976D2",
  },
  // Yardımcı
  divider:  "#E0E0E0",
  border:   "#E5E7EB",
  disabled: "#BDBDBD",
  shadow:   "rgba(0, 0, 0, 0.10)",
} as const;

// ─── Spacing (AppSizes: xs/sm/md/lg/xl/xxl) ────────────────────────────────────
export const spacing = {
  xs:  4,
  sm:  8,
  md:  16,
  lg:  24,
  xl:  32,
  xxl: 48,
} as const;

// Tailwind sınıflarında kullanmak için string versiyonlar
export const spacingClass = {
  xs:  "gap-xs   p-xs  px-xs  py-xs  m-xs  mx-xs  my-xs",
  sm:  "gap-sm   p-sm  px-sm  py-sm  m-sm  mx-sm  my-sm",
  md:  "gap-md   p-md  px-md  py-md  m-md  mx-md  my-md",
  lg:  "gap-lg   p-lg  px-lg  py-lg  m-lg  mx-lg  my-lg",
  xl:  "gap-xl   p-xl  px-xl  py-xl  m-xl  mx-xl  my-xl",
  xxl: "gap-xxl  p-xxl px-xxl py-xxl m-xxl mx-xxl my-xxl",
} as const;

// ─── Border Radius (AppSizes.radius*) ──────────────────────────────────────────
export const radius = {
  small:  "8px",
  medium: "12px",
  large:  "16px",
  xlarge: "24px",
} as const;

// ─── Icon Sizes (AppSizes.icon*) ───────────────────────────────────────────────
export const iconSizes = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
} as const;

// ─── Button Heights (AppSizes.buttonHeight*) ───────────────────────────────────
export const buttonHeights = {
  sm: 36,
  md: 48,
  lg: 56,
} as const;

// ─── Typography Scale (AppTextStyles.*) ───────────────────────────────────────
export const typography = {
  fontFamily: {
    primary: "'Inter', system-ui, -apple-system, sans-serif",
  },
  // Display (büyük başlıklar)
  displayLarge: {
    fontSize: "32px",
    fontWeight: 700,
    letterSpacing: "-0.031em",
    lineHeight: "1.2",
  },
  displayMedium: {
    fontSize: "28px",
    fontWeight: 700,
    letterSpacing: "-0.016em",
    lineHeight: "1.25",
  },
  displaySmall: {
    fontSize: "24px",
    fontWeight: 600,
    letterSpacing: "0",
    lineHeight: "1.3",
  },
  // Headline (başlıklar)
  headlineLarge: {
    fontSize: "22px",
    fontWeight: 600,
    letterSpacing: "0",
    lineHeight: "1.3",
  },
  headlineMedium: {
    fontSize: "20px",
    fontWeight: 600,
    letterSpacing: "0.009em",
    lineHeight: "1.4",
  },
  headlineSmall: {
    fontSize: "18px",
    fontWeight: 600,
    letterSpacing: "0.009em",
    lineHeight: "1.4",
  },
  // Title (alt başlıklar)
  titleLarge: {
    fontSize: "18px",
    fontWeight: 500,
    letterSpacing: "0.009em",
    lineHeight: "1.5",
  },
  titleMedium: {
    fontSize: "16px",
    fontWeight: 500,
    letterSpacing: "0.009em",
    lineHeight: "1.5",
  },
  titleSmall: {
    fontSize: "14px",
    fontWeight: 500,
    letterSpacing: "0.006em",
    lineHeight: "1.5",
  },
  // Body (içerik)
  bodyLarge: {
    fontSize: "16px",
    fontWeight: 400,
    letterSpacing: "0.031em",
    lineHeight: "1.6",
  },
  bodyMedium: {
    fontSize: "14px",
    fontWeight: 400,
    letterSpacing: "0.016em",
    lineHeight: "1.6",
  },
  bodySmall: {
    fontSize: "12px",
    fontWeight: 400,
    letterSpacing: "0.025em",
    lineHeight: "1.5",
  },
  // Label (etiket ve butonlar)
  labelLarge: {
    fontSize: "14px",
    fontWeight: 600,
    letterSpacing: "0.006em",
    lineHeight: "1.4",
  },
  labelMedium: {
    fontSize: "12px",
    fontWeight: 600,
    letterSpacing: "0.031em",
    lineHeight: "1.4",
  },
  labelSmall: {
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "0.031em",
    lineHeight: "1.4",
  },
  // Özel stiller
  caption: {
    fontSize: "12px",
    fontWeight: 400,
    letterSpacing: "0.025em",
    lineHeight: "1.4",
  },
  overline: {
    fontSize: "10px",
    fontWeight: 600,
    letterSpacing: "0.094em",
    lineHeight: "1.4",
    textTransform: "uppercase" as const,
  },
  button: {
    fontSize: "16px",
    fontWeight: 600,
    letterSpacing: "0.031em",
    lineHeight: "1",
  },
  appBarTitle: {
    fontSize: "18px",
    fontWeight: 600,
    letterSpacing: "0.009em",
    lineHeight: "1.4",
    color: colors.text.onPrimary,
  },
  inputLabel: {
    fontSize: "16px",
    fontWeight: 400,
    color: colors.text.secondary,
  },
  inputHint: {
    fontSize: "16px",
    fontWeight: 400,
    color: colors.text.tertiary,
  },
  inputError: {
    fontSize: "12px",
    fontWeight: 400,
    color: colors.status.error,
  },
} as const;

// ─── Shadow Tokens ─────────────────────────────────────────────────────────────
export const shadows = {
  card:         "0 2px 8px rgba(0, 0, 0, 0.10)",
  cardHover:    "0 4px 16px rgba(0, 0, 0, 0.14)",
  primary:      "0 4px 12px rgba(26, 58, 92, 0.30)",
  primaryHover: "0 6px 20px rgba(26, 58, 92, 0.40)",
  coloredBlue:  "0 4px 12px rgba(74, 144, 226, 0.25)",
  coloredGreen: "0 4px 12px rgba(56, 142, 60, 0.25)",
  coloredOrange:"0 4px 12px rgba(245, 124, 0, 0.25)",
} as const;

// ─── Animation Tokens ──────────────────────────────────────────────────────────
export const transitions = {
  fast:   "150ms cubic-bezier(0.4, 0, 0.2, 1)",
  normal: "250ms cubic-bezier(0.4, 0, 0.2, 1)",
  slow:   "350ms cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

// ─── Accent Color Presets (Dashboard kart renkleri) ────────────────────────────
export const accentColors = {
  blue:     { base: "#4A90E2", bg: "rgba(74, 144, 226, 0.12)",  shadow: "rgba(74, 144, 226, 0.25)"  },
  teal:     { base: "#009688", bg: "rgba(0, 150, 136, 0.12)",   shadow: "rgba(0, 150, 136, 0.25)"   },
  green:    { base: "#388E3C", bg: "rgba(56, 142, 60, 0.12)",   shadow: "rgba(56, 142, 60, 0.25)"   },
  orange:   { base: "#F57C00", bg: "rgba(245, 124, 0, 0.12)",   shadow: "rgba(245, 124, 0, 0.25)"   },
  purple:   { base: "#7B1FA2", bg: "rgba(123, 31, 162, 0.12)",  shadow: "rgba(123, 31, 162, 0.25)"  },
  red:      { base: "#D32F2F", bg: "rgba(211, 47, 47, 0.12)",   shadow: "rgba(211, 47, 47, 0.25)"   },
  indigo:   { base: "#303F9F", bg: "rgba(48, 63, 159, 0.12)",   shadow: "rgba(48, 63, 159, 0.25)"   },
  blueGrey: { base: "#546E7A", bg: "rgba(84, 110, 122, 0.12)",  shadow: "rgba(84, 110, 122, 0.25)"  },
} as const;

// ─── Activity / Status Color Mapping ──────────────────────────────────────────
export const statusColors = {
  PENDING:    { label: "Beklemede", color: colors.status.warning, bg: "rgba(245, 124, 0, 0.15)"  },
  BEKLEMEDE:  { label: "Beklemede", color: colors.status.warning, bg: "rgba(245, 124, 0, 0.15)"  },
  APPROVED:   { label: "Onaylandı", color: colors.status.success, bg: "rgba(56, 142, 60, 0.15)"  },
  ONAYLANDI:  { label: "Onaylandı", color: colors.status.success, bg: "rgba(56, 142, 60, 0.15)"  },
  REJECTED:   { label: "Reddedildi", color: colors.status.error,  bg: "rgba(211, 47, 47, 0.15)"  },
  REDDEDILDI: { label: "Reddedildi", color: colors.status.error,  bg: "rgba(211, 47, 47, 0.15)"  },
  PAID:       { label: "Ödendi",     color: colors.status.success, bg: "rgba(56, 142, 60, 0.15)"  },
  ODENDI:     { label: "Ödendi",     color: colors.status.success, bg: "rgba(56, 142, 60, 0.15)"  },
  ACTIVE:     { label: "Aktif",      color: colors.status.success, bg: "rgba(56, 142, 60, 0.15)"  },
  CANCELLED:  { label: "İptal",      color: colors.status.error,   bg: "rgba(211, 47, 47, 0.15)"  },
} as const;

export type StatusKey = keyof typeof statusColors;

/**
 * Verilen status string'ine göre renk ve etiket bilgisi döner.
 * Bilinmeyen status için varsayılan gri renk kullanır.
 */
export function getStatusInfo(status: string | null | undefined) {
  if (!status) return { label: "", color: colors.text.secondary, bg: "rgba(0,0,0,0.08)" };
  const key = status.toUpperCase() as StatusKey;
  return statusColors[key] ?? { label: status, color: colors.text.secondary, bg: "rgba(0,0,0,0.08)" };
}

// ─── Greeting Helper ───────────────────────────────────────────────────────────
/**
 * Saate göre karşılama mesajı döner (mobil _getGreeting() metodundan çevrildi)
 */
export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Günaydın";
  if (hour < 18) return "İyi günler";
  return "İyi akşamlar";
}

// ─── Date Formatting Helpers ───────────────────────────────────────────────────
/**
 * Tarihi göreceli formata çevirir (mobil _formatDate() metodundan çevrildi)
 */
export function formatRelativeDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Bugün";
    if (diffDays === 1) return "Dün";
    if (diffDays < 7)   return `${diffDays} gün önce`;
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  } catch {
    return dateStr;
  }
}

/**
 * Ödeme son tarihini açıklayan metin döner (mobil _getDateText() metodundan çevrildi)
 */
export function getDueDateText(dueDateStr: string): { text: string; isOverdue: boolean; daysLeft: number } {
  try {
    const dueDate = new Date(dueDateStr);
    const now = new Date();
    const isOverdue = dueDate < now;
    const daysLeft = Math.round((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (isOverdue)    return { text: "Gecikmiş!", isOverdue: true, daysLeft };
    if (daysLeft === 0) return { text: "Bugün son gün!", isOverdue: false, daysLeft };
    if (daysLeft === 1) return { text: "Yarın",          isOverdue: false, daysLeft };
    if (daysLeft <= 7)  return { text: `${daysLeft} gün kaldı`, isOverdue: false, daysLeft };
    return {
      text: `${dueDate.getDate()}.${dueDate.getMonth() + 1}.${dueDate.getFullYear()}`,
      isOverdue: false,
      daysLeft,
    };
  } catch {
    return { text: dueDateStr, isOverdue: false, daysLeft: 0 };
  }
}

// ─── Tailwind Class Helpers ────────────────────────────────────────────────────
/**
 * Badge variant'ına göre Tailwind class döner
 */
export function getBadgeClass(status: string | null | undefined): string {
  if (!status) return "badge-neutral";
  const key = status.toUpperCase();
  if (["APPROVED", "ONAYLANDI", "PAID", "ODENDI", "ACTIVE"].includes(key)) return "badge-success";
  if (["PENDING", "BEKLEMEDE"].includes(key))  return "badge-pending";
  if (["REJECTED", "REDDEDILDI", "CANCELLED"].includes(key)) return "badge-error";
  return "badge-neutral";
}
