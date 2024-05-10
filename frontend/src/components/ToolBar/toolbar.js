// Ví dụ về cách sử dụng trong React Native
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles'
import PropTypes from "prop-types";

const ToolBar = ({ onPressButton }) => {
  return (
    <View style={styles.toolBar}>
      <TouchableOpacity style={styles.button} onPress={() => onPressButton('Event')}>
       <View style={styles.buttonContent}>
            <View style={styles.logoContainer}>
              <Icon style={styles.logo} name="lightbulb" size={25} color="#fff" />
            </View>
            <Text style={styles.text}>Event</Text>
       </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => onPressButton('Discovery')}>
       <View style={styles.buttonContent}>
            <View style={styles.logoContainer}>
                <Icon style={styles.logo} name="map" size={25} color="#fff" />
            </View>
            <Text style={styles.text}>Khám phá</Text>
       </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => onPressButton('QRCreate')}>
       <View style={styles.buttonContent}>
            <View style={styles.logoContainer}>
                <Icon style={styles.logo} name="qrcode" size={25} color="#fff" />
            </View>
            <Text style={styles.text}>Tạo mã QR</Text>
       </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => onPressButton('QR')}>
        <View style={styles.buttonContent}>
            <View style={styles.logoContainer}>
                <Icon style={styles.logo} name="qrcode" size={25} color="#fff" />
            </View>
            <Text style={styles.text}>Quét mã QR</Text>
       </View>
      </TouchableOpacity>

    </View>
  );
};

ToolBar.propTypes = {
    onPress: PropTypes.func,
    source: PropTypes.number,
    title: PropTypes.string,
  };
  

export default ToolBar;
