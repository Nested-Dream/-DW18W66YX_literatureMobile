import styled from "styled-components/native";
import { Dimensions } from "react-native";

const width = Dimensions.get("screen").width;
//#fac224 kuning
//#f4f3f3 putih
//#272933 hitam
//#eb872d orange
//#eb872d clay pink

export const ContentCenter = styled.View((props) => ({
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  marginTop: props.marginT ? props.marginT : "0px",
  background: "transparent",
}));
export const Divider = styled.View`
  width: 10px;
`;
export const FormDivider = styled.View((props) => ({
  width: "100%",
  height: "2px",
  background: "#272933",
  marginBottom: props.marginB ? props.marginB : "30px",
  marginTop: props.marginT ? props.marginT : "5px",
}));
export const CustomButton = styled.TouchableOpacity((props) => ({
  width: props.width ? props.width : "80%",
  background: props.bg ? props.bg : "#272933",
  justifyContent: "space-between",
  flexDirection: "row",
  alignItems: "center",
  alignContent: "center",
  padding: props.padding ? props.padding : "10px 36px",
  borderRadius: props.borderR ? props.borderR : "45px",
}));
//Auth : [Login,Register]
export const ContainerAuth = styled.View`
  background: #fac224;
  align-items: center;
  justify-content: center;
  flex: 1;
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
export const Form = styled.View((props) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  padding: props.padding ? props.padding : "0px",
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
export const TextButton = styled.Text`
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

export const ListTittle = styled.Text((props) => ({
  color: "white",
  fontSize: props.fonS ? props.fonS : "16px",
}));

export const ListDesc = styled.Text((props) => ({
  color: "#808080",
  fontSize: props.fonS ? props.fonS : "16px",
}));
//Detail
export const DetailContent = styled.Text((props) => ({
  fontSize: "24px",
  color: props.color ? props.color : "white",
  fontWeight: props.bold ? props.bold : "normal",
  textAlign: "justify",
}));

export const DetailData = styled.Text`
  font-size: 22px;
  color: #808080;
`;
export const OverlayText = styled.Text`
  text-align: center;
  justify-content: center;
  align-items: center;
  align-content: center;
  font-size: 24px;
  color: #f4f3f3;
`;
