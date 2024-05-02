class ColorPicker {
  constructor(x, y, d) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.sh = new Slider(250, y - 38, 50);
    this.ss = new Slider(250, y, 100);
    this.sb = new Slider(250, y + 38, 50);
    this.c = color("hsl(" + 50 + ", " + 50 + "%, " + 50 + "%)");

    this.lastC = this.c;
    this.colorB = new Button(
      769,
      height - 16,
      60,
      30,
      "COLORS",
      true,
      color(100, 200, 100)
    );
    this.counter = 3;
  }

  getColor(x, y) {
    let vect = createVector(this.x - x, this.y - y);
    let v1 = createVector(1, 0);

    let angle = v1.angleBetween(vect);
    angle = floor(angle * (180 / PI));
    if (angle < 0) angle += 360;
    let sat = floor(map(vect.mag(), 0, 50, 100, 50));
    let c = hslColor(angle, 100, sat);
    return c;
  }

  displayColorCircle() {
    for (let x = this.x - this.d / 2; x < this.x + this.d / 2; x += 1) {
      for (let y = this.y - this.d / 2; y < this.y + this.d / 2; y += 1) {
        let vect = createVector(this.x - x, this.y - y);

        if (vect.mag() <= this.d / 2) {
          let c = this.getColor(x, y);
          let i = (x + y * width) * 4;
          pixels[i] = red(c);
          pixels[i + 1] = green(c);
          pixels[i + 2] = blue(c);
          pixels[i + 3] = 255;
        }
      }
    }
  }

  setColor(c) {
    this.sh.v = hue(c) / 3.6;
    this.ss.v = saturation(c);
    this.sb.v = lightness(c);
    this.c = c;
  }

  render() {
    let hue = floor(this.sh.v * 3.6);
    let sat = floor(this.ss.v);
    let lig = floor(this.sb.v);
    this.c = hslColor(hue, sat, lig);

    push();
    fill(255);
    noStroke();
    rect(0, canvaY, width, height);
    pop();
    if (this.colorB.switch) {
      //&& mouseIn(0, canvaY, width, height)
      fill(100);
      rect(0, height - 120, width, 120);
      push();

      loadPixels();
      pixelDensity(1);

      this.displayColorCircle();

      this.sh.pix(this.hueFnc);
      this.ss.pix(this.satFnc);
      this.sb.pix(this.ligFnc);

      updatePixels();

      this.sh.display();
      this.ss.display();
      this.sb.display();

      noFill();
      stroke(0);
      strokeWeight(2);
      ellipse(this.x, this.y, this.d, this.d);

      if (dist(this.x, this.y, mouseX, mouseY) < this.d / 2) {
        fill(this.getColor(mouseX, mouseY));
        ellipse(
          mouseX + this.d / 5,
          mouseY - this.d / 5,
          this.d / 5,
          this.d / 5
        );
      }

      fill(this.c);
      rectMode(CENTER);
      rect(this.x + 330, this.y, 30, 100);
      strokeWeight(1);
      pop();
    } else {
      push();
      noFill(255);
      noStroke();
      rect(this.x, this.y, width - this.x, height - this.y);
      fill(this.c);
      stroke(0);
      rect(1, height - 21, 20, 20);
      pop();
    }
    this.lastC = this.c;
  }

  display() {
    if (mouseIn(0, height - 120, width, height) || this.lastC != this.c) {
      // if mounse is on tab or the color change
      //console.log("render");
      this.counter = 0;
      this.render();
    }

    this.colorB.display();
  }

  mouseP() {
    this.colorB.mouse();
    if (dist(mouseX, mouseY, this.x, this.y) < this.d / 2) {
      this.c = this.getColor(mouseX, mouseY);
      this.setSliders(this.c);
    }

    this.sh.mouseP();
    this.ss.mouseP();
    this.sb.mouseP();
  }

  mouseR() {
    this.sh.mouseR();
    this.ss.mouseR();
    this.sb.mouseR();
  }

  setSliders(c) {
    this.sh.v = hue(c) / 3.6;
    this.ss.v = saturation(c);
    this.sb.v = lightness(c);
  }

  hueFnc(v) {
    let h = floor(v * 3.6);
    let s = floor(colorPicker.ss.v);
    let l = floor(colorPicker.sb.v);
    return hslColor(h, s, l);
  }

  satFnc(v) {
    let h = floor(colorPicker.sh.v * 3.6);
    let s = floor(v);
    let l = floor(colorPicker.sb.v);
    return hslColor(h, s, l);
  }

  ligFnc(v) {
    let h = floor(colorPicker.sh.v * 3.6);
    let s = floor(colorPicker.ss.v);
    let l = floor(v);
    return hslColor(h, s, l);
  }
}
function hslColor(h, s, l) {
  return color("hsl(" + h + ", " + s + "%, " + l + "%)");
}
