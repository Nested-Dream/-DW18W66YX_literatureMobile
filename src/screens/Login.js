import React, { useContext, useState } from "react";
import { Text, ActivityIndicator } from "react-native";
import { Snackbar } from "react-native-paper";
import { UserContext } from "../context/UserContext";
import { API, setAuthToken } from "../config/Api";
import { useMutation } from "react-query";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  ContainerAuth,
  ButtonAuth,
  TextButtonAuth,
  KanbanAuth,
  TextAuth,
  HaveAuth,
  TextInput,
  ContainerForm,
  Form,
  FormDivider,
  ChangeAuthScreen,
  UnderlinedText,
  Separator,
  ErrorTouch,
} from "../styles/StyledComponents";
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";

const Login = (props) => {
  const [state, dispatch] = useContext(UserContext);
  const [errorMsg, setErrorMsg] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const [loginAction, { isLoading, error }] = useMutation(async (values) => {
    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(values);
    try {
      const res = await API.post("/login", body, config);

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
        dispatch({
          type: "AUTH_ERROR",
        });
      }
    } catch (err) {
      setErrorMsg(err.response.data.message);
      onToggleSnackBar();
      console.log(err);
    }
    setLoading(false);
  });

  return (
    <ContainerAuth>
      <KanbanAuth>Welcome Back!</KanbanAuth>
      <TextAuth>Log In</TextAuth>
      <Separator />
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => loginAction(values)}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required("Email is a required field"),
          password: Yup.string()
            .min(8)
            .required("Password is a required field"),
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
            <ContainerForm>
              <Form>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="black"
                  value={values.email}
                  errorMessage={touched.email && errors.email}
                  onChangeText={handleChange("email")}
                  onBlur={() => setFieldTouched("email")}
                />
                <FontAwesome name="user" size={18} color="black" />
              </Form>
              {touched.email && errors.email ? (
                <ErrorTouch>{errors.email}</ErrorTouch>
              ) : null}
              <FormDivider />
              <Form>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="black"
                  secureTextEntry={true}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  errorMessage={touched.password && errors.password}
                  onBlur={() => setFieldTouched("password")}
                />
                <FontAwesome5 name="key" size={18} color="black" />
              </Form>
              {touched.password && errors.password ? (
                <ErrorTouch>{errors.password}</ErrorTouch>
              ) : null}
              <FormDivider marginB="20px" />
            </ContainerForm>
            <HaveAuth
            //onPress={() => props.navigation.navigate("handleForgetPassword")}
            >
              <Text>FORGOT PASSWORD?</Text>
            </HaveAuth>
            <Separator />
            <ButtonAuth
              onPress={handleSubmit}
              //onPress={() => props.navigation.navigate("Register")}
            >
              <TextButtonAuth>LOG IN</TextButtonAuth>
              {loading ? (
                <ActivityIndicator size="large" color="#fac224" />
              ) : (
                <Ionicons
                  name="ios-arrow-dropright"
                  size={42}
                  color="#fac224"
                />
              )}
            </ButtonAuth>
            <Separator height="50px" />
            <ChangeAuthScreen
              onPress={() => props.navigation.navigate("Register")}
            >
              <Text style={{ fontSize: 18 }}>New User? </Text>
              <UnderlinedText>REGISTER</UnderlinedText>
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

export default Login;
