import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Notification from '../Components/notification';
import { colors } from '../assets/styles/colors';
import CountDown from 'react-native-countdown-component';
import { app_config } from '../assets/app_config';
import { useAuth } from './AuthContext';
import style from '../assets/styles/main_style';

const HomeScreen = () => {
  const route = useRoute();
  const group = route.params?.group || {};
  const [quizStart, setQuizStart] = useState(false);
  const navigation = useNavigation();
  const {groupTheme} = useAuth();
  const styles = style();

  return (
    <View style={styles.parentDiv}>

      {/* Notification Code */}
      <View style={styles.absoluteCode}>
        <Notification />
      </View>

      {/* bacGroundImage */}
      <ImageBackground
        source={require('../assets/Images/quiz_title.png')}
        style={{ width: '100%', minHeight: 180, marginTop: 30 }}
        borderTopLeftRadius={10}
        borderTopRightRadius={10}
      />

      <View
        style={[styles.whiteCardBgStyle,
        {
          borderRadius: 0,
          borderBottomStartRadius: 10,
          borderBottomEndRadius: 10,
          paddingVertical: 8,
        }]}>

        <Text style={styles.home_banner_txt}>Day 1 Quiz</Text>

        <View
          style={{ display: quizStart ? 'none' : 'block' }}
        >
          <Text style={[styles.boldText, { marginVertical: 10, textAlign: 'center' }]}>Quiz starts in</Text>
          
          <CountDown
            size={15}
            until={60 * 0.1}
            onFinish={() => setQuizStart(true)}
            digitStyle={{ backgroundColor: colors.gold }}
            digitTxtStyle={{ color: colors.primary }}
            timeLabelStyle={{ color: colors.primary, fontWeight: 'bold' }}
            separatorStyle={{ color: colors.primary }}
            timeToShow={['D', 'H', 'M', 'S']}
            timeLabels={{ d: 'DD', h: 'HH', m: 'MM', s: 'SS' }}
            showSeparator
          />

        </View>

        <View style={{ display: !quizStart ? 'none' : 'block' }}>
          <TouchableOpacity
            style={[styles.button, { width: '200', backgroundColor: colors.brown, height: 50, marginVertical: 10 }]}
            onPress={() => navigation.navigate('TestScreen', { group: group })}
          >
            <Text style={styles.buttonText}>Start Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.whiteCardBgStyle, { marginVertical: 10, paddingVertical: 10 }]}>
        <Text style={[styles.text_default, { width: '100%', textAlign: 'left', fontSize: 18, }]}>Day 1 Materials</Text>

        <View style={{flexDirection: 'column', width: '100%'}}>
          <View >
            <View style={{ padding: 5, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', gap: 0, width: '100%' }}>
              <View style={[styles.materialHomeDesign]}>
                <Image source={require('../assets/Images/pdf.png')} style={styles.home_pdf_Icon} />
              </View>
              <Text style={[styles.textDefault, { textAlign: 'center', paddingVertical: '5', alignSelf: 'center' }]}>Taraweeh PDF</Text>
            </View>

            <View style={{ padding: 5, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', gap: 0, width: '100%' }}>
              <View style={[styles.materialHomeDesign]}>
                <Image source={require('../assets/Images/pdf.png')} style={styles.home_pdf_Icon} />
              </View>
              <Text style={[styles.textDefault, { textAlign: 'center', paddingVertical: '5', alignSelf: 'center' }]}>Story of Prophet PDF</Text>
            </View>
          </View>

          <View>
            <View style={{ padding: 5, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', gap: 0, width: '100%' }}>
              <View style={[styles.materialHomeDesign]}>
                <Image source={require('../assets/Images/pdf.png')} style={styles.home_pdf_Icon} />
              </View>
              <Text style={[styles.textDefault, { textAlign: 'center', paddingVertical: '5', alignSelf: 'center' }]}>Seera</Text>
            </View>

            <View style={{ padding: 5, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', gap: 0, width: '100%' }}>
              <View style={[styles.materialHomeDesign]}>
                <Image source={require('../assets/Images/youtube.png')} style={styles.home_pdf_Icon} />
              </View>
              <Text style={[styles.textDefault, { textAlign: 'center', paddingVertical: '5', alignSelf: 'center' }]}>Essence</Text>
            </View>
          </View>
        </View>

      </View>
    </View>
  );
};

export default HomeScreen;
