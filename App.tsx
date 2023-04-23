import React from "react";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/state/store";
import AppRouter from "./src/AppRouter";

export default function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
