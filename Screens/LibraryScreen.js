import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { colors } from '../assets/styles/colors';
import Notification from '../Components/notification';
import style from '../assets/styles/main_style';

const LibraryScreen = () => {

    const navigation = useNavigation();
    const styles = style();

    const pdfs = {
        Taraweeh: [
            { content: 'Taraweeh 1', fileUrl: 'https://example_pdf.com', contentType: 'pdf' },
            { content: 'Taraweeh 2', fileUrl: 'https://example_pdf.com', contentType: 'pdf' },
            // ... more Taraweeh PDFs
        ],
        Seerah: [
            { content: 'Seerah 1', fileUrl: 'https://www.iitk.ac.in/esc101/share/downloads/javanotes5.pdf', contentType: 'pdf' },
            { content: 'Seerah 2', fileUrl: 'https://example_pdf.com', contentType: 'pdf' },
            // ... more Seerah PDFs
        ],
        EssenceShorts: [
            { content: 'Short 1', fileUrl: 'https://example_video.com', contentType: 'video' }, // Video content
            { content: 'Short 2', fileUrl: 'https://example_video.com', contentType: 'video' }, // Video content
            // ... more Essence Shorts videos
        ],
        StoriesOfProphets: [
            { content: 'Story 1', fileUrl: 'https://example_pdf.com', contentType: 'pdf' },
            { content: 'Story 2', fileUrl: 'https://example_pdf.com', contentType: 'pdf' },
            // ... more Stories
        ],
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.listItem, localStyles.listItem]} // Use local styles
            onPress={() => {
               navigation.navigate('Material', {item: item})
            }}
        >
            <Image source={ item.contentType === 'pdf' ? require('../assets/Images/pdf.png') : require('../assets/Images/youtube.png')} style={localStyles.pdfIcon} />
            <Text style={[styles.listItem, localStyles.listItemText]}>{item.content}</Text>
        </TouchableOpacity>
    );

    const renderSection = (title, data) => (
        <View style={localStyles.sectionContainer} key={title}> {/* Added key here */}
            <Text style={[styles.headingText, localStyles.sectionTitle]}>{title}</Text>
            <FlatList
                data={data}
                renderItem={renderItem}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );

    return (
        <View style={styles.parentDiv}>
            <View style={styles.absoluteCode}>
                <Notification />
            </View>

            <View style={{ flex: 1, width: '100%'}}>{/* Added flex:1 to the content container */}
                {Object.keys(pdfs).map(sectionTitle => (
                    renderSection(sectionTitle, pdfs[sectionTitle])
                ))}
            </View>

        </View>
    );
};

const localStyles = StyleSheet.create({ // Create a separate style sheet
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
    listItem: {
        flexDirection: 'column',
        alignContent: 'center',
        padding: 10, // Add padding
        marginRight: 10, // Space between items
        borderRadius: 8,  // Rounded corners for the list items
        backgroundColor: 'rgba(255, 255, 255, 0.38)', 
        width: 'auto',
    },
    listItemText: {
        marginLeft: 10,
        color: 'white', // Example text color
    },
    pdfIcon: {
        width: 50,
        height: 50,
    },
});

export default LibraryScreen;