import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
      toolBar: {
        flexDirection: 'row',
        marginBottom: 10,
        flexWrap: 'wrap', // Thêm dòng này để cho phép xuống dòng khi overflow
        paddingVertical: 10,
        paddingHorizontal: 15, 
      },

      buttonContent: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        margin: 8,
      },

      button: {
        paddingTop: 10,
      },

      logoContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6499E9',
        width: 50,
        padding: 10,
        borderRadius: 80,
        marginBottom: 10,
      },

      text:{
        fontSize: 16,
        marginBottom: 10,
      }
 });