// preload coco 
function preload() {
  detector = ml5.objectDetector('cocossd');
}
const topic = "bænk";
const afsenderID = "Camera1";
let video; 
let detector; 
let detections = []; 
let itemCount=0;
let previousCount=0;
let itemToCount="person"; //you can change this into any of the 80 object-types
// here coco preload ends 

function setup() {
  cocoSetup(); 
}

function draw() {
 cocoDraw();
 sender(itemCount);
} 


