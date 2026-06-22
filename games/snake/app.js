const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const statusEl = document.getElementById('status');
const restartButton = document.getElementById('restartButton');

const tileSize = 20;

let snake = [];
let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };
let food = { x: 0, y: 0 };
let score = 0;
let gameRunning = false;
let gameLoopId = null;

function resizeCanvas() {
  const size = Math.min(window.innerWidth - 40, 400);
  canvas.width = size;
  canvas.height = size;
  canvas.style.width = `${size}px`;
  canvas.style.height = `${size}px`;
}

function getGridSize() {
  return canvas.width / tileSize;
}

function randomCell() {
  const gridSize = getGridSize();
  return {
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize),
  };
}

function placeFood() {
  food = randomCell();
  while (snake.some((segment) => segment.x === food.x && segment.y === food.y)) {
    food = randomCell();
  }
}

function resetGame(initialDirection = { x: 1, y: 0 }) {
  snake = [
    { x: 8, y: 10 },
    { x: 7, y: 10 },
    { x: 6, y: 10 },
  ];
  direction = { ...initialDirection };
  nextDirection = { ...initialDirection };
  score = 0;
  updateHud();
  placeFood();
  gameRunning = true;
  statusEl.textContent = 'Game on!';
  if (gameLoopId) cancelAnimationFrame(gameLoopId);
  gameLoopId = requestAnimationFrame(loop);
}

function updateHud() {
  scoreEl.textContent = String(score);
}

function drawCell(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * tileSize, y * tileSize, tileSize - 1, tileSize - 1);
}

function drawBoard() {
  const gridSize = getGridSize();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let x = 0; x < gridSize; x += 1) {
    for (let y = 0; y < gridSize; y += 1) {
      if ((x + y) % 2 === 0) {
        ctx.fillStyle = '#0f172a';
      } else {
        ctx.fillStyle = '#111827';
      }
      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }

  drawCell(food.x, food.y, '#f472b6');

  snake.forEach((segment, index) => {
    drawCell(segment.x, segment.y, index === 0 ? '#34d399' : '#22c55e');
  });
}

function updateSnake() {
  direction = nextDirection;
  const gridSize = getGridSize();

  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
    endGame();
    return;
  }

  if (snake.some((segment) => segment.x === head.x && segment.y === head.y)) {
    endGame();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 1;
    updateHud();
    placeFood();
  } else {
    snake.pop();
  }
}

function endGame() {
  gameRunning = false;
  statusEl.textContent = `Game over! Final score: ${score}. Press Restart to try again.`;
  if (gameLoopId) cancelAnimationFrame(gameLoopId);
}

function loop() {
  if (!gameRunning) return;

  updateSnake();
  drawBoard();

  if (gameRunning) {
    gameLoopId = requestAnimationFrame(loop);
  }
}

function setDirection(event) {
  const key = event.key.toLowerCase();
  const map = {
    arrowup: { x: 0, y: -1 },
    w: { x: 0, y: -1 },
    arrowdown: { x: 0, y: 1 },
    s: { x: 0, y: 1 },
    arrowleft: { x: -1, y: 0 },
    a: { x: -1, y: 0 },
    arrowright: { x: 1, y: 0 },
    d: { x: 1, y: 0 },
  };

  const candidate = map[key];
  if (!candidate) return;

  if (!gameRunning) {
    resetGame(candidate);
    return;
  }

  const isOpposite = candidate.x === -direction.x && candidate.y === -direction.y;
  if (isOpposite) return;

  nextDirection = candidate;
}

window.addEventListener('keydown', setDirection);
restartButton.addEventListener('click', resetGame);
window.addEventListener('resize', resizeCanvas);

resizeCanvas();
updateHud();
placeFood();
drawBoard();
statusEl.textContent = 'Press an arrow key or click Restart to begin.';
