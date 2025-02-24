import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Modal, Button, Linking, Clipboard, ToastAndroid, TextBase, Keyboard } from 'react-native'
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
import LinearGradient from 'react-native-linear-gradient'
import { parseGradient } from '../Components/gradient'
import { UserRegisteration } from '../API_STORE/userApi'

const RegisterScreen = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phoneNo, setPhoneNumber] = useState();
  const [institution, setInstituton] = useState();
  const [nomineeName, setnomineeName] = useState();
  const [gender, setGender] = useState();
  const [studying, setStudying] = useState();
  const [address, setAddress] = useState();
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
  const { setAuthUser, groupTheme } = useAuth();
  const [showGenderDropDown, setShowGenderDropDown] = useState(false);
  const [showSectionDropDown, setShowSectionDropDown] = useState(false);
  const [showClassDropDown, setShowClassDropDown] = useState(false);
  const classOptions = Array.from({ length: 9 }, (_, i) => ({
    label: `Class ${i + 4}`,
    value: `Class ${i + 4}`,
  }));

  const sectionOptions = Array.from({ length: 26 }, (_, i) => ({
    label: String.fromCharCode(65 + i),
    value: String.fromCharCode(65 + i),
  }));
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

  const handleRegister = async () => {
    if (
      !name || !gender || !dateOfBirth || !phoneNo || !address || !password || !conPassword ||
      (showInstitutionData && (!nomineeName || !studying || (showSchoolColumn && !section)))
    ) {
      Toast.show({ type: 'error', text1: 'Please fill in all required fields' });
      return;
    }

    if (password !== conPassword) {
      Toast.show({ type: 'error', text1: 'Passwords do not match' });
      return;
    }

    const institutionData = {};

    if (showSchoolColumn) {
      institutionData.institutionName = institution;
      institutionData.class = studying;
      institutionData.section = section;
    }

    if (showCollegeColumn) {
      institutionData.institutionName = institution;
      institutionData.institution = institution;
      institutionData.course = studying;

    }
    console.log(institutionData);

    const registrationData = {
      name,
      gender,
      email,
      phoneNo,
      nomineeName,
      institutionData,
      dob: new Date(dateOfBirth),
      address,
      password,
      groupName: group.groupName,
      educationLevel: showSchoolColumn ? 'School' : showCollegeColumn ? 'College' : null,
    };
    console.log(new Date(dateOfBirth).toDateString());

    const response = await UserRegisteration(registrationData || {});
    console.log(response);
    if (response.successs) {
      setRegId(response.data.userId)
      setModalShown(!modalShown);
      Toast.show({
        type: 'success',
        text1: 'Registered Successfully',
      })
    }
    else {
      Toast.show({
        type: 'error',
        text1: response.message,
      })
    }
  };


  const handleNavigateToLogin = () => {
    navigation.navigate('Login', { group: group })
  }

  const { isGradient, gradientColors, start, end, solidColor } = parseGradient(groupTheme);
  const renderContent = () => {
    return (
      <>
        <ScrollView>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image source={app_config.logo} style={styles.logo_default_size} />
          </View>
          <View style={styles.whiteCardBgStyle}>

            <Text style={styles.headingText}>{text.RegisterScreen.reg}</Text>

            <Text style={styles.lableText}>{text.RegisterScreen.name} *</Text>

            <TextInput
              style={styles.inputField}
              placeholder={text.placeHolder.name}
              value={name}
              aria-label={text.RegisterScreen.name}
              onChangeText={setName}
              placeholderTextColor={'gray'}
            />

            <Text style={styles.lableText}>{text.RegisterScreen.gender} *</Text>
            <DropDownPicker
              open={showGenderDropDown}
              value={gender}
              items={[{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }, { label: 'Others', value: 'Others' }]}
              setOpen={setShowGenderDropDown}
              setValue={setGender}
              placeholder="Select Gender"
              containerStyle={{ backgroundColor: colors.white }}
              dropDownContainerStyle={{
                zIndex: 999, backgroundColor: colors.white, paddingVertical: 10, fontFamily: "Inter_18pt-Bold",
              }}
              style={[styles.inputField, {}]}
              listItemContainerStyle={{ fontFamily: "Inter_18pt-Bold" }}
              textStyle={{ fontFamily: "Inter_18pt-Bold", }}

            />

            <Text style={styles.lableText}>{text.RegisterScreen.d_o_b} *</Text>
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
              theme='auto'
            />



            <Text style={styles.lableText}>{text.RegisterScreen.email}</Text>
            <TextInput
              style={styles.inputField}
              placeholder={text.placeHolder.mail}
              value={email}
              aria-label={text.RegisterScreen.email}
              onChangeText={setEmail}
              placeholderTextColor={'gray'}
            />

            <Text style={styles.lableText}>{text.RegisterScreen.phone_no} *</Text>
            <TextInput
              style={styles.inputField}
              placeholder={text.placeHolder.phone_no}
              value={phoneNo}
              aria-label={text.RegisterScreen.email}
              onChangeText={setPhoneNumber}
              keyboardType='number-pad'
              placeholderTextColor={'gray'}
            />

            <Text style={styles.lableText}>{text.RegisterScreen.fatherNameORSpouseName} *</Text>
            <TextInput
              style={styles.inputField}
              placeholder={text.RegisterScreen.fatherNameORSpouseName}
              value={nomineeName}
              aria-label={text.RegisterScreen.fatherNameORSpouseName}
              onChangeText={setnomineeName}
              placeholderTextColor={'gray'}
            />

            {
              showInstitutionData && (
                <>
                  {<>
                    <Text style={styles.lableText}>{text.RegisterScreen.institutions} *</Text>
                    <TextInput
                      style={styles.inputField}
                      placeholder={text.placeHolder.ins}
                      value={institution}
                      aria-label={text.RegisterScreen.class}
                      onChangeText={setInstituton}
                      placeholderTextColor={'gray'}
                    />
                  </>
                  }

                  {
                    showCollegeColumn && (
                      <>
                        <Text style={styles.lableText}>{text.RegisterScreen.college} *</Text>
                        <TextInput
                          style={styles.inputField}
                          placeholder={text.placeHolder.course}
                          value={studying}
                          aria-label={text.RegisterScreen.class}
                          onChangeText={setStudying}
                          placeholderTextColor={'gray'}
                        />
                      </>
                    )
                  }
                  {showSchoolColumn && (
                    <>
                      <Text style={styles.lableText}>{text.RegisterScreen.class} *</Text>
                      <DropDownPicker
                        open={showClassDropDown}
                        value={studying}
                        items={classOptions}
                        setOpen={setShowClassDropDown}
                        setValue={setStudying}
                        placeholder="Select Class"
                        containerStyle={{ backgroundColor: colors.white }}
                        dropDownContainerStyle={{
                          zIndex: 9999, backgroundColor: colors.white, paddingVertical: 10,
                        }}
                        style={styles.inputField}
                        textStyle={{ fontFamily: "Inter_18pt-Bold" }}
                      />

                      <Text style={styles.lableText}>{text.RegisterScreen.section} *</Text>
                      <DropDownPicker
                        open={showSectionDropDown}
                        value={section}
                        items={sectionOptions}
                        setOpen={setShowSectionDropDown}
                        setValue={setSection}
                        placeholder="Select Section"
                        containerStyle={{ backgroundColor: colors.white }}
                        dropDownContainerStyle={{
                          zIndex: 999, backgroundColor: colors.white, paddingVertical: 10,
                        }}
                        style={styles.inputField}
                        textStyle={{ fontFamily: "Inter_18pt-Bold" }}
                      />
                    </>
                  )}

                </>
              )
            }
            <Text style={styles.lableText}>{text.RegisterScreen.add} *</Text>
            <TextInput
              style={[styles.inputField, { position: 'relative', height: 100, textAlignVertical: 'top' }]}
              placeholder={text.RegisterScreen.address}
              value={address}
              onChangeText={setAddress}
              multiline={true}
              numberOfLines={5}
              placeholderTextColor={'gray'}
            />

            <Text style={styles.lableText}>{text.RegisterScreen.password} *</Text>
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

            <Text style={styles.lableText}>{text.RegisterScreen.confirmPassword} *</Text>
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

          <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginVertical: 15 }}>
            <Text style={styles.text_default}>{text.RegisterScreen.have_account}</Text>
            <TouchableOpacity style={[{ marginTop: 0 }]} onPress={handleNavigateToLogin} >
              <View style={[styles.sec_button, { width: '100%', marginBottom: '15' }]}>
                <Text style={[styles.sec_buttonText, { fontSize: 18, marginTop: 0, height: 'auto' }]}>{text.placeHolder.login}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Modal
          visible={modalShown}
          animationType="fade"
          transparent={true}
          onRequestClose={() => { setModalShown(false); navigation.navigate('Login') }}

        >
          <View style={styles.modalDesign}>

            <View style={styles.modalContainerDesign}>

              <Text style={styles.closeBtn} onPress={() => { setModalShown(false) }}>
                {app_config.svgs.closeIcon}
              </Text>

              <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>

                <Text >{app_config.svgs.successIcon}</Text>

                <Text style={styles.text_default}>{text.RegisterScreen.success}</Text>
                <Text style={[styles.headingText, { fontSize: 18, }]}>{text.RegisterScreen.NameTExt}</Text>
                <Text style={[styles.headingText, { padding: 10, backgroundColor: colors.lightGray, borderRadius: 10, width: '200', textAlign: 'center' }]}>
                  {name}
                </Text>
                <Text style={[styles.headingText, { fontSize: 18, marginVertical: 10 }]}>{text.RegisterScreen.IDTEXT}</Text>

                <Text style={[styles.headingText, { padding: 10, backgroundColor: colors.lightGray, borderRadius: 10, width: '200', textAlign: 'center' }]}>
                  {regId}
                  <TouchableOpacity onPress={copyToClipboard} style={{ paddingHorizontal: 0, paddingLeft: '10', position: 'relative', }}>
                    <Text style={{ textAlign: 'right', }}>{app_config.svgs.copyicon(colors.primary)}</Text>
                  </TouchableOpacity>
                </Text>

                <TouchableOpacity style={[styles.button, { width: '50%' }]} onPress={() => { navigation.navigate('Login', { group: group }) }}>
                  <View >
                    <Text style={styles.buttonText}>{text.LoginScreen.login}</Text>
                  </View>
                </TouchableOpacity>

                <Text style={{ padding: '15' }}>{text.RegisterScreen.RegIdText}</Text>
                <TouchableOpacity style={{ marginTop: 0 }} onPress={() => Linking.openURL('mailto:theafafway@gmail.com')}>
                  <Text style={[styles.boldText, { justifyContent: 'center', alignItems: 'center' }]}> Mail us@theafafway@gmail.com</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ marginTop: 5 }} onPress={() => Linking.openURL('whatsapp://send?phone=+917200290495')}>
                  <Text style={styles.boldText}>Whatsapp@7200290495</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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

  )
}

export default RegisterScreen;