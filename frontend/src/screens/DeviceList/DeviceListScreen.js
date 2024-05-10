
import React, { useLayoutEffect, useRef, useState } from "react";
import { FlatList, Text, View, TouchableOpacity} from "react-native";
import styles from "./styles";
import NavigationBar from "../../components/NaviBar/navibar";
import Icon from 'react-native-vector-icons/FontAwesome5';
import BackButton from "../../components/BackButton/BackButton";

export default function DeviceListScreen(props) {
  const { navigation, route } = props;
  const email = route?.params?.email;
  
  const DeviceList= [
    {
      id: 0,
      name: 'Fan',
      icon: 'fan',
    },
    {
      id: 1,
      name: 'Sensor',
      icon: 'temperature-high',
    },
    {
      id: 2,
      name: 'Led',
      icon: 'lightbulb',
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
    <Icon style={styles.logo} name={item.icon} size={30} color={'#000'} />
    <Text style={styles.text}>{item.name}</Text>
  </TouchableOpacity>
);

  return (
    <View style={styles.Viewcontainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton onPress={() => navigation.goBack()} />   
          <Text style={styles.centeredText}>Devices</Text>
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
