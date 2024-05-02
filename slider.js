class Slider {
  constructor(x, y, value) {
    this.x = x;
    this.y = y;

    this.v = value;

    this.w = 200;
    this.h = 24;
    this.sw = 5;
    this.setting = false;
    this.cn = false;
    this.cb = false;
  }

  pix(fnc) {
    for (let x = this.x - this.w / 2; x < this.x + this.w / 2; x += 1) {
      for (let y = this.y - this.h / 2; y < this.y + this.h / 2; y += 1) {
        let c = fnc(this.setV(x));
        let i = (x + y * width) * 4;
        pixels[i] = red(c);
        pixels[i + 1] = green(c);
        pixels[i + 2] = blue(c);
        pixels[i + 3] = 255;
      }
    }
  }

  display() {
    if (this.setting) {
      this.v = this.setV(mouseX);
    }

    push();
    noFill();
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
    fill(0);
    rect(this.getX(), this.y, this.sw, this.h);
    pop();
  }

  getX() {
    return this.x + map(this.v, 0, 100, -this.w / 2, this.w / 2);
  }

  setV(x) {
    let v = map(x, this.x - this.w / 2, this.x + this.w / 2, 0, 100);
    if (v < 0) v = 0;
    if (v > 100) v = 100;
    return v;
  }

  mouseP() {
    if (
      mouseX > this.x - this.w / 2 &&
      mouseX < this.x + this.w / 2 &&
      mouseY > this.y - this.h / 2 &&
      mouseY < this.y + this.h / 2
    ) {
      this.setting = true;
    }
  }

  mouseR() {
    this.setting = false;
  }
}
