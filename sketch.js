let colorPicker;
let creator;
let shapes = [];
let shift = false;
let selected = -1;
let aboutShapes;

let canvaX = 730;
let canvaY = 580;
let layers;

let selShape;
let selX;
let selY;
let selecting = false;
//let center;

function setup() {
  createCanvas(900, 750);

  colorPicker = new ColorPicker(60, height - 60, 100);
  creator = new CreatingShapes();
  aboutShapes = new AboutShapes(20, canvaY + 30);
  layers = new Layer(canvaX, 100, width - canvaX, 500);

  colorPicker.render();
  colorPicker.render();
}

function draw() {
  canvaBackground();

  aboutShapes.run();
  if (selShape != null) {
    selShape.run();
  }

  shapesRunAndDisplay();
  colorPicker.display();
  creator.display();
  layers.display();
  aboutShapes.display();

  fill(0);
  ellipse(canvaX / 2, canvaY / 2, 5, 5);

  if (selecting) {
    push();
    rectMode(CORNER);
    fill(200, 100);
    rect(selX, selY, mouseX - selX, mouseY - selY);
    pop();
  }

  if (selShape != null) {
    selShape.displaySelected();
  }
}

function mousePressed() {
  colorPicker.mouseP();
  creator.mouseP();
  layers.mouseP();
  aboutShapes.mouseP();
  shapesMouseP();
}

function mouseReleased() {
  colorPicker.mouseR();
  creator.mouseR();
  layers.mouseR();
  aboutShapes.mouseR();
  shapesMouseR();
}

function keyPressed() {
  if (keyCode == SHIFT) {
    shift = true;
  }
  if (key == "g") {
    processing();
  }
  if (key == "c") {
    copyItem();
  }

  if (keyCode == BACKSPACE) {
    deleteShapes();
  }

  if (key == "e") {
    creator.allButton(false);
    creator.ellipB.switch = true;
  }
  if (key == "r") {
    creator.allButton(false);
    creator.rectB.switch = true;
  }
  if (key == "s") {
    creator.allButton(false);
    creator.seleB.switch = true;
  }
}

function keyReleased() {
  if (keyCode == SHIFT) {
    if (shift) {
      shift = false;
    }
  }
}

/* 
TO DO
možnost měnit 
multi select
central point


*/
