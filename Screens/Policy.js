import { View, Text, ScrollView, TouchableOpacity, Linking, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'
import { useAuth } from './AuthContext';
import { parseGradient } from '../Components/gradient';
import LinearGradient from 'react-native-linear-gradient';
import style from '../assets/styles/main_style';

const Policy = () => {
    const { setAuthUser, groupTheme } = useAuth();
    const { isGradient, gradientColors, start, end, solidColor } = parseGradient(groupTheme);
    const styles = style();

    const renderContent = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: '20' }}>
                <ScrollView contentContainerStyle={{ paddingVertical: 10, paddingBottom: 30 }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>
                        Privacy Policy
                    </Text>

                    <Text style={{ fontSize: 16, marginBottom: 10, paddingHorizontal: 10 }}>
                        Your privacy is important to us. This Privacy Policy explains how we collect, use,
                        and protect your personal information when you use our Quiz App.
                    </Text>

                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>
                        1. Information We Collect
                    </Text>

                    <Text style={{ fontSize: 16, marginBottom: 0, paddingHorizontal: 10, paddingTop: 10 }}>
                        We collect the following information:
                    </Text>
                    <Text style={{ paddingHorizontal: 10 }}>
                        {'\n'}- Name and Email (if provided during sign-up)
                        {'\n'}- Quiz performance data
                        {'\n'}- Device and app usage data
                    </Text>

                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>
                        2. How We Use Your Information
                    </Text>
                    <Text style={{ fontSize: 16, marginBottom: 10, paddingHorizontal: 10 }}>
                        The data collected is used to improve your experience and provide quiz results.
                    </Text>

                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>
                        3. Third-Party Services
                    </Text>
                    <Text style={{ fontSize: 16, marginBottom: 10, paddingHorizontal: 10 }}>
                        We may use third-party services like Google Analytics to analyze app usage.
                    </Text>

                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>
                        4. Data Security
                    </Text>
                    <Text style={{ fontSize: 16, marginBottom: 10, paddingHorizontal: 10 }}>
                        We implement security measures to protect your data but cannot guarantee complete security.
                    </Text>

                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>
                        5. Changes to This Policy
                    </Text>
                    <Text style={{ fontSize: 16, marginBottom: 10 }}>
                        We may update this policy. Continued use of the app means you accept the new terms.
                    </Text>

                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>
                        6. Contact Us
                    </Text>
                    <Text style={{ fontSize: 16, marginBottom: 20 }}>
                        If you have questions, contact us at
                    </Text>
                    <TouchableOpacity style={{ marginTop: 0 }} onPress={() => Linking.openURL('mailto:theafafway@gmail.com')}>
                        <Text style={[styles.boldText, { justifyContent: 'center', alignItems: 'center' }]}>
                            Mail us@theafafway@gmail.com
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: 5 }} onPress={() => Linking.openURL('whatsapp://send?phone=+917200290495')}>
                        <Text style={styles.boldText}>Whatsapp@7200290495</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {isGradient ? (
                <LinearGradient colors={gradientColors} start={start} end={end} style={[styles.parentDiv, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
                    {renderContent()}
                </LinearGradient>
            ) : (
                <View style={[styles.parentDiv, { backgroundColor: solidColor, flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
                    {renderContent()}
                </View>
            )}
        </TouchableWithoutFeedback>
    )
}

export default Policy;
