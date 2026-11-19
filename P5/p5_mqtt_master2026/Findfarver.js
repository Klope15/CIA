//variables for the grid
let gridSize = 50; 
//variables of the object in the grid
let objectCenterX; 
let objectCenterY;
let objectCenterPoint
let objectColumn; 
let objectRow; 
//variable to hold the total color of the object in the grid
let colorTotalR = 0; // for at holde den generelle røde farve 
let colorTotalG = 0; // for at holde den generelle grønne farve
let colorTotalB = 0; // for at holde den generelle blå farve
let pixelCounter = 0; // for at holde styr på hvor mange pixels der er blevet talt med i gennemsnittet(+10 pix for hver omgang i loopet)
let objectColorAverage; // for at holde den gennemsnitlige farve af objektet i gridet

function drawGrid () {
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

function findObjectColor(object) {
  //find out the point in the middle of the object 
objectCenterX = object.x + object.width/2;
objectCenterY = object.y + object.height/2;
objectCenterPoint = video.get(objectCenterX, objectCenterY); // punktet i midten af objektet (UNDERSØG OM VI SKAL BRUGE DENNE TIL NOGET)
//find out the column and row of the grid where the object is located
objectColumn = floor(objectCenterX/gridSize); //kolonne i grid
objectRow = floor(objectCenterY/gridSize); //række i grid

//løb hen over farven for hver 10ende pixel i gridet og find gennemsnitsfarven for objektet
for(let x = object.x; x < object.x + object.width; x += gridSize) {
  for(let y = object.y; y < object.y + object.height; y += gridSize) {
    let pixelColor = video.get(x, y);
    colorTotalR += red(pixelColor);
    colorTotalG += green(pixelColor);
    colorTotalB += blue(pixelColor);
    pixelCounter++;
  }
}

if (pixelCounter > 0) {
  objectColorAverage = color(colorTotalR / pixelCounter, colorTotalG / pixelCounter, colorTotalB / pixelCounter);
}
}

function drawObjectColor () {
//draw the color of the object 
fill(objectColorAverage); 
stroke(0);
circle(objectCenterX, objectCenterY, 20);
}

