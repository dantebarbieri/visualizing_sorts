//Sorts
const NONE = 0;
const SELECTION = 1;
const DOUBLE_SELECTION = 2;
const INSERTION = 3;
const BUBBLE = 4;
const ODD_EVEN = 5;
const BOGO = 6;
const BOZO = 7;
//Sound
const minFreq = 256;
const maxFreq = 1024;
//Objects
let list, sound;
//Sorting Trackers
let sort, index, baseIndex, passes, swaps;
//DOM Elements
let elementP, elementsSlider, speedP, speedSlider, algorithmButtons

const speedMax = 10;
let speed = 1;

function preload() {
  sound = new p5.Oscillator();
  sound.setType('sine');
  sound.freq(240);
  sound.amp(0);
  sound.start();
}

function setup() {
  createCanvas(windowWidth, 2 * windowHeight / 3);
  list = new Drawable_List(createOrderedList(width));
  createButton('Restart').mousePressed(restart);
  elementP = createP("Number of Elements (" + list.elements.length + "):");
  elementSlider = createSlider(2, width, width, 1);
  algorithmButtons = [];
  createP("Sorting Types:");
  algorithmButtons.push(createButton('Selection'));
  algorithmButtons.push(createButton('Double Selection'));
  algorithmButtons.push(createButton('Insertion'));
  algorithmButtons.push(createButton('Bubble'));
  algorithmButtons.push(createButton('Odd-Even'));
  algorithmButtons.push(createButton('Bogo'));
  algorithmButtons.push(createButton('Bozo'));
  algorithmButtons[SELECTION - 1].mousePressed(selection_sort);
  algorithmButtons[DOUBLE_SELECTION - 1].mousePressed(double_selection_sort);
  algorithmButtons[INSERTION - 1].mousePressed(insertion_sort);
  algorithmButtons[BUBBLE - 1].mousePressed(bubble_sort);
  algorithmButtons[ODD_EVEN - 1].mousePressed(odd_even_sort);
  algorithmButtons[BOGO - 1].mousePressed(bogo_sort);
  algorithmButtons[BOZO - 1].mousePressed(bozo_sort);
  speedP = createP("Speed ():")
  speedSlider = createSlider(1, width);
  colorMode(HSB);
  index = 0;
  swaps = 0;
  passes = 0;
  sort = NONE;
  // frameRate(1);
}

function draw() {
  if (elementSlider.value() == list.elements.length)
    elementP.html("Number of Elements (" + list.elements.length + "):");
  else
    elementP.html("Number of Elements (" + list.elements.length + "->" + elementSlider.value() + "):");
  speedP.html("Speed (" + speed + "):");
  background(0);
  list.show();
  speed = speedSlider.value();
  switch (sort) {
    case SELECTION:
      for (let i = 0; i < speed; i++) {
        if (index < list.elements.length) {
          sound.amp(1);
          if (index < list.elements.length - 1) {
            list.swap(index, minIndex(list.elements, index));
          }
          index++;
          sound.freq(map(index, 0, list.elements.length - 1, minFreq, maxFreq));
        } else {
          passes = 1;
          sound.amp(0);
        }
      }
      break;
    case DOUBLE_SELECTION:
      for (let i = 0; i < speed; i++)
        if (index < (list.elements.length + 1) / 2) {
          sound.amp(1);
          list.swap(list.elements.length - 1 - index, int(maxIndex(list.elements, index, list.elements.length - index)));
          list.swap(index, int(minIndex(list.elements, index++)));
          sound.freq(map(index, 0, list.elements.length - 1, minFreq, maxFreq));
        } else {
          passes = 1;
          sound.amp(0);
        }
      break;
    case INSERTION:
      for (let i = 0; i < speed; i++)
        if (index < list.elements.length) {
          sound.amp(1);
          for (let j = index++; j > 0; j--)
            if (list.elements[j - 1] > list.elements[j]) {
              list.swap(j - 1, j);
            }
          sound.freq(map(index, 0, list.elements.length - 1, minFreq, maxFreq));
        } else {
          passes = 1;
          sound.amp(0);
        }
      break;
    case ODD_EVEN:
      if (!list.sorted()) {
        sound.amp(1);
        for (let i = 0; i < speed; i++) {
          if (index < list.elements.length - 1) {
            if (list.elements[index] > list.elements[index + 1]) {
              list.swap(index, index + 1);
            }
          }
          if (index >= list.elements.length) {
            index = 1;
            passes++;
          } else index += 2;
          sound.freq(map(index, 0, list.elements.length - 1, minFreq, maxFreq));
          if (index < list.elements.length - 1) {
            if (list.elements[index] > list.elements[index + 1]) {
              list.swap(index, index + 1);
            }
          }
          if (index >= list.elements.length) {
            index = 0;
            passes++;
          } else index += 2;
          sound.freq(map(index, 0, list.elements.length - 1, minFreq, maxFreq));
        }
      } else {
        sound.amp(0);
      }
      break;
    case BUBBLE:
      if (!list.sorted()) {
        sound.amp(1);
        for (let i = 0; i < speed; i++) {
          if (index < list.elements.length - 1) {
            if (list.elements[index] > list.elements[index + 1]) {
              list.swap(index, index + 1);
              // list.swap(index, minIndex(list.elements, index + 1));
            }
          }
          if (index >= list.elements.length - 1 - passes) {
            index = 0;
            passes++;
          } else index++;
          sound.freq(map(index, 0, list.elements.length - 1, minFreq, maxFreq));
        }
      } else sound.amp(0);
      break;
    case BOGO:
      for (let i = 0; i < speed; i++) {
        sound.amp(1);
        if (!list.sorted()) {
          list.elements = shuffle(list.elements);
          index = int(random(list.elements.length));
          sound.freq(map(index, 0, list.elements.length - 1, minFreq, maxFreq));
        } else {
          sound.amp(0);
        }
      }
      break;
    case BOZO:
      for (let i = 0; i < speed; i++) {
        sound.amp(1);
        if (!list.sorted()) {
          index = int(random(list.elements.length));
          list.swap(index, int(random(list.elements.length)));
          sound.freq(map(index, 0, list.elements.length - 1, minFreq, maxFreq));
        } else {
          sound.amp(0);
        }
      }
      break;
  }
}

