import {
    View, Text, StyleSheet, ScrollView,
    TouchableOpacity, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from '../assets/styles/main_style';
import { useNavigation, useRoute } from '@react-navigation/native';
import Notification from '../Components/notification';
import { colors } from '../assets/styles/colors';
import { useAuth } from './AuthContext';
import { parseGradient } from '../Components/gradient';
import LinearGradient from 'react-native-linear-gradient';

const LeaderBoardScreen = () => {
    const route = useRoute();
    const group = route.params?.group || {};
    const navigation = useNavigation();
    const { groupTheme } = useAuth();
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const currentUser = 'Henry'; // Change this dynamically as needed

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Mock Data
                const sampleData = [
                    { rank: 1, group: 'Group A', score: 43, user: 'Bryan Wolf', week: 1 },
                    { rank: 2, group: 'Group B', score: 40, user: 'Meghan Jes...', week: 1 },
                    { rank: 3, group: 'Group C', score: 38, user: 'Alex Turner', week: 1 },
                    { rank: 4, group: 'Group D', score: 36, user: 'Marsha Fisher', week: 1 },
                    { rank: 5, group: 'Group E', score: 35, user: 'Juanita Cormier', week: 1 },
                    { rank: 6, group: 'Group F', score: 34, user: 'Henry', week: 1 },
                    { rank: 7, group: 'Group G', score: 33, user: 'Tamara Schmidt', week: 1 },
                    { rank: 8, group: 'Group H', score: 32, user: 'Ricardo Veum', week: 1 },
                    { rank: 9, group: 'Group I', score: 31, user: 'Gary Sanford', week: 1 },
                    { rank: 10, group: 'Group J', score: 30, user: 'Becky Bartell', week: 1 },
                ];
                setLeaderboardData(sampleData);
            } catch (err) {
                console.error("Error fetching leaderboard data:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboardData();
    }, []);

    const { isGradient, gradientColors, start, end, solidColor } = parseGradient(groupTheme);

    const renderContent = () => (
        <>
            <View style={styles.absoluteCode}>
                <Notification />
            </View>
            <ScrollView contentContainerStyle={localStyles.container}>
                <Text style={localStyles.title}>Leaderboard</Text>
                
                {/* Week Selection Buttons */}
                <View style={localStyles.weekButtonsContainer}>
                    {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((week, index) => (
                        <TouchableOpacity
                            key={index}
                            style={localStyles.weekButton}
                            onPress={() => navigation.navigate('Perfomances')}
                        >
                            <Text style={localStyles.weekButtonText}>{week}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Leaderboard List */}
                <View>
                    {leaderboardData.map((item, index) => (
                        <View key={index} style={[
                            localStyles.leaderboardItem,
                            index === 0 ? localStyles.firstPlace :
                            index === 1 ? localStyles.secondPlace :
                            index === 2 ? localStyles.thirdPlace :
                            item.user === currentUser ? localStyles.currentUser : {}
                        ]}>
                            <Text style={localStyles.rank}>{item.rank}</Text>
                            <Text style={[
                                localStyles.name,
                                (index <= 2 || item.user === currentUser) && { color: '#fff' }
                            ]}>
                                {item.user === currentUser ? `${item.user} - You` : item.user}
                            </Text>
                            <Text style={[
                                localStyles.score,
                                (index <= 2 || item.user === currentUser) && { color: '#fff' }
                            ]}>
                                {item.score} pts
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Performance Button */}
                <TouchableOpacity style={localStyles.performanceButton} onPress={() => navigation.navigate('Perfomances')}>
                    <Text style={localStyles.performanceButtonText}>View Performances</Text>
                </TouchableOpacity>
            </ScrollView>
        </>
    );

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {isGradient ? (
                <LinearGradient colors={gradientColors} start={start} end={end} style={localStyles.gradientBackground}>
                    {renderContent()}
                </LinearGradient>
            ) : (
                <View style={[localStyles.gradientBackground, { backgroundColor: solidColor }]}>
                    {renderContent()}
                </View>
            )}
        </TouchableWithoutFeedback>
    );
};

const localStyles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: colors.primary,
    },
    weekButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    weekButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: colors.primary,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    weekButtonText: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
    },
    leaderboardItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        borderRadius: 8,
        marginVertical: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
    },
    rank: {
        fontSize: 18,
        fontWeight: 'bold',
        width: 40,
        textAlign: 'center',
    },
    name: {
        fontSize: 16,
        flex: 1,
    },
    score: {
        fontSize: 16,
        fontWeight: 'bold',
        width: 80,
        textAlign: 'right',
    },
    firstPlace: { backgroundColor: '#FFD700' },
    secondPlace: { backgroundColor: '#C0C0C0' },
    thirdPlace: { backgroundColor: '#CD7F32' },
    currentUser: { backgroundColor: '#0096FF' },
    performanceButton: {
        marginTop: 20,
        padding: 12,
        backgroundColor: colors.primary,
        borderRadius: 5,
        alignItems: 'center',
    },
    performanceButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    gradientBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
});

export default LeaderBoardScreen;
