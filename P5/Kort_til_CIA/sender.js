// -- HANDLE WHEN YOU SEND A MESSAGE----------------


function sender(x) {
  // Tjek om x er et array (farverne) eller et tal (itemCount)
  if (Array.isArray(x)) {
    console.log("-> SENDER FARVE-ARRAY TIL ARDUINO:", x);
  } else {
    console.log("-> SENDER ITEMCOUNT TIL ARDUINO:", x);
  }

  let besked = {
    from: afsenderID, 
    val: x
  };
  
  client.publish(topic, JSON.stringify(besked));
}