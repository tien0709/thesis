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
    marginHorizontal: 20,
    justifyContent: 'space-between', // Chỉnh giữa các phần tử theo chiều ngang
    alignItems: 'center', // Căn chỉnh theo chiều dọc
    shadowColor: '#000',
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
 

});

export default styles;
