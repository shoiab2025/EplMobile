import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import style from '../assets/styles/main_style';
import { app_config } from '../assets/app_config';
import { colors } from '../assets/styles/colors';
import Notification from '../Components/notification';
import { useAuth } from './AuthContext';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const { setUserLoggedIn } = useAuth();
  const navigation = useNavigation();
  const stylings = style();

  return (

    <ScrollView>
      <View style={stylings.parentDiv}>
        <View style={stylings.absoluteCode}>
          <Notification />
        </View>
        <View style={[stylings.absoluteCode, { left: '15' }]}>
          <View style={stylings.notificationStyle}>
            <Pressable onPress={() => { navigation.navigate('Settings') }}>
              {app_config.svgs.gearIcons(colors.primary)}
            </Pressable>
          </View>
        </View>
        <View style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>UN</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              {app_config.svgs.editIcon(colors.primary)}
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>User Name</Text>
        </View>

        <View style={[styles.scoreboard]}>
          <Text style={styles.sectionTitle}>Score Board</Text>
          <View style={styles.scoreRow}>
            <View style={styles.scoreItem}>
              {app_config.svgs.fireIcon(colors.darkGold)}
              <Text style={styles.scoreLabel}>Streak</Text>
              <Text style={styles.scoreValue}>17</Text>
            </View>
            <View style={styles.scoreItem}>
              {app_config.svgs.scoreIcon(colors.primary)}
              <Text style={styles.scoreLabel}>Score</Text>
              <Text style={styles.scoreValue}>13000</Text>
            </View>
            <View style={styles.scoreItem}>
              {app_config.svgs.Leader(colors.brown)}
              <Text style={styles.scoreLabel}>Rank</Text>
              <Text style={styles.scoreValue}>4</Text>
            </View>
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.achievementList}>
            <View style={styles.achievementItem}>
              <Text style={styles.achievementDay}>Day 1</Text>
              <Text style={styles.achievementTitle}>⭐ Star of EPL</Text>
              <Text style={styles.achievementSubtitle}>Top 20 Rank Holder</Text>
            </View>
            <View style={styles.achievementItem}>
              <Text style={styles.achievementDay}>Day 2</Text>
              <Text style={styles.achievementTitle}>🏆 Champion of EPL</Text>
              <Text style={styles.achievementSubtitle}>Rank 1 Holder</Text>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Certificates</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <View horizontal showsHorizontalScrollIndicator={false} style={styles.certificateScroll}>
            {[1, 2, 3, 4].map((day) => (
              <View key={day} style={styles.certificateItem}>
                <Text style={styles.certificateText}>Day {day}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <TouchableOpacity style={[stylings.button, { width: '100%', marginTop: '0' }]} onPress={async () => { }}>
            <Text style={[stylings.buttonText, { fontSize: 15 }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
    fontSize: 20,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
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
