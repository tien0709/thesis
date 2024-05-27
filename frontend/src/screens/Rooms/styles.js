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


  ItemContainer: {
    backgroundColor: '#f8f8f8',
    width: '45%',
    height: 200,
    marginTop: 50,
    marginHorizontal: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  bgImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text: {
    color: '#6B6869',
    fontSize: 20,
    fontWeight: 'bold',
  },

 

});

export default styles;
