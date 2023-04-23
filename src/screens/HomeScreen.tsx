import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { useAppDispatch } from "../state/store";
import { appLogout } from "../state/slices/authSlice";
import Chat from "../components/Chat";

const HomeScreen: React.FC<any> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  return (
    <View>
      <Text></Text>
      <Button
        title="logout"
        onPress={() => {
          navigation.navigate("Signup");
          dispatch(appLogout());
        }}
      />
      <Chat />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
