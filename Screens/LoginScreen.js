import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  SafeAreaView,
  Keyboard,
  Clipboard,
  ToastAndroid, // Import ToastAndroid for Android clipboard
} from 'react-native';
import React, { useState } from 'react';
import { app_config } from '../assets/app_config';
import { text } from '../assets/app_default_text';
import Toast from 'react-native-toast-message';
import { useNavigation, useRoute } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { useAuth } from './AuthContext';
import style from '../assets/styles/main_style';
import { colors } from '../assets/styles/colors';
import { parseGradient } from '../Components/gradient';
import LinearGradient from 'react-native-linear-gradient';
import { ForgotPassword, ForgotRegId, setNewPassword, UserLoggin } from '../API_STORE/userApi';

const LoginScreen = () => {
  const route = useRoute();
  const group = route.params?.group;

  const navigation = useNavigation();
  const { authUser, groupTheme, setLogin, setAuthUser, setUserLoggedIn } = useAuth();

  const [registrationId, setRegistrationId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showModal, setModalShow] = useState(false);
  const [showPasswordModal, setPasswordShowModel] = useState(false);
  const [phoneNo, setPhoneNo] = useState('');
  const [modalShown, setModalShown] = useState(false);
  const [regId, setRegId] = useState(null);
  const [resetToken, setResetToken] = useState(null);
  const [resetPassword, setResetPassword] = useState(null);
  const { isGradient, gradientColors, start, end, solidColor } = parseGradient(groupTheme);
  const styles = style();

  const handleLogin = async () => {
    if (!registrationId || !password) {
      Toast.show({ type: 'error', text1: 'Please fill in all fields' });
      return;
    }

    const response = await UserLoggin({ userIdOrEmail: registrationId, password: password });
    console.log(response);

    if (response.success) {
      Toast.show({ type: 'success', text1: 'Logged In Successfully' });
      setAuthUser(response.data);
      setLogin(true);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: response.data.message,
      });
    }
  };

  const forgotPassword = async () => {
    if (!registrationId || !date) {
      Toast.show({ type: 'error', text1: 'Please fill in all fields' });
      return;
    }

    const formattedDate = moment(date).format('YYYY-MM-DD'); // Ensure correct date format

    const response = await ForgotPassword({ userId: registrationId, dob: formattedDate });

    if (response.success) {
      Toast.show({ type: 'success', text1: 'Password reset link sent!' });
      setResetToken(response.data)
    } else {
      Toast.show({
        type: 'error',
        text1: 'Forgot Password Failed',
        text2: response.message || 'Something went wrong!',
      });
    }
  };

  const handleResetPassword = async () => {
    if (!resetToken || !resetPassword) {
      Toast.show({ type: 'error', text1: 'Please fill in all fields' });
      return;
    }


    const response = await setNewPassword({ resetToken: resetToken, newPassword: resetPassword });

    if (response.success) {
      Toast.show({ type: 'success', text1: message });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Forgot Password Failed',
        text2: response.message || 'Something went wrong!',
      });
    }
  };

  const forgotRegId = async () => {
    try {
      // Validate input
      if (!date || !phoneNo) {
        Toast.show({ type: 'error', text1: 'Please fill in all fields' });
        return;
      }

      // Call API inside try block
      const response = await ForgotRegId({ dob: moment(date).format('YYYY-MM-DD'), phoneNo });
      console.log(response);

      // Check API response
      Toast.show({
        type: 'success',
        text1: response.message
      });
      setRegId(response.userId);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message || 'Something went wrong. Please try again.',
      });
    }
  };

  const copyToClipboard = () => {
    Clipboard.setString(regId);
    ToastAndroid.show('Copied to clipboard!', ToastAndroid.SHORT);
  };

  const renderContent = () => {
    return (
      <>
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
          <Image source={app_config.logo} style={styles.logo_default_size} />

          <View style={styles.whiteCardBgStyle}>
            <Text style={styles.headingText}>{text.LoginScreen.login}</Text>

            <Text style={styles.lableText}>{text.LoginScreen.registration_id}</Text>
            <TextInput
              style={styles.inputField}
              placeholder={text.LoginScreen.phRegID}
              value={registrationId}
              onChangeText={setRegistrationId}
              placeholderTextColor={'gray'}
            />
            <TouchableOpacity onPress={() => setModalShow(true)} style={{ width: '100%' }}>
              <Text style={styles.subText}>{text.LoginScreen.forgotRegId}</Text>
            </TouchableOpacity>

            <Text style={styles.lableText}>{text.LoginScreen.password}</Text>
            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                style={[styles.inputField, { flex: 1 }]}
                placeholder={text.LoginScreen.phpswd}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                placeholderTextColor={'gray'}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <View style={[styles.eyeButton, { top: -10 }]}>
                  {showPassword ? app_config.svgs.eyeOpen : app_config.svgs.eyeclosed}
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => setPasswordShowModel(true)} style={{ width: '100%' }}>
              <Text style={styles.subText}>{text.LoginScreen.forgotPswd}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, { width: '100%' }]} onPress={handleLogin}>
              <Text style={styles.buttonText}>{text.LoginScreen.submit}</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 15, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.text_default}>{text.LoginScreen.not_have_account}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register', { group })} style={styles.sec_button}>
              <Text style={[styles.sec_buttonText, { fontSize: 18, width: '100%' }]}>{text.LoginScreen.register}</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        <Modal visible={showPasswordModal} transparent animationType="fade">
          <View style={[styles.modalDesign]}>
            <View style={[styles.modalContainerDesign, { padding: 20, width: '90%' }]}>
              <Text style={styles.closeBtn} onPress={() => setPasswordShowModel(false)}>
                {app_config.svgs.closeIcon}
              </Text>

              {
                resetToken === null ? (
                  <View style={{width: '100%', justifyContent:'center', alignItems: 'center'}}>
                    <Text style={[styles.headingText, { marginVertical: 10 }]}>{text.LoginScreen.forgotPswd}</Text>

                    <Text style={styles.lableText}>{text.LoginScreen.registration_id}</Text>
                    <TextInput
                      style={styles.inputField}
                      placeholder={text.LoginScreen.phRegID}
                      value={registrationId}
                      onChangeText={setRegistrationId}
                      placeholderTextColor={'gray'}
                    />

                    <Text style={styles.lableText}>{text.RegisterScreen.d_o_b}</Text>
                    <TouchableOpacity onPress={() => setOpenDatePicker(true)} style={{ width: '100%' }}>
                      <Text style={[styles.inputField, { paddingVertical: 10 }]}>{moment(date).format('DD-MM-YYYY')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, { width: '100%' }]} onPress={forgotPassword}>
                      <Text style={styles.buttonText}>{text.LoginScreen.submit}</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={{width: '100%', justifyContent: 'center', alignItems:'center'}}>
                      <Text style={[styles.headingText, { marginVertical: 15 }]}>Reset Password</Text>
                      <Text style={styles.lableText}>Set New Password</Text>

                    <TextInput
                        style={styles.inputField}
                        placeholder={text.RegisterScreen.password}
                        value={resetPassword}
                        onChangeText={setResetPassword}
                        placeholderTextColor={'gray'}
                      />
                    <TouchableOpacity style={[styles.button, { width: '100%' }]} onPress={handleResetPassword}>
                      <Text style={styles.buttonText}>{text.LoginScreen.submit}</Text>
                    </TouchableOpacity>
                  </View>
                )
              }
            </View>
          </View>
        </Modal>
        <Modal
          visible={showModal}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setModalShow(false)}
        >
          <View style={styles.modalDesign}>
            <View style={styles.modalContainerDesign}>
              <Text style={styles.closeBtn} onPress={() => setModalShow(false)}>
                {app_config.svgs.closeIcon}
              </Text>

              <View style={{ justifyContent: 'center', alignItems: 'center', width: '90%' }}>
                {
                  regId != null ? (<View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: 200 }}>
                    <Text style={[styles.headingText, { fontSize: 18, marginVertical: 10 }]}>{text.RegisterScreen.IDTEXT}</Text>

                    <Text style={[styles.headingText, { padding: 10, backgroundColor: colors.lightGray, borderRadius: 10, marginVertical: 20 }]}>
                      {regId}
                      <TouchableOpacity onPress={copyToClipboard} style={{ paddingHorizontal: 0, paddingLeft: '10' }}>
                        <Text style={{ textAlign: 'right' }}>{app_config.svgs.copyicon(colors.primary)}</Text>
                      </TouchableOpacity>
                    </Text>
                  </View>) : (

                    <View style={{ width: '100%', marginVertical: '10' }}>
                      {/* Date Picker */}
                      <Text style={styles.headingText}>{text.LoginScreen.forgotRegId}</Text>
                      <Text style={[styles.lableText, { fontSize: 14 }]}>{text.RegisterScreen.d_o_b}</Text>
                      <TouchableOpacity onPress={() => setOpenDatePicker(true)} style={{ width: '100%' }}>
                        <Text style={[styles.inputField, { paddingVertical: 10, marginBottom: '15' }]}>
                          {moment(date).format('DD-MM-YYYY')}
                        </Text>
                      </TouchableOpacity>


                      {/* Phone Number Input */}
                      <Text style={[styles.lableText, { fontSize: 14 }]}>{text.RegisterScreen.phone_no}</Text>
                      <TextInput
                        style={styles.inputField}
                        placeholder={text.RegisterScreen.phone_no}
                        keyboardType="number-pad"
                        value={phoneNo}
                        onChangeText={setPhoneNo}
                        placeholderTextColor={'gray'}
                      />

                      {/* Submit Button for Forgot Registration ID */}
                      <TouchableOpacity style={[styles.button, { width: '100%' }]} onPress={forgotRegId}>
                        <Text style={styles.buttonText}>{text.LoginScreen.submit}</Text>
                      </TouchableOpacity>
                    </View>
                  )
                }
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          visible={modalShown}
          animationType="fade"
          transparent={true}
          onRequestClose={() => { setModalShown(false) }}

        >
          <View style={styles.modalDesign}>

            <View style={[styles.modalContainerDesign, { zIndex: 9999 }]}>

              <Text style={styles.closeBtn} onPress={() => { setModalShown(false) }}>
                {app_config.svgs.closeIcon}
              </Text>

              <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <Text style={[styles.headingText, { fontSize: 18 }]}>{text.RegisterScreen.IDTEXT}</Text>

                <Text style={[styles.headingText, { padding: 10, backgroundColor: colors.lightGray, borderRadius: 10 }]}>
                  {regId}
                  <TouchableOpacity onPress={copyToClipboard} style={{ paddingHorizontal: 0, paddingLeft: '10' }}>
                    <Text style={{ textAlign: 'right' }}>{app_config.svgs.copyicon(colors.primary)}</Text>
                  </TouchableOpacity>
                </Text>
              </View>
            </View>
          </View>
        </Modal>

        {/* Single Date Picker - Fixed Issue */}
        <DatePicker
          modal
          open={openDatePicker}
          date={date}
          onConfirm={(selectedDate) => {
            setOpenDatePicker(false);
            setDate(selectedDate);
          }}
          onCancel={() => setOpenDatePicker(false)}
          mode="date"
          maximumDate={new Date()}
        />

      </>
    )
  }

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

export default LoginScreen;
