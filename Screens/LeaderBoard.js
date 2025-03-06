import {
    View, Text, StyleSheet, ScrollView,
    TouchableOpacity, TouchableWithoutFeedback, Keyboard,
    Image
} from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from '../assets/styles/main_style';
import { useNavigation, useRoute } from '@react-navigation/native';
import Notification from '../Components/notification';
import { colors } from '../assets/styles/colors';
import { useAuth } from './AuthContext';
import { parseGradient } from '../Components/gradient';
import LinearGradient from 'react-native-linear-gradient';
import { getRankForWeek } from '../API_STORE/userLeaderBoardApI';
import { getAllSchedules } from '../API_STORE/scheduleApi';
import { getAllTestById } from '../API_STORE/testApi';
import moment from 'moment';

const ITEMS_PER_PAGE = 50;
const LeaderBoardScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { groupTheme, group, authUser, setCurrentScore, setCurrentRank } = useAuth();
    const [currentPage, setCurrentPage] = useState(1);
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [allSchedules, setAllSchedules] = useState([]);
    const [allTest, setAllTest] = useState([]);
    const [selectedWeek, setSelectedWeek] = useState(1);
    const [getUsersRecord, setUsersRecord] = useState([]);
    const [currentGroupUsers, setCurrentGroupUser] = useState([]);
    const totalPages = Math.ceil(currentGroupUsers.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedUsers = currentGroupUsers.slice(startIndex, endIndex);
    const styling = styles();
    useEffect(() => {
        const fetchTests = async () => {
            try {
                const response = await getAllSchedules();
                if (response.success) {
                    setAllSchedules(response.data);

                    const testPromises = response.data.map(async (option) => {
                        if (option.tests?.[0]) {
                            const getTestData = await getAllTestById(option.tests[0]);
                            return getTestData.data;
                        }
                        return null;
                    });

                    const testResults = await Promise.all(testPromises);
                    setAllTest(testResults.filter(Boolean));
                } else {
                    console.error("Failed to fetch tests:", response.message);
                }
            } catch (error) {
                console.error("Error fetching tests:", error);
            }
        };
        fetchTests();
    }, []);

    useEffect(() => {
        const fetchWeeklyLeaderBoard = async () => {
            if (allSchedules.length === 0) return;

            setLoading(true);
            setError(null);

            try {
                const startDate = moment(allSchedules[0].scheduled_start_date);
                const weekStartDate = moment(startDate).add((selectedWeek - 1) * 7, 'days');
                const weekEndDate = moment(weekStartDate).add(6, 'days');
                const start_date_formatted = weekStartDate.format('YYYY-MM-DD');
                const end_date_formatted = weekEndDate.format('YYYY-MM-DD');

                const response = await getRankForWeek(start_date_formatted, end_date_formatted);

                if (response?.rankings) {
                    setLeaderboardData(response);
                } else {
                    <Text style={styles.textDefault}>{setError("Failed to fetch leaderboard data")}</Text>
                }
            } catch (err) {
                console.error("Error fetching leaderboard data:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWeeklyLeaderBoard();
    }, [allSchedules, selectedWeek]);

    useEffect(() => {
        if (leaderboardData?.rankings) {
            console.log(leaderboardData.rankings);
    
            const uniqueUsers = new Map(); // Using Map to ensure uniqueness
    
            leaderboardData.rankings.forEach((group) => { // 🔄 Looping through all groups
                group.users.forEach((userData) => {
                    uniqueUsers.set(userData.user.userId, {
                        averageScore: userData.averageScore,
                        rank: userData.rank,
                        testCount: userData.testCount,
                        username: userData.user.name,
                        userId: userData.user.userId,
                        userGroup: userData.user.groupId,
                    });
                });
            });
    
            setUsersRecord(Array.from(uniqueUsers.values())); // Convert Map to array and set state
        }
    }, [leaderboardData]);

    useEffect(() => {
        setCurrentGroupUser(getUsersRecord.filter(user => user.userGroup === group?._id?.toString()));
    }, [getUsersRecord, group]);


    const { isGradient, gradientColors, start, end, solidColor } = parseGradient(groupTheme);

    if (currentGroupUsers && currentGroupUsers?.some(user => user.userId === authUser?.userId)) {
        const current_score = currentGroupUsers?.find(user => user.userId === authUser?.userId);
        console.log(current_score.rank)
        setCurrentRank(current_score.rank);
    }

    const renderContent = () => (
        <>
            <View style={[styles.absoluteCode, { width: '100%' }]}>
                <Notification />
            </View>
            <ScrollView contentContainerStyle={localStyles.container}>
                <Text style={localStyles.title}>Leaderboard</Text>

                {/* Week Selector */}
                <View style={localStyles.weekButtonsContainer}>
                    {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((week, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[localStyles.weekButton, selectedWeek === index + 1 && localStyles.selectedWeekButton]}
                            onPress={() => setSelectedWeek(index + 1)}
                        >
                            <Text style={localStyles.weekButtonText}>{week}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Leaderboard Data */}
                <View>
                    {loading ? (
                        <Text style={[styling.textDefault, { textAlign: 'center' }]}>Loading...</Text>
                    ) : error ? (
                        <Text style={[styling.textDefault, { textAlign: 'center' }]}>{error}</Text>
                    ) : (
                        <>
                            <View style={localStyles.tableContainer}>
                                {/* Table Header */}
                                <View style={localStyles.tableRowHeader}>
                                    <Text style={localStyles.tableCellHeader}>Rank</Text>
                                    <Text style={localStyles.tableCellHeader}>User</Text>
                                    <Text style={localStyles.tableCellHeader}>Reg Id</Text>
                                    <Text style={localStyles.tableCellHeader}>Avg %</Text>
                                </View>

                                {/* Table Rows */}
                                {paginatedUsers.map((user, index) => (
                                    <View key={index} style={[localStyles.tableRow, user.userId === authUser?.userId ? localStyles.highlightedRow : {}]}>
                                        {
                                            <View style={localStyles.tableCell}>
                                                {user.rank === 1 ? (
                                                    <Image source={require('../assets/Images/first.png')} style={localStyles.badgeStyle} />
                                                ) : user.rank === 2 ? (
                                                    <Image source={require('../assets/Images/second.png')} style={localStyles.badgeStyle} />
                                                ) : user.rank === 3 ? (
                                                    <Image source={require('../assets/Images/third.png')} style={localStyles.badgeStyle} />
                                                ) : (
                                                    <Text style={localStyles.tableCell}>{user.rank}</Text>
                                                )}
                                            </View>

                                        }
                                        <Text style={localStyles.tableCell}>{user.username}</Text>
                                        <Text style={localStyles.tableCell}>{user.userId}</Text>
                                        <Text style={localStyles.tableCell}>{user.averageScore}</Text>
                                    </View>
                                ))}

                            </View>
                            <View style={localStyles.paginationContainer}>
                                <TouchableOpacity
                                    onPress={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    style={[localStyles.paginationButton, currentPage === 1 && localStyles.disabledButton]}
                                >
                                    <Text style={localStyles.paginationText}>Previous</Text>
                                </TouchableOpacity>

                                <Text style={localStyles.paginationText}>
                                    Page {currentPage} of {totalPages}
                                </Text>

                                <TouchableOpacity
                                    onPress={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    style={[localStyles.paginationButton, currentPage === totalPages && localStyles.disabledButton]}
                                >
                                    <Text style={localStyles.paginationText}>Next</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </View>

                {/* Navigate to Performances */}
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
        width: '100%',
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
        width: 80,
        textAlign: 'center',
    },
    name: {
        fontSize: 16,
        flex: 1,
        width: 80,
    },

    regId: {
        fontSize: 16,
        flex: 1,
        width: 80,
    },

    score: {
        fontSize: 16,
        fontWeight: 'bold',
        width: 80,
        textAlign: 'right',
    },
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
        padding: 10,
        width: '100%'
    },
    tableContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        overflow: 'hidden',
    },
    tableRowHeader: {
        flexDirection: 'row',
        backgroundColor: colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 5,
        fontSize: 10,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 8,
        paddingHorizontal: 5,
        backgroundColor: '#f9f9f9',
        fontFamily: "Inter_18pt-Bold",
    },
    tableCellHeader: {
        flex: 1,
        fontSize: 13,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        fontFamily: "Inter_18pt-Bold",
    },
    tableCell: {
        flex: 1,
        fontSize: 12,
        textAlign: 'center',
        fontFamily: "Inter_18pt-bold",
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    paginationButton: {
        padding: 10,
        backgroundColor: colors.primary,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    paginationText: {
        color: 'white',
        fontSize: 13,
        fontWeight: 'bold',
        fontFamily: "Inter_18pt-Bold",
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },

    badgeStyle: {
        width: 30,
        height: 30,
        resizeMode: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    highlightedRow: {
        backgroundColor: '#A5D6A7',
        color: '#fff'
    }
});

export default LeaderBoardScreen;
