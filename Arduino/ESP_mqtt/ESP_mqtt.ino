// ----MOJA 2024, 2026---------
#include <WiFi.h>
#include <MQTT.h> //v. 2.5.3
#include <ArduinoJson.h> //v. 7.4.3
#include <FastLED.h>

//_____DEFINE FROM PULTLIGHT_____
#define NUM_LEDS 10
#define DATA_PIN 23
#define PHOTO_PIN 36

// _____DEFINE FROM PILLOWLIGHTPATTERN_____
#define pillowLightPatternNumLEDS 144 
#define pillowLightPatternDATA_PIN 22
#define pillowLightpatternLength 18

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

  // ____VARIABLES FROM PULTLIGHT____

  int i = 0;
  int lux; //value for light sensor

  //farvekoder vi sender med mqtt
  int Red = 0;
  int Green = 0;
  int Blue = 0;

  // millis variabel
  unsigned long previousMillis = 0;

  CRGB leds[NUM_LEDS]; 

  // ____VARIABLES FROM PILLOWLIGHTPATTERN____

  CRGB ColorPattern[pillowLightpatternLength] = {
    CRGB(0,0, 255),  CRGB(0,0,255),   CRGB(0,0,255),   // blå
    CRGB(0,0,255),   CRGB(0,0,255),   CRGB(0,0,255),   // blå
    CRGB(0,255,0),   CRGB(0,255,0),   CRGB(0,255,0),   // grøn
    CRGB(0,255,0),   CRGB(0,255,0),   CRGB(0,255,0),   // grøn
    CRGB(255,0,0),   CRGB(255,0,0),   CRGB(255,0,0),   // rød
    CRGB(255,0,0),   CRGB(255,0,0),   CRGB(255,0,0)    // rød
  };

  CRGB pillowLeds[pillowLightPatternNumLEDS]; // rgb leds for pudens lys 
    
  int x = 0; // En variable til at gemme hvor meget hver pixel har flyttet sig pr loop
  int speed = 0;
  int peopleCount = 0;


  // ________NOW FOLLOWS MAIN PROGRAMS______

  void setup() {
    Serial.begin(9600);
    WiFi.begin(ssid, pass);
    connectWifi();
    connectMQTT();
    pultLightSetup();
    pillowLightPatternSetup();
  }

  void loop() {
  pultLightloop(); //main loop for the pult 
  pillowLightPatternloop(); // main loop for the light on the pillow 
  FastLED.show();

  }
