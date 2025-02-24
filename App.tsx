import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native'; // Import only what you need
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, useAuth } from './Screens/AuthContext';
import RootNavigator from './Screens/RootNavigator';
import style from './assets/styles/main_style';

const App: React.FC = () => { // Use React.FC for type safety
    useEffect(() => {
        SplashScreen.hide(); // Hide splash screen
    }, []);
    return (
        <AuthProvider>
            <NavigationContainer>
                <View style={styles.container}> {/* Use a style for the main view */}
                    <RootNavigator />
                </View>
                <Toast /> {/* Toast should be a direct child of NavigationContainer */}
            </NavigationContainer>
        </AuthProvider>
    );
};

const styles = StyleSheet.create({ // Define styles in App.tsx or in a separate file
    container: {
        flex: 1,
    },
});

export default App;