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
    console.log("user name", userName);

    const viewShotRef = useRef(); // Reference to capture the component
    const { groupTheme, logout, authUser } = useAuth();
    const stylings = style();
    const route = useRoute();
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
                message: `EPl Quizz Certificate of Participation of Quiz at ${params.testDate}!`,
            });

            alert("Certificate saved successfully!");
        } catch (error) {
            console.error("Error capturing certificate:", error);
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
                            <SvgText
                                x="125px"  // Center the text
                                y="98px"
                                fontSize={params.user.length > 25 ? "10" : "15"} // Reduce size if long
                                fontWeight="bold"
                                fill={colors.darkGold}
                                textAnchor="middle"
                                textLength="200" // Ensures it stays within a fixed width
                                numberOfLines={1} // Prevents wrapping
                                ellipsizeMode="tail" // Truncate with "..."
                            >
                                {params.user.length > 30 ? params.user.substring(0, 27) + "..." : params.user}
                            </SvgText>


                            {/* Test Date */}
                            <SvgText x="17%" y="79%" fontSize="6" fill="black" textAnchor="middle">
                                {params.testDate}
                            </SvgText>
                            <SvgText x="53%" y="128px" fontSize="6" fill="gray" textAnchor="middle" fontWeight="bold">
                                {params.year}
                            </SvgText>

                            {/* Season Name */}
                            <SvgText x="60%" y="118px" fontSize="6" fontWeight="bold" fill="black" textAnchor="middle">
                                {params.season}
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
