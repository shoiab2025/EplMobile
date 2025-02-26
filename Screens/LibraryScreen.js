import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Notification from '../Components/notification';
import style from '../assets/styles/main_style';
import { parseGradient } from '../Components/gradient';
import { useAuth } from './AuthContext';
import { GetAllMaterial } from '../API_STORE/materialApi';
import { colors } from '../assets/styles/colors';

const LibraryScreen = () => {
    const navigation = useNavigation();
    const { groupTheme } = useAuth();
    const styles = style();
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                const response = await GetAllMaterial();
                setMaterials(response.data);
                setLoading(true)
            } catch (error) {
                console.error('Error fetching materials:', error);
            }
        };
        fetchMaterials();
    }, []);

    // Categorize materials based on their content type
    const categorizedMaterials = materials.reduce((acc, item) => {
        const contentType = item.content.toLowerCase();
        if (!acc[contentType]) {
            acc[contentType] = [];
        }
        acc[contentType].push(item);
        return acc;
    }, {});

    const renderItem = ({ item }) => (
        <TouchableOpacity
            key={item._id}
            onPress={() =>
                navigation.navigate('Material', {
                    item: {
                        content: item.content,
                        fileUrl: item.fileUrl
                    }
                })
            }
            style={localStyles.itemContainer}
        >
            <View style={[styles.materialHomeDesign, { width: 50, height: 50 }]}>
                <Image source={item.content_type.toLowerCase() === 'pdf' ? require('../assets/Images/pdf.png') : require('../assets/Images/youtube.png')} style={[styles.home_pdf_Icon, { width: 30, height: 30 }]} />
            </View>
            <Text style={[styles.textDefault, localStyles.itemText]}>
                {item.content}
            </Text>
        </TouchableOpacity>
    );

    const renderSection = (title, data) => (
        <View style={localStyles.sectionContainer} key={title}>
            <Text style={[styles.headingText, localStyles.sectionTitle]}>{title}</Text>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                horizontal
                contentContainerStyle={localStyles.listContent}
            />
        </View>
    );

    const { isGradient, gradientColors, start, end, solidColor } = parseGradient(groupTheme);
    const renderContent = () => {
        return (
            <>
                <View style={styles.absoluteCode}>
                    <Notification />
                </View>
                <ScrollView>
                <View style={{ flex: 1, width: '100%' }}>
                    {
                        !loading ? (
                            <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />

                        ) : (
                            materials.length === 0 ? (
                                <View style={{justifyContent: 'center', alignItems: 'center', paddingVertical: '100%'}}>
                                    <Text style={[styles.textDefault, {fontSize: 20}]}>Material Unavailable</Text>
                                </View>
                            ) : (
                                <>
                                    <Text style={[styles.headingText, { fontSize: 30, marginVertical: 15, marginBottom: 30 }]}>Library</Text>
                                    {Object.keys(categorizedMaterials).map((sectionTitle) =>
                                        renderSection(sectionTitle, categorizedMaterials[sectionTitle])
                                    )}
                                </>
                            )
                        )
                    }
                </View>
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
        paddingHorizontal: 10,
        marginVertical: 5,
        paddingVertical: 5
    },
    sectionTitle: {
        textAlign: 'left',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textTransform: 'capitalize',
        width: '100%',
        borderBottomWidth: 1,
    },
    itemContainer: {
        flex: 1,
        padding: 5,
        alignItems: 'center',
        marginBottom: 0,
    },
    itemText: {
        marginVertical: 15,
        textTransform: 'capitalize'
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    listContent: {
        paddingBottom: 0,
    },
    imIcon: {
        width: 30,
        height: 30,
    }
});

export default LibraryScreen;
