
import React, { useLayoutEffect, useEffect, useState } from "react";
import { FlatList, Text, View, Image } from "react-native";
import styles from "./styles";
import { findDevice } from "../../data/MockDataAPI";
import NavigationBar from "../../components/NaviBar/navibar";
import Toggle from "../../components/Toggle/Toggle";
import BackButton from "../../components/BackButton/BackButton";

import {ref,  get, set,  onValue} from 'firebase/database';
import { db } from '../../components/ConfigDatabase/firebaseConfig';

export default function VoiceDevicesScreen(props) {
  const { navigation, route } = props;
  const email = route?.params?.email;
  const device = route?.params?.device;

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

 const [voiceItem, setvoiceItem] = useState([]);
 const [deviceStatus, setDeviceStatus] = useState('Off');
 const [status, setStatus] = useState('|||#');

 useEffect(() => {
  const fetchData = async () => {
    try {
      let fetchedDevices = null;
      fetchedDevices = await findDevice(device);
      let location = device.includes('01')?'LivingRoom':'BedRoom';
      

      const deviceRef = ref(db, `Home/status`);

      const handleDeviceChange = (snapshot) => {
        setStatus(snapshot.val());
        if (snapshot.exists()) {
          if(device=="LED01"){
            setDeviceStatus(snapshot.val()[0]=='1'?'On':'Off');
          }
          else if(device=="LED02"){
            setDeviceStatus(snapshot.val()[4]=='1'?'On':'Off');
          }
          else if(device=="FAN01"){
            setDeviceStatus(snapshot.val()[2]=='1'?'On':'Off');
          }
          else if(device=="FAN02"){
            setDeviceStatus(snapshot.val()[6]=='1'?'On':'Off');
          } 
        } else {
          setDeviceStatus(null);
        }
      };

      const unsubscribeDevice = onValue(deviceRef, handleDeviceChange);
      setvoiceItem(fetchedDevices); // Update trạng thái devices sau khi fetch dữ liệu
      // Cleanup subscription on unmount
      return () => {
        unsubscribeDevice();
      };
    } catch (error) {
      console.error('Error fetching device:', error);
    }
  };

  fetchData(); // Call the function to fetch data on component mount
}, []); // Empty dependency array ensures fetchData runs only once

const replaceAt = (str, index, replacement) => {
  return str.substring(0, index) + replacement + str.substring(index + 1);
}
async function handleToggleChange(id)  {  
  try {
    if (deviceStatus === undefined) {
      throw new Error('device1Status is undefined');
    }
    let location = device.includes('01')?'LivingRoom':'BedRoom';
    if(device=='LED01') await set(ref(db, `Home/status`),replaceAt(status,0, deviceStatus=='On'?'0':'1'));
    else if(device=='FAN01') await set(ref(db, `Home/status`),replaceAt(status,2, deviceStatus=='On'?'0':'1'));
    else if(device=='LED02') await set(ref(db, `Home/status`),replaceAt(status,4, deviceStatus=='On'?'0':'1'));
    else if(device=='FAN02') await set(ref(db, `Home/status`),replaceAt(status,6, deviceStatus=='On'?'0':'1'));
    //setDeviceStatus(deviceStatus=='On'?'Off':'On');
  } catch (error) {
    console.error('Error updating device status:', error.message);
  }
};



const renderDevice = ({ item }) => {
  let imageSource;
  let type = item.id?.includes("FAN") ? "FAN" :  "LED";
  switch (type) {
    case 'FAN':
      imageSource = require('../../../assets/fan.png');
      break;
    default:
      imageSource = require('../../../assets/lightbulb.png'); // Default image for other devices
  }

  return (
    <View style={styles.ItemContainer}>
      <Image source={imageSource} style={styles.itemImage} />
      <View style={styles.nameDevice}>
        <Text style={styles.Text}>{item.id}</Text>
      </View>
      <Text style={styles.Text}>{item.location == 'Living Room'? 'Phòng khách':'Phòng ngủ'}</Text>
      {device !== 'Sensor' && ( // Conditional rendering based on item.id
      <Toggle
        status={deviceStatus} 
        onPress={() => handleToggleChange(item)}
      />
      )}
    </View>
  );
};


  return (
    <View style={styles.Viewcontainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton onPress={() => navigation.goBack()} />   
          <Text style={styles.centeredText}>Thiết bị</Text>
        </View>
        <FlatList
           style={styles.itemList}
            vertical showsVerticalScrollIndicator={false} 
            numColumns={2} data={voiceItem} renderItem={renderDevice} keyExtractor={(item) => `${item.id}`} />
      </View>
      <View>      
          <NavigationBar onPressButton={handlePressButton} type = "application"/> 
      </View>
    </View>
  );
}
