let maxEnvironmentColors = 12; // maximum number of colors to store in environmentColors array

function 

function storeEnvironmentColors() {

    dominantColor = comparisonPalette[winningPaletteIndex]; //Gemmer den farve i comparisonPalette, der har fået flest stemmer som dominantColor
if (environmentColors.length < maxEnvironmentColors) { //Begrænser antallet af farver i environmentColors arrayet til 12 ( det er to tredje dele af farve mønstret der er disse farver)
  environmentColors.push(dominantColor); //Gemmer dominantColor i environmentColors arrayet, så vi kan bruge den senere til at finde ud af, hvilke farver der er dominerende i miljøet
}
}