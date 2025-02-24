import {
    View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, Pressable,
    Share, Alert, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import React, { useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { colors } from '../assets/styles/colors';
import Notification from '../Components/notification';
import style from '../assets/styles/main_style';
import { app_config } from '../assets/app_config';
import { parseGradient } from '../Components/gradient';
import { useAuth } from './AuthContext';
import LinearGradient from 'react-native-linear-gradient';

const PerfomanceScreen = () => {
    const styles = style();
    const route = useRoute();
    const navigation = useNavigation();
    const group = route.params?.group || {};
    const { groupTheme, authUser } = useAuth();

    // Modal state
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const pdfs = {
        EPL_Season_3_Quizzes: Array.from({ length: 27 }, (_, i) => ({
            content: `Day ${i + 1}`,
            fileUrl: `https://example_pdf.com/day${i + 1}`,
            rank: i + 10,
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
                message: `🎉 Hey there! I just completed the EPL Quiz and ranked ${selectedItem.rank}! 🏆💯\n\nDownload the EPL Quiz App now and join the competition! 🚀📲\n🔗 https://example.com/app`
            });
        } catch (error) {
            Alert.alert('Error', 'Oops! Something went wrong while sharing.');
            console.error(error);
        }
    };

    const renderItem = (item) => (
        <TouchableOpacity
            key={item.content}
            style={[localStyles.listItem, { backgroundColor: 'gray' }]}
            onPress={() => openModal(item)}
            disabled={false}
        >
            <Text>{app_config.svgs.circleIcon('rgba(255,255,255, 0.34)')}</Text>
            <Text style={localStyles.listItemText}>{item.content}</Text>
        </TouchableOpacity>
    );

    const renderSection = (title, data) => (
        <View style={localStyles.sectionContainer} key={title}>
            <Text style={localStyles.sectionTitle}>EPL Season 3 Performance</Text>
            <TouchableOpacity style={[styles.button, { width: '50%', marginVertical: 15 }]} onPress={() => navigation.navigate('LeaderBoard')}>
                <Text style={styles.buttonText}>Leader Board</Text>
            </TouchableOpacity>
            <View style={localStyles.gridContainer}>{data.map(renderItem)}</View>
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
                            <Text style={[localStyles.modalText, { marginBottom: 0, color: colors.white, fontSize: 50 }]}>{selectedItem?.rank}</Text>
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
    listItem: { width: '30%', aspectRatio: 1, borderRadius: 8, justifyContent: 'center', alignItems: 'center', margin: 5 },
    listItemText: { textAlign: 'center', fontWeight: '700', color: 'rgba(255,255,255,0.34)', marginTop: 5 },
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