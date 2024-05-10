
import React, { useLayoutEffect, useState, useEffect } from "react";
import { Text, View, TouchableOpacity, } from "react-native";
import styles from "./styles";
import { findLastElementWithLocation  } from "../../data/MockDataAPI"; 

import NavigationBar from "../../components/NaviBar/navibar";
import BackButton from "../../components/BackButton/BackButton";
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from "react-native-gesture-handler";


export default function ConditionsScreen(props) {
  const { navigation, route } = props;
  const email = route?.params?.email;
  const location = route?.params?.location;
  const subject = route?.params?.subject;

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
  }


 const [temperature, setTemperature] = useState(0);
 const [humi, setHumi] = useState(0);
 const [light, setLight] = useState(0);

 useEffect(() => {
  const fetchData = async () => {
    try {
      const fetchedTemp = await findLastElementWithLocation ('TEMP',location);
      const fetchedHumi = await findLastElementWithLocation ('HUMI',location);
      const fetchedLight = await findLastElementWithLocation ('LIGHT',location);
      const dataTemp = fetchedTemp.temperature;
      const dataHumi = fetchedHumi.humidity;
      const dataLight = fetchedLight.light;
      setTemperature(dataTemp); // Update rooms state
      setHumi(dataHumi); // Update rooms state
      setLight(dataLight); // Update rooms state
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  fetchData(); // Call the function to fetch data on component mount
}, [temperature, humi, light]); // Empty dependency array ensures fetchData runs only once


  return (
    <View style={styles.Viewcontainer}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <BackButton onPress={() => navigation.goBack()} />   
          <Text style={styles.centeredText}>{subject}</Text>
        </View>
        <Text style={styles.subHeader}>{location}</Text>
        <View style={styles.ItemContainer}>
          <View style={styles.name}>       
            <Text style={styles.Text}>Temperature</Text>
          </View>
          <View style={styles.sensor}>       
            <View style={styles.valueContainer}>
              <Text style={styles.value}>{temperature}</Text>
              <Text style={styles.unit}>°C</Text>
            </View>
            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.buttonContainer} 
                    onPress={() => navigation.navigate('Devices', { deviceName: 'Fan', location: location, email })}
              >      
                <LinearGradient
                  colors={['#0066FF', '#25A4FF']} // Mảng màu sắc dùng để tạo gradient
                  start={{ x: 0, y: 0 }} // Bắt đầu từ góc trái trên
                  end={{ x: 1, y: 0 }}   // Kết thúc ở góc phải trên
                  style={styles.button}
                >
                  <Text>Fan</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer} >      
                <LinearGradient
                  colors={['#C4C4C4', '#C4C4C4']} // Mảng màu sắc dùng để tạo gradient
                  start={{ x: 0, y: 0 }} // Bắt đầu từ góc trái trên
                  end={{ x: 1, y: 0 }}   // Kết thúc ở góc phải trên
                  style={styles.buttonEmpty}
                >
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.ItemContainer}>
          <View style={styles.name}>       
            <Text style={styles.Text}>Moisture</Text>
          </View>
          <View style={styles.sensor}>       
            <View style={styles.valueContainer}>
              <Text style={styles.value}>{humi}</Text>
              <Text style={styles.unit}>%</Text>
            </View>
            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.buttonContainer} 
                    onPress={() => navigation.navigate('Devices', { deviceName: 'Fan', location: location, email })}            
              >      
                <LinearGradient
                  colors={['#0066FF', '#25A4FF']} // Mảng màu sắc dùng để tạo gradient
                  start={{ x: 0, y: 0 }} // Bắt đầu từ góc trái trên
                  end={{ x: 1, y: 0 }}   // Kết thúc ở góc phải trên
                  style={styles.button}
                >
                  <Text>Fan</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer} 
                    onPress={() => navigation.navigate('Devices', { deviceName: 'Led', location: location, email })}
              >      
                <LinearGradient
                  colors={['#0066FF', '#25A4FF']} // Mảng màu sắc dùng để tạo gradient
                  start={{ x: 0, y: 0 }} // Bắt đầu từ góc trái trên
                  end={{ x: 1, y: 0 }}   // Kết thúc ở góc phải trên
                  style={styles.button}
                >
                  <Text>Led</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.ItemContainer}>
          <View style={styles.name}>       
            <Text style={styles.Text}>Light condition</Text>
          </View>
          <View style={styles.sensor}>       
            <View style={styles.valueContainer}>
              <Text style={styles.value}>{light}</Text>
              <Text style={styles.unit}>lx</Text>
            </View>
            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.buttonContainer} 
                        onPress={() => navigation.navigate('Devices', { deviceName: 'Led', location: location, email })}            
              >      
                <LinearGradient
                  colors={['#0066FF', '#25A4FF']} // Mảng màu sắc dùng để tạo gradient
                  start={{ x: 0, y: 0 }} // Bắt đầu từ góc trái trên
                  end={{ x: 1, y: 0 }}   // Kết thúc ở góc phải trên
                  style={styles.button}
                >
                  <Text>Led</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer} >      
                <LinearGradient
                  colors={['#C4C4C4', '#C4C4C4']} // Mảng màu sắc dùng để tạo gradient
                  start={{ x: 0, y: 0 }} // Bắt đầu từ góc trái trên
                  end={{ x: 1, y: 0 }}   // Kết thúc ở góc phải trên
                  style={styles.buttonEmpty}
                >
                </LinearGradient>
              </TouchableOpacity>
              
            </View>
          </View>
        </View>
      </ScrollView>
      <View>      
          <NavigationBar onPressButton={handlePressButton} type = "application"/> 
      </View>
    </View>
  );
}
