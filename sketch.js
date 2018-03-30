//Sound
const minFreq = 256;
const maxFreq = 1024;
//Objects
let list, sound;
//Sorting Trackers
let index, passes, swaps;
//Menu Data
let menu, speedMode, speed, speedMax;

function preload() {
  sound = new p5.Oscillator();
  sound.setType('sine');
  sound.freq(240);
  sound.amp(0);
  sound.start();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  colorMode(HSB);
}

function draw() {

}