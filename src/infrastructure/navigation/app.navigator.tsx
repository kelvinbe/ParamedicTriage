import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TriageScreen from '../../features/Triage/screen/triage.screen'
import { Text, View } from 'react-native';

const AppStack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AppStack.Screen
        name="Home"
        component={TriageScreen}
      />
    </AppStack.Navigator>


  );
};

export default AppNavigator;