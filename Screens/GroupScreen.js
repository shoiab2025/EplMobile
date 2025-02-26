import { View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch groups
  const fetchGroups = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await GetAllGroups();

      if (!Array.isArray(data)) {
        throw new Error('Invalid response format');
      }

      setGroups(data);
    } catch (error) {
      console.error('Failed to fetch groups:', error);
      setError(error.message || 'Something went wrong!');
      Toast.show({
        type: 'error',
        text1: 'Network Error',
        text2: 'Failed to fetch groups. Please check your connection.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch groups every 10 seconds
  useEffect(() => {
    fetchGroups(); // Initial load
    const interval = setInterval(() => {
      fetchGroups();
    }, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleGroupPress = (item) => {
    try {
      if (!item) throw new Error('Invalid group data');
      if (!item.groupTheme) throw new Error('Group theme is missing');

      setGroupTheme(item.groupTheme);
      setGroup(item);
      navigation.navigate('Login', { group: item });
    } catch (error) {
      console.error('Error selecting group:', error);
      Toast.show({
        type: 'error',
        text1: 'Selection Error',
        text2: error.message,
      });
    }
  };

  const styles = style();
  const { gradientColors, start, end } = parseGradient(colors.main_gradient);

  return (
    <LinearGradient colors={gradientColors} start={start} end={end} style={styles.parentDiv}>
      <Image source={app_config.logo} style={styles.logo_default_size} />
      <Text style={styles.text_default}>{text.groupScreenText.choose_text}</Text>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
      ) : error ? (
        <Text style={{ color: colors.error, marginTop: 20, textAlign: 'center' }}>
          {error}
        </Text>
      ) : groups.length === 0 ? (
        <Text style={{ color: colors.warning, marginTop: 20, textAlign: 'center' }}>
          No groups available.
        </Text>
      ) : (
        groups.map((group, index) => (
          <TouchableOpacity key={group.id} onPress={() => handleGroupPress(group)} style={styles.GroupScreenOptionBtns}>
              <Text style={styles.GroupText}>{group?.groupName || 'Unnamed Group'}</Text>
            </TouchableOpacity>
        ))
      )}
    </LinearGradient>
  );
};

export default GroupScreen;
