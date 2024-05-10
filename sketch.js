let colorPicker;
let creator;
let shapes = [];
let shift = false;
let selected = -1;
let aboutShapes;

let canvaX = 730;
let canvaY = 580;
let layers;

let ctrl = false;

let selShape;
let selX;
let selY;
let selecting = false;

let cv;

let p;

let con = 0;

function setup() {
  createCanvas(900, 750);

  cv = createGraphics(canvaX, canvaY);

  colorPicker = new ColorPicker(60, height - 60, 100);
  creator = new CreatingShapes();
  aboutShapes = new AboutShapes(20, canvaY + 30);
  layers = new Layer(canvaX, 100, width - canvaX, 480);

  colorPicker.render();
  colorPicker.render();

  //p = createP("hello");
  let button = select("#copyb");
  button.mouseClicked(processing);
}

function draw() {
  //canvaBackground();
  cv.background(255);
  aboutShapes.run();
  if (selShape != null) {
    selShape.run();
  }

  shapesRunAndDisplay();
  colorPicker.display();
  creator.display();
  layers.display();
  aboutShapes.display();

  if (selecting) {
    cv.push();
    cv.rectMode(CORNER);
    cv.fill(200, 100);
    cv.rect(selX, selY, mouseX - selX, mouseY - selY);
    cv.pop();
  }

  if (selShape != null) {
    selShape.displaySelected();
  }
  image(cv, 0, 0);

  fill(0);
  ellipse(canvaX / 2, canvaY / 2, 5, 5);
  noFill();
  rect(0, 0, canvaX, canvaY);

  let elemPro = select("#fncPro");
  elemPro.html(processingMsg(0));

  let elemP5 = select("#fncP5");
  elemP5.html(processingMsg(1));

  let proTab = select("#pro-tab");
  proTab.mousePressed(fPro);

  let p5Tab = select("#p5-tab");
  p5Tab.mousePressed(fP5);
}

function fPro() {
  con = 0;
}

function fP5() {
  con = 1;
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

  if (keyCode == CONTROL) {
    ctrl = true;
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
  if (keyCode == CONTROL) {
    if (ctrl) {
      ctrl = false;
    }
  }
}

/* 
TO DO
možnost měnit 
multi select
central point


*/
