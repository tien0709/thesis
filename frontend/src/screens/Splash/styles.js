import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#000',
    flex: 1,
    justifyContent: 'flex-end', // Đưa ảnh và nút về phía dưới container
    alignItems: 'center',
  },
  photo: {
    resizeMode: 'contain',
    width: '100%',
    flex: 1,
  },

  buttonContainer: {
    width: '40%',
    backgroundColor: '#6499E9', 
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#00E6D8',
    shadowOffset: { width: 6, height: 5 },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    marginBottom: 20, // Khoảng cách giữa nút và ảnh
    alignSelf: 'center', // Căn giữa theo chiều ngang
  },
});

export default styles;
