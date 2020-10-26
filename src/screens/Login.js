import React, { useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  StatusBar,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

import { TypingAnimation } from "react-native-typing-animation";

import { styles } from "../style/styles";

export default function Login(props) {
  const [typingEmail, setTypingEmail] = useState(false);
  const [typingPassword, setTypingPassword] = useState(false);

  const typing = () => {
    return <TypingAnimation dotColor="#AF2E1C" style={{ marginRight: 25 }} />;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <ImageBackground
          source={require("../image/header2.png")}
          style={styles.ImageBackground}
        >
          <ImageBackground
            source={require("../image/Vector.png")}
            style={styles.ImageIcon}
          ></ImageBackground>
          <Text style={styles.login_signup}>LOG IN</Text>
        </ImageBackground>
      </View>
      <View style={styles.footer}>
        <View style={{ marginTop: 50 }}>
          <Text style={styles.title}>E-mail</Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Your email..."
              style={styles.TextInput}
              onFocus={() => {
                setTypingEmail(true);
                setTypingPassword(false);
              }}
            />
            {typingEmail ? typing() : null}
          </View>
          <Text style={[styles.title, { marginTop: 20 }]}>Password</Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Your password..."
              style={styles.TextInput}
              onFocus={() => {
                setTypingPassword(true);
                setTypingEmail(false);
              }}
              secureTextEntry={true}
            />
            {typingPassword ? typing() : null}
          </View>
          <View
            style={styles.buttonContainer}
            onPress={() => props.navigation.navigate("Landing")}
          >
            <View style={styles.button}>
              <Text style={styles.textLogin_Register}>Login</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.ButtonLogin_Register}
            onPress={() => props.navigation.navigate("Signup")}
          >
            <Text style={{ fontSize: "20px" }}>
              Don't have account?, create one
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
