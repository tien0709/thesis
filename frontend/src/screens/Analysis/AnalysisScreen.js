
import React, { useLayoutEffect, useRef, useState } from "react";
import {Text, View, TouchableOpacity} from "react-native";
import styles from "./styles";
import { findLastElementWithLocation  } from "../../data/MockDataAPI"; 
import { Temperatures, Ligths, Humidities } from "../../data/dataArrays";
import NavigationBar from "../../components/NaviBar/navibar";
import BackButton from "../../components/BackButton/BackButton";
import { LineChart } from 'react-native-chart-kit';
import { ScrollView } from "react-native-gesture-handler";
import { parse, format } from 'date-fns';


export default function AnalysisScreen(props) {
  const { navigation, route } = props;
  const email = route?.params?.email;
  const location = route?.params?.location;  
  const name = route?.params?.name;
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

 };

 const temperature = findLastElementWithLocation ('TEMP', location);
 const humi = findLastElementWithLocation ('HUMI', location);
 const light = findLastElementWithLocation ('LIGHT', location);

  // Hàm chuyển đổi thời gian để lấy giờ
  // Hàm chuyển đổi thời gian để lấy giờ
  const getHourFromTime = (time) => {
    const parsedDate = parse(time, 'dd/MM/yyyy-HH:mm:ss', new Date());
    return format(parsedDate, 'HH'); // Lấy giờ từ thời gian cho trục X
  };

  // Chuyển đổi dữ liệu để sử dụng cho biểu đồ
  const dataLight = {
    labels: Ligths.map(item => getHourFromTime(item.time)), // Lấy giờ từ thời gian cho trục X
    datasets: [
      {
        data: Ligths.map(item => item.value), // Mảng giá trị cho trục Y
      },
    ],
  };

  const dataTemperature = {
    labels: Temperatures.map(item => getHourFromTime(item.time)), // Lấy giờ từ thời gian cho trục X
    datasets: [
      {
        data: Temperatures.map(item => item.value), // Mảng giá trị cho trục Y
      },
    ],
  };

  const dataHumi = {
    labels: Humidities.map(item => getHourFromTime(item.time)), // Lấy giờ từ thời gian cho trục X
    datasets: [
      {
        data: Humidities.map(item => item.value), // Mảng giá trị cho trục Y
      },
    ],
  };

  return (
    <View style={styles.Viewcontainer}>
      <View style={styles.header}>
          <BackButton onPress={() => navigation.goBack()} />   
          <Text style={styles.centeredText}>Phân tích</Text>
      </View>
      <Text style={styles.subHeader}>{name}</Text>
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.ItemContainer}>
          <View style={styles.name}>       
            <Text style={styles.Text}>Temperature</Text>
            <Text style={styles.text}>Last measured {temperature.value} °C</Text>
          </View>
          <View style={styles.sensor}>
            <LineChart
              data={dataTemperature}
              width={300}
              height={200}
              yAxisSuffix="°C" // Đơn vị đo lường cho trục Y
              chartConfig={{
                backgroundColor: '#0066FF',
                backgroundGradientFrom: '#0066FF',
                backgroundGradientTo: '#25A4FF',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                  padding: 5,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                },
              }}
              bezier
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ItemContainer}>
          <View style={styles.name}>       
            <Text style={styles.Text}>Moisture</Text>
            <Text style={styles.text}>Last measured {humi.value} %</Text>
          </View>
          <View style={styles.sensor}>
            <LineChart
              data={dataHumi}
              width={300}
              height={200}
              yAxisSuffix="°C" // Đơn vị đo lường cho trục Y
              chartConfig={{
                backgroundColor: '#0066FF',
                backgroundGradientFrom: '#0066FF',
                backgroundGradientTo: '#25A4FF',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                  padding: 5,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                },
              }}
              bezier
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ItemContainer}>
          <View style={styles.name}>       
            <Text style={styles.Text}>Lighting</Text>
            <Text style={styles.text}>Last measured {light.value} lx</Text>
          </View>
          <View style={styles.sensor}>
            <LineChart
              data={dataLight}
              width={300}
              height={200}
              yAxisSuffix="°C" // Đơn vị đo lường cho trục Y
              chartConfig={{
                backgroundColor: '#0066FF',
                backgroundGradientFrom: '#0066FF',
                backgroundGradientTo: '#25A4FF',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                  padding: 5,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                },
              }}
              bezier
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
      <View>      
          <NavigationBar onPressButton={handlePressButton} type = "application"/> 
      </View>
    </View>
  );
}
