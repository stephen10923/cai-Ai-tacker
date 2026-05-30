export const Colors = {
  // Backgrounds
  bg: '#0A0A0A',
  surface: '#141414',
  surfaceAlt: '#1C1C1C',
  card: '#1A1A1A',
  cardBorder: '#2A2A2A',

  // Brand
  primary: '#00FF87',
  primaryDim: 'rgba(0,255,135,0.15)',
  secondary: '#A78BFA',
  secondaryDim: 'rgba(167,139,250,0.15)',

  // Macros
  protein: '#FF6B6B',
  proteinDim: 'rgba(255,107,107,0.18)',
  carbs: '#FFD93D',
  carbsDim: 'rgba(255,217,61,0.18)',
  fat: '#6BCB77',
  fatDim: 'rgba(107,203,119,0.18)',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#9CA3AF',
  textMuted: '#4B5563',

  // UI
  border: '#252525',
  divider: '#1F1F1F',
  overlay: 'rgba(0,0,0,0.7)',

  // Streaks
  fire: '#FF6B35',
  gold: '#FFD700',
} as const;

export const FontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 38,
  '5xl': 48,
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 56,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999,
} as const;
