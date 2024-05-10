import React from "react";
import { TouchableHighlight, Image,Text } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function BackButton(props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.btnContainer}>
      <Text style={styles.text}>Đăng</Text>
    </TouchableOpacity>
  );
}

BackButton.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string,
};
