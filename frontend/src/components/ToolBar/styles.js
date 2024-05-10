import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    toolBar: {
        //position: 'absolute',
        //bottom: 0,
        //left: 0,
        //right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: '#fff',
        borderTopWidth: '1',
        borderTopColor: '#fff',
        borderRadius: 15,
        padding: 20,
        margin: 20,
      },

      buttonContent: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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
        borderRadius: 10,
        marginBottom: 10,
      },

      text:{
        fontSize: 16,
      }
 });