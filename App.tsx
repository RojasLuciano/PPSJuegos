import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import AnimatedLottieView from 'lottie-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
console.disableYellowBox = true;

export type RootStackParamList = {

  Login: any;
  Home: any;
  SignUp: any;

}

const Stack = createNativeStackNavigator<RootStackParamList>();



export default function App() {

  const [lottieLoad, setLottieLoad] = React.useState(false);



  useEffect(() => {
    setTimeout(() => {
      setLottieLoad(true)
    }, 2500);
  }, [])


  if (!lottieLoad) {
    return (
      <AnimatedLottieView duration={4000}
        autoPlay
        source={require('./assets/animation.json')}
      />)
  }




  return (
    <NavigationContainer theme={DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


