import React, { useState, useContext } from "react";
import {
  Text,
  View,
  ImageBackground,
  StatusBar,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Snackbar } from "react-native-paper";
import { UserContext } from "../context/userContext";
import { API, setAuthToken } from "../config/api";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import AsyncStorage from "@react-native-community/async-storage";
import { TypingAnimation } from "react-native-typing-animation";

import { styles } from "../style/styles";

export default function Signup(props) {
  const [typingEmail, setTypingEmail] = useState(false);
  const [typingPassword, setTypingPassword] = useState(false);
  const [typingfullname, setTypingfullname] = useState(false);
  const [typingPhone, setTypingPhone] = useState(false);
  const [typingAdress, setTypingAdress] = useState(false);
  const [state, dispatch] = useContext(UserContext);
  const [errorMsg, setErrorMsg] = useState("");
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const typing = () => {
    return <TypingAnimation dotColor="#AF2E1C" style={{ marginRight: 25 }} />;
  };

  const [registerAction, { isLoading, error }] = useMutation(async (values) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(values);

      try {
        const res = await API.post("/register", body, config);

        await AsyncStorage.setItem("token", res.data.data.token);

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: res.data.data,
        });

        setAuthToken(res.data.data.token);

        try {
          const res = await API.get("/auth");
          dispatch({
            type: "USER_LOADED",
            payload: res.data.data.user,
          });
        } catch (err) {
          setErrorMsg(err.response.data.message);
          dispatch({
            type: "AUTH_ERROR",
          });
          console.log(errorMsg);
          onToggleSnackBar();
        }
        props.navigation.navigate("BottomTabs");
      } catch (err) {
        setErrorMsg(err.response.data.message);
        dispatch({
          type: "LOGIN_FAILED",
        });
        console.log(errorMsg);
        onToggleSnackBar();
      }
    } catch (err) {
      setErrorMsg(err.response.data.message);
      console.log(errorMsg);
      onToggleSnackBar();
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
          <Text style={styles.login_signup}>Sign up</Text>
        </ImageBackground>
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
      <View style={styles.footer}>
        <ScrollView>
          <View style={{ marginTop: 50 }}>
            <Formik
              initialValues={{
                email: "",
                password: "",
                fullname: "",
                gender: "Male",
                phone: "",
                address: "",
                isAdmin: false,
                avatar: "default.png",
              }}
              onSubmit={(values) => registerAction(values)}
              validationSchema={Yup.object().shape({
                email: Yup.string().required("Email required").email(),
                password: Yup.string().required("Password Required").min(8),
                fullname: Yup.string().required().min(3),
                phone: Yup.string()
                  .matches(
                    /^[0-9]+$/,
                    "Phone only accepts input numbers from 0-9"
                  )
                  .required()
                  .min(10),
                address: Yup.string().required().min(5),
              })}
            >
              {({
                values,
                handleChange,
                errors,
                setFieldTouched,
                touched,
                handleSubmit,
                setFieldValue,
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
                        setTypingfullname(false);
                        setTypingPhone(false);
                        setTypingAdress(false);
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
                  <Text style={[styles.title, { marginTop: 20 }]}>
                    Password
                  </Text>
                  <View style={styles.action}>
                    <TextInput
                      placeholder="Your password..."
                      style={styles.TextInput}
                      onFocus={() => {
                        setTypingEmail(false);
                        setTypingPassword(true);
                        setTypingfullname(false);
                        setTypingPhone(false);
                        setTypingAdress(false);
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
                  <Text style={[styles.title, { marginTop: 20 }]}>
                    fullname
                  </Text>
                  <View style={styles.action}>
                    <TextInput
                      placeholder="fullname"
                      style={styles.TextInput}
                      onFocus={() => {
                        setTypingEmail(false);
                        setTypingPassword(false);
                        setTypingfullname(true);
                        setTypingPhone(false);
                        setTypingAdress(false);
                      }}
                      value={values.fullname}
                      onChangeText={handleChange("fullname")}
                      errorMessage={touched.fullname && errors.fullname}
                      onBlur={() => setFieldTouched("fullname")}
                    />
                    {typingfullname ? typing() : null}
                  </View>
                  {touched.fullname && errors.fullname ? (
                    <Text style={styles.errorTouch}>{errors.fullname}</Text>
                  ) : null}
                  <Text style={[styles.title, { marginTop: 20 }]}>Gender</Text>
                  <RNPickerSelect
                    value={values.gender}
                    onValueChange={(value) => setFieldValue("gender", value)}
                    items={[
                      { label: "Male", value: "Male" },
                      { label: "Female", value: "Female" },
                    ]}
                  />
                  <Text style={[styles.title, { marginTop: 20 }]}>
                    Phone Number
                  </Text>
                  <View style={styles.action}>
                    <TextInput
                      placeholder="Phone"
                      style={styles.TextInput}
                      onFocus={() => {
                        setTypingEmail(false);
                        setTypingPassword(false);
                        setTypingfullname(false);
                        setTypingPhone(true);
                        setTypingAdress(false);
                      }}
                      keyboardType="number-pad"
                      value={values.phone}
                      onChangeText={handleChange("phone")}
                      errorMessage={touched.phone && errors.phone}
                      onBlur={() => setFieldTouched("phone")}
                    />
                    {typingPhone ? typing() : null}
                  </View>
                  {touched.phone && errors.phone ? (
                    <Text style={styles.errorTouch}>{errors.phone}</Text>
                  ) : null}
                  <Text style={[styles.title, { marginTop: 20 }]}>Address</Text>
                  <View style={styles.action}>
                    <TextInput
                      placeholder="Address"
                      style={styles.TextInput}
                      onFocus={() => {
                        setTypingEmail(false);
                        setTypingPassword(false);
                        setTypingfullname(false);
                        setTypingPhone(false);
                        setTypingAdress(true);
                      }}
                      value={values.address}
                      onChangeText={handleChange("address")}
                      errorMessage={touched.address && errors.address}
                      onBlur={() => setFieldTouched("address")}
                    />
                    {typingAdress ? typing() : null}
                  </View>
                  {touched.address && errors.address ? (
                    <Text style={styles.errorTouch}>{errors.address}</Text>
                  ) : null}
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={handleSubmit}
                    //onPress={() => props.navigation.navigate("BottomTabs")}
                  >
                    <View style={styles.button}>
                      <Text style={styles.textLogin_Register}>
                        {isLoading ? <ActivityIndicator size="small" /> : null}
                        Sign up
                      </Text>
                    </View>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
            <TouchableOpacity
              style={styles.ButtonLogin_Register}
              onPress={() => props.navigation.navigate("Signin")}
            >
              <Text style={{ fontSize: "20px" }}>
                Have an account?, log in here
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
