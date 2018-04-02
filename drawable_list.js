class Drawable_List {
  constructor(l) {
    this.elements = null;
    this.swapped = null;
    if (l instanceof Array) {
      this.elements = l.slice();
      this.swapped = [];
      for (let i = 0; i < l.length; i++) this.swapped.push(false);
    }
  }

  show() {
    let mn = min(this.elements);
    let mx = max(this.elements);
    noStroke();
    for (let i = 0; i < this.elements.length; i++) {
      if (index == i) fill(0, 0, 102);
      else if (this.swapped[i]) fill(0, 0, 255);
      else fill(map(this.elements[i], mn, mx, 255, 0), 204, 204);
      rect(i * width / this.elements.length, map(this.elements[i], mn, mx, height, 0),
        width / this.elements.length, height - map(this.elements[i], mn, mx, height, 0));
    }
    for (let i = 0; i < this.swapped.length; i++) {
      this.swapped[i] = false;
    }
  }

  swap(i_0, i_1) {
    let temp = this.elements[i_0];
    this.elements[i_0] = this.elements[i_1];
    this.elements[i_1] = temp;
    this.swapped[i_0] = true;
    this.swapped[i_1] = true;
    swaps++;
  }

  sorted() {
    for (let i = 1; i < this.elements.length; i++)
      if (this.elements[i - 1] > this.elements[i]) return false;
    return true;
  }

}