//Sorts
const NONE = 0;
const SELECTION = 1;
const DOUBLE_SELECTION = 2;
const INSERTION = 3;
const BUBBLE = 4;
// const ODD_EVEN = 5;
const BOGO = 5;
const BOZO = 6;
const RADIX = 7;
//Sound
const minFreq = 440;
const maxFreq = 880;
//Objects
let list, sound;
//Sorting Trackers
let sort, radix, index, baseIndex, passes, swaps;
//DOM Elements
let elementP, elementsSlider, speedP, speedSlider, volumeP, volumeSlider, algorithmButtons
//Speed
const speedMax = 10;
let speed = 1;
//Volume
const volumeMin = 1;
const volumeMax = 2;
let volume = 0.05;

let log2

function preload() {
  sound = new p5.Oscillator();
  sound.setType('sine');
  sound.freq(220);
  sound.amp(0);
  sound.start();
}

function setup() {
  createCanvas(windowWidth, 2 * windowHeight / 3);
  list = new Drawable_List(createOrderedList(width));
  createButton('Restart').mousePressed(restart).style('border-radius', '12px');
  elementP = createP("Number of Elements (" + list.elements.length + "):");
  elementP.style('margin', '0px');
  elementP.style('color', '#dddddd');
  elementSlider = createSlider(2, width, width, 1);
  elementSlider.style('width', (249 * width / 250) + 'px');
  algorithmButtons = [];
  createP("Sorting Types:").style('margin', '0px').style('color', '#dddddd');
  algorithmButtons.push(createButton('Selection'));
  algorithmButtons.push(createButton('Double Selection'));
  algorithmButtons.push(createButton('Insertion'));
  algorithmButtons.push(createButton('Bubble'));
  // algorithmButtons.push(createButton('Odd-Even'));
  algorithmButtons.push(createButton('Bogo'));
  algorithmButtons.push(createButton('Bozo'));
  algorithmButtons[SELECTION - 1].mousePressed(selection_sort);
  algorithmButtons[DOUBLE_SELECTION - 1].mousePressed(double_selection_sort);
  algorithmButtons[INSERTION - 1].mousePressed(insertion_sort);
  algorithmButtons[BUBBLE - 1].mousePressed(bubble_sort);
  // algorithmButtons[ODD_EVEN - 1].mousePressed(odd_even_sort);
  algorithmButtons[BOGO - 1].mousePressed(bogo_sort);
  algorithmButtons[BOZO - 1].mousePressed(bozo_sort);
  algorithmButtons[SELECTION - 1].style('border-radius', '12px');
  algorithmButtons[DOUBLE_SELECTION - 1].style('border-radius', '12px');
  algorithmButtons[INSERTION - 1].style('border-radius', '12px');
  algorithmButtons[BUBBLE - 1].style('border-radius', '12px');
  // algorithmButtons[ODD_EVEN - 1].style('border-radius', '12px');
  algorithmButtons[BOGO - 1].style('border-radius', '12px');
  algorithmButtons[BOZO - 1].style('border-radius', '12px');
  volumeP = createP("Volume ():");
  volumeP.style('margin', '0px');
  volumeP.style('color', '#dddddd');
  volumeSlider = createSlider(volumeMin, volumeMax, volume, 0);
  volumeSlider.style('width', (249 * width / 250) + 'px');
  speedP = createP("Speed ():");
  speedP.style('margin', '0px');
  speedP.style('color', '#dddddd');
  speedSlider = createSlider(1, width);
  speedSlider.style('width', (249 * width / 250) + 'px');
  colorMode(HSB);
  index = 0;
  swaps = 0;
  passes = 0;
  radix = 10;
  sort = NONE;
  // frameRate(1);
  const LOG2 = log(2)
  log2 = (x) => log(x)/LOG2
}

