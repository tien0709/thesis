
import React, { useLayoutEffect, useState, useEffect } from "react";
import { FlatList, Text, View, TouchableOpacity, ImageBackground } from "react-native";
import styles from "./styles";
import { getRooms  } from "../../data/MockDataAPI"; 
import NavigationBar from "../../components/NaviBar/navibar";
import BackButton from "../../components/BackButton/BackButton";

export default function RoomsScreen(props) {
  const { navigation, route } = props;
  const email = route?.params?.email;
  const subject = route?.params?.subject;

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

 const [Rooms, setRooms] = useState([]); // Initialize rooms state as an empty array

 useEffect(() => {
   const fetchData = async () => {
     try {
       const fetchedRooms = await getRooms(); // Fetch datas
       const data = fetchedRooms.locations;
       setRooms(data); // Update rooms state
     } catch (error) {
       console.error('Error fetching rooms:', error);
     }
   };

   fetchData(); // Call the function to fetch data on component mount
 }, []); // Empty dependency array ensures fetchData runs only once
 const renderDevice = ({ item }) => (
  <TouchableOpacity style={styles.ItemContainer} 
    onPress={subject==='Conditions'? () => navigation.navigate('Conditions', { location: item.name, email, subject }) : () => navigation.navigate('Analysis', { location: item.name, email, subject })}>
    <ImageBackground
      source={require('../../../assets/room.png')}
      style={styles.bgImage}
    >
      <View style={styles.textContainer}>
        <Text style={styles.Text}>{item.name}</Text>
      </View>
    </ImageBackground>
  </TouchableOpacity>
);


  return (
    <View style={styles.Viewcontainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton onPress={() => navigation.goBack()} />   
          <Text style={styles.centeredText}>{subject}</Text>
        </View>
        <FlatList
            vertical showsVerticalScrollIndicator={false} 
            numColumns={2} data={Rooms} renderItem={renderDevice} keyExtractor={(item) => `${item._id}`} />
      </View>
      <View>      
          <NavigationBar onPressButton={handlePressButton} type = "application"/> 
      </View>
    </View>
  );
}
