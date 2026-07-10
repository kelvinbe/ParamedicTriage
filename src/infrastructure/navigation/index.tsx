import React from 'react';
import AppNavigator from './app.navigator'
import {

  NavigationContainer,
} from '@react-navigation/native';


const Navigation = () => {


  return (
    <>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </>
  );
};

export default Navigation;
