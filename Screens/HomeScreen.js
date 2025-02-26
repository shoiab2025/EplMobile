import {
  View, Text, Image, TouchableOpacity, ImageBackground,
  FlatList, TouchableWithoutFeedback, Keyboard, ActivityIndicator,
  ScrollView
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Notification from '../Components/notification';
import { colors } from '../assets/styles/colors';
import { useAuth } from './AuthContext';
import style from '../assets/styles/main_style';
import { text } from '../assets/app_default_text';
import { parseGradient } from '../Components/gradient';
import LinearGradient from 'react-native-linear-gradient';
import { GetAllMaterial } from '../API_STORE/materialApi';
import { getTestbyDate } from '../API_STORE/scheduleApi';
import moment from 'moment';
import { getAllTestById } from '../API_STORE/testApi';
import CountDownTimer from 'react-native-countdown-timer-hooks';
import Toast from 'react-native-toast-message';

const HomeScreen = () => {
  const route = useRoute();
  const group = route.params?.group || {};
  const navigation = useNavigation();
  const { groupTheme } = useAuth();
  const styles = style();

  const [quizStart, setQuizStart] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [todaySchedule, setTodaySchedule] = useState([]);
  const [todayTest, setTodayTest] = useState(null);
  const [timerEnd, setTimerEnd] = useState(false);
  const [loading, setLoading] = useState(true);
  const refTimer = useRef();
  const [scheduleLoaded, setScheduleLoaded] = useState(false);


  useEffect(() => {
    let intervalId;

    const fetchTodaySchedule = async () => {
      if (scheduleLoaded) return; // Stop fetching if data is already loaded
      setLoading(true);
      try {
        const date = moment(new Date()).format('YYYY-MM-DD');
        console.log(date);
        
        const response = await getTestbyDate(date);

        if (response.success && response.data.schedules?.length > 0) {
          console.log(response.data.schedules);
          
          setTodaySchedule(response.data.schedules || []);
          setMaterials(response.data.materials || []);
          setScheduleLoaded(true); // Mark schedule as loaded
          clearInterval(intervalId); // Stop interval once data is fetched
        } 
      } catch (error) {
        setTodaySchedule([]);
        console.error('Error fetching test data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodaySchedule();
    intervalId = setInterval(fetchTodaySchedule, 10000); // Poll every 10 seconds

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [scheduleLoaded]);

  console.log(todaySchedule);
  
  useEffect(() => {
    const fetchTestsByIds = async () => {
      if (!todaySchedule.length) return;
      try {
        const testId = todaySchedule[0]?.tests[0]?._id;
        console.log(todaySchedule);
        
        if (!testId) return;

        const response = await getAllTestById(testId);
        if (response.success) {
          setTodayTest(response.data);
        }
      } catch (error) {
        console.error('Error fetching test details:', error);
      }
    };

    fetchTestsByIds();
  }, [todaySchedule]);

  // Countdown Timer Calculation
  let countdownTime = 0;
  const datePart = todaySchedule[0]?.scheduled_start_date;
  const timePart = todaySchedule[0]?.start_time;
  const endDate = todaySchedule[0]?.scheduled_end_date;
  const endTime = todaySchedule[0]?.end_time;
  let endtime = 0;

  if (datePart && timePart) {
    const eventTime = new Date(`${datePart.split('T')[0]}T${timePart}`);
    countdownTime = Math.max(0, Math.floor((eventTime - new Date()) / 1000));
  }

  if (endDate && endTime) {
    const endEventTime = new Date(`${endDate.split('T')[0]}T${endTime}`);
    endtime = Math.max(0, Math.floor((endEventTime - new Date()) / 1000));
  }

  const timerOnProgressFunc = (remainingTimeInSecs) => {
    // console.log('On Progress tracker:', remainingTimeInSecs);
    console.log(moment(new Date()).format('hh:mm'));
    
  };

  const timerCallbackFunc = (timerFlag) => {
    setTimerEnd(timerFlag);
    setQuizStart(true);
  };

  const renderContent = () => {
    return (
      <>
        <View style={styles.absoluteCode}>
          <Notification />
        </View>

       <ScrollView style={{flex: 1}}>
         {/* Background Image */}
         <ImageBackground
          source={require('../assets/Images/quiz_title.png')}
          style={{ width: 320, minHeight: 180, marginTop: 30 }}
          borderTopLeftRadius={10}
          borderTopRightRadius={10}
        />

        {/* Quiz Section */}
        <View
          style={[
            styles.whiteCardBgStyle,
            { borderRadius: 0, borderBottomStartRadius: 10, borderBottomEndRadius: 10, paddingVertical: 8 },
          ]}
        >
          {loading ? (
            <ActivityIndicator size="large" color={colors.brown} style={{ marginVertical: 20 }} />
          ) : todaySchedule.length === 0 ? (
            <Text style={[styles.textDefault, { marginVertical: 10 }]}>
              No Test Scheduled Today
            </Text>
          ) : !quizStart && countdownTime > 0 ? (
            <View>
              <Text style={[styles.home_banner_txt, {marginVertical: 10}]}>
                {todayTest?.name || 'Upcoming'} Quiz
              </Text>
              <Text style={[styles.boldText, { marginVertical: 10, textAlign: 'center' }]}>
                Quiz starts in
              </Text>
              
              <CountDownTimer
                ref={refTimer}
                timestamp={countdownTime}
                timerOnProgress={timerOnProgressFunc}
                timerCallback={timerCallbackFunc}
                containerStyle={{
                  height: 45,
                  width: 200,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 35,
                  backgroundColor: colors.gold,
                  marginBottom: 10,
                }}
                textStyle={{
                  fontSize: 20,
                  color: colors.brown,
                  fontWeight: '500',
                  letterSpacing: 0.25,
                }}
              />
            </View>
          ) : (

            <View>
              <Text style={styles.home_banner_txt}>
                {todayTest?.name || 'Upcoming'} Quiz
              </Text>
              <TouchableOpacity
                style={[styles.button, { width: 200, backgroundColor: (endtime === moment(new Date()).format('hh:mm')) ? 'gray': colors.brown, height: 50, marginVertical: 10 }]}
                onPress={() => navigation.navigate('TestScreen', { group, screen: 'Home', test: todayTest })} disabled={endtime === moment(new Date()).format('hh:mm')} >
                <Text style={styles.buttonText}>Start Now</Text>
              </TouchableOpacity>

            </View>
          )}
        </View>

        {/* Materials Section */}
        <View style={{ marginVertical: 10, paddingVertical: 10, alignItems: 'center', width: '100%', justifyContent: 'space-around' }}>
          <Text style={[styles.text_default, { width: '100%', textAlign: 'left', fontSize: 18, marginBottom: 30 }]}>
            {text.HomeScreen.materialText}
          </Text>

          {materials.length > 0 ? (
            <FlatList
              data={materials}
              keyExtractor={(item, index) => item._id || index.toString()}
              numColumns={2}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Material', {
                      item: { content: item.content, fileUrl: item.file_url },
                    })
                  }
                >
                  <View style={{ padding: 5, alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={styles.materialHomeDesign}>
                      <Image source={require('../assets/Images/pdf.png')} style={styles.home_pdf_Icon} />
                    </View>
                    <Text style={[styles.textDefault, { margin: 10, textAlign: 'center', textTransform: 'capitalize' }]}>
                      {item.content}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text style={[styles.textDefault]}>No Materials Available</Text>
          )}
        </View>
       </ScrollView>
      </>
    );
  };

  const { isGradient, gradientColors, start, end, solidColor } = parseGradient(groupTheme);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {isGradient ? (
        <LinearGradient colors={gradientColors} start={start} end={end} style={styles.parentDiv}>
          {renderContent()}
        </LinearGradient>
      ) : (
        <View style={[styles.parentDiv, { backgroundColor: solidColor }]}>{renderContent()}</View>
      )}
    </TouchableWithoutFeedback>
  );
};

export default HomeScreen;
