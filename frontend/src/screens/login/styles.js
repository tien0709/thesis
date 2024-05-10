import { StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
const styles = StyleSheet.create({

  container: {
    backgroundColor: '#000001',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  Header:{
        color: '#f8f8f8',
        fontWeight: 'bold',
        fontSize: 28,
        textAlign: 'center',
        marginHorizontal: 30,
  },


  text: {

    color: '#f8f8f8',
    fontWeight: 'bold',
    fontSize: 20,
    width: '80%',
    marginTop: 20,
  },

  emailContainer: {
    marginTop: 50,
    width: '80%', // Độ rộng cố định của ô nhập Email
    height: '10%',
    paddingTop: 10,
  },
  email: {
    width: '100%',
    padding: 5,
    color: '#72777A', // Màu chữ của ô nhập Email
    backgroundColor: '#f8f8f8',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 10,
  },

  passwordContainer: {
    marginTop: 10,
    width: '80%', // Độ rộng cố định của ô nhập Email
    height: '10%',
    paddingTop: 10,
  },
  password: {
    width: '100%',
    padding: 2,
    color: '#72777A', // Màu chữ của ô nhập Email
    backgroundColor: '#f8f8f8',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 10,
  },

  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: 10,
    marginRight: 100,
    marginBottom: 24,
  },


  forgot: {
    fontSize: 13,
    color: '#2B78E4',
  },

  buttonContainer: {
    marginTop: 20,
    width: '80%', // Độ rộng cố định của ô nhập Email
    height: '6%',
    paddingVertical: 5,
    border: 1,
    borderRadius: 5,
    backgroundColor: '#2B78E4',
  },

  button: {
    width: '100%',
    fontSize: 20, // Độ lớn của chữ trên button
    color: 'white', // Màu chữ của button
    textAlign: 'center',
    marginTop: 10,
  },

})

export default styles;