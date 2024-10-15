
const iterativeDeepeningAStar = function (tree, heuristic, start, goal) {
  var threshold = heuristic[start][goal];
  while (true) {
    console.log("Iteration with threshold: " + threshold);
    var distance = iterativeDeepeningAStarRec(
      tree,
      heuristic,
      start,
      goal,
      0,
      threshold
    );
    if (distance === Number.MAX_VALUE) {
      // Node not found and no more nodes to visit
      return -1;
    } else if (distance < 0) {
      // if we found the node, the function returns the negative distance
      console.log("Found the node we're looking for!");
      return -distance;
    } else {
      // if it hasn't found the node, it returns the (positive) next-bigger threshold
      threshold = distance;
    }
  }
};

const iterativeDeepeningAStarRec = function (
  tree,
  heuristic,
  node,
  goal,
  distance,
  threshold
) {
  console.log("Visiting Node " + node);

  if (node === goal) {
    // We have found the goal node we we're searching for
    return -distance;
  }

  var estimate = distance + heuristic[node][goal];
  if (estimate > threshold) {
    console.log("Breached threshold with heuristic: " + estimate);
    return estimate;
  }

  //...then, for all neighboring nodes....
  var min = Number.MAX_VALUE;
  for (var i = 0; i < tree[node].length; i++) {
    if (tree[node][i] !== 0) {
      var t = iterativeDeepeningAStarRec(
        tree,
        heuristic,
        i,
        goal,
        distance + tree[node][i],
        threshold
      );
      if (t < 0) {
        // Node found
        return t;
      } else if (t < min) {
        min = t;
      }
    }
  }
  return min;
};
