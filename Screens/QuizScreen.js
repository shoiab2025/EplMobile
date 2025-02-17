import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { colors } from '../assets/styles/colors';
import Notification from '../Components/notification';
import style from '../assets/styles/main_style';

const QuizScreen = () => {
    const styles = style();
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
            style={[
                styles.listItem,
                localStyles.listItem,
                { backgroundColor: item.content === 'Day 1' ?  colors.lightGray : 'gray' }
            ]}
            onPress={() => {
                console.log("Opening:", item.fileUrl);
                navigation.navigate("TestScreen", { item , screen: 'Quizzes'}); // Ensure navigation is defined
            }}
            disabled={item.content !== 'Day 1'}
        >
            <Text
                style={[
                    styles.listItemText,
                    localStyles.listItemText,
                    { color: item.content === 'Day 1' ? colors.primary  : 'rgba(255,255,255, 0.34)', fontSize: 18 }
                ]}
            >
                {item.content}
            </Text>
        </TouchableOpacity>
    );

    const renderSection = (title, data) => (
        <View style={localStyles.sectionContainer} key={title}>
            <Text style={[styles.headingText, localStyles.sectionTitle, {textTransform: 'capitalize', fontSize: 20}]}>Epl Season 3</Text>
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
                {Object.keys(pdfs).map(sectionTitle => renderSection(sectionTitle, pdfs[sectionTitle]))}
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
        height: 5,
        elevation: 4,
    },
    listItemText: {
        textAlign: 'center',
        fontWeight: '700'
    },
});

export default QuizScreen;
