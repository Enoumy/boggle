const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

function gridToLinearString(grid) {
  out = '';
  for (let y = 0; y < grid.length; y++)
    for (let x = 0; x < grid[y].length; x++) out = out + grid[y][x].charAt(0);
  return out;
}

/** Returns a randomly generated sizexsize grid.
 * @param {number} size - Size of square matrix.
 * @returns {string[][]} random square board.
 */
function generateRandomBoggleBoard(size) {
  // prettier-ignore
  const dice = ["AAAFRS", "AAEEEE", "AAFIRS", "ADENNN", "AEEEEM",
                "AEEGMU", "AEGMNN", "AFIRSY", "BJKQXZ", "CCNSTW",
                "CEIILT", "CEILPT", "CEIPST", "DHHNOT", "DHHLOR",
                "DHLNOR", "DDLNOR", "EIIITT", "EMOTTT", "ENSSSU",
                "FIPRSY", "GORRVW", "HIPRRY", "NOOTUW", "OOOTTU"];

  let board = new Array(size);
  for (let i = 0; i < size; i++) {
    board[i] = new Array(size);
    for (let j = 0; j < size; j++) {
      let diceIndex = Math.floor(Math.random() * dice.length);
      board[i][j] = dice[diceIndex].charAt(
        Math.floor(Math.random() * dice[diceIndex].length)
      );
      if (board[i][j] === 'Q') board[i][j] += 'u';
    }
  }
  return board;
}

function addRandomChallenge() {
  let board = gridToLinearString(
    generateRandomBoggleBoard(Math.floor(Math.random() * 3) + 3)
  );
  let today = new Date();
  let date =
    '' +
    today.getFullYear() +
    '-' +
    (today.getMonth() + 1) +
    '-' +
    today.getDate();
  admin
    .firestore()
    .collection('challenges')
    .doc(date)
    .set({ board: board, 'high-score': 0, 'user-scores': {} }, { merge: true })
    .then(() => {
      console.log('Challenge written!');
    })
    .catch(error => {
      console.error('Error adding document: ', error);
    });
}

exports.addChallenge = functions.pubsub
  .schedule('0 8 * * *')
  .timeZone('America/New_York') // Users can choose timezone - default is America/Los_Angeles
  .onRun(context => {
    addRandomChallenge();
  });
