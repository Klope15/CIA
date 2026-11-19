void pillowLightPatternSetup() {
  FastLED.addLeds<NEOPIXEL, pillowLightPatternDATA_PIN>(pillowLeds, pillowLightPatternNumLEDS); //HVIS FARVERNE ER FORKERTE KIG HER 
}

void pillowLightPatternloop() {

//if (peopleCount > 0) {
  //int peopleCountSpeed = constrain(peopleCount, 1, 10);
  speed = map(peopleCount,1, 10, 500, 50);

for (int i = 0; i < pillowLightPatternNumLEDS; i++) {      // tænder all 144 leds
    int pixPos = ( i +  x) % pillowLightPatternNumLEDS;    // flyt mønstret rundt i ringen
    pillowLeds[pixPos] = ColorPattern [i % pillowLightpatternLength];      // mønsteret gentages hver 18 pixel
  }
   millis(speed);
  x++; 
//} else 
//delay(50);
}
