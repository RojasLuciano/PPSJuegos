import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import { auth } from "../database/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Spinner from "react-native-loading-spinner-overlay/lib";
import {
  useFonts,
  Montserrat_100Thin,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
  Montserrat_100Thin_Italic,
  Montserrat_200ExtraLight_Italic,
  Montserrat_300Light_Italic,
  Montserrat_400Regular_Italic,
  Montserrat_500Medium_Italic,
  Montserrat_600SemiBold_Italic,
  Montserrat_700Bold_Italic,
  Montserrat_800ExtraBold_Italic,
  Montserrat_900Black_Italic,
} from '@expo-google-fonts/montserrat';
import AppLoading from "expo-app-loading";
import Modal from "react-native-modal";

const LoginScreen = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isModalVisible, setModalVisible] = React.useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  let [fontsLoaded] = useFonts({
    Montserrat_100Thin,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
    Montserrat_100Thin_Italic,
    Montserrat_200ExtraLight_Italic,
    Montserrat_300Light_Italic,
    Montserrat_400Regular_Italic,
    Montserrat_500Medium_Italic,
    Montserrat_600SemiBold_Italic,
    Montserrat_700Bold_Italic,
    Montserrat_800ExtraBold_Italic,
    Montserrat_900Black_Italic,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const handlerLogin = async () => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: { user: any }) => {
        const user = userCredential.user;
        console.log("Logged in with", user.email);
      })
      .then(() => {
        navigation.replace("Home");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
          case "auth/user-not-found":
          case "auth/wrong-password":
          case "auth/internal-error":
          case "auth/too-many-requests":
            toggleModal();
            setMessage("Credenciales inválidas");
            break;
          default:
            setMessage(error.message);
            break;
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const functionCombined = () => {
    handlerLogin();
    startLoading();
    setTimeout(() => {
      setModalVisible(false);
    }, 2000);
  };

  const onPressAdminHandler = () => {
    setEmail("admin@gmail.com");
    setPassword("admin123e");
  };

  const onPressServiceHandler = () => {
    setEmail("service@gmail.com");
    setPassword("service");
  };

  const onPressUserHandler = () => {
    setEmail("user@gmail.com");
    setPassword("user123");
  };

  const handlerSignUp = () => {
    navigation.replace("SignUp");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>

          <Image
                style={styles.message}
                source={require("../img/tinder.png")}
              />

            <Text style={styles.header}>
              Bienvenido{"\n"}
              <Text style={styles.subtitle}>
                Por favor complete los datos para continuar {""}
                {"\n"}
              </Text>
            </Text>

            <TextInput
              placeholder="Correo electrónico"
              placeholderTextColor={"#c8c8ca"}
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
              clearButtonMode="always"
            />
            <TextInput
              placeholder="Contraseña"
              placeholderTextColor={"#c8c8ca"}
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={styles.input}
              secureTextEntry={true}
            />

            <View>
              {loading && (
                <View style={styles.spinContainer}>
                  <Spinner
                    visible={loading}
                    textStyle={styles.spinnerTextStyle}
                  />
                </View>
              )}

              <View>
                {!!isModalVisible ? (
                  <Modal isVisible={isModalVisible}>
                    <View style={styles.modalContainer}>
                      <Text style={styles.modalText}>{message}</Text>
                    </View>
                  </Modal>
                ) : null}
              </View>

              <Text style={styles.ingresarText} onPress={functionCombined}>
                Ingresar
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#ffffff",  }}>
                  No tiene una cuenta?{" "}
                </Text>
                <TouchableOpacity onPress={handlerSignUp}>
                  <Text
                    style={{    

                      color: "#ffffff",
                      justifyContent: "flex-end",
                      textDecorationLine:'underline'
                    }}
                  >
                    {""}
                    Regístrese
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.fabLocation, styles.fabLocationCenter]}
              onPress={onPressAdminHandler}
              activeOpacity={0.5}
            >
              <Image
                style={styles.image}
                source={require("../img/user4.png")}
              />
              <View>
                <Text style={styles.imageText}>Admin</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.fabLocation, styles.fabLocationTL]}
              onPress={onPressServiceHandler}
              activeOpacity={0.5}
            >
              <Image
                style={styles.image}
                source={require("../img/user2.png")}
              />
              <View>
                <Text style={styles.imageText}>Service</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.fabLocation, styles.fabLocationBR]}
              onPress={onPressUserHandler}
              activeOpacity={0.5}
            >
              <Image
                style={styles.image}
                source={require("../img/user1.png")}
              />
              <View>
                <Text style={styles.imageText}>User</Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>

    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
 
    width: 70,
    height: 70,
  },
  message : {
    width: 60,
    height: 60,
    alignSelf: "center",
  },
  imageText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginTop: -8,
    marginBottom: 10,
  },
  fabLocation: {
    flex :1,
    position: "absolute",
    bottom: -11,
  },
  fabLocationBR: {
    right: 20,
  },
  fabLocationTL: {
    left: 20,
  },
  fabLocationCenter: {
    alignSelf: "center",
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "center",
  },
  header: {
    fontFamily: 'Montserrat_700Bold_Italic',
    fontSize: 50,
    color: "#ffffff",
    textAlign: "center",

  },
  subtitle: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "100",
    textAlign: "center",

  },
  input: {
    color: "#000000",
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    height: 40,
    marginBottom: 3,
    fontFamily: 'Montserrat_300Light_Italic', 
    borderColor: 'white',
    borderWidth: 1,




    
  },
  btnContainer: {
  },
  logo: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: "contain",
  },
  ingresarText: {
    color: "#ffffff",
    fontSize: 18,
    textAlign: "center",
    width: 90,
    alignSelf: 'center',
    paddingVertical: 4,
    paddingHorizontal:-44,
    backgroundColor: '#ce2055',
    borderRadius: 20,

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
    backgroundColor: "#b50404",
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
  modalContainer: {
    backgroundColor: "#b50404",
    flex: 1,

    width: "60%",
    height: "10%",
    position: "absolute",
    borderRadius: 10,

    margin: "auto",
    textAlign: "center",
    alignSelf: "center",
  },
  modalText: {
    color: "white",
    fontWeight: "500",
    fontSize: 15,
    textAlign: "center",
    marginTop: 25,
    marginBottom: 10,
    alignSelf: "center",
  },
});