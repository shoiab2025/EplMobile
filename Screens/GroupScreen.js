import { View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { app_config } from '../assets/app_config';
import { text } from '../assets/app_default_text';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './AuthContext';
import style from '../assets/styles/main_style';
import { colors } from '../assets/styles/colors';
import { GetAllGroups } from '../API_STORE/groupApi';

const GroupScreen = () => {
  const navigation = useNavigation();
  const { setGroupTheme } = useAuth();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const listtedGroups = [
    {
      groupName: "Inter College Quiz",
      groupTheme: colors.college_gradient,
      
    },

    {
      groupName: "Inter School Quiz",
      groupTheme: colors.school_gradient,
      
    },

    {
      groupName: "General Quiz English",
      groupTheme: colors.public_gradient,
      
    },

    {
      groupName: "General Quiz Tamil",
      groupTheme: colors.public_gradient,
      
    },


  ]
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const data = await GetAllGroups();
  //       setGroups(data || []);
  //     } catch (error) {
  //       console.error('Failed to fetch groups:', error);
  //     } finally {
  //       setLoading(false); 
  //     }
  //   })();
  // }, []);

  const handleGroupPress = (item) => {
    setGroupTheme(item?.groupTheme);
    navigation.navigate('Login', {group: item});
  };

  const styles = style();
console.log(groups);

  return (
    <View style={[styles.parentDiv, { backgroundColor: colors.main_gradient }]}>
      <Image source={app_config.logo} style={styles.logo_default_size} />
      <Text style={styles.text_default}>{text.groupScreenText.choose_text}</Text>

      {/* Show Loader if Groups are Loading */}
      {false ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20, }}  />
      ) : (
        <FlatList
          data={listtedGroups}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleGroupPress(item)}>
              <View style={styles.GroupScreenOptionBtns}>
                <Text style={styles.GroupText}>{item?.groupName}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item?._id?.toString() || Math.random().toString()}
        />
      )}
    </View>
  );
};

export default GroupScreen;
