//
let o_swap = 0,
  o_scan = 0;
function reOrderArray(array) {
  // write code here
  for (let i = 0; i < array.length; i++) {
    o_scan++;
    if (array[i] % 2 === 1) {
      continue;
    }
    for (let k = i + 1; k < array.length; k++) {
      o_scan++;
      if (array[k] % 2 === 1) {
        while (k > i) {
          swap(array, k, k - 1);
          k--;
        }
        break;
      }
    }
    console.log(array);
  }
  return array;
}

function swap(array, i, k) {
  var temp = array[i];
  array[i] = array[k];
  array[k] = temp;
  o_swap++;
}

// console.log(reOrderArray([1, 2, 3, 4, 5, 6, 7]));
// console.log(o_swap, o_scan);

function reOrder(array) {
  var a = [],
    b = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] % 2 === 1) {
      a.push(array[i]);
    } else {
      b.push(array[i]);
    }
  }
  return a.concat(b);
}

// console.log(reOrder([1, 2, 3, 4, 5, 6, 7]));

function KthNode(pRoot, k) {
  function getNthLargest(node, nth) {
    const nodes = getNodeNumber(node);
    if (nodes === 0) {
      return undefined;
    }

    if (nodes < nth) {
      return undefined;
    }

    const leftNum = node.left ? getNodeNumber(node.left) : 0;
    const extra = nth - leftNum;
    console.log(leftNum, extra);
    if (extra < 0) {
      return getNthLargest(node.left, nth);
    } else if (extra > 2) {
      return getNthLargest(node.right, extra - 1);
    } else {
      switch (extra) {
        case 0:
          return max(node.left);
        case 1:
          return node.val;
        case 2:
          return min(node.right);
      }
    }
  }

  function max(node) {
    let nextNode = node;
    while (nextNode.right) {
      nextNode = nextNode.right;
    }
    return nextNode.val;
  }

  function min(node) {
    let nextNode = node;
    while (nextNode.left) {
      nextNode = nextNode.left;
    }
    return nextNode.val;
  }

  function getNodeNumber(node) {
    let sum = 0;
    function getNumber(node) {
      if (node) {
        sum++;
        getNumber(node.left);
        getNumber(node.right);
      }
    }
    getNumber(node);
    return sum;
  }
  return getNthLargest(pRoot, k);
}

function KthNode2(pRoot, k) {
  // write code here
  let i = 0,
    stop = false,
    val: number = null;
  function mid_order(node) {
    if (!node || stop) {
      return;
    }
    if (node.left) {
      mid_order(node.left);
    }
    i++;
    if (i === k) {
      val = node.val;
      stop = true;
    }
    if (node.right) {
      mid_order(node.right);
    }
  }
  mid_order(pRoot);
  return val;
}
// console.log(KthNode({ val: 3, left: { val: 1 }, right: { val: 5 } }, 1));
// console.log(
//   KthNode2(
//     {
//       val: 8,
//       left: { val: 6, right: { val: 7 }, left: { val: 5 } },
//       right: { val: 10, right: { val: 11 }, left: { val: 10 } },
//     },
//     3
//   )
// );

function FindNumbersWithSum(array, sum) {
  // write code here
  var min = array[array.length - 1] * array[array.length - 1],
    arr = [];
  for (let i = 0; array[i] <= sum / 2; i++) {
    for (let j = array.length - 1; array[i] + array[j] >= sum; j--) {
      if (array[i] + array[j] === sum && array[i] * array[j] < min) {
        console.log(arr);
        arr = [array[i], array[j]];
      }
    }
  }
  return arr;
}
// console.log(
//   FindNumbersWithSum(
//     [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
//     21
//   )
// );

function duplicate(numbers) {
  // write code here
  let space = {};
  for (let i = 0; i < numbers.length; i++) {
    space[numbers[i]] = space[numbers[i]] ? 0 : 1;
  }
  return Object.keys(space).find((s) => space[s] === 0);
}

function multiply(array) {
  // write code here
  var dp = [];
  for (let i = 0; i < array.length; i++) {
    (dp[i] = []), (dp[i][i] = array[i]);
    for (let j = i + 1; j < array.length; j++) {
      dp[i][j] = dp[i][j - 1] * array[j];
    }
  }
  var res = [dp[1][array.length - 1]];
  for (let k = 1; k < array.length; k++) {
    res[k] = dp[0][k - 1] * dp[k + 1][array.length - 1];
  }
  return res;
}

// console.log(multiply([1, 2, 3, 4, 5]));

function Merge(pHead1, pHead2) {
  // write code here
  let p3,
    p = p3;
  let p1 = pHead1;
  let p2 = pHead2;
  while (p1 && p2) {
    if (p1.val < p2.val) {
      p.next = { val: p1.val, next: null };
      p = p.next;
      p1 = p1.next;
    } else {
      p.next = { val: p2.val, next: null };
      p = p.next;
      p2 = p2.next;
    }
  }
  return p3.next;
}

function Equal(pRoot1, pRoot2) {
  if ((!pRoot1 && pRoot2) || (!pRoot2 && pRoot1)) {
    return false;
  }
  if (!pRoot1 && !pRoot2) return true;

  return (
    pRoot1.val === pRoot2.val &&
    Equal(pRoot1.left, pRoot2.left) &&
    Equal(pRoot1.right, pRoot2.right)
  );
}

// 是否包含子树
function HasSubtree(pRoot1, pRoot2) {
  if (Equal(pRoot1, pRoot2)) {
    return true;
  }
  return (
    !!pRoot1 &&
    (HasSubtree(pRoot1.left, pRoot2) || HasSubtree(pRoot1.right, pRoot2))
  );
  // write code here
}

