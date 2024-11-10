import Node from "./node.js";

export default class Tree {
  constructor(array) {
    const sortedArray = [...new Set(array.sort((a, b) => a - b))];
    this.root = this.buildTree(sortedArray);
  }

  buildTree(array) {
    if (array.length === 0) return null;
    const mid = Math.floor(array.length / 2);
    const node = new Node(array[mid]);

    const leftArr = array.slice(0, mid);
    const rightArr = array.slice(mid + 1, array.length);

    node.left = this.buildTree(leftArr);
    node.right = this.buildTree(rightArr);

    return node;
  }

  insert(value, currNode = this.root) {
    if (currNode === null) return new Node(value);
    if (currNode.data === value) return currNode;
    if (value < currNode.data) {
      currNode.left = this.insert(value, currNode.left);
    } else if (value > currNode.data) {
      currNode.right = this.insert(value, currNode.right);
    }
    return currNode;
  }

  getSuccessor(currNode) {
    currNode = currNode.right;
    while (currNode !== null && currNode.left !== null) {
      currNode = currNode.left;
    }
    return currNode;
  }

  deleteItem(value, currNode = this.root) {
    if (currNode === null) return currNode;
    if (value > currNode.data) {
      currNode.right = this.deleteItem(value, currNode.right);
    } else if (value < currNode.data) {
      currNode.left = this.deleteItem(value, currNode.left);
    } else {
      if (currNode.left === null) {
        return currNode.right;
      }
      if (currNode.right === null) {
        return currNode.left;
      }
      const successor = this.getSuccessor(currNode);
      currNode.data = successor.data;
      currNode.right = this.deleteItem(successor.data, currNode.right);
    }
    return currNode;
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

  levelOrder(callback, queue = [this.root], orderList = []) {
    if (callback === undefined) throw new Error("callback function required");

    if (queue.length === 0) return queue[0];
    const currNode = queue[0];
    if (callback(currNode)) {
      if (currNode.left !== null) queue.push(currNode.left);
      if (currNode.right !== null) queue.push(currNode.right);
      orderList.push(queue.shift().data);
      this.levelOrder(callback, queue, orderList);
    }
    return orderList;
  }

  inOrder(callback, currNode = this.root, orderList = []) {
    if (callback === undefined) throw new Error("callback function required");
    if (currNode === null) return;
    this.inOrder(callback, currNode.left, orderList);
    orderList.push(callback(currNode).data);
    this.inOrder(callback, currNode.right, orderList);
    return orderList;
  }

  preOrder(callback, currNode = this.root, orderList = []) {
    if (callback === undefined) throw new Error("callback function required");
    if (currNode === null) return;
    orderList.push(callback(currNode).data);
    this.preOrder(callback, currNode.left, orderList);
    this.preOrder(callback, currNode.right, orderList);
    return orderList;
  }

  postOrder(callback, currNode = this.root, orderList = []) {
    if (callback === undefined) throw new Error("callback function required");
    if (currNode === null) return;
    this.postOrder(callback, currNode.left, orderList);
    this.postOrder(callback, currNode.right, orderList);
    orderList.push(callback(currNode).data);
    return orderList;
  }

  height(node) {
    if (node === null) return -1;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

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

  reBalance() {
    const sortedArray = this.inOrder((ele) => ele);
    this.root = this.buildTree(sortedArray);
  }
}
