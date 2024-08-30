/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} source
 * @param {number} destination
 * @param {number} target
 * @return {number[][]}
 */
var modifiedGraphEdges = function(n, edges, source, destination, target) {
  const distanceFromSourceToNode = Array.from({length: n}, () => Infinity);
  distanceFromSourceToNode[source] = 0;

  const positiveEdges = edges.filter((e) => e[2] > 0);
  const negativeEdges = edges.filter((e) => e[2] === -1);

  const fromTo = Array.from({length: n}, () => new Map());

  for (let i = 0; i < positiveEdges.length; i++) {
      const [from, to, weight] = positiveEdges[i];

      fromTo[from].set(to, { weight });
      fromTo[to].set(from, { weight });
  }

  let shortestPath = spfa(distanceFromSourceToNode, fromTo, source);

  if (shortestPath === target) return fillEdgesInfinity(edges);
  if (shortestPath < target) return [];

  while (negativeEdges.length > 0) {
      const edge = negativeEdges.pop();
      edge[2] = 1;
      const [from, to, weight] = edge;

      fromTo[from].set(to, { weight });
      fromTo[to].set(from, { weight });

      shortestPath = spfa(distanceFromSourceToNode, fromTo, from);

      if (shortestPath === target) return fillEdgesInfinity(edges);

      if (shortestPath < target) {
          edge[2] += target - shortestPath;
          return fillEdgesInfinity(edges);
      }

      shortestPath = spfa(distanceFromSourceToNode, fromTo, to);

      if (shortestPath === target) return fillEdgesInfinity(edges);

      if (shortestPath < target) {
          edge[2] += target - shortestPath;
          return fillEdgesInfinity(edges);
      }
  }

  return [];

  function spfa(distanceFromSourceToNode, fromTo, start) {
      let queue = [ start ];
      const queued = new Set(queue);

      while (queue.length > 0) {
          const nextQueue = [];

          for (const node of queue) {
              queued.delete(node);

              for (const to of fromTo[node].keys()) {
                  const weight = fromTo[node].get(to).weight;

                  const newDist = distanceFromSourceToNode[node] + weight;

                  if (newDist < distanceFromSourceToNode[to]) {
                      distanceFromSourceToNode[to] = newDist;

                      if (!queued.has(to)) {
                          queued.add(to);
                          nextQueue.push(to);
                      }
                  }
              }
          }

          queue = nextQueue;
      }

      return distanceFromSourceToNode[destination];
  }

  function fillEdgesInfinity(edges) {
      for (const edge of edges) {
          if (edge[2] === -1) edge[2] = 2 * 1e9;
      }

      return edges;
  }
};