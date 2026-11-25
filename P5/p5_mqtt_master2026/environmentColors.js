let maxEnvironmentColors = 12; // maximum number of colors to store in environmentColors array
let environmentColors = []; //to hold the dominant colors of the objects in the environment
let envirmentColorsSent = false; // flag to indicate if environment colors have been sent

function storeEnvironmentColors() {
    
if (environmentColors.length < maxEnvironmentColors) { //Begrænser antallet af farver i environmentColors arrayet til 12 ( det er to tredje dele af farve mønstret der er disse farver)
  environmentColors.push(dominantColor); //Gemmer dominantColor i environmentColors arrayet, så vi kan bruge den senere til at finde ud af, hvilke farver der er dominerende i miljøet
}
}

function resetEnvironmentColors() {
  environmentColors = []; // Clear the environmentColors array for the new environment
  envirmentColorsSent = false; // Reset the flag to indicate that environment colors have not been sent yet
}