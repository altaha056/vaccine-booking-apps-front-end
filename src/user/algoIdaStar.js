const AlgoIdaStar = (matrix, heuristic, nodeGoalsLoc) => {
  let returnValue = []  
  const iterativeDeepeningAStar =  (tree, heuristic, start, goal)=> {
    let threshold = heuristic[start][start];
    while (true) {
      returnValue.push("Iteration with threshold: " + threshold);
      let distance = iterativeDeepeningAStarRec(
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
        returnValue.push("Found the node we're looking for!");
        return -distance;
      } else {
        // if it hasn't found the node, it returns the (positive) next-bigger threshold
        threshold = distance;
      }
    }
  };

  const iterativeDeepeningAStarRec =  (
    tree,
    heuristic,
    node,
    goal,
    distance,
    threshold
  )=> {

    returnValue.push("Visiting Node " + node);

    if (node === goal) {
      // We have found the goal node we we're searching for
      return -distance;
    }

    let estimate = distance + heuristic[node][node];
    if (estimate > threshold) {
      returnValue.push("Breached threshold with heuristic: ", estimate);
      return estimate;
    }

    //...then, for all neighboring nodes....
    let min = Number.MAX_VALUE;
    for (let i = 0; i < tree[node].length; i++) {
      if (tree[node][i] !== 0) {
        let t = iterativeDeepeningAStarRec(
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


  const a = performance.now();
  iterativeDeepeningAStar(matrix, heuristic, 0, 4);
  const b = performance.now();

  returnValue.push("running time: " + (b - a) + " ms");
  console.log(returnValue);
  
  return returnValue

}

export default AlgoIdaStar