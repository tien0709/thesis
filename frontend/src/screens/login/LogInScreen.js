import React, { useState , useEffect} from 'react'
import { TouchableOpacity,  View} from 'react-native'
import { TextInput, Text } from 'react-native-paper'
import styles from "./styles";
import  emailValidator  from '../../helpers/emailValidator'
import  passwordValidator  from '../../helpers/passwordValidator'

import { checkAccount } from "../../data/MockDataAPI";

export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [isPressed, setIsPressed] = useState(0);

const fetchData = async () => {
  try {
    const fetchedAccount = await checkAccount(email.value, password.value); // Fetch data
    if (fetchedAccount) {
      navigation.reset({
        index: 0,
        routes: [{ 
          name: 'Home',
          params: { email: fetchedAccount.user.email },
        }],
      });
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

const onLoginPressed = () => {
  const emailError = emailValidator(email.value);
  const passwordError = passwordValidator(password.value);
  if (emailError || passwordError) {
    setEmail({ ...email, error: emailError });
    setPassword({ ...password, error: passwordError });
    return;
  }
  if (!emailError && !passwordError) {
    setIsPressed(1);
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.Header}>WELCOME BACK TO SMART HOME</Text>
      <Text style={styles.text}>Let’s sign you in</Text>
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
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          //onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={onLoginPressed}>
        <Text style={styles.button}>
           Login
        </Text>
      </TouchableOpacity>
    </View>
  )
}

