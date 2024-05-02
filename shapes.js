class Shape {
  constructor(x, y, w, h, c1, c2, sw) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c1 = c1;
    this.c2 = c2;
    this.sw = sw;
    this.sdx = 0;
    this.sdy = 0;
    this.spx = 0;
    this.spy = 0;
    this.scx = 0;
    this.scy = 0;
    this.dragging = -1; // -1 no dragging, 0 moving, 1 top, 2 right, 3 bottom, 4 left, 5 right top, 6 right bottom, 7 left bottom, 8 left top
    this.d = 10;
  }

  startDragging(start) {
    if (start) {
      this.dragging = 0;
      this.sdx = this.x - mouseX;
      this.sdy = this.y - mouseY;
      this.spx = this.x;
      this.spy = this.y;

      //console.log("s");
    } else if (this.onTop()) {
      this.dragging = 1;
      this.sdy = this.y - this.h / 2 - mouseY;
      this.spy = this.y + this.h / 2;
      this.scy = this.y;
      //console.log("t");
    } else if (this.onRight()) {
      this.dragging = 2;
      this.sdx = this.x + this.w / 2 - mouseX;
      this.spx = this.x - this.w / 2;
      this.scx = this.x;
      //console.log("r");
    } else if (this.onBottom()) {
      this.dragging = 3;
      this.sdy = this.y + this.h / 2 - mouseY;
      this.spy = this.y - this.h / 2;
      this.scy = this.y;
      //console.log("b");
    } else if (this.onLeft()) {
      this.dragging = 4;
      this.sdx = this.x - this.w / 2 - mouseX;
      this.spx = this.x + this.w / 2;
      this.scx = this.x;
      //console.log("l");
    } else if (this.onTopRight()) {
      this.dragging = 5;
      this.sdx = this.x + this.w / 2 - mouseX;
      this.sdy = this.y - this.h / 2 - mouseY;
      this.spx = this.x - this.w / 2;
      this.spy = this.y + this.h / 2;
      //console.log("tr");
    } else if (this.onBottomRight()) {
      this.dragging = 6;
      this.sdx = this.x + this.w / 2 - mouseX;
      this.sdy = this.y + this.h / 2 - mouseY;
      this.spx = this.x - this.w / 2;
      this.spy = this.y - this.h / 2;
      //console.log("br");
    } else if (this.onBottomLeft()) {
      this.dragging = 7;
      this.sdx = this.x - this.w / 2 - mouseX;
      this.sdy = this.y + this.h / 2 - mouseY;
      this.spx = this.x + this.w / 2;
      this.spy = this.y - this.h / 2;
      //console.log("bl");
    } else if (this.onTopLeft()) {
      this.dragging = 8;
      this.sdx = this.x - this.w / 2 - mouseX;
      this.sdy = this.y - this.h / 2 - mouseY;
      this.spx = this.x + this.w / 2;
      this.spy = this.y + this.h / 2;
      //console.log("tl");
    } else {
      this.dragging = 0;
      this.sdx = this.x - mouseX;
      this.sdy = this.y - mouseY;
      this.spx = this.x;
      this.spy = this.y;
      //console.log("e");
    }
  }

  stopDragging() {
    this.sdx = 0;
    this.sdy = 0;
    this.dragging = -1;
  }

  run() {
    if (this.dragging == 0) {
      if (!shift) {
        this.x = mouseX + this.sdx;
        this.y = mouseY + this.sdy;
      } else {
        if (
          abs(mouseX + this.sdx - this.spx) >= abs(mouseY + this.sdy - this.spy)
        ) {
          this.x = mouseX + this.sdx;
          this.y = this.spy;
        } else {
          this.y = mouseY + this.sdy;
          this.x = this.spx;
        }
      }
    } else if (this.dragging == 1 || this.dragging == 3) {
      if (!shift) {
        this.y = (mouseY + this.sdy + this.spy) / 2;

        if (this.dragging == 1) this.h = -(mouseY + this.sdy) + this.spy;
        if (this.dragging == 3) this.h = mouseY + this.sdy - this.spy;
      } else {
        if (this.dragging == 1) this.h = (-(mouseY + this.sdy) + this.scy) * 2;
        if (this.dragging == 3) this.h = (mouseY + this.sdy - this.scy) * 2;
      }
    } else if (this.dragging == 2 || this.dragging == 4) {
      if (!shift) {
        this.x = (mouseX + this.sdx + this.spx) / 2;
        if (this.dragging == 2) this.w = mouseX + this.sdx - this.spx;
        if (this.dragging == 4) this.w = -(mouseX + this.sdx) + this.spx;
      } else {
        if (this.dragging == 2) this.w = (mouseX + this.sdx - this.scx) * 2;
        if (this.dragging == 4) this.w = (-(mouseX + this.sdx) + this.scx) * 2;
      }
    } else if (
      this.dragging == 5 ||
      this.dragging == 6 ||
      this.dragging == 7 ||
      this.dragging == 8
    ) {
      this.x = (mouseX + this.sdx + this.spx) / 2;
      this.y = (mouseY + this.sdy + this.spy) / 2;

      if (this.dragging == 5) {
        this.w = mouseX + this.sdx - this.spx;
        this.h = -(mouseY + this.sdy) + this.spy;
      }
      if (this.dragging == 6) {
        this.w = mouseX + this.sdx - this.spx;
        this.h = mouseY + this.sdy - this.spy;
      }
      if (this.dragging == 7) {
        this.w = -(mouseX + this.sdx) + this.spx;
        this.h = mouseY + this.sdy - this.spy;
      }
      if (this.dragging == 8) {
        this.w = -(mouseX + this.sdx) + this.spx;
        this.h = -(mouseY + this.sdy) + this.spy;
      }

      if (shift) {
        if (abs(this.w) > abs(this.h)) {
          this.h = (abs(this.w) * this.h) / abs(this.h);
        } else {
          this.w = (abs(this.h) * this.w) / abs(this.w);
        }

        let x, y, w, h;
        [x, y, w, h] = getXYWH(
          this.spx,
          this.spy,
          mouseX + this.sdx,
          mouseY + this.sdy
        );

        this.x = x;
        this.y = y;
      }
    }
  }

  selMouseOn() {
    if (
      mouseX > this.x - this.w / 2 - this.d / 2 &&
      mouseX < this.x + this.w / 2 + this.d / 2 &&
      mouseY > this.y - this.h / 2 - this.d / 2 &&
      mouseY < this.y + this.h / 2 + this.d / 2
    ) {
      return true;
    }
    return false;
  }

  selRect() {
    rectMode(CENTER);
    noFill();
    stroke(255, 0, 0);
    strokeWeight(2);
    rect(this.x, this.y, this.w, this.h);
  }

  displaySelected() {
    push();
    this.selRect();

    if (this.onTopLeft())
      rect(this.x - this.w / 2, this.y - this.h / 2, this.d, this.d);

    if (this.onBottomLeft())
      rect(this.x - this.w / 2, this.y + this.h / 2, this.d, this.d);

    if (this.onTopRight())
      rect(this.x + this.w / 2, this.y - this.h / 2, this.d, this.d);

    if (this.onBottomRight())
      rect(this.x + this.w / 2, this.y + this.h / 2, this.d, this.d);

    let d = this.d;
    stroke(0, 255, 0);
    strokeWeight(1);

    //top
    if (this.onTop()) {
      line(
        this.x - this.w / 2,
        this.y - this.h / 2,
        this.x + this.w / 2,
        this.y - this.h / 2
      );
    }

    //buttom
    if (this.onBottom()) {
      line(
        this.x - this.w / 2,
        this.y + this.h / 2,
        this.x + this.w / 2,
        this.y + this.h / 2
      );
    }

    //left
    if (this.onLeft()) {
      line(
        this.x - this.w / 2,
        this.y - this.h / 2,
        this.x - this.w / 2,
        this.y + this.h / 2
      );
    }
    //right
    if (this.onRight()) {
      line(
        this.x + this.w / 2,
        this.y - this.h / 2,
        this.x + this.w / 2,
        this.y + this.h / 2
      );
    }
    pop();
  }

  onTop() {
    if (
      mouseIn(
        this.x - this.w / 2 + this.d / 2,
        this.y - this.h / 2 - this.d / 2,
        this.x + this.w / 2 - this.d / 2,
        this.y - this.h / 2 + this.d / 2
      )
    ) {
      return true;
    }
    return false;
  }

  onBottom() {
    if (
      mouseIn(
        this.x - this.w / 2 + this.d / 2,
        this.y + this.h / 2 - this.d / 2,
        this.x + this.w / 2 - this.d / 2,
        this.y + this.h / 2 + this.d / 2
      )
    ) {
      return true;
    }
    return false;
  }

  onLeft() {
    if (
      mouseIn(
        this.x - this.w / 2 - this.d / 2,
        this.y - this.h / 2 + this.d / 2,
        this.x - this.w / 2 + this.d / 2,
        this.y + this.h / 2 - this.d / 2
      )
    ) {
      return true;
    }
    return false;
  }

  onRight() {
    if (
      mouseIn(
        this.x + this.w / 2 - this.d / 2,
        this.y - this.h / 2 + this.d / 2,
        this.x + this.w / 2 + this.d / 2,
        this.y + this.h / 2 - this.d / 2
      )
    ) {
      return true;
    }
    return false;
  }

  onTopRight() {
    if (
      mouseIn(
        this.x + this.w / 2 - this.d / 2,
        this.y - this.h / 2 - this.d / 2,
        this.x + this.w / 2 + this.d / 2,
        this.y - this.h / 2 + this.d / 2
      )
    ) {
      return true;
    }
    return false;
  }
  onTopLeft() {
    if (
      mouseIn(
        this.x - this.w / 2 - this.d / 2,
        this.y - this.h / 2 - this.d / 2,
        this.x - this.w / 2 + this.d / 2,
        this.y - this.h / 2 + this.d / 2
      )
    ) {
      return true;
    }
    return false;
  }

  onBottomRight() {
    if (
      mouseIn(
        this.x + this.w / 2 - this.d / 2,
        this.y + this.h / 2 - this.d / 2,
        this.x + this.w / 2 + this.d / 2,
        this.y + this.h / 2 + this.d / 2
      )
    ) {
      return true;
    }
    return false;
  }

  onBottomLeft() {
    if (
      mouseIn(
        this.x - this.w / 2 - this.d / 2,
        this.y + this.h / 2 - this.d / 2,
        this.x - this.w / 2 + this.d / 2,
        this.y + this.h / 2 + this.d / 2
      )
    ) {
      return true;
    }
    return false;
  }

  top() {
    return this.y - this.h / 2;
  }
  bottom() {
    return this.y + this.h / 2;
  }
  right() {
    return this.x + this.w / 2;
  }
  left() {
    return this.x - this.w / 2;
  }
  centerIn(x1, y1, x2, y2) {
    let xr = max(x1, x2);
    let xl = min(x1, x2);
    let yt = min(y1, y2);
    let yb = max(y1, y2);

    if (this.x > xl && this.x < xr && this.y > yt && this.y < yb) {
      return true;
    }
    return false;
  }
}

