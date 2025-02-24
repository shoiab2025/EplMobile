import { View, Text, Image, TouchableOpacity, ImageBackground, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Notification from '../Components/notification';
import { colors } from '../assets/styles/colors';
import { app_config } from '../assets/app_config';
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

const HomeScreen = () => {
  const route = useRoute();
  const group = route.params?.group || {};
  const navigation = useNavigation();
  const { groupTheme } = useAuth();
  const styles = style();

  const [quizStart, setQuizStart] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [todaySchedule, setTodaySchedule] = useState([]);
  const [todayTest, setTodayTest] = useState([]);
  const [timerEnd, setTimerEnd] = useState(false);
  const refTimer = useRef();

  useEffect(() => {
    const fetchTodaySchedule = async () => {
      try {
        const date = moment(new Date()).format('YYYY-MM-DD');
        console.log(date);

        const response = await getTestbyDate(date);
        console.log(response);

        if (response.success) {
          setTodaySchedule(response.data.schedules || []);
          setMaterials(response.data.materials);
        }
      } catch (error) {
        console.error('Error fetching test data:', error);
      }
    };
    fetchTodaySchedule();

  }, []);
  console.log(todaySchedule);

  useEffect(() => {
    const fetchTestsByIds = async () => {
      try {
        if (!todaySchedule.length) return;
        todaySchedule.map(async (item) => {
          const response = await getAllTestById(item.tests[0]._id);
          console.log(response.data);

          setTodayTest(response.data);
        })
      } catch (error) {
        console.error('Error fetching test details:', error);
      }
    };

    if (todaySchedule.length > 0) {
      fetchTestsByIds();
    }
  }, [todaySchedule]);
  console.log("Today Test", todayTest);

  const datePart = todaySchedule.length > 0 ? todaySchedule[0].scheduled_start_date : null;
  console.log(datePart);

  const timePart = todaySchedule.length > 0 ? todaySchedule[0].start_time : null;
  console.log(timePart);

  let countdownTime = 0;

  if (datePart && timePart) {
    const eventTime = new Date(`${datePart.split('T')[0]}T${timePart}`);
    countdownTime = Math.max(0, Math.floor((eventTime - new Date()) / 1000));
  }

  const timerOnProgressFunc = (remainingTimeInSecs) => {
    console.log('On Progress tracker:', remainingTimeInSecs);
  };

  const timerCallbackFunc = (timerFlag) => {
    setTimerEnd(timerFlag);
    setQuizStart(true);
  };
  console.log(todayTest);
  const renderContent = () => {
    return (
      <>
        <View style={styles.absoluteCode}>
          <Notification />
        </View>

        {/* Background Image */}
        <ImageBackground
          source={require('../assets/Images/quiz_title.png')}
          style={{ width: '100%', minHeight: 180, marginTop: 30 }}
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

          {todaySchedule?.length === 0 ? (
            <Text style={[styles.textDefault, { marginVertical: 10 }]}>
              Test Not Scheduled Today
            </Text>
          ) : !quizStart && countdownTime > 0 ? (
            <View>
              <Text style={[styles.boldText, { marginVertical: 10, textAlign: 'center' }]}>
                Quiz starts in
              </Text>
              <Text style={styles.home_banner_txt}>
                {todayTest?.name || 'Upcoming'} Quiz
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
                  marginBottom: 10
                }}
                textStyle={{
                  fontSize: 20,
                  color: colors.brown,
                  fontWeight: '500',
                  letterSpacing: 0.25,
                }}
              />
            </View>
          ) : countdownTime === 0 && todayTest ? (
            <>
              <Text style={styles.home_banner_txt}>
                {todayTest?.name || 'Upcoming'} Quiz
              </Text>
              <TouchableOpacity
                style={[styles.button, { width: 200, backgroundColor: colors.brown, height: 50, marginVertical: 10 }]}
                onPress={() => navigation.navigate('TestScreen', { group, screen: 'Home', test: todayTest })}
              >
                <Text style={styles.buttonText}>Start Now</Text>
              </TouchableOpacity>
            </>
          ) : null}


        </View>

        {/* Materials Section */}
        <View style={{ marginVertical: 10, paddingVertical: 10, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <Text style={[styles.text_default, { width: '100%', textAlign: 'left', fontSize: 18 }]}>
            {text.HomeScreen.materialText}
          </Text>

          {
            materials?.length > 0 ? (
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
                  >{console.log(item)
                    }
                    <View style={{ padding: 5, alignItems: 'center' }}>
                      <View style={styles.materialHomeDesign}>
                        <Image source={require('../assets/Images/pdf.png')} style={styles.home_pdf_Icon} />
                      </View>
                      <Text style={[styles.textDefault, { margin: 10, width: '100%', textAlign: 'center', textTransform: 'capitalize' }]}>{item.content}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <Text style={styles.textDefault}>Materials Not Scheduled Today</Text>
            )
          }
        </View>
      </>
    )
  }
  const { isGradient, gradientColors, start, end, solidColor } = parseGradient(groupTheme);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {isGradient ? (
        <LinearGradient colors={gradientColors} start={start} end={end} style={styles.parentDiv}>
          {renderContent()}
        </LinearGradient>
      ) : (
        <View style={[styles.parentDiv, { backgroundColor: solidColor }]}>
          {renderContent()}
        </View>
      )}
    </TouchableWithoutFeedback>

  );
};

export default HomeScreen;
