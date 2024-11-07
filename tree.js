// accepts array when initializedc.
export default class Tree {
  constructor(array) {
    this.array = array;
    this.root = []; // return value of buildTree
  }

  // takes an array of data and turns it into a balanced binary tree full of
  // Node objects appropriately placed, sorting and removing dupes
  // returns level-0 root node
  buildTree(array) {
    const sortedSet = new Set(array.sort((a, b) => a - b));
    console.log(sortedSet);
    this.root = [...sortedSet];
  }
}

function buildTree(array) {}

function insert(value) {}

function deleteItem(value) {}
