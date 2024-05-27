
import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { FlatList, Text, View, Animated, TextInput, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import NavigationBar from "../../components/NaviBar/navibar";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Toggle from "../../components/Toggle/Toggle";
import { getALLdevicesandSensor, updateDeviceStatus} from "../../data/MockDataAPI"; 

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
        const data = fetchedDevices;
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
  await updateDeviceStatus(item.id, item.location, item.status == "On" ? "Off" : "On");
  await updateItemFE(item.id, item.status == "On" ? "Off" : "On");
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

  // Determine image based on device type (excluding HUMI devices)
  if (includes(item.id, "FAN")) {
    imageSource = require('../../../assets/fan.png');
  } else if (includes(item.id, "TEMP") || includes(item.id, "HUMI")) {
    imageSource = require('../../../assets/sensor_humi_temp.png');
  } else if (includes(item.id, "LIGHT")) {
    imageSource = require('../../../assets/sensor_light.png');
  } else if (includes(item.id, "LED")) {
    imageSource = require('../../../assets/lightbulb.png');
  }

  // Conditionally render the Toggle component
  const renderToggle = !includes(item.id, "HUMI") && !includes(item.id, "TEMP") &&!includes(item.id, "LIGHT") &&(
    <Toggle status={item.status} onPress={() => handleToggleChange(item)} />
  );

  return (
    <View style={styles.ItemContainer}>
      <Image source={imageSource} style={styles.itemImage} />
      <View style={styles.nameDevice}>
        <Text style={styles.Text}>{item.id}</Text>
      </View>
      <Text style={styles.Text}>{item.location == 'Living Room'? 'Phòng khách':'Phòng ngủ'}</Text>
      {renderToggle}
    </View>
  );
};


function convertPhrase(phrase) {
  // Remove spaces
  const noSpacesPhrase = phrase.replace(/\s/g, '');

  // Remove diacritics (accents)
  const normalizedPhrase = noSpacesPhrase.normalize('NFD').replace(/[\u0300-\u036F]/g, '');

  // Convert to lowercase
  return normalizedPhrase;
}

const handleSearch = (item) => {
  const lowerCaseInput = item.toLowerCase(); // Convert input to lowercase for case-insensitive search
  const results = Devices.filter((element) => {
    const lowerCaseId = element.id.toLowerCase();
    // Use regular expressions for flexible substring matching
    const idMatch = lowerCaseId.search(new RegExp(lowerCaseInput, 'gi')) !== -1;
    const input = convertPhrase(lowerCaseInput)
    if("phong".includes(input)) return 1;
    if("phongkhach".includes(input)&& element.location === 'Living Room') return 1;
    if("phongngu".includes(input) && element.location === 'BedRoom') return 1;

    return idMatch; // Include element if location or id matches
  });

  setDataForFlatList(results);
  setCount(results.length);
};

  return (
    <View style={styles.Viewcontainer}>
      <Text style={styles.centeredText}>Tìm kiếm</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder=" tìm ..... "
          onChangeText={(text) => setValue(text)}
          value={value}
        />
        <TouchableOpacity onPress={() => handleSearch(value)}>
          <Icon name="search" size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.numTopicContainer}>
          <Text style={styles.numTopic}>{count} kết quả</Text>
      </View>

      <FlatList
            vertical showsVerticalScrollIndicator={false} 
            numColumns={2} data={dataForFlatList} renderItem={renderDevice} keyExtractor={(item) => `${item.id}`} />

      <NavigationBar onPressButton={handlePressButton} type='search'/>
    </View>
  );
}
