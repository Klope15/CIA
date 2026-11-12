void modtager(String &topic, String &indhold) 
{
  deserializeJson(recieverBuffer,indhold);
  String afsender = recieverBuffer["from"];
  value = recieverBuffer["val"];
  Serial.println(value);
  //do something with the value... eg change a global value
 
}
