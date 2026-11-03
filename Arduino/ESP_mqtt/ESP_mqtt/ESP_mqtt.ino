// ----MOJA 2024, 2026---------
#include <WiFi.h>
#include <MQTT.h> //v. 2.5.3
#include <ArduinoJson.h> //v. 7.4.3

// -- some needed global variables ---
WiFiClient net;
MQTTClient client;
JsonDocument senderBuffer;
JsonDocument recieverBuffer;
// ------------------------------------

// ########### WIFI CONFIG ###########
const char ssid[] = "sensors";
const char pass[] = "FGeRiGzg";

// ########### MQTT CONFIG ###########
const String topic = "REMEMBER_TO_CHANGE";
const String senderID = "ESP"; //giver mulighed for at skelne mellem afsendere

// ________NOW FOLLOWS MAIN PROGRAMS______

void setup() {
  Serial.begin(9600);
  WiFi.begin(ssid, pass);
  connectWifi();
  connectMQTT();
}

void loop() 
{
  // DO YOUR THING HERE
  client.loop(); //keep MQTT running
}
