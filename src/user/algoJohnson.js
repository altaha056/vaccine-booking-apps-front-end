
const AlgoJohnson = (matrix, nodeGoalsLoc) => {
  //finding node with smallest weight
  function get_min_distance(dist, visited) {
    let minimum = Infinity;
    let minVertex = 0;
    for (let vertex = 0; vertex < dist.length; vertex++) {
      if (minimum > dist[vertex] && !visited[vertex]) {
        minimum = dist[vertex];
        minVertex = vertex;
      }
    }
    return minVertex;
  }
  // og = original graph
  // ng = new graph
  // src = source
  function dijkstra(og, ng, src) {
    let N = og.length;
    let spt_set = [];
    let d = inRange(N, () => Infinity);
    d[src] = 0;
    let dijkstraValue = []
    inRange(N, () => {
      let cur = get_min_distance(d, spt_set);
      spt_set[cur] = true;
      inRange(N, (vertex) => {
        if (
          !spt_set[vertex] &&
          d[vertex] > d[cur] + ng[cur][vertex] &&
          og[cur][vertex] != 0
        ) {
          d[vertex] = d[cur] + ng[cur][vertex];
          dijkstraValue.push(`from ${cur} to ${vertex} equals ${d[vertex]} `)
          for (let i = 0; i < nodeGoalsLoc.length; i++) {
            if (vertex===nodeGoalsLoc[i][0]) {
              dijkstraValue.push(`Goals found: ${nodeGoalsLoc[i][1]} at node ${vertex}`);
            }
          }
        }
      });
    });
    inRange(N, (i) => dijkstraValue.push(`Vertex ${i}: ${d[i]}`));
    return dijkstraValue
  }
  
  function bellmanFord(edges, graph, N) {
    let d = inRange(N + 1, () => Infinity);
  
    d[N] = 0;
    inRange(N, (i) => {
      edges.push({ src: N, des: i, weight: 0 });
    });
    for (let i = 0; i < N; i++) {
      edges.forEach(({ src, des, weight }) => {
        if (d[src] != Infinity && d[src] + weight < d[des]) {
          d[des] = d[src] + weight;
        }
      });
    }
    return d.slice(0, N);
  }
  
  function johnsonAlgorithm(graph) {
    let edges = [];
    inRange(graph.length, (i) => {
      inRange(graph[i].length, (j) => {
        if (graph[i][j] != 0) {
          edges.push({ src: i, des: j, weight: graph[i][j] });
        }
      });
    });
    let new_weights = bellmanFord(edges, graph, graph.length);
    let new_graph = inRange(graph.length, (i) => inRange(graph.length, () => 0));
    inRange(graph.length, (i) =>
      inRange(graph[i].length, (j) => {
        if (graph[i][j] != 0) {
          new_graph[i][j] = graph[i][j] + new_weights[i] - new_weights[j];
        }
      })
    );
    let johnsonValue
    //the original recursive does looping for n times equivalent to nodes total
    inRange(1, (src) => {
      johnsonValue=dijkstra(graph, new_graph, src);
    });
    return johnsonValue
  }
  
  //for looping function
  function inRange(index, callback) {
    return [...Array(index).keys()].map((val) => callback(val));
  }
  
  let start = performance.now()
  let asd= johnsonAlgorithm(matrix);
  let end = performance.now()
  asd.push("running time = "+(end-start)+" ms")
  return asd
}

export default AlgoJohnson