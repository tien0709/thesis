import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
      },

      buttonContent: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },

      button: {
        backgroundColor: '#fff',
        marginTop: 20,
        paddingTop: 20,
        paddingBottom: 25,
        paddingTop: 25,
        paddingHorizontal: 31,
        borderTopColor: '#DCDCDC',
        borderTopWidth: 1,
        zIndex: 2,

      },

      buttonMain: {
        backgroundColor: '#fff',
        borderTopEndRadius: 40,
        borderTopStartRadius: 40,
        paddingTop: 25,
        paddingBottom: 10,
        paddingHorizontal: 40,
        borderColor: '#DCDCDC',
        borderWidth: 1,
        zIndex: 1,
      },
      logo: {
        paddingBottom: 10,
      },
      text:{
        fontSize: 16,
      }
 });