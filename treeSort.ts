// 二叉排序树，又叫二叉搜索树
// 之所以能排序，是因为中序遍历得到一个有序数组
// 之所以能查找，是因为很容易得到第K大的数，而无需完整遍历
class Tree {
  root: TreeNode | null;
  constructor(elements: number[]) {
    this.root = null;
    elements.forEach((n) => {
      this.insert(n)
    }
    )
  }

  print() {
    this.clear(this.root)
    this.mid_order(this.root);
  }

  printInZigzag() {
    let stack1 = [this.root], stack2 = [];
    let res = [], index = 0;
    while (true) {
      res[index] = []
      if (index % 2 === 0) {
        while (stack1.length > 0) {
          let p = stack1.pop();
          res[index].push(p.value);
          if (p.left) {
            stack2.push(p.left)
          }
          if (p.right) {
            stack2.push(p.right)
          }

        }
      } else {
        while (stack2.length > 0) {
          let p = stack2.pop();
          res[index].push(p.value);
          if (p.right) {
            stack1.push(p.right)
          }
          if (p.left) {
            stack1.push(p.left)
          }
        }
      }
      if (stack1.length === 0 && stack2.length === 0) {
        break;
      }
      index++
    }
    console.log(res)
    return res
  }

  mid_order(node: TreeNode) {
    if (!node) {
      return
    }
    if (node.left) {
      this.mid_order(node.left);
    }
    console.log(node.value)
    if (node.right) {
      this.mid_order(node.right);
    }
  }



  insert(n: number, node?: TreeNode) {
    if (!this.root) { this.root = new TreeNode(n); return }

    if (!node) {
      node = this.root;
    }

    if (n < node.value) {
      if (!node.left) {
        node.left = new TreeNode(n);
      } else {
        this.insert(n, node.left)
      }
    } else {
      if (!node.right) {
        node.right = new TreeNode(n);
      } else {
        this.insert(n, node.right)
      }
    }

  }

  delete(node: TreeNode) {
    if (!node.left && !node.right) {
      node.deleted = true;
      return node;
    }
    if (!node.left) {
      node.replace(node.right);
      return node;
    }

    if (!node.right) {
      node.replace(node.left);
      return node;
    }
    let nextNode = node.right;
    while (nextNode.left) {
      nextNode = nextNode.left;
    }

    node.value = nextNode.value;
    return this.delete(nextNode)
  }

  max(node: TreeNode) {
    let nextNode = node;
    while (nextNode.right) {
      nextNode = nextNode.right;
    }
    return nextNode.value
  }


  min(node: TreeNode) {
    let nextNode = node;
    while (nextNode.left) {
      nextNode = nextNode.left;
    }
    return nextNode.value
  }

  clear(root: TreeNode) {
    if (!root) {
      return;
    }

    if (root.left && root.left.deleted) {
      root.left = null
    }

    if (root.right && root.right.deleted) {
      root.right = null
    }

    this.clear(root.left)
    this.clear(root.right)
  }

  getNthLargest(node: TreeNode, nth: number): number {
    const nodes = this.getNodeNumber(node);
    if (nodes === 0) {
      return undefined;
    }

    if (nodes < nth) {
      return undefined
    }

    const leftNum = node.left ? this.getNodeNumber(node.left) : 0;
    const extra = nth - leftNum;
    if (extra < 0) {
      return this.getNthLargest(node.left, nth)
    } else if (extra > 2) {
      return this.getNthLargest(node.right, extra - 1)
    } else {
      switch (extra) {
        case 0:
          return this.max(node.left);
        case 1:
          return node.value;
        case 2:
          return this.min(node.right);
      }
    }

  }


  getNodeNumber(node?: TreeNode) {
    if (!node) {
      node = this.root;
    }
    let sum = 0;
    function getNumber(node: TreeNode) {
      if (node) {
        sum++
        getNumber(node.left)
        getNumber(node.right)
      }
    }
    getNumber(node)
    return sum;
  }

  draw() {
    const lines = [];
    function pre_order(node: TreeNode, line: number) {
      if (!lines[line]) {
        lines[line] = [];
      }
      if (!node) {
        lines[line].push(0)
        return
      }
      lines[line].push(node.value)
      pre_order(node.left, line + 1);
      pre_order(node.right, line + 1);

    }
    pre_order(this.root, 0);
    console.log(lines)
  }

  showTree() {
    console.log(JSON.stringify(this.root))
  }

}

class TreeNode {
  public value: number;
  public left: TreeNode | null;
  public right: TreeNode | null;
  public deleted: boolean;
  constructor(n: number) {
    this.value = n;
    this.left = null;
    this.right = null;
  }
  replace(node: TreeNode) {
    this.value = node.value;
    this.left = node.left;
    this.right = node.right;
  }
}

const tree = new Tree([12, 15, 8, 6, 7, 3, 1, 2, 3, 5, 9, 2, 5])
tree.print()
tree.insert(4)
tree.insert(14)
tree.print()
// console.log('NUM', tree.getNodeNumber(tree.root))
// console.log('15th', tree.getNthLargest(tree.root, 15))
// console.log('10th', tree.getNthLargest(tree.root, 10))

tree.delete(tree.root.left)
tree.print()
tree.draw()
tree.insert(20)
tree.insert(13)
tree.draw()
tree.printInZigzag()
