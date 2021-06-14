// note that for css grid, grid elements
// start at position 1, not 0

export const GRID_SIZE = 21;

export function randomGridPosition() {
  return {
    x: Math.floor(Math.random() * GRID_SIZE) + 1,
    y: Math.floor(Math.random() * GRID_SIZE) + 1,
  };
  // Math.floor(Math.random()*GRID_SIZE) produces a number
  // between 0 and GRID_SIZE - 1 -- i.e. 0 and 20
  // So, we add 1 to get a number between 1 and 21
}

export function outsideGrid(position) {
  return (
    position.x < 1 ||
    position.x > GRID_SIZE ||
    position.y < 1 ||
    position.y > GRID_SIZE
  );
}
