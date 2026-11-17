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
const String senderID = "ESP1"; // Husk at ændre til den ESP du bruger!

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

 
void updateLED() {
  fill_solid(&leds[0], 3, CRGB(0, 0, Blue));   // LED 1-3 blue (ESP2)
  fill_solid(&leds[3], 3, CRGB(Red, 0, 0));    // LED 4-6 red (ESP1)
  fill_solid(&leds[6], 4, CRGB(0, Green, 0));  // LED 7-10 green (ESP3)
  FastLED.show();
}

void transitionLED(){
  delay(3000);
  fill_solid(&leds[2], 1, CRGB(0, 0, Blue));   
  fill_solid(&leds[3], 1, CRGB(Red, 0, 0));    

  fill_solid(&leds[5], 1, CRGB(Red, 0, 0));    
  fill_solid(&leds[6], 1, CRGB(0, Green, 0));
  
  }
  




