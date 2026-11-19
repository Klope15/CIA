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
  for(int i = 0; i < NUM_LEDS; i++){
  leds[i] = CRGB(Red, Green, Blue); //display the colorvalues recieved through mqtt
}
}