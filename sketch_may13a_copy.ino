
// SoftwareSerial - Version: Latest 
#include <SoftwareSerial.h>
#define LED_PIN 13

SoftwareSerial mySerial(10, 11); // RX, TX  

String input ="";

void setup() {  
  Serial.begin(9600);
  pinMode(LED_PIN, OUTPUT);
  mySerial.begin(9600);
}


void loop() {  
  
  if (mySerial.available()) {
    input += mySerial.read();
    if(input == "5"){
      Serial.println("gotcha");
      digitalWrite(LED_PIN,HIGH);
      delay(1000);
      digitalWrite(LED_PIN,LOW);
      input = "";
    }
   
  }
}