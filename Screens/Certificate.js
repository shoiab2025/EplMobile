import React, { useRef } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import Svg, { Text as SvgText } from "react-native-svg";
import ViewShot from "react-native-view-shot";
import RNFS from "react-native-fs";
import Share from "react-native-share";
import { useAuth } from "./AuthContext";
import { parseGradient } from "../Components/gradient";
import style from "../assets/styles/main_style";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "../assets/styles/colors";
import { useRoute } from "@react-navigation/native";

const Certificate = ({ userName, testDate, seasonName }) => {
    const viewShotRef = useRef(); // Reference to capture the component
    const { groupTheme, logout, authUser } = useAuth();
    const stylings = style();
    const route =useRoute();
    const params = route.params
    console.log(params);
    
    // Function to capture and save the certificate
    const captureAndSaveCertificate = async () => {
        try {
            const uri = await viewShotRef.current.capture();
            const filePath = `${RNFS.DocumentDirectoryPath}/certificate.png`;

            await RNFS.copyFile(uri, filePath);

            // Share the saved certificate
            await Share.open({
                url: `file://${filePath}`,
                title: "Download Certificate",
                message: "Here is your certificate!",
            });

            alert("Certificate saved successfully!");
        } catch (error) {
            console.error("Error capturing certificate:", error);
            alert("Failed to save certificate.");
        }
    };
    const { gradientColors, start, end } = parseGradient(groupTheme);

    return (
        <LinearGradient
            colors={gradientColors}
            start={start}
            end={end}
            style={[stylings.parentDiv, { paddingVertical: 15, }]}
        >
            <View style={styles.container}>
                {/* Capture View */}
                <ViewShot ref={viewShotRef} options={{ format: "png", quality: 1.0 }}>
                    <View style={styles.certificateContainer}>
                        {/* Background Certificate Image */}
                        <Image
                            source={require("../assets/Images/certificate.png")} // Add your certificate image here
                            style={styles.certificateImage}
                        />

                        {/* Overlay Text */}
                        <Svg height="100%" width="100%" style={styles.svgContainer}>
                            {/* User Name */}
                            <SvgText x="50%" y="40%" fontSize="22" fontWeight="bold" fill="black" textAnchor="middle">
                                {userName}
                            </SvgText>

                            {/* Test Date */}
                            <SvgText x="20%" y="70%" fontSize="16" fill="black" textAnchor="middle">
                                {testDate}
                            </SvgText>

                            {/* Season Name */}
                            <SvgText x="50%" y="50%" fontSize="18" fontWeight="bold" fill="black" textAnchor="middle">
                                {seasonName}
                            </SvgText>
                        </Svg>
                    </View>
                </ViewShot>

                {/* Download Button */}
                <TouchableOpacity style={styles.downloadButton} onPress={captureAndSaveCertificate}>
                    <Text style={styles.downloadText}>Download Certificate</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>

    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    certificateContainer: {
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
    },
    certificateImage: {
        width: 350,
        height: 250,
        resizeMode: "contain",
    },
    svgContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    downloadButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: colors.primary,
        borderRadius: 5,
    },
    downloadText: {
        color: colors.white,
        fontSize: 16,
    },
});

export default Certificate;
