#include <DHT.h>
#include <SoftwareSerial.h>

#define DHT11Pin 2  // Adjust pin number if needed
#define LuxPin A0  // Adjust pin number if needed
#define PirPin A1  // Adjust pin number if needed
#define FirePin A2  // Adjust pin number if needed
#define DHTType DHT11

DHT HT(DHT11Pin, DHTType);
float humi;
float temp;

#define RXp1 19
#define TXp1 18

const long sendDataInterval = 15000;
const long sendDataPersonInterval = 500;
const long sendDataFireInterval = 500;
unsigned long previousMillis = 0;
unsigned long previousMillisPerson = 0;
unsigned long previousMillisFire = 0;

// Relay Pins
const int RELAY_PIN_1 = 9;//fan livingRoom
const int RELAY_PIN_2 = 10;// led livingRoom
const int RELAY_PIN_3 = 11;//fan ParentRoom
const int RELAY_PIN_4 = 12;//led ParentRoom

struct RelayPin {
    float port1;
    float port2;
    float port3;
    float port4;
    bool isValid() {
        // Implement your validation logic here
        // For example, check if pin is within valid range and state is true/false
        return port1!=-1||port2!=-1||port3!=-1||port4!=-1;
    }
};

RelayPin readFromESP()
{
   if (Serial1.available())
  {
      String inputString = Serial1.readStringUntil('#');
      Serial.print("dữ liệu nhận được từ Arduino: ");
      Serial.println(inputString);
      while(Serial1.available())Serial1.read(); //clear buffer

      // Local function to split string
      auto tachChuoi = [](const char *chuoi, double mang[]) {
        char *chuoiCopy = strdup(chuoi); // Make a copy to avoid modifying the original string
        char *token = strtok(chuoiCopy, "|");
        int i = 0;
        while (token != NULL && i < 4)
        {
          
          if (strcmp(token, "") == 0) {
            // Nếu token là chuỗi rỗng, gán giá trị -1 vào mảng
            mang[i] = -1;
          }
          else {
          mang[i] = strtod(token, NULL);
          }
          token = strtok(NULL, "|");
          i++;
        }
        free(chuoiCopy); // Free the allocated memory
      };
        double mang[4];
        tachChuoi(inputString.c_str(), mang);
        float led1 = mang[0];
        float fan1 = mang[1];
        float led2 = mang[2];
        float fan2 = mang[3];
        Serial.print("relay pin: ");
        Serial.print(led1);
        Serial.print(" ");
        Serial.print(fan1);
        Serial.print(" ");
        Serial.print(led2);
        Serial.print(" ");
        Serial.println(fan2);
        Serial.println("-----------------------------------");
        return {led1, fan1, led2, fan2}; //ledLiving, fanliving, led parent, fan parent
      
      //xóa bộ đệm input
      while (Serial1.available() > 0) {
        Serial1.read();
      }
    }

  return {-1,-1,-1,-1};
}

void turnOffAllRelay()
{
  digitalWrite(RELAY_PIN_1, HIGH);
  digitalWrite(RELAY_PIN_2, HIGH);
  digitalWrite(RELAY_PIN_3, HIGH);
  digitalWrite(RELAY_PIN_4, HIGH);
}

void setup() {
  Serial.begin(74880);//2 serial phai co baud khac nhau de phan biet
  Serial1.begin(115200, SERIAL_8N1);  
  pinMode(RELAY_PIN_1, OUTPUT); // Khai báo chân relay là ngõ ra output
  pinMode(RELAY_PIN_2, OUTPUT); // Khai báo chân relay là ngõ ra output
  pinMode(RELAY_PIN_3, OUTPUT); // Khai báo chân relay là ngõ ra output
  pinMode(RELAY_PIN_4, OUTPUT);// Khai báo chân relay là ngõ ra output
  HT.begin();          // Initialize DHT sensor
  turnOffAllRelay();
  //xóa bộ đệm input
    while (Serial1.available() > 0) {
        Serial2.read();
    }
}

void loop() {

  unsigned long currentMillis = millis();
  // Read sensor values more frequently (e.g., every 1500 milliseconds)
  /*if(currentMillis - previousMillisFire >= sendDataFireInterval){
    previousMillisFire = currentMillis;
    int fire = analogRead(FirePin);
    if(fire >= 500) fire = 0;
    else fire = 1;
    Send_data(-1,-1,-1,-1,fire);
  }
  else if(currentMillis - previousMillisPerson >= sendDataPersonInterval){
    previousMillisPerson = currentMillis;    
    int pir = analogRead(PirPin);
    if(pir >= 500) pir = 0;
    else pir=1;
    Send_data(-1,-1,-1,pir,-1);
  }*/
  if (currentMillis - previousMillis >= sendDataInterval){
    // save the last time
    previousMillis = currentMillis;
    humi = HT.readHumidity();
    temp = HT.readTemperature() - 5;
    float lux = analogRead(LuxPin);
    lux = 1023 - lux;
    Serial.print("fire :");
    Serial.println(analogRead(FirePin));
    int fire = analogRead(FirePin);
    if(fire >= 500) fire = 0;
    else fire = 1;
    int pir = analogRead(PirPin);
    if(pir >= 500) pir = 0;
    else pir=1;
    Serial.print("humi :");
    Serial.println(humi);
    Serial.print("temp :");
    Serial.println(temp);
    Serial.print("lux: ");
    Serial.println(lux);
        Serial.print("pir: ");
    Serial.println(pir);
        Serial.print("fire: ");
    Serial.println(fire);
    Serial.println("---------------------------");
    Send_data(humi, temp, lux, pir, fire);
  }


  RelayPin relay = readFromESP();
  if(relay.isValid()) setRelayStatus(relay);
}

// Set our Relay status
void setRelayStatus(RelayPin relay)
{ 
    if(relay.port2!=-1) setPinRelayStatus(RELAY_PIN_1, relay.port2);
    if(relay.port1!=-1)setPinRelayStatus(RELAY_PIN_2, relay.port1);
    if(relay.port4!=-1)setPinRelayStatus(RELAY_PIN_3, relay.port4);
    if(relay.port3!=-1)setPinRelayStatus(RELAY_PIN_4, relay.port3);
}

// Set our Relay status
void setPinRelayStatus(int pin, int status)
{
  if(status == -1) return;
  if(status == 0) status = HIGH;
  else if(status == 1) status = LOW;
  Serial.print("Setting Relay ");
  Serial.print(pin);
  Serial.print(" ");
  Serial.print(status);
  Serial.println(" ");
  digitalWrite(pin, status);
}

void Send_data(float humi, float temp, float lux, float pir, float fire) {
  String SendEsp32 = "";
  String humi_str = String(humi);
  String temp_str = String(temp);
  String lux_str = String(lux);
  String pir_str = String(pir);
  String fire_str = String(fire);
  SendEsp32 = humi_str + "|" + temp_str + "|" + lux_str + "|" + pir_str + "|" + fire_str +"#";
  Serial.print("Dữ liệu gửi: ");
  Serial.println(SendEsp32);
  if (Serial1.println(SendEsp32)) {
    Serial.println("Gửi dữ liệu thành công");
  } else {
    Serial.println("Gửi dữ liệu thất bại");
  }
  Serial.println("-----------------------------------");
  Serial1.flush();
}

