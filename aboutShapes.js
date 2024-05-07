class AboutShapes {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.nix = new NumberInput(this.x + 55, this.y - 5, 50, 25);
    this.niy = new NumberInput(this.x + 155, this.y - 5, 50, 25);
    this.niw = new NumberInput(this.x + 255, this.y - 5, 50, 25);
    this.nih = new NumberInput(this.x + 355, this.y - 5, 50, 25);
    this.nir = new NumberInput(this.x + 455, this.y - 5, 50, 25);

    this.sp = selected;
  }

  run() {
    if (selShape != null) {
      if (this.nix.changing) {
        selShape.x = this.nix.getValue();
      } else {
        this.nix.setValue(selShape.x);
      }
      if (this.niy.changing) {
        selShape.y = this.niy.getValue();
      } else {
        this.niy.setValue(selShape.y);
      }
      if (this.niw.changing) {
        selShape.w = this.niw.getValue();
      } else {
        this.niw.setValue(selShape.w);
      }
      if (this.nih.changing) {
        selShape.h = this.nih.getValue();
      } else {
        this.nih.setValue(selShape.h);
      }
      if (this.nir.changing) {
        selShape.r = (PI / 180) * this.nir.getValue();
      } else {
        this.nir.setValue(selShape.r * (180 / PI));
      }
    }
  }

  changing() {
    if (
      this.nix.changing ||
      this.niy.changing ||
      this.niw.changing ||
      this.nih.changing ||
      this.nir.changing
    ) {
      return true;
    }
    return false;
  }

  display() {
    if (selShape != null) {
      push();
      //textAlign(CENTER, CENTER);
      fill(255);
      noStroke();
      rect(this.x - 20, this.y - 25, 500, 40);
      fill(0);
      stroke(0);
      textSize(18);
      //text("x = " + round(shapes[selected].x), this.x, this.y);
      text("x = ", this.x, this.y);
      this.nix.display();
      text("y = ", this.x + 100, this.y);
      this.niy.display();
      text("w = ", this.x + 200, this.y);
      this.niw.display();
      text("h = ", this.x + 300, this.y);
      this.nih.display();
      text("r = ", this.x + 400, this.y);
      this.nir.display();

      //text("y = " + round(shapes[selected].y), this.x + 100, this.y);
      //text("w = " + shapes[selected].w, this.x + 200, this.y);
      //text("h = " + shapes[selected].h, this.x + 300, this.y);
      pop();
    }

    //this.sp = selected;
  }

  mouseP() {
    this.nix.mouseP();
    this.niy.mouseP();
    this.niw.mouseP();
    this.nih.mouseP();
    this.nir.mouseP();
  }

  mouseR() {
    this.nix.mouseR();
    this.niy.mouseR();
    this.niw.mouseR();
    this.nih.mouseR();
    this.nir.mouseR();
  }
}

class NumberInput {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.v = 100;
    this.changing = false;
    this.sx = 0;
    this.sv = 0;
  }

  display() {
    if (this.changing) {
      this.v = this.sv + floor((mouseX - this.sx) / 3);
    }

    push();
    rectMode(CENTER);

    if (this.mOn()) {
      fill(220);
    } else {
      noFill();
    }
    rect(this.x, this.y, this.w, this.h);
    fill(0);
    text(this.v, this.x - 15, this.y + 5);
    pop();
  }

  getValue() {
    return this.v;
  }

  setValue(a) {
    this.v = floor(a);
  }

  mOn() {
    return mouseIn(
      this.x - this.w / 2,
      this.y - this.h / 2,
      this.x + this.w / 2,
      this.y + this.h / 2
    );
  }

  mouseP() {
    if (this.mOn()) {
      this.changing = true;
      this.sx = mouseX;
      this.sv = this.v;
    }
  }

  mouseR() {
    if (this.changing) {
      this.changing = false;
    }
  }
}
