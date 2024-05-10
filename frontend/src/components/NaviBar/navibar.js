import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMicrophone, faHouse, faMagnifyingGlass, faGripVertical, faUser } from '@fortawesome/free-solid-svg-icons';
import PropTypes from "prop-types";
import styles from './styles';

const NavigationBar = ({ onPressButton, type }) => {
  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onPressButton('Home')}
        activeOpacity={0.9}
      >
        <View style={styles.buttonContent}>
          <FontAwesomeIcon style={styles.logo} icon={faHouse} name="home" size={20} color={type === 'home' ?  '#FFB267'  : '#000'} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => onPressButton('Discovery')}
        activeOpacity={0.9}
      >
        <View style={styles.buttonContent}>
          <FontAwesomeIcon style={styles.logo} icon={faMagnifyingGlass} name="search" size={20} color={type === 'search' ?  '#FFB267'  : '#000'} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonMain}
        onPress={() => onPressButton('Micro')}
        activeOpacity={0.9}
      >
        <View style={styles.buttonContent}>
          <FontAwesomeIcon style={styles.logo} icon={faMicrophone} name="microphone" size={40} color={type === 'microphone' ?  '#FFB267'  : '#2B78E4'} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => onPressButton('Function')}
        activeOpacity={0.9}
      >
        <View style={styles.buttonContent}>
          <FontAwesomeIcon style={styles.logo} icon={faGripVertical} name="grip-vertical" size={20} color={type === 'application' ?  '#FFB267'  : '#000'}/>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => onPressButton('Info')}
        activeOpacity={0.9}
      >
        <View style={styles.buttonContent}>
          <FontAwesomeIcon style={styles.logo} icon={faUser} name="user" size={20} color={type === 'user' ?  '#FFB267'  : '#000'} />
        </View>
      </TouchableOpacity>

      {/* Thêm các nút khác nếu cần */}
    </View>
  );
};

NavigationBar.propTypes = {
  onPressButton: PropTypes.func,
  type: PropTypes.string, // Type prop is required
};

export default NavigationBar;
