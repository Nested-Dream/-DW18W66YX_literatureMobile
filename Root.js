import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LogBox } from "react-native";
import { UserContext } from "./src/context/UserContext";
import { API, setAuthToken } from "./src/config/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import BottomTabs from "./src/components/BottomTabs";
import Detail from "./src/screens/Detail";

LogBox.ignoreLogs(["Setting a timer"]);

const Stack = createStackNavigator();

const storage = AsyncStorage || localStorage;
if (storage.token) setAuthToken(storage.token);

const Root = () => {
  const [state, dispatch] = useContext(UserContext);
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await API.get("/auth");
        dispatch({
          type: "USER_LOADED",
          payload: res.data.data.user,
        });
      } catch (error) {
        dispatch({
          type: "AUTH_ERROR",
        });
      }
    };
    loadUser();
  }, []);
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#fac224" barStyle="dark-content" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
        <Stack.Screen name="Detail" component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
