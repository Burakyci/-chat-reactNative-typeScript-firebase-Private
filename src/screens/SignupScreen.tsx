import { StyleSheet, Button, Text, TextInput, View } from "react-native";
import React from "react";
import { Formik } from "formik";

import { loginSchema, signupSchema } from "../helpers/validation";
import { useAppDispatch } from "../state/store";
import { appSignup } from "../state/slices/authSlice";
const SignupScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const initialValues = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  };

  return (
    <>
      <Text>Sign Up</Text>
      <Formik
        validationSchema={signupSchema}
        initialValues={initialValues}
        onSubmit={(values) => dispatch(appSignup(values))}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="firstName"
              onChangeText={handleChange("firstName")}
              onBlur={handleBlur("firstName")}
              value={values.firstName}
            />
            {touched.firstName && errors.firstName ? (
              <Text style={styles.error}>{errors.firstName}</Text>
            ) : null}
            <TextInput
              style={styles.input}
              placeholder="lastName"
              onChangeText={handleChange("lastName")}
              onBlur={handleBlur("lastName")}
              value={values.lastName}
            />
            {touched.lastName && errors.lastName ? (
              <Text style={styles.error}>{errors.lastName}</Text>
            ) : null}
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {touched.email && errors.email ? (
              <Text style={styles.error}>{errors.email}</Text>
            ) : null}
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            {touched.password && errors.password ? (
              <Text style={styles.error}>{errors.password}</Text>
            ) : null}
            <Button onPress={handleSubmit as () => void} title="Submit" />
          </View>
        )}
      </Formik>
    </>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  error: {
    color: "red",
  },
});
