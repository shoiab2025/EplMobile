import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { colors } from '../assets/styles/colors';
import Notification from '../Components/notification';
import style from '../assets/styles/main_style';
import { parseGradient } from '../Components/gradient';
import { useAuth } from './AuthContext';
import LinearGradient from 'react-native-linear-gradient';
import { getAllTest } from '../API_STORE/testApi';
import Toast from 'react-native-toast-message';

const QuizScreen = () => {
    const styles = style();
    const route = useRoute();
    const navigation = useNavigation();
    const group = route.params?.group || {};
    const { groupTheme, authUser } = useAuth();
    const [allTest, setAllTest] = useState([]);
    const pdfs = {
        EPL_Season_3_Quizzes: Array.from({ length: 27 }, (_, i) => ({
            content: `Day ${i + 1}`,
            fileUrl: `https://example_pdf.com/day${i + 1}`,
            contentType: 'pdf'
        }))
    };
    const { isGradient, gradientColors, start, end, solidColor } = parseGradient(groupTheme);

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const response = await getAllTest();
                if (response.success) {
                    setAllTest(response.data);
                    console.log(response.data);
                    
                } else {
                    console.error("Failed to fetch tests:", response.message);
                }
            } catch (error) {
                console.error("Error fetching tests:", error);
            }
        };

        fetchTests();
    }, []);

    setTimeout(() => {
        if(allTest.length === 0) {
            Toast.show({
                type: 'info',
                text1: 'Test yet Not released'
            })
        }
    }, 3000)

    const renderItem = (item, index) => (
        <TouchableOpacity
            style={[
                styles.listItem,
                localStyles.listItem,
                { backgroundColor:  !allTest[index]?.publish? 'gray' :colors.lightGray }
            ]}
            key={index}
            onPress={() => {
                navigation.navigate("TestScreen", { item, screen: 'Quizzes', test: allTest[index] }); // Ensure navigation is defined
            }}
            disabled={!allTest[index]?.publish}
        >
            <Text
                style={[
                    styles.listItemText,
                    localStyles.listItemText,
                    { color: allTest[index]?.publish ? colors.primary : 'rgba(255,255,255, 0.34)', fontSize: 22 }
                ]}
            >
                {item.content}{console.log("Indexlist", allTest[index])
                }
            </Text>
        </TouchableOpacity>
            
    );

    const renderSection = (title, data) => (
        <View style={localStyles.sectionContainer} key={title}>
            <Text style={[styles.headingText, localStyles.sectionTitle, { textTransform: 'capitalize', fontSize: 20 }]}>Epl Season 3 quizzes</Text>
            <View style={localStyles.gridContainer}>
                {data.map((item, index) => renderItem(item, index))}
            </View>
        </View>
    );

    const renderContent = () => {
        return (
            <>
                <View style={styles.absoluteCode}>
                    <Notification />
                </View>

                <ScrollView style={{ flex: 1, width: '100%' }}>
                    {Object.keys(pdfs).map(sectionTitle => renderSection(sectionTitle, pdfs[sectionTitle]))}
                </ScrollView>
            </>
        )
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
    sectionContainer: {
        width: '100%',
        paddingHorizontal: 0,
        marginTop: 15,
    },
    sectionTitle: {
        textAlign: 'left',
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 20,
        fontFamily: 'CrimsonText-Bold'

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
