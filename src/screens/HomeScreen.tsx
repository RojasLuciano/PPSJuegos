import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import { auth } from "../database/firebase";
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import AppLoading from "expo-app-loading";
import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [lottieLoad, setLottieLoad] = React.useState(false);

  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });


  if (!fontsLoaded) {
    return <AppLoading />;
  }

  function handlerSingOut() {
    auth
      .signOut()
      .then(() => {
        setLottieLoad(true);
      })
      .then(() => {
        setTimeout(() => {
          navigation.replace("Login");
        }, 1500);
      })
      .catch((error: any) => alert(error.message));
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <Text style={styles.header}>Bienvenido{"\n\n"} </Text>

            <View style={styles.deslog}>
              <View style={styles.gif}>
                {!!lottieLoad ? (
                  <Image
                    source={require("../img/Sticker.gif")}
                    style={{ width: 120, height: 100 }}
                  ></Image>
                ) : null}
              </View>

              <TouchableOpacity
                style={styles.fabLocation}
                onPress={handlerSingOut}
                activeOpacity={0.5}
              >
                <View>
                  <Text style={styles.imageText}> Desloguear</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
  
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 120,
    height: 120,
  },
  gif: {
    alignSelf: "flex-start",
  },
  imageText: {
    // fontFamily: 'Inter_900Black',
    // fontSize: 20,
    // color: "#76b5c5",
    // textAlign: "center",
    // marginTop: -10,
    // marginBottom: 10,
    color: "white",
    backgroundColor: "#3456dc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    height: 40,
    marginBottom: 10,
  },
  deslog: {
    flexWrap: "wrap",
    alignContent: "space-around",
    alignItems: "center",
  },
  fabLocation: {
    alignSelf: "flex-end",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },

  inner: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  header: {
    fontFamily: 'Inter_900Black',
    fontSize: 50,
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 50,
  },
  subtitle: {
    color: "#76b5c5",
    fontSize: 15,
    fontWeight: "100",
    textAlign: "center",
  },
  input: {
    fontFamily: 'Inter_900Black',
    color: "white",
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 10,
    fontSize: 18,
    fontWeight: "100",
  },
  btnContainer: {
    color: "#000000",
    fontWeight: "700",
    fontSize: 16,
  },
  logo: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: "contain",
  },
  ingresarText: {
    fontFamily: 'Inter_900Black',
    color: "#76b5c5",
    fontSize: 18,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  spinnerTextStyle: {
    color: "white",
  },
  spinContainer: {
    position: "absolute",
    display: "flex",
    backgroundColor: "rgba(255, 0, 0, 0)",
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    height: "100%",
    width: "100%",
    zIndex: 100,
  },
  inputContainer: {
    width: "80%",
    marginTop: -70,
    marginBottom: 10,
    alignSelf: "center",
  },
  buttonError: {
    backgroundColor: "red",
    width: "100%",
    padding: 15,
    borderRadius: 18,
    alignItems: "center",
  },
  buttonText: {
    color: "#000000",
    fontWeight: "700",
    fontSize: 16,
  },
});
