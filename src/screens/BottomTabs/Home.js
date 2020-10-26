import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, ScrollView } from "react-native";
import { ListItem } from "react-native-elements";
import { styles } from "../../style/styles";
import { API, urlAsset } from "../../config/api";
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

  console.log(literatures);
  const renderItem = ({ item, index }) => {
    return (
      <ListItem key={item.id} bottomDivider>
        <ListItem.Content>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View>
              <Image
                style={styles.image}
                source={urlAsset.thumbnail + item.thumbnail}
              />
            </View>
            <View>
              <ListItem.Title style={styles.titleItem}>
                {item.title}
              </ListItem.Title>
            </View>
          </View>
        </ListItem.Content>
      </ListItem>
    );
  };
  return (
    <View>
      <ScrollView>
        <FlatList
          data={literatures}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
    </View>
  );
};

export default Home;
