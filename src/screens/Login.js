import React from "react";
import { Text } from "react-native";
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
} from "../styles/StyledComponents";
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
const Login = (props) => {
  return (
    <ContainerAuth>
      <KanbanAuth>Welcome Back!</KanbanAuth>
      <TextAuth>Log In</TextAuth>
      <Separator />
      <ContainerForm>
        <Form>
          <TextInput placeholder="Email" placeholderTextColor="black" />
          <FontAwesome name="user" size={18} color="black" />
        </Form>
        <FormDivider />
        <Form>
          <TextInput
            placeholder="Password"
            placeholderTextColor="black"
            secureTextEntry={true}
          />
          <FontAwesome5 name="key" size={18} color="black" />
        </Form>
        <FormDivider marginB="20px" />
      </ContainerForm>
      <HaveAuth
      //onPress={() => props.navigation.navigate("handleForgetPassword")}
      >
        <Text>FORGOT PASSWORD?</Text>
      </HaveAuth>
      <Separator />
      <ButtonAuth onPress={() => props.navigation.navigate("Register")}>
        <TextButtonAuth>LOG IN</TextButtonAuth>
        <Ionicons name="ios-arrow-dropright" size={42} color="#fac224" />
      </ButtonAuth>
      <Separator height="50px" />
      <ChangeAuthScreen onPress={() => props.navigation.navigate("Register")}>
        <Text style={{ fontSize: 18 }}>New User? </Text>
        <UnderlinedText>REGISTER</UnderlinedText>
      </ChangeAuthScreen>
    </ContainerAuth>
  );
};

export default Login;
