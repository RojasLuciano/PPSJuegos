import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import AnimatedLottieView from "lottie-react-native";
import { StyleSheet, Text, View } from "react-native";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screens/HomeScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
console.disableYellowBox = true;

export type RootStackParamList = {
  Login: any;
  Home: any;
  SignUp: any;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [lottieLoad, setLottieLoad] = React.useState(false);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#3490dc'
    },
  };


  useEffect(() => {
    setTimeout(() => {
      setLottieLoad(true);
    }, 2500);
  }, []);

  if (!lottieLoad) {
    return (
      <AnimatedLottieView
        duration={4000}
        autoPlay
        style={styles.splash}
        source={require("./assets/animation1.json")}
      />
    );
  }

  return (
    <NavigationContainer  theme={MyTheme}>
      <Stack.Navigator >
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SignUp"
          component={SignUpScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },  splash: {
    backgroundColor: '#3490dc',
  },
});
