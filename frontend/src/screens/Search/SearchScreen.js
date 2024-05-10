
import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { FlatList, Text, View, Animated, TextInput, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import NavigationBar from "../../components/NaviBar/navibar";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Toggle from "../../components/Toggle/Toggle";
import { getALLdevicesandSensor, updateItemStatus } from "../../data/MockDataAPI"; 

export default function SearchScreen(props) {
  const { navigation, route } = props;
  const email = route?.params?.email;
  const [Devices, setDevices] = useState([]); // Initialize rooms state as an empty array
  const [dataForFlatList, setDataForFlatList] = useState([]);
  const [count, setCount] = useState(Devices.length);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [value, setValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedDevices = await getALLdevicesandSensor(); // Fetch datas
        const data = fetchedDevices.devices;
        setDevices(data); // Update rooms state
        setDataForFlatList(data);
        setCount(data.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
 
    fetchData(); // Call the function to fetch data on component mount
  }, []); // Empty dependency array ensures fetchData runs only once

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitleStyle: { opacity: 0 },
    });
  }, [navigation]);

  const handlePressButton = (buttonName) => {
    if(buttonName === 'Home'){
      navigation.navigate("Home", {email});
    }
    if(buttonName === 'Discovery'){
       navigation.navigate("Discovery", {email});
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

 const includes = (str, subStr) => {
  return str.includes(subStr);
};

async function handleToggleChange(item)  {  
  await updateItemStatus(item._id, item.status == "On" ? "Off" : "On");
  await updateItemFE(item._id, item.status == "On" ? "Off" : "On");
};

const updateItemFE = (itemId, newStatus) => {
  const newData = dataForFlatList.map(item => {
    if (item._id === itemId) {
      return { ...item, status: newStatus };  // Cập nhật name của item
    }
    return item;
  });
  setDataForFlatList(newData);
};

 const renderDevice = ({ item }) => {
    let imageSource = require('../../../assets/icon.png');
    if(includes(item.deviceId, "FAN"))
      imageSource = require('../../../assets/fan.png');
    else if((item.deviceId).includes("HUMI") )
      imageSource = require('../../../assets/sensor_humi_temp.png');
    else if(item.deviceId.includes("TEMP") )
      imageSource = require('../../../assets/sensor_humi_temp.png');
    else if(item.deviceId.includes("LIGHT") )
      imageSource = require('../../../assets/sensor_light.png');
    else if(item.deviceId.includes("LED") )
      imageSource = require('../../../assets/lightbulb.png'); // Default image for other devices*/

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
  const handleSearch = (item) => {
    const results = [];
    Devices.forEach((element) => {
      if ( includes(element.location.toLowerCase(), item.toLowerCase())
          || includes(element.deviceId.toLowerCase(), item.toLowerCase())
      ) {
        results.push(element);
      }
    });
    setDataForFlatList(results);
    setCount(results.length);
  };

  return (
    <View style={styles.Viewcontainer}>
      <Text style={styles.centeredText}>Search</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder=" search ..... "
          onChangeText={(text) => setValue(text)}
          value={value}
        />
        <TouchableOpacity onPress={() => handleSearch(value)}>
          <Icon name="search" size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.numTopicContainer}>
          <Text style={styles.numTopic}>{count} Results</Text>
      </View>

      <FlatList
            vertical showsVerticalScrollIndicator={false} 
            numColumns={2} data={dataForFlatList} renderItem={renderDevice} keyExtractor={(item) => `${item._id}`} />

      <NavigationBar onPressButton={handlePressButton} type='search'/>
    </View>
  );
}
