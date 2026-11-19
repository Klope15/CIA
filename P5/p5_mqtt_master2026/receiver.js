// -- HANDLE WHEN A MESSAGE ARRIVES----------------

client.on("message", modtager);

function modtager(topic, modtagetBesked) {
    let modtagerBuffer = JSON.parse(modtagetBesked);
    console.log(modtagerBuffer);
    
    let afsender = modtagerBuffer.from;
    let value = modtagerBuffer.val;
}
