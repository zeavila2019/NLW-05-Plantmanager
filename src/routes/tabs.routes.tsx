import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../styles/colors';
import { PlantSelect } from '../pages/PlantSelect';
import { MaterialIcons } from '@expo/vector-icons';
import { MyPlants } from '../pages/MyPlants';
import { Platform } from 'react-native';

const Tab = createBottomTabNavigator();

const AuthRoutes = () => {
  return (

    <Tab.Navigator tabBarOptions={{
      activeTintColor: colors.green,
      inactiveBackgroundColor: colors.white,
      labelPosition: 'beside-icon',
      style: {
        paddingVertical: Platform.OS === 'ios' ? 20 : 0,
        height: 88
      }
    }}>
      <Tab.Screen
        name="Nova Planta"
        component={PlantSelect}
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons name="add-circle-outline" size={size} color={color} />
          ))
        }} />
      <Tab.Screen
        name="Minhas Plantas"
        component={MyPlants}
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons name="format-list-bulleted" size={size} color={color} />
          ))
        }} />

    </Tab.Navigator>

  );
}
export default AuthRoutes;