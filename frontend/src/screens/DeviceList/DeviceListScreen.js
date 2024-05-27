
import React, { useLayoutEffect, useRef, useState } from "react";
import { FlatList, Text, View, TouchableOpacity} from "react-native";
import styles from "./styles";
import NavigationBar from "../../components/NaviBar/navibar";
import Icon from 'react-native-vector-icons/FontAwesome5';
import BackButton from "../../components/BackButton/BackButton";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFan, faThermometer, faLightbulb } from '@fortawesome/free-solid-svg-icons';

export default function DeviceListScreen(props) {
  const { navigation, route } = props;
  const email = route?.params?.email;
  
  const DeviceList= [
    {
      id: 0,
      name: 'Fan',
      icon: faFan,
    },
    {
      id: 1,
      name: 'Sensor',
      icon: faThermometer,
    },
    {
      id: 2,
      name: 'Led',
      icon: faLightbulb,
    },
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitleStyle: { opacity: 0 },
    });
  }, [navigation]);

  const handlePressButton = (buttonName) => {
    if(buttonName === 'Discovery'){
      navigation.navigate("Discovery", {email});
    }
    else if(buttonName === 'Home'){
      navigation.navigate("Home", {email});
    }
    else if(buttonName === 'Function'){
      navigation.navigate("Function", {email});
    }
    else if(buttonName === 'Info'){
      navigation.navigate("Info", {email});
    }
    else if(buttonName === 'Micro'){
      navigation.navigate("Voice", {email});
    }

 };

 const renderDeviceList = ({ item }) => (
  <TouchableOpacity
    style={styles.ItemContainer}
    onPress={() => navigation.navigate('Devices', { deviceName: item.name, email })}
  >
    <FontAwesomeIcon style={styles.logo} icon={item.icon} size={30} color="#000" />
    <Text style={styles.text}>{item.name === 'Fan' ? 'Quạt' : item.name === 'Sensor' ? 'Cảm biến' : 'Đèn'}</Text>
  </TouchableOpacity>
);

  return (
    <View style={styles.Viewcontainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton onPress={() => navigation.goBack()} />   
          <Text style={styles.centeredText}>Danh sách thiết bị</Text>
        </View>
        <FlatList
            vertical showsVerticalScrollIndicator={false} 
            numColumns={1} data={DeviceList} renderItem={renderDeviceList} keyExtractor={(item) => `${item.id}`} />
      </View>
      <View>      
          <NavigationBar onPressButton={handlePressButton} type = "application"/> 
      </View>
    </View>
  );
}
