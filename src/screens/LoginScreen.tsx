import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Image, Keyboard, Platform, TouchableWithoutFeedback, ImageBackground } from "react-native";
import { auth } from "../database/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';


const LoginScreen = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [loading, setLoading] = React.useState(false);



    setTimeout(() => {
        setMessage(false);
    }, 5000);

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    const startLoading = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    };

    let [fontsLoaded] = useFonts({
        Montserrat: require('../fonts/VCR_OSD_MONO.ttf'),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    const handlerLogin = async () => {
        setLoading(true);
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential: { user: any; }) => {
                const user = userCredential.user;
                console.log("Logged in with", user.email);
            }).then(() => { navigation.replace('Home'); })
            .catch(error => {
                switch (error.code) {
                    case 'auth/invalid-email':
                    case 'auth/user-not-found':
                    case 'auth/wrong-password':
                    case 'auth/internal-error':
                    case 'auth/too-many-requests':
                        setMessage("Credenciales inválidas");
                        break;
                    default:
                        setMessage(error.message)
                        break;
                }
            }).finally(() => { setLoading(false) });
    }

    const functionCombined = () => {
        handlerLogin();
        startLoading();
    }


    const onPressAdminHandler = () => {
        setEmail("admin@gmail.com");
        setPassword("admin123e");
    }

    const onPressServiceHandler = () => {
        setEmail("service@gmail.com");
        setPassword("service");
    }

    const onPressUserHandler = () => {
        setEmail("user@gmail.com");
        setPassword("user123");
    }

    const handlerSignUp = () => {
        navigation.replace('SignUp');
    }

    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >

            <ImageBackground
                style={{ flex: 1, justifyContent: "center", height: "110%" }}
                source={require('../img/fondo.png')} >

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inner}>

                        <Text style={styles.header}>Bienvenido{"\n"}
                            <Text style={styles.subtitle} >Por favor complete los datos para continuar {"\n"}{"\n"}</Text>
                        </Text>


                        <View style={styles.inputContainer}>
                            {!!message ? <TouchableOpacity
                                style={styles.buttonError}
                            >
                                <Text style={styles.buttonText}>{message}</Text>
                            </TouchableOpacity> : null}
                        </View>



                        <TextInput

                            placeholder="Correo electrónico"

                            placeholderTextColor={"#fefeff"}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            style={styles.input}
                            clearButtonMode="always"
                        />
                        <TextInput
                            placeholder="Contraseña"
                            placeholderTextColor={"#fefeff"}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            style={styles.input}
                            secureTextEntry={true}
                        />

                        <View>
                            {loading
                                &&
                                <View style={styles.spinContainer}>
                                    <Spinner
                                        visible={loading}
                                        textStyle={styles.spinnerTextStyle}
                                    />
                                </View>}

                            <Text style={styles.ingresarText} onPress={functionCombined}>Ingresar </Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: "#fefeff", fontFamily: 'Montserrat' }}>No tiene una cuenta? </Text>
                                <TouchableOpacity onPress={handlerSignUp}>
                                    <Text
                                        style={{
                                            fontFamily: 'Montserrat',
                                            color: "#ff1818",
                                            justifyContent: "flex-end",
                                        }}
                                    >
                                        {" "}
                                        Regístrese
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity style={[
                            styles.fabLocation, styles.fabLocationCenter]}
                            onPress={onPressAdminHandler} activeOpacity={0.5}>
                            <Image style={styles.image} source={require('../img/amongus_rojo.png')} />
                            <View>
                                <Text style={styles.imageText}>Admin</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={[
                            styles.fabLocation, styles.fabLocationTL]}
                            onPress={onPressServiceHandler} activeOpacity={0.5}>
                            <Image style={styles.image} source={require('../img/amongus_verde_mini2.png')} />
                            <View>
                                <Text style={styles.imageText}>Service</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={[
                            styles.fabLocation, styles.fabLocationBR]}
                            onPress={onPressUserHandler} activeOpacity={0.5}>
                            <Image style={styles.image} source={require('../img/amongus_naranja.png')} />
                            <View>
                                <Text style={styles.imageText}>User</Text>
                            </View>
                        </TouchableOpacity>


                    </View>
                </TouchableWithoutFeedback>

            </ImageBackground>


        </KeyboardAvoidingView >

    );
}



export default LoginScreen
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        width: 120,
        height: 120,
    },
    imageText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#76b5c5",
        textAlign: "center",
        marginTop: -10,
        marginBottom: 10,
    },
    fabLocation: {
        position: "absolute",
        bottom: -11,
        flex: 1
    },
    fabLocationBR: {
        right: 20,
    },
    fabLocationTL: {
        left: 20,
    },
    fabLocationCenter: {
        alignSelf: 'center',
    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: "center",

    },
    header: {
        fontFamily: 'Montserrat',
        fontSize: 50,
        color: "#76b5c5",
        textAlign: "center",
        marginBottom: 20,
    },
    subtitle: {
        color: '#76b5c5',
        fontSize: 15,
        fontWeight: "100",
        textAlign: "center"
    },
    input: {
        fontFamily: 'Montserrat',
        color: "white",
        borderBottomColor: "#000000",
        borderBottomWidth: 1,
        marginBottom: 10,
        padding: 10,
        fontSize: 18,
        fontWeight: "100"

    },
    btnContainer: {
        color: '#000000',
        fontWeight: '700',
        fontSize: 16,


    },
    logo: {
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: 'contain'
    },
    ingresarText: {
        fontFamily: 'Montserrat',
        color: "#76b5c5",
        fontSize: 18,
        textAlign: "center",
        marginTop: 10,
        marginBottom: 10,
    },
    spinnerTextStyle: {
        color: 'white',
    },
    spinContainer: {
        position: 'absolute',
        display: 'flex',
        backgroundColor: 'rgba(255, 0, 0, 0)',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        height: '100%',
        width: '100%',
        zIndex: 100,
    },
    inputContainer: {
        width: '80%',
        marginTop: -70,
        marginBottom: 10,
        alignSelf: 'center',

    },
    buttonError: {
        backgroundColor: 'red',
        width: '100%',
        padding: 15,
        borderRadius: 18,
        alignItems: 'center',
    },
    buttonText: {
        color: '#000000',
        fontWeight: '700',
        fontSize: 16,
    },
});