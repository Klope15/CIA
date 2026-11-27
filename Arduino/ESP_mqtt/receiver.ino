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
if (afsender == "Camera1") {
  if (recieverBuffer["val"].is<int>()){
  peopleCount = recieverBuffer["val"];
  }

  if (recieverBuffer["val"].is<JsonArray>()){
  JsonArray colorArray = recieverBuffer["val"];
  for(int i =0; i<18 && i<colorArray.size(); i++){
    environmentColor[i].r = colorArray[i][0];
    environmentColor[i].g = colorArray[i][1];
    environmentColor[i].b = colorArray[i][2];
    Serial.print(i + 1);
    Serial.println(": R="); Serial.println(environmentColor[i].r);
    Serial.println(": G="); Serial.println(environmentColor[i].g);
    Serial.println(": B="); Serial.println(environmentColor[i].b);
   
  }
  colorSaved = true;
  }
}
}
