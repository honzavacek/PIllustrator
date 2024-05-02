class Button {
  constructor(x, y, width, height, text, on, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.switch = on;
    this.color = color;
    this.text = text;
  }

  display() {
    push();
    rectMode(CENTER);

    if (this.mouseOn()) {
      if (this.switch) {
        fill(
          red(this.color) - 30,
          green(this.color) - 30,
          blue(this.color) - 30
        );
      } else {
        fill(225);
      }
    } else {
      if (this.switch) {
        fill(this.color);
      } else {
        fill(255);
      }
    }
    //fill(this.color);
    rect(this.x, this.y, this.width, this.height);
    fill(0);
    textAlign(CENTER, CENTER);
    text(this.text, this.x, this.y);
    pop();
  }

  mouseOn() {
    if (
      mouseX <= this.x + this.width / 2 &&
      mouseX >= this.x - this.width / 2 &&
      mouseY <= this.y + this.height / 2 &&
      mouseY >= this.y - this.height / 2
    ) {
      return true;
    }
    return false;
  }

  mouse() {
    if (this.mouseOn()) {
      this.switch = !this.switch;
      if (this.switch) {
        return true;
      }
    }
    return false;
  }
}
