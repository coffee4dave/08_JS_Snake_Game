import {
  update as updateSnake,
  draw as drawSnake,
  SNAKE_SPEED,
  getSnakeHead,
  snakeIntersection,
} from './snake.js';

import { update as updateFood, draw as drawFood } from './food.js';

import { GRID_SIZE, outsideGrid } from './grid.js';

let lastRenderTime = 0;
let gameOver = false;

const gameBoard = document.getElementById('game-board');
gameBoard.style.gridTemplateRows = `repeat(${GRID_SIZE}, 1fr)`;
gameBoard.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 1fr)`;

document.addEventListener('keydown', (e) => {
  if (e.code === 'NumpadEnter') gameOver = true;
});

/* main game loop
 */
function main(currentTime) {
  if (gameOver) {
    console.log('game over');
    if (confirm('You lost.  Choose ok to restart.')) {
      // apparently this restarts?
      window.location = './';
    }
    return;
  }
  // request a new frame no matter what
  window.requestAnimationFrame(main);

  // calculate time since last render in seconds
  // divide by 1000 because currentTime is in milliseconds
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;

  // do not animate if time since last render is less than
  // the desired animation rate.  e.g. if we set snake_speed to 1
  // it will render 1 time per second
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  // console.log('Render');
  lastRenderTime = currentTime;

  // logic
  update();

  // based on logic of update function, draw elements
  draw();
}

// start game
console.log('Snake Game is running...');
window.requestAnimationFrame(main);

// helper functions
function update() {
  updateSnake();
  updateFood();
  checkDeath();
}

function draw() {
  // clear the gameboard
  // do this to remove snake pieces that were
  // drawn in previous render
  gameBoard.innerHTML = '';

  // draw the snake and food on the game board
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}