function draw() {
  if (elementSlider.value() == list.elements.length)
    elementP.html("Number of Elements (" + list.elements.length + "):");
  else
    elementP.html("Number of Elements (" + list.elements.length + "->" + elementSlider.value() + "):");
  speedP.html("Speed (" + speed + "):");
  volumeP.html("Volume (" + round(map(log2(volume), log2(volumeMin), log2(volumeMax), 0, 100), 2) + "%):");
  background(0);
  list.show();
  speed = speedSlider.value();
  volume = volumeSlider.value();
  if (!list.sorted() && sort != NONE) {
    sound.amp(map(log2(volume), log2(volumeMin), log2(volumeMax), 0, 0.2));
    switch (sort) {
      case SELECTION:
        for (let i = 0; i < speed; i++) {
          if (index < list.elements.length) {
            if (index < list.elements.length - 1) {
              list.swap(index, minIndex(list.elements, index));
            }
            index++;
            sound.freq(map(index, 0, list.elements.length - 1, minFreq, maxFreq));
          } else {
            passes = 1;
          }
        }
        break;
      case DOUBLE_SELECTION:
        for (let i = 0; i < speed; i++)
          if (index < (list.elements.length + 1) / 2) {
            list.swap(list.elements.length - 1 - index, int(maxIndex(list.elements, index, list.elements.length - index)));
            list.swap(index, int(minIndex(list.elements, index++)));
            sound.freq(map(index, 0, list.elements.length - 1, minFreq, maxFreq));
          } else {
            passes = 1;
          }
        break;
      case INSERTION:
        for (let i = 0; i < speed; i++)
          if (index < list.elements.length) {
            for (let j = index++; j > 0; j--)
              if (list.elements[j - 1] > list.elements[j]) {
                list.swap(j - 1, j);
              }
            sound.freq(map(index, 0, list.elements.length - 1, minFreq, maxFreq));
          } else {
            passes = 1;
          }
        break;
      // case ODD_EVEN:
      //   for (let i = 0; i < speed; i++) {
      //     if (index < list.elements.length - 1) {
      //       if (list.elements[index] > list.elements[index + 1]) {
      //         list.swap(index, index + 1);
      //       }
      //     }
      //     if (index >= list.elements.length) {
      //       index = 1;
      //       passes++;
      //     } else index += 2;
      //     sound.freq(map(index, 0, list.elements.length - 1, minFreq, maxFreq));
      //     if (index < list.elements.length - 1) {
      //       if (list.elements[index] > list.elements[index + 1]) {
      //         list.swap(index, index + 1);
      //       }
      //     }
      //     if (index >= list.elements.length) {
      //       index = 0;
      //       passes++;
      //     } else index += 2;
      //     sound.freq(map(index, 0, list.elements.length - 1, minFreq, maxFreq));
      //   }
      //   break;
      case BUBBLE:
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
        break;
      case BOGO:
        for (let i = 0; i < speed; i++) {
          if (!list.sorted()) {
            list.elements = shuffle(list.elements);
            index = int(random(list.elements.length));
            sound.freq(map(index, 0, list.elements.length - 1, minFreq, maxFreq));
          }
        }
        break;
      case BOZO:
        for (let i = 0; i < speed; i++) {
          if (!list.sorted()) {
            index = int(random(list.elements.length));
            list.swap(index, int(random(list.elements.length)));
            sound.freq(map(index, 0, list.elements.length - 1, minFreq, maxFreq));
          }
        }
        break;
      case RADIX:
        buckets = new Array(radix);
        for (let i = 0; i < buckets.length; i++) {
          buckets[i] = [];
        }
        for (let i = 0; i < list.elements.length; i++) {
          buckets[list.elements[i] % radix].push(i);
        }
        break;
    }
  } else {
    sound.amp(0);
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
  speedSlider.style('width', min((249 * width / 250), list.elements.length) + 'px');
  sort = SELECTION;
}

function double_selection_sort() {
  baseIndex = 0;
  restart();
  speedSlider.remove();
  speedSlider = createSlider(1, list.elements.length / 5, 1, 1);
  speedSlider.style('width', min((249 * width / 250), list.elements.length) + 'px');
  sort = DOUBLE_SELECTION;
}

function insertion_sort() {
  baseIndex = 1;
  restart();
  speedSlider.remove();
  speedSlider = createSlider(1, list.elements.length / 10, 1, 1);
  speedSlider.style('width', min((249 * width / 250), list.elements.length) + 'px');
  sort = INSERTION;
}

function bubble_sort() {
  baseIndex = 0;
  restart();
  speedSlider.remove();
  speedSlider = createSlider(1, list.elements.length, 1, 1);
  speedSlider.style('width', min((249 * width / 250), list.elements.length) + 'px');
  sort = BUBBLE;
}

// function odd_even_sort() {
//   baseIndex = 0;
//   restart();
//   speedSlider.remove();
//   speedSlider = createSlider(1, list.elements.length, 1, 1);
//   speedSlider.style('width', min((249 * width / 250), list.elements.length) + 'px');
//   sort = ODD_EVEN;
// }

function bogo_sort() {
  baseIndex = 0;
  restart();
  speedSlider.remove();
  speedSlider = createSlider(1, 25, 1, 1);
  speedSlider.style('width', min((249 * width / 250), list.elements.length) + 'px');
  sort = BOGO;
}

function bozo_sort() {
  baseIndex = 0;
  restart();
  speedSlider.remove();
  speedSlider = createSlider(1, list.elements.length / 10, 1, 1);
  speedSlider.style('width', min((249 * width / 250), list.elements.length) + 'px');
  sort = BOZO;
}

function radix_sort() {
  index = 1;
  restart();
  speedSlider.remove();
  speedSlider = createSlider(1, list.elements.length / 10, 1, 1);
  speedSlider.style('width', min((249 * width / 250), list.elements.length) + 'px');
  sort = RADIX;
}