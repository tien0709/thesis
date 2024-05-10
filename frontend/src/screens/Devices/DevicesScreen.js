
import React, { useLayoutEffect, useEffect, useState } from "react";
import { FlatList, Text, View, Image } from "react-native";
import styles from "./styles";
import { findDevices, updateItemStatus } from "../../data/MockDataAPI";
import NavigationBar from "../../components/NaviBar/navibar";
import Toggle from "../../components/Toggle/Toggle";
import BackButton from "../../components/BackButton/BackButton";

export default function DevicesScreen(props) {
  const { navigation, route } = props;
  const email = route?.params?.email;
  const device = route?.params?.deviceName;
  const location = route?.params?.location;

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

 useEffect(() => {
  const fetchData = async () => {
    try {
      const fetchedDevices = await findDevices (device, location);
      const dataDevices = fetchedDevices.devices;
      setDevices(dataDevices); // Update 
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
  };

  fetchData(); // Call the function to fetch data on component mount
}, []); // Empty dependency array ensures fetchData runs only once

async function handleToggleChange(item)  {  
  await updateItemStatus(item._id, item.status == "On" ? "Off" : "On");
  await updateItemFE(item._id, item.status == "On" ? "Off" : "On");
};

const updateItemFE = (itemId, newStatus) => {
  const newData = devices.map(item => {
    if (item._id === itemId) {
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
      if(item.deviceId.includes("HUMI") )
        imageSource = require('../../../assets/sensor_humi_temp.png');
      if(item.deviceId.includes("TEMP") )
        imageSource = require('../../../assets/sensor_humi_temp.png');
      if(item.deviceId.includes("LIGHT") )
        imageSource = require('../../../assets/sensor_light.png');
      break;
    default:
      imageSource = require('../../../assets/lightbulb.png'); // Default image for other devices
  }

  return (
    <View style={styles.ItemContainer}>
      <Image source={imageSource} style={styles.itemImage} />
      <View style={styles.nameDevice}>
        <Text style={styles.Text}>{item.deviceId}</Text>
      </View>
      <Text style={styles.Text}>{item.location}</Text>
      <Toggle status={item.status} 
              onPress={()=>handleToggleChange(item)}
      />
    </View>
  );
};


  return (
    <View style={styles.Viewcontainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton onPress={() => navigation.goBack()} />   
          <Text style={styles.centeredText}>Devices</Text>
        </View>
        <Text style={styles.subHeader}>{device}  {location}</Text>
        <FlatList
            vertical showsVerticalScrollIndicator={false} 
            numColumns={2} data={devices} renderItem={renderDevice} keyExtractor={(item) => `${item._id}`} />
      </View>
      <View>      
          <NavigationBar onPressButton={handlePressButton} type = "application"/> 
      </View>
    </View>
  );
}
