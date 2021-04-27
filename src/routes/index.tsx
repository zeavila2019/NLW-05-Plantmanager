import React from "react";

import StackRoutes from "./stack.routes";
import AuthRoutes from "./tabs.routes";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from "@react-navigation/native";

async function userAuth() {
  const data = await AsyncStorage.getItem('@plantmanager:user');
  if (data) {
    return true;
  } else {
    return false
  }
}
function Routes() {

  const user = userAuth()
  return (user ? <NavigationContainer><StackRoutes /></NavigationContainer> : <NavigationContainer><StackRoutes /></NavigationContainer>

  )
}
export default Routes;


