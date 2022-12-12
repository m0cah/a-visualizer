export function getNeighbors(currentNode, tableData) {
  let neighbors = [];

  for (let i = currentNode.row - 1; i <= currentNode.row + 1; i++) {
    for (let j = currentNode.col - 1; j <= currentNode.col + 1; j++) {
      if (i >= 0 && j >= 0 && i < tableData.numRows && j < tableData.numCols) {
        if (!(i === currentNode.row && j === currentNode.col))
          neighbors.push(tableData.table[i][j]);
      }
    }
  }
  return neighbors;
}

function heuristic(position0, goal) {
  let d1 = Math.abs(position0.x - goal.x);
  let d2 = Math.abs(position0.y - goal.y);

  return d1 + d2;
}

export function astar(tableData, setTableData, start, end) {
  console.log(start);
  console.log(end);
  let openSet = [];
  let closedSet = [];
  let path = [];

  openSet.push(start);

  while (openSet.length > 0) {
    let lowestIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].fCost < openSet[lowestIndex].fCost) {
        lowestIndex = i;
      }
    }
    let current = openSet[lowestIndex];

    if (current === end) {
      let temp = current;
      path.push(temp);
      while (temp.parent) {
        path.push(temp.parent);
        temp = temp.parent;
      }
      return path.reverse();
    }

    openSet.splice(lowestIndex, 1);
    closedSet.push(current);

    let neighbors = getNeighbors(current, tableData);

    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];

      if (neighbor.className === "wall" || closedSet.includes(neighbor)) {
        continue;
      }

      if (neighbor.className !== "start" && neighbor.className !== "end") {
        document.getElementById(
          neighbor.row + "-" + neighbor.col
        ).style.backgroundColor = "green";
      }

      if (neighbor.className !== "end") {
      }

      let costToMove = current.gCost + heuristic(current, neighbor);
      if (costToMove < neighbor.gCost || !openSet.includes(neighbor)) {
        neighbor.gCost = costToMove;
        neighbor.hCost = heuristic(neighbor, end);
        neighbor.parent = current;

        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        }
      }
    }
  }
  return [];
}
