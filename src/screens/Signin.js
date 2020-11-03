import React, { useContext, useState } from "react";
import { ActivityIndicator } from "react-native";
import { UserContext } from "../context/userContext";
import { API, setAuthToken } from "../config/api";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import AsyncStorage from "@react-native-community/async-storage";
import {
  Text,
  View,
  ImageBackground,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Snackbar } from "react-native-paper";
import { TypingAnimation } from "react-native-typing-animation";

import { styles } from "../style/styles";

export default function Signin(props) {
  const [typingEmail, setTypingEmail] = useState(false);
  const [typingPassword, setTypingPassword] = useState(false);
  const [state, dispatch] = useContext(UserContext);
  const [errorMsg, setErrorMsg] = useState("");
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const typing = () => {
    return <TypingAnimation dotColor="#AF2E1C" style={{ marginRight: 25 }} />;
  };

  const [loginAction, { isLoading, error }] = useMutation(async (values) => {
    try {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const body = values;

        const res = await API.post("/login", body, config);

        await AsyncStorage.setItem("token", res.data.data.token);

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: res.data.data,
        });

        //console.log(res.data.data.token);

        setAuthToken(res.data.data.token);

        try {
          const res = await API.get("/auth");
          dispatch({
            type: "USER_LOADED",
            payload: res.data.data.user,
          });
        } catch (err) {
          dispatch({
            type: "AUTH_ERROR",
          });
        }

        props.navigation.navigate("BottomTabs");
      } catch (err) {
        onToggleSnackBar();
        dispatch({
          type: "LOGIN_FAILED",
        });
        setErrorMsg(err.response.data.message);
      }
    } catch (err) {
      onToggleSnackBar();
      console.log(err);
      setErrorMsg(err.response.data.message);
    }
  });

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
          <Text style={styles.login_signup}>Sign in</Text>
        </ImageBackground>
      </View>
      <View style={styles.footer}>
        <View style={{ marginTop: 50 }}>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => loginAction(values)}
            validationSchema={Yup.object().shape({
              email: Yup.string().email().required(),
              password: Yup.string().min(8).required(),
            })}
          >
            {({
              values,
              handleChange,
              errors,
              setFieldTouched,
              touched,
              handleSubmit,
            }) => (
              <>
                <Text style={styles.title}>E-mail</Text>
                <View style={styles.action}>
                  <TextInput
                    placeholder="Your email..."
                    style={styles.TextInput}
                    onFocus={() => {
                      setTypingEmail(true);
                      setTypingPassword(false);
                    }}
                    value={values.email}
                    onChangeText={handleChange("email")}
                    errorMessage={touched.email && errors.email}
                    onBlur={() => setFieldTouched("email")}
                  />
                  {typingEmail ? typing() : null}
                </View>
                {touched.email && errors.email ? (
                  <Text style={styles.errorTouch}>{errors.email}</Text>
                ) : null}
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
                    value={values.password}
                    onChangeText={handleChange("password")}
                    errorMessage={touched.password && errors.password}
                    onBlur={() => setFieldTouched("password")}
                  />
                  {typingPassword ? typing() : null}
                </View>
                {touched.password && errors.password ? (
                  <Text style={styles.errorTouch}>{errors.password}</Text>
                ) : null}
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={handleSubmit}
                  //onPress={() => props.navigation.navigate("BottomTabs")}
                >
                  <View style={styles.button}>
                    <Text style={styles.textLogin_Register}>
                      {" "}
                      {isLoading ? <ActivityIndicator size="small" /> : null}
                      Sign in
                    </Text>
                  </View>
                </TouchableOpacity>
              </>
            )}
          </Formik>
          <TouchableOpacity
            style={styles.ButtonLogin_Register}
            onPress={() => props.navigation.navigate("Signup")}
          >
            <Text style={{ fontSize: "19px" }}>
              Don't have account?, create one
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {errorMsg ? (
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          action={{
            label: "X",
            onPress: () => onDismissSnackBar(),
          }}
        >
          {errorMsg}
        </Snackbar>
      ) : null}
    </View>
  );
}
