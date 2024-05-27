import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { View, Text, Button, FlatList, Animated} from 'react-native';
import { PushNotification, getALLNotifications } from "../../data/MockDataAPI"; 
import styles from "./styles";
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

import NavigationBar from "../../components/NaviBar/navibar";

export default function SystemLogScreen(props) {
  const { navigation, route } = props;
  const email = route?.params?.email;

  const scrollY = useRef(new Animated.Value(0)).current;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitleStyle: { opacity: 0 },
    });
  }, [navigation]);

  const [Logs, setLogs] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetched = await getALLNotifications(); // Fetch datas
        const data = fetched;
        setLogs(data); // Update rooms state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
 
    fetchData(); // Call the function to fetch data on component mount
  }, []); // Empty dependency array ensures fetchData runs only once


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

 const timeToNow = ({itemTime}) => {
  const timeDiff = moment(Date.now()).diff(moment(itemTime)); // Calculate time difference

  // Choose the formatting you want based on the timeDiff value
  let formattedTimeDiff;
  if (timeDiff < moment.duration(1, 'minute')) {
    formattedTimeDiff = 'gần đây';
  } else if (timeDiff < moment.duration(60, 'minutes')) {
    formattedTimeDiff = moment.duration(timeDiff).minutes() + ' phút trước';
  } else if (timeDiff < moment.duration(24, 'hours')) {
    formattedTimeDiff = moment.duration(timeDiff).hours() + ' giờ trước';
  } else {
    formattedTimeDiff = moment(itemTime.time).format('HH:mm:ss'); // Default to HH:mm:ss for older times
  }
  return formattedTimeDiff ;
 };

  const renderLog = ({ item }) => (
    <View style={styles.ItemContainer}>
      <FontAwesomeIcon icon={faTriangleExclamation} size={40} color="#EFC932" />
      <View style={styles.text}>
        <Text style={styles.time}>{timeToNow({ itemTime: item.time })}</Text>
        <Text style={[styles.status,  color = 'red' ]}>
            {item.content}
        </Text>
      </View>
    </View>
  );


  return (
    <View style={styles.Viewcontainer}>

        <Text style={styles.centeredText}>Thông báo</Text>

      <FlatList
        data={Logs}
        renderItem={renderLog}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={styles.bodyImageContainer}
      />

      <NavigationBar onPressButton={handlePressButton} />
    </View>
  );
}



