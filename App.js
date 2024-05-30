import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { 
  Animated,
  Button,
  Platform,
  StyleSheet,
  Text,
  View, } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import * as SplashScreen from "expo-splash-screen";
import AppLoading from "expo-app-loading";

import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import Router from "./src/router";
import { Provider } from 'react-redux'
import {store} from "./src/redux";
import 'react-native-gesture-handler';
// import {SignedOut} from './app/Router';

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 2000);


const App = () => {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular
  });


  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Router/>
          {/* tempat meletakkan navigasi */}
          {/* <MyStackNavigator /> */}
          {/* <MyTabNavigator /> */}
          {/* <MyTopTabNavigator /> */}
          {/* <MyDrawerNavigator /> */}
        </NavigationContainer>
      </Provider>
      
    );
  }
};

export default App;
