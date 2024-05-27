/*
  Rui Santos
  Complete project details at our blog.
    - ESP32: https://RandomNerdTutorials.com/esp32-firebase-realtime-database/
    - ESP8266: https://RandomNerdTutorials.com/esp8266-nodemcu-firebase-realtime-database/
  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files.
  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
  Based in the RTDB Basic Example by Firebase-ESP-Client library by mobizt
  https://github.com/mobizt/Firebase-ESP-Client/blob/main/examples/RTDB/Basic/Basic.ino
*/

#include <Arduino.h>
#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include "DHT.h"
#include <HTTPClient.h>

//Provide the token generation process info.
#include "addons/TokenHelper.h"
//Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

// Insert your network credentials
#define WIFI_SSID "MANGDAYKTX H2-521"
#define WIFI_PASSWORD "12345679"

// Insert Firebase project API Key
#define API_KEY "AIzaSyCEw_-d2mBtBvUAw9Qe86nmEEXxRe9pz8k"

// Insert RTDB URLefine the RTDB URL */
#define DATABASE_URL "https://smarthome-92b52-default-rtdb.asia-southeast1.firebasedatabase.app/" 
//https://console.firebase.google.com/u/0/project/smarthome-92b52/database/smarthome-92b52-default-rtdb/data để lấy URl


//Define Firebase Data object
FirebaseData fbdo;
HTTPClient http;
FirebaseAuth auth;
FirebaseConfig config;

#define RXp1 16
#define TXp1 17

unsigned long sendDataPrevMillis = 0;
unsigned long getDataPrevMillis = 0;
unsigned int sendDataInterval = 1000;
unsigned int getDataInterval = 1000;
unsigned int getDataInterval = 1000;
unsigned long callUpdateModalPrevMillis = 0;
unsigned long callUpdateFirestorePrevMillis = 0;
unsigned int callUpdateModalInterval = 86400000;//1 day
unsigned int callUpdateFirestoreInterval = 3600000;//1 hour
unsigned int callMLPrevMillis = 0;//5 phut
unsigned int callMLInterval = 300000;//5 phut
bool signupOK = false;
bool isFire = false;
bool isPerson = false;
// Struct to read DHT22 readings
struct sensor
{
  float temperature;
  float humidity;
  float lux;
  int pir;
  int fire;
};

void setup(){
  Serial.begin(74880);
  Serial2.begin(115200, SERIAL_8N1, RXp1, TXp1);//uart2
    //xóa bộ đệm input
  while (Serial2.available() > 0) {
    Serial2.read();
  }
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED){
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  /* Assign the api key (required) */
  config.api_key = API_KEY;

  /* Assign the RTDB URL (required) */
  config.database_url = DATABASE_URL;

  /* Sign up */
  if (Firebase.signUp(&config, &auth, "", "")){
    Serial.println("ok");
    signupOK = true;
  }
  else{
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }

  /* Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h
  
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);


}

void SendDataToFireBase(/*float temp, float humi, float light, float pir, float fire*/ String str){
    // Write an Int number on the database path test/int
    if (Firebase.RTDB.setString(&fbdo, "Home/sensor", str)){
        Serial.print("send sensor success, value:");
        Serial.println(str);

        //Serial.println("PATH: " + fbdo.dataPath());
       // Serial.println("TYPE: " + fbdo.dataType());
      }
      else {
        Serial.println("FAILED");
        Serial.println("REASON: " + fbdo.errorReason());
      }
    /*
    if(int(humi) != -1){
      if (Firebase.RTDB.setInt(&fbdo, "Home/LivingRoom/Sensor/HUMI01/value", humi)){
        Serial.print("send humi success, value:");
        Serial.println(humi);

        //Serial.println("PATH: " + fbdo.dataPath());
       // Serial.println("TYPE: " + fbdo.dataType());
      }
      else {
        Serial.println("FAILED");
        Serial.println("REASON: " + fbdo.errorReason());
      }
    }
    if(int(temp) != -1){
      if (Firebase.RTDB.setInt(&fbdo, "Home/LivingRoom/Sensor/TEMP01/value", temp)){
        Serial.print("send temp success, value: ");
                Serial.println(temp);
       // Serial.println("PATH: " + fbdo.dataPath());
       // Serial.println("TYPE: " + fbdo.dataType());
      }
      else {
        Serial.println("FAILED");
        Serial.println("REASON: " + fbdo.errorReason());
      }
    }
    if(int(light) != -1){
      if (Firebase.RTDB.setInt(&fbdo, "Home/LivingRoom/Sensor/LIGHT01/value", light)){
        Serial.print("send light success, value: ");
                Serial.println(light);
        //Serial.println("PATH: " + fbdo.dataPath());
        //Serial.println("TYPE: " + fbdo.dataType());
      }
      else {
        Serial.println("FAILED");
        Serial.println("REASON: " + fbdo.errorReason());
      }
    }
    if(int(pir) != -1 ){
      if (Firebase.RTDB.getFloat(&fbdo, "Home/havePerson")){
        if(fbdo.floatData()!=pir){
          if (Firebase.RTDB.setInt(&fbdo, "Home/havePerson", pir)){
            Serial.print("send pir success, value: ");
        Serial.println(pir);
            //Serial.println("PATH: " + fbdo.dataPath());
            //Serial.println("TYPE: " + fbdo.dataType());
          }
          else {
            Serial.println("FAILED");
            Serial.println("REASON: " + fbdo.errorReason());
          }
        }
      }
    }
    if(int(fire) !=  -1){
      if (Firebase.RTDB.getFloat(&fbdo, "Home/isFire")){
        if(fbdo.floatData()!=fire){
          if (Firebase.RTDB.setInt(&fbdo, "Home/isFire", fire)){
            Serial.print("send fire success, value: ");
                    Serial.println(fire);
            //Serial.println("PATH: " + fbdo.dataPath());
            //Serial.println("TYPE: " + fbdo.dataType());
          }
          else {
            Serial.println("FAILED");
            Serial.println("REASON: " + fbdo.errorReason());
          }
        }
      }
    }
  */
}

