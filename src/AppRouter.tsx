import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import { RootState, useAppDispatch } from "./state/store";
import { useSelector } from "react-redux";
import ProfileScrren from "./screens/ProfileScrren";
import { authInit } from "./state/slices/authSlice";
import { fireAuth } from "./config/FirebaseConfig";

const AppRouter = () => {
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.authSlice);
  const Stack = createNativeStackNavigator();
  const [loading, setLoading] = React.useState<boolean>(true);
  useEffect(() => {
    const subscription = fireAuth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(authInit(user));
      }
      setLoading(false);
    });
    return () => subscription();
  }, [user]);
  return (
    <>
      {loading ? (
        <View>
          <Text>Loading...</Text>
        </View>
      ) : (
        <NavigationContainer>
          {!user ? (
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator initialRouteName="home">
              <Stack.Screen name="home" component={HomeScreen} />
              <Stack.Screen name="profile" component={ProfileScrren} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      )}
    </>
  );
};

export default AppRouter;

const styles = StyleSheet.create({});
