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

  centeredText: {
    marginTop: 100,
    marginBottom: 20,
    color: '#000',
    fontSize: 28,
    marginLeft: 30,
    fontWeight: 'bold',
  },

  row1: {
    flex: 1,
    flexDirection: 'row',
  },

  row2: {
    flexDirection: 'row',
    flex: 2,
  },

  ItemContainer1: {
    backgroundColor: '#fff',
    width: '45%',
    height: '80%',
    marginTop: 40,
    marginHorizontal: 10,
    alignItems: 'center', // Căn chỉnh theo chiều dọc
    justifyContent: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5, // Cho Android để hiển thị bóng đổ
  },

  ItemContainer2: {
    backgroundColor: '#fff',
    width: '45%',
    height: '40%',
    marginTop: 40,
    marginHorizontal: 10,
    alignItems: 'center', // Căn chỉnh theo chiều dọc
    justifyContent: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5, // Cho Android để hiển thị bóng đổ
  },

  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text: {
    color: 'blue',
    fontSize: 20,
    fontWeight: 'bold',
  },
  

  bgImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
 

});

export default styles;
