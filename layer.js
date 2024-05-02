class Layer {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.pg = createGraphics(w, h);
    this.hi = 30; //height item
    this.d = 10;
    this.dragging = -1;
    this.dx = 0;
    this.dy = 0;
  }

  display() {
    this.pg.background(230);
    for (let i = shapes.length - 1; i >= 0; i--) {
      let j = shapes.length - 1 - i;
      this.pg.fill(200);
      this.pg.rect(0, this.hi * j, this.w, this.hi);
      this.pg.fill(200);
      this.pg.rect(0, this.hi * j, this.hi, this.hi);
      shapes[i].lDisplay(
        this.hi / 2,
        this.hi * j + this.hi / 2,
        this.hi - this.d,
        this.hi - this.d
      );
      this.displayXButton(
        this.w - this.hi / 2,
        this.hi * j + this.hi / 2,
        this.hi - this.d,
        this.hi - this.d,
        mouseIn(
          this.x + this.w - this.hi + this.d / 2,
          this.y + this.hi * j + this.d / 2,
          this.x + this.w - this.d / 2,
          this.y + this.hi * j + this.hi - this.d / 2
        )
      );
      this.displayCButton(
        this.w - this.hi * 1.5,
        this.hi * j + this.hi / 2,
        this.hi - this.d,
        this.hi - this.d,
        mouseIn(
          this.x + this.w - this.hi * 2 + this.d / 2,
          this.y + this.hi * j + this.d / 2,
          this.x + this.w - this.hi - this.d / 2,
          this.y + this.hi * j + this.hi - this.d / 2
        )
      );
    }
    if (selShape != null && creator.seleB.switch) {
      this.pg.push();
      this.pg.noFill();
      this.pg.strokeWeight(2);
      this.pg.stroke(255, 0, 0);
      for (let i = 0; i < selShape.infos.length; i++) {
        let j = shapes.length - 1 - selShape.infos[i].index;
        this.pg.rect(0, this.hi * j, this.w, this.hi);
      }

      this.pg.pop();
    }

    if (this.dragging != -1) {
      this.pg.push();

      for (let i = 0; i <= shapes.length; i++) {
        if (
          mouseIn(
            this.x,
            this.y + i * this.hi - this.d / 2,
            this.x + this.w,
            this.y + i * this.hi + this.d / 2
          )
        ) {
          this.pg.push();
          this.pg.fill(50);
          this.pg.rect(0, i * this.hi - this.d / 2, this.w, this.d);
          this.pg.pop();
        }
      }

      this.pg.fill(200, 100);
      this.pg.rect(
        mouseX - this.x + this.dx,
        mouseY - this.y + this.dy,
        this.w,
        this.hi
      );
      this.pg.pop();
    }

    image(this.pg, this.x, this.y);
  }

  displayCButton(x, y, w, h, on) {
    this.pg.push();
    this.pg.rectMode(CENTER);
    this.pg.fill(190);
    this.pg.rect(x, y, w, h);

    if (on) {
      this.pg.fill(0, 255, 0);
    } else {
      this.pg.fill(0);
    }
    this.pg.textSize(20);
    this.pg.text("C", x - 7, y + 7);
    this.pg.pop();
  }

  displayXButton(x, y, w, h, on) {
    this.pg.push();
    this.pg.rectMode(CENTER);
    this.pg.fill(190);
    this.pg.rect(x, y, w, h);

    this.pg.strokeWeight(2);

    if (on) {
      this.pg.stroke(255, 0, 0);
    } else {
      this.pg.stroke(0);
    }
    this.pg.line(x - w / 2, y - h / 2, x + w / 2, y + h / 2);
    this.pg.line(x + w / 2, y - h / 2, x - w / 2, y + h / 2);
    this.pg.pop();
  }

  mouseP() {
    for (let i = shapes.length - 1; i >= 0; i--) {
      let j = shapes.length - 1 - i;

      if (
        mouseIn(
          this.x + this.w - this.hi + this.d / 2,
          this.y + this.hi * j + this.d / 2,
          this.x + this.w - this.d / 2,
          this.y + this.hi * j + this.hi - this.d / 2
        )
      ) {
        shapes.splice(i, 1);
        selShape = null;
        break;
      } else if (
        mouseIn(
          this.x + this.w - this.hi * 2 + this.d / 2,
          this.y + this.hi * j + this.d / 2,
          this.x + this.w - this.hi - this.d / 2,
          this.y + this.hi * j + this.hi - this.d / 2
        )
      ) {
        copyItemCl(i);
      } else if (
        mouseIn(
          this.x,
          this.y + this.hi * j,
          this.x + this.w,
          this.y + this.hi * (j + 1)
        )
      ) {
        this.dragging = i;
        this.dx = -mouseX + this.x;
        this.dy = this.hi * j - mouseY + this.y;

        if (creator.seleB.switch) {
          selShape = new SelectedShape([i]);
          selShape.c1 = shapes[i].c1;
          colorPicker.setColor(shapes[i].c1);
        }
      }
    }
  }

  mouseR() {
    if (this.dragging != -1) {
      for (let i = 0; i <= shapes.length; i++) {
        if (
          mouseIn(
            this.x,
            this.y + i * this.hi - this.d / 2,
            this.x + this.w,
            this.y + i * this.hi + this.d / 2
          )
        ) {
          this.swap(this.dragging, i);
        }
      }

      this.dragging = -1;
    }
  }

  swap(index, gap) {
    let g = shapes.length - gap;
    let to = g;
    if (g > index) to--;

    let newShapes1 = [];

    for (let i = 0; i <= shapes.length - 1; i++) {
      if (i != index) {
        newShapes1.push(shapes[i]);
      }
    }

    let newShapes2 = [];

    for (let i = 0; i <= shapes.length - 1; i++) {
      if (i < to) {
        newShapes2.push(newShapes1[i]);
      } else if (i == to) {
        newShapes2.push(shapes[index]);
      } else {
        newShapes2.push(newShapes1[i - 1]);
      }
    }

    shapes = newShapes2;
    if (selShape != null) {
      selShape = new SelectedShape([to]);
      //colorPicker.setColor(shapes[selected].c1);
    }
  }
}
