import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  Viewcontainer: {
    flex: 1,
  },

  container: {
    marginTop:0,
    flex: 1,
    backgroundColor: '#F5F9F9',
  },

  bodyImageContainer:{
    width: '100%',
    height: '50%',
  },
  bodyImage: {
    width: '100%',
    height: '100%',
  },

  textContainer: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '10%',
  },

  Text: {
    color: 'blue',
    fontSize: 20,
    fontWeight: 'bold',
  },

  header: {
    marginTop: 100,
    marginBottom: 20,
    flexDirection: 'row',
    marginLeft: 30,
  },

  centeredText: {
  color: '#000',
  fontSize: 28,
  marginLeft: 30,
  fontWeight: 'bold',
  },

  textMini: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    fontStyle: 'italic',
  },

  button:{
    marginLeft: 'auto',
    marginRight: 'auto',
  }

});

export default styles;
