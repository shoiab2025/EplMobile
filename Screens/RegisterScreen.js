import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Modal, Button, Linking, Clipboard, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { app_config } from '../assets/app_config'
import { text } from '../assets/app_default_text'
import { useNavigation, useRoute } from '@react-navigation/native'
import { colors } from '../assets/styles/colors'
import style from '../assets/styles/main_style'
import DatePicker from 'react-native-date-picker'
import moment from 'moment'
import { useAuth } from './AuthContext'
import DropDownPicker from 'react-native-dropdown-picker'
import Toast from 'react-native-toast-message'

const RegisterScreen = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phoneNo, setPhoneNumber] = useState();
  const [institution, setInstituton] = useState();
  const [gender, setGender] = useState();
  const [studying, setStudying] = useState();
  const [section, setSection] = useState();
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [conPassword, setConPassword] = useState();
  const [showConPassword, setConShowPassword] = useState(false);
  const [modalShown, setModalShown] = useState(false);
  const [open, setOpen] = useState(false);
  const [regId, setRegId] = useState(null);
  const styles = style();
  const navigation = useNavigation();
  const route = useRoute();
  const group = route.params.group;
  const showInstitutionData = group.groupName.includes("College") || group.groupName.includes("School");
  const showSchoolColumn = group.groupName.includes("School");
  const showCollegeColumn = group.groupName.includes("College");
  const { setAuthUser } = useAuth();
  const [showGenderDropDown, setShowGenderDropDown] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConPasswordVisibility = () => {
    setConShowPassword(!showConPassword);
  };

  const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  };

  const copyToClipboard = () => {
    Clipboard.setString(regId);
    ToastAndroid.show('Copied to clipboard!', ToastAndroid.SHORT);
  };

  const handleRegister = () => {
    if (false) {
      Toast.show({
        type: 'error',
        text1: 'Please Fill All Feilds'
      })
    } else {

      if (regId == null) {
        setRegId(generateRandomString(10));
      }

      const data = {
        name,
        email,
        phoneNo,
        institution,
        gender,
        studying,
        section,
        dateOfBirth,
        password,
        regId

      }

      setModalShown(!modalShown);
      setAuthUser(data);

      ssetModalShown(false);
      navigation.navigate('Login', { group: group });
    }
  }

  const handleNavigateToLogin = () => {
    navigation.navigate('Login', { group: group })
  }

  console.log(group);

  return (
    <View style={styles.parentDiv}>
      <ScrollView>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image source={app_config.logo} style={styles.logo_default_size} />
        </View>
        <View style={styles.whiteCardBgStyle}>

          <Text style={styles.headingText}>{text.RegisterScreen.reg}</Text>

          <Text style={styles.lableText}>{text.RegisterScreen.name}</Text>

          <TextInput
            style={styles.inputField}
            placeholder={text.RegisterScreen.name}
            value={name}
            aria-label={text.RegisterScreen.name}
            onChangeText={setName}
            placeholderTextColor={'gray'}
          />

          <Text style={styles.lableText}>{text.RegisterScreen.gender}</Text>
          <DropDownPicker
            open={showGenderDropDown}
            value={gender}
            items={[{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }]}
            setOpen={setShowGenderDropDown}
            setValue={setGender}
            placeholder="Select Gender"
            containerStyle={{ backgroundColor: colors.white }}
            dropDownContainerStyle={{ zIndex: 999, backgroundColor: colors.white, paddingVertical: 10, }}
            style={[styles.inputField, {}]}

          />

          <Text style={styles.lableText}>{text.RegisterScreen.d_o_b}</Text>
          <TouchableOpacity onPress={() => setOpen(true)} style={{ width: '100%' }}>
            <Text style={[styles.inputField, { paddingVertical: 10 }]}>
              {moment(dateOfBirth).format('DD-MM-YYYY')}
            </Text>
          </TouchableOpacity>

          <DatePicker
            modal
            open={open}
            date={dateOfBirth}
            onConfirm={(date) => {
              setOpen(false);
              setDateOfBirth(date);
            }}
            onCancel={() => setOpen(false)}
            mode="date"
            maximumDate={new Date()}
            theme='light'
          />

          <Text style={styles.lableText}>{text.RegisterScreen.email}</Text>
          <TextInput
            style={styles.inputField}
            placeholder={text.RegisterScreen.email}
            value={email}
            aria-label={text.RegisterScreen.email}
            onChangeText={setEmail}
            placeholderTextColor={'gray'}
          />

          <Text style={styles.lableText}>{text.RegisterScreen.phone_no}</Text>
          <TextInput
            style={styles.inputField}
            placeholder={text.RegisterScreen.phone_no}
            value={phoneNo}
            aria-label={text.RegisterScreen.email}
            onChangeText={setPhoneNumber}
            placeholderTextColor={'gray'}
          />

          {
            showInstitutionData && (
              <>
                <Text style={styles.lableText}>{text.RegisterScreen.institutions}</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder={text.RegisterScreen.institutions}
                  value={institution}
                  aria-label={text.RegisterScreen.institutions}
                  onChangeText={setInstituton}
                  placeholderTextColor={'gray'}
                />

                {
                  showCollegeColumn && (
                    <>
                      <Text style={styles.lableText}>{text.RegisterScreen.college}</Text>
                      <TextInput
                        style={styles.inputField}
                        placeholder={text.RegisterScreen.college}
                        value={studying}
                        aria-label={text.RegisterScreen.class}
                        onChangeText={setStudying}
                        placeholderTextColor={'gray'}
                      />
                    </>
                  )
                }
                {
                  showSchoolColumn && (
                    <>
                      <Text style={styles.lableText}>{text.RegisterScreen.class}</Text>
                      <TextInput
                        style={styles.inputField}
                        placeholder={text.RegisterScreen.class}
                        value={studying}
                        aria-label={text.RegisterScreen.class}
                        onChangeText={setStudying}
                        placeholderTextColor={'gray'}
                      />


                      <Text style={styles.lableText}>{text.RegisterScreen.section}</Text>
                      <TextInput
                        style={styles.inputField}
                        placeholder={text.RegisterScreen.section}
                        value={section}
                        aria-label={text.RegisterScreen.section}
                        onChangeText={setSection}
                        placeholderTextColor={'gray'}
                      />
                    </>
                  )
                }
              </>
            )
          }

          <Text style={styles.lableText}>{text.RegisterScreen.password}</Text>
          <View style={{ width: '100%' }}>
            <TextInput
              style={[styles.inputField, { position: 'relative' }]}
              placeholder={text.RegisterScreen.password}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              placeholderTextColor={'gray'}
            />
            <TouchableWithoutFeedback onPress={togglePasswordVisibility} style={styles.eyeContainer}>
              <View style={styles.eyeButton}>
                {showPassword ? app_config.svgs.eyeOpen : app_config.svgs.eyeclosed}
              </View>
            </TouchableWithoutFeedback>
          </View>

          <Text style={styles.lableText}>{text.RegisterScreen.confirmPassword}</Text>
          <View style={{ width: '100%' }}>
            <TextInput
              style={[styles.inputField, { position: 'relative' }]}
              placeholder={text.RegisterScreen.confirmPassword}
              secureTextEntry={!showConPassword}
              value={conPassword}
              onChangeText={setConPassword}
              placeholderTextColor={'gray'}
            />
            <TouchableWithoutFeedback onPress={toggleConPasswordVisibility} style={styles.eyeContainer}>
              <View style={styles.eyeButton}>
                {showConPassword ? app_config.svgs.eyeOpen : app_config.svgs.eyeclosed}
              </View>
            </TouchableWithoutFeedback>
          </View>

          <TouchableOpacity style={[styles.button, { width: '100%' }]} onPress={handleRegister}>
            <View >
              <Text style={styles.buttonText}>{text.RegisterScreen.reg}</Text>
            </View>
          </TouchableOpacity>

        </View>

        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.text_default}>{text.RegisterScreen.have_account}</Text>
          <TouchableOpacity style={[{ marginTop: 0 }]} onPress={handleNavigateToLogin}>
            <View>
              <Text style={[styles.sec_buttonText, { fontSize: 18, marginTop: 0, height: 'auto' }]}>{text.LoginScreen.login}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>


      <Modal
        visible={modalShown}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalShown(false)}

      >
        <View style={styles.modalDesign}>

          <View style={styles.modalContainerDesign}>

            <Text style={styles.closeBtn} onPress={() => { setModalShown(false) }}>
              {app_config.svgs.closeIcon}
            </Text>

            <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>

              <Text >{app_config.svgs.successIcon}</Text>

              <Text style={styles.text_default}>{text.RegisterScreen.success}</Text>

              <Text style={[styles.headingText, { padding: 10, backgroundColor: colors.lightGray, borderRadius: 10 }]}>
                RegId: {regId}
                <TouchableOpacity onPress={copyToClipboard} style={{ paddingHorizontal: 10, }}>
                  {app_config.svgs.copyicon(colors.primary)}
                </TouchableOpacity>
              </Text>

              <Text style={[styles.boldText, { width: '100%' }]}> Note:</Text>
              <Text>{text.RegisterScreen.RegIdText}</Text>

              <TouchableOpacity style={{ marginTop: 0 }} onPress={() => Linking.openURL('mailto:theafafway@gmail.com')}>
                <Text style={styles.boldText}>Visit our help center</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ marginTop: 0 }} onPress={() => Linking.openURL('whatsapp://send?phone=+918015972919')}>
                <Text style={styles.boldText}>Whatsapp</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </Modal>

    </View>
  )
}

export default RegisterScreen;