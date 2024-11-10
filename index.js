import Tree from "./tree.js";

function getRandomint(max, amount) {
  const randArray = [];
  while (randArray.length < amount) {
    randArray.push(Math.floor(Math.random() * max));
  }
  return randArray;
}

const array = getRandomint(100, 10);
const tree = new Tree(array);

const prettyPrint = (node = tree.root, prefix = "", isLeft = true) => {
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

prettyPrint();
console.log(tree.isBalanced());
console.log(
  tree.levelOrder((ele) => ele),
  "levelOrder"
);
console.log(
  tree.preOrder((ele) => ele),
  "preOrder"
);
console.log(
  tree.inOrder((ele) => ele),
  "inOrder"
);
console.log(
  tree.postOrder((ele) => ele),
  "postOrder"
);

tree.insert(101);
tree.insert(110);
tree.insert(160);

prettyPrint();

console.log(tree.isBalanced());
tree.reBalance();
prettyPrint();
console.log(tree.isBalanced());
console.log(
  tree.levelOrder((ele) => ele),
  "levelOrder"
);
console.log(
  tree.preOrder((ele) => ele),
  "preOrder"
);
console.log(
  tree.inOrder((ele) => ele),
  "inOrder"
);
console.log(
  tree.postOrder((ele) => ele),
  "postOrder"
);
