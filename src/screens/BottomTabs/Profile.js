import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Avatar, Accessory, Header } from "react-native-elements";

import { useQuery } from "react-query";
import {
  Ionicons,
  MaterialIcons,
  Feather,
  FontAwesome5,
  Entypo,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../../context/UserContext";
import { API, urlAsset } from "../../config/Api";
import {
  ContentCenter,
  CustomButton,
  TextButton,
  Separator,
  ListContainer,
  ListContent,
  ListDetail,
  ListTittle,
  ListDesc,
} from "../../styles/StyledComponents";

const Profile = (props) => {
  const [state, dispatch] = useContext(UserContext);
  const { isLoading, error, data: User, refetch } = useQuery(
    "loadProfile",
    () => API.get(`/user/${state.user.id}`)
  );
  const islogout = async () => {
    await AsyncStorage.removeItem("token");
    props.navigation.navigate("Login");
    return dispatch({
      type: "LOGOUT",
    });
  };
  return (
    <View style={styles.container}>
      <Header
        centerComponent={{
          text: "Profile",
          style: {
            color: "white",
            fontSize: 22,
          },
        }}
        containerStyle={{
          borderBottomWidth: 0,
          backgroundColor: "#161616",
        }}
      />
      <ContentCenter>
        {state.user === undefined || isLoading ? (
          <ActivityIndicator size="large" color="#fac224" />
        ) : (
          <>
            <Avatar
              size="large"
              rounded
              source={{
                uri: urlAsset.photo + User.data.data.loadUser?.avatar,
              }}
            >
              <Accessory
                size={28}
                color="#fac224"
                style={{ backgroundColor: "#272933" }}
              />
            </Avatar>
            <Separator height="42px" />
            <ListContainer>
              <ListContent>
                <MaterialIcons name="email" size={32} color="#fac224" />
                <ListDetail>
                  <ListTittle>Email</ListTittle>
                  <ListDesc>{state.user?.email}</ListDesc>
                </ListDetail>
              </ListContent>
              <Separator height="15px" />
              <ListContent>
                <FontAwesome5 name="transgender" size={32} color="#fac224" />
                <ListDetail marginL="28px">
                  <ListTittle>Gender</ListTittle>
                  <ListDesc>{state.user?.gender}</ListDesc>
                </ListDetail>
              </ListContent>
              <Separator height="15px" />
              <ListContent>
                <Feather name="phone" size={32} color="#fac224" />
                <ListDetail>
                  <ListTittle>Phone</ListTittle>
                  <ListDesc>{state.user?.phone}</ListDesc>
                </ListDetail>
              </ListContent>
              <Separator height="15px" />
              <ListContent>
                <Entypo name="address" size={32} color="#fac224" />
                <ListDetail>
                  <ListTittle>Address</ListTittle>
                  <ListDesc>{state.user?.address}</ListDesc>
                </ListDetail>
              </ListContent>
            </ListContainer>
            <Separator height="50px" />
            <CustomButton onPress={() => islogout()}>
              <TextButton>LOG OUT</TextButton>
              <Ionicons name="ios-arrow-dropright" size={42} color="#fac224" />
            </CustomButton>
          </>
        )}
      </ContentCenter>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161616",
    paddingTop: 0,
    paddingBottom: 0,
  },
});

export default Profile;
