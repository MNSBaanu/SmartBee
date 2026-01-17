/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#FFB800'; // BeeWith Yellow
const tintColorDark = '#FFB800'; // BeeWith Yellow for dark mode too

export const Colors = {
  light: {
    text: '#000000', // Black text
    background: '#FFFFFF', // White background
    tint: tintColorLight,
    icon: '#666666', // Dark gray for icons
    tabIconDefault: '#666666',
    tabIconSelected: tintColorLight,
    cardBackground: '#FFFFFF', // White card backgrounds
    border: '#E0E0E0', // Light gray borders
    accent: '#FFB800', // Yellow accent
  },
  dark: {
    text: '#000000', // Keep black text even in dark mode
    background: '#FFFFFF', // Keep white background even in dark mode
    tint: tintColorDark,
    icon: '#666666',
    tabIconDefault: '#666666',
    tabIconSelected: tintColorDark,
    cardBackground: '#FFFFFF',
    border: '#E0E0E0',
    accent: '#FFB800',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
