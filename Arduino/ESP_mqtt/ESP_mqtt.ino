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
const String senderID = "ESP2"; // Husk at ændre til den ESP du bruger!

#define NUM_LEDS 10
#define DATA_PIN 23
#define PHOTO_PIN 36

int i = 0;
int lux; //value for light sensor

//farvekoder vi sender med mqtt
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

  FastLED.addLeds<NEOPIXEL, DATA_PIN>(leds, NUM_LEDS); //Led-setup
}

void loop() 
{
  // DO YOUR THING HERE
  client.loop(); //keep MQTT running
  
  lux = analogRead(PHOTO_PIN);

  personOnPillow(); //checks if someone is sitting on pillow

  updateLED(); //updates the Led

  //for debugging
  Serial.println(Red);
  Serial.println(Blue);
  Serial.println(Green);

}


void personOnPillow(){
  if(lux < 1300){ // check if the light sensor is being covered
    sender(255); //send max colour value
  }else{
    sender(0); 
  }
}

void updateLED(){
  FastLED.clear();
  for(int i = 0; i < NUM_LEDS; i++){
  leds[i] = CRGB(Red, Green, Blue); //display the colorvalues recieved through mqtt
  FastLED.show();
}
}
