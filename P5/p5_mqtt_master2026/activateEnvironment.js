
function activateEnvironment(environmentName) {

    activeEnvironment = environmentName; // Set the active environment to the current environment
  // Check if the environment is already active
  if (activeEnvironment) {
    console.log(environmentName + " is already active.");
    return;
  }
}