class Rectangle extends Shape {
  constructor(x, y, w, h, c1, c2, sw) {
    super(x, y, w, h, c1, c2, sw);
  }

  copy() {
    return new Rectangle(
      this.x,
      this.y,
      this.w,
      this.h,
      this.c1,
      this.c2,
      this.sw
    );
  }

  display(on) {
    push();
    rectMode(CENTER);
    stroke(this.c2);

    strokeWeight(this.sw);

    if (on) {
      fill(red(this.c1) - 30, green(this.c1) - 30, blue(this.c1) - 30);
    } else {
      fill(this.c1);
    }
    rect(this.x, this.y, this.w, this.h);
    pop();
  }

  mouseOn(x) {
    if (!x) {
      return false;
    }
    if (
      mouseX > this.x - this.w / 2 &&
      mouseX < this.x + this.w / 2 &&
      mouseY > this.y - this.h / 2 &&
      mouseY < this.y + this.h / 2
    ) {
      return true;
    }
    return false;
  }

  lDisplay(x, y, w, h) {
    layers.pg.push();
    layers.pg.rectMode(CENTER);
    layers.pg.fill(this.c1);
    layers.pg.rect(x, y, w, h);
    layers.pg.pop();
  }

  generatePro(sx, sy) {
    let x = this.x - sx;
    let y = this.y - sy;

    let rect =
      "rect(x + " +
      x +
      " * scale, y + " +
      y +
      " * scale, " +
      this.w +
      " * scale, " +
      this.h +
      " * scale);";

    let fill =
      "fill(" +
      round(red(this.c1)) +
      ", " +
      round(green(this.c1)) +
      ", " +
      round(blue(this.c1)) +
      ");";

    return fill + "\n" + rect;
  }
}

