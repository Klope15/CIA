function cocoSetup() {
  textSize(24);
  setupComparisonPalette();
 
  detector = ml5.objectDetector("cocossd", () => { // only start detection when the model is ready
    detectorReady = true;
  });

  var constraints = {
    video: {
      facingMode: "environment"
    },
    audio: false
  }
  video = createCapture(constraints);
  
  video.size(640, 480);
  video.hide();
}

function cocoDraw() {
  image(video, 0, 0, windowWidth, windowHeight);
  findEnvironmentColors();  //Function on findfarver.js, that finds and stores the 12 colors in detectedColors array
  drawDetectedColors();     //Function on findfarver.js, that draws the detected colors in the top 
  storeEnvironmentColors(); //Function on environmentColors.js, that stores the 12 colors in environmentColors array
  sendEnvironmentColors();  //Function on environmentColors.js, that sends the 12 colors to the arduino, if they have not been sent yet
  itemCount=0;  //reset counting 

  for (let i = 0; i < detections.length; i++) 
  {
    drawResult(detections[i]); //visualize what was detected
    if (detections[i].label === itemToCount) // if the label fits what we are looking for..
    {
      itemCount=itemCount+1; // ...then add 1 to counter
    }
}
  
  if(itemCount != previousCount){
    previousCount =itemCount;
    console.log(itemCount);
    sender(itemCount);
  }

  text(itemCount,20,20);
  detect(); //do detection
} 

// Callback function called when objects are detected
function onDetected(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  detections = results;
  //detect(); // do detection again (er rykket her for at se om det ville gøre at den ikke køre og tjekker heletiden);
}

function detect() {
  if (!detectorReady || !video || !video.elt || video.elt.readyState < 2) { //Spring detektion over, indtil modellen og kamera-streamet er klar.
    return;
  }
  detector.detect(video, onDetected);
}

//---VISUALIZATION FUNCTIONS
function drawResult(object) {
  drawBoundingBox(object);
  drawLabel(object);
}
function drawBoundingBox(object) {
  stroke('green');
  strokeWeight(2);
  noFill();
  rect(object.x, object.y, object.width, object.height);
}
function drawLabel(object) {
  noStroke();
  fill('green');
  text(object.label, object.x + 10, object.y + 24);  
}
//---END OF VISUALIZATION
