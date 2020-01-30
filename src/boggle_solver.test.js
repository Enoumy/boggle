const boggle_solver = require('./boggle_solver');

/** Lowercases a string array in-place. (Used for case-insensitive string array
 *  matching).
 * @param {string[]} stringArray - String array to be lowercase.
 */
function lowercaseStringArray(stringArray) {
  for (let i = 0; i < stringArray.length; i++)
    stringArray[i] = stringArray[i].toLowerCase();
}

describe('Boggle Solver tests', () => {
  describe('Normal input', () => {
    test('Normal case 3x3', () => {
      // Tests a normal 3x3 grid.
      const grid = [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']];
      const dictionary = ['abc', 'abdhi', 'abi'];
      const expected = ['abc', 'abdhi'];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test('Normal case 5x5', () => {
      // Tests a normal 5x5 grid.
      const grid = [
        ['qu', 'a', 'x', 's', 'l'],
        ['a', 'r', 'r', 'i', 'l'],
        ['y', 'f', 'i', 'e', 'd'],
        ['m', 'r', 'i', 'c', 'k'],
        ['a', 'n', 'd', 'm', 'o'],
      ];
      const dictionary = [
        'arf',
        'ciel',
        'derrick',
        'army',
        'hawaii',
        'hero',
        'academia',
      ];
      const expected = ['arf', 'ciel', 'derrick', 'army'];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test('No solutions', () => {
      // Tests a grid and dictionary with no possible solutions.
      const grid = [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']];
      const dictionary = ['alphabet', 'aeroplane', 'dijkstra'];
      const expected = [];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test('Word that takes the entire grid', () => {
      // Tests a word that exactly takes the entire grid.
      const grid = [
        ['a', 'b', 's', 't'],
        ['e', 's', 'e', 'm'],
        ['s', 'n', 'i', 'o'],
        ['s', 'e', 's', 'u'],
      ];
      const dictionary = [
        'abstemiousnesses',
        'asbestos',
        'sessensuoimetsba',
        'abstemiousnessesa',
      ];
      const expected = ['abstemiousnesses', 'sessensuoimetsba'];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
  });

  describe('Problem contraints', () => {
    test('Words can spread in all directions', () => {
      const grid = [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']];
      const dictionary = ['eab', 'ebc', 'ecb', 'eda', 'efc', 'ehi', 'eih'];
      const expected = ['eab', 'ebc', 'ecb', 'eda', 'efc', 'ehi', 'eih'];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test("'Qu' counts as two characters", () => {
      const grid = [['b', 'qu'], ['x', 'x']];
      const dictionary = ['bqu'];
      const expected = ['bqu'];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test("'Q' with the wrong succesor", () => {
      const grid = [['qu', 'a'], ['b', 'b']];
      const dictionary = ['qxa', 'qua'];
      const expected = ['qua'];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test('Only returns words with 3+ characters', () => {
      // Tests that the algorithm only returns words with 3+ characters.
      const grid = [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']];
      const dictionary = ['a', 'b', 'c', 'd', 'abc', 'ab', '', 'ghefi'];
      const expected = ['abc', 'ghefi'];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test("Qu tile counts as 2 letters (can't skip the 'u')", () => {
      // Tests that the Qu block tile counts as a single unit.
      const grid = [['qu', 'e', 'r'], ['a', 'b', 'c'], ['d', 'e', 'f']];
      // The Qu count as one unit, the 'u' cannot be skipped or ignored.
      const dictionary = ['querbe', 'qerbe'];
      const expected = ['querbe'];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test("Word can't end in 'q', but it can begin with q", () => {
      // Tests that no words can end in q, but some can actually start with q.
      const grid = [
        ['i', 'r', 'a', 'qu'],
        ['i', 'r', 'a', 'qu'],
        ['i', 'r', 'a', 'qu'],
        ['i', 'r', 'a', 'qu'],
      ];
      const dictionary = ['iraq', 'iraqu', 'quari', 'quaa'];
      // Since 'iraq' ends with a q, and q's are always accompanied by a u, then
      // 'iraq' or any word ending in 'q', won't appear in a Boggle game.
      const expected = ['iraqu', 'quari', 'quaa'];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test("The same word can't use a block more than once", () => {
      // Tests that a sinbgle word does not recycle any chracters.
      const grid = [['a', 'd', 'e'], ['x', 'x', 'x'], ['x', 'x', 'x']];
      const dictionary = ['ade', 'ada', 'adexx', 'xxxxxx', 'xxxxxxx'];
      const expected = ['ade', 'adexx', 'xxxxxx'];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
  });

  describe('Input edge cases', () => {
    test('Grid is 1x1', () => {
      // (Edge case) Since only 1 character words are possible, and these are
      // shorter than 3, then there are no possible solutions.
      const grid = [['a']];
      const dictionary = ['a', 'b', 'c'];
      const expected = [];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test('No repetitions on 1x1 grid', () => {
      const grid = [['a']];
      const dictionary = ['aaa', 'a'];
      const expected = [];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort());
    });

    test('Dictionary is empty', () => {
      // (Edge case) Since there are no possible solutiona, it should return an
      // empty list.
      const grid = [
        ['a', 'b', 'c', 'd'],
        ['e', 'f', 'g', 'h'],
        ['i', 'j', 'k', 'l'],
        ['m', 'n', 'o', 'p'],
      ];
      const dictionary = [];
      const expected = [];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
  });
});
