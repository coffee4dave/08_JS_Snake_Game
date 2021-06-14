import { getInputDirection } from './input.js';

export const SNAKE_SPEED = 4;
const snakeBody = [{ x: 11, y: 11 }];
let newSegments = 0;

/* How to update the snake for movement
the idea for moving the snake is this:
move the head to its new position
but the second segment should go to where the head used to be.
and the third segment shoudl go to where the second segment was.
etc.

this is essentially shifting the array up one,
and placing the head where it should be.

the last segment will just disappear - because the place
it was will not have a segment drawn in it. */

export function update() {
  const inputDirection = getInputDirection();
  addSegments();
  // snakeBody.length - 2 is the second to last segment
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    // set the snakeBody element after the current element
    // equal to the current element
    // essential shift the elements 'right'
    snakeBody[i + 1] = { ...snakeBody[i] };
    // what's the difference between above and below?
    // snakeBody[i + 1] = snakeBody[i];
    //
    // use the ... spread operator with the ith element of
    // the snakeBody array to spread the key value pairs that are
    // held in snakeBody[i] to fill a new object { }
    // Then, that new object is assigned to snakeBody[i+1]
    // Essentially we are making a new object with the k-v pairs
    // from snakeBody[i], then assigning that to snakeBody[i+1]
  }
  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}

export function draw(gameBoard) {
  snakeBody.forEach((segment) => {
    const snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add('snake');
    gameBoard.appendChild(snakeElement);
  });
}

export function expandSnake(amount) {
  newSegments += amount;
}

export function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false;
    return equalPositions(segment, position);
  });
}

export function getSnakeHead() {
  return snakeBody[0];
}

export function snakeIntersection() {
  // concept: check if the head is touching any other element
  // of the snakeBody.  so just use onSnake.
  // but, when we first coded the onSnake function, there was
  // only one parameter -- the position. And when we call
  // onSnake with the position of the snakeHead, it will of course
  // return true because the snakeHead is a part of the snake.
  // So we add a new paramter to the onSnake function --
  // ignoreHead
  return onSnake(snakeBody[0], { ignoreHead: true });
}
function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    // just duplicate the last element of snake and append it
    // to the end

    // snakeBody[snakeBody.length] = { ...snakeBody[snakeBody.length - 1] };
    // ^-- above is the same as --v
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }
  newSegments = 0;
}
