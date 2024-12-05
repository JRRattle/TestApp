import { useEffect } from "react";
import { useFonts } from "expo-font";
import "react-native-url-polyfill/auto";
import { SplashScreen, Stack } from "expo-router";


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
      <Stack>
        <Stack.Screen name="/(tabs)/home" options={{ headerShown: false }} />
        <Stack.Screen name="/(tabs)/viewSchedule" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>  
  );
};

export default RootLayout;