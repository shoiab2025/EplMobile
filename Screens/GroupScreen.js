import { View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { app_config } from '../assets/app_config';
import { text } from '../assets/app_default_text';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './AuthContext';
import style from '../assets/styles/main_style';
import { colors } from '../assets/styles/colors';
import { GetAllGroups } from '../API_STORE/groupApi';
import LinearGradient from 'react-native-linear-gradient';
import { parseGradient } from '../Components/gradient';
import Toast from 'react-native-toast-message';

const GroupScreen = () => {
  const navigation = useNavigation();
  const { setGroupTheme, setGroup } = useAuth();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    (async () => {
      try {
        const data = await GetAllGroups();
        setGroups(data || []);
      } catch (error) {
        console.error('Failed to fetch groups:', error);
        Toast.show({
          type: 'error',
          text1: 'Check your Network Nonnection'
        })
      } finally {
        setLoading(false);
      }
    })();
  }, []);


  const handleGroupPress = (item) => {
    console.log(item.groupTheme);
    
    setGroupTheme(item?.groupTheme);
    setGroup(item);
    navigation.navigate('Login', { group: item });
  };

  const styles = style();

  const { gradientColors, start, end } = parseGradient(colors.main_gradient);

  return (
    <LinearGradient colors={gradientColors} start={start} end={end} style={styles.parentDiv} >
      <Image source={app_config.logo} style={styles.logo_default_size} />
      <Text style={styles.text_default}>{text.groupScreenText.choose_text}</Text>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
      ) : (
          groups.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handleGroupPress(item)} style={styles.GroupScreenOptionBtns}>
              <Text style={styles.GroupText}>{item?.groupName}</Text>
            </TouchableOpacity>
          )
        )
      )}
    </LinearGradient>
  );
};

export default GroupScreen;
