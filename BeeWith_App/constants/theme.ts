/**
 * iOS-inspired design system for BeeWith App
 * Following Apple's Human Interface Guidelines
 */

import { Platform } from 'react-native';

const tintColorLight = '#FFB800'; // BeeWith Yellow
const tintColorDark = '#FFB800'; // BeeWith Yellow for dark mode too

export const Colors = {
  light: {
    text: '#000000', // Black text
    background: '#F2F2F7', // iOS light gray background
    cardBackground: '#FFFFFF', // White card backgrounds
    tint: tintColorLight,
    icon: '#8E8E93', // iOS gray for icons
    tabIconDefault: '#8E8E93',
    tabIconSelected: tintColorLight,
    border: '#C6C6C8', // iOS light border
    separator: '#C6C6C8', // iOS separator color
    accent: '#FFB800', // Yellow accent
    secondaryBackground: '#FFFFFF', // White for cards
    tertiaryBackground: '#F2F2F7', // Light gray for sections
    label: '#000000', // Primary label color
    secondaryLabel: '#3C3C43', // Secondary label (60% opacity)
    tertiaryLabel: '#3C3C4399', // Tertiary label (30% opacity)
    systemBlue: '#007AFF', // iOS system blue
    systemGreen: '#34C759', // iOS system green
    systemRed: '#FF3B30', // iOS system red
  },
  dark: {
    text: '#000000', // Keep black text even in dark mode
    background: '#F2F2F7', // Keep iOS light background
    cardBackground: '#FFFFFF',
    tint: tintColorDark,
    icon: '#8E8E93',
    tabIconDefault: '#8E8E93',
    tabIconSelected: tintColorDark,
    border: '#C6C6C8',
    separator: '#C6C6C8',
    accent: '#FFB800',
    secondaryBackground: '#FFFFFF',
    tertiaryBackground: '#F2F2F7',
    label: '#000000',
    secondaryLabel: '#3C3C43',
    tertiaryLabel: '#3C3C4399',
    systemBlue: '#007AFF',
    systemGreen: '#34C759',
    systemRed: '#FF3B30',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS San Francisco font family */
    regular: 'System',
    medium: 'System',
    semibold: 'System',
    bold: 'System',
    /** iOS font weights */
    weights: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  default: {
    regular: 'System',
    medium: 'System', 
    semibold: 'System',
    bold: 'System',
    weights: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
});

// iOS spacing system
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// iOS border radius
export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  round: 50,
};

// iOS shadows
export const Shadows = {
  small: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  medium: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  large: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
};
