import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './Screens/AuthContext';
import styles from './assets/styles/main_style';
import RootNavigator from './Screens/RootNavigator';
const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <AuthProvider>

    <NavigationContainer>
      <View style={{flex: 1}}>
        <RootNavigator />
      </View>
      < Toast />
    </NavigationContainer>

  </AuthProvider>
  );
};


export default App;