import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Main, CategorySelection, Game } from "@src/screens";
import { AppContextProvider } from "@src/store";
import { SCREENS } from "@src/constants";

const Stack = createNativeStackNavigator();

export default function App() {
  const options = {
    // Hide back navigation
    headerBackVisible: false,
    headerBackTitleVisible: false,
  };

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
          <Stack.Screen name={SCREENS.MAIN} component={Main} options={options} />
          <Stack.Screen
            name={SCREENS.CATEGORY_SELECTION}
            component={CategorySelection}
            options={options}
          />
          <Stack.Screen
            name={SCREENS.GAME}
            component={Game}
            options={options}
          />
        </Stack.Navigator>
      </AppContextProvider>
    </NavigationContainer>
  );
}