class Ellipse extends Shape {
  constructor(x, y, w, h, c1, c2, sw) {
    super(x, y, w, h, c1, c2, sw);
  }

  copy() {
    return new Ellipse(
      this.x,
      this.y,
      this.w,
      this.h,
      this.c1,
      this.c2,
      this.sw
    );
  }

  display(on) {
    push();
    stroke(this.c2);
    strokeWeight(this.sw);
    if (on) {
      fill(red(this.c1) - 30, green(this.c1) - 30, blue(this.c1) - 30);
    } else {
      fill(this.c1);
    }
    ellipse(this.x, this.y, this.w, this.h);
    pop();
  }

  lDisplay(x, y, w, h) {
    layers.pg.fill(this.c1);
    layers.pg.ellipse(x, y, w, h);
  }

  mouseOn(x) {
    if (!x) {
      return false;
    }

    let f = sqrt(abs(sq(this.w / 2) - sq(this.h / 2)));
    let fx, fy;
    let m = max(this.w, this.h);

    if (this.w > this.h) {
      fx = f;
      fy = 0;
    } else if (this.w < this.h) {
      fx = 0;
      fy = f;
    } else {
      fx = 0;
      fy = 0;
    }

    if (
      dist(mouseX, mouseY, this.x - fx, this.y - fy) +
        dist(mouseX, mouseY, this.x + fx, this.y + fy) <=
      m
    ) {
      return true;
    }
    return false;
  }

  generatePro(sx, sy) {
    let x = this.x - sx;
    let y = this.y - sy;
    let ellipse =
      "ellipse(x + " +
      x +
      " * scale, y + " +
      y +
      " * scale, " +
      this.w +
      " * scale, " +
      this.h +
      " * scale);";

    let fill =
      "fill(" +
      round(red(this.c1)) +
      ", " +
      round(green(this.c1)) +
      ", " +
      round(blue(this.c1)) +
      ");";

    return fill + "\n" + ellipse;
  }
}

function mouseIn(x1, y1, x2, y2) {
  if (mouseX > x1 && mouseX < x2 && mouseY > y1 && mouseY < y2) {
    //console.log("ons");
    return true;
  }
  return false;
}
