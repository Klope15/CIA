function cocoSetup() {
  createCanvas(640, 480);
  textSize(24);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
}


function cocoDraw() {
  image(video, 0, 0);
  
  itemCount=0;  //reset counting 
  
  for (let i = 0; i < detections.length; i++) 
  {
    drawResult(detections[i]); //visualize what was detected
    
    if (detections[i].label === itemToCount) // if the label fits what we are looking for..
    {
      itemCount=itemCount+1; // ...then add 1 to counter
    }
  
}
  
  if(itemCount != previousCount)
  {
    previousCount =itemCount;
    console.log(itemCount);
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
