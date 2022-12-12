//https://github.com/PrudhviGNV/pathFinderVisualizer/tree/master/src/algorithms

export function dijkstra(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    startNode.gCost = 0;
    const unvisitedNodes = getAllNodes(grid); // Q: different from using grid or slice of grid???

    while (unvisitedNodes.length) {
      sortNodesByDistance(unvisitedNodes);
      const closestNode = unvisitedNodes.shift();
      // If we encounter a wall, we skip it.
      if (!(closestNode.className === "wall")) {
        // If the closest node is at a distance of infinity,
        // we must be trapped and should stop.

        if (closestNode.className !== "start" && closestNode.className !== "end") {
            document.getElementById(
              closestNode.row + "-" + closestNode.col
            ).style.backgroundColor = "green";
          }

        if (closestNode.gCost === Infinity) return visitedNodesInOrder;
        closestNode.seen = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode === finishNode) { 
            return visitedNodesInOrder;
        }
        updateUnvisitedNeighbors(closestNode, grid);
      }
    }
  }
  
  function getAllNodes(grid) {
    const nodes = [];
    for(let i = 0; i < grid.length; i++) { 
        for(let j = 0; j < grid[i].length; j++) { 
            nodes.push(grid[i][j]);
        }
    }
    return nodes;
  }
  
  function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.hCost - nodeB.hCost);
  }
  
  function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.gCost = node.gCost + 1;
      neighbor.parent = node;
    }
  }
  
  function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.seen);
  }