
import React, { useLayoutEffect, useEffect, useState } from "react";
import { FlatList, Text, View, Image } from "react-native";
import styles from "./styles";
import { findDevicesInAType, getAllSensor, updateDeviceStatus } from "../../data/MockDataAPI";
import NavigationBar from "../../components/NaviBar/navibar";
import Toggle from "../../components/Toggle/Toggle";
import BackButton from "../../components/BackButton/BackButton";

import {ref,  get, set,  onValue} from 'firebase/database';
import { db } from '../../components/ConfigDatabase/firebaseConfig';

export default function DevicesScreen(props) {
  const { navigation, route } = props;
  const email = route?.params?.email;
  const device = route?.params?.deviceName;
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

 const [devices, setDevices] = useState([]);
 const [status, setStatus] = useState('|||#');
 const [device1Status, setDevice1Status] = useState('Off');
 const [device2Status, setDevice2Status] = useState('Off');

 useEffect(() => {
  const fetchData = async () => {
    try {
      let fetchedDevices = null;
      if (device === 'Sensor') {
        fetchedDevices = await getAllSensor();
      } else {
        fetchedDevices = await findDevicesInAType(device);

        const deviceRef = ref(db, `Home/status`);

        const handleDeviceChange = (snapshot) => {
          if (snapshot.exists()) {
            setStatus(snapshot.val());
            if(device == 'Fan'){
              setDevice1Status(snapshot.val()[2]=='1'?'On':'Off');
              setDevice2Status(snapshot.val()[6]=='1'?'On':'Off');
            }
            else {
              setDevice1Status(snapshot.val()[0]=='1'?'On':'Off');
              setDevice2Status(snapshot.val()[4]=='1'?'On':'Off');
            }
          } else {
            setDevice1Status(null);
            setDevice2Status(null); // hoặc giá trị mặc định nếu không có dữ liệu
          }
        };

        const unsubscribeDevice = onValue(deviceRef, handleDeviceChange);
        setDevices(fetchedDevices); // Update trạng thái devices sau khi fetch dữ liệu
        // Cleanup subscription on unmount
        return () => {
          unsubscribeDevice();
        };
      }
      setDevices(fetchedDevices); // Update trạng thái devices sau khi fetch dữ liệu
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
  };

  fetchData(); // Call the function to fetch data on component mount
}, []); // Empty dependency array ensures fetchData runs only once
const replaceAt = (str, index, replacement) => {
  return str.substring(0, index) + replacement + str.substring(index + 1);
}

async function handleToggleChange(item)  {  
  try {
    if(item.id=="LED01"){
      if(device1Status==undefined){
        throw new Error('device1Status is undefined');
      }
      await set(ref(db, `Home/status`),replaceAt(status,0, device1Status=='On'?'0':'1'));
      //setDevice1Status(device1Status=='On'?'Off':'On');
    }
    else if(item.id=="LED02"){
      if(device2Status==undefined){
        throw new Error('device2Status is undefined');
      }
      await set(ref(db, `Home/status`),replaceAt(status, 4, device2Status=='On'?0:1));
     // setDevice2Status(device2Status=='On'?'Off':'On');
    }
    else if(item.id=="FAN01"){
      if(device1Status==undefined){
        throw new Error('device1Status is undefined');
      }
      await set(ref(db, `Home/status`),replaceAt(status, 2, device1Status=='On'?0:1));
      //setDevice1Status(device1Status=='On'?'Off':'On');
    }
    else if(item.id=="FAN02"){
      if(device1Status==undefined){
        throw new Error('device2Status is undefined');
      }
      await set(ref(db, `Home/status`),replaceAt(status, 6, device2Status=='On'?0:1));
      //setDevice2Status(device2Status=='On'?'Off':'On');
    }
  } catch (error) {
    console.error('Error updating device status:', error.message);
  }
};

const updateItemFE = (itemId, newStatus) => {
  const newData = devices.map(item => {
    if (item.id === itemId) {
      return { ...item, status: newStatus };  // Cập nhật name của item
    }
    return item;
  });
  setDevices(newData);
};


const renderDevice = ({ item }) => {
  let imageSource;

  switch (device) {
    case 'Fan':
      imageSource = require('../../../assets/fan.png');
      break;
    case 'Sensor':
      if(item.id.includes("HUMI") )
        imageSource = require('../../../assets/sensor_humi_temp.png');
      if(item.id.includes("TEMP") )
        imageSource = require('../../../assets/sensor_humi_temp.png');
      if(item.id.includes("LIGHT") )
        imageSource = require('../../../assets/sensor_light.png');
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
        status={item.id.includes("01")?device1Status:device2Status} 
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
        <Text style={styles.subHeader}>{device == 'Sensor'? "Cảm biến" : device == 'Fan'? "Quạt" : "Đèn"} </Text>
        <FlatList
            vertical showsVerticalScrollIndicator={false} 
            numColumns={2} data={devices} renderItem={renderDevice} keyExtractor={(item) => `${item.id}`} />
      </View>
      <View>      
          <NavigationBar onPressButton={handlePressButton} type = "application"/> 
      </View>
    </View>
  );
}
