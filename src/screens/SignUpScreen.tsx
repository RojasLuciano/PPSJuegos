import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import { auth } from "../database/firebase";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Spinner from "react-native-loading-spinner-overlay/lib";
import Modal from "react-native-modal";
import { useFonts } from "@expo-google-fonts/inter";
import AppLoading from "expo-app-loading";

const SignUpScreen = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rePassword, setRePassword] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [isModalVisible2, setModalVisible2] = React.useState(false);

  let [fontsLoaded] = useFonts({
    Montserrat: require("../fonts/VCR_OSD_MONO.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const functionCombined = () => {
    handlerSingUp();
    setTimeout(() => {
      setModalVisible(false);
    }, 2000);
  };

  const handlerSingUp = async () => {
    if (
      displayName === "" ||
      email === "" ||
      password === "" ||
      rePassword === ""
    ) {
      setMessage("Todos los campos son obligatorios");
      toggleModal();
    } else if (password === rePassword) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential: { user: any }) => {
          userCredential.user;
        })
        .then(() => {
          toggleModal2();
          startLoading();
          setTimeout(() => {
            navigation.replace("Login");
          }, 2000);
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              toggleModal();
              setMessage("Correo inválido");
              break;
            case "auth/email-already-in-use":
              toggleModal();
              setMessage("Correo ya registrado");
              break;
            case "auth/missing-email":
              toggleModal();
              setMessage("Correo no ingresado");
              break;
            case "auth/internal-error":
              toggleModal();
              setMessage("Ingrese contraseña");
              break;
            default:
              setMessage(error.message);
              break;
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setMessage("Las contraseñas no coinciden");
    }
  };

  const handlerBack = () => {
    navigation.replace("Login");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ImageBackground
        style={{ flex: 1, justifyContent: "center", height: "110%" }}
        source={require("../img/fondo.png")}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <Text style={styles.header}>
              Bienvenido {"\n"}
              <Text style={styles.subtitle}>
                Por favor complete los datos para continuar {"\n"}
                {"\n"}
              </Text>
            </Text>

            <View>
              {!!isModalVisible2 ? (
                <Modal isVisible={isModalVisible2}>
                  <View style={styles.modalOk}>
                    <Text style={styles.modalText}>
                      Usuario creado con exito.
                    </Text>
                  </View>
                </Modal>
              ) : null}
            </View>

            <View>
              {!!isModalVisible ? (
                <Modal isVisible={isModalVisible}>
                  <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>{message}</Text>
                  </View>
                </Modal>
              ) : null}
            </View>

            <TextInput
              placeholder="Nombre"
              placeholderTextColor={"#ffffde"}
              value={displayName}
              onChangeText={(text) => setDisplayName(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Correo electrónico"
              placeholderTextColor={"#ffffde"}
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
            />

            <TextInput
              placeholder="Contraseña"
              placeholderTextColor={"#ffffde"}
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={styles.input}
              secureTextEntry
            />
            <TextInput
              placeholder="Confirmar contraseña"
              placeholderTextColor={"#ffffde"}
              value={rePassword}
              onChangeText={(text) => setRePassword(text)}
              style={styles.input}
              secureTextEntry
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

              <Text style={styles.ingresarText} onPress={functionCombined}>
                Registrarse{" "}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontFamily: "Montserrat" }}>
                  Ya tiene una cuenta?{" "}
                </Text>
                <TouchableOpacity onPress={handlerBack}>
                  <Text
                    style={{
                      fontFamily: "Montserrat",

                      color: "#ff1818",
                      justifyContent: "flex-end",
                    }}
                  >
                    {" "}
                    Ingrese
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "center",
  },
  header: {
    fontFamily: "Montserrat",

    fontSize: 50,

    color: "#76b5c5",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    color: "#76b5c5",
    fontSize: 15,
    fontWeight: "100",
    textAlign: "center",
  },
  input: {
    fontFamily: "Montserrat",
    color: "white",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 10,
    fontSize: 18,
  },
  btnContainer: {
    color: "white",
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
    fontFamily: "Montserrat",
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
    backgroundColor: "rgba(0,0,0,0.5)",
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
    borderRadius: 8,
    alignItems: "center",
  },
  buttonOk: {
    backgroundColor: "green",
    width: "100%",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 13,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#b50404",
    width: "60%",
    height: "10%",
    position: "absolute",
    borderRadius: 10,

    margin: "auto",
    textAlign: "center",
    alignSelf: "center",
  },
  modalOk: {
    flex: 1,
    backgroundColor: "#039105",
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
