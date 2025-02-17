import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from '../assets/styles/main_style';
import { useNavigation, useRoute } from '@react-navigation/native';
import Notification from '../Components/notification';
import { colors } from '../assets/styles/colors';
import style from '../assets/styles/main_style';

const LeaderBoardScreen = () => {
    const route = useRoute();
    const group = route.params?.group || {};
    const styles = style();
    const navigation = useNavigation();
    // Sample leaderboard data categorized by weeks
    const leaderboardData = [
        { rank: 1, group: 'Group A', score: 95, user: 'John', week: 1 },
        { rank: 2, group: 'Group B', score: 90, user: 'Emma', week: 1 },
        { rank: 3, group: 'Group C', score: 85, user: 'Liam', week: 1 },
        { rank: 1, group: 'Group D', score: 80, user: 'Sophia', week: 2 },
        { rank: 2, group: 'Group E', score: 75, user: 'Noah', week: 2 },
        { rank: 3, group: 'Group F', score: 70, user: 'Olivia', week: 2 },
        { rank: 1, group: 'Group G', score: 65, user: 'James', week: 3 },
        { rank: 2, group: 'Group H', score: 60, user: 'Isabella', week: 3 },
        { rank: 1, group: 'Group I', score: 55, user: 'Ethan', week: 4 },
        { rank: 2, group: 'Group J', score: 50, user: 'Mia', week: 4 }
    ];

    const currentUser = 'Noah'; // Set the logged-in user dynamically

    // Group leaderboard data by week
    const weeks = [1, 2, 3, 4];
    const leaderboardByWeek = weeks.map(week => ({
        week,
        data: leaderboardData.filter(item => item.week === week)
    }));

    return (
        <View style={styles.parentDiv}>
            {/* Notification Bar */}
            <View style={styles.absoluteCode}>
                <Notification />
            </View>

            {/* Scrollable Leaderboard */}
            <ScrollView style={localStyles.scrollContainer}>
                <Text style={localStyles.title}>Leaderboard</Text>
                <TouchableOpacity style={[styles.button, { width: '50%', marginVertical: 0, alignSelf: 'center' }]} onPress={() => { navigation.navigate('Perfomances') }}>
                    <Text style={[styles.buttonText, { fontSize: 15 }]}>Perfomances</Text>
                </TouchableOpacity>
                {leaderboardByWeek.map(({ week, data }) => (
                    <View key={week}>
                        <Text style={localStyles.weekTitle}>Week {week}</Text>

                        {/* Table Header */}
                        <View style={localStyles.tableHeader}>
                            <Text style={[localStyles.headerCell, { width: '15%' }]}>Rank</Text>
                            <Text style={[localStyles.headerCell, { width: '40%' }]}>User</Text>
                            <Text style={[localStyles.headerCell, { width: '30%' }]}>Group</Text>
                            <Text style={[localStyles.headerCell, { width: '15%' }]}>Score</Text>
                        </View>

                        {/* Table Rows */}
                        {data.map((item, index) => {
                            let rowStyle = localStyles.defaultRow;

                            if (index === 0) rowStyle = localStyles.firstPlace;
                            else if (index === 1) rowStyle = localStyles.secondPlace;
                            else if (index === 2) rowStyle = localStyles.thirdPlace;
                            else if (item.user === currentUser) rowStyle = localStyles.currentUserRow;
                            else rowStyle = index % 2 === 0 ? localStyles.evenRow : localStyles.oddRow;

                            return (
                                <View key={index} style={[localStyles.tableRow, rowStyle]}>
                                    <Text style={[localStyles.cell, { width: '15%' }]}>{item.rank}</Text>
                                    <Text style={[localStyles.cell, { width: '40%' }]}>{item.user}</Text>
                                    <Text style={[localStyles.cell, { width: '30%' }]}>{item.group}</Text>
                                    <Text style={[localStyles.cell, { width: '15%' }]}>{item.score}</Text>
                                </View>
                            );
                        })}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const localStyles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 5,
        marginTop: 15,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: colors.primary,
    },
    weekTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 10,
        color: colors.secondary,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: colors.gold,
        padding: 10,
        borderRadius: 8,
        marginBottom: 5,
    },
    headerCell: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.2)',
    },
    firstPlace: {
        backgroundColor: '#FFD700', // Gold
    },
    secondPlace: {
        backgroundColor: '#C0C0C0', // Silver
    },
    thirdPlace: {
        backgroundColor: '#CD7F32', // Bronze
    },
    currentUserRow: {
        backgroundColor: 'rgba(0, 150, 255, 0.5)', // Highlight for logged-in user
    },
    evenRow: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
    },
    oddRow: {
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
    },
    cell: {
        fontSize: 14,
        textAlign: 'center',
        color: 'white',
        paddingVertical: 5,
    }
});

export default LeaderBoardScreen;
