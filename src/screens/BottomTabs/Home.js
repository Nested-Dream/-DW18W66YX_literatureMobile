import React, { useState, useEffect, useCallback } from "react";
import {
  FlatList,
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  RefreshControl,
  ScrollView,
  Text,
} from "react-native";
import { Header, SearchBar, Overlay } from "react-native-elements";
import { RadioButton } from "react-native-paper";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import {
  ContentCenter,
  Separator,
  OverlayText,
} from "../../styles/StyledComponents";
import { CardLiterature } from "../../components/CardLiterature";
import { API, urlAsset } from "../../config/Api";

const { width, height } = Dimensions.get("screen");

const Home = (props) => {
  const [literatures, setLiteratures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [title, setTitle] = useState("");
  const [selected, setSelected] = useState("Anytime");
  const [showOverlay, setShowhowOverlay] = useState(false);
  const toggleOverlay = () => {
    setShowhowOverlay(!showOverlay);
  };
  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);
  const updateSearch = (search) => {
    setTitle(search);
  };
  useEffect(() => {
    const loadLiterature = async () => {
      try {
        setLoading(true);
        if (selected === "Anytime") {
          if (title === "") {
            const res = await API.get("/literature");
            setLiteratures(res.data.data.loadLiterature);
          } else {
            const res = await API.get(`/filterLiterature/${title}`);
            setLiteratures(res.data.data.filterLiterature);
          }
        } else if (selected !== "Anytime") {
          const parseSelected = parseInt(selected);
          if (title !== "") {
            const res = await API.get(
              `/searchLiterature/${title}/${parseSelected}`
            );
            setLiteratures(res.data.data.literatures);
          } else {
            const res = await API.get(`/literatures/${parseSelected}`);
            setLiteratures(res.data.data.filterLiterature);
          }
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    loadLiterature();
  }, [title, selected]);
  console.log("ini title = " + title + "ini year = " + selected);
  const renderItem = ({ item, index }) => {
    return (
      <CardLiterature
        key={item.id}
        image={urlAsset.photo + item.thumbnail}
        title={item.title}
        style={{
          backgroundColor: "#161616",
          width: width / 2 - 20,
          height: width,
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
        leftComponent={
          <SearchBar
            placeholder="Search literature"
            cancelIcon={false}
            onChangeText={updateSearch}
            value={title}
            inputStyle={{
              color: "white",
            }}
            containerStyle={styles.containerSearchBar}
            round
          />
        }
        rightComponent={
          <MaterialIcons
            name="sort"
            size={42}
            color="#fac224"
            onPress={() => setShowhowOverlay(true)}
            style={{ width: width / 6, justifyContent: "center" }}
          />
        }
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
        ) : literatures.length === 0 ? (
          <ContentCenter>
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              <ContentCenter>
                <Separator height={`${height / 3}px`} />
                <AntDesign name="warning" size={58} color="#fac224" />
                <Text style={{ color: "white", fontSize: 18 }}>
                  There is no any literature in here
                </Text>
              </ContentCenter>
            </ScrollView>
          </ContentCenter>
        ) : (
          <FlatList
            data={literatures.filter((item) => item.status == "Approved")}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            refreshing={loading}
            numColumns={2}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>
      <Overlay
        overlayStyle={{
          backgroundColor: "#272933",
          borderRadius: 10,
          padding: width / 10,
        }}
        backdropStyle={{
          backgroundColor: "black",
          opacity: 0.5,
        }}
        isVisible={showOverlay}
        onBackdropPress={toggleOverlay}
      >
        <RadioButton.Group
          onValueChange={(value) => setSelected(value)}
          value={selected}
        >
          <RadioButton.Item
            label="Anytime"
            value="Anytime"
            labelStyle={{ color: "white" }}
          ></RadioButton.Item>
          <RadioButton.Item
            label="Since 2010"
            value="2010"
            labelStyle={{ color: "white" }}
          ></RadioButton.Item>
          <RadioButton.Item
            label="Since 2015"
            value="2015"
            labelStyle={{ color: "white" }}
          ></RadioButton.Item>
          <RadioButton.Item
            label="Since 2020"
            value="2020"
            labelStyle={{ color: "white" }}
          ></RadioButton.Item>
        </RadioButton.Group>
      </Overlay>
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
  containerSearchBar: {
    width: (3 * width) / 4,
    backgroundColor: "#161616",
  },
});

export default Home;
