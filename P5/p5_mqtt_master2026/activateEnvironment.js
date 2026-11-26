let activeEnvironment = null;

function chooseEnvironment (){
  /*if (vi trykker på fields tegningen) {
    activateEnvironment(Fields);
  }
  else if (vi trykker på grønningen tegningen) {
    activateEnvironment(Grønningen);
  }
  else if(vi trykker på busstopstedet tegningen) {
  activateEnvironment(Budsstopstedet);
  }*/
}
function activateEnvironment(environmentName) {

  // start kun activeEnvironment, hvis det er et andet environment
  if (activeEnvironment == environmentName) {
    return;
  }
  //aktiver det nye environment 
    activeEnvironment = environmentName; // Set the active environment to the current environment
    
    detections = []; // Clear the detections array for the new environment
    //add envirorment colors 
    resetEnvironmentColors(); // Reset the environment colors for the new environment
    // envirormentsound(environmentName) add envirorment sound og aktiver given højtaler 
    // envirormentcamera(environmentName) add aktivering af givene kamera 
    // add envirorment sound og aktiver given højtaler 
    // add aktivering af givene kamera 
    
    console.log(environmentName + " is active.");
  
  }



