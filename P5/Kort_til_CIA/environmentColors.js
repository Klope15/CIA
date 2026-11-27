let maxEnvironmentColors = 12; // maximum number of colors to store in environmentColors array
let environmentColors = []; //to hold the dominant colors of the objects in the environment
let environmentColorsSent = false; //to indicate if environment colors have been sent

function storeEnvironmentColors() {
  //Makes sure we only store colors if environmentColors is empty, and we have exactly 12 new colors ready in detectedColors:
  if (environmentColors.length === 0 && detectedColors.length === maxEnvironmentColors) {
    environmentColors = [...detectedColors]; //stores the detected colors into environmentColors
    
    //printing the colors we want to send to the arduino
    console.log("the 12 colors sendt to the arduino:");
    for (let i = 0; i < environmentColors.length; i++) {
      let c = environmentColors[i];
      console.log(`Farve ${i+1}: R=${red(c)}, G=${green(c)}, B=${blue(c)}`);
    }
  }
}

function resetEnvironmentColors() {
  environmentColors = []; // Clear the environmentColors array for the new environment
  detectedColors = []; // Clear the detectedColors array for the new environment
  environmentColorsSent = false; // Reset to indicate that environment colors have not been sent yet
}
function sendEnvironmentColors() {
  if (environmentColors.length === maxEnvironmentColors && !environmentColorsSent) {
  environmentColorsSent= true;
  console.log("Sender 12 farver:", environmentColors);
  sender(environmentColors);
}
}