import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import Icon3 from "react-native-vector-icons/FontAwesome";

import Profile from "../screens/BottomTabs/Profile";
import Home from "../screens/BottomTabs/Home";
import AddLiterature from "../screens/BottomTabs/AddLiterature";
import MyCollection from "../screens/BottomTabs/MyCollection";
const createBottomTabs = createMaterialBottomTabNavigator();
const BottomTabs = (props) => {
  return (
    <createBottomTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name === "Home") {
            return <Icon name={focused ? "home" : "home-outline"} size={25} />;
          } else if (route.name === "Add Literature") {
            return (
              <Icon2
                name={focused ? "add-circle" : "add-circle-outline"}
                size={25}
              />
            );
          } else if (route.name === "My Collection") {
            return (
              <Icon3 name={focused ? "bookmark" : "bookmark-o"} size={25} />
            );
          } else if (route.name === "Profile") {
            return (
              <Icon2 name={focused ? "person" : "person-outline"} size={25} />
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
