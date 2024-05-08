class CreatingShapes {
  constructor() {
    this.sx = 0;
    this.sy = 0;
    this.isCreating = false;
    this.rectB = new Button(
      769,
      16,
      60,
      30,
      "RECT",
      false,
      color(100, 200, 100)
    );
    this.ellipB = new Button(
      769,
      46,
      60,
      30,
      "ELLIP",
      false,
      color(100, 200, 100)
    );
    this.seleB = new Button(
      769,
      76,
      60,
      30,
      "SELECT",
      false,
      color(100, 255, 255)
    );
  }

  display() {
    push();
    rectMode(CENTER);
    this.rectB.display();
    this.ellipB.display();
    this.seleB.display();

    if (this.isCreating) {
      cv.noFill();

      let x, y, w, h;
      [x, y, w, h] = getXYWH(this.sx, this.sy, mouseX, mouseY);

      if (this.rectB.switch) {
        cv.rectMode(CENTER);
        cv.rect(x, y, w, h);
      } else if (this.ellipB.switch) {
        cv.ellipse(x, y, w, h);
      }
    }
    pop();
  }

  mouseP() {
    if (!this.isCreating && mouseY < canvaY && mouseX < canvaX) {
      this.isCreating = true;
      this.sx = mouseX;
      this.sy = mouseY;
    }
    let r = this.rectB.mouse();
    let e = this.ellipB.mouse();
    let s = this.seleB.mouse();

    if (r || e || s) {
      this.allButton(false);
    }

    if (r) this.rectB.switch = true;
    if (e) this.ellipB.switch = true;
    if (s) this.seleB.switch = true;
  }

  mouseR() {
    if (this.isCreating) {
      this.isCreating = false;

      let x, y, w, h;
      [x, y, w, h] = getXYWH(this.sx, this.sy, mouseX, mouseY);

      if (w != 0 && h != 0) {
        if (this.rectB.switch) {
          shapes.push(new Rectangle(x, y, w, h, colorPicker.c, color(0), 1, 0));
        } else if (this.ellipB.switch) {
          shapes.push(new Ellipse(x, y, w, h, colorPicker.c, color(0), 1, 0));
        }
      }
    }
  }

  allButton(x) {
    this.ellipB.switch = x;
    this.rectB.switch = x;
    this.seleB.switch = x;
  }
}

function getXYWH(sx, sy, ex, ey) {
  let w = ex - sx;
  let h = ey - sy;
  if (shift) {
    if (abs(w) > abs(h)) {
      h = (abs(w) * h) / abs(h);
    } else {
      w = (abs(h) * w) / abs(w);
    }
  }

  let x = sx + w / 2;
  let y = sy + h / 2;

  return [abs(x), abs(y), abs(w), abs(h)];
}
