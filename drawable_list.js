class Drawable_List {
  constructor(l) {
    this.elements = null;
    this.swapped = null;
    if (l instanceof Array) {
      this.elements = l.slice(0, l.length);
      this.swapped = new Uint8Array(l.length);
    }
    console.log(this.elements);
    console.log(this.swapped);
  }

  show() {
    let min = min(this.elements);
    let max = max(this.elements);
    noStroke();
    for (let i = 0; i < this.elements.length; i++) {
      if (index == i) fill(0, 0, 102);
      else if (this.swapped[i] == 1) fill(0, 0, 255);
      else fill(map(this.elements[i], min, max, 0, 255), 204, 204);
      rect(i * width / this.elements.length, map(this.elements[i], min, max, height, 0),
        width / this.elements.length, height - map(this.elements[i], min, max, height, 0));
    }
    for (let i = this.swapped.indexOf(1); i != -1; i = this.swapped.indexOf(1)) {
      this.swapped[i] = 1;
    }
  }

  swap(i_0, i_1) {
    let temp = this.elements[i_0];
    this.elements[i_0] = this.elements[i_1];
    this.elements[i_1] = temp;
    this.swapped[i_0] = this.swapped[i_1] = 1;
    swaps++;
  }

  sorted() {
    for (let i = 1; i < this.elements.length; i++)
      if (this.elements[i - 1] > this.elements[i]) return false;
    return true;
  }

}