void pultLightSetup () {
    FastLED.addLeds<NEOPIXEL, DATA_PIN>(leds, NUM_LEDS); //Led-setup
}

void pultLightloop () {
     // DO YOUR THING HERE
  client.loop(); //keep MQTT running
  
  lux = analogRead(PHOTO_PIN);

  personOnPillow(); //checks if someone is sitting on pillow

  updateLED(); //updates the Led

  //for debugging
  /*
  Serial.println(Red);
  Serial.println(Blue);
  Serial.println(Green);
  */
}

void personOnPillow(){
  if(lux < 1300){ // check if the light sensor is being covered
    sender(255); //send max colour value
  }else{
    sender(0); 
  }
}

void updateLED(){

  bool esp1 = Red > 0;
  bool esp2 = Blue > 0;
  bool esp3 = Green > 0;

  // Check if at least 2 ESPs are active
  if(esp1 + esp2 + esp3 >= 2){

    if(!blendStarted){
      blendStartTime = millis();
      blendStarted = true;
    }

  }else{
    blendStarted = false;
  }

  // Start blending after 6 seconds
  int blendAmount = 0;

  if(blendStarted && millis() - blendStartTime > 6000){
    blendAmount = map(millis() - blendStartTime, 6000, 10000, 0, 255);
    blendAmount = constrain(blendAmount, 0, 255);
  }
// All 3 ESPs active
if(esp1 && esp2 && esp3){

  for(int i = 0; i < 10; i++){
    if(i < 3){
      leds[i] = blend(CRGB(Red,0,0), CRGB(0,0,Blue), map(i,0,5,0,blendAmount));
    }else{
      leds[i] = blend(CRGB(0,0,Blue), CRGB(0,Green,0), map(i,4,9,blendAmount,255));
    }
  }

}

// ESP1 and ESP2
else if(esp1 && esp2){
  for(int i = 0; i < 6; i++){
    leds[i] = blend(CRGB(Red,0,0), CRGB(0,0,Blue), map(i,0,5,0,blendAmount));
  }
  fill_solid(&leds[6], 4, CRGB::Black);
}

// ESP2 and ESP3
else if(esp2 && esp3){
  fill_solid(&leds[0], 3, CRGB::Black);
  for(int i = 3; i < 10; i++){
    leds[i] = blend(CRGB(0,0,Blue), CRGB(0,Green,0), map(i,3,9,0,blendAmount));
  }
}

// ESP1 and ESP3
else if(esp1 && esp3){
  for(int i = 0; i < 10; i++){
    leds[i] = blend(CRGB(Red,0,0), CRGB(0,Green,0), map(i,0,9,0,blendAmount));
  }
}

// Only one ESP active
else{
  fill_solid(&leds[0], 3, esp1 ? CRGB(Red,0,0) : CRGB::Black);
  fill_solid(&leds[3], 3, esp2 ? CRGB(0,0,Blue) : CRGB::Black);
  fill_solid(&leds[6], 4, esp3 ? CRGB(0,Green,0) : CRGB::Black);
}

FastLED.show();
}