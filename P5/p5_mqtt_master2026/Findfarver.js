let comparisonPalette =[]; // array to hold the colors we want to compare against (the colors we want to show in the leds)
let detectedColors = []; // array to hold the colors detected in the environment

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

function findEnvironmentColors() {
 //tjekker om vi allerede har fundet 12 farver, hvis ja, så gør vi ikke mere
  if (detectedColors.length === maxEnvironmentColors) {
    return; 
  }

  // lader videoen loade og giver den 10 sekunder til at starte op, før vi begynder at finde farver
  if (millis() < 10000) {
    return; 
  }
  detectedColors = []; // Nulstil arrayet

  //Kør 12 gange for at få 12 tilfældige punkter
  for (let i = 0; i < 12; i++) { //køre igennem 12 gange, så vi får 12 forskellige punkter at tage farver fra
    let sampleX = floor(random(video.width)); //tager en random x-værdi
    let sampleY = floor(random(video.height)); //tager en random y-værdi
    
    //finder farven på de valgte 12 punkter
    let currentPixelColor = video.get(sampleX, sampleY);

    let shortestDistance = Infinity; //sætter den til uendelig stor, så vi kan finde den korteste afstand til en farve i comparisonPalette
    let closestPaletteIndex = 0; 

    //sammenligner den fundet farve med de farver vi har i comparisonPalette, for at finde den farve der er tættest på. Gøres for alle 12 punkter, så vi får 12 farver der er tættest på de farver vi har i comparisonPalette
    for (let j = 0; j < comparisonPalette.length; j++) {
      let distanceToPaletteColor = colorDistance(currentPixelColor, comparisonPalette[j]); //bruger vores colorDistance funktion til at finde afstanden mellem den fundet farve og de farver vi har i comparisonPalette
      if (distanceToPaletteColor < shortestDistance) { //hvis afstanden er kortere end den korteste afstand vi har fundet indtil nu, så opdaterer vi den korteste afstand og den tætteste farve
        shortestDistance = distanceToPaletteColor; //sætter shortestDistance til den nye korteste afstand
        closestPaletteIndex = j; //gemmer hvilken plads i comparisonPalette den tætteste farve er på, så vi  senere kan  gemme den i detectedColors 
      }
    }
    
    // tilføjer den tætteste farve i comparisonPalette til detectedColors
    detectedColors.push(comparisonPalette[closestPaletteIndex]);
  }
}

function drawDetectedColors() { //får at vi kan se hvilke farver der er gemt, tegner vi 12 firkanter i toppen med farverne fra arrayet.
  let boxWidth = width / 12; 
  for (let i = 0; i < detectedColors.length; i++) {
    fill(detectedColors[i]);
    stroke(0);
    strokeWeight(1);
    rect(i * boxWidth, 0, boxWidth, 40); 
  }
}
