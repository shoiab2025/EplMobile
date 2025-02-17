import { View, Text, TouchableOpacity, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import style from '../assets/styles/main_style';
import { app_config } from '../assets/app_config';
import { colors } from '../assets/styles/colors';
import Confetti from '../Components/confetti';
import Toast from 'react-native-toast-message';

const TestScreen = () => {
    const route = useRoute();
    const group = route.params?.group || {};
    const [selectedOption, setSelectedOption] = useState(null);
    const [counter, setCounter] = useState(0);
    const [isAnswered, setIsAnswered] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showScoreModal, setShowScoreModal] = useState(false);
    const [showLanguageModal, setShowLanguageModal] = useState(true); // Show language selection at start
    const [selectedLanguage, setSelectedLanguage] = useState('english'); // Default language
    const [score, setScore] = useState(0);
    const styles = style();
    const screen = route.params?.screen;
    const questionEnglish = [
        // Taraweeh
        {
            question: "How many rak'ahs are there in the Taraweeh prayer?",
            options: ["10 rak'ahs", "20 rak'ahs", "8 rak'ahs", "12 rak'ahs"],
            correctAnswer: 1,
            questionType: "MCQ",
            questionCategory: "taraweeh"
        },
        {
            question: "In which Islamic month is the Taraweeh prayer performed?",
            options: ["Muharram", "Shaban", "Ramadan", "Dhul Hijjah"],
            correctAnswer: 2,
            questionType: "MCQ",
            questionCategory: "taraweeh"
        },
        {
            question: "Who was the first Caliph to establish Taraweeh in congregation?",
            options: ["Caliph Umar (RA)", "Caliph Abu Bakr (RA)", "Caliph Uthman (RA)", "Caliph Ali (RA)"],
            correctAnswer: 0,
            questionType: "MCQ",
            questionCategory: "taraweeh"
        },
        {
            question: "What is the primary purpose of the Taraweeh prayer?",
            options: ["Celebration", "Seeking forgiveness", "Physical exercise", "Community gathering"],
            correctAnswer: 1,
            questionType: "MCQ",
            questionCategory: "taraweeh"
        },
        {
            question: "How many rak’ahs is the recommended maximum for Taraweeh?",
            options: ["16", "20", "12", "24"],
            correctAnswer: 1,
            questionType: "MCQ",
            questionCategory: "taraweeh"
        },
    
        // Seerah
        {
            question: "How old was Prophet Muhammad (PBUH) when he received the first revelation?",
            options: ["30 years", "35 years", "40 years", "45 years"],
            correctAnswer: 2,
            questionType: "MCQ",
            questionCategory: "seerah"
        },
        {
            question: "Where did Prophet Muhammad (PBUH) receive his first revelation?",
            options: ["Masjid al-Haram", "Cave Hira", "Masjid al-Nabawi", "Mount Sinai"],
            correctAnswer: 1,
            questionType: "MCQ",
            questionCategory: "seerah"
        },
        {
            question: "Who was the first person to accept Islam?",
            options: ["Abu Bakr (RA)", "Ali (RA)", "Khadijah (RA)", "Umar (RA)"],
            correctAnswer: 2,
            questionType: "MCQ",
            questionCategory: "seerah"
        },
        {
            question: "Which battle was the first major battle in Islam?",
            options: ["Battle of Uhud", "Battle of Badr", "Battle of Hunayn", "Battle of Khandaq"],
            correctAnswer: 1,
            questionType: "MCQ",
            questionCategory: "seerah"
        },
        {
            question: "Who was the mother of Prophet Muhammad (PBUH)?",
            options: ["Aisha (RA)", "Haleema (RA)", "Aminah (RA)", "Fatima (RA)"],
            correctAnswer: 2,
            questionType: "MCQ",
            questionCategory: "seerah"
        },
    
        // Essence of Islam
        {
            question: "How many pillars are there in Islam?",
            options: ["Three", "Five", "Seven", "Ten"],
            correctAnswer: 1,
            questionType: "MCQ",
            questionCategory: "essenceOfIslam"
        },
        {
            question: "What is the first pillar of Islam?",
            options: ["Salah", "Zakat", "Shahada", "Hajj"],
            correctAnswer: 2,
            questionType: "MCQ",
            questionCategory: "essenceOfIslam"
        },
        {
            question: "Which book was revealed to Prophet Muhammad (PBUH)?",
            options: ["Torah", "Bible", "Quran", "Psalms"],
            correctAnswer: 2,
            questionType: "MCQ",
            questionCategory: "essenceOfIslam"
        },
        {
            question: "What is the name of the Islamic declaration of faith?",
            options: ["Salam", "Shahada", "Tawheed", "Dua"],
            correctAnswer: 1,
            questionType: "MCQ",
            questionCategory: "essenceOfIslam"
        },
        {
            question: "Which prayer is performed before sunrise?",
            options: ["Fajr", "Dhuhr", "Maghrib", "Isha"],
            correctAnswer: 0,
            questionType: "MCQ",
            questionCategory: "essenceOfIslam"
        },
    
        // Prophet Stories
        {
            question: "Which prophet built the Kaaba?",
            options: ["Prophet Adam (a.s)", "Prophet Ibrahim (a.s)", "Prophet Musa (a.s)", "Prophet Isa (a.s)"],
            correctAnswer: 1,
            questionType: "MCQ",
            questionCategory: "prophetStories"
        },
        {
            question: "Which prophet was swallowed by a whale?",
            options: ["Prophet Yunus (a.s)", "Prophet Nuh (a.s)", "Prophet Musa (a.s)", "Prophet Harun (a.s)"],
            correctAnswer: 0,
            questionType: "MCQ",
            questionCategory: "prophetStories"
        },
        {
            question: "Which prophet was given the miracle of splitting the sea?",
            options: ["Prophet Ibrahim (a.s)", "Prophet Musa (a.s)", "Prophet Isa (a.s)", "Prophet Nuh (a.s)"],
            correctAnswer: 1,
            questionType: "MCQ",
            questionCategory: "prophetStories"
        },
        {
            question: "Which prophet is known as the father of all prophets?",
            options: ["Prophet Ibrahim (a.s)", "Prophet Adam (a.s)", "Prophet Isa (a.s)", "Prophet Muhammad (PBUH)"],
            correctAnswer: 1,
            questionType: "MCQ",
            questionCategory: "prophetStories"
        },
        {
            question: "Which prophet could communicate with animals and control the wind?",
            options: ["Prophet Yusuf (a.s)", "Prophet Dawood (a.s)", "Prophet Sulaiman (a.s)", "Prophet Ayub (a.s)"],
            correctAnswer: 2,
            questionType: "MCQ",
            questionCategory: "prophetStories"
        }
    ];
    

    const questionTamil = [
        // Taraweeh
        {
            question: "தராவீஹ் தொழுகையில் எத்தனை ரக்அத்கள் உள்ளன?",
            options: ["10 ரக்அத்கள்", "20 ரக்அத்கள்", "8 ரக்அத்கள்", "12 ரக்அத்கள்"],
            correctAnswer: 1,
            questionType: "MCQ",
            questionCategory: "taraweeh"
        },
        {
            question: "தராவீஹ் தொழுகை எந்த இஸ்லாமிய மாதத்தில் செய்யப்படுகிறது?",
            options: ["முஹர்ரம்", "ஷஅபான்", "ரமழான்", "துல்ஹிஜ்ஜா"],
            correctAnswer: 2,
            questionType: "MCQ",
            questionCategory: "taraweeh"
        },
        {
            question: "தராவீஹ் தொழுகையை சமூகவழியில் ஏற்படுத்திய முதல் கலீபா யார்?",
            options: ["கலீபா உமர் (ரலி)", "கலீபா அபூபக்கர் (ரலி)", "கலீபா உஸ்மான் (ரலி)", "கலீபா அலி (ரலி)"],
            correctAnswer: 0,
            questionType: "MCQ",
            questionCategory: "taraweeh"
        },
        {
            question: "தராவீஹ் தொழுகையின் முக்கிய நோக்கம் என்ன?",
            options: ["கொண்டாட்டம்", "மன்னிப்புக் கேட்பது", "உடற்கட்டுமான பயிற்சி", "சமூக சந்திப்பு"],
            correctAnswer: 1,
            questionType: "MCQ",
            questionCategory: "taraweeh"
        },
        {
            question: "தராவீஹ் தொழுகைக்கு பரிந்துரைக்கப்பட்ட அதிகபட்ச ரக்அத்கள் எத்தனை?",
            options: ["16", "20", "12", "24"],
            correctAnswer: 1,
            questionType: "MCQ",
            questionCategory: "taraweeh"
        },
    
        // Seerah
        {
            question: "முதலாவது வெளிப்பாடின்போது நபி (ஸல்) எத்தனை வயதாக இருந்தார்?",
            options: ["30", "35", "40", "45"],
            correctAnswer: 2,
            questionType: "MCQ",
            questionCategory: "seerah"
        },
        {
            question: "நபி (ஸல்) முதல் வெளிப்பாடை பெற்ற இடம் எது?",
            options: ["மஸ்ஜிதுல் ஹராம்", "ஹிரா குகை", "மஸ்ஜிதுன் நபவி", "சீனை மலை"],
            correctAnswer: 1,
            questionType: "MCQ",
            questionCategory: "seerah"
        },
        {
            question: "இஸ்லாத்தை முதலில் ஏற்றுக்கொண்டவர் யார்?",
            options: ["அபூபக்கர் (ரலி)", "அலி (ரலி)", "கதீஜா (ரலி)", "உமர் (ரலி)"],
            correctAnswer: 2,
            questionType: "MCQ",
            questionCategory: "seerah"
        },
        {
            question: "இஸ்லாத்தின் முதல் பெரிய போர் எது?",
            options: ["உஹுத் போர்", "பத்ர் போர்", "ஹுனைன் போர்", "கந்தக் போர்"],
            correctAnswer: 1,
            questionType: "MCQ",
            questionCategory: "seerah"
        },
        {
            question: "நபி (ஸல்) அவர்களின் தாயார் யார்?",
            options: ["ஆயிஷா (ரலி)", "ஹலீமா (ரலி)", "ஆமினா (ரலி)", "பாத்திமா (ரலி)"],
            correctAnswer: 2,
            questionType: "MCQ",
            questionCategory: "seerah"
        },
    
        // Essence of Islam
        {
            question: "இஸ்லாத்தில் எத்தனை தூண்கள் உள்ளன?",
            options: ["மூன்று", "ஐந்து", "எழு", "பத்து"],
            correctAnswer: 1,
            questionType: "MCQ",
            questionCategory: "essenceOfIslam"
        },
        {
            question: "இஸ்லாத்தின் முதல் தூண் எது?",
            options: ["தொழுகை", "ஜகாத்", "ஷஹாதா", "ஹஜ்"],
            correctAnswer: 2,
            questionType: "MCQ",
            questionCategory: "essenceOfIslam"
        },
        {
            question: "நபி (ஸல்) மீது வெளிப்படுத்தப்பட்ட நூல் எது?",
            options: ["தௌராத்", "இஞ்சீல்", "குர்ஆன்", "சபூரு"],
            correctAnswer: 2,
            questionType: "MCQ",
            questionCategory: "essenceOfIslam"
        },
        {
            question: "இஸ்லாமிய நம்பிக்கையின் பிரகடனம் எது?",
            options: ["சலாம்", "ஷஹாதா", "தௌஹீத்", "துஆ"],
            correctAnswer: 1,
            questionType: "MCQ",
            questionCategory: "essenceOfIslam"
        },
        {
            question: "சூரிய உதயத்திற்கு முன் செய்யப்படும் தொழுகை எது?",
            options: ["பஜ்ர்", "துஹ்ர்", "மகரிப்", "ஈஷா"],
            correctAnswer: 0,
            questionType: "MCQ",
            questionCategory: "essenceOfIslam"
        },
    
        // Prophet Stories
        {
            question: "கஅபாவை கட்டிய நபி யார்?",
            options: ["ஆதம் (அலை)", "இப்ராஹீம் (அலை)", "மூசா (அலை)", "ஈசா (அலை)"],
            correctAnswer: 1,
            questionType: "MCQ",
            questionCategory: "prophetStories"
        },
        {
            question: "எந்த நபியை ஒரு திமிங்கிலம் விழுங்கியது?",
            options: ["யூனுஸ் (அலை)", "நூஹ் (அலை)", "மூசா (அலை)", "ஹாரூன் (அலை)"],
            correctAnswer: 0,
            questionType: "MCQ",
            questionCategory: "prophetStories"
        },
        {
            question: "கடலைப் பிரிக்கும் அற்புதத்தை பெற்ற நபி யார்?",
            options: ["இப்ராஹீம் (அலை)", "மூசா (அலை)", "ஈசா (அலை)", "நூஹ் (அலை)"],
            correctAnswer: 1,
            questionType: "MCQ",
            questionCategory: "prophetStories"
        },
        {
            question: "எல்லா நபிகளின் தந்தை என்று அழைக்கப்படும் நபி யார்?",
            options: ["இப்ராஹீம் (அலை)", "ஆதம் (அலை)", "ஈசா (அலை)", "முகம்மது (ஸல்)"],
            correctAnswer: 1,
            questionType: "MCQ",
            questionCategory: "prophetStories"
        },
        {
            question: "எல்லா நபிகளின் தந்தை என்று அழைக்கப்படும் நபி யார்?",
            options: ["இப்ராஹீம் (அலை)", "ஆதம் (அலை)", "ஈசா (அலை)", "முகம்மது (ஸல்)"],
            correctAnswer: 1,
            questionType: "MCQ",
            questionCategory: "prophetStories"
        }
    ];
    
    const questions = selectedLanguage === 'tamil' ? questionTamil : questionEnglish;
    const correctAnswer = questions[counter]?.correctAnswer;
    const options = questions[counter]?.options || [];
    const questionText = questions[counter]?.question || "";
    const navigation = useNavigation();

    const handleNextButton = () => {
        if (counter === questions.length -1) {
            setShowConfirmationModal(true);
        } else {
            if (selectedOption !== null) {
                if (selectedOption === correctAnswer) {
                    setScore(prevScore => prevScore + 1);
                }
                setCounter(prevCounter => prevCounter + 1);
                setSelectedOption(null);
                setIsAnswered(false);
            } else {
                Toast.show({ type: 'error', text1: "Choose an Answer" });
            }
        }
    };

    const handleSubmitAnswer = () => {
        if (selectedOption === correctAnswer) {
            setScore(prevScore => prevScore + 1);
        }
        setShowConfirmationModal(false);
        setShowScoreModal(true);
    };

    const handleCancel = () => {
        setShowConfirmationModal(false);
    };

    const handleCloseScoreModal = () => {
        setShowScoreModal(false);

        navigation.navigate(screen, { group: group })
    };

    return (
        <View style={styles.parentDiv}>
            {/* Language Selection Modal */}
            <Modal
                visible={showLanguageModal}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setShowLanguageModal(false)}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={[styles.whiteCardBgStyle, { width: '80%', padding: 20, alignItems: 'center' }]}>
                        <Text style={[styles.text_default, { fontSize: 20, marginBottom: 20, width: '100%', paddingHorizontal: 10, lineHeight: 25 }]}>Choose Language</Text>
                        <TouchableOpacity
                            style={[styles.button, { width: '100%', marginBottom: 10 }]}
                            onPress={() => {
                                setSelectedLanguage('english');
                                setShowLanguageModal(false);
                            }}
                        >
                            <Text style={styles.buttonText}>English</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, { width: '100%' }]}
                            onPress={() => {
                                setSelectedLanguage('tamil');
                                setShowLanguageModal(false);
                            }}
                        >
                            <Text style={styles.buttonText}>தமிழ்</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Question Counter */}
            <View style={[styles.notificationStyle, { borderRadius: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: colors.lightGray, paddingVertical: 5, paddingHorizontal: 10, width: 100 }]}>
                {app_config.svgs.questionIcon}
                <Text style={{ marginLeft: 5, fontSize: 16, fontWeight: 'bold', color: colors.primary }}>
                    {`${counter + 1} / ${questions.length}`}
                </Text>
            </View>

            {/* Question Box */}
            <View style={[styles.whiteCardBgStyle, { marginVertical: 15, padding: 10, paddingBottom: 15 }]}>
                <Text style={[styles.text_default, { fontSize: 23, lineHeight: 30 }]}>{questionText}</Text>
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
                        <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                            {selectedOption === index && (
                                <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: colors.primary }} />
                            )}
                        </View>
                        <Text style={{ fontSize: 16, color: colors.textDefault, textAlign: 'left', width: '100%' }}>{option}</Text>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity style={[styles.button, { height: 50, marginVertical: 10, width: '100%' }]} onPress={handleNextButton} disabled={!isAnswered}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
            {/* Score Modal */}
            <Modal
                visible={showScoreModal}
                animationType="fade"
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
            {/* Confirmation Modal */}
            <Modal
                visible={showConfirmationModal}
                animationType="fade"
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

        </View>
    );
};

export default TestScreen;
