// -- HANDLE WHEN A MESSAGE ARRIVES----------------

client.on("message", modtager);

function modtager(topic, modtagetBesked) {
    let modtagerBuffer = JSON.parse(modtagetBesked);
    console.log(modtagerBuffer);

    
    let afsender = modtagerBuffer.from;
    let value = modtagerBuffer.val;

    if (afsender == "esp1") {
        esp1Active = value;
    }

    if (afsender == "esp2") {
        esp2Active = value;
    }

    if (afsender == "esp3") {
        esp3Active = value;
    }
}
