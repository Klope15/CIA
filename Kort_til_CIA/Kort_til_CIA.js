// Leaflet tegner kortet. p5.js tegner punkterne ovenpå


// --------------------------------------------
//  FÆLLES VARIABLER
// --------------------------------------------

let kort;        // selve kortet
let valgt = 0;   // hvilket punkt er der klikket på? 0 = ingen, 1, 2 eller 3
let theta = 0;

// --------------------------------------------
//  PUNKT 1
// --------------------------------------------

// rettelser til punkt 1:
let punkt1_navn      = "Grønningen";
let punkt1_tekst     = "x.";
let punkt1_lat       = 55.66027925893464;   
let punkt1_lon       = 12.587983317621767;
let punkt1_farve     = "red";      // fx "red", "blue" eller "#ff8800"
let punkt1_storrelse = 28;         // størrelse i pixels
let punkt1_billedfil = "";         // fx "ikon1.png". Tom = brug cirkel

let punkt1_billede;                // her gemmes billedet, når det er hentet

// Henter billedet til punkt 1 (hvis du har skrevet et filnavn)
function hentBilledePunkt1() {
  if (punkt1_billedfil != "") {
    loadImage(punkt1_billedfil, function (billede) {
      punkt1_billede = billede;
    });
  }
}

// Tegner punkt 1 på kortet
function tegnPunkt1() {
  // lat/lon bliver lavet om til x og y på skærmen
  let pos = kort.latLngToContainerPoint([punkt1_lat, punkt1_lon]);
  punkt1_storrelse = 28+punkt1_storrelse*sin(theta)*0.3
  theta = theta+0.05

  if (punkt1_billede) {
    // Der er et billede: tegn det

    image(punkt1_billede, pos.x, pos.y, punkt1_storrelse, punkt1_storrelse);
  } else {
    // Ellers: tegn en cirkel
    fill(punkt1_farve);
    stroke("white");
    strokeWeight(3);
    circle(pos.x, pos.y, punkt1_storrelse);
  }

  // Vis tekstboksen, hvis punkt 1 er valgt
  if (valgt == 1) {
    tegnInfoboks(punkt1_navn, punkt1_tekst, pos.x, pos.y);
  }
}

// Tjekker om der blev klikket på punkt 1
function klikPunkt1(musX, musY) {
  let pos = kort.latLngToContainerPoint([punkt1_lat, punkt1_lon]);
  let afstand = dist(musX, musY, pos.x, pos.y);

  if (afstand < punkt1_storrelse / 2) {
    valgt = 1;
  }
}


// --------------------------------------------
//  PUNKT 2
// --------------------------------------------

// rettelser til punkt 2:
let punkt2_navn      = "Fields";
let punkt2_tekst     = "x.";
let punkt2_lat       = 55.63011694619102;
let punkt2_lon       = 12.576139744157004;
let punkt2_farve     = "blue";
let punkt2_storrelse = 28;
let punkt2_billedfil = "";

let punkt2_billede;

// Henter billedet til punkt 2 (hvis du har skrevet et filnavn)
function hentBilledePunkt2() {
  if (punkt2_billedfil != "") {
    loadImage(punkt2_billedfil, function (billede) {
      punkt2_billede = billede;
    });
  }
}

// Tegner punkt 2 på kortet
function tegnPunkt2() {
  let pos = kort.latLngToContainerPoint([punkt2_lat, punkt2_lon]);

  if (punkt2_billede) {
    image(punkt2_billede, pos.x, pos.y, punkt2_storrelse, punkt2_storrelse);
  } else {
    fill(punkt2_farve);
    stroke("white");
    strokeWeight(3);
    circle(pos.x, pos.y, punkt2_storrelse);
  }

  if (valgt == 2) {
    tegnInfoboks(punkt2_navn, punkt2_tekst, pos.x, pos.y);
  }
}

// Tjekker om der blev klikket på punkt 2
function klikPunkt2(musX, musY) {
  let pos = kort.latLngToContainerPoint([punkt2_lat, punkt2_lon]);
  let afstand = dist(musX, musY, pos.x, pos.y);

  if (afstand < punkt2_storrelse / 2) {
    valgt = 2;
  }
}


// --------------------------------------------
//  PUNKT 3
// --------------------------------------------

