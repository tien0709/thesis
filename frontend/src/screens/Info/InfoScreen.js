import React, { useLayoutEffect, useState, useEffect } from "react";
import { Text, View,  Image, TouchableOpacity, Linking } from "react-native";
import styles from "./styles";
import NavigationBar from "../../components/NaviBar/navibar";
import { getInfoByEmail  } from "../../data/MockDataAPI"; 


export default function InfoScreen(props) {
  const { navigation, route} = props;
  const email = route?.params?.email;
  const [info, setInfo] = useState({  
    account: '',
    pw: '',
    email: '',
    name: '',
    phone: '',
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: "true",
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedInfo = await getInfoByEmail(email); // Fetch datas
        setInfo(fetchedInfo.user); // Update rooms state
      } catch (error) {
        console.error('Error fetching info:', error);
      }
    };
 
    fetchData(); // Call the function to fetch data on component mount
  }, [email]); // Empty dependency array ensures fetchData runs only once


  const handlePressButton = (buttonName) => {
    if(buttonName === 'Home'){
      navigation.navigate("Home",{email});
    }
    else if(buttonName === 'Discovery'){
      navigation.navigate("Discovery", {email});
    }
    else if(buttonName === 'Login'){
      navigation.navigate("Login");
    }
    else if(buttonName === 'Function'){
     navigation.navigate("Function",{email});
    }
    else if(buttonName === 'Info'){
      navigation.navigate("Info", {email});
    }

    else if(buttonName === 'ChangeInfo'){
      navigation.navigate("ChangeInfo", {email});
    }
    else if(buttonName === 'Micro'){
      navigation.navigate("Voice", {email});
    }
  };
  const goToFace = () => {
    // Mở liên kết Facebook trong trình duyệt khi nút được nhấn
    Linking.openURL('https://www.facebook.com/pttien0709/');
  };

  const logOut = () => {
    navigation.reset({
      index: 0,
      routes: [{ 
        name: 'Login',
      }],
    });
  };


  return (
    <View style={styles.Viewcontainer}>
      <View style={styles.container}>
          <View style={styles.infoContainer}>
                <View style={styles.user}>
                    <Image source={require("../../../assets/HomeImage.png")} style={styles.userImage} />
                    <Text style={styles.text}>{info.name}</Text>
                </View>
                <View style={styles.info}>
                  <View style={styles.headerContainer}>
                    <Text style={styles.header}>Information</Text>
                  </View>
                  <View style={styles.emailContainer}>
                    <Text style={styles.email}>Email</Text>
                    <Text style={styles.subText}>{info.email}</Text>
                  </View>
                  <View style={styles.phoneNumberContainer}>
                    <Text style={styles.phoneNumber}>Phone Number</Text>
                    <Text style={styles.subText}>+ {info.phone}</Text>
                  </View>
                </View>
          </View>
          <View style={styles.groupButtonContainer}>
            <TouchableOpacity style={styles.naviButton} onPress={() => handlePressButton('ChangeInfo')}>
              <Text style={styles.buttonText}>Change Information</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.naviButton} onPress={goToFace}>
              <Text style={styles.buttonText}>Contact Us</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.naviButton} onPress={logOut}>
              <Text style={styles.buttonText}>Log out</Text>
            </TouchableOpacity>
          </View>
      </View>
      <NavigationBar onPressButton={handlePressButton} type = 'user'/>
    </View>
  );
}

