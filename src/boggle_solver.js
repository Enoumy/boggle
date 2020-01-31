class TrieNode {
  constructor() {
    this.children = new Object();
    this.isEnd = false;
    this.word = '';
  }
}

class CoordinateSet {
  constructor() {
    this.coordinates = new Object();
  }

  /** Adds a y, x coordinate to the set.
   * @param {number} y - y axis value of the coordinate.
   * @param {number} x - x axis value of the coordinate.
   */
  add(y, x) {
    if (!this.coordinates.hasOwnProperty(y)) this.coordinates[y] = new Set();
    this.coordinates[y].add(x);
  }

  /** Deletes a y, x coordinate from the set.
   * @param {number} y - y axis value of the coordinate.
   * @param {number} x - x axis value of the coordinate.
   */
  delete(y, x) {
    if (!this.coordinates.hasOwnProperty(y)) return;
    this.coordinates[y].delete(x);
    if (this.coordinates[y].length === 0) delete this.coordinates[y];
  }

  /** Determines whether the y, x coordinate is present in the set.
   * @param {number} y - y axis value of the coordinate.
   * @param {number} x - x axis value of the coordinate.
   * @returns {boolean} cointains - returns where the coordinate is in the set.
   */
  has(y, x) {
    if (!this.coordinates.hasOwnProperty(y)) return false;
    return this.coordinates[y].has(x);
  }
}

// Possible adjacent letters [y offset, x offset]
const directions = [
  [-1, -1], // Upper left
  [-1, 0], // Upper
  [-1, 1], // Upper right
  [0, 1], // Right
  [1, 1], // Lower right
  [1, 0], // Lower
  [1, -1], // Lower left
  [0, -1], // Left
];

/**
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */
export default function findAllSolutions(grid, dictionary) {
  if (grid == null || dictionary == null) return [];
  lowerCaseStringGrid(grid);
  let originalMappings = lowerCaseStringArray(dictionary);

  let solutions = [];
  let trie = generateTrie(dictionary);

  for (let y = 0; y < grid.length; y++)
    for (let x = 0; x < grid[y].length; x++) {
      let visited = new CoordinateSet();
      searchDFS(grid, y, x, trie, visited, originalMappings, solutions);
    }

  return solutions;
};

/** Performs DFS search on the grid at any given point
 * @param {string[][]} grid - The Boggle game board.
 * @param {number} y - y axis starting coordinate.
 * @param {number} x - x axis starting coordinate.
 * @param {TrieNode} trieNode - Current TrieNode that is being searched on.
 * @param {CoordinateSet} visited - Keeps track of the visited character cells.
 * @param {Object} originalMappings - Contains the lowercase->original mappings.
 * @param {string[]} solutions - Output set.
 */
function searchDFS(grid, y, x, trieNode, visited, originalMappings, solutions) {
  if (
    y < 0 ||
    x < 0 ||
    y >= grid.length ||
    x >= grid[y].length ||
    visited.has(y, x)
  )
    return;

  if (!trieNode.children.hasOwnProperty(grid[y][x].charAt(0))) return;

  trieNode = trieNode.children[grid[y][x].charAt(0)];

  // Moving to the end of the current cell in case it has more than 1 character
  // ('Qu').
  let i = 1; // i is declared in the scope of the function to be used later.
  for (; trieNode.children.hasOwnProperty(grid[y][x].charAt(i)); i++)
    trieNode = trieNode.children[grid[y][x].charAt(i)];

  // If it has reached both the end of the cell and the trie's word...
  if (i === grid[y][x].length && trieNode.isEnd) {
    solutions.push(originalMappings[trieNode.word]);
    trieNode.isEnd = false;
  }

  visited.add(y, x);

  // For each adjacent letter cell...
  for (let direction = 0; direction < directions.length; direction++) {
    searchDFS(
      grid,
      y + directions[direction][0], // Adjacent tile.
      x + directions[direction][1], // Adjacent tile.
      trieNode,
      visited,
      originalMappings,
      solutions
    );
  }

  visited.delete(y, x);
}

/**
 * Given a list of words returns the corresponding Trie.
 * @param {string[]} dict - The list of available words.
 * @returns {TrieNode} root - Root node of prefix tree.
 */
function generateTrie(dictionary) {
  let root = new TrieNode();
  for (let word = 0; word < dictionary.length; word++) {
    if (dictionary[word].length >= 3) insertWordToTrie(root, dictionary[word]);
  }
  return root;
}

/**
 * Given a Trie and a word, inserts the word into the trie.
 * @param {TrieNode} root - Root node of the trie to be inserted to.
 * @param {string} word - Word to be inserted into the trie.
 */
function insertWordToTrie(root, word) {
  let crawl = root;
  for (let char = 0; char < word.length; char++) {
    if (!crawl.children.hasOwnProperty(word[char]))
      crawl.children[word[char]] = new TrieNode();
    crawl = crawl.children[word[char]];
  }
  crawl.isEnd = true;
  crawl.word = word;
}

/** Lowercases an entire string array.
 * @param {string[][]} grid - 2D string array to be lowercased.
 */
function lowerCaseStringGrid(grid) {
  for (let y = 0; y < grid.length; y++)
    for (let x = 0; x < grid[y].length; x++)
      grid[y][x] = grid[y][x].toLowerCase();
}

/** Given a string array, lowercases the strings in the array and returns a
 *  mapping of the original elements to the nerw elements of the array.
 * @param {string[]} array - String array to be lowercased.
 * @returns {Object} originalMappings - lowercase to original string mapping.
 */
function lowerCaseStringArray(array) {
  let originalMappings = new Object();
  for (let i = 0; i < array.length; i++) {
    let originalValue = array[i];
    array[i] = array[i].toLowerCase();
    originalMappings[array[i]] = originalValue;
  }
  return originalMappings;
}
