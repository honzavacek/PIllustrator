class Shape {
  constructor(x, y, w, h, c1, c2, sw, r) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c1 = c1;
    this.c2 = c2;
    this.sw = sw;
    //this.sdx = 0;
    //this.sdy = 0;
    //this.spx = 0;
    //this.spy = 0;
    //this.scx = 0;
    //this.scy = 0;
    this.dragging = -1; // -1 no dragging, 0 moving, 1 top, 2 right, 3 bottom, 4 left, 5 right top, 6 right bottom, 7 left bottom, 8 left top, 9 rotation
    this.d = 10;

    this.nx = 0;
    this.ny = 0;

    this.r = r;
    this.rotCirD = 15;
    this.rotDist = 20;

    this.dragInfo;
  }

  startDragging(start) {
    this.dragInfo = new ShapeDragInfo(
      this.x,
      this.y,
      this.w,
      this.h,
      this.r,
      this.topRight(),
      this.bottomRight(),
      this.bottomLeft(),
      this.topLeft(),
      0,
      0
    );

    if (start) {
      this.dragging = 0;
      this.dragInfo.dx = this.x - mouseX;
      this.dragInfo.dy = this.y - mouseY;
    } else if (this.onTop()) {
      this.dragging = 1;
      this.dragInfo.dx = 0;
      this.dragInfo.dy = -this.h / 2 - this.ny;
    } else if (this.onRight()) {
      this.dragging = 2;
      this.dragInfo.dx = +this.w / 2 - this.nx;
      this.dragInfo.dy = 0;
    } else if (this.onBottom()) {
      this.dragging = 3;
      this.dragInfo.dx = 0;
      this.dragInfo.dy = +this.h / 2 - this.ny;
    } else if (this.onLeft()) {
      this.dragging = 4;
      this.dragInfo.dx = -this.w / 2 - this.nx;
      this.dragInfo.dy = 0;
    } else if (this.onTopRight()) {
      this.dragging = 5;
      this.dragInfo.dx = +this.w / 2 - this.nx;
      this.dragInfo.dy = -this.h / 2 - this.ny;
    } else if (this.onBottomRight()) {
      this.dragging = 6;
      this.dragInfo.dx = +this.w / 2 - this.nx;
      this.dragInfo.dy = +this.h / 2 - this.ny;
    } else if (this.onBottomLeft()) {
      this.dragging = 7;
      this.dragInfo.dx = -this.w / 2 - this.nx;
      this.dragInfo.dy = +this.h / 2 - this.ny;
    } else if (this.onTopLeft()) {
      this.dragging = 8;
      this.dragInfo.dx = -this.w / 2 - this.nx;
      this.dragInfo.dy = -this.h / 2 - this.ny;
    } else if (this.onRotator()) {
      this.dragging = 9;
      let x = this.x + sin(this.r) * (this.rotDist + abs(this.h) / 2);
      let y = this.y - cos(this.r) * (this.rotDist + abs(this.h) / 2);
      this.dragInfo.dx = x - mouseX;
      this.dragInfo.dy = y - mouseY;
    } else {
      this.dragging = 0;
      this.dragInfo.dx = this.x - mouseX;
      this.dragInfo.dy = this.y - mouseY;
    }
  }

  stopDragging() {
    this.sdx = 0;
    this.sdy = 0;
    this.dragging = -1;
  }

  run() {
    if (this.r < 0) {
      this.r += 2 * PI;
    }
    if (this.r > 2 * PI) {
      this.r -= 2 * PI;
    }

    let nxP;
    let nyP;

    let x = mouseX - this.x;
    let y = mouseY - this.y;

    this.nx = cos(this.r) * x + sin(this.r) * y;
    this.ny = -sin(this.r) * x + cos(this.r) * y;

    //p.html(this.nx + "  " + this.ny + "   " + this.r);

    if (this.dragging != -1) {
      x = mouseX - this.dragInfo.x;
      y = mouseY - this.dragInfo.y;

      nxP = cos(this.r) * x + sin(this.r) * y;
      nyP = -sin(this.r) * x + cos(this.r) * y;
    }

    if (this.dragging == 0) {
      if (!shift) {
        this.x = mouseX + this.dragInfo.dx;
        this.y = mouseY + this.dragInfo.dy;
      } else {
        if (
          abs(mouseX + this.dragInfo.dx - this.dragInfo.x) >=
          abs(mouseY + this.dragInfo.dy - this.dragInfo.y)
        ) {
          this.x = mouseX + this.dragInfo.dx;
          this.y = this.dragInfo.y;
        } else {
          this.y = mouseY + this.dragInfo.dy;
          this.x = this.dragInfo.x;
        }
      }
    } else if (this.dragging == 1 || this.dragging == 3) {
      if (!shift) {
        if (this.dragging == 1) {
          this.h = -(nyP + this.dragInfo.dy) + this.dragInfo.h / 2;

          let s1 =
            (this.dragInfo.bottomLeft[0] + this.dragInfo.bottomRight[0]) / 2;
          let s2 =
            (this.dragInfo.bottomLeft[1] + this.dragInfo.bottomRight[1]) / 2;

          this.x = s1 + (sin(this.r) * this.h) / 2;
          this.y = s2 - (cos(this.r) * this.h) / 2;
        }
        if (this.dragging == 3) {
          this.h = nyP + this.dragInfo.dy + this.dragInfo.h / 2;

          let s1 = (this.dragInfo.topLeft[0] + this.dragInfo.topRight[0]) / 2;
          let s2 = (this.dragInfo.topLeft[1] + this.dragInfo.topRight[1]) / 2;

          this.x = s1 - (sin(this.r) * this.h) / 2;
          this.y = s2 + (cos(this.r) * this.h) / 2;
        }
      } else {
        if (this.dragging == 1) this.h = -(nyP + this.dragInfo.dy) * 2;
        if (this.dragging == 3) this.h = (nyP + this.dragInfo.dy) * 2;
      }
    } else if (this.dragging == 2 || this.dragging == 4) {
      if (!shift) {
        if (this.dragging == 2) {
          this.w = nxP + this.dragInfo.dx + this.dragInfo.w / 2;

          let s1 = (this.dragInfo.topLeft[0] + this.dragInfo.bottomLeft[0]) / 2;
          let s2 = (this.dragInfo.topLeft[1] + this.dragInfo.bottomLeft[1]) / 2;

          this.x = s1 + (cos(this.r) * this.w) / 2;
          this.y = s2 + (sin(this.r) * this.w) / 2;
        }
        if (this.dragging == 4) {
          this.w = -(nxP + this.dragInfo.dx) + this.dragInfo.w / 2;

          let s1 =
            (this.dragInfo.topRight[0] + this.dragInfo.bottomRight[0]) / 2;
          let s2 =
            (this.dragInfo.topRight[1] + this.dragInfo.bottomRight[1]) / 2;

          this.x = s1 - (cos(this.r) * this.w) / 2;
          this.y = s2 - (sin(this.r) * this.w) / 2;
        }
      } else {
        if (this.dragging == 2) this.w = (nxP + this.dragInfo.dx) * 2;
        if (this.dragging == 4) this.w = -(nxP + this.dragInfo.dx) * 2;
      }
    } else if (
      this.dragging == 5 ||
      this.dragging == 6 ||
      this.dragging == 7 ||
      this.dragging == 8
    ) {
      if (!shift && !ctrl) {
        if (this.dragging == 5) {
          this.x =
            (mouseX + this.dragInfo.dx + this.dragInfo.bottomLeft[0]) / 2;
          this.y =
            (mouseY + this.dragInfo.dy + this.dragInfo.bottomLeft[1]) / 2;

          this.w = nxP + this.dragInfo.dx + this.dragInfo.w / 2;
          this.h = -nyP - this.dragInfo.dy + this.dragInfo.h / 2;
        }
        if (this.dragging == 6) {
          this.x = (mouseX + this.dragInfo.dx + this.dragInfo.topLeft[0]) / 2;
          this.y = (mouseY + this.dragInfo.dy + this.dragInfo.topLeft[1]) / 2;
          this.w = nxP + this.dragInfo.dx + this.dragInfo.w / 2;
          this.h = nyP + this.dragInfo.dy + this.dragInfo.h / 2;
        }
        if (this.dragging == 7) {
          this.x = (mouseX + this.dragInfo.dx + this.dragInfo.topRight[0]) / 2;
          this.y = (mouseY + this.dragInfo.dy + this.dragInfo.topRight[1]) / 2;
          this.w = -nxP - this.dragInfo.dx + this.dragInfo.w / 2;
          this.h = nyP + this.dragInfo.dy + this.dragInfo.h / 2;
        }
        if (this.dragging == 8) {
          this.x =
            (mouseX + this.dragInfo.dx + this.dragInfo.bottomRight[0]) / 2;
          this.y =
            (mouseY + this.dragInfo.dy + this.dragInfo.bottomRight[1]) / 2;
          this.w = -nxP - this.dragInfo.dx + this.dragInfo.w / 2;
          this.h = -nyP - this.dragInfo.dy + this.dragInfo.h / 2;
        }
      } else if (shift) {
        if (this.dragging == 5) {
          this.w = nxP + this.dragInfo.dx + this.dragInfo.w / 2;
          this.h = -nyP - this.dragInfo.dy + this.dragInfo.h / 2;

          if (abs(this.w) > abs(this.h)) {
            this.h = (abs(this.w) * this.h) / abs(this.h);
          } else {
            this.w = (abs(this.h) * this.w) / abs(this.w);
          }

          this.x =
            this.dragInfo.bottomLeft[0] +
            (cos(this.r) * this.w) / 2 +
            (sin(this.r) * this.h) / 2;
          this.y =
            this.dragInfo.bottomLeft[1] +
            (sin(this.r) * this.w) / 2 -
            (cos(this.r) * this.h) / 2;
        }

        if (this.dragging == 6) {
          this.w = nxP + this.dragInfo.dx + this.dragInfo.w / 2;
          this.h = nyP + this.dragInfo.dy + this.dragInfo.h / 2;

          if (abs(this.w) > abs(this.h)) {
            this.h = (abs(this.w) * this.h) / abs(this.h);
          } else {
            this.w = (abs(this.h) * this.w) / abs(this.w);
          }

          this.x =
            this.dragInfo.topLeft[0] +
            (cos(this.r) * this.w) / 2 -
            (sin(this.r) * this.h) / 2;
          this.y =
            this.dragInfo.topLeft[1] +
            (sin(this.r) * this.w) / 2 +
            (cos(this.r) * this.h) / 2;
        }

        if (this.dragging == 7) {
          this.w = -nxP - this.dragInfo.dx + this.dragInfo.w / 2;
          this.h = nyP + this.dragInfo.dy + this.dragInfo.h / 2;

          if (abs(this.w) > abs(this.h)) {
            this.h = (abs(this.w) * this.h) / abs(this.h);
          } else {
            this.w = (abs(this.h) * this.w) / abs(this.w);
          }

          this.x =
            this.dragInfo.topRight[0] -
            (cos(this.r) * this.w) / 2 -
            (sin(this.r) * this.h) / 2;
          this.y =
            this.dragInfo.topRight[1] -
            (sin(this.r) * this.w) / 2 +
            (cos(this.r) * this.h) / 2;
        }

        if (this.dragging == 8) {
          this.w = -nxP - this.dragInfo.dx + this.dragInfo.w / 2;
          this.h = -nyP - this.dragInfo.dy + this.dragInfo.h / 2;

          if (abs(this.w) > abs(this.h)) {
            this.h = (abs(this.w) * this.h) / abs(this.h);
          } else {
            this.w = (abs(this.h) * this.w) / abs(this.w);
          }

          this.x =
            this.dragInfo.bottomRight[0] -
            (cos(this.r) * this.w) / 2 +
            (sin(this.r) * this.h) / 2;
          this.y =
            this.dragInfo.bottomRight[1] -
            (sin(this.r) * this.w) / 2 -
            (cos(this.r) * this.h) / 2;
        }
      } else if (ctrl) {
        if (this.dragging == 5) {
          this.w = nxP + this.dragInfo.dx + this.dragInfo.w / 2;
          this.h = -nyP - this.dragInfo.dy + this.dragInfo.h / 2;

          if (abs(this.w / this.dragInfo.wh) > abs(this.h)) {
            this.h = (abs(this.w) * this.h) / abs(this.h) / this.dragInfo.wh;
          } else {
            this.w = (this.dragInfo.wh * (abs(this.h) * this.w)) / abs(this.w);
          }

          this.x =
            this.dragInfo.bottomLeft[0] +
            (cos(this.r) * this.w) / 2 +
            (sin(this.r) * this.h) / 2;
          this.y =
            this.dragInfo.bottomLeft[1] +
            (sin(this.r) * this.w) / 2 -
            (cos(this.r) * this.h) / 2;
        }
        if (this.dragging == 6) {
          this.w = nxP + this.dragInfo.dx + this.dragInfo.w / 2;
          this.h = nyP + this.dragInfo.dy + this.dragInfo.h / 2;

          if (abs(this.w / this.dragInfo.wh) > abs(this.h)) {
            this.h = (abs(this.w) * this.h) / abs(this.h) / this.dragInfo.wh;
          } else {
            this.w = (this.dragInfo.wh * (abs(this.h) * this.w)) / abs(this.w);
          }

          this.x =
            this.dragInfo.topLeft[0] +
            (cos(this.r) * this.w) / 2 -
            (sin(this.r) * this.h) / 2;
          this.y =
            this.dragInfo.topLeft[1] +
            (sin(this.r) * this.w) / 2 +
            (cos(this.r) * this.h) / 2;
        }

        if (this.dragging == 7) {
          this.w = -nxP - this.dragInfo.dx + this.dragInfo.w / 2;
          this.h = nyP + this.dragInfo.dy + this.dragInfo.h / 2;

          if (abs(this.w / this.dragInfo.wh) > abs(this.h)) {
            this.h = (abs(this.w) * this.h) / abs(this.h) / this.dragInfo.wh;
          } else {
            this.w = (this.dragInfo.wh * (abs(this.h) * this.w)) / abs(this.w);
          }

          this.x =
            this.dragInfo.topRight[0] -
            (cos(this.r) * this.w) / 2 -
            (sin(this.r) * this.h) / 2;
          this.y =
            this.dragInfo.topRight[1] -
            (sin(this.r) * this.w) / 2 +
            (cos(this.r) * this.h) / 2;
        }

        if (this.dragging == 8) {
          this.w = -nxP - this.dragInfo.dx + this.dragInfo.w / 2;
          this.h = -nyP - this.dragInfo.dy + this.dragInfo.h / 2;

          if (abs(this.w / this.dragInfo.wh) > abs(this.h)) {
            this.h = (abs(this.w) * this.h) / abs(this.h) / this.dragInfo.wh;
          } else {
            this.w = (this.dragInfo.wh * (abs(this.h) * this.w)) / abs(this.w);
          }

          this.x =
            this.dragInfo.bottomRight[0] -
            (cos(this.r) * this.w) / 2 +
            (sin(this.r) * this.h) / 2;
          this.y =
            this.dragInfo.bottomRight[1] -
            (sin(this.r) * this.w) / 2 -
            (cos(this.r) * this.h) / 2;
        }
      }
    } else if (this.dragging == 9) {
      let x = -this.x + mouseX + this.dragInfo.dx;
      let y = -mouseY - this.dragInfo.dy + this.y;

      if (y == 0) {
        this.r = 0;
      } else {
        this.r = atan(x / y);
      }
      if (y < 0) {
        this.r += PI;
      }
      if (this.r < 0) this.r += 2 * PI;

      //console.log(this.r);
    }
  }

  selMouseOn() {
    if (
      this.onRotator() ||
      this.nposIn(
        -this.w / 2 - this.d / 2,
        -this.h / 2 - this.d / 2,
        this.w / 2 + this.d / 2,
        this.h / 2 + this.d / 2
      )
    ) {
      return true;
    }
    return false;
  }

  selRect() {
    cv.push();
    cv.rectMode(CENTER);
    cv.noFill();
    cv.stroke(255, 0, 0);
    cv.strokeWeight(2);
    cv.translate(this.x, this.y);
    cv.rotate(this.r);
    cv.rect(0, 0, this.w, this.h);
    cv.pop();
  }

  displayRot() {
    let x1 = this.x + (sin(this.r) * abs(this.h)) / 2;
    let y1 = this.y - (cos(this.r) * abs(this.h)) / 2;

    let x2 = x1 + sin(this.r) * (this.rotDist - this.rotCirD / 2);
    let y2 = y1 - cos(this.r) * (this.rotDist - this.rotCirD / 2);

    let x3 = this.x + sin(this.r) * (this.rotDist + abs(this.h) / 2);
    let y3 = this.y - cos(this.r) * (this.rotDist + abs(this.h) / 2);
    cv.line(x1, y1, x2, y2);

    if (this.onRotator()) {
      cv.stroke(0, 255, 0);
    }

    cv.ellipse(x3, y3, this.rotCirD, this.rotCirD);
  }

  onRotator() {
    let x = this.x + sin(this.r) * (this.rotDist + abs(this.h) / 2);
    let y = this.y - cos(this.r) * (this.rotDist + abs(this.h) / 2);
    if (dist(mouseX, mouseY, x, y) <= this.rotCirD / 2) return true;
    return false;
  }

  displaySelected() {
    cv.push();
    this.selRect();
    cv.rectMode(CENTER);
    cv.noFill();
    cv.stroke(255, 0, 0);
    cv.strokeWeight(2);

    if (this.onTopLeft()) {
      cv.push();
      let n = this.topLeft();
      cv.translate(n[0], n[1]);
      cv.rotate(this.r);
      cv.rect(0, 0, this.d, this.d);
      cv.pop();
    }

    if (this.onBottomLeft()) {
      cv.push();
      let n = this.bottomLeft();
      cv.translate(n[0], n[1]);
      cv.rotate(this.r);
      cv.rect(0, 0, this.d, this.d);
      cv.pop();
    }

    if (this.onTopRight()) {
      cv.push();
      let n = this.topRight();
      cv.translate(n[0], n[1]);
      cv.rotate(this.r);
      cv.rect(0, 0, this.d, this.d);
      cv.pop();
    }

    if (this.onBottomRight()) {
      cv.push();
      let n = this.bottomRight();
      cv.translate(n[0], n[1]);
      cv.rotate(this.r);
      cv.rect(0, 0, this.d, this.d);
      cv.pop();
    }

    this.displayRot();
    let d = this.d;
    cv.stroke(0, 255, 0);
    cv.strokeWeight(1);

    //top
    if (this.onTop()) {
      let m = this.topLeft();
      let n = this.topRight();
      cv.line(m[0], m[1], n[0], n[1]);
    }

    //buttom
    if (this.onBottom()) {
      let m = this.bottomLeft();
      let n = this.bottomRight();
      cv.line(m[0], m[1], n[0], n[1]);
    }

    //left
    if (this.onLeft()) {
      let m = this.topLeft();
      let n = this.bottomLeft();
      cv.line(m[0], m[1], n[0], n[1]);
    }
    //right
    if (this.onRight()) {
      let m = this.bottomRight();
      let n = this.topRight();
      cv.line(m[0], m[1], n[0], n[1]);
    }
    cv.pop();
  }

  nposIn(x1, y1, x2, y2) {
    if (this.nx > x1 && this.nx < x2 && this.ny > y1 && this.ny < y2) {
      //console.log("ons");
      return true;
    }
    return false;
  }

  onTop() {
    if (
      this.nposIn(
        -this.w / 2 + this.d / 2,
        -this.h / 2 - this.d / 2,
        this.w / 2 - this.d / 2,
        -this.h / 2 + this.d / 2
      )
    ) {
      return true;
    }
    return false;
  }

  onBottom() {
    if (
      this.nposIn(
        -this.w / 2 + this.d / 2,
        this.h / 2 - this.d / 2,
        this.w / 2 - this.d / 2,
        this.h / 2 + this.d / 2
      )
    ) {
      return true;
    }
    return false;
  }

  onLeft() {
    if (
      this.nposIn(
        -this.w / 2 - this.d / 2,
        -this.h / 2 + this.d / 2,
        -this.w / 2 + this.d / 2,
        +this.h / 2 - this.d / 2
      )
    ) {
      return true;
    }
    return false;
  }

  onRight() {
    if (
      this.nposIn(
        +this.w / 2 - this.d / 2,
        -this.h / 2 + this.d / 2,
        +this.w / 2 + this.d / 2,
        +this.h / 2 - this.d / 2
      )
    ) {
      return true;
    }
    return false;
  }

  onTopRight() {
    if (
      this.nposIn(
        +this.w / 2 - this.d / 2,
        -this.h / 2 - this.d / 2,
        +this.w / 2 + this.d / 2,
        -this.h / 2 + this.d / 2
      )
    ) {
      return true;
    }
    return false;
  }
  onTopLeft() {
    if (
      this.nposIn(
        -this.w / 2 - this.d / 2,
        -this.h / 2 - this.d / 2,
        -this.w / 2 + this.d / 2,
        -this.h / 2 + this.d / 2
      )
    ) {
      return true;
    }
    return false;
  }

  onBottomRight() {
    if (
      this.nposIn(
        +this.w / 2 - this.d / 2,
        +this.h / 2 - this.d / 2,
        +this.w / 2 + this.d / 2,
        +this.h / 2 + this.d / 2
      )
    ) {
      return true;
    }
    return false;
  }

  onBottomLeft() {
    if (
      this.nposIn(
        -this.w / 2 - this.d / 2,
        +this.h / 2 - this.d / 2,
        -this.w / 2 + this.d / 2,
        +this.h / 2 + this.d / 2
      )
    ) {
      return true;
    }
    return false;
  }

  peakPoints() {
    let tl = this.topLeft();
    let tr = this.topRight();
    let bl = this.bottomLeft();
    let br = this.bottomRight();

    return [
      min(tl[0], tr[0], bl[0], br[0]),
      max(tl[0], tr[0], bl[0], br[0]),
      min(tl[1], tr[1], bl[1], br[1]),
      max(tl[1], tr[1], bl[1], br[1]),
    ];
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

  topRight() {
    let x = this.x + (cos(this.r) * this.w) / 2 + (sin(this.r) * this.h) / 2;
    let y = this.y + (sin(this.r) * this.w) / 2 - (cos(this.r) * this.h) / 2;
    return [x, y];
  }

  topLeft() {
    let x = this.x - (cos(this.r) * this.w) / 2 + (sin(this.r) * this.h) / 2;
    let y = this.y - (sin(this.r) * this.w) / 2 - (cos(this.r) * this.h) / 2;
    return [x, y];
  }

  bottomRight() {
    let x = this.x + (cos(this.r) * this.w) / 2 - (sin(this.r) * this.h) / 2;
    let y = this.y + (sin(this.r) * this.w) / 2 + (cos(this.r) * this.h) / 2;
    return [x, y];
  }

  bottomLeft() {
    let x = this.x - (cos(this.r) * this.w) / 2 - (sin(this.r) * this.h) / 2;
    let y = this.y - (sin(this.r) * this.w) / 2 + (cos(this.r) * this.h) / 2;
    return [x, y];
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

  generatePro(sx, sy, enter, what) {
    let x = floor(this.x - sx);
    let y = floor(this.y - sy);

    let obj =
      "translate(x + " +
      x +
      " * scale, y + " +
      y +
      " * scale);" +
      enter +
      "   " +
      "rotate(" +
      this.r +
      ");" +
      enter +
      "   " +
      what +
      "(0, 0, " +
      floor(this.w) +
      " * scale, " +
      floor(this.h) +
      " * scale);";

    let fill =
      "fill(" +
      round(red(this.c1)) +
      ", " +
      round(green(this.c1)) +
      ", " +
      round(blue(this.c1)) +
      ");";

    return (
      "push();" +
      enter +
      "   " +
      fill +
      enter +
      "   " +
      obj +
      enter +
      "   pop();"
    );
  }
}

class Rectangle extends Shape {
  constructor(x, y, w, h, c1, c2, sw, r) {
    super(x, y, w, h, c1, c2, sw, r);
  }

  copy() {
    return new Rectangle(
      this.x,
      this.y,
      this.w,
      this.h,
      this.c1,
      this.c2,
      this.sw,
      this.r
    );
  }

  display(on) {
    cv.push();
    cv.rectMode(CENTER);
    cv.stroke(this.c2);

    cv.strokeWeight(this.sw);

    if (on) {
      cv.fill(red(this.c1) - 30, green(this.c1) - 30, blue(this.c1) - 30);
    } else {
      cv.fill(this.c1);
    }
    cv.translate(this.x, this.y);
    cv.rotate(this.r);
    cv.rect(0, 0, this.w, this.h);
    cv.pop();
  }

  mouseOn(con) {
    let x = mouseX - this.x;
    let y = mouseY - this.y;

    let nx = cos(this.r) * x + sin(this.r) * y;
    let ny = -sin(this.r) * x + cos(this.r) * y;

    if (!con) {
      return false;
    }
    if (
      nx > -this.w / 2 &&
      nx < this.w / 2 &&
      ny > -this.h / 2 &&
      ny < +this.h / 2
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

  generatePro(sx, sy, enter) {
    return super.generatePro(sx, sy, enter, "rect");
  }
}

class Ellipse extends Shape {
  constructor(x, y, w, h, c1, c2, sw, r) {
    super(x, y, w, h, c1, c2, sw, r);
  }

  copy() {
    return new Ellipse(
      this.x,
      this.y,
      this.w,
      this.h,
      this.c1,
      this.c2,
      this.sw,
      this.r
    );
  }

  display(on) {
    cv.push();
    cv.stroke(this.c2);
    cv.strokeWeight(this.sw);
    if (on) {
      cv.fill(red(this.c1) - 30, green(this.c1) - 30, blue(this.c1) - 30);
    } else {
      cv.fill(this.c1);
    }

    cv.translate(this.x, this.y);
    cv.rotate(this.r);
    cv.ellipse(0, 0, this.w, this.h);
    cv.pop();
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
      dist(
        mouseX,
        mouseY,
        this.x - fx * cos(this.r) + fy * sin(this.r),
        this.y - fy * cos(this.r) - fx * sin(this.r)
      ) +
        dist(
          mouseX,
          mouseY,
          this.x + fx * cos(this.r) - fy * sin(this.r),
          this.y + fy * cos(this.r) + fx * sin(this.r)
        ) <=
      m
    ) {
      return true;
    }
    return false;
  }

  generatePro(sx, sy, enter, what) {
    return super.generatePro(sx, sy, enter, "ellipse");
  }
}

function mouseIn(x1, y1, x2, y2) {
  if (mouseX > x1 && mouseX < x2 && mouseY > y1 && mouseY < y2) {
    //console.log("ons");
    return true;
  }
  return false;
}

class ShapeDragInfo {
  constructor(
    x,
    y,
    w,
    h,
    r,
    topRight,
    bottomRight,
    bottomLeft,
    topLeft,
    dx,
    dy
  ) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.r = r;
    this.topRight = topRight;
    this.bottomRight = bottomRight;
    this.bottomLeft = bottomLeft;
    this.topLeft = topLeft;
    this.dx = dx;
    this.dy = dy;
    this.wh = w / h;
  }
}
