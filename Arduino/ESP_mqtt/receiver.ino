void modtager(String &topic, String &indhold) 
{
  delay(100);
  deserializeJson(recieverBuffer,indhold);
  String afsender = recieverBuffer["from"];
  
    if(afsender = "ESP1"){
    Red = recieverBuffer["val"];
  }

  if(afsender = "ESP2"){
    Blue = recieverBuffer["val"];
  }

  if(afsender = "ESP3"){
    Green = recieverBuffer["val"];
  }
 
}
