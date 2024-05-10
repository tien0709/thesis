import React from "react";
import { TouchableHighlight, Image, View, } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function PencilButton(props) {
  return (
    <View style={styles.btnContainer}>
          <TouchableHighlight onPress={props.onPress}>
                  <Icon style={styles.logo} name="pencil-alt" size={20} color="#455A64" />
          </TouchableHighlight>
    </View>
  );
}

PencilButton.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string,
};
