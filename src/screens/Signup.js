import React, { useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  StatusBar,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { TypingAnimation } from "react-native-typing-animation";

import { styles } from "../style/styles";
export default function Signup(props) {
  const [typingEmail, setTypingEmail] = useState(false);
  const [typingPassword, setTypingPassword] = useState(false);
  const [typingFullname, setTypingFullname] = useState(false);
  const [typingPhone, setTypingPhone] = useState(false);
  const [typingAdress, setTypingAdress] = useState(false);
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
          <Text style={styles.login_signup}>Signup</Text>
        </ImageBackground>
      </View>
      <View style={styles.footer}>
        <ScrollView>
          <View style={{ marginTop: 50 }}>
            <Text style={styles.title}>E-mail</Text>
            <View style={styles.action}>
              <TextInput
                placeholder="Your email..."
                style={styles.TextInput}
                onFocus={() => {
                  setTypingEmail(true);
                  setTypingPassword(false);
                  setTypingFullname(false);
                  setTypingPhone(false);
                  setTypingAdress(false);
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
                  setTypingEmail(false);
                  setTypingPassword(true);
                  setTypingFullname(false);
                  setTypingPhone(false);
                  setTypingAdress(false);
                }}
                secureTextEntry={true}
              />
              {typingPassword ? typing() : null}
            </View>
            <Text style={[styles.title, { marginTop: 20 }]}>Fullname</Text>
            <View style={styles.action}>
              <TextInput
                placeholder="Fullname"
                style={styles.TextInput}
                onFocus={() => {
                  setTypingEmail(false);
                  setTypingPassword(false);
                  setTypingFullname(true);
                  setTypingPhone(false);
                  setTypingAdress(false);
                }}
              />
              {typingFullname ? typing() : null}
            </View>
            <Text style={[styles.title, { marginTop: 20 }]}>Phone Number</Text>
            <View style={styles.action}>
              <TextInput
                placeholder="phone"
                style={styles.TextInput}
                onFocus={() => {
                  setTypingEmail(false);
                  setTypingPassword(false);
                  setTypingFullname(false);
                  setTypingPhone(true);
                  setTypingAdress(false);
                }}
                keyboardType="number-pad"
              />
              {typingPhone ? typing() : null}
            </View>
            <Text style={[styles.title, { marginTop: 20 }]}>Address</Text>
            <View style={styles.action}>
              <TextInput
                placeholder="Address"
                style={styles.TextInput}
                onFocus={() => {
                  setTypingEmail(false);
                  setTypingPassword(false);
                  setTypingFullname(false);
                  setTypingPhone(false);
                  setTypingAdress(true);
                }}
              />
              {typingAdress ? typing() : null}
            </View>
            <View
              style={styles.buttonContainer}
              onPress={() => props.navigation.navigate("Landing")}
            >
              <View style={styles.button}>
                <Text style={styles.textLogin_Register}>Register</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.ButtonLogin_Register}
              onPress={() => props.navigation.navigate("Login")}
            >
              <Text style={{ fontSize: "20px" }}>
                Have an account?, login here
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
