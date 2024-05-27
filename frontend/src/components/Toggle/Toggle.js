import React, { useState, useEffect } from "react";
import { View, Text, Switch } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

const Toggle = ({ status, onPress, size = 'default' }) => {
  const [isToggled, setToggled] = useState(status === 'On');

  useEffect(() => {
    setToggled(status === 'On');
  }, [status]);

  const handleToggle = () => {
    const newValue = !isToggled;
    setToggled(newValue);
    onPress && onPress(newValue);
  };

  const getSwitchStyle = () => {
    switch (size) {
      case 'small':
        return styles.switchSmall;
      case 'large':
        return styles.switchLarge;
      default:
        return styles.switchDefault;
    }
  };

  return (
    <View style={styles.toggleContainer}>
      <Text>{isToggled ? 'On' : 'Off'}</Text>
      <Switch
        value={isToggled}
        onValueChange={handleToggle}
        style={getSwitchStyle()}
        trackColor={{ false: '#FFB267', true: '#FFB267' }}
        thumbColor={isToggled ? '#282424' : '#f4f3f4'}
      />
    </View>
  );
};

Toggle.propTypes = {
  status: PropTypes.oneOf(['On', 'Off']).isRequired,
  onPress: PropTypes.func,
  size: PropTypes.oneOf(['small', 'default', 'large']), // Optional size prop with predefined values
};

export default Toggle;
