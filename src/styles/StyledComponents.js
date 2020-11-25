import styled from "styled-components/native";
import { Dimensions } from "react-native";

const width = Dimensions.get("screen").width;
//#fac224 kuning
//#f4f3f3 putih
//#272933 hitam
//#eb872d orange
//#eb872d clay pink

export const ContentCenter = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: transparent;
`;

//Auth : [Login,Register]
export const ContainerAuth = styled.View`
  background: #fac224;
  align-items: center;
  justify-content: center;
  flex: 1;
`;
export const ButtonAuth = styled.TouchableOpacity`
  width: 80%;
  background: #272933;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  align-content: center;
  padding: 10px 36px;
  border-radius: 45px;
`;
export const HaveAuth = styled.TouchableOpacity`
  align-items: flex-end;
  align-content: flex-end;
  width: 80%;
`;
export const ChangeAuthScreen = styled.TouchableOpacity`
  align-items: center;
  align-content: center;
  flex-direction: row;
`;
export const ContainerForm = styled.View`
  width: 80%;
`;
export const Form = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const FormDivider = styled.View((props) => ({
  width: "100%",
  height: "2px",
  background: "#272933",
  marginBottom: props.marginB ? props.marginB : "30px",
  marginTop: props.marginT ? props.marginT : "5px",
}));
export const Separator = styled.View((props) => ({
  height: props.height ? props.height : "100px",
}));
export const TextInput = styled.TextInput`
  align-items: flex-start;
  align-self: flex-start;
  justify-content: center;
  font-size: 18px;
`;
export const UnderlinedText = styled.Text`
  text-decoration: underline;
  font-size: 18px;
`;
export const TextAuth = styled.Text`
  text-align: center;
  color: #272933;
  font-weight: bold;
  font-size: 42px;
`;
export const KanbanAuth = styled.Text`
  text-align: center;
  color: #272933;
  font-weight: 300;
  font-size: 42px;
`;
export const KanbanAuth2 = styled.Text`
  text-align: center;
  color: #272933;
  font-weight: 300;
  font-size: 18px;
  width: 90%;
`;
export const TextButtonAuth = styled.Text`
  font-size: 20px;
  color: #f4f3f3;
`;
export const ErrorTouch = styled.Text`
  color: red;
`;

//Profile
export const ListContainer = styled.View`
  width: 70%;
  background: #272933;
  border-radius: 10px;
  padding: 12px 36px;
`;
export const ListContent = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const ListDetail = styled.View((props) => ({
  maxWidth: "75%",
  marginLeft: props.marginL ? props.marginL : "20px",
}));
export const ListTittle = styled.Text`
  color: white;
`;
export const ListDesc = styled.Text`
  color: #808080;
`;
