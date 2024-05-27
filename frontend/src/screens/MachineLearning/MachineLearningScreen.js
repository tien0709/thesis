
import React, { useLayoutEffect, useState, useEffect } from "react";
import {  Text, View,  Image,TouchableOpacity, ImageBackground } from "react-native";
import styles from "./styles";
import NavigationBar from "../../components/NaviBar/navibar";
import Toggle from "../../components/Toggle/Toggle";
import BackButton from "../../components/BackButton/BackButton";
import { db } from '../../components/ConfigDatabase/firebaseConfig';
import {ref,  onValue, set} from 'firebase/database';
export default function MLScreen(props) {
  const { navigation, route } = props;
  const email = route?.params?.email;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitleStyle: { opacity: 0 },
    });
  }, [navigation]);

  const [automation, setAutomation] = useState(0);

  useEffect(() => {
    const automationRef = ref(db, 'Home/automation');
    
    const handleAutomationChange = (snapshot) => {
      if(snapshot.exists()){
        setAutomation(snapshot.val());
      }
      else {
        setAutomation(0);
      }
    };


    const unsubcribeAutomation = onValue(automationRef, handleAutomationChange);

    // Cleanup subscription on unmount
    return () => {
        unsubcribeAutomation ();
    };
  }, []);

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

  async function handleToggleChange()  {  
    try {
       
        await set(ref(db, `Home/automation`), automation?0:1);
        //setDevice1Status(device1Status=='On'?'Off':'On');
    } catch (error) {
      console.error('Error updating automation status:', error.message);
    }
  };

  return (
    <View style={styles.Viewcontainer}>
        <View style={styles.container}>
            <View style={styles.header}>
            <BackButton onPress={() => navigation.goBack()} />   
            <Text style={styles.centeredText}>Tự động điều khiển</Text>
            </View>
            <View style={styles.bodyImageContainer}>
                <Image source={require("../../../assets/Robot.png")} style={styles.bodyImage} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.Text}>Kích hoạt chế độ tự động điều khiển ?</Text>
                <Text style={styles.textMini}>chức năng chỉ có hiệu quả sau 1 tháng sử dụng hệ thống</Text>
            </View>
            <View style={styles.button}>
                        <Toggle status={automation?'On':'Off'}
                        onPress={()=>handleToggleChange()} size = {'large'} 
                        />
            </View>
        </View>
      <View>      
          <NavigationBar onPressButton={handlePressButton} type = "application"/> 
      </View>
    </View>
  );
}
