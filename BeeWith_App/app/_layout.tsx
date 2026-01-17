import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

// Custom BeeWith theme
const BeeWithTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FFB800', // Yellow
    background: '#FFFFFF', // White
    card: '#FFFFFF', // White
    text: '#000000', // Black
    border: '#E0E0E0', // Light gray
    notification: '#FFB800', // Yellow
  },
};

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={BeeWithTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="dark" backgroundColor="#FFFFFF" />
    </ThemeProvider>
  );
}
