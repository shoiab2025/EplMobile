import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Share, Alert, TouchableWithoutFeedback, Keyboard, Linking } from 'react-native';
import style from '../assets/styles/main_style';
import { app_config } from '../assets/app_config';
import { colors } from '../assets/styles/colors';
import { useAuth } from './AuthContext';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { parseGradient } from '../Components/gradient';

const Settings = () => {
    const { setUserLoggedIn } = useAuth();
    const navigation = useNavigation();
    const stylings = style();
    const { setAuthUser, groupTheme } = useAuth();

    const handleShareApp = async () => {
        try {
            await Share.share({
                message: `📖 Assalamu Alaikum! I’m enhancing my Islamic knowledge with this amazing quiz app EPL Quiz! 🌙✨  
Test your understanding of the Quran, Hadith, Seerah, and Islamic history while enjoying fun and interactive challenges! 🏆📚  

Join me on this journey of learning and self-improvement! 🚀📲  
🔗 Go to: https://theafafway.com/`

            });
        } catch (error) {
            Alert.alert('Error', 'Oops! Something went wrong while sharing the fun.');
            console.error(error);
        }
    };
    const { isGradient, gradientColors, start, end, solidColor } = parseGradient(groupTheme);
    const renderContent = () => {
        return (
            <View style={styles.section}>
                <TouchableOpacity style={[stylings.button, { width: '100%', marginVertical: 5 }]} onPress={() => Linking.openURL('mailto:theafafway@gmail.com')}>
                    <Text style={[stylings.buttonText, { fontSize: 15 }]}>Mail Support</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[stylings.button, { width: '100%', marginVertical: 5 }]} onPress={() => Linking.openURL('whatsapp://send?phone=+917200290495')}>
                    <Text style={[stylings.buttonText, { fontSize: 15 }]}>Whatsapp</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[stylings.button, { width: '100%', marginVertical: 5 }]} onPress={() => { navigation.navigate('Policy') }}>
                    <Text style={[stylings.buttonText, { fontSize: 15 }]}>Privacy Policy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[stylings.button, { width: '100%', marginVertical: 5 }]} onPress={handleShareApp}>
                    <Text style={[stylings.buttonText, { fontSize: 15 }]}>Share App</Text>
                </TouchableOpacity>
            </View>
        );
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {isGradient ? (
                <LinearGradient colors={gradientColors} start={start} end={end} style={[styles.parentDiv, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
                    {renderContent()}
                </LinearGradient>
            ) : (
                <View style={[styles.parentDiv, { backgroundColor: solidColor, flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
                    {renderContent()}
                </View>
            )}
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    section: {
        marginTop: 24,
        width: '80%',
        backgroundColor: colors.white,
        borderRadius: 8,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default Settings;
