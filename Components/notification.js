import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { app_config } from '../assets/app_config';
import style from '../assets/styles/main_style';
import { colors } from '../assets/styles/colors';
import { useNavigation } from '@react-navigation/native';

const Notification = () => {
    const styles = style();
    const navigation = useNavigation();
    return (
        <View>
            <View style={styles.notificationStyle}>
                <Pressable onPress={() => {navigation.navigate('Announcement')}}>
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
                        <Text style={{ color: colors.white, fontSize: 10, fontWeight: 'bold' }}>6</Text>
                    </View>
                </Pressable>

            </View>

        </View>
    )
}

export default Notification;