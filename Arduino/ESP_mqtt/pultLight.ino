int lastSent = -1;   // sidste værdi vi sendte
int lastCount = 0;   // hvor mange ESP'er der var tændt sidst

void pultLightSetup() {
  FastLED.addLeds<NEOPIXEL, DATA_PIN>(leds, NUM_LEDS);
}

void pultLightloop() {
  client.loop();
  personOnPillow();
  updateLED();
}

// sender 255 hvis nogen sidder på puden, ellers 0 (kun når det ændrer sig)
void personOnPillow() {
  int val = 0;
  if (analogRead(PHOTO_PIN) < 1000) val = 255;
  if (val != lastSent) {
    sender(val);
    lastSent = val;
  }
}

void updateLED() {
  int count = (Red > 0) + (Blue > 0) + (Green > 0);   // antal tændte ESP'er

  // start timeren forfra når antallet ændrer sig
  if (count != lastCount) {
    blendStartTime = millis();
    lastCount = count;
  }

  // efter 6 sek. blandes farverne over 4 sek.
  int amount = 0;
  if (count >= 2) {
    amount = map(millis() - blendStartTime, 6000, 10000, 0, 255);
    amount = constrain(amount, 0, 255);
  }

  CRGB mix = CRGB(Red, Green, Blue);   // den blandede farve

  fill_solid(leds, NUM_LEDS, CRGB::Black);   // sluk alt først
  if (Red > 0)   fill_solid(&leds[0], 3, blend(CRGB::Red, mix, amount));
  if (Blue > 0)  fill_solid(&leds[3], 3, blend(CRGB::Blue, mix, amount));
  if (Green > 0) fill_solid(&leds[6], 4, blend(CRGB(0, 255, 0), mix, amount));
}