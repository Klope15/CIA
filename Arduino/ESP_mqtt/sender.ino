void sender(int x)
{
  senderBuffer["from"]=senderID;
  senderBuffer["val"]=x;
  String JSONbesked;
  serializeJson(senderBuffer, JSONbesked);
  client.publish(topic, JSONbesked);
  delay(100); 
}
