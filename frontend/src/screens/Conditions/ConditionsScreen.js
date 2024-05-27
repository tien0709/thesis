import React, { useLayoutEffect, useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "./styles";
import { findLastElementWithLocation } from "../../data/MockDataAPI"; 

import NavigationBar from "../../components/NaviBar/navibar";
import BackButton from "../../components/BackButton/BackButton";
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from "react-native-gesture-handler";

import { ref, onValue } from 'firebase/database';
import { db } from '../../components/ConfigDatabase/firebaseConfig';

export default function ConditionsScreen(props) {
  const { navigation, route } = props;
  const email = route?.params?.email;
  const location = route?.params?.location;
  const subject = route?.params?.subject;  
  const name = route?.params?.name;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitleStyle: { opacity: 0 },
    });
  }, [navigation]);

  const handlePressButton = (buttonName) => {
    if (buttonName === 'Discovery') {
      navigation.navigate("Discovery", { email });
    } else if (buttonName === 'Home') {
      navigation.navigate("Home", { email });
    } else if (buttonName === 'Function') {
      navigation.navigate("Function", { email });
    } else if (buttonName === 'Info') {
      navigation.navigate("Info", { email });
    } else if (buttonName === 'Micro') {
      navigation.navigate("Voice", { email });
    }
  }

  const [temperature, setTemperature] = useState(0);
  const [humi, setHumi] = useState(0);
  const [light, setLight] = useState(0);
  const getChuoiCon = (str, i) => {
    while(i--){
        const indexHash = str.indexOf('|');
        if (indexHash === -1) {
          return str; // Nếu không có ký tự #, trả về toàn bộ chuỗi
        } else {
          str =  str.slice(indexHash+1); // Cắt chuỗi con từ đầu đến vị trí trước ký tự #
        }
    }
    const indexHash = str.indexOf('#');
    return str.slice(0, indexHash);
  }

  useEffect(() => {
    const sensorRef = ref(db, `Home/sensor`);// do lam moi livingroom co sensor 

    const handleChange = (snapshot) => {
        if(snapshot.exists()){
          setHumi(parseInt(getChuoiCon(snapshot.val(),0)));
          setTemperature(parseInt(getChuoiCon(snapshot.val(),1)));
          setLight(parseInt(getChuoiCon(snapshot.val(),2)));  
        }
        else {
          setHumi(null);
          setTemperature(null);
          setLight(null);
        }
    };



    const unsubscribe= onValue(sensorRef, handleChange);

    return () => {
      unsubscribe();
    };
  }, []);

  
  return (
    <View style={styles.Viewcontainer}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <BackButton onPress={() => navigation.goBack()} />
          <Text style={styles.centeredText}>Điều kiện</Text>
        </View>
        <Text style={styles.subHeader}>{name}</Text>
        <View style={styles.ItemContainer}>
          <View style={styles.name}>
            <Text style={styles.Text}>Nhiệt độ</Text>
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
                  colors={['#0066FF', '#25A4FF']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.button}
                >
                  <Text>Quạt</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}>
                <LinearGradient
                  colors={['#C4C4C4', '#C4C4C4']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.buttonEmpty}
                >
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.ItemContainer}>
          <View style={styles.name}>
            <Text style={styles.Text}>Độ ẩm</Text>
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
                  colors={['#0066FF', '#25A4FF']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.button}
                >
                  <Text>Quạt</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer} 
                onPress={() => navigation.navigate('Devices', { deviceName: 'Led', location: location, email })}
              >
                <LinearGradient
                  colors={['#0066FF', '#25A4FF']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.button}
                >
                  <Text>Đèn</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.ItemContainer}>
          <View style={styles.name}>
            <Text style={styles.Text}>Ánh sáng</Text>
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
                  colors={['#0066FF', '#25A4FF']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.button}
                >
                  <Text>Đèn</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}>
                <LinearGradient
                  colors={['#C4C4C4', '#C4C4C4']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.buttonEmpty}
                >
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <View>
        <NavigationBar onPressButton={handlePressButton} type="application" />
      </View>
    </View>
  );
}
