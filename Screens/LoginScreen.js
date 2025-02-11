import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  SafeAreaView,
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

const LoginScreen = () => {
  const route = useRoute();  
  const group = route.params?.group;
  console.log(route.params);
  
  const navigation = useNavigation();

  const [registrationId, setRegistrationId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showModal, setModalShow] = useState(false);
  const [phoneNo, setPhoneNo] = useState('');
  const { setAuthUser, groupTheme } = useAuth();
  
  const handleLogin = async () => {
    setAuthUser({user: 'User1', d_o_b: '25/25/25'});
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleNavigateToRegister = () => {
    navigation.navigate('Register', { group });
  };
  const styles = style();

  return (
    <SafeAreaView style={styles.parentDiv}>
      <View>
        <Image source={app_config.logo} style={styles.logo_default_size} />
      </View>

      <View style={styles.whiteCardBgStyle}>
        <Text style={styles.headingText}>{text.LoginScreen.login}</Text>

        {/* Registration ID */}
        <Text style={styles.lableText}>{text.LoginScreen.registration_id}</Text>
        <TextInput
          style={styles.inputField}
          placeholder={text.LoginScreen.registration_id}
          value={registrationId}
          onChangeText={setRegistrationId}
          placeholderTextColor={'gray'}
        />
        <TouchableOpacity style={{ width: '100%' }} onPress={() => setModalShow(true)}>
          <Text style={styles.subText}>{text.LoginScreen.forgotRegId}</Text>
        </TouchableOpacity>

        {/* Password */}
        <Text style={styles.lableText}>{text.LoginScreen.password}</Text>
        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            style={[styles.inputField, { flex: 1 }]}
            placeholder={text.LoginScreen.password}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            placeholderTextColor={'gray'}
          />
          <TouchableWithoutFeedback onPress={togglePasswordVisibility}>
            <View style={styles.eyeButton}>
              {showPassword ? app_config.svgs.eyeOpen : app_config.svgs.eyeClosed}
            </View>
          </TouchableWithoutFeedback>
        </View>
        <TouchableOpacity style={{ width: '100%' }} onPress={() => setModalShow(true)}>
          <Text style={styles.subText}>{text.LoginScreen.forgotPswd}</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity style={[styles.button, { width: '100%' }]} onPress={handleLogin}>
          <View>
            <Text style={styles.buttonText}>{text.LoginScreen.login}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Register Navigation */}
      <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.text_default}>{text.LoginScreen.not_have_account}</Text>
        <TouchableOpacity onPress={handleNavigateToRegister}>
          <Text style={[styles.sec_buttonText, { fontSize: 18 }]}>{text.LoginScreen.register}</Text>
        </TouchableOpacity>
      </View>

      {/* Forgot Registration ID Modal */}
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
              <Text style={styles.headingText}>{text.LoginScreen.forgotRegId}</Text>

              {/* Date Picker */}
              <Text style={[styles.lableText, { fontSize: 14 }]}>{text.RegisterScreen.d_o_b}</Text>
              <TouchableOpacity onPress={() => setOpen(true)} style={{ width: '100%' }}>
                <Text style={[styles.inputField, { paddingVertical: 10 }]}>
                  {moment(date).format('DD-MM-YYYY')}
                </Text>
              </TouchableOpacity>
              <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={(date) => {
                  setOpen(false);
                  setDate(date);
                }}
                onCancel={() => setOpen(false)}
                mode="date"
                maximumDate={new Date()}
              />

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
              <TouchableOpacity style={[styles.button, { width: '100%' }]} onPress={() => Toast.show({ type: 'info', text1: 'Feature Coming Soon' })}>
                <Text style={styles.buttonText}>{text.LoginScreen.submit}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default LoginScreen;
