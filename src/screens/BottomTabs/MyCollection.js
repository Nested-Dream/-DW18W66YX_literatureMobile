import React, { useState, useEffect, useContext } from "react";
import {
  FlatList,
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Header } from "react-native-elements";
import { UserContext } from "../../context/UserContext";
import { ContentCenter } from "../../styles/StyledComponents";
import { CardLiterature } from "../../components/CardLiterature";
import { API, urlAsset } from "../../config/Api";
const MyCollection = (props) => {
  const [literatures, setLiteratures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [state, dispacth] = useContext(UserContext);
  useEffect(() => {
    const loadLiterature = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/user/${state.user.id}`);
        setLiteratures(res.data.data.loadUser.literatures);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    loadLiterature();
  }, []);

  const renderItem = ({ item, index }) => {
    return (
      <CardLiterature
        key={item.id}
        image={urlAsset.photo + item.thumbnail}
        title={item.title}
        style={{
          backgroundColor: "#161616",
          width: Dimensions.get("window").width / 2 - 20,
          height: Dimensions.get("window").width,
        }}
        color="white"
        author={item.author}
        year={item.year}
        onPress={() => props.navigation.navigate("Detail", { id: item.id })}
      />
    );
  };
  return (
    <>
      <Header
        centerComponent={{
          text: "My Collection",
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
      <View style={styles.container}>
        {loading ? (
          <ContentCenter>
            <ActivityIndicator size="large" color="#fac224" />
          </ContentCenter>
        ) : (
          <FlatList
            data={literatures}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            refreshing={loading}
            numColumns={2}
          />
        )}
      </View>
    </>
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

export default MyCollection;
