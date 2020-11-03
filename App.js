import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabs from "./src/components/BottomTabs";
import Signin from "./src/screens/Signin";
import Signup from "./src/screens/Signup";

const Stack = createStackNavigator();

import { UserContextProvider } from "./src/context/userContext";
export default function App() {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="BottomTabs" component={BottomTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContextProvider>
  );
}
