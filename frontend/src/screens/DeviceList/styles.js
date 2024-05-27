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
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '85%',
    padding: 20,
    marginTop: 40,
    marginHorizontal: 30,
    alignItems: 'center', // Căn chỉnh theo chiều dọc
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5, // Cho Android để hiển thị bóng đổ
  },

 

  text: {
    marginRight: 5,
    fontWeight: 'bold',
    fontSize: 17,
  },
  
  logo:{
       marginHorizontal: 20,
  },

 

});

export default styles;
