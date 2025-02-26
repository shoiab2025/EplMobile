import React from 'react';
import { View, Text, Share, Alert, FlatList, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import style from '../assets/styles/main_style';
import { colors } from '../assets/styles/colors';
import { useAuth } from './AuthContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import { parseGradient } from '../Components/gradient';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import MaterialViewer from './MaterialViewer';
import SoundPlayer from 'react-native-sound-player';

const Announcement = () => {
    const { groupTheme } = useAuth();
    const navigation = useNavigation();
    const route = useRoute();

    const announcements = route.params?.items || []; // Ensure it's always an array
    console.log(announcements);

    const { isGradient, gradientColors, start, end, solidColor } = parseGradient(groupTheme);

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

    const renderContent = () => (
        <View style={styles.section}>
            <FlatList
                data={announcements}
                keyExtractor={(item, index) => item.id?.toString() || index.toString()} // Use unique ID if available
                renderItem={({ item }) => {
                    const announcementDate = new Date(item.date); // Convert to Date object
                    return (
                        <>
                            <Text style={{ textAlign: 'center', marginBottom: 5 }}>
                                {moment(announcementDate).format("DD MMM, YY")}

                            </Text>
                            <View style={styles.announcementContainer}>
                                <Text style={styles.announcementText}>
                                    📢 {item.message}
                                </Text>
                                <Text style={{position: 'absolute', bottom: 5, right: 10, marginTop: 15, color: colors.white, fontSize: 10}}>{moment(announcementDate).format("hh:mm")}</Text>
                            </View>
                        </>
                    );
                }}
            />
        </View>
    );

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {isGradient ? (
                <LinearGradient colors={gradientColors} start={start} end={end} style={[styles.parentDiv, { flex: 1 }]}>
                    {renderContent()}
                </LinearGradient>
            ) : (
                <View style={[styles.parentDiv, { backgroundColor: solidColor, flex: 1 }]}>
                    {renderContent()}
                </View>
            )}
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    section: {
        marginTop: 24,
        marginHorizontal: 0,
        width: '100%',
        borderRadius: 8,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    announcementContainer: {
        backgroundColor: colors.primary,
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        alignItems: 'center',
        width: 300,
        height: 'auto',
        minHeight: 80
    },
    announcementText: {
        color: colors.white,
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 25,
    },
    dateDisplay: {
        color: colors.white,
        fontSize: 10,
        textAlign: 'right',
        width: '100%',
        position: 'absolute',
        bottom: 10,
    },
    parentDiv: {
        flex: 1,
    }
});

export default Announcement;
