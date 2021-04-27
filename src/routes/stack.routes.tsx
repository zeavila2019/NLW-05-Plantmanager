import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Confirmation } from "../pages/Confirmation";
import { Welcome } from "../pages/Welcome";
import { UserIdentification } from '../pages/UserIdentification'
import { PlantSelect } from '../pages/PlantSelect'
import { PlantSave } from '../pages/PlantSave'
import { MyPlants } from '../pages/MyPlants'

import colors from '../styles/colors'
import fonts from '../styles/fonts'
import AuthRoutes from "./tabs.routes";

//import { useNavigation } from "@react-navigation/native";

const AppStack = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <AppStack.Navigator headerMode='none'
      initialRouteName={"Welcome"} screenOptions={{
        cardStyle: {
          backgroundColor: colors.white
        }
      }}>
      <AppStack.Screen
        name="Welcome"
        component={Welcome}
      />
      <AppStack.Screen
        name="PlantSelect"
        component={AuthRoutes}

      />
      <AppStack.Screen
        name="UserIdentification"
        component={UserIdentification}

      />
      <AppStack.Screen
        name="Confirmation"
        component={Confirmation}
      />
      <AppStack.Screen
        name="PlantSave"
        component={PlantSave}
      />
      <AppStack.Screen
        name="MyPlants"
        component={AuthRoutes}
      />

    </AppStack.Navigator>
  );
}

export default AppRoutes;
