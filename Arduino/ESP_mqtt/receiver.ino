void modtager(String &topic, String &indhold) 
{
  deserializeJson(recieverBuffer,indhold);
  String afsender = recieverBuffer["from"];

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
  if (recieverBuffer["val"].as<int>()){
  peopleCount = recieverBuffer["val"];
  }

  if (recieverBuffer["val"].as<JsonArray>()){
  peopleCount = recieverBuffer["val"];
  }
}
}
