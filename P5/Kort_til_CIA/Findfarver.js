let comparisonPalette =[]; // array to hold the colors we want to compare against (the colors we want to show in the leds)
let detectedColors = []; // array to hold the colors detected in the environment

function setupComparisonPalette() {
  comparisonPalette = [
  [ 10,  70, 255], // Klar himmel – lys blå
  [  0,  10, 255], // Dybt hav – kraftig blå
  [  0, 140, 170], // Fjord – turkis
  [  0, 255,  70], // Havgrøn – frisk mint
  [  5, 220,  10], // Græs – klar grøn
  [  0,  90,   8], // Skov – dyb grøn
  [255,  30,   0], // Solnedgang – orange
  [180,  12,   2], // Teglsten – varm rødbrun
  [255,   0,  40], // Rose – stærk pink
  [110,  40, 255], // Lyng – blød lilla
  [ 60,   0, 255], // Skumring – violet
  [ 10,   0, 120], // Nattehimmel – dyb indigo
]
}

function colorDistance(c1, c2) { //funktion til at finde afstanden mellem to farver
  let rDifference = red(c1) - red(c2); 
  let gDifference = green(c1) - green(c2);
  let bDifference = blue(c1) - blue(c2);
  let totalColorDifference = sqrt(rDifference * rDifference + gDifference * gDifference + bDifference * bDifference); // tager summen af forskellen mellem de 3 farver og finder kvadratroden af summen
  return totalColorDifference;
}

function findEnvironmentColors() {
 //tjekker om vi allerede har fundet 18 farver, hvis ja, så gør vi ikke mere
  if (detectedColors.length === maxEnvironmentColors) {
    return; 
  }

  // lader videoen loade og giver den 10 sekunder til at starte op, før vi begynder at finde farver
  if (millis() < 10000) {
    return; 
  }
  detectedColors = []; // Nulstil arrayet

  //Kør 12 gange for at få 12 tilfældige punkter
  for (let i = 0; i < maxEnvironmentColors ; i++) { //køre igennem 12 gange, så vi får 12 forskellige punkter at tage farver fra
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
  let boxWidth = width / maxEnvironmentColors; 
  for (let i = 0; i < detectedColors.length; i++) {
    fill(detectedColors[i]);
    stroke(0);
    strokeWeight(1);
    rect(i * boxWidth, 0, boxWidth, 40); 
  }
}
