import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  Viewcontainer: {
    flex: 1,
    backgroundColor: '#F5F9F9',
  },

  centeredText: {
    justifyContent: 'center',
    marginTop: 70,
    marginBottom: 20,
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 30,
  },

  button:{
    backgroundColor: '#48C9B0',
    paddingVertical: 20,
    width: '50%',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 60,
  },

  header: {
       justifyContent: 'center',
       alignItems: 'center',
       marginTop: 40,
  },

  content: {
    marginHorizontal: 40,
    width: '80%',
    height: '30%',
    borderRadius: 15,
    marginTop: 50,
    backgroundColor: '#f8f8f8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
  },

  contentText:{
    fontSize: 25,
    textAlign: 'center',
  }
 

});

export default styles;
