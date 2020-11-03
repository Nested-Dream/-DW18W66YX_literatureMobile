import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Dimensions, View } from "react-native";
import { Header } from "react-native-elements";
import { ListItem } from "react-native-elements";
//import { styles } from "../../style/styles";
import { API, urlAsset } from "../../config/api";
import { CardLiterature } from "../../components/Card/CardLiterature";
const Home = () => {
  const [literatures, setLiteratures] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadLiterature = async () => {
      try {
        setLoading(true);
        const res = await API.get("/literature");
        setLiteratures(res.data.data.loadLiterature);
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
        image={urlAsset.thumbnail + item.thumbnail}
        title={item.title}
        style={{
          backgroundColor: "#161616",
          width: Dimensions.get("window").width / 2 - 20,
          //height: Dimensions.get("window").width,
        }}
        color="white"
        author={item.author}
        one={false}
        year={item.year}
        //onPress={() => props.navigation.navigate("Detail", { id: item.id })}
      />
    );
  };
  return (
    <>
      <Header
        centerComponent={{
          text: "All Literature",
          style: {
            color: "white",
            fontSize: 22,
            fontFamily: "Metropolis-Bold",
          },
        }}
        containerStyle={{
          borderBottomWidth: 0,
          backgroundColor: "#161616",
        }}
      />
      <View style={styles.container}>
        <FlatList
          data={literatures}
          renderItem={renderItem}
          refreshing={loading}
          keyExtractor={(item) => item.id}
          numColumns={2}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161616",
    //padding: 30,
    paddingTop: 0,
    paddingBottom: 0,
  },
});
export default Home;
