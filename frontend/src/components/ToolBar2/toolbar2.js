// Ví dụ về cách sử dụng trong React Native
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles'
import PropTypes from "prop-types";

const renderElementToolbar= ({ item }) => (
    <View style={styles.buttonContent}>
          <View style={styles.logoContainer}>
            <Icon style={styles.logo} name={item.icon} size={25} color="#fff" />
          </View>
          <Text style={styles.text}>{item.name}</Text>
    </View>
);

const ToolBar2 = ({  data, onPress }) => {
  return (
    /*<View style={styles.toolBar}>
      <View style={styles.row1}>
        <TouchableOpacity style={styles.button} onPress={() => onPressButton('library')}>
        <View style={styles.buttonContent}>
              <View style={styles.logoContainer}>
                <Icon style={styles.logo} name="book-open" size={25} color="#fff" />
              </View>
              <Text style={styles.text}>Thư Viện</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onPressButton('falculity')}>
        <View style={styles.buttonContent}>
              <View style={styles.logoContainer}>
                  <Icon style={styles.logo} name="landmark" size={25} color="#fff" />
              </View>
              <Text style={styles.text}>Khoa - trung tâm đào tạo</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onPressButton('canteen')}>
        <View style={styles.buttonContent}>
              <View style={styles.logoContainer}>
                  <Icon style={styles.logo} name="coffee" size={25} color="#fff" />
              </View>
              <Text style={styles.text}>Nhà ăn</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onPressButton('stadium')}>
          <View style={styles.buttonContent}>
              <View style={styles.logoContainer}>
                  <Icon style={styles.logo} name="football-ball" size={25} color="#fff" />
              </View>
              <Text style={styles.text}>Sân thể thao</Text>
        </View>
        </TouchableOpacity>
      </View>
      <View style={styles.row2}>
        <TouchableOpacity style={styles.button} onPress={() => onPressButton('Event')}>
        <View style={styles.buttonContent}>
              <View style={styles.logoContainer}>
                <Icon style={styles.logo} name="building" size={25} color="#fff" />
              </View>
              <Text style={styles.text}>Văn phòng</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onPressButton('researchCenter')}>
        <View style={styles.buttonContent}>
              <View style={styles.logoContainer}>
                  <Icon style={styles.logo} name="lightbulb" size={25} color="#fff" />
              </View>
              <Text style={styles.text}>trung tâm viện nghiên cứu</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onPressButton('QRCreate')}>
        <View style={styles.buttonContent}>
              <View style={styles.logoContainer}>
                  <Icon style={styles.logo} name="qrcode" size={25} color="#fff" />
              </View>
              <Text style={styles.text}>Hội trường</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onPressButton('otherLocations')}>
          <View style={styles.buttonContent}>
              <View style={styles.logoContainer}>
                  <Icon style={styles.logo} name="comment-dots" size={25} color="#fff" />
              </View>
              <Text style={styles.text}>Địa điểm khác</Text>
        </View>
        </TouchableOpacity>
      </View>
    </View>*/
    <View style={styles.toolBar}>
    {data.map((item, index) => (
      <TouchableOpacity key={index} onPress={() => onPress(item)}>
        {renderElementToolbar({item})}
      </TouchableOpacity>
    ))}
  </View>
  );
};

ToolBar2.propTypes = {
    onPress: PropTypes.func,
    source: PropTypes.number,
    title: PropTypes.string,
  };
  

export default ToolBar2;