String convertStringNumber(int n){
  if(n == 1) return "1";
  else if(n == 0) return "0";
  return "-1";
}
void GetDataFromFireBase(String& str){
    int intValue;
    if (Firebase.RTDB.getString(&fbdo, "Home/status")) {
      Serial.println("get  status success");
      if (fbdo.dataType() == "string") {
        str= fbdo.stringData();
        Serial.println(str);
      }
    }
    else {
      Serial.print("firebase error: ");
      Serial.println(fbdo.errorReason());
    }
   /* if (Firebase.RTDB.getInt(&fbdo, "Home/LivingRoom/Device/LED01/status")) {
      Serial.println("get LED01 status success");
      if (fbdo.dataType() == "int") {
        intValue = fbdo.intData();
        str = str + convertStringNumber(intValue);
        Serial.println(intValue);
      }
    }
    else {
      Serial.print("firebase error: ");
      Serial.println(fbdo.errorReason());
    }


    if (Firebase.RTDB.getInt(&fbdo, "Home/LivingRoom/Device/FAN01/status")) {
      Serial.println("get FAN01 status success");
      if (fbdo.dataType() == "int") {
        intValue = fbdo.intData();
        Serial.println(intValue);
        str = str + "|" + convertStringNumber(intValue);
      }
    }
    else {
      Serial.print("firebase error: ");
      Serial.println(fbdo.errorReason());
    }

    if (Firebase.RTDB.getInt(&fbdo, "Home/BedRoom/Device/LED02/status")) {
      Serial.println("get LED02 status success");
      if (fbdo.dataType() == "int") {
        intValue = fbdo.intData();
        Serial.println(intValue);
        str = str + "|" + convertStringNumber(intValue);
      }
    }
    else {
      Serial.print("firebase error: ");
      Serial.println(fbdo.errorReason());
    }
    
    if (Firebase.RTDB.getInt(&fbdo, "Home/BedRoom/Device/FAN02/status")) {
      Serial.println("get FAN02 status success");
      if (fbdo.dataType() == "int") {
        intValue = fbdo.intData();
        Serial.println(intValue);
        str = str + "|" + convertStringNumber(intValue) + "#";
      }
    }
    else {
      Serial.print("firebase error: ");
      Serial.println(fbdo.errorReason());
    }*/
}
void tachChuoi(const char* chuoi, double mang[]) {
  char* chuoiCopy = strdup(chuoi); // Tạo bản sao chuỗi
  char* token = strtok(chuoiCopy, "|");
  int i = 0;
  while (token != NULL && i < sizeof(mang) / sizeof(mang[0])) { // Kiểm tra kích thước mảng
      mang[i] = atof(token); // Chuyển đổi token thành float và lưu vào mảng
    token = strtok(NULL, "|"); // Lấy token tiếp theo
    i++;
  }
  free(chuoiCopy); // Giải phóng bộ nhớ đã cấp phát cho bản sao chuỗi
}
// Read DHT11 sensor
String readSensor()
{
   if (Serial2.available())
  {
      String inputString = Serial2.readStringUntil('#');
      Serial.println(inputString);
        /*if(inputString.length()<=19) return{-1,-1,-1,-1,-1};//truong hop gui thieu vd: "-1.00/-1.00"=>> chi gui 2 thay vi 5 phan tu do bi xung dot j do
        double mang[5];
        tachChuoi(inputString.c_str(), mang);
        //ham tach chuoi dao nguoc thu tu
        float humidity = mang[0];
        float temperatureInC = mang[1];
        float lux = mang[2];
        float pir = mang[3];
        float fire = mang[4];
                Serial.print("humi :");
        Serial.println(humidity);
                Serial.print("temp :");
        Serial.println(temperatureInC);
                Serial.print("lux :");
        Serial.println(lux);
        Serial.print("pir :");
        Serial.println(pir);
        Serial.print("fire :");
        Serial.println(fire);
        return {temperatureInC, humidity, lux, pir, fire};
        */
        return inputString;
            //xóa bộ đệm input
      while (Serial2.available() > 0) {
        Serial2.read();
      }
    }

  return "";
}
void loop(){
  if (Firebase.ready() && signupOK /*&&(millis() - sendDataPrevMillis > sendDataInterval )*/){
      String readings = readSensor();
    if (readings==""/*isnan(readings.humidity) || isnan(readings.temperature)|| isnan(readings.lux)|| isnan(readings.pir)|| isnan(readings.fire)*/)
    {
      Serial.println("Failed to read sensor!");
    }
    else {
    sendDataPrevMillis = millis();
    //SendDataToFireBase(readings.temperature, readings.humidity, readings.lux, readings.pir, readings.fire);
    SendDataToFireBase(readings);
    int lastPipeIndex = readings.lastIndexOf('|');
    String lastSubstring = readings.substring(lastPipeIndex + 1);
    int value = lastSubstring.toInt();
    int secondPipeIndex = readings.lastIndexOf('|', lastPipeIndex - 1);
    String secondSubstring = readings.substring(secondPipeIndex + 1);
    int personState = secondSubstring.toInt();
    if(value==1&&!isFire) {
      isFire = true;
        //call server to push telegram message
      http.begin("http://192.168.31.62:5000/api/notification/new"); // Thay thế bằng URL của bạn
      int httpCode = http.GET(); // Thực hiện yêu cầu GET

      if (httpCode > 0) { // Kiểm tra xem yêu cầu GET có thành công không
        String payload = http.getString();
        Serial.println(payload);
      }
      else {
        Serial.println("Error on HTTP telegram request");
      }
      http.end(); // Đóng kết nối

    }
    else if(value==0){
      isFire = false;
    }

    if(personState==1&&!isPerson&& millis() - callMLPrevMillis>=callMLInterval) {
      isPerson = true;
        //call server to push telegram message
      http.begin("http://192.168.31.62:5000/api/predict"); // Thay thế bằng URL của bạn
      http.addHeader("Content-Type", "application/x-www-form-urlencoded");
      String httpRequestData = "readings=" + String(readings);


      int httpCode = http.POST(httpRequestData); // Thực hiện yêu cầu POST

      if (httpCode > 0) { // Kiểm tra xem yêu cầu GET có thành công không
        String payload = http.getString();
        Serial.println(payload);
      }
      else {
        Serial.println("Error on HTTP ML request");
      }
      http.end(); // Đóng kết nối

    }
    else if(personState==0){
      callMLPrevMillis = millis();
      isPerson = false;
    }
    Serial.println("---------------");
    }
    delay(sendDataInterval);
  }

  
  String str="";
  if (Firebase.ready() && signupOK){
    getDataPrevMillis = millis();
    GetDataFromFireBase(str);
    Serial.print("Dữ liệu gửi arduino: ");
    Serial.println(str);
    if (Serial2.println(str)) {
        Serial.println("Gửi dữ liệu đến Arduino thành công");
    } else {
      Serial.println("Gửi dữ liệu đến Arduino thất bại");
    }
    Serial2.flush();
    Serial.println("---------------");
    delay(getDataInterval);
  }

  if(millis() - callUpdateModalPrevMillis >= callUpdateModalInterval){
    http.begin("http://192.168.31.62:5000/api/model/update"); // Thay thế bằng URL của bạn
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");
    int httpCode = http.GET(); // Thực hiện yêu cầu POST
    if (httpCode > 0) { // Kiểm tra xem yêu cầu GET có thành công không
      String payload = http.getString();
      Serial.println(payload);
    }
    else {
      Serial.println("Error on HTTP update model request");
    }
    http.end(); // Đóng kết nối
  }
  else {
    callUpdateModalPrevMillis = millis();
  }

  if(millis() - callUpdateFirestorePrevMillis >= callUpdateFirestoreInterval){
    http.begin("http://192.168.31.62:5000/api/firestore/update"); // Thay thế bằng URL của bạn
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");
    int httpCode = http.GET(); // Thực hiện yêu cầu POST
    if (httpCode > 0) { // Kiểm tra xem yêu cầu GET có thành công không
      String payload = http.getString();
      Serial.println(payload);
    }
    else {
      Serial.println("Error on HTTP update firestore request");
    }
    http.end(); // Đóng kết nối
  }
  else {
    callUpdateFirestorePrevMillis = millis();
  }
}