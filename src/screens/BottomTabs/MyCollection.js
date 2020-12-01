import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  FlatList,
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  RefreshControl,
  Text,
  ScrollView,
} from "react-native";
import { Header } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { UserContext } from "../../context/UserContext";
import { ContentCenter, Separator } from "../../styles/StyledComponents";
import { CardLiterature } from "../../components/CardLiterature";
import { API, urlAsset } from "../../config/Api";

const height = Dimensions.get("screen").height;
const MyCollection = (props) => {
  const [state, dispacth] = useContext(UserContext);
  const [literatures, setLiteratures] = useState([]);
  const [relations, setRelations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);
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
  }, [refreshing]);
  useEffect(() => {
    const loadRelation = async () => {
      try {
        setLoading(true);
        const res = await API.get("/relations");
        setRelations(res.data.data.loadRelations);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    loadRelation();
  }, [refreshing]);
  const founded = relations.find((item) => item.UserId === state.user.id);
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
        {founded === undefined ? (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <ContentCenter>
              <Separator height={`${height / 3}px`} />
              <AntDesign name="warning" size={58} color="#fac224" />
              <Text style={{ color: "white", fontSize: 18 }}>
                You don't have any collection
              </Text>
            </ContentCenter>
          </ScrollView>
        ) : loading ? (
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
            refreshControl={<RefreshControl onRefresh={onRefresh} />}
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
