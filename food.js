import { onSnake, expandSnake } from './snake.js';
import { randomGridPosition } from './grid.js';

// note that for css grid, grid elements
// start at position 1, not 0
let food = getRandomFoodPosition();
// EXPANSION_RATE defines how many segments will be added
// to snake when snake eats food
const EXPANSION_RATE = 5;

export function update() {
  // check if snake is currently over food
  if (onSnake(food)) {
    console.log('Yum!');
    expandSnake(EXPANSION_RATE);
    food = getRandomFoodPosition();
  }
}

export function draw(gameBoard) {
  const foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add('food');
  gameBoard.appendChild(foodElement);
}

function getRandomFoodPosition() {
  let newFoodPosition;
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }
  return newFoodPosition;
}