function restart() {
  sort = NONE;
  list = new Drawable_List(createOrderedList(elementSlider.value()));
  sound.amp(0);
  index = baseIndex;
  swaps = 0;
  passes = 0;
}

function createOrderedList(len) {
  l = [];
  for (let i = 0; i < len; i++) {
    l.push(i);
  }
  return shuffle(l);
}

function shuffle(l) {
  if (l instanceof Array) {
    for (let i = 0; i < l.length * l.length; i++) {
      let i_0 = int(random(l.length));
      let i_1 = int(random(l.length));
      let temp = l[i_0];
      l[i_0] = l[i_1];
      l[i_1] = temp;
    }
    return l;
  }
  return null;
}

function minArray(ls, mindex, maxdex = ls.length) {
  return min(ls.slice(mindex, maxdex));
}

function maxArray(ls, mindex, maxdex = ls.length) {
  return max(ls.slice(mindex, maxdex));
}

function minIndex(ls, mindex, maxdex = ls.length) {
  return ls.indexOf(minArray(ls, mindex, maxdex));
}

function maxIndex(ls, mindex, maxdex = ls.length) {
  return ls.indexOf(maxArray(ls, mindex, maxdex));
}

function selection_sort() {
  baseIndex = 0;
  restart();
  speedSlider.remove();
  speedSlider = createSlider(1, list.elements.length / 10, 1, 1);
  sort = SELECTION;
}

function double_selection_sort() {
  baseIndex = 0;
  restart();
  speedSlider.remove();
  speedSlider = createSlider(1, list.elements.length / 5, 1, 1);
  sort = DOUBLE_SELECTION;
}

function insertion_sort() {
  baseIndex = 1;
  restart();
  speedSlider.remove();
  speedSlider = createSlider(1, list.elements.length / 10, 1, 1);
  sort = INSERTION;
}

function bubble_sort() {
  baseIndex = 0;
  restart();
  speedSlider.remove();
  speedSlider = createSlider(1, list.elements.length, 1, 1);
  sort = BUBBLE;
}

function odd_even_sort() {
  baseIndex = 0;
  restart();
  speedSlider.remove();
  speedSlider = createSlider(1, list.elements.length, 1, 1);
  sort = ODD_EVEN;
}

function bogo_sort() {
  baseIndex = 0;
  restart();
  speedSlider.remove();
  speedSlider = createSlider(1, 25, 1, 1);
  sort = BOGO;
}

function bozo_sort() {
  baseIndex = 0;
  restart();
  speedSlider.remove();
  speedSlider = createSlider(1, list.elements.length / 10, 1, 1);
  sort = BOZO;
}