// accepts array when initializedc.
export default class Tree {
  constructor(array) {
    const sortedArray = [...new Set(array.sort((a, b) => a - b))];
    this.root = this.buildTree(sortedArray); // return value of buildTree
  }

  // takes an array of data and turns it into a balanced binary tree full of
  // Node objects appropriately placed, sorting and removing dupes
  // returns level-0 root node
  buildTree(array) {}
}

function buildTree(array) {}

function insert(value) {}

function deleteItem(value) {}
