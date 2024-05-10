import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  Viewcontainer: {
    flex: 1,
    backgroundColor: '#F5F9F9',
  },

  container: {
    marginTop:0,
    flex: 1,

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
    width: '85%',
    marginTop: 30,
    paddingVertical: 20,
    paddingHorizontal: 25,
    marginHorizontal: 30,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5, // Cho Android để hiển thị bóng đổ
  },

  sensor: {
    flexDirection: 'row',
    marginTop: 10,
  },

  valueContainer: {
    flexDirection: 'row',
    marginRight: 50,
    marginTop: 10,
  },

  value: {
    fontSize: 48,
    marginRight: 10,
  },

  subHeader: {
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 30,
    fontWeight: 'bold',
    fontSize: 20,
  },

  button: {
    marginTop: 10,
    paddingVertical: 10,
    paddingLeft: 10,
    borderRadius: 10,
    paddingRight: 60,

  },

  buttonEmpty: {
    marginTop: 10,
    paddingVertical: 17,
    paddingLeft: 10,
    borderRadius: 10,
    paddingRight: 60,

  },

  buttonContainer: {
    borderRadius: 10,
  },

  name: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  Text:{
    fontWeight: 'bold',
  },

});

export default styles;
