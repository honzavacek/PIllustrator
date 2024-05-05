function canvaBackground() {
  push();
  fill(255);
  noStroke();
  rect(0, 0, width, canvaY);
  stroke(0);
  noFill();
  rect(0, 0, canvaX, canvaY);
  pop();
}

function shapesRunAndDisplay() {
  if (!creator.seleB.switch) {
    selShape = null;
  }

  for (let i = 0; i < shapes.length; i++) {
    let con = true;
    for (let j = shapes.length - 1; j > i; j--) {
      if (shapes[j].mouseOn(true)) {
        con = false;
        break;
      }
    }
    //shapes[i].run();
    shapes[i].display(
      shapes[i].mouseOn(con) &&
        selShape == null &&
        creator.seleB.switch &&
        !selecting
    );
  }

  if (selecting) {
    for (let i = 0; i < shapes.length; i++) {
      if (shapes[i].centerIn(selX, selY, mouseX, mouseY)) {
        shapes[i].selRect();
      }
    }
  }

  if (selShape != null) {
    selShape.c1 = colorPicker.c;
    //shapes[selected].displaySelected();
  }
}

function shapesMouseP() {
  if (creator.seleB.switch && mouseIn(0, 0, canvaX, canvaY)) {
    let con = true;

    if (selShape != null) {
      if (selShape.selMouseOn()) {
        selShape.startDragging(false);
        con = false;
      }
    }

    if (con) {
      let s = false;
      for (let j = shapes.length - 1; j >= 0; j--) {
        if (shapes[j].mouseOn(true)) {
          s = true;
          selShape = new SelectedShape([j]);

          colorPicker.setColor(shapes[j].c1);
          selShape.startDragging(true);
          break;
        }
      }
      if (!s) {
        selShape = null;
        selecting = true;
        selX = mouseX;
        selY = mouseY;
      }
    }
  }
}

function shapesMouseR() {
  if (selShape != null) {
    if (selShape.dragging != -1) selShape.stopDragging();
  }

  if (selecting) {
    selecting = false;
    let arr = [];
    for (let i = 0; i < shapes.length; i++) {
      if (shapes[i].centerIn(selX, selY, mouseX, mouseY)) {
        arr.push(i);
      }
    }
    if (arr.length > 0) {
      if (arr.length == 1) {
        colorPicker.setColor(shapes[arr[0]].c1);
      }
      selShape = new SelectedShape(arr);
    }
  }
}

function processing() {
  let x = canvaX / 2;
  let y = canvaY / 2;
  let msg =
    "void shapes (float x, float y, float scale){\n   rectMode(CENTER);\n";

  for (let i = 0; i < shapes.length; i++) {
    msg += "   " + shapes[i].generatePro(x, y, "\n") + "\n";
  }

  msg += "\n}";

  console.log(msg);
  copyStringToClipboard(msg);
}

function processingMsg() {
  let x = canvaX / 2;
  let y = canvaY / 2;
  let msg =
    "void shapes (float x, float y, float scale){<br>   rectMode(CENTER);<br>";

  for (let i = 0; i < shapes.length; i++) {
    msg += "   " + shapes[i].generatePro(x, y, "<br>") + "<br>";
  }

  msg += "<br>}<br>";

  return msg;
}

function copyItem() {
  if (selShape != null) {
    for (let i = 0; i < selShape.infos.length; i++) {
      shapes.push(shapes[selShape.infos[i].index].copy());
    }
    let arr = [];
    for (let i = 0; i < selShape.infos.length; i++) {
      arr.push(shapes.length - 1 - i);
    }
    selShape = new SelectedShape(arr);

    //if (selected != -1) {
    //  selected = shapes.length - 1;
    //  colorPicker.setColor(shapes[selected].c1);
    //}
  }
}

function copyItemCl(i) {
  if (i != -1) {
    shapes.push(shapes[i].copy());
  }
}

function bubbeSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) sortSwap(arr, j, j + 1);
    }
  }
}

function sortSwap(arr, i, j) {
  let hold = arr[i];
  arr[i] = arr[j];
  arr[j] = hold;
}

function deleteShapes() {
  if (selShape != null) {
    let arr = [];
    for (let i = 0; i < selShape.infos.length; i++) {
      arr.push(selShape.infos[i].index);
    }
    console.log(arr);
    bubbeSort(arr);
    console.log(arr);

    for (let i = arr.length - 1; i >= 0; i--) {
      shapes.splice(arr[i], 1);
    }
    selShape = null;
  }
}

function copyStringToClipboard(str) {
  // Create new element
  var el = document.createElement("textarea");
  // Set value (string to be copied)
  el.value = str;
  // Set non-editable to avoid focus and move outside of view
  el.setAttribute("readonly", "");
  el.style = { position: "absolute", left: "-9999px" };
  document.body.appendChild(el);
  // Select text inside element
  el.select();
  // Copy text to clipboard
  document.execCommand("copy");
  // Remove temporary element
  document.body.removeChild(el);
}
