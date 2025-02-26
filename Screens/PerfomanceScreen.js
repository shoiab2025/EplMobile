import {
    View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, Pressable,
    Share, Alert, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { colors } from '../assets/styles/colors';
import Notification from '../Components/notification';
import style from '../assets/styles/main_style';
import { app_config } from '../assets/app_config';
import { parseGradient } from '../Components/gradient';
import { useAuth } from './AuthContext';
import LinearGradient from 'react-native-linear-gradient';
import { getAllSchedules } from '../API_STORE/scheduleApi';
import { getAllTestById } from '../API_STORE/testApi';
import { getRankForUser } from '../API_STORE/userLeaderBoardApI';
import Toast from 'react-native-toast-message';

const PerfomanceScreen = () => {
    const styles = style();
    const route = useRoute();
    const navigation = useNavigation();
    const { groupTheme, authUser, group, setCurrentScore } = useAuth();
    const baseYear = 2022; // Adjust this based on when season 3 started
    const currentYear = new Date().getFullYear();
    const season = (currentYear - baseYear);
    // Modal state
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [allTest, setAllTest] = useState([]);
    const [allSchedules, setAllSchedules] = useState([]);
    const [currentUserRank, setCurrentUserRank] = useState({});

    const getRank = async (testId) => {
        try {
            const rank = await getRankForUser(group?._id, testId, authUser?._id);
            console.log("UI Response rank", rank);

            setCurrentUserRank(prevState => ({
                ...prevState,
                [testId]: rank
            }));
        } catch (error) {
            console.error("Error fetching rank:", error);
            return "Error retrieving rank";
        }
    };

    useEffect(() => {
        if (allTest.length > 0) {
            allTest.forEach(test => {
                if (test?._id) {
                    getRank(test._id);
                }
            });
        }
    }, [allTest]); // Runs when allTest changes    

    let totalScore = 0;

    const pdfs = {
        EPL_Season_3_Quizzes: Array.from({ length: 27 }, (_, i) => {

            const userScore = currentUserRank[allTest[i]?._id]?.userScore || 0;
            totalScore += userScore; // Accumulate the score
            return {
                content: `Day ${i + 1}`,
                rank: currentUserRank[allTest[i]?._id]?.userRank,
            };
        })
    };

    setCurrentScore(totalScore);

    const openModal = (item) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedItem(null);
    };

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const response = await getAllSchedules();
                console.log('Quizzes:', response);

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
        const timeout = setTimeout(() => {
            if (allTest.length === 0) {
                Toast.show({
                    type: 'info',
                    text1: 'Tests Rank Not Yet Released'
                });
            }
        }, 3000);

        return () => clearTimeout(timeout);
    }, [allTest]);

    const handleShareApp = async () => {
        if (!selectedItem) return;
        try {
            await Share.share({
                message: `🎉 Hey there! I just completed the EPL Quiz and ranked ${selectedItem.rank}! 🏆💯\n\nDownload the EPL Quiz App now and join the competition! 🚀📲\n🔗 https://theafafway.com/`
            });
        } catch (error) {
            Alert.alert('Error', 'Oops! Something went wrong while sharing.');
            console.error(error);
        }
    };

    const renderItem = (item, index) => (
        <TouchableOpacity
            key={item.content}
            style={[localStyles.listItem, { backgroundColor: Object.keys(currentUserRank).includes(allTest[index]?._id) ? colors.lightGray : 'gray' }]}
            onPress={() => openModal(item)}
            disabled={!Object.keys(currentUserRank).includes(allTest[index]?._id)}
        >
            {
                Object.keys(currentUserRank).includes(allTest[index]?._id) ? (

                    (currentUserRank[allTest[index]?._id]?.userRank != undefined) ?
                        (<Text>{app_config.svgs.starIcon()}</Text>) :
                        (<Text>{app_config.svgs.circleIcon()}</Text>)

                )
                    : (
                        <Text>{app_config.svgs.circleIcon('rgba(255,255,255, 0.34)')}</Text>
                    )
            }
            <Text style={[localStyles.listItemText, { color: Object.keys(currentUserRank).includes(allTest[index]?._id) ? colors.primary : 'rgba(255,255,255, 0.34)' }]}>{item.content}</Text>
        </TouchableOpacity >
    );

    const renderSection = (title, data) => (
        <View style={localStyles.sectionContainer} key={title}>
            <Text style={localStyles.sectionTitle}> EPL Season {season} Perfomance</Text>
            <TouchableOpacity style={[styles.button, { width: '50%', marginVertical: 15 }]} onPress={() => navigation.navigate('LeaderBoard')}>
                <Text style={styles.buttonText}>Leader Board</Text>
            </TouchableOpacity>
            <View style={localStyles.gridContainer}>{data.map((item, index) => renderItem(item, index))}</View>
        </View>
    );

    const { isGradient, gradientColors, start, end, solidColor } = parseGradient(groupTheme);

    const renderContent = () => {
        return (
            <>
                <View style={styles.absoluteCode}><Notification /></View>
                <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={closeModal} style={{ backgroundColor: colors.white }}>
                    <View style={localStyles.modalContainer}>
                        <View style={localStyles.modalContent}>
                            <Text style={[localStyles.modalText, { fontSize: 24 }]}>Rank</Text>
                            <View style={[localStyles.closeButton, { marginBottom: 15, height: 150, width: '100%', justifyContent: 'center', alignItems: 'center' }]}>
                                {selectedItem?.rank != undefined ? <Text style={[localStyles.modalText, { marginBottom: 0, color: colors.white, fontSize: 50, textAlign: 'center' }]}>{selectedItem?.rank}</Text>
                                    : <Text style={[localStyles.modalText, { marginBottom: 0, color: colors.white, fontSize: 20, textAlign: 'center' }]}>Rank not found</Text>}
                                <Text style={[localStyles.modalTitle, { marginBottom: 0, color: colors.white }]}>{selectedItem?.content}</Text>

                            </View>
                            <Text style={styles.closeBtn} onPress={closeModal}>
                                {app_config.svgs.closeIcon}
                            </Text>
                            {/* Buttons */}
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                                <Pressable style={localStyles.closeButton} onPress={handleShareApp}>
                                    <Text style={localStyles.closeButtonText}>Share</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
                <ScrollView style={{ flex: 1, width: '100%' }}>
                    {Object.keys(pdfs).map(sectionTitle => renderSection(sectionTitle, pdfs[sectionTitle]))}
                </ScrollView>
            </>
        );
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {isGradient ? (
                <LinearGradient colors={gradientColors} start={start} end={end} style={styles.parentDiv}>
                    {renderContent()}
                </LinearGradient>
            ) : (
                <View style={[styles.parentDiv, { backgroundColor: solidColor }]}>
                    {renderContent()}
                </View>
            )}
        </TouchableWithoutFeedback>
    );
};

const localStyles = StyleSheet.create({
    sectionContainer: { marginTop: 15, paddingTop: 25 },
    sectionTitle: { textAlign: 'center', fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
    gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    listItem: { width: '30%', aspectRatio: 1, borderRadius: 8, justifyContent: 'center', alignItems: 'center', margin: 5, padding: 10 },
    listItemText: { textAlign: 'center', fontWeight: '700', color: 'rgba(255,255,255,0.34)', marginTop: 5, fontSize: 20 },
    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.64)' },
    modalContent: { width: '80%', padding: 20, backgroundColor: colors.white, borderRadius: 10, alignItems: 'center' },
    modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    modalText: { fontSize: 16, marginBottom: 15, fontWeight: '700', color: colors.primary },
    rankContainer: { marginBottom: 15, height: 150, width: '100%', justifyContent: 'center', alignItems: 'center' },
    rankText: { fontSize: 50, fontWeight: 'bold', color: colors.white },
    closeButton: { backgroundColor: colors.primary, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 },
    closeButtonText: { color: colors.white, fontWeight: 'bold', textAlign: 'center' }
});

export default PerfomanceScreen;