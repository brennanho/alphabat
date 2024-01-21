import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { LogBox } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Main, CategorySelection, Game } from "@src/screens";
import { AppContextProvider } from "@src/store";
import { SCREENS } from "@src/constants";
import { FONTS, loadAssets } from "./assets";
import { Assets } from "@src/types";

LogBox.ignoreLogs(["Require cycles", "(ADVICE)"]);

const Stack = createNativeStackNavigator();

const useAssets = () => {
  const [assets, setAssets] = useState({
    assets: null as Assets,
    loaded: false,
  });

  const downloadAssets = async () => {
    const assets = await loadAssets();
    setAssets({ assets, loaded: true });
  };

  useEffect(() => {
    downloadAssets();
  }, []);

  return assets;
};

export default function App() {
  const [fontsLoaded] = useFonts({
    [FONTS.REGULAR.NAME]: FONTS.REGULAR.SOURCE,
  });
  const { assets, loaded: assetsLoaded } = useAssets();

  if (!fontsLoaded || !assetsLoaded) {
    return null;
  }

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: { ...DefaultTheme.colors, background: "black" }, // Ensures background doesn't flicker when changing screens
      }}
    >
      <StatusBar style="auto" />
      <AppContextProvider assets={assets}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureDirection: "vertical",
          }}
        >
          <Stack.Screen name={SCREENS.main} component={Main} />
          <Stack.Screen
            name={SCREENS.CATEGORY_SELECTION}
            component={CategorySelection}
          />
          <Stack.Screen name={SCREENS.GAME} component={Game} />
        </Stack.Navigator>
      </AppContextProvider>
    </NavigationContainer>
  );
}
