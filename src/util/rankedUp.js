function rankedUp(scores, previous, current) {
  return (
    findLowestNeighbor(scores, previous) != findLowestNeighbor(scores, current)
  );
}

function findLowestNeighbor(scores, n) {
  // Very inefficient solution to easy problem. Had to rush.
  // TODO: Use binary search.
  let i = scores.length - 1;
  while (i >= 0 && scores[i] > n) i--;
  return i;
}

export default rankedUp;
