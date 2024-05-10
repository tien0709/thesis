import { StyleSheet } from 'react-native';
import { RecipeCard } from '../../AppStyles';

const styles = StyleSheet.create({
  Viewcontainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5F9F9',
  },

  container:{
      flex: 1,
      flexDirection: 'column',
  },

  infoContainer: {
    flexDirection: 'row',
  },

  user:{
      paddingTop: 100,
      paddingBottom: 50,
      paddingHorizontal: 30,
      backgroundColor: '#2B78E4',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 5, // Cho Android để hiển thị bóng đổ
      borderBottomRightRadius: 10,
  },

  userImage:{
    width: 90,
    height: 90,
    borderRadius: 50,
  },

  text: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 30,
    color: '#000',
  },

  info: {
    paddingVertical: 70,
    paddingRight: 20,
    paddingLeft: 15,
  },

  headerContainer: {
  },

  header: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#000',
    marginLeft: 70,
  },

  emailContainer: {
    
  },

  email: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 50,
    color: '#000',
  },

  phoneNumberContainer: {

  },

  phoneNumber: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 30,
    color: '#000',
  },

  subText: {
    fontSize: 17,
    marginTop: 10,
    color: '#2B78E4',
  },

  groupButtonContainer: {
    marginTop: 30,
    flex: 1,
    alignItems: 'center',
  },

  naviButton: {
     marginVertical: 30,
     width: '80%',
     alignContent: 'center',
     backgroundColor: '#2B78E4',
     paddingVertical: 10,
     borderRadius: 20,
     alignItems: 'center',
     shadowColor: '#000',
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.4,
     shadowRadius: 4,
     elevation: 5, // Cho Android để hiển thị bóng đổ
  },

  buttonText: {
    color: '#f8f8f8',
    fontSize: 17,
  },
});

export default styles;