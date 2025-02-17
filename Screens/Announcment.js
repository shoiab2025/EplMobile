import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Share, Alert } from 'react-native';
import style from '../assets/styles/main_style';
import { app_config } from '../assets/app_config';
import { colors } from '../assets/styles/colors';
import { useAuth } from './AuthContext';
import { useNavigation } from '@react-navigation/native';

const Announcement = () => {
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

            {/* Announcement Section */}
            <View style={styles.announcementContainer}>
                <Text style={styles.announcementText}>
                    📢 Assalamu Alaikum! Deepen your understanding of Islam with interactive quizzes on Quran, Hadith, Seerah, and more! 🌙📖
                    Learn, challenge yourself, and track your progress as you strengthen your faith. Start your journey today! 🚀✨
                </Text>
            </View>

            <View style={styles.announcementContainer}>
                <Text style={styles.announcementText}>
                    📢 Assalamu Alaikum! Test and improve your Islamic knowledge with engaging quizzes on the Quran, Sunnah, and Islamic history! 🕌📚
                    Compete with friends, earn rewards, and grow closer to your deen. Join the challenge now! 🎉✨
                </Text>
            </View>

            <View style={styles.announcementContainer}>
                <Text style={styles.announcementText}>
                    📢 Assalamu Alaikum! Explore the beauty of Islam through fun and educational quizzes covering various topics of faith. 🌟📖
                    Strengthen your Imaan, gain wisdom, and enjoy the journey of learning. Start today! 🚀📚
                </Text>
            </View>

            <View style={styles.announcementContainer}>
                <Text style={styles.announcementText}>
                    📢 Assalamu Alaikum! Expand your knowledge with quizzes on Islamic teachings, history, and values! 🏆📖
                    Engage in meaningful learning, challenge yourself, and grow spiritually. Let’s begin! 🌙✨
                </Text>
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
    announcementContainer: {
        backgroundColor: colors.primary,
        padding: 16,
        borderRadius: 8,
        marginHorizontal: 8,
        marginBottom: 16,
        alignItems: 'center',
    },
    announcementText: {
        color: colors.white,
        fontSize: 14,
        textAlign: 'center',
    },
});

export default Announcement;
