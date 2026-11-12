//Example code CIA how to run LED strip
#include <FastLED.h>
#define NUM_LEDS 144 
#define DATA_PIN 23
// #define space 10 // spaceing between every pixel lightning 
#define PATTERN_LENGTH 18


CRGB ColorPattern[PATTERN_LENGTH] = {
  CRGB(0,0,255),   CRGB(0,0,255),   CRGB(0,0,255),   // blå
  CRGB(0,0,255),   CRGB(0,0,255),   CRGB(0,0,255),   // blå
  CRGB(0,255,0),   CRGB(0,255,0),   CRGB(0,255,0),   // grøn
  CRGB(0,255,0),   CRGB(0,255,0),   CRGB(0,255,0),   // grøn
  CRGB(255,0,0),   CRGB(255,0,0),   CRGB(255,0,0),   // rød
  CRGB(255,0,0),   CRGB(255,0,0),   CRGB(255,0,0)    // rød
};

CRGB leds[NUM_LEDS];
  
int x = 0; // En variable til at gemme hvor meget hver pixel har flyttet sig pr loop
int speed = 0;
int itemCount = 10;

void setup() {
  FastLED.addLeds<NEOPIXEL, DATA_PIN>(leds, NUM_LEDS); //HVIS FARVERNE ER FORKERTE KIG HER 
}

void loop() {
speed = map(itemCount,1, 10, 500, 50);

FastLED.clear();

for (int i = 0; i < NUM_LEDS; i++) {      // tænder all 144 leds
    int pix_pos = ( i +  x) % NUM_LEDS;    // flyt mønstret rundt i ringen
    leds[pix_pos] = ColorPattern [i % PATTERN_LENGTH];      // mønsteret gentages hver 18 pixel
  }
  FastLED.show();
  delay(speed);
  x++; 
}
