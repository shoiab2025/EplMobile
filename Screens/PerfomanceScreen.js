import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, Pressable, Share, Alert } from 'react-native';
import React, { useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { colors } from '../assets/styles/colors';
import Notification from '../Components/notification';
import style from '../assets/styles/main_style';
import { app_config } from '../assets/app_config';
import TabViewExample from '../Components/TabView';
import LibraryScreen from './LibraryScreen';

const PerfomanceScreen = () => {
    const styles = style();
    const route = useRoute();
    const navigation = useNavigation();
    const group = route.params?.group || {};
    console.log(route.name);

    // State for Modal Visibility & Selected Item
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const pdfs = {
        EPL_Season_3_Quizzes: Array.from({ length: 27 }, (_, i) => ({
            content: `Day ${i + 1}`,
            fileUrl: `https://example_pdf.com/day${i + 1}`,
            rank: i + 10, // Assigning rank separately
            contentType: 'pdf'
        }))
    };

    const openModal = (item) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedItem(null);
    };

    const handleShareApp = async () => {
        if (!selectedItem) return;
        try {
            await Share.share({
                message: `🎉 Hey there! I just completed the EPL Quiz and ranked ${selectedItem.rank}! 🏆💯
Think you can beat my score? 🧐 Test your knowledge with fun quizzes, exciting challenges, and earn your spot on the leaderboard! 📚🔥

Download the EPL Quiz App now and join the competition! 🚀📲
🔗 https://example.com/app`
            });
        } catch (error) {
            Alert.alert('Error', 'Oops! Something went wrong while sharing the fun.');
            console.error(error);
        }
    };

    const renderItem = (item) => (
        <TouchableOpacity
            key={item.content}
            style={[
                styles.listItem,
                localStyles.listItem,
                { backgroundColor: item.content === 'Day 1' ? colors.lightGray : 'gray' }
            ]}
            onPress={() => openModal(item)} // Open modal on press
        >
            <Text>
                {item.content !== 'Day 1'
                    ? app_config.svgs.circleIcon('rgba(255,255,255, 0.34)')
                    : app_config.svgs.starIcon(colors.darkGold)}
            </Text>
            <Text
                style={[
                    localStyles.listItemText,
                    { color: item.content === 'Day 1' ? colors.primary : 'rgba(255,255,255, 0.34)', marginTop: 5 }
                ]}
            >
                {item.content}
            </Text>
        </TouchableOpacity>
    );

    const renderSection = (title, data) => (
        <View style={localStyles.sectionContainer} key={title}>
            <Text style={[styles.headingText, localStyles.sectionTitle, { alignSelf: 'center' }]}>EPL Season 3</Text>

            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>

                <TouchableOpacity style={[styles.button, { width: '50%', marginVertical: 10, alignSelf: 'center' }]} onPress={() => {navigation.navigate('LeaderBoard')}}>
                    <Text style={[styles.buttonText, { fontSize: 15 }]}>Leader Board</Text>
                </TouchableOpacity>
            </View>
            <View style={localStyles.gridContainer}>
                {data.map((item) => renderItem(item))}
            </View>
        </View>
    );

    return (
        <View style={[styles.parentDiv, { paddingTop: 20 }]}>
            <View style={styles.absoluteCode}>
                <Notification />
            </View>

            <ScrollView style={{ flex: 1, width: '100%' }}>
                {Object.keys(pdfs).map((sectionTitle) => renderSection(sectionTitle, pdfs[sectionTitle]))}
            </ScrollView>

            {/* Modal for Item Details */}
            <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={closeModal} style={{ backgroundColor: colors.white }}>
                <View style={localStyles.modalContainer}>
                    <View style={localStyles.modalContent}>
                        <Text style={localStyles.modalTitle}>{selectedItem?.content}</Text>
                        <Text style={localStyles.modalText}>Your Rank is {selectedItem?.rank}</Text>
                        <Text style={styles.closeBtn} onPress={closeModal}>
                            {app_config.svgs.closeIcon}
                        </Text>
                        {/* Buttons */}
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Pressable style={localStyles.closeButton} onPress={handleShareApp}>
                                <Text style={localStyles.closeButtonText}>Share</Text>
                            </Pressable>
                            <Pressable style={localStyles.closeButton} onPress={() => { navigation.navigate('TestScreen', { screen: route.name }) }}>
                                <Text style={localStyles.closeButtonText}>Try again</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const localStyles = StyleSheet.create({
    sectionContainer: {
        width: '100%',
        paddingHorizontal: 0,
        marginTop: 15,
    },
    sectionTitle: {
        textAlign: 'left',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    listItem: {
        width: '30%',
        aspectRatio: 1, // Keeps square shape
        borderRadius: 8,
        backgroundColor: colors.lightGray,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        elevation: 4,
    },
    listItemText: {
        textAlign: 'center',
        fontWeight: '700',
    },
    // Modal Styles
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.64)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: colors.white,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 15,
        fontWeight: '700',
        color: colors.primary,
    },
    closeButton: {
        backgroundColor: colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: '45%',
        justifyContent: 'center',
    },
    closeButtonText: {
        color: colors.white,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default PerfomanceScreen;
