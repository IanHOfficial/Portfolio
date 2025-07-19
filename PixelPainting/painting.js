const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

const colorPicker = document.getElementById('colorPicker');
const brushSizeSlider = document.getElementById('brushDisplay');
const clearBtn = document.getElementById('clearBtn');
const saveBtn = document.getElementById('saveBtn');
const brushDisplay = document.getElementById('brushDisplay');
const increaseBrush = document.getElementById('increaseBrush');
const decreaseBrush = document.getElementById('decreaseBrush');

const undoStack = [];
const redoStack = [];

let drawing = false;
let color = colorPicker.value;
let brushSize = brushDisplay.innerHTML;
let pixelSize = 16;

colorPicker.addEventListener('input', () => color = colorPicker.value);

canvas.addEventListener('mousedown', e => { saveState(); drawing = true; draw(e); });
canvas.addEventListener('mouseup', () => { drawing = false; });
canvas.addEventListener('mouseleave', () => drawing = false);
canvas.addEventListener('mousemove', draw);

window.addEventListener('keydown', function(e) {
  const key = e.key.toLowerCase();

  if (key === 'c') {
    clearCanvas();
  }

  if (e.ctrlKey && key === 'z' && !e.shiftKey) {
    e.preventDefault();
    undo();
  }

  if (e.ctrlKey && e.shiftKey && key === 'z') {
    e.preventDefault();
    redo();
  }

  if (key === '+' || key === '=') {
    increaseBrush.click();
  }

  if (key === '-' || key === '_') {
    decreaseBrush.click();
  }
});

function saveState() {
  undoStack.push(canvas.toDataURL());
  if (undoStack.length > 20) undoStack.shift();
  redoStack.length = 0;
}

function draw(e) {
  if (!drawing) return;

  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) / pixelSize);
  const y = Math.floor((e.clientY - rect.top) / pixelSize);

  ctx.fillStyle = color;
  for (let dx = 0; dx < brushSize; dx++) {
    for (let dy = 0; dy < brushSize; dy++) {
      ctx.fillRect((x + dx) * pixelSize, (y + dy) * pixelSize, pixelSize, pixelSize);
    }
  }
}

function updateBrushDisplay() {
  brushDisplay.textContent = brushSize;
}

function clearCanvas() {
    saveState();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function undo() {
  if (undoStack.length === 0) return;
  const lastState = undoStack.pop();
  redoStack.push(canvas.toDataURL());
  loadImage(lastState);
}

function redo() {
  if (redoStack.length === 0) return;
  const nextState = redoStack.pop();
  undoStack.push(canvas.toDataURL());
  loadImage(nextState);
}

function loadImage(dataUrl) {
  const img = new Image();
  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  };
  img.src = dataUrl;
}

increaseBrush.addEventListener('click', () => {
  if (brushSize < 5) {
    brushSize++;
    updateBrushDisplay();
  }
});

decreaseBrush.addEventListener('click', () => {
  if (brushSize > 1) {
    brushSize--;
    updateBrushDisplay();
  }
});

clearBtn.addEventListener('click', () => {
    clearCanvas();
});

saveBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'pixel-art.png';
    link.href = canvas.toDataURL();
    link.click();
});

updateBrushDisplay();