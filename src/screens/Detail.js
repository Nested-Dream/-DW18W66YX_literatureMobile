import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  ActivityIndicator,
} from "react-native";
import { Header, Overlay } from "react-native-elements";
import { useMutation } from "react-query";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { API, urlAsset } from "../config/Api";
import { UserContext } from "../context/UserContext";
import {
  ContentCenter,
  CustomButton,
  TextButton,
  Form,
  Divider,
  DetailContent,
  DetailData,
  Separator,
  OverlayText,
} from "../styles/StyledComponents";

import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const Detail = (props) => {
  const { id } = props.route.params;
  const [state, dispatch] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [loadingBookmark, setLoadingBookmark] = useState(false);
  const [literature, setLiterature] = useState([]);
  const [relations, setRelations] = useState([]);
  const [showOverlay, setShowhowOverlay] = useState(false);
  const [click, setClick] = useState(false);
  const toggleOverlay = () => {
    setShowhowOverlay(!showOverlay);
  };
  const [show, setShow] = useState("");
  const [FormData, setFormData] = useState({
    UserId: state.user.id,
    LiteratureId: id,
  });
  const { UserId, LiteratureId } = FormData;
  useEffect(() => {
    const getLiterature = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/literature/${id}`);
        setLiterature(res.data.data.detailLiterature);
        const response = await API.get("/relations");
        setRelations(response.data.data.loadRelations);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    getLiterature();
  }, []);
  useEffect(() => {
    const loadRelation = async () => {
      try {
        setLoadingBookmark(true);
        const res = await API.get("/relations");
        setRelations(res.data.data.loadRelations);
        setLoadingBookmark(false);
      } catch (err) {
        setLoadingBookmark(false);
        console.log(err);
      }
    };
    loadRelation();
    setClick(false);
  }, [click]);

  const [remove] = useMutation(async () => {
    try {
      setLoadingBookmark(true);
      const res = await API.delete(`/relation/${id}/${state.user.id}`);
      setLoadingBookmark(false);
      setClick(true);
      setShow("remove");
      setShowhowOverlay(true);
    } catch (err) {
      setLoadingBookmark(false);
      console.log(err);
    }
  });
  const [add] = useMutation(async () => {
    try {
      setLoadingBookmark(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({ LiteratureId, UserId });
      const res = await API.post("/relation", body, config);
      setLoadingBookmark(false);
      setClick(true);
      setShow("add");
      setShowhowOverlay(true);
    } catch (err) {
      setLoadingBookmark(false);
      console.log(err);
    }
  });
  const isBookmark = relations.filter(
    (item) => item.UserId == state.user.id && item.LiteratureId == id
  );
  return (
    <>
      <StatusBar style="light" backgroundColor="#272933" />
      <Header
        leftComponent={
          <Ionicons
            name="ios-arrow-dropleft"
            size={42}
            color="#fac224"
            onPress={() => props.navigation.goBack()}
          />
        }
        centerComponent={{
          text: "Detail Literature",
          style: {
            color: "white",
            fontSize: 22,
          },
        }}
        containerStyle={{
          borderBottomWidth: 0,
          backgroundColor: "#272933",
        }}
      />
      <View style={styles.container}>
        {loading ? (
          <ContentCenter>
            <ActivityIndicator size="large" color="#fac224" />
          </ContentCenter>
        ) : (
          <>
            <ScrollView style={{ flex: 1 }}>
              <Separator height="20px" />
              <ContentCenter>
                <Image
                  style={styles.Image}
                  source={{ uri: urlAsset.photo + literature.thumbnail }}
                />
                <View style={{ width: "90%", justifyContent: "flex-start" }}>
                  <Separator height="10px" />
                  <DetailContent>{literature?.title}</DetailContent>
                  <Separator height="5px" />
                  <DetailData>{literature?.author}</DetailData>
                  <Separator height="10px" />
                  <DetailContent bold="bold">Publication Date</DetailContent>
                  <Separator height="5px" />
                  <DetailData>
                    {literature?.month} {literature?.year}
                  </DetailData>
                  <Separator height="10px" />
                  <DetailContent bold="bold">Pages</DetailContent>
                  <Separator height="5px" />
                  <DetailData>{literature?.pages}</DetailData>
                  <Separator height="10px" />
                  <DetailContent bold="bold" color="#eb872d">
                    ISBN
                  </DetailContent>
                  <Separator height="5px" />
                  <DetailData>{literature?.ISBN}</DetailData>
                  <Separator height="10px" />
                </View>
              </ContentCenter>
            </ScrollView>
            <View style={{ flex: 1 / 7 }}>
              <ContentCenter>
                <View style={{ width: "90%" }}>
                  <Form>
                    <CustomButton width="50%" borderR="5px" padding="8px 16px">
                      <TextButton>Download</TextButton>
                      <AntDesign
                        name="clouddownload"
                        size={42}
                        color="#eb872d"
                      />
                    </CustomButton>
                    <Divider />
                    {isBookmark.length === 0 ? (
                      <CustomButton
                        width="50%"
                        borderR="5px"
                        padding="7px 14px"
                        onPress={() => {
                          add();
                          setShow("");
                        }}
                      >
                        <TextButton>Bookmark</TextButton>
                        {loadingBookmark ? (
                          <ActivityIndicator size="large" color="#fac224" />
                        ) : (
                          <MaterialCommunityIcons
                            name="bookmark"
                            size={42}
                            color="#eb872d"
                          />
                        )}
                      </CustomButton>
                    ) : (
                      <CustomButton
                        width="50%"
                        borderR="5px"
                        padding="7px 14px"
                        onPress={() => {
                          remove();
                          setShow("");
                        }}
                      >
                        <TextButton>Unbookmark</TextButton>
                        {loadingBookmark ? (
                          <ActivityIndicator size="large" color="#fac224" />
                        ) : (
                          <MaterialCommunityIcons
                            name="bookmark-check"
                            size={42}
                            color="#eb872d"
                          />
                        )}
                      </CustomButton>
                    )}
                    <Overlay
                      overlayStyle={{
                        backgroundColor: "#272933",
                        borderRadius: 10,
                        paddingLeft: 0,
                        paddingRight: 0,
                        paddingBottom: 40,
                        paddingTop: 50,
                      }}
                      backdropStyle={{
                        backgroundColor: "black",
                        opacity: 0.5,
                      }}
                      isVisible={showOverlay}
                      onBackdropPress={toggleOverlay}
                    >
                      <OverlayText>
                        {show === "remove"
                          ? "Your literature has been successfully removed from your collection"
                          : "Your literature has been successfully added to your collection"}
                      </OverlayText>
                    </Overlay>
                  </Form>
                </View>
              </ContentCenter>
            </View>
          </>
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
  Image: {
    width: "90%",
    height: 450,
    borderRadius: 10,
  },
});

export default Detail;
