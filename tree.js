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
  insert(value, currNode = this.root) {
    // Recursion
    if (currNode === null) return new Node(value);
    if (currNode.data === value) return currNode;
    if (value < currNode.data) {
      currNode.left = this.insert(value, currNode.left);
    } else if (value > currNode.data) {
      currNode.right = this.insert(value, currNode.right);
    }
    return currNode;
  }

  // finds the node with the next highest data of currNode
  getSuccessor(currNode) {
    currNode = currNode.right;
    while (currNode !== null && currNode.left !== null) {
      currNode = currNode.left;
    }
    return currNode;
  }

  deleteItem(value, currNode = this.root) {
    // base case
    if (currNode === null) return currNode;
    if (value > currNode.data) {
      currNode.right = this.deleteItem(value, currNode.right);
    } else if (value < currNode.data) {
      currNode.left = this.deleteItem(value, currNode.left);
      // if node data === value
      // if node has 0 children or
      // left or right child
    } else {
      if (currNode.left === null) {
        return currNode.right;
      }
      if (currNode.right === null) {
        return currNode.left;
      }
      // if node has both children
      const successor = this.getSuccessor(currNode);
      currNode.data = successor.data;
      currNode.right = this.deleteItem(successor.data, currNode.right);
    }
    return currNode;
    /*
    deleteItem(3, this.root)
    (currNode === null) false
    (3 > 5) false
    (3 < 5) true
    currNode.left = (this.deleteItem(3, currNode.left))
    ** recursion 1**
    deleteItem(3, Node{data: 3, left: 1, right: 4})
    (currNode === null) false
    (3 > 3) false
    (3 < 3) false
    (currNode.left === null) false
    (currNode.right === null) false
    successor = getSuccesor(currNode)
    > successor = Node{data: 4}
    Node{data: 3} = Node{data: 4}
    Node{data: 4, right: Node {data :4}} = this.deleteItem(4, Node{data: 4})
    ** recursion 2 **
    (currNode === null) false
    (4 = 4)
    currNode.left === null true
    return node.right (null)
    so, Node{data 4, left: 1, right: null} RECURSION 2 COMPLETE
    return Node{data 4, left: 1, right: null} 
    so, currNode.left = Node{data 4, left: 1, right: null} RECURSION 1 COMPLETE
    */
  }

  find(value, currNode = this.root) {
    if (currNode === null) return null;
    if (currNode.data === value) return currNode;
    if (currNode.data > value) {
      currNode = this.find(value, currNode.left);
    }
    if (currNode.data < value) {
      currNode = this.find(value, currNode.right);
    }
    return currNode;
  }

  levelOrder(callback, queue = [this.root], order = []) {
    // traverse the tree breadth-first level order
    // call the callback on each node as it traverses,
    // passing the whole node as an argument
    // similar to how forEach works for arrays
    // if no callback, throw an error
    // use an array acting as a queue to keep track of all the nodes
    if (callback === undefined) throw new Error("callback function required");

    if (queue.length === 0) return queue[0];
    const currNode = queue[0];
    if (callback(currNode)) {
      if (currNode.left !== null) queue.push(currNode.left);
      if (currNode.right !== null) queue.push(currNode.right);
      order.push(queue.shift().data);
      this.levelOrder(callback, queue, order);
    }
    return order;
  }

  inOrder(callback, currNode = this.root) {
    // traverse tree in depth-first order and pass each node
    // to the call back.
    // throw error if no callback is given.
    if (callback === undefined) throw new Error("callback function required");
    if (currNode === null) return;
    this.inOrder(callback, currNode.left);
    callback(currNode);
    this.inOrder(callback, currNode.right);
  }

  preOrder(callback, currNode = this.root) {
    if (callback === undefined) throw new Error("callback function required");
    if (currNode === null) return;
    callback(currNode);
    this.preOrder(callback, currNode.left);
    this.preOrder(callback, currNode.right);
  }

  postOrder(callback, currNode = this.root) {
    if (callback === undefined) throw new Error("callback function required");
    if (currNode === null) return;
    this.postOrder(callback, currNode.left);
    this.postOrder(callback, currNode.right);
    callback(currNode);
  }

  height(node) {
    if (node === null) return -1;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    console.log(leftHeight, rightHeight);
    return Math.max(leftHeight, rightHeight) + 1;
  }
  // 8
  // left -> 7 -> 6 -> null (-1)

  depth(node, counter = 0, currNode = this.root) {
    if (node === null) throw new Error("Node doesn't exist");
    if (node.data > currNode.data)
      counter = this.depth(node, (counter += 1), currNode.right);
    if (node.data < currNode.data)
      counter = this.depth(node, (counter += 1), currNode.left);
    return counter;
  }

  isBalanced() {
    const leftSubtree = this.height(this.root.left);
    const rightSubtree = this.height(this.root.right);
    const max = Math.max(leftSubtree, rightSubtree);
    const min = Math.min(leftSubtree, rightSubtree);

    return !(max - min > 1);
  }

  rebalance() {}
}
