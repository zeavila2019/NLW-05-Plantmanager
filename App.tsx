
import React, { useEffect } from 'react';
import Routes from './src/routes';

import { useFonts, Jost_400Regular, Jost_600SemiBold } from '@expo-google-fonts/jost'
import AppLoading from 'expo-app-loading';
import * as Notifications from 'expo-notifications'
import { NavigationContainer } from "@react-navigation/native";
import { PlantProps } from './src/libs/storage';
import { Alert } from 'react-native';

export default function App() {

  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  })
  useEffect(() => {
    /*     const subscription = Notifications.addNotificationReceivedListener(
          async notification => {
            const data = notification.request.content.data.plant as PlantProps;
            if (data !== null) {
              Alert.alert(`Esta na hora de regar sua planta ${data.name}`)
            }
          }
        )
        return () => subscription.remove(); */

    async function noti() {

      //await Notifications.cancelAllScheduledNotificationsAsync()
      const data = await Notifications.getAllScheduledNotificationsAsync()
      console.log('dddddddddddddddddddddddddddddd')
      console.log(data)
    }
    noti()
  }, [])
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (

    <Routes />

  );
}


