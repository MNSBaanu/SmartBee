import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

// iOS-style BeeWith theme
const BeeWithTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.light.accent, // BeeWith Yellow
    background: Colors.light.background, // iOS light gray
    card: Colors.light.secondaryBackground, // White cards
    text: Colors.light.label, // Black text
    border: Colors.light.separator, // iOS separator
    notification: Colors.light.accent, // Yellow notifications
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
        <Stack.Screen 
          name="modal" 
          options={{ 
            presentation: 'modal', 
            title: 'Modal',
            headerStyle: {
              backgroundColor: Colors.light.secondaryBackground,
            },
            headerTitleStyle: {
              color: Colors.light.label,
              fontSize: 17,
              fontWeight: '600',
            },
          }} 
        />
      </Stack>
      <StatusBar style="dark" backgroundColor={Colors.light.background} />
    </ThemeProvider>
  );
}