// console.log(
//   HasSubtree2(
//     {
//       val: 8,
//       left: { val: 6, right: { val: 7 }, left: { val: 5 } },
//       right: { val: 10, right: { val: 11 }, left: { val: 10 } },
//     },
//     { val: 6, right: { val: 7 }, left: { val: 5 } }
//   )
// );

function HasSubtree2(pRoot1, pRoot2) {
  if ((!pRoot1 && pRoot2) || (!pRoot2 && pRoot1)) {
    return false;
  }
  if (!pRoot1 && !pRoot2) return true;

  if (pRoot1.val === pRoot2.val) {
    return (
      HasSubtree(pRoot1.left, pRoot2.left) &&
      HasSubtree(pRoot1.right, pRoot2.right)
    );
  }
  return HasSubtree(pRoot1.left, pRoot2) || HasSubtree(pRoot1.right, pRoot2);
  // write code here
}

function Print(pRoot) {
  // write code here
  const lines = [];
  let order = [pRoot],
    reverse = false,
    line = 0;
  while (order && order.length > 0) {
    reverse = !reverse;
    lines[line] = [];
    let newOrder = [];
    order.forEach((o) => {
      lines[line].push(o.val);
      if (o.left && o.right) {
        if (reverse) {
          newOrder.push(o.right);
          newOrder.push(o.left);
        } else {
          newOrder.push(o.left);
          newOrder.push(o.right);
        }
      } else if (o.left) {
        return newOrder.push(o.left);
      } else if (o.right) {
        return newOrder.push(o.right);
      }
    });
    console.log(newOrder);
    order = newOrder;
    line++;
  }
  return lines;
}
// console.log(
//   Print({
//     val: 8,
//     left: { val: 6, right: { val: 7 }, left: { val: 5 } },
//     right: { val: 10, right: { val: 11 }, left: { val: 10 } },
//   })
// );

function NumberOf1Between1AndN_Solution(n) {
  // write code here
  if (n < 10) return 1;
  let max,
    d = -1,
    num = n,
    s = 0;
  while (num > 0) {
    d++;
    max = num % 10;
    num = (num - (num % 10)) / 10;
  }
  let all = Math.pow(10, d),
    not = Math.pow(9, d);
  console.log(d, max, all, not);
  if (max === 1) {
    s += (n % all) + 1;
    s += all - not;
  } else {
    s += NumberOf1Between1AndN_Solution(n % all);
    s += all;
    s += (max - 1) * (all - not);
  }

  return s;
}

// console.log(NumberOf1Between1AndN_Solution(13));
// console.log(NumberOf1Between1AndN_Solution(23));
// console.log(NumberOf1Between1AndN_Solution(123));
// console.log(NumberOf1Between1AndN_Solution(323));

function NumberOf1Between1AndN(n) {
  // write code here
  if (n < 10) return 1;
  let max,
    d = -1,
    num = n,
    s = 0;
  while (num > 0) {
    d++;
    max = num % 10;
    num = (num - (num % 10)) / 10;
  }

  let base = Math.pow(10, d);
  if (max === 1) {
    s += n % base;
    s += NumberOf1Between1AndD(d - 1);
  } else {
    s += base;
    s += max * NumberOf1Between1AndD(d - 1);
  }
  s += NumberOf1Between1AndN(n % base);

  return s;
}

function NumberOf1Between1AndD(n) {
  return (n + 1) * Math.pow(10, n);
  if (n === 0) {
    return 1;
  }
  return NumberOf1Between1AndD(n - 1) * 10 + Math.pow(10, n);
}
// console.log(NumberOf1Between1AndD(0));
// console.log(NumberOf1Between1AndD(1));
// console.log(NumberOf1Between1AndD(2));
// console.log(NumberOf1Between1AndD(3));
// console.log(NumberOf1Between1AndN(10));
// console.log(NumberOf1Between1AndN(100));
// console.log(NumberOf1Between1AndN(1000));
// console.log(NumberOf1Between1AndN(3000));

function isNumeric(str: string) {
  // write code here
  // var re = "^(-|\\+)?\\d+(\\.\\d+)?((e|E)(-|\\+)?\\d+)?$";
  var re = /^(-|\+)?\d+(\.\d+)?((e|E)(-|\+)?\d+)?$/;
  return re.test(str);
}
// console.log(isNumeric("-"));
// console.log(isNumeric("."));
// console.log(isNumeric("e"));
// console.log(isNumeric("0e1"));
// console.log(isNumeric("-3.5e0"));
// console.log(isNumeric("-3.5e-2"));
// console.log(isNumeric("-3.5e"));
// console.log(isNumeric("-.5"));
// console.log(isNumeric("-2.5e2.4"));
// console.log(isNumeric("-2.e35"));
// console.log(isNumeric("+2.5e2e"));

function PrintMinNumber(numbers) {
  return numbers
    .map((n) => n.toString())
    .sort((a, b) => compare(a, b, 0))
    .reduce((a, b) => a + b);
}

function compare(a, b, index) {
  if (!a[index] || !b[index]) {
    return (a[index] || b[index]) - a[0];
  }

  if (a[index] === b[index]) {
    return compare(a, b, ++index);
  } else {
    return a[index] - b[index];
  }
}

console.log(PrintMinNumber([1, 12, 123, 3, 32, 321]));
// console.log(compare("321", "32", 0));
console.log(PrintMinNumber([1, 2, 3, 4, 5]));

function findnum(array, sum) {
  for (let i = 0; i < array.length; i++) {
    if (sum === 2 * array[i]) continue;
    array[i] = sum - array[i];
    for (let k = i; k > 0; k--) {
      if (array[k] === array[i]) return [array[k], array[i]];
    }
  }
  return [];
}
