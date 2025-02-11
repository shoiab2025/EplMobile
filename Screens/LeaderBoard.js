import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import styles from '../assets/styles/main_style';
import { useRoute, useNavigation } from '@react-navigation/native';
import { colors } from '../assets/styles/colors';
import Notification from '../Components/notification';

const LeaderBoardScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const group = route.params?.group || {};
    const pdfs = {
        EPL_Season_3_Quizzes: Array.from({ length: 27 }, (_, i) => ({
            content: `Day ${i + 1}`,
            fileUrl: `https://example_pdf.com/day${i + 1}`,
            contentType: 'pdf'
        }))
    };

    const renderItem = (item) => (
        <TouchableOpacity
            style={[styles.listItem, localStyles.listItem]}
            onPress={() => {
                console.log("Opening:", item.fileUrl);
            }}
        >
            <Text style={[styles.listItemText, localStyles.listItemText]}>{item.content}</Text>
        </TouchableOpacity>
    );

    const renderSection = (title, data) => (
        <View style={localStyles.sectionContainer} key={title}>
            <Text style={[styles.headingText, localStyles.sectionTitle]}>{title}</Text>
            <View style={localStyles.gridContainer}> {/* Grid Container */}
                {data.map((item, index) => (
                    renderItem(item)
                ))}
            </View>
        </View>
    );

    return (
        <View style={styles.parentDiv}>
            <View style={styles.absoluteCode}>
                <Notification />
            </View>

            <ScrollView style={{ flex: 1, width: '100%' }}>
                {Object.keys(pdfs).map(sectionTitle => (
                    renderSection(sectionTitle, pdfs[sectionTitle])
                ))}
            </ScrollView>

        </View>
    );
};

const localStyles = StyleSheet.create({
    sectionContainer: {
        width: '100%',
        paddingHorizontal: 10,
        marginTop: 15,
    },
    sectionTitle: {
        textAlign: 'left',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    gridContainer: { // Grid layout styles
        flexDirection: 'row',
        flexWrap: 'wrap', // Allow items to wrap to the next line
        justifyContent: 'space-between', // Distribute space between items
    },
    listItem: {
        width: '30%',
        height: '30%', // Adjust width as needed (e.g., for 3 columns)
        aspectRatio: 1,
        borderRadius: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.38)',
        justifyContent: 'center', // Center content vertically
        alignItems: 'center',    // Center content horizontally
        margin: 5,
    },
    listItemText: {
        color: 'white',
        textAlign: 'center',
    },
    // ... other styles
});

export default LeaderBoardScreen;