import React from "react";
import { View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
import AddLiterature from "../screens/BottomTabs/AddLiterature";
import MyCollection from "../screens/BottomTabs/MyCollection";
import Profile from "../screens/BottomTabs/Profile";
import Search from "../screens/BottomTabs/Search";
import Home from "../screens/BottomTabs/Home";

const createBottomTab = createMaterialBottomTabNavigator();
const BottomTabs = () => {
  return (
    <createBottomTab.Navigator
      barStyle={{ backgroundColor: "#161616" }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name === "Home") {
            return (
              <MaterialCommunityIcons
                name={focused ? "home" : "home-outline"}
                size={25}
                color={focused ? "#AF2E1C" : "white"}
              />
            );
          } else if (route.name === "Add Literature") {
            return (
              <MaterialIcons
                name={focused ? "add-circle" : "add-circle-outline"}
                color={focused ? "#AF2E1C" : "white"}
                size={25}
              />
            );
          } else if (route.name === "My Collection") {
            return (
              <FontAwesome
                name={focused ? "bookmark" : "bookmark-o"}
                size={25}
                color={focused ? "#AF2E1C" : "white"}
              />
            );
          } else if (route.name === "Profile") {
            return (
              <MaterialIcons
                name={focused ? "person" : "person-outline"}
                size={25}
                color={focused ? "#AF2E1C" : "white"}
              />
            );
          }
        },
      })}
    >
      <createBottomTab.Screen name="Home" component={Home} />
      <createBottomTab.Screen name="Add Literature" component={AddLiterature} />
      <createBottomTab.Screen name="My Collection" component={MyCollection} />
      <createBottomTab.Screen name="Profile" component={Profile} />
    </createBottomTab.Navigator>
  );
};

export default BottomTabs;
