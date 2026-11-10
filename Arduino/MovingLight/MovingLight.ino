//Example code CIA how to run LED strip
#include <FastLED.h>
#define NUM_LEDS 100 
#define DATA_PIN 23

int i=0;
int speed = 0;
int itemCount = 1;

CRGB leds[NUM_LEDS];

void setup() {
  FastLED.addLeds<NEOPIXEL, DATA_PIN>(leds, NUM_LEDS); //HVIS FARVERNE ER FORKERTE KIG HER 
}

void loop() {

speed = map(itemCount,1, 10, 500, 50);
  i++; 
  if(i== NUM_LEDS){
    i=0;
  }
  FastLED.clear();
  leds[i] = CRGB(0,0,255);
  FastLED.show();
  delay(speed);
}