import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Modal, Button, Linking } from 'react-native'
import React, { useState } from 'react'
import { app_config } from '../assets/app_config'
import { text } from '../assets/app_default_text'
import { useNavigation, useRoute } from '@react-navigation/native'
import { colors } from '../assets/styles/colors'
import style from '../assets/styles/main_style'

const RegisterScreen = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phoneNo, setPhoneNumber] = useState();
  const [educationalLevel, setEducationalLevel] = useState();
  const [institution, setInstituton] = useState();
  const [gender, setGender] = useState();
  const [studying, setStudying] = useState();
  const [section, setSection] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [conPassword, setConPassword] = useState();
  const [showConPassword, setConShowPassword] = useState(false);
  const [modalShown, setModalShown] = useState(false);
  const [forgotPswdModalShown, setForgotPswdModalShown] = useState(false)
  const styles = style();
  const navigation = useNavigation();
  const route = useRoute();
  const group = route.params.group;
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConPasswordVisibility = () => {
    setConShowPassword(!showConPassword);
  };

  const handleRegister = () => {
    setModalShown(!modalShown);
  }

  const handleNavigateToLogin = () => {
    navigation.navigate('Login', {group: group})
  }

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
          <TextInput
            style={styles.inputField}
            placeholder={text.RegisterScreen.gender}
            value={gender}
            aria-label={text.RegisterScreen.gender}
            onChangeText={setGender}
            placeholderTextColor={'gray'}
          />

          <Text style={styles.lableText}>{text.RegisterScreen.d_o_b}</Text>
          <TextInput
            style={styles.inputField}
            placeholder={text.RegisterScreen.d_o_b}
            value={dateOfBirth}
            aria-label={text.RegisterScreen.d_o_b}
            onChangeText={setDateOfBirth}
            placeholderTextColor={'gray'}
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

          <Text style={styles.lableText}>{text.RegisterScreen.educational_level}</Text>
          <TextInput
            style={styles.inputField}
            placeholder={text.RegisterScreen.educational_level}
            value={educationalLevel}
            aria-label={text.RegisterScreen.educational_level}
            onChangeText={setEducationalLevel}
            placeholderTextColor={'gray'}
          />

          <Text style={styles.lableText}>{text.RegisterScreen.institutions}</Text>
          <TextInput
            style={styles.inputField}
            placeholder={text.RegisterScreen.institutions}
            value={institution}
            aria-label={text.RegisterScreen.institutions}
            onChangeText={setInstituton}
            placeholderTextColor={'gray'}
          />

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
                RegId: GECART1997
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