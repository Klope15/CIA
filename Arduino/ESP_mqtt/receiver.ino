void modtager(String &topic, String &indhold) 
{
Serial.println(indhold);   // test
//tilføjelse til serial print, for at logge hvad der kommer hvorfra, og hvis den ikke kan modtage
DeserializationError err = deserializeJson(recieverBuffer, indhold);
if (err) {
  Serial.print("JSON-fejl: ");
  Serial.println(err.c_str());
  return;
}  String afsender = recieverBuffer["from"];

//From ESP32
//one ESP controls a single colour value displayed on all Pillow
if(afsender == "ESP1"){
    Red = recieverBuffer["val"];
  }

if(afsender == "ESP2"){
    Yellow = recieverBuffer["val"];
  }

if(afsender == "ESP3"){
    Green = recieverBuffer["val"];
  }
  //From maps
if(afsender == "kort1" && senderID == "ESP1"){
    placering = recieverBuffer["val"] | "";
  }

if(afsender == "kort2" && senderID == "ESP2"){
    placering = recieverBuffer["val"] | "";
  }

if(afsender == "kort3" && senderID == "ESP3"){
    placering = recieverBuffer["val"] | "";
  }

  //From cameras
if (afsender == "Camera1") {
  if (recieverBuffer["val"].is<int>()){
  peopleCount = recieverBuffer["val"];
  }

  if (recieverBuffer["val"].is<JsonArray>()){
  JsonArray colorArray = recieverBuffer["val"];
  for(int i =0; i<18 && i<colorArray.size(); i++){
    environmentColor_1[i].r = colorArray[i][0];
    environmentColor_1[i].g = colorArray[i][1];
    environmentColor_1[i].b = colorArray[i][2];
    Serial.print(i + 1);
    Serial.println(": R="); Serial.println(environmentColor_1[i].r);
    Serial.println(": G="); Serial.println(environmentColor_1[i].g);
    Serial.println(": B="); Serial.println(environmentColor_1[i].b);
   
  }
  colorSaved = true;
  }
}
if (afsender == "Camera2") {
  if (recieverBuffer["val"].is<int>()){
  peopleCount = recieverBuffer["val"];
  }

  if (recieverBuffer["val"].is<JsonArray>()){
  JsonArray colorArray = recieverBuffer["val"];
  for(int i =0; i<18 && i<colorArray.size(); i++){
    environmentColor_2[i].r = colorArray[i][0];
    environmentColor_2[i].g = colorArray[i][1];
    environmentColor_2[i].b = colorArray[i][2];
    Serial.print(i + 1);
    Serial.println(": R="); Serial.println(environmentColor_2[i].r);
    Serial.println(": G="); Serial.println(environmentColor_2[i].g);
    Serial.println(": B="); Serial.println(environmentColor_2[i].b);
   
  }
  colorSaved = true;
  }
}
if (afsender == "Camera3") {
  if (recieverBuffer["val"].is<int>()){
  peopleCount = recieverBuffer["val"];
  }

  if (recieverBuffer["val"].is<JsonArray>()){
  JsonArray colorArray = recieverBuffer["val"];
  for(int i =0; i<18 && i<colorArray.size(); i++){
    environmentColor_3[i].r = colorArray[i][0];
    environmentColor_3[i].g = colorArray[i][1];
    environmentColor_3[i].b = colorArray[i][2];
    Serial.print(i + 1);
    Serial.println(": R="); Serial.println(environmentColor_3[i].r);
    Serial.println(": G="); Serial.println(environmentColor_3[i].g);
    Serial.println(": B="); Serial.println(environmentColor_3[i].b);

  }
  colorSaved = true;
  }
}
}
