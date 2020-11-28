import React, { useState, useContext } from "react";
import { Text, StyleSheet, ActivityIndicator } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Snackbar } from "react-native-paper";
import { useMutation } from "react-query";
import { Formik } from "formik";
import * as Yup from "yup";
import { UserContext } from "../context/UserContext";
import { API, setAuthToken } from "../config/Api";
import {
  ContainerAuth,
  CustomButton,
  TextButton,
  KanbanAuth2,
  TextAuth,
  TextInput,
  ContainerForm,
  FormDivider,
  ChangeAuthScreen,
  UnderlinedText,
  Separator,
  ErrorTouch,
} from "../styles/StyledComponents";
import { Ionicons } from "@expo/vector-icons";
const Register = (props) => {
  const [state, dispatch] = useContext(UserContext);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const [registerAction, { isLoading, error }] = useMutation(async (values) => {
    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(values);
    try {
      const res = await API.post("/register", body, config);

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

        props.navigation.navigate("BottomTabs");
      } catch (err) {
        setErrorMsg(err.response.data.message);
        dispatch({
          type: "AUTH_ERROR",
        });
        onToggleSnackBar();
      }
    } catch (err) {
      setErrorMsg(err.response.data.message);
      dispatch({
        type: "LOGIN_FAIL",
      });
      onToggleSnackBar();
    }
    setLoading(false);
  });
  return (
    <ContainerAuth>
      <TextAuth>Register</TextAuth>
      <Separator height="25px" />
      <KanbanAuth2>
        Register and receive unlimited access to all of your literature - share
        your literature.
      </KanbanAuth2>
      <Separator height="45px" />
      <Formik
        initialValues={{
          email: "",
          password: "",
          fullname: "",
          gender: "Male",
          phone: "",
          address: "",
          isAdmin: false,
          avatar: "Literature_Project/avatars/default.png",
        }}
        onSubmit={(values) => registerAction(values)}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .required("Email is a required field")
            .email("Email must be a valid email"),
          password: Yup.string()
            .required("Password is a required field")
            .min(8, "Password must be at least 3 characters"),
          fullname: Yup.string()
            .required("Fullname is a required field")
            .min(3, "Fullname must be at least 3 characters"),
          phone: Yup.string()
            .matches(/^[0-9]+$/, "Phone only accepts input numbers from 0-9")
            .required("Phone is a required field")
            .min(10, "Phone must be at least 10 characters"),
          address: Yup.string()
            .required("Address is a required field")
            .min(5, "Address must be at least 5 characters"),
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
            <ContainerForm>
              <TextInput
                placeholder="Email"
                placeholderTextColor="black"
                value={values.email}
                onChangeText={handleChange("email")}
                errorMessage={touched.email && errors.email}
                onBlur={() => setFieldTouched("email")}
              />
              {touched.email && errors.email ? (
                <ErrorTouch>{errors.email}</ErrorTouch>
              ) : null}
              <FormDivider marginB="20px" />
              <TextInput
                placeholder="Password"
                placeholderTextColor="black"
                secureTextEntry={true}
                value={values.password}
                onChangeText={handleChange("password")}
                errorMessage={touched.password && errors.password}
                onBlur={() => setFieldTouched("password")}
              />
              {touched.password && errors.password ? (
                <ErrorTouch>{errors.password}</ErrorTouch>
              ) : null}
              <FormDivider marginB="20px" />
              <TextInput
                placeholder="Fullname"
                placeholderTextColor="black"
                value={values.fullname}
                onChangeText={handleChange("fullname")}
                errorMessage={touched.fullname && errors.fullname}
                onBlur={() => setFieldTouched("fullname")}
              />
              {touched.fullname && errors.fullname ? (
                <ErrorTouch>{errors.fullname}</ErrorTouch>
              ) : null}
              <FormDivider marginB="20px" />
              <RNPickerSelect
                value={values.gender}
                onValueChange={(value) => setFieldValue("gender", value)}
                items={[
                  { label: "Male", value: "Male" },
                  { label: "Female", value: "Female" },
                ]}
                style={pickerStyle}
              />
              <FormDivider marginB="20px" />
              <TextInput
                placeholder="Phone"
                placeholderTextColor="black"
                keyboardType="number-pad"
                value={values.phone}
                onChangeText={handleChange("phone")}
                errorMessage={touched.phone && errors.phone}
                onBlur={() => setFieldTouched("phone")}
              />
              {touched.phone && errors.phone ? (
                <ErrorTouch>{errors.phone}</ErrorTouch>
              ) : null}
              <FormDivider marginB="20px" />
              <TextInput
                placeholder="Address"
                placeholderTextColor="black"
                multiline={true}
                value={values.address}
                onChangeText={handleChange("address")}
                errorMessage={touched.address && errors.address}
                onBlur={() => setFieldTouched("address")}
              />
              {touched.address && errors.address ? (
                <ErrorTouch>{errors.address}</ErrorTouch>
              ) : null}
              <FormDivider marginB="40px" />
            </ContainerForm>
            <CustomButton
              onPress={handleSubmit}
              //onPress={() => props.navigation.navigate("Login")}
            >
              <TextButton>REGISTER</TextButton>
              {loading ? (
                <ActivityIndicator size="large" color="#fac224" />
              ) : (
                <Ionicons
                  name="ios-arrow-dropright"
                  size={42}
                  color="#fac224"
                />
              )}
            </CustomButton>
            <Separator height="10px" />
            <ChangeAuthScreen
              onPress={() => props.navigation.navigate("Login")}
            >
              <Text style={{ fontSize: 18 }}>Have an account? </Text>
              <UnderlinedText>LOGIN</UnderlinedText>
            </ChangeAuthScreen>
          </>
        )}
      </Formik>
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
    </ContainerAuth>
  );
};

const pickerStyle = StyleSheet.create({
  input: {
    fontSize: 18,
    color: "black",
    fontFamily: "serif",
  },
});
export default Register;
