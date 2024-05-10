import React from "react";
import { TouchableOpacity, Image, } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Micro(props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.btnContainer}>
      <Icon style={styles.logo} name="microphone" size={20} color="#000"/>
    </TouchableOpacity>
  );
}

Micro.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string,
};
