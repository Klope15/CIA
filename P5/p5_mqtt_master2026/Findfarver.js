//variables for the grid
let gridSize = 100; 
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

//variables for color comparison and voting
let paletteVotes = [];
let dominantColor = 0;
let comparisonPalette =[]; // array to hold the colors we want to compare against

//variables for storing dominatcolors 
let environmentColors = []; //to hold the dominant colors of the objects in the environment

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

function setupComparisonPalette() {
  comparisonPalette = [
// red colors
color(245, 66, 144), // intense pink
color(252, 131, 61), // intense orange
color(245, 66, 66), // intense red
color (235, 103, 101), // light red 

//green colors 
color(66, 245, 135), // intense green
color(78, 150, 74), // dark green
color(245, 245, 66), // intense yellow
color(237, 232, 154), // light yellow

//blue colors 
color(66, 135, 245), // intense blue 
color(134, 219, 252), // clear light blue 
color(224, 121, 237), // intense purple
color(14, 37, 110) // dark blue
  ];
}

function colorDistance(c1, c2) { //funktion til at finde afstanden mellem to farver
  let rDifference = red(c1) - red(c2); 
  let gDifference = green(c1) - green(c2);
  let bDifference = blue(c1) - blue(c2);
  let totalColorDifference = sqrt(rDifference * rDifference + gDifference * gDifference + bDifference * bDifference); // tager summen af forskellen mellem de 3 farver og finder kvadratroden af summen
  return totalColorDifference;
}

function findObjectColor(object) {
  //find out the point in the middle of the object 
objectCenterX = object.x + object.width/2;
objectCenterY = object.y + object.height/2;
objectCenterPoint = video.get(objectCenterX, objectCenterY); // punktet i midten af objektet (UNDERSØG OM VI SKAL BRUGE DENNE TIL NOGET)
//find out the column and row of the grid where the object is located
objectColumn = floor(objectCenterX/gridSize); //kolonne i grid
objectRow = floor(objectCenterY/gridSize); //række i grid
paletteVotes = new Array(comparisonPalette.length).fill(0); // Nulstil stemmer for dette objekt (1 nul pr. farve i comparisonPalette)
let sampleStep = 15; // hvor tæt vi måler pixels inde i objektet


/* DET GAMLE LOOP MED GENNEMSNITSFARVEN 
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
*/
//løb hen over farven for hver 10ende pixel i gridet og find gennemsnitsfarven for objektet
for(let x = object.x; x < object.x + object.width; x += sampleStep) {
  for(let y = object.y; y < object.y + object.height; y += sampleStep) {
    let currentPixelColor = video.get(x, y);

    let shortestDistance = Infinity; //sætter den korteste afstand til uendelig, så vi kan finde den korteste afstand i loopet
    let closestPalette = 0;

    for (let i = 0; i < comparisonPalette.length; i++) { //kører igennem alle farver i comparisonPalette
      let distanceToPaletteColor = colorDistance(currentPixelColor, comparisonPalette[i]); //Bruger vores colorDistance funktion til at finde afstanden mellem currntPixelColor og farven i comparisonPalette og gemmer værdien i en variabel
      if (distanceToPaletteColor < shortestDistance) { //Hvis farven er mindre end den korteste afstand gemmes denne farve som den korteste afstand
        shortestDistance = distanceToPaletteColor;
        closestPalette = i; //Sætter closestPalette til at pege pp den plads med kortest afstand, så vi ved hvilken plads i paletteVotes der skal have +1 stemme
      }
    }
    paletteVotes[closestPalette]++; //Når vi har fundet den farve i comparisonPalette, der er tættest på currentPixelColor, øger vi stemmerne for den farve med 1
  }
}
// Find den farve i paletten, der har fået flest stemmer
let highestVoteCount = -1; 
let winningPaletteIndex = 0; 

for (let i = 0; i < paletteVotes.length; i++) { //Går igennem alle stemmerne i paletteVotes og finder den farve, der har fået flest stemmer
  if (paletteVotes[i] > highestVoteCount) { //Hvis stemmerne for farven er højere end den højeste stemme, gemmes denne farve som den højeste stemme
    highestVoteCount = paletteVotes[i];
    winningPaletteIndex = i; //sætter winningPaletteIndex til at pege på den farve i comparisonPalette, der har fået flest stemmer, så vi ved hvilken farve, der skal gemmes som dominantColor
  }
}
dominantColor = comparisonPalette[winningPaletteIndex]; //Gemmer den farve i comparisonPalette, der har fået flest stemmer som dominantColor
environmentColors.push(dominantColor); //Gemmer dominantColor i environmentColors arrayet, så vi kan bruge den senere til at finde ud af, hvilke farver der er dominerende i miljøet
}

/*if (pixelCounter > 0) {
  objectColorAverage = color(colorTotalR / pixelCounter, colorTotalG / pixelCounter, colorTotalB / pixelCounter);
}
}
*/


function drawObjectColor () {
//draw the color of the object 
fill(dominantColor); 
stroke(0);
circle(objectCenterX, objectCenterY, 20);
}

