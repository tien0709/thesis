import { StyleSheet, LinearGradient  } from "react-native";
const styles = StyleSheet.create({

  container: {
    backgroundColor: '#040832',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    resizeMode: 'contain',
    width: '100%',
  },

  emailContainer: {
    marginTop: 10,
    width: '80%', // Độ rộng cố định của ô nhập Email
    height: '10%',
    paddingTop: 10,
  },
  email: {
    width: '100%',
    padding: 2,
    color: 'white', // Màu chữ của ô nhập Email
    backgroundColor: '#040832',
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
    color: 'white', // Màu chữ của ô nhập Email
    backgroundColor: '#040832',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 10,
  },

  nameContainer: {
    marginTop: 10,
    width: '80%', // Độ rộng cố định của ô nhập Email
    height: '10%',
    paddingTop: 10,
  },
  name: {
    width: '100%',
    padding: 2,
    color: 'white', // Màu chữ của ô nhập Email
    backgroundColor: '#040832',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 10,
  },

  repasswordContainer: {
    marginTop: 10,
    width: '80%', // Độ rộng cố định của ô nhập Email
    height: '8%',
    paddingTop: 10,
  },
  repassword: {
    width: '100%',
    padding: 2,
    color: 'white', // Màu chữ của ô nhập Email
    backgroundColor: '#040832',
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
    color: '#E0E0E',
  },

  row: {
    flexDirection: 'row',
    marginTop: 80,
  },

  link: {
    fontWeight: 'bold',
    color: '#E0E0E0',
  },

  buttonContainer: {
    marginTop: 20,
    width: '80%', // Độ rộng cố định của ô nhập Email
    height: '6%',
    paddingVertical: 5,
    border: 1,
    borderRadius: 15,
    backgroundColor: '#A5C3F0',
  },

  button: {
    width: '100%',
    fontSize: 16, // Độ lớn của chữ trên button
    color: 'white', // Màu chữ của button
  },


  horizontalLine: {
    borderBottomColor: 'white', // Màu của đường kẻ
    borderBottomWidth: 1,       // Độ dày của đường kẻ
    width: '80%',               // Chiều rộng của đường kẻ (có thể điều chỉnh)
    marginVertical: 10,         // Khoảng cách giữa các phần tử
  },

  buttonFacebookContainer: {
    flexDirection: "row", 
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    width: '80%', // Độ rộng cố định của ô nhập Email
    height: '4%',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#03C0FC',
    backgroundColor: '#040832',
  },

  buttonFb: {
    width: '100%',
    fontSize: 10, // Độ lớn của chữ trên button
    color: 'white', // Màu chữ của button
  },

  buttonGoogleContainer: {
    flexDirection: "row", 
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    width: '80%', // Độ rộng cố định của ô nhập Email
    height: '4%',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#F60000',
    backgroundColor: '#040832',
  },

  buttonGg: {
    width: '100%',
    fontSize: 10, // Độ lớn của chữ trên button
    color: 'white', // Màu chữ của button
  },
})

export default styles;