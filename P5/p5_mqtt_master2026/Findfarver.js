let gridSize = 5; 

function findFarverSetup () {
//TEGN GRID 

for(let x=0; x<windowWidth; x+=gridSize) { //rækker vandret 
  for(let y=0; y<windowHeight; y+=gridSize) { //rækker lodret 
    stroke(255);
    strokeWeight(1);
    noFill();
    rect(x,y,gridSize,gridSize);
  }
}
}

