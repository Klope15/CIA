int lastSent = -1;   // husker hvad vi sendte sidst, så vi kun sender når noget ændrer sig (-1 sikrer at første værdi altid sendes) kan være alle tal undtagen 0 og 255.
int lastCount = 0;   // husker hvor mange ESP'er der var tændt sidste gang, starter på 0 fordi ingen sidder der når programmet starter

void pultLightSetup() {
  FastLED.addLeds<NEOPIXEL, DATA_PIN>(leds, NUM_LEDS); //kører når en esp starter, fortæller lidt om type, pin og nummer af leds
}

void pultLightloop() {
  client.loop(); // holder MQTT-forbindelsen i live, så vi modtager beskeder fra de andre ESP'er
  personOnPillow();
  updateLED();
}

// sender 255 hvis nogen sidder på puden, ellers 0 (kun når det ændrer sig)
void personOnPillow() {
  int val = 0;
  if (analogRead(PHOTO_PIN) < 1000) val = 255; // hvis photoresistorens værdi er under 1000, sidder der nogen, så bliver val(value) til 255 som er farvens styrke
  if (val != lastSent) { // denne tjekker om vores værdi er anderledes end den vi sendte sidst, så vi kende sende den nye value 
    sender(val);
    lastSent = val; // vi husker det 
  }
}

void updateLED() {
  int count = (Red > 0) + (Blue > 0) + (Green > 0);   // antal tændte ESP'er

  // start timeren forfra når antallet ændrer sig, fx nogen sætter sig eller rejser sig op.
  if (count != lastCount) {
    blendStartTime = millis(); // tiden starter forfra
    lastCount = count; // husker nyt antal
  }

  // efter 6 sek. blandes farverne over 4 sek.
  int amount = 0; // amount er hvor meget de blandes
  if (count >= 2) {
    amount = map(millis() - blendStartTime, 6000, 10000, 0, 255); // så efter 6 sekunder, går de fra at blive blandet 0% til 100% ved 10 sekunder
    amount = constrain(amount, 0, 255); // sikrer sig at amount altid er indenfor 0 og 255.
  }

  CRGB mix = CRGB(Red, Green, Blue);   // her mixer det fælles farven

  fill_solid(leds, NUM_LEDS, CRGB::Black);   // sluk alt først
  // hvilken farve og hvilken position på strippen
  if (Red > 0)   fill_solid(&leds[0], 3, blend(CRGB(255, 0, 0), mix, amount));
  if (Blue > 0)  fill_solid(&leds[3], 3, blend(CRGB(0, 0, 255), mix, amount));
  if (Green > 0) fill_solid(&leds[6], 4, blend(CRGB(0, 255, 0), mix, amount));
}