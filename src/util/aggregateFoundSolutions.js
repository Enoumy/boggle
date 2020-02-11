function aggregateFoundSolutions(wordsFoundAll) {
  let out = new Set();
  for (let key in wordsFoundAll)
    for (let i = 0; i < wordsFoundAll[key].length; i++)
      out.add(wordsFoundAll[key][i].toLowerCase());
  return out;
}

export default aggregateFoundSolutions;
