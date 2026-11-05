
#include <FastLED.h>

#define NUM_LEDS 10
#define DATA_PIN 23
#define PHOTO_PIN 36

int i = 0;

CRGB leds[NUM_LEDS];

void setup() {
  FastLED.addLeds<NEOPIXEL, DATA_PIN>(leds, NUM_LEDS);
  Serial.begin(9600);
}

void loop() {
  int value = analogRead(PHOTO_PIN);
 

  //Serial.println(value);

  delay(250);

  if (value < 1300){
    Serial.println("On");

  } else {
    Serial.println("Off");
  }
 i++;
    if (value < 1300 ) {
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
