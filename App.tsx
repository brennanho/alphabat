import React, { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Main, CategorySelection, Game } from "@src/screens";
import { AppContextProvider } from "@src/store";
import { SCREENS } from "@src/constants";
import { FONTS } from "./assets";

LogBox.ignoreLogs(["Require cycles"]);

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    [FONTS.REGULAR.NAME]: FONTS.REGULAR.SOURCE,
    [FONTS.BOLD.NAME]: FONTS.BOLD.SOURCE,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <AppContextProvider>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureDirection: "vertical",
          }}
        >
          <Stack.Screen name={SCREENS.MAIN} component={Main} />
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
