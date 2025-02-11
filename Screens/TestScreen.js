import { View, Text, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import style from '../assets/styles/main_style';
import { app_config } from '../assets/app_config';
import { colors } from '../assets/styles/colors';
import Confetti from '../Components/confetti';

const TestScreen = () => {
    const route = useRoute();
    const group = route.params?.group || {};
    const [selectedOption, setSelectedOption] = useState(null);
    const [counter, setCounter] = useState(0);
    const [isAnswered, setIsAnswered] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showScoreModal, setShowScoreModal] = useState(false);
    const [score, setScore] = useState(0);
    const styles = style();

    const questions = [
        {
            question: "How many rak'ahs are there in the Taraweeh prayer?",
            options: [
                "10 rak'ahs",
                "20 rak'ahs",
                "8 rak'ahs",
                "12 rak'ahs"
            ],
            correctAnswer: 1 // "20 rak'ahs"
        },
        {
            question: "What was the name of Prophet Ibrahim’s son who was almost sacrificed?",
            options: [
                "Ismail (a.s)",
                "Ishaq (a.s)",
                "Yusuf (a.s)",
                "Yunus (a.s)"
            ],
            correctAnswer: 0 // "Ismail (a.s)"
        },
        // More questions...
    ];

    const correctAnswer = questions[counter]?.correctAnswer;
    const options = questions[counter]?.options || [];
    const questionText = questions[counter]?.question || "";
    const navigation = useNavigation();

    const handleNextButton = () => {
        // If it's the last question, show the confirmation modal
        if (counter === questions.length - 1) {
            setShowConfirmationModal(true);
        } else {
            // Move to the next question and reset the selected option
            if (selectedOption !== null) {
                if (selectedOption === correctAnswer) {
                    setScore(prevScore => prevScore + 1);
                }
                setCounter(prevCounter => prevCounter + 1);
                setSelectedOption(null);
                setIsAnswered(false);
            }
        }
    };

    const handleSubmitAnswer = () => {
        // Check if the selected option is correct and update the score
        if (selectedOption === correctAnswer) {
            setScore(prevScore => prevScore + 1);
        }

        // Hide the confirmation modal and show the score modal
        setShowConfirmationModal(false);
        setShowScoreModal(true);
    };

    const handleCancel = () => {
        setShowConfirmationModal(false); // Close the modal if the user cancels
    };

    const handleCloseScoreModal = () => {
        setShowScoreModal(false); 
        navigation.navigate('Home', {group: group})
    };

    return (
        <View style={styles.parentDiv}>
            {/* Question Counter */}
            <View style={[styles.notificationStyle, {
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: colors.lightGray,
                paddingVertical: 5,
                paddingHorizontal: 10,
            }]}>
                {app_config.svgs.questionIcon}
                <Text style={{ marginLeft: 5, fontSize: 16, fontWeight: 'bold', color: colors.primary }}>
                    {`${counter + 1} / ${questions.length}`}
                </Text>
            </View>

            {/* Question Box */}
            <View style={[styles.whiteCardBgStyle, { marginVertical: 15, padding: 20 }]}>
                <Text style={[styles.text_default, { fontSize: 20, lineHeight: 30 }]}>{questionText}</Text>
            </View>

            {/* Radio Options */}
            <View style={{ width: '100%' }}>
                {options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.whiteCardBgStyle, { flexDirection: 'row', alignItems: 'center', marginTop: 10, paddingHorizontal: 30 }]}
                        onPress={() => {
                            setSelectedOption(index);
                            setIsAnswered(true);
                        }}
                    >
                        <View style={{
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            borderWidth: 2,
                            borderColor: colors.primary,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: 10
                        }}>
                            {selectedOption === index && (
                                <View style={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: 6,
                                    backgroundColor: colors.primary
                                }} />
                            )}
                        </View>
                        <Text style={{ fontSize: 16, color: colors.textDefault, textAlign: 'left', width: '100%' }}>{option}</Text>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity
                    style={[styles.button, { height: 50, marginVertical: 10, width: '100%' }]}
                    onPress={handleNextButton}
                    disabled={!isAnswered}
                >
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>

            {/* Confirmation Modal */}
            <Modal
                visible={showConfirmationModal}
                animationType="fade"
                transparent={true}
                onRequestClose={handleCancel}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={[styles.whiteCardBgStyle, { width: '80%', padding: 20, alignItems: 'center' }]}>
                        <Text style={[styles.text_default, { fontSize: 18 }]}>Do you want to submit your answers?</Text>
                        <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', width: '100%' }}>
                            <TouchableOpacity onPress={handleSubmitAnswer} style={[styles.button, { width: '45%' }]}>
                                <Text style={styles.buttonText}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleCancel} style={[styles.button, { width: '45%' }]}>
                                <Text style={styles.buttonText}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Score Modal */}
            <Modal
                visible={showScoreModal}
                animationType="fade"
                transparent={true}
                onRequestClose={handleCloseScoreModal}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={[styles.whiteCardBgStyle, { width: '80%', padding: 20, alignItems: 'center' }]}>
                        <Text style={[styles.text_default, { fontSize: 18 }]}>Test Completed!</Text>
                        <Text style={[styles.text_default, { fontSize: 16, marginTop: 10 }]}>Your Score: {score}/{questions.length}</Text>
                        <TouchableOpacity onPress={handleCloseScoreModal} style={[styles.button, { width: '100%', marginTop: 20 }]}>
                            <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default TestScreen;
