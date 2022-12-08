import React, { useContext } from "react";
import { DataContext } from "../DataProvider";

/*
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
    return neighbors;
}

export function astar(tableData, setTableData, startNode, endNode) {
  console.log("In astar");

  //create arrays
  const open = [];
  const closed = [];

  //add the start node first
  open.push(startNode);

  //while we have not reached the end node...
  while (open.length() > 0) {

    //sort the availible nodes by fCost (least fCost to greatest fCost) note: fCost is the sum of the distance to the startNode and the distance to the endNode
    let sortedOpen = open.sort((a, b) => (a.fCost > b.fCost) ? 1 : (a.fCost < b.fCost) ? -1 : 0);

    //let the currentNode to be evaluated be the node with the lowest fCost
    let curr = sortedOpen[0];
    
    //remove the node from the open list
    open.shift();

    //add the currentNode to the already evaluated list
    closed.push(curr);

    //currentNode is the end node
    if(curr.hCost === 0){
      console.log("CurrentNode is End Node");
      return;
    }

    //get the surrounding neighbors of the currentNode
    let neighbors = getNeighbors(curr, tableData);

    //Implement for each loop here:

    neighbors.filter((neighbor) => !(neighbor.className === 'wall') && !closed.includes(neighbor)).forEach((neighbor) => {
      //do A* stuff
    })

  }
}

