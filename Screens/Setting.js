import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Share, Alert } from 'react-native';
import style from '../assets/styles/main_style';
import { app_config } from '../assets/app_config';
import { colors } from '../assets/styles/colors';
import { useAuth } from './AuthContext';
import { useNavigation } from '@react-navigation/native';

const Settings = () => {
    const { setUserLoggedIn } = useAuth();
    const navigation = useNavigation();
    const stylings = style();

    const handleShareApp = async () => {
        try {
            await Share.share({
                message: `📖 Assalamu Alaikum! I’m enhancing my Islamic knowledge with this amazing quiz app! 🌙✨  
Test your understanding of the Quran, Hadith, Seerah, and Islamic history while enjoying fun and interactive challenges! 🏆📚  

Join me on this journey of learning and self-improvement! 🚀📲  
🔗 Download the app now: https://example.com/app`

            });
        } catch (error) {
            Alert.alert('Error', 'Oops! Something went wrong while sharing the fun.');
            console.error(error);
        }
    };

    return (
        <View style={[stylings.parentDiv, { paddingTop: 30 }]}>
            <View style={styles.section}>
                <TouchableOpacity style={[stylings.button, { width: '100%', marginVertical: 5 }]} onPress={() => {}}>
                    <Text style={[stylings.buttonText, { fontSize: 15 }]}>Support</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[stylings.button, { width: '100%', marginVertical: 5 }]} onPress={() => {}}>
                    <Text style={[stylings.buttonText, { fontSize: 15 }]}>Privacy Policy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[stylings.button, { width: '100%', marginVertical: 5 }]} onPress={() => {}}>
                    <Text style={[stylings.buttonText, { fontSize: 15 }]}>Terms & Conditions</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[stylings.button, { width: '100%', marginVertical: 5 }]} onPress={handleShareApp}>
                    <Text style={[stylings.buttonText, { fontSize: 15 }]}>Share App</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        marginTop: 24,
        marginHorizontal: 8,
        width: '100%',
        backgroundColor: colors.white,
        borderRadius: 8,
        padding: 16,
    },
});

export default Settings;
