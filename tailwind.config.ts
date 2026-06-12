import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── Color Tokens (mobil AppColors.dart'tan çevrildi) ─────────────────
      colors: {
        // Ana renkler
        primary: {
          DEFAULT: "#1A3A5C",
          light: "#2B4E73",
          dark: "#0F2438",
        },
        // İkincil renkler
        secondary: {
          DEFAULT: "#4A90E2",
          light: "#7CB3F0",
          dark: "#2868B8",
        },
        // Arkaplan renkleri
        background: {
          DEFAULT: "#FFFFFF",
          light: "#F5F7FA",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          variant: "#F0F2F5",
        },
        // Metin renkleri
        text: {
          primary: "#1A1A1A",
          secondary: "#666666",
          tertiary: "#999999",
          "on-primary": "#FFFFFF",
        },
        // Durum renkleri
        status: {
          error: "#D32F2F",
          success: "#388E3C",
          warning: "#F57C00",
          info: "#1976D2",
        },
        // Yardımcı renkler
        divider: "#E0E0E0",
        border: "#E5E7EB",
        disabled: "#BDBDBD",
      },

      // ─── Typography (mobil AppTextStyles.dart'tan çevrildi) ────────────────
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Display
        "display-lg": ["32px", { lineHeight: "1.2", letterSpacing: "-0.031em", fontWeight: "700" }],
        "display-md": ["28px", { lineHeight: "1.25", letterSpacing: "-0.016em", fontWeight: "700" }],
        "display-sm": ["24px", { lineHeight: "1.3", letterSpacing: "0", fontWeight: "600" }],
        // Headline
        "headline-lg": ["22px", { lineHeight: "1.3", letterSpacing: "0", fontWeight: "600" }],
        "headline-md": ["20px", { lineHeight: "1.4", letterSpacing: "0.009em", fontWeight: "600" }],
        "headline-sm": ["18px", { lineHeight: "1.4", letterSpacing: "0.009em", fontWeight: "600" }],
        // Title
        "title-lg": ["18px", { lineHeight: "1.5", letterSpacing: "0.009em", fontWeight: "500" }],
        "title-md": ["16px", { lineHeight: "1.5", letterSpacing: "0.009em", fontWeight: "500" }],
        "title-sm": ["14px", { lineHeight: "1.5", letterSpacing: "0.006em", fontWeight: "500" }],
        // Body
        "body-lg": ["16px", { lineHeight: "1.6", letterSpacing: "0.031em", fontWeight: "400" }],
        "body-md": ["14px", { lineHeight: "1.6", letterSpacing: "0.016em", fontWeight: "400" }],
        "body-sm": ["12px", { lineHeight: "1.5", letterSpacing: "0.025em", fontWeight: "400" }],
        // Label
        "label-lg": ["14px", { lineHeight: "1.4", letterSpacing: "0.006em", fontWeight: "600" }],
        "label-md": ["12px", { lineHeight: "1.4", letterSpacing: "0.031em", fontWeight: "600" }],
        "label-sm": ["11px", { lineHeight: "1.4", letterSpacing: "0.031em", fontWeight: "500" }],
        // Özel
        caption: ["12px", { lineHeight: "1.4", letterSpacing: "0.025em", fontWeight: "400" }],
        overline: ["10px", { lineHeight: "1.4", letterSpacing: "0.094em", fontWeight: "600" }],
        button: ["16px", { lineHeight: "1", letterSpacing: "0.031em", fontWeight: "600" }],
      },

      // ─── Spacing (mobil AppSizes.dart'tan çevrildi) ────────────────────────
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        xxl: "48px",
      },

      // ─── Border Radius (mobil AppSizes.dart'tan çevrildi) ──────────────────
      borderRadius: {
        small: "8px",
        medium: "12px",
        large: "16px",
        xlarge: "24px",
      },

      // ─── Box Shadow ─────────────────────────────────────────────────────────
      boxShadow: {
        card: "0 2px 8px rgba(0, 0, 0, 0.10)",
        "card-hover": "0 4px 16px rgba(0, 0, 0, 0.14)",
        primary: "0 4px 12px rgba(26, 58, 92, 0.30)",
        "primary-hover": "0 6px 20px rgba(26, 58, 92, 0.40)",
        "colored-blue": "0 4px 12px rgba(74, 144, 226, 0.25)",
        "colored-green": "0 4px 12px rgba(56, 142, 60, 0.25)",
        "colored-orange": "0 4px 12px rgba(245, 124, 0, 0.25)",
      },

      // ─── Icon Sizes ─────────────────────────────────────────────────────────
      width: {
        "icon-sm": "16px",
        "icon-md": "24px",
        "icon-lg": "32px",
        "icon-xl": "48px",
      },
      height: {
        "icon-sm": "16px",
        "icon-md": "24px",
        "icon-lg": "32px",
        "icon-xl": "48px",
        // Button heights
        "btn-sm": "36px",
        "btn-md": "48px",
        "btn-lg": "56px",
      },

      // ─── Animations ─────────────────────────────────────────────────────────
      transitionDuration: {
        fast: "150ms",
        normal: "250ms",
        slow: "350ms",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { opacity: "0", transform: "translateX(-16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "slide-in": "slide-in 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        shimmer: "shimmer 2s linear infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
