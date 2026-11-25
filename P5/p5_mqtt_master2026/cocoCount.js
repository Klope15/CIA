function cocoSetup() {
  createCanvas(windowWidth, windowHeight);
  textSize(24);
  setupComparisonPalette();
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
  
  itemCount=0;  //reset counting 
  
  for (let i = 0; i < detections.length; i++) 
  {
    drawResult(detections[i]); //visualize what was detected
    findObjectColor(detections[i]); //find farven på objektet
    drawObjectColor (); //tegn objektets farve 
    storeEnvironmentColors(); //gem farven i environmentColors arrayet
    
    if (detections[i].label === itemToCount) // if the label fits what we are looking for..
    {
      itemCount=itemCount+1; // ...then add 1 to counter
    }
  
}
  
  if(itemCount != previousCount)
  {
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