// rettelser til punkt 3:
let punkt3_navn      = "DR Byen St.";
let punkt3_tekst     = "Metrostation";
let punkt3_lat       = 55.6557;
let punkt3_lon       = 12.5892;
let punkt3_farve     = "green";
let punkt3_storrelse = 28;
let punkt3_billedfil = "";

let punkt3_billede;

// Henter billedet til punkt 3 (hvis du har skrevet et filnavn)
function hentBilledePunkt3() {
  if (punkt3_billedfil != "") {
    loadImage(punkt3_billedfil, function (billede) {
      punkt3_billede = billede;
    });
  }
}

// Tegner punkt 3 på kortet
function tegnPunkt3() {
  let pos = kort.latLngToContainerPoint([punkt3_lat, punkt3_lon]);

  if (punkt3_billede) {
    image(punkt3_billede, pos.x, pos.y, punkt3_storrelse, punkt3_storrelse);
  } else {
    fill(punkt3_farve);
    stroke("white");
    strokeWeight(3);
    circle(pos.x, pos.y, punkt3_storrelse);
  }

  if (valgt == 3) {
    tegnInfoboks(punkt3_navn, punkt3_tekst, pos.x, pos.y);
  }
}

// Tjekker om der blev klikket på punkt 3
function klikPunkt3(musX, musY) {
  let pos = kort.latLngToContainerPoint([punkt3_lat, punkt3_lon]);
  let afstand = dist(musX, musY, pos.x, pos.y);

  if (afstand < punkt3_storrelse / 2) {
    valgt = 3;
  }
}


// --------------------------------------------
//  SETUP 
// --------------------------------------------

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent("holder");   // læg canvasset oven på kortet
  imageMode(CENTER);         // billeder tegnes ud fra deres midte

// --------------------------------------------
// Lav kortet
// --------------------------------------------
  kort = L.map("kort", {
    center: [55.658, 12.590],                       // hvor kortet starter
    zoom: 16,                                       // startzoom
    minZoom: 14,                                    // længst ude
    maxZoom: 19,                                    // længst inde
    maxBounds:[[55.622, 12.550], [55.668, 12.625]], // området man kan være i
    maxBoundsViscosity: 1                           // kortet stopper ved kanten
  });

  // Hent kortbillederne fra CARTO (det sidste i linket er din nøgle)
  L.tileLayer("https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=cb1_5a82_1_0800b9d2932aa7dcc04213ed", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO"
  }).addTo(kort);

  // Når der klikkes på kortet, skal funktionen klikPaaKort køre
  kort.on("click", klikPaaKort);

  // Hent billeder til punkterne (hvis der er skrevet filnavne)
  hentBilledePunkt1();
  hentBilledePunkt2();
  hentBilledePunkt3();
}


// --------------------------------------------
//  DRAW (kører hele tiden)
// --------------------------------------------

function draw() {
  clear();   // gør canvasset gennemsigtigt, så man kan se kortet

  tegnPunkt1();
  tegnPunkt2();
  tegnPunkt3();
}


// --------------------------------------------
//  KLIK PÅ KORTET
// --------------------------------------------

function klikPaaKort(klik) {
  // Hvor på skærmen blev der klikket?
  let musX = klik.containerPoint.x;
  let musY = klik.containerPoint.y;

  valgt = 0;   // start med at intet er valgt

  klikPunkt1(musX, musY);
  klikPunkt2(musX, musY);
  klikPunkt3(musX, musY);
}


// --------------------------------------------
//  INFOBOKS (den hvide boks med navn og tekst, lige over punktet)
// --------------------------------------------

function tegnInfoboks(navn, tekst, x, y) {
  // Boksen placeres lige over punktet (x, y)
  let boksX = x - 160;
  let boksY = y - 110;

  // Hold boksen inde på canvasset
  boksX = constrain(boksX, 5, width - 325);
  boksY = constrain(boksY, 5, height - 85);

  // Hvid boks
  fill("white");
  noStroke();
  rect(boksX, boksY, 320, 80, 8);

  // Navn
  fill("black");
  textSize(18);
  text(navn, boksX + 12, boksY + 30);

  // Tekst
  textSize(14);
  text(tekst, boksX + 12, boksY + 56);
}
