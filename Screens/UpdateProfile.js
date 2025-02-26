import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
  Keyboard,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import style from "../assets/styles/main_style";
import { useAuth } from "./AuthContext";
import { parseGradient } from "../Components/gradient";
import Toast from "react-native-toast-message";
import LinearGradient from "react-native-linear-gradient";
import { text } from "../assets/app_default_text";
import DropDownPicker from "react-native-dropdown-picker";
import { colors } from "../assets/styles/colors";
import moment from "moment";
import DatePicker from "react-native-date-picker";
import { updatUser } from "../API_STORE/userApi";

const UpdateProfile = () => {
  const navigation = useNavigation();
  const { authUser, group, groupTheme, updateUser } = useAuth();
  const styles = style();
  const route = useRoute();
console.log(authUser);

  // User state
  const [name, setName] = useState(authUser?.name || "");
  const [email, setEmail] = useState(authUser?.email || "");
  const [phoneNo, setPhoneNumber] = useState(authUser?.phoneNo || "");
  const [institution, setInstitution] = useState(authUser?.institution || "");
  const [nomineeName, setNomineeName] = useState(authUser?.nomineeName || "");
  const [gender, setGender] = useState(authUser?.gender || "");
  const [studying, setStudying] = useState(authUser?.studying || "");
  const [address, setAddress] = useState(authUser?.address || "");
  const [section, setSection] = useState(authUser?.section || "");
  const [dateOfBirth, setDateOfBirth] = useState(new Date(authUser?.dateOfBirth || new Date()));

  // State for password update
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // State for dropdowns & date picker
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openGender, setOpenGender] = useState(false);
  const [showClassDropDown, setShowClassDropDown] = useState(false);
  const [showSectionDropDown, setShowSectionDropDown] = useState(false);

  const showInstitutionData = group.groupName.includes("College") || group.groupName.includes("School");
  const showSchoolColumn = group.groupName.includes("School");
  const showCollegeColumn = group.groupName.includes("College");

  const classOptions = Array.from({ length: 9 }, (_, i) => ({
    label: `Class ${i + 4}`,
    value: `Class ${i + 4}`,
  }));

  const sectionOptions = Array.from({ length: 26 }, (_, i) => ({
    label: String.fromCharCode(65 + i),
    value: String.fromCharCode(65 + i),
  }));
  const { isGradient, gradientColors, start, end, solidColor } = parseGradient(group.groupTheme);

  const handleUpdateProfile = async () => {
    if (password && password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    const updatedData = {
      name,
      email,
      phoneNo,
      institution,
      nomineeName,
      gender,
      studying,
      address,
      section,
      dateOfBirth: moment(dateOfBirth).format("YYYY-MM-DD"),
    };

    try {
      const response = await updatUser(authUser.userId, updatedData)
      console.log(response);
      
      if (response.success) {
        Toast.show({ type: "success", text1: "Profile updated successfully" });
        navigation.goBack();
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      console.log("Update failed", error);
      
      Alert.alert("Error", "Something went wrong!");
    }
  };

  const renderContent = () => {
    return (
      <ScrollView style={{ width: "100%" }}>
        <View style={[styles.whiteCardBgStyle, { width: "100%" }]}>
          <Text style={styles.lableText}>Name *</Text>
          <TextInput
            style={styles.inputField}
            value={name}
            onChangeText={setName}
            placeholder="Enter Name"
          />

          <Text style={styles.lableText}>Date of Birth *</Text>
          <TouchableOpacity onPress={() => setOpenDatePicker(true)} style={{ width: "100%" }}>
            <Text style={styles.inputField}>{moment(dateOfBirth).format("DD-MM-YYYY")}</Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={openDatePicker}
            date={dateOfBirth}
            onConfirm={(date) => {
              setDateOfBirth(date);
              setOpenDatePicker(false);
            }}
            onCancel={() => setOpenDatePicker(false)}
            mode="date"
            maximumDate={new Date()}
          />

          <Text style={styles.lableText}>Email</Text>
          <TextInput
            style={styles.inputField}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter Email"
          />

          <Text style={styles.lableText}>Phone Number *</Text>
          <TextInput
            style={styles.inputField}
            value={phoneNo}
            onChangeText={setPhoneNumber}
            keyboardType="number-pad"
            placeholder="Enter Phone Number"
          />

          {showInstitutionData && (
            <>
              <Text style={styles.lableText}>{text.RegisterScreen.institutions} *</Text>
              <TextInput
                style={styles.inputField}
                placeholder={text.placeHolder.ins}
                value={institution}
                onChangeText={setInstitution}
                placeholderTextColor={"gray"}
              />

              {showCollegeColumn && (
                <>
                  <Text style={styles.lableText}>{text.RegisterScreen.college} *</Text>
                  <TextInput
                    style={styles.inputField}
                    placeholder={text.placeHolder.course}
                    value={studying}
                    onChangeText={setStudying}
                    placeholderTextColor={"gray"}
                  />
                </>
              )}

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
                    style={styles.inputField}
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
                    style={styles.inputField}
                  />
                </>
              )}
            </>
          )}

          <Text style={styles.lableText}>Address *</Text>
          <TextInput
            style={styles.inputField}
            value={address}
            onChangeText={setAddress}
            placeholder="Enter Address"
            multiline
          />

          <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
            <Text style={styles.buttonText}>Update Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {isGradient ? (
        <LinearGradient colors={gradientColors} start={start} end={end} style={[styles.parentDiv,{ width: "100%", paddingVertical: 20, flex:1 }]}>
          {renderContent()}
        </LinearGradient>
      ) : (
        <View style={[styles.parentDiv, { backgroundColor: solidColor }]}>{renderContent()}</View>
      )}
    </TouchableWithoutFeedback>
  );
};

export default UpdateProfile;
