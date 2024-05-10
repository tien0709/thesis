import React, { useEffect } from "react";
import { View, Image, Button } from "react-native";
import styles from "./styles";


export default function SplashScreen(props) {
  const { navigation } = props;
  useEffect(() => {
    const timer = setTimeout(() => {
      // Chuyển sang màn hình khác sau 2 giây
      navigation.navigate("Login"); // Thay "NextScreen" bằng tên màn hình bạn muốn chuyển đến
    }, 2000);

    // Xóa timer khi component unmount để tránh memory leaks
    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Image style={styles.photo} source={require("../../../assets/splash.png")} />
    </View>
  );
}
