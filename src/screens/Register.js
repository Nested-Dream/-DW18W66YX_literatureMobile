import React from "react";
import { Text, Image } from "react-native";
import {
  ContainerAuth,
  ButtonAuth,
  TextButtonAuth,
  KanbanAuth2,
  TextAuth,
  TextInput,
  ContainerForm,
  FormDivider,
  ChangeAuthScreen,
  UnderlinedText,
  Separator,
} from "../styles/StyledComponents";
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
const Register = (props) => {
  return (
    <ContainerAuth>
      <TextAuth>Register</TextAuth>
      <Separator height="25px">
        <Image source={require("../images/Vector.png")} />
      </Separator>
      <KanbanAuth2>
        Register and receive unlimited access to all of your literature - share
        your literature.
      </KanbanAuth2>
      <Separator height="45px" />
      <ContainerForm>
        <TextInput placeholder="Email" placeholderTextColor="black" />
        <FormDivider marginB="20px" />
        <TextInput
          placeholder="Password"
          placeholderTextColor="black"
          secureTextEntry={true}
        />
        <FormDivider marginB="20px" />
        <TextInput placeholder="Fullname" placeholderTextColor="black" />
        <FormDivider marginB="20px" />
        <TextInput
          placeholder="Phone"
          placeholderTextColor="black"
          keyboardType="number-pad"
        />
        <FormDivider marginB="20px" />
        <TextInput
          placeholder="Address"
          placeholderTextColor="black"
          multiline={true}
        />
        <FormDivider marginB="40px" />
      </ContainerForm>
      <ButtonAuth onPress={() => props.navigation.navigate("Login")}>
        <TextButtonAuth>REGISTER</TextButtonAuth>
        <Ionicons name="ios-arrow-dropright" size={42} color="#fac224" />
      </ButtonAuth>
      <Separator height="10px" />
      <ChangeAuthScreen onPress={() => props.navigation.navigate("Login")}>
        <Text style={{ fontSize: 18 }}>Have an account? </Text>
        <UnderlinedText>LOGIN</UnderlinedText>
      </ChangeAuthScreen>
    </ContainerAuth>
  );
};

export default Register;
