import React, { useState, useEffect } from 'react'
import { TouchableOpacity, View} from 'react-native'
import { TextInput, Text } from 'react-native-paper'
import styles from "./styles";
import  emailValidator  from '../../helpers/emailValidator'
import  phoneNumberValidator  from '../../helpers/phoneNumberValidator'
import BackButton from "../../components/BackButton/BackButton";
import { Alert } from 'react-native';

import { updateAccount } from "../../data/MockDataAPI";

export default function ChangeInfoScreen(props) {
  const { navigation, route } = props;
  const email = route?.params?.email;
  const [newEmail, setEmail] = useState({ value: '', error: '' })
  const [phoneNumber, setphoneNumber] = useState({ value: '', error: '' })
  const [isPressed, setIsPressed] = useState(0);

  const onLoginPressed = () => {
    const emailError = emailValidator(newEmail.value);
    const phoneNumberError = phoneNumberValidator(phoneNumber.value);
    console.log(phoneNumber.value);
    console.log(newEmail.value);

    if ((emailError&&emailError!='Email can\'t be empty.')) {
      Alert.alert(" Invalid Email");
      return;
    }
    else if(phoneNumberError){
      Alert.alert("Invalid Phone Number");
      return;
    }
    else if (newEmail.value || phoneNumber.value) {
      setIsPressed(1);
      return;
    }
    else {
      Alert.alert('Don\'t leave both cells blank');
      return;
    }

  };

  const fetchData = async () => {
    try {
      const fetchedAccount = await updateAccount(email.value, newEmail.value,phoneNumber.value); // Fetch data
      console.log(fetchedAccount);
      if (fetchedAccount) {
        Alert.alert('Update success', '', [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Login');
            },
          },
        ]);
      } else {
        setEmail({ ...email, error: 'Email hoặc mật khẩu không đúng' });
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
    setIsPressed(0);
  };

  useEffect(() => {
    if (isPressed) {
      fetchData();
    }
  }, [isPressed]);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <BackButton onPress={() => navigation.goBack()} />    
          <Text style={styles.Header}>WELCOME BACK TO SMART HOME</Text>      
      </View>
      <Text style={styles.text}>Let blank Information that you          don’t want be changed</Text>
      <View style={styles.emailContainer} >
        <TextInput
          style={styles.email}
          label="Email"
          returnKeyType="next"
          value={newEmail.value}
          onChangeText={(text) => setEmail({ value: text, error: '' })}
          error={!!newEmail.error}
          errorText={newEmail.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.passwordContainer}>
      <TextInput
          style={styles.password}
          label="Phone Number"
          returnKeyType="next"
          value={phoneNumber.value}
          onChangeText={(text) => setphoneNumber({ value: text, error: '' })}
          error={!!phoneNumber.error}
          errorText={phoneNumber.error}
          autoCapitalize="none"
          autoCompleteType="none"
          textContentType="none"
          //keyboardType="none"
        />
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={onLoginPressed}>
        <Text style={styles.button}>
           Login
        </Text>
      </TouchableOpacity>
    </View>
  )
}

