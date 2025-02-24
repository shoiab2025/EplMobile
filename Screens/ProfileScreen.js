import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Pressable, AppState, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native';
import style from '../assets/styles/main_style';
import { app_config } from '../assets/app_config';
import { colors } from '../assets/styles/colors';
import Notification from '../Components/notification';
import { useAuth } from './AuthContext';
import { useNavigation } from '@react-navigation/native';
import { parseGradient } from '../Components/gradient';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';
import { getUsersByRank, getUserTestHistoryById, logout } from '../API_STORE/userApi';
import Certificate from './Certificate';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const stylings = style();
  const { groupTheme, authUser, setAuthUser } = useAuth();
  const { isGradient, gradientColors, start, end, solidColor } = parseGradient(groupTheme);
  const [userTests, setUserTests] = useState([]);
  const [errorMessge, setErrorMessage] = useState([]);
  const [userRanks, setUserRanks] = useState([]);

  const handleLogout = async () => {
    try {
      const response = await logout(authUser);
      console.log(response);

      if (response) {
        Toast.show({
          type: 'success',
          text1: 'Logout Successful',
          text2: 'See you soon!',
        });
        setAuthUser(null);
      }
    } catch (error) {
      console.error("Logout error:", error);
      Toast.show({
        type: 'error',
        text1: 'Logout Failed',
        text2: 'Please try again later.',
      });
    }
  };

  useEffect(() => {
    const getTestForUser = async () => {
      const response = await getUserTestHistoryById(authUser._id);
      if (response.success) {
        setUserTests(response.data)
      }
      else {
        setErrorMessage(response.message)
      }
    }

    getTestForUser();
  }, [])

  useEffect(() => {
    const getUsersForTest = async () => {
      const response = await getUsersByRank();
      if (response.success) {
        setUserRanks(response.data)
      }
      else {
        setErrorMessage(response.message)
      }
    }

    getUsersByRank();
  }, [])

  const returnContent = () => {
    return (
      <>
        <ScrollView>
          <View style={stylings.absoluteCode}>
          <Notification />
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <View style={[stylings.absoluteCode, { left: '15' }]}>
            <View style={stylings.notificationStyle}>
              <Pressable onPress={() => navigation.navigate('Settings')}>
                {app_config.svgs.gearIcons(colors.primary)}
              </Pressable>
            </View>
          </View>
          <View style={styles.profileContainer}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {authUser && authUser.name && authUser.name.split(" ").map(word => word[0]).join("")}
                </Text>
              </View>
              <TouchableOpacity style={styles.editButton} onPress={() => { navigation.navigate('ProfileEdit') }}>
                {app_config.svgs.editIcon(colors.primary)}
              </TouchableOpacity>
            </View>
            <Text style={styles.userName}>{authUser?.name}</Text>
          </View>


          <View style={[styles.scoreboard]}>
            <Text style={styles.sectionTitle}>Score Board</Text>
            <View style={styles.scoreRow}>
              <View style={styles.scoreItem}>
                {app_config.svgs.fireIcon(colors.darkGold)}
                <Text style={styles.scoreLabel}>Streak</Text>
                <Text style={styles.scoreValue}>{userTests.length}</Text>

              </View>
              <View style={styles.scoreItem}>
                {app_config.svgs.scoreIcon(colors.primary)}
                <Text style={styles.scoreLabel}>Score</Text>
                <Text style={styles.scoreValue}>{userTests.length === 0 ? userTests.length : userTests.data.score}</Text>
              </View>
              <View style={styles.scoreItem}>
                {app_config.svgs.Leader(colors.brown)}
                <Text style={styles.scoreLabel}>Rank</Text>
                <Text style={styles.scoreValue}>4</Text>
              </View>
            </View>
            {
              userTests.length === 0 && (
                <Text style={[styles.scoreValue, { fontSize: 12, fontWeight: '400', color: 'red', textAlign: 'center', width: '100%', paddingTop: 5 }]}>Test Results not found</Text>
              )
            }
          </View>

          {/* Achievements */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Achievements</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See all</Text>
              </TouchableOpacity>
            </View>
            {
              userTests.length === 0 ? (
                <Text style={[styles.scoreValue, { fontSize: 12, fontWeight: '400', color: 'red', textAlign: 'center', width: '100%', paddingTop: 5 }]}>Test Results not found</Text>
              ) : (
                <View style={styles.achievementList}>
                  <View style={styles.achievementItem}>
                    <Text style={styles.achievementDay}>{userTests[0]?.test?.name}</Text>
                    <Text style={styles.achievementTitle}>{userTests[0]?.achievement?.name}</Text>
                  </View>
                  <View style={styles.achievementItem}>
                    <Text style={styles.achievementDay}>{userTests[1]?.test?.name}</Text>
                    <Text style={styles.achievementTitle}>{userTests[1]?.achievement?.name}</Text>
                  </View>
                </View>
              )
            }
          </View>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Certificates</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See all</Text>
              </TouchableOpacity>
            </View>
            <View horizontal showsHorizontalScrollIndicator={false} style={styles.certificateScroll}>
              userTests.length === 0 ? (
              <Text style={[styles.scoreValue, { fontSize: 12, fontWeight: '400', color: 'red', textAlign: 'center', width: '100%', paddingTop: 5 }]}>Test Results not found</Text>
              ) : (

              <FlatList
                data={userTests}
                keyExtractor={(item) => item.toString()} // Ensuring a unique key
                horizontal
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => navigation.navigate('Certificate', { user: authUser?.name, testDate: item?.test, season: 3, year: new Date().getFullYear() })}>
                    <View style={styles.certificateItem}>
                      <Text style={styles.certificateText}>Day {item}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />;
              )
            </View>
          </View>
          <View style={styles.section}>
            <TouchableOpacity
              style={[stylings.button, { width: '100%', marginTop: '0' }]}
              onPress={handleLogout} // Use handleLogout here
            >
              <Text style={[stylings.buttonText, { fontSize: 15 }]}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
      </>
    )
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {isGradient ? (
        <LinearGradient colors={gradientColors} start={start} end={end} style={[styles.parentDiv, {flex:1}]}>
          {returnContent()}
        </LinearGradient>
      ) : (
        <View style={[styles.parentDiv, { backgroundColor: solidColor, flex: 1 }]}>
          {returnContent()}
        </View>
      )}
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCD34D', // Yellow background
    padding: 16,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: '#F87171', // Red background
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  editButton: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FFFFFF',
    padding: 5,
    borderRadius: 50,
  },
  userName: {
    marginTop: 8,
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.brown,
  },
  scoreboard: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    marginHorizontal: 8,
    elevation: 4, // Shadow effect for Android
    shadowColor: '#000', // Shadow effect for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: '100%'
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  scoreItem: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  scoreLabel: {
    fontSize: 14,
    color: '#666',
  },
  scoreValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    marginTop: 24,
    marginHorizontal: 8,
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14,
    color: colors.primary,
  },
  achievementList: {
    marginTop: 8,
  },
  achievementItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    paddingVertical: 8,
  },
  achievementDay: {
    fontWeight: 'bold',
  },
  achievementTitle: {
    color: '#555',
  },
  achievementSubtitle: {
    fontSize: 12,
    color: '#777',
  },
  certificateScroll: {
    marginTop: 8,
    flexDirection: 'row',
  },
  certificateItem: {
    width: 64,
    height: 64,
    backgroundColor: '#D1D5DB',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  certificateText: {
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ProfileScreen;