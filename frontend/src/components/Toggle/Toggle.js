import React, { useState, useEffect } from "react";
import { View, Text, Switch } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

const Toggle = ({ status, onPress }) => {
  const [isToggled, setToggled] = useState(status === "On");

  
  useEffect(() => {
    setToggled(status === "On");
  }, [status]);

  const handleToggle = () => {
    setToggled(!isToggled)
    onPress && onPress(isToggled);//isToggled se la bien value cho handleToggleTempChange(value) va handleToggleHumiChange(value) 
  };

  return (
    <View style={styles.toggleContainer}>
      <Text>{isToggled ? "On" : "Off"}</Text>
      <Switch
        value={isToggled}
        onValueChange={handleToggle}
        style={styles.toggleSwitch}
        trackColor={{ false: "#FFB267", true: "#FFB267" }}
        thumbColor={isToggled ? "#282424" : "#f4f3f4"}
      />
    </View>
  );
};

Toggle.propTypes = {
  status: PropTypes.oneOf(["On", "Off"]).isRequired,
  onPress: PropTypes.func,
};

export default Toggle;
