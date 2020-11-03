import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Header, Avatar } from "react-native-elements";
import { API, urlAsset } from "../../config/api";
import { UserContext } from "../../context/userContext";
import { useQuery } from "react-query";
import { styles } from "../../style/styles";
import { ActivityIndicator } from "react-native";
const Profile = () => {
  const [state, dispatch] = useContext(UserContext);
  console.log(state.user.id);
  const { isLoading, data: userDetail, refetch } = useQuery(
    "getUserDetail",
    () => API.get(`/user/${state.user.id}`)
  );
  const islogout = () => {
    return dispatch({
      type: "LOGOUT",
    });
  };
  return (
    <View style={inStyles.container}>
      <Header
        centerComponent={{
          text: "Profile",
          style: {
            color: "white",
            fontSize: 22,
            fontFamily: "Metropolis-Bold",
          },
        }}
        containerStyle={{
          backgroundColor: "#161616",
          borderBottomWidth: 0,
        }}
      />
      {isLoading ? (
        <View style={styles.containerBottomTabs}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <>
          <View style={styles.containerBottomTabs}>
            <Text style={{ color: "white" }}>Di sini Profile</Text>
            <Avatar
              size="large"
              rounded
              source={{
                uri: urlAsset.img + state.user?.avatar,
              }}
              title={state.user?.fullname}
            >
              <Accessory
                size={20}
                color="white"
                style={{ backgroundColor: "#A9A9A9" }}
              />
            </Avatar>
          </View>
        </>
      )}
    </View>
  );
};
const inStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161616",
    paddingTop: 0,
    paddingBottom: 0,
  },
});

export default Profile;
