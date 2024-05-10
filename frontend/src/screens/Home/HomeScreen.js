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
import { faDroplet, faTemperatureThreeQuarters } from '@fortawesome/free-solid-svg-icons';
import { getLastestHumidity, getLastestTemperature, getLastestTemperatureStatus, getLastestHumiStatus,
updateHumidityStatus, updateTemperatureStatus} from '../../data/MockDataAPI';

export default function HomeScreen(props) {
  const { navigation, route } = props;
  const email = route?.params?.email;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: "true",
    });
  }, []);



  const [sliderValue, setSliderValue] = useState(50);
  const [sliderMainValue, setSliderMainValue] = useState(50);
  const [humidity, setHumidity] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [toggleHumiStatus, setToggleHumiStatus] = useState('Off');
  const [toggleTempStatus, setToggleTempStatus] = useState('Off');
  //các hàm set là các hàm bất đồng bộ nên nó sẽ không cập nhật ngay các giá trị
  useEffect(() => {
    const fetchData = async () => {
      try {
        const humidityData = await getLastestHumidity('HUMI_LIVINGROOM');
        setHumidity(humidityData.humidity);

        const temperatureData = await getLastestTemperature("TEMP_LIVINGROOM");
        setTemperature(temperatureData.temperature);

        const humiStatus = await getLastestHumiStatus("HUMI01");
        setToggleHumiStatus(humiStatus.status);

        const temperatureStatus= await getLastestTemperatureStatus("TEMP01");
        setToggleTempStatus(temperatureStatus.status);
      } catch (error) {
        // Xử lý lỗi nếu cần
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  async function handleToggleTempChange()  {
    setToggleTempStatus(toggleTempStatus == "On" ? "Off" : "On");
    // hàm set bất đồng bộ nên nó k cập nhật biên toggleTempStatus ngay lập tức nên ta không nên truyền biến này vô db
    //mà nên làm như sau
    await updateTemperatureStatus("TEMP01","Living Room", toggleTempStatus == "On" ? "Off" : "On");
  };
  

  async function handleToggleHumiChange()  {  
    setToggleHumiStatus(toggleHumiStatus == "On" ? "Off" : "On");
        // hàm set bất đồng bộ nên nó k cập nhật biên toggleHumiStatus ngay lập tức nên ta không nên truyền biến này vô db
    //mà nên làm như sau
    await updateHumidityStatus("HUMI01","Living Room", toggleHumiStatus == "On" ? "Off" : "On");
  };



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
                <View style={styles.humiContainer}>
                  <View style={styles.info}>
                    <Text style={styles.infoText}>{humidity} %</Text>
                    <FontAwesomeIcon icon={faDroplet} size={35} color="#4C4641" />
                  </View>
                  <View style={styles.name}>
                    <Text style={styles.nameText}>Humidifier Air</Text>
                  </View>
                  <View style={styles.button}>
                      <Toggle status={toggleHumiStatus}
                        onPress={()=>handleToggleHumiChange()}
                      />
                  </View>
                </View>
                <View style={styles.temperatureContainer}>
                  <View style={styles.info}>
                      <Text style={styles.infoText}>{temperature} °C</Text>
                      <FontAwesomeIcon icon={faTemperatureThreeQuarters} size={40} color="#4C4641" />
                  </View>
                  <View style={styles.name}>
                      <Text style={styles.nameText}>Temperature</Text>       
                  </View>
                  <View style={styles.button}>
                        <Toggle status={toggleTempStatus}
                        onPress={()=>handleToggleTempChange()}
                        />
                  </View>
                </View>
            </View>
            <View style={styles.deviceInformationContainer}>
              <Text style={styles.deviceInformationText}>Main light</Text>
              <View style={styles.sliderMainLight}>
                <Slider 
                  value={sliderMainValue}
                  onValueChange={(value) => setSliderMainValue(value)}
                  minimumValue={0}
                  maximumValue={100}
                  minimumTrackTintColor="#FFB267" // Màu dải tiến trình khi trượt từ trái sang phải
                  maximumTrackTintColor="#393637" // Màu dải tiến trình khi trượt từ phải sang trái
                  thumbStyle={styles.thumbStyle}
                  style={styles.slider}></Slider>
                <Icon style={styles.logo} name="superpowers" size={25} color="#000" />
              </View>
              <Text style={styles.deviceInformationText}>Other light</Text>
              <View style={styles.sliderLight}>
                <Slider 
                  value={sliderValue}
                  onValueChange={(value) => setSliderValue(value)}
                  minimumValue={0}
                  maximumValue={100}
                  minimumTrackTintColor="#FFB267" // Màu dải tiến trình khi trượt từ trái sang phải
                  maximumTrackTintColor="#393637" // Màu dải tiến trình khi trượt từ phải sang trái
                  thumbStyle={styles.thumbStyle}
                  style={styles.slider}></Slider>
                <Icon style={styles.logo} name="lightbulb" size={25} color="#000" />
              </View>
            </View>
          </View>
          <View>      
              <NavigationBar onPressButton={handlePressButton} type = "home"/> 
          </View>
    </View>


  );
}
