import scoring from '../scoring.js';

function generateScoreMappings(wordsFoundMappings) {
  let out = {};
  for (let user in wordsFoundMappings) {
    out[user] = 0;
    for (let i = 0; i < wordsFoundMappings[user].length; i++)
      out[user] += scoring(wordsFoundMappings[user][i]);
  }
  return out;
}

export default generateScoreMappings;
