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
const String senderID = "ESP"; //giver mulighed for at skelne mellem afsendere

#define NUM_LEDS 10
#define DATA_PIN 23
#define PHOTO_PIN 36

int i = 0;

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
  activateLED();
}


void activateLED(){
  int lux = analogRead(PHOTO_PIN);

  if (lux < 1300){
    Serial.println("lux",lux);

  } else {
    Serial.println("lux",lux);
  }
 i++;
    if (lux < 1300 ) {
        for(int i = 0; i < NUM_LEDS; i++){
    leds[i] = CRGB(0, 255, 0);
    FastLED.show();
  }
  
    } else {
      FastLED.clear(); 
      for(int i = 0; i < NUM_LEDS; i++){
    leds[i] = CRGB(0, 0, 0);
    FastLED.show();
    }

}
}
