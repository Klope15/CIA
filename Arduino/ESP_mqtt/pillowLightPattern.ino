void pillowLightPatternSetup() {
  FastLED.addLeds<NEOPIXEL, pillowLightPatternDATA_PIN>(pillowLeds, pillowLightPatternNumLEDS); //HVIS FARVERNE ER FORKERTE KIG HER 
}

void pillowLightPatternloop() {

  speed = map(peopleCount, 1, 10, 500, 50);

  if (millis() - previousMillis >= speed) {
    previousMillis = millis();

    for (int i = 0; i < pillowLightPatternNumLEDS; i++) {
      int pixPos = (i + x) % pillowLightPatternNumLEDS;

      pillowLeds[pixPos] = ColorPattern[i % pillowLightpatternLength];
    }

    x++;
  }
}
