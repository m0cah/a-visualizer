/**
 * Algo from: https://www.youtube.com/watch?v=mZfyt03LDH4&list=PLFt_AvWsXl0cq5Umv3pMC9SPnKjfp9eGW&index=3
 */

/**
  What is inside tableData: 
  tableData: initData,
  setTableData: setDataDef,
  algorithmType: 'A*',
  setAlgorithmType: () => {},
 */

/**
 * gCost = dis to start
 * hCost = dis to end
 * fCost = combined dis
 */

//might need to use a different dataStructures
const open = new Map();
const closed = new Set();

export function getNeighbors(currentNode, tableData) {
  //is this the right data-structure?
  let neighbors = [];

  for (let i = currentNode.row - 1; i <= currentNode.row + 1; i++) {
    for (let j = currentNode.col - 1; j <= currentNode.col + 1; j++) {
      // check if (i,j) is in array bounds
      if (i >= 0 && j >= 0 && i < tableData.numRows && j < tableData.numCols) {
        // the point isn't its own neighbour
        if (!(i === currentNode.row && j === currentNode.col))
          neighbors.push(tableData.table[i][j]);
      }
    }
  }
<<<<<<< Updated upstream
  return neighbors;
=======
    return neighbors;
>>>>>>> Stashed changes
}

function getDistance(nodeA, nodeB) { 
  let distX = Math.abs(nodeA.row - nodeB.row); 
  let distY = Math.abs(nodeA.col - nodeB.col);

  if(distX > distY) { 
    return 14*distY + 10*(distX - distY);
  }
  return 14*distX + 10*(distY - distX)
}

function reTracePath(start, end) { 
  let path = new Array();
  let curr = end; 

  while(curr !== start) { 
    path.push(curr);
    curr = curr.parent;
  }
  
  return path.reverse();
}

export function astar(tableData, setTableData, start, end) {
  console.log("In astar");

  //has value when start node has not even been decided ... weird bug to fix later
  //start has null values for distance, need to fix
  console.log(start);
  open.set(start.row + "-" + start.col, start);
  console.log(open);
  
  while (open.size > 0) {
    let curr = open.get(start.row + "-" + start.col);
    let deleted = "";

<<<<<<< Updated upstream
    open.forEach(element => {
      if(element.fCost < curr.fCost || element.fCost === curr.fCost && element.hCost < curr.hCost) { 
        curr = element;
        deleted = curr.row + "" + curr.col;
      }
    });
    
    open.delete(deleted);
    closed.add(curr);

    if (curr === end) {
      console.log("mission accomplished");
      return reTracePath(start, end);
=======
  //add the start node first
  open.push(startNode);
  //while we have not reached the end node...
  while (open.length > 0) {

    //sort the availible nodes by fCost (least fCost to greatest fCost) note: fCost is the sum of the distance to the startNode and the distance to the endNode
    let sortedOpen = open.sort((a, b) => (a.fCost > b.fCost) ? 1 : (a.fCost < b.fCost) ? -1 : 0);
    let curr = sortedOpen[0];
    //remove the node from the open list
    open.shift();

    //add the currentNode to the already evaluated list
    closed.push(curr);

    //currentNode is the end node
    if(curr.hCost === 0){
      console.log("CurrentNode is End Node");
      break;
>>>>>>> Stashed changes
    }

    let neighbors = getNeighbors(curr, tableData);

<<<<<<< Updated upstream
    for (let neighbor of neighbors) {
      if (neighbor.className === "Wall" || closed.has(neighbor)) {
        continue;
      }
      let newCostToNeighbor = curr.gCost + getDistance(curr, neighbor);
      if(newCostToNeighbor < neighbor.gCost || newCostToNeighbor < !open.has(neighbor.row + "-" + neighbor.col)) { 
        neighbor.gCost = newCostToNeighbor; 
        neighbor.hCost = getDistance(neighbor, end);
        neighbor.parent = curr;

        if(!open.has(neighbor.row + "-" + neighbor.col)) { 
          open.set(neighbor.row + "-" + neighbor.col, neighbor);
        }
      }
    }
=======
    let bestNodeIndex = 0;
    //Implement for each loop here:
    neighbors.forEach((neighbor, neighborNumber, neighbors) => {
      if(!(neighbor.className === 'wall')){
        if(neighbor.fCost < neighbors[bestNodeIndex].fCost){
          bestNodeIndex = neighborNumber;
          open.push(neighbor);
        }
        else if(neighbor.fCost === neighbors[bestNodeIndex].fCost){
          if(neighbor.gCost < neighbors[bestNodeIndex].gCost){
            bestNodeIndex = neighborNumber;
            open.push(neighbor);
          }
        } 
      }
    })
    neighbors[bestNodeIndex].parent = curr;

    curr = neighbors[bestNodeIndex];
    setTableData();
>>>>>>> Stashed changes
  }

  console.log(tableData.table);


}
