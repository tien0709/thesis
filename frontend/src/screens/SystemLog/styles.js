import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  Viewcontainer: {
    flex: 1,
    backgroundColor: '#F5F9F9',
  },

  centeredText: {
    marginTop: 150,
    marginBottom: 20,
    color: '#000',
    fontSize: 28,
    marginLeft: 30,
    fontWeight: 'bold',
  },

  ItemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '90%',
    marginTop: 50,
    padding: 20,
    borderWidth: 2,
    borderColor: '#B3961F',
    marginHorizontal: 20,
    alignItems: 'center', // Căn chỉnh theo chiều dọc
    shadowColor: '#B3961F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5, // Cho Android để hiển thị bóng đổ
    borderRadius: 10,
  },
  

  Name: {
     fontWeight: 'bold',
     marginHorizontal: 20,
  },

  button:{
    backgroundColor: 'black',
    paddingVertical: 20,
    width: '50%',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 60,
  },

  text:{
    marginLeft: 20,
  },

  time:{
      fontSize: '12px',
      fontStyle: 'italic',
  },

  status: {
     marginTop: 10,
     fontSize: '17px',
  },

});

export default styles;
