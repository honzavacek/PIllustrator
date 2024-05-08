class SelectedShape extends Shape {
  constructor(arr) {
    let [l, r, t, b] = shapes[arr[0]].peakPoints();

    for (let i = 0; i < arr.length; i++) {
      let [l1, r1, t1, b1] = shapes[arr[i]].peakPoints();

      if (t1 < t) t = t1;
      if (b1 > b) b = b1;
      if (l1 < l) l = l1;
      if (r1 > r) r = r1;
    }

    if (arr.length == 1) {
      l = shapes[arr[0]].left();
      r = shapes[arr[0]].right();
      t = shapes[arr[0]].top();
      b = shapes[arr[0]].bottom();
    }

    super((r + l) / 2, (t + b) / 2, r - l, b - t, color(0), color(0), 1, 0);

    this.infos = [];

    for (let i = 0; i < arr.length; i++) {
      let kx = (shapes[arr[i]].x - this.x) / this.w; // (this.w * cos(this.infos[i].r) + this.h * sin(this.infos[i].r));;
      let ky = (shapes[arr[i]].y - this.y) / this.h;
      let kw = shapes[arr[i]].w / this.w;
      let kh = shapes[arr[i]].h / this.h;

      this.infos.push(new Info(arr[i], kx, ky, kw, kh, shapes[arr[i]].r));
    }

    if (this.infos.length == 1) {
      this.r = shapes[this.infos[0].index].r;
      this.infos[0].r = 0;
      this.c1 = shapes[this.infos[0].index].c1;
    }
  }

  getV() {
    let t = shapes[this.arr[0]].top();
    let b = shapes[this.arr[0]].bottom();
    let r = shapes[this.arr[0]].right();
    let l = shapes[this.arr[0]].left();
    for (let i = 1; i < this.arr.lenght; i++) {
      if (shapes[this.arr[i]].top() < t) t = shapes[this.arr[i]].top();
      if (shapes[this.arr[i]].bottom() > b) b = shapes[this.arr[i]].bottom();
      if (shapes[this.arr[i]].left() < l) l = shapes[this.arr[i]].left();
      if (shapes[this.arr[i]].top() < r) r = shapes[this.arr[i]].right();
    }
    return [t, b, r, l];
  }

  displaySelected() {
    cv.push();
    for (let i = 0; i < this.infos.length; i++) {
      shapes[this.infos[i].index].selRect();
    }
    cv.pop();

    super.displaySelected();
  }

  run() {
    super.run();

    if (this.dragging == -1 && !aboutShapes.changing()) {
      if (this.w < 0) {
        for (let i = 0; i < this.infos.length; i++) {
          this.infos[i].kx *= -1;
        }
        this.w *= -1;
      }
      if (this.h < 0) {
        for (let i = 0; i < this.infos.length; i++) {
          this.infos[i].ky *= -1;
        }
        this.h *= -1;
      }
    }

    for (let i = 0; i < this.infos.length; i++) {
      shapes[this.infos[i].index].x =
        this.x +
        cos(this.r) * this.infos[i].kx * this.w +
        -sin(this.r) * this.infos[i].ky * this.h;
      shapes[this.infos[i].index].y =
        this.y +
        cos(this.r) * this.infos[i].ky * this.h +
        sin(this.r) * this.infos[i].kx * this.w;

      shapes[this.infos[i].index].w = this.infos[i].kw * this.w;
      //(this.w * cos(this.infos[i].r) + this.h * sin(this.infos[i].r));
      shapes[this.infos[i].index].h = this.infos[i].kh * this.h;
      //(this.w * sin(this.infos[i].r) + this.h * cos(this.infos[i].r));
      shapes[this.infos[i].index].r = this.infos[i].r + this.r;
    }
    //}

    if (this.infos.length == 1) {
      shapes[this.infos[0].index].c1 = this.c1;
    }
  }

  stopDragging() {
    this.dragging = -1;
  }
}

class Info {
  constructor(index, kx, ky, kw, kh, r) {
    this.index = index;
    this.kx = kx;
    this.ky = ky;
    this.kw = kw;
    this.kh = kh;
    this.r = r;
  }
}
