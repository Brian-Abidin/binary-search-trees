import Node from "./node.js";
// accepts array when initialized.
export default class Tree {
  constructor(array) {
    const sortedArray = [...new Set(array.sort((a, b) => a - b))];
    this.root = this.buildTree(sortedArray); // return value of buildTree
  }

  // takes an array of data and turns it into a balanced binary tree full of
  // Node objects appropriately placed, sorting and removing dupes
  // returns level-0 root node
  buildTree(array) {
    console.log(array, "Array");
    if (array.length === 0) return null;
    const mid = Math.floor(array.length / 2);
    const node = new Node(array[mid]);

    const leftArr = array.slice(0, mid);
    const rightArr = array.slice(mid + 1, array.length);

    node.left = this.buildTree(leftArr);
    node.right = this.buildTree(rightArr);

    return node;
  }

  // [1, 2, 3, 4, 5]
  // false
  // node {data: 3, left, right}
  // leftArr = [1, 2]
  // rightArr = [3, 4]
  // line 21: recursion starts
  // > array = [1, 2]
  // false
  // node {data: 2, left, right}
  // leftArr = [1]
  // rightArr = []
  // line 21: recursion again
  // > array = [1]
  // false
  // node {data: 1, left, right}
  // leftArr = []
  // rightArr = []
  // line 21: recursion again
  // > array []
  // true return null
  // node {data: 1, left = null, right = null}
  //
  insert(value) {
    let currNode = this.root;
    while (currNode.left !== null || currNode.right !== null) {
      console.log(currNode);
      if (currNode.data === value) return;
      if (value > currNode.data) {
        currNode = currNode.right;
      } else {
        currNode = currNode.left;
      }
    }
    currNode.data > value
      ? (currNode.left = new Node(value))
      : (currNode.right = new Node(value));
  }

  deleteItem(value) {}

  find(value) {}

  levelOrder(callback) {}

  inOrder(callback) {}

  preOrder(callback) {}

  postOrder(callback) {}

  height(node) {}

  depth(node) {}

  isBalanced() {}

  rebalance() {}
}
