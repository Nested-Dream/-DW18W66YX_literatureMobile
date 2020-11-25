import "react-native-gesture-handler";
import React from "react";
import Root from "./Root";
import { UserContextProvider } from "./src/context/UserContext";
export default function App() {
  return (
    <UserContextProvider>
      <Root />
    </UserContextProvider>
  );
}
