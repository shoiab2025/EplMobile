import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { app_config } from '../assets/app_config';
import style from '../assets/styles/main_style';
import { colors } from '../assets/styles/colors';
import { useNavigation } from '@react-navigation/native';
import { GetAllAnnouncements } from '../API_STORE/announcementApi';
import { useAuth } from '../Screens/AuthContext';

const Notification = () => {
    const styles = style();
    const navigation = useNavigation();
    const [notifications, setNotifications] = useState([]); 
    const {group} = useAuth();
    console.log(group);
    
    useEffect(() => {
        const announcements = async () => {
            const response  = await GetAllAnnouncements();
            
            response.data.map((item, index) => {
                if (item.groupId != undefined){
                    const filteredData = response.data.filter(item => item.groupId !== undefined);
                    setNotifications(filteredData);                 
                }
        })
        }

        announcements();
    }, []);
    
    return (
        <View>
            <View style={styles.notificationStyle}>
                <Pressable onPress={() => {navigation.navigate('Announcement', {items: notifications})}}>
                    <Text style={[styles.text_default]}>{app_config.svgs.notificationIcon}</Text>
                    <View
                        style={[
                            styles.badgeStyle,
                            {
                                backgroundColor: colors.primary,
                                position: 'absolute',
                                right: -5,
                                top: -5,
                                paddingHorizontal: 5,
                                paddingVertical: 2,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 5,
                                zIndex: 9,

                            },
                        ]}
                    >
                        <Text style={{ color: colors.white, fontSize: 10, fontWeight: 'bold' }}>{notifications.length}</Text>
                    </View>
                </Pressable>

            </View>

        </View>
    )
}

export default Notification;