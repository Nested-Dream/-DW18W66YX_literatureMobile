import React from "react";
import { Dimensions } from "react-native";
import { View, Text } from "react-native";
import { Card } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";

const width = Dimensions.get("window").width;

export const CardLiterature = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} activeOpacity={1}>
      <Card
        containerStyle={{
          ...props.style,
          padding: 0,
          borderWidth: 0,
          marginHorizontal: 10,
          height: "auto",
        }}
      >
        <Card.Image
          source={{ uri: props.image }}
          style={{
            height: props.isOne ? width : width / 2,
            width: "100%",
            borderRadius: 5,
          }}
        />
        <Text
          style={{
            marginBottom: 10,
            color: props.color,
            fontSize: props.isOne ? 24 : 20,
            marginTop: props.isOne ? 10 : 5,
            textAlign: "justify",
          }}
        >
          {props.title}
        </Text>
        <View
          style={{
            color: "#929292",
            marginTop: -10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: "#929292",
              fontSize: 18,
              maxWidth: width / 3,
            }}
          >
            {props.author}
          </Text>
          <Text
            style={{
              color: "#929292",
              fontSize: 18,
            }}
          >
            {props.year}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};
