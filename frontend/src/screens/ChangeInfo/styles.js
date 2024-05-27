import { StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
const styles = StyleSheet.create({

  container: {
    backgroundColor: '#F5F9F9',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    flexDirection: 'row',
  },

  Header:{
        color: '#000',
        fontWeight: 'bold',
        fontSize: 28,
        textAlign: 'center',
        marginHorizontal: 30,
  },


  text: {

    color: '#000',
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
    backgroundColor: '#fff',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5, // Cho Android để hiển thị bóng đổ
  },

  passwordContainer: {
    marginTop: 10,
    width: '80%', // Độ rộng cố định của ô nhập Email
    height: '10%',
    paddingTop: 10,
  },
  password: {
    width: '100%',
    padding: 5,
    color: '#72777A', // Màu chữ của ô nhập Email
    backgroundColor: '#fff',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5, // Cho Android để hiển thị bóng đổ
  },

  buttonContainer: {
    marginTop: 20,
    width: '80%', // Độ rộng cố định của ô nhập Email
    height: '6%',
    border: 1,
    borderRadius: 15,
    backgroundColor: '#2B78E4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5, // Cho Android để hiển thị bóng đổ
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