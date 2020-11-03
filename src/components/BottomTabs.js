import React from "react";

import AddLiterature from "../screens/BottomTabs/AddLiterature";
import Home from "../screens/BottomTabs/Home";
import MyCollection from "../screens/BottomTabs/MyCollection";
import Profile from "../screens/BottomTabs/Profile";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import Icon3 from "react-native-vector-icons/FontAwesome";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
const createBottomTabs = createMaterialBottomTabNavigator();
//"#AF2E1C"
const BottomTabs = (props) => {
  return (
    <createBottomTabs.Navigator
      barStyle={{ backgroundColor: "#161616" }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name === "Home") {
            return (
              <Icon
                name={focused ? "home" : "home-outline"}
                size={25}
                color={focused ? "#AF2E1C" : "white"}
              />
            );
          } else if (route.name === "Add Literature") {
            return (
              <Icon2
                name={focused ? "add-circle" : "add-circle-outline"}
                color={focused ? "#AF2E1C" : "white"}
                size={25}
              />
            );
          } else if (route.name === "My Collection") {
            return (
              <Icon3
                name={focused ? "bookmark" : "bookmark-o"}
                size={25}
                color={focused ? "#AF2E1C" : "white"}
              />
            );
          } else if (route.name === "Profile") {
            return (
              <Icon2
                name={focused ? "person" : "person-outline"}
                size={25}
                color={focused ? "#AF2E1C" : "white"}
              />
            );
          }
        },
      })}
    >
      <createBottomTabs.Screen name="Home" component={Home} />
      <createBottomTabs.Screen
        name="Add Literature"
        component={AddLiterature}
      />
      <createBottomTabs.Screen name="My Collection" component={MyCollection} />
      <createBottomTabs.Screen name="Profile" component={Profile} />
    </createBottomTabs.Navigator>
  );
};

export default BottomTabs;
