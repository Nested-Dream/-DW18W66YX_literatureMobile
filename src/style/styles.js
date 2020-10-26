import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  titleItem: {
    fontFamily: "times news roman",
    fontWeight: "bold",
    fontSize: 24,
  },
  image: {
    width: 200,
    height: 270,
    borderRadius: 10,
  },
  containerBottomTabs: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  header: {
    flex: 2,
  },
  footer: {
    flex: 1.75,
    padding: 20,
  },
  ImageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  ImageIcon: {
    justifyContent: "center",
    alignItems: "center",
    width: 275,
    height: 52.5,
  },
  login_signup: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 50,
  },
  title: {
    color: "black",
    fontWeight: "bold",
  },
  action: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
  },
  TextInput: {
    flex: 1,
    marginTop: 5,
    marginBottom: 5,
    color: "gray",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#AF2E1C",
    paddingVertical: 10,
    marginTop: 30,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  textLogin_Register: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  ButtonLogin_Register: {
    color: "black",
    fontWeight: "bold",
    padding: 30,
    alignItems: "center",
  },
});
