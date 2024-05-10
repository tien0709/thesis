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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%', // Giới hạn chiều rộng của header
    marginTop: 70,
    height: '5%',
  },
  centeredText: {
    flex: 1,
    color: '#000',
    fontSize: 20,
    textAlign: 'center',
    marginLeft: 70,
    fontWeight: 'bold',
  },
  bellIconContainer: {
    marginLeft: 'auto',
    marginRight: 20,
  },

  microIconContainer: {
    marginLeft: 'auto',
  },

  bodyImageContainer:{
          width: '100%',
          height: '30%',
          marginVertical: 15,
  },

  bodyImage: {
    width: '100%',
    height: '100%',
  },

  sensorInformationContainer: {
    width: '100%',
    height: '22%',
    flexDirection: 'row',
  },

  humiContainer: {
    width: '43%',
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 24,
    marginHorizontal: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5, // Cho Android để hiển thị bóng đổ
  },

  temperatureContainer: {
    width: '43%',
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5, // Cho Android để hiển thị bóng đổ
  },

  deviceInformationContainer: {
    marginLeft: 20,
    width: '90%',
    height: '18%',
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5, // Cho Android để hiển thị bóng đổ
  },

  deviceInformationText: {
     marginVertical: 5,
     marginHorizontal: 20,
     fontSize: 12,
  },

  sliderMainLight: {
    flexDirection: 'row',
    marginLeft: 15,
  },

  sliderLight: {
    flexDirection: 'row',
    marginLeft: 15,
  },

  slider:{
    width: '80%',
    marginRight: 20,
  },

  thumbStyle: {
    width: 30, // Đặt chiều rộng của nút kéo
    height: 30, // Đặt chiều cao của nút kéo
    backgroundColor: '#f8f8f8', // Màu nền của nút kéo
    borderRadius: 20, // Làm tròn góc để tạo hình dạng hòn bi
    borderWidth: 8, // Độ dày đường viền
    borderColor: '#6B6869', // Màu đường viền
  },

  info: {
    flexDirection: 'row',
  },

  infoText: {
    fontSize: 32,
    width: '80%',
  },

  name: {
    fontSize: 12,
    marginTop: 20,
    borderBottomWidth: 1,
    paddingBottom: 25,
  },

});

export default styles;
