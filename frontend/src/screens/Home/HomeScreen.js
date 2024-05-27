import React, { useLayoutEffect, useState, useEffect } from "react";
import { Text, View, Image} from "react-native";
import styles from "./styles";
import NavigationBar from "../../components/NaviBar/navibar";
import BellIcon from "../../components/Bell/Bell";
import Micro from "../../components/Micro/Micro";
import Toggle from "../../components/Toggle/Toggle";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Slider } from "react-native-elements";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDroplet, faTemperatureThreeQuarters, faFan, faWifi, faLightbulb, faSun} from '@fortawesome/free-solid-svg-icons';
import {ref,  onValue, set} from 'firebase/database';
import { db } from '../../components/ConfigDatabase/firebaseConfig';

export default function HomeScreen(props) {
  const { navigation, route } = props;
  const email = route?.params?.email;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: "true",
    });
  }, []);




  const [humidity, setHumidity] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [light, setLight] = useState(0);
  const [toggleFanStatus, setToggleFanStatus] = useState('Off');
  const [toggleLedStatus, setToggleLedStatus] = useState('Off');
  const [status, setStatus] = useState('|||#');
  const [statusDevice, setStatusDevice] = useState('|||#');
  //các hàm set là các hàm bất đồng bộ nên nó sẽ không cập nhật ngay các giá trị
  useEffect(() => {
    const sensorRef = ref(db, 'Home/sensor');
    const deviceRef = ref(db, 'Home/status');
    const  getChuoiCon = (str, i) => {
      let newString = str.slice(0, -1);
      while(i--){
          const indexHash = newString.indexOf('|');
          if (indexHash === -1) {
            return newString; // Nếu không có ký tự #, trả về toàn bộ chuỗi
          } else {
            newString =  newString.slice(indexHash+1); // Cắt chuỗi con từ đầu đến vị trí trước ký tự #
          }
      }
      const indexHash = newString.indexOf('|');
      return newString.slice(0, indexHash);
    }
    
    const handleSensorChange = (snapshot) => {
      if(snapshot.exists()){
        setHumidity(parseInt(getChuoiCon(snapshot.val(),0)));
        setTemperature(parseInt(getChuoiCon(snapshot.val(),1)));
        setLight(parseInt(getChuoiCon(snapshot.val(),2)));
        setStatus(snapshot.val());
        
      }
      else {
        setHumidity(null);
        setTemperature(null);
        setLight(null);
      }
    };

    const handleDeviceChange = (snapshot) => {
      if(snapshot.exists()){
        setStatusDevice(snapshot.val()); // snapshot
        setToggleFanStatus(parseInt(getChuoiCon(snapshot.val(),1))?'On':'Off');
        setToggleLedStatus(parseInt(getChuoiCon(snapshot.val(),0))?'On':'Off');        
      }
      else {
        setToggleFanStatus('Off');
        setToggleLedStatus('Off');
      }
    };


    const unsubcribeSensor = onValue(sensorRef, handleSensorChange);
    const unsubcribeDevice= onValue(deviceRef, handleDeviceChange);

    // Cleanup subscription on unmount
    return () => {
      unsubcribeSensor();
      unsubcribeDevice();
    };
  }, []);




  const handlePressButton = (buttonName) => {
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
  const replaceAt = (str, index, replacement) => {
    return str.substring(0, index) + replacement + str.substring(index + 1);
  }
  async function handleToggleLedChange(item)  {  
    try {
       
        await set(ref(db, `Home/status`),replaceAt(statusDevice,0, toggleLedStatus=='On'?'0':'1'));
        //setDevice1Status(device1Status=='On'?'Off':'On');
    } catch (error) {
      console.error('Error updating Led status:', error.message);
    }
  };

  async function handleToggleFanChange(item)  {  
    try {
       
        await set(ref(db, `Home/status`),replaceAt(statusDevice,2, toggleFanStatus=='On'?'0':'1'));
        //setDevice1Status(device1Status=='On'?'Off':'On');
    } catch (error) {
      console.error('Error updating Fan status:', error.message);
    }
  };

  return (
    <View style={styles.Viewcontainer}>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.centeredText}>Smarthome</Text>
                <View style={styles.bellIconContainer}>
                    <BellIcon onPress={() => navigation.navigate("SystemLog", {email})}/>
                </View>
            </View>
            <View style={styles.bodyImageContainer}>
            <Image source={require("../../../assets/HomeImage.png")} style={styles.bodyImage} />
            </View>
            <View style={styles.sensorInformationContainer}>
              <View style={styles.conditionContainer}>
                  <View style={styles.iconStatus}>
                    <FontAwesomeIcon icon={faDroplet} size={30} color="#2B78E4" />
                  </View>
                  <View style={styles.infoStatus}>
                    <Text style={styles.nameText}>Độ ẩm</Text>
                    <Text style={styles.infoText}>{humidity} %</Text>
                  </View>
              </View>
              <View style={styles.conditionContainer}>
                  <View style={styles.iconStatus}>
                      <FontAwesomeIcon icon={faTemperatureThreeQuarters} size={30} color="#FFB267" />
                  </View>
                  <View style={styles.infoStatus}>
                      <Text style={styles.nameText}>Nhiệt độ</Text>  
                      <Text style={styles.infoText}>{temperature} °C</Text>     
                  </View>
              </View>
              <View style={styles.conditionContainer}>
                  <View style={styles.iconStatus}>
                      <FontAwesomeIcon icon={faSun} size={30} color="#FFFF00" />
                  </View>
                  <View style={styles.infoStatusLight}>
                      <Text style={styles.nameText}>Ánh sáng</Text>  
                      <Text style={styles.infoText}>
                        {light} lux
                      </Text>     
                  </View>
              </View>
            </View>
            <View style={styles.deviceInformationContainer}>
                <View style={styles.fanContainer}>
                  <View style={styles.iconGroup}>
                    <FontAwesomeIcon icon={faFan} size={25} color="#fff" />
                    <FontAwesomeIcon icon={faWifi} size={25} color="#fff" />
                  </View>
                  <View style={styles.name}>
                    <Text style={styles.nameBoldText}>Quạt</Text>
                    <Text style={styles.nameText}>Phòng khách</Text>
                  </View>
                  <View style={styles.button}>
                        <Toggle status={toggleFanStatus}
                        onPress={()=>handleToggleFanChange()}
                        />
                  </View>
                </View>
                <View style={styles.ledContainer}>  
                  <View style={styles.iconGroup}>
                    <FontAwesomeIcon icon={faLightbulb} size={25} color="#000" />
                  </View>
                  <View style={styles.name}>
                    <Text style={styles.nameBoldTextLed}>Đèn</Text>
                    <Text style={styles.nameText}>Phòng khách</Text>
                  </View>
                  <View style={styles.button}>
                        <Toggle status={toggleLedStatus}
                        onPress={()=>handleToggleLedChange()}
                        />
                  </View>
                </View>
            </View>
          </View>
          <View>      
              <NavigationBar onPressButton={handlePressButton} type = "home"/> 
          </View>
    </View>


  );
}
