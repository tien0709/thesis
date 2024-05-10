import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  Viewcontainer: {
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

  ItemContainer: {
    backgroundColor: '#f8f8f8',
    width: '45%',
    marginTop: 50,
    padding: 20,
    marginHorizontal: 10,
    alignItems: 'center', // Căn chỉnh theo chiều dọc
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5, // Cho Android để hiển thị bóng đổ
  },

  itemImage: {
    width: 70,
    height: 70,
    marginBottom: 10,
  },

  nameDevice: {
    flexDirection: 'row',   
  },

  Text: {
    marginRight: 5,
    fontWeight: 'bold',
    fontSize: 17,
  },
  

  Name: {
     fontWeight: 'bold',
     marginHorizontal: 20,
  },

  searchContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    width: 200,
    justifyContent: "space-around",
    marginLeft: 10,
    backgroundColor: "#f8f8f8",
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5, // Cho Android để hiển thị bóng đổ
    borderRadius: 10,
  },
  searchIcon: { 
    marginLeft: 20,
    width: 20, 
    height: 20, 
    tintColor: 'grey',
  },
  searchInput: {
    backgroundColor: "#f8f8f8",
    color: "black",
    width: 100,
    height: 50,
    marginLeft: 20,
  },

  numTopicContainer:{
    margin: 20,
    borderRadius: 10, 
    backgroundColor: "#DAF0FF", 
    width: 100,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5, 
    padding: 10,
},

 numTopic:{
    textAlign: 'center',
    fontWeight: 'bold',
    zIndex: 1,
 },
 

});

export default styles;
