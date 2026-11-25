function (activateEnvironment) {

    activeEnvironment = environmentName; // Set the active environment to the current environment
  // Check if the environment is already active
  if (activateEnvironment) {
    console.log(environmentName + " is already active.");
    return;
  }