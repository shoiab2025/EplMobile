import { 
    View, Text, TouchableOpacity, StyleSheet, ScrollView, 
    TouchableWithoutFeedback, Keyboard 
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { colors } from '../assets/styles/colors';
import Notification from '../Components/notification';
import style from '../assets/styles/main_style';
import { parseGradient } from '../Components/gradient';
import { useAuth } from './AuthContext';
import LinearGradient from 'react-native-linear-gradient';
import { getAllTestById } from '../API_STORE/testApi';
import Toast from 'react-native-toast-message';
import { getAllSchedules } from '../API_STORE/scheduleApi';
import { app_config } from '../assets/app_config';

const QuizScreen = () => {
    const styles = style();
    const route = useRoute();
    const navigation = useNavigation();
    const group = route.params?.group || {};
    const { groupTheme } = useAuth();
    const [allTest, setAllTest] = useState([]);
    const [allSchedules, setAllSchedules] = useState([]);
    
    // Dynamically calculate the season based on the year
    const baseYear = 2022; // Adjust this based on when season 3 started
    const currentYear = new Date().getFullYear();
    const season = (currentYear - baseYear);
    
    const pdfs = {
        [`EPL_Season_${season}_Quizzes`]: Array.from({ length: 27 }, (_, i) => ({
            content: `Day ${i + 1}`,
        }))
    };

    const { isGradient, gradientColors, start, end, solidColor } = parseGradient(groupTheme);

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
                    text1: 'Tests yet Not released'
                });
            }
        }, 3000);

        return () => clearTimeout(timeout);
    }, [allTest]);
    
    const renderItem = (item, index) => {
        const isPublished = allTest[index]?.publish;
        return (
            <TouchableOpacity
                key={index}
                style={[
                    styles.listItem,
                    localStyles.listItem,
                    { backgroundColor: isPublished ? colors.lightGray : 'gray' }
                ]}
                onPress={() => {
                    if (allTest[index]) {
                        navigation.navigate("TestScreen", { item, screen: 'Quizzes', test: allTest[index] });
                    }
                }}
                disabled={!isPublished}
            >
                <Text
                    style={[
                        styles.listItemText,
                        localStyles.listItemText,
                        { color: isPublished ? colors.primary : 'rgba(255,255,255, 0.34)', fontSize: 20 }
                    ]}
                >
                    {item.content}
                </Text>
            </TouchableOpacity>
        );
    };

    const renderSection = (title, data) => (
        <View style={localStyles.sectionContainer} key={title}>
            <Text style={[styles.headingText, localStyles.sectionTitle, { textTransform: 'capitalize', fontSize: 25 }]}>
                EPL Season {season} Quizzes
            </Text>
            <View style={localStyles.gridContainer}>
                {data.map((item, index) => renderItem(item, index))}
            </View>
        </View>
    );

    const renderContent = () => (
        <>
            <View style={styles.absoluteCode}>
                <Notification />
            </View>
            <ScrollView style={{ flex: 1, width: '100%' }}>
                {Object.keys(pdfs).map(sectionTitle => renderSection(sectionTitle, pdfs[sectionTitle]))}
            </ScrollView>
        </>
    );

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
        fontFamily: 'CrimsonText-Bold',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    listItem: {
        width: '30%',
        aspectRatio: 1,
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
        fontWeight: '700',
    },
});

export default QuizScreen;
