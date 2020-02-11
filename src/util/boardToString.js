function boardToString(board) {
  let out = '';
  for (let y = 0; y < board.length; y++)
    for (let x = 0; x < board[y].length; x++)
      out = out + board[y][x].charAt(0).toLowerCase();
  return out;
}

export default boardToString;
