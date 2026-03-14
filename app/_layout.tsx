import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native'; // Added View for the background
import useThemeStore from '../src/store/useThemeStore'; // Import your store

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colors } = useThemeStore(); // Access your theme colors

  const [loaded, error] = useFonts({
    'MyCustomFont': require('../assets/images/fonts/Font.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    // We wrap everything in a View so the background color updates globally
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Stack 
        screenOptions={{ 
          headerShown: false,
          contentStyle: { backgroundColor: colors.background } // Applies theme to all screens
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="register" />
        <Stack.Screen name="setup" />
        <Stack.Screen name="home" />
      </Stack>
    </View>
  );
}