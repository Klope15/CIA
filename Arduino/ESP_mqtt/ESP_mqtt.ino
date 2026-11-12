// ----MOJA 2024, 2026---------
#include <WiFi.h>
#include <MQTT.h> //v. 2.5.3
#include <ArduinoJson.h> //v. 7.4.3
#include <FastLED.h>

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
const String topic = "Bænk";
const String senderID = "ESP2"; //giver mulighed for at skelne mellem afsendere

#define NUM_LEDS 10
#define DATA_PIN 23
#define PHOTO_PIN 36

int i = 0;
int lux; //value for light sensor

int Red = 0;
int Green = 0;
int Blue = 0;

CRGB leds[NUM_LEDS];

// ________NOW FOLLOWS MAIN PROGRAMS______

void setup() {
  Serial.begin(9600);
  WiFi.begin(ssid, pass);
  connectWifi();
  connectMQTT();

  FastLED.addLeds<NEOPIXEL, DATA_PIN>(leds, NUM_LEDS);
}

void loop() 
{
  // DO YOUR THING HERE
  client.loop(); //keep MQTT running
  
  lux = analogRead(PHOTO_PIN);

  personOnBench();

  updateLED();

  Serial.println(Red);
  Serial.println(Blue);
  Serial.println(Green);

}


void personOnBench(){
  if(lux < 1300){
    sender(255);
  }else{
    sender(0);
  }
}

void disableLED(){
    FastLED.clear(); 
    for(int i = 0; i < NUM_LEDS; i++){
    leds[i] = CRGB(Red, Green, Blue);
    FastLED.show();
}
}

void updateLED(){
  FastLED.clear();
  for(int i = 0; i < NUM_LEDS; i++){
  leds[i] = CRGB(Red, Green, Blue);
  FastLED.show();
}
}
