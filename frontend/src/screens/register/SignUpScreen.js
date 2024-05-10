import React, { useState } from 'react'
import { View, TouchableOpacity, Button } from 'react-native'
import { Text, TextInput } from 'react-native-paper'
import styles from "./styles";
import { addAccount  } from "../../data/MockDataAPI";
import Logo from '../login/logo'
import Icon from 'react-native-vector-icons/FontAwesome5';

import  emailValidator from '../../helpers/emailValidator'
import  passwordValidator  from '../../helpers/passwordValidator'
import  nameValidator  from '../../helpers/nameValidator'

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    else {
      addAccount(name.value, email.value, password.value);
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    })
  }

  return (
    <View style={styles.container}>
     <Logo style={styles.logo}/>
      <View style={styles.emailContainer} >
        <TextInput
          style={styles.email}
          label="Email"
          returnKeyType="next"
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: '' })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          icon={{
            name: "envelope-envelope",
            size: 20,
            color: "blue",
          }}
        />
      </View>
      <View style={styles.nameContainer} >
        <TextInput
          style={styles.name}
          label="Name"
          returnKeyType="next"
          value={name.value}
          onChangeText={(text) => setName({ value: text, error: '' })}
          error={!!name.error}
          errorText={name.error}
          autoCapitalize="none"
          autoCompleteType="none"
          textContentType="none"
          //keyboardType="none"
        />
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.password}
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
      </View>
      <View style={styles.repasswordContainer}>
        <TextInput
          style={styles.repassword}
          label="Repeat Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer} >
        <Button style={styles.button} mode="contained" onPress={onSignUpPressed} title='SIGN UP'></Button>
      </View>
      <View style={styles.horizontalLine}></View>
      <View style={styles.buttonFacebookContainer} >
        <Icon name = "facebook" color ='white' size ={20}></Icon>
        <Button style={styles.buttonFb} mode="contained"  title="Continue with Facebook" >
        </Button>
      </View>
      <View style={styles.buttonGoogleContainer} >
        <Icon name = "google" color ='white' size ={20}></Icon>
        <Button style={styles.buttonGg} mode="contained"  title="Continue with Google">
        </Button>
      </View>
      <View style={styles.row}>
        <Text style={{ color: '#E0E0E0', marginRight:10 }}> Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

