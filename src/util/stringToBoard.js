function stringToBoard(str) {
  str = str.toUpperCase();
  let grid = [];
  let gridSize = Math.floor(Math.sqrt(str.length));
  let curr = 0;
  for (let y = 0; y < gridSize; y++) {
    grid.push([]);
    for (let x = 0; x < gridSize; x++) {
      let current_character = str.charAt(curr);
      if (current_character === 'Q') grid[y].push(current_character + 'u');
      else grid[y].push(current_character);
      curr++;
    }
  }
  return grid;
}

export default stringToBoard;
