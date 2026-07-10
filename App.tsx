import React from 'react';
import {
  StatusBar,

} from 'react-native';

import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';

import Navigation from './src/infrastructure/navigation/index';

import TriageContextProvider from './src/context/TriageContext';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F8FAFC"
        animated
        
      />
  <TriageContextProvider >
        <Navigation />
  </TriageContextProvider>
    </SafeAreaProvider>
  );
}



export default App;