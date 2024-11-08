import Tree from "./tree.js";
import Node from "./node.js";

console.log("hello");
const myArray = [3, 1, 5, 4, 2, 2, 3, 4, 5, 6, 7, 8, 9]; // Duplicate '2' will be removed in the Set

const tree1 = new Tree(myArray);

tree1.insert(12);
tree1.insert(11);
tree1.insert(13);
// tree1.insert(11);
// tree1.insert(10);

const prettyPrint = (node = tree1.root, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

tree1.deleteItem(2);
console.log(tree1.find(14));
prettyPrint();

function temp(node) {
  console.log(node);
  return node;
}
const arr = [];
const node = new Node(2);

tree1.levelOrder(temp);
