import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { app_config } from '../assets/app_config';
import { text } from '../assets/app_default_text';
import { useNavigation } from '@react-navigation/native'; 
import { useAuth } from './AuthContext';
import style from '../assets/styles/main_style';
import { colors } from '../assets/styles/colors';

const listed_groups = [
  {
    group_id: 1,
    group_name: 'Inter College Quiz',
    group_theme: 'linear-gradient(180deg, rgba(222,168,86,1) 34%, rgba(254,225,156,1) 100%)',
  },
  {
    group_id: 2,
    group_name: 'Inter School Quiz',
    group_theme: 'linear-gradient(180deg, rgba(86,189,222,1) 0%, rgba(156,222,254,1) 100%)',
  },
  {
    group_id: 3,
    group_name: 'General English Quiz',
    group_theme: 'linear-gradient(180deg, rgba(168,203,99,1) 0%, rgba(208,227,171,1) 100%)',
  },
  {
    group_id: 4,
    group_name: 'General Tamil Quiz',
    group_theme: 'linear-gradient(180deg, rgba(168,203,99,1) 0%, rgba(208,227,171,1) 100%)',
  },
];

const GroupScreen = () => {
  const navigation = useNavigation();
  const { setGroupTheme } = useAuth();

  const handleGroupPress = (item) => {
    setGroupTheme(item.group_theme);
    navigation.navigate('Login'); 
  };
  
  const styles = style();
  return (
    <View style={[styles.parentDiv, {backgroundColor: colors.main_gradient}]}>

      <View>
        <Image source={app_config.logo} style={styles.logo_default_size} />
      </View>

      <View>
        <Text style={styles.text_default}>{text.groupScreenText.choose_text}</Text>
      </View>

      <FlatList
        data={listed_groups}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleGroupPress(item)}> 
            <View style={styles.GroupScreenOptionBtns}>
              <Text style={styles.GroupText}>{item.group_name}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.group_id.toString()}
      />

    </View>
  );
};

export default GroupScreen;