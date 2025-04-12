import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from './Screens/Login';
import Register from './Screens/Register';
import StartScreen from './Screens/StartScreen';
import MainScreen from './Screens/MainScreen';
import Loader from './Components/Loader';
import asyncStorageService from './Services/asyncService';

const Stack = createNativeStackNavigator();
const APP_TOKEN = 'APP_TOKEN';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Homescreen" component={MainScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="StartScreen" component={StartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
