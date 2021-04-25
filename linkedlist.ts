function ListNode(x) {
  this.val = x;
  this.next = null;
}

function Linkedlist(arr) {
  var head, cur;
  while (arr.length > 0) {
    var node = arr.shift()
    if (!head) {
      head = new ListNode(node)
      cur = head;
    } else {
      cur.next = new ListNode(node)
      cur = cur.next;
    }

  }
  return head;
}

function printLinkedlist(pHead) {
  var cur = pHead, arr = []
  while (cur) {
    arr.push(cur.val)
    cur = cur.next
  }
  return arr;
}
var pHead = Linkedlist([1, 2, 3, 4, 5, 5, 6, 4, 4, 7, 7])
var pHead2 = Linkedlist([5, 4, 4, 3, 5, 5, 6, 4, 4, 7, 7])
// console.log(printLinkedlist(pHead))


function FindFirstCommonNode(pHead1, pHead2) {
  // write code here
  var p1 = pHead1, p2 = pHead2;
  while (p1 && p2) {
    p1 = p1.next;
    p2 = p2.next;
  }
  if (!p1) {
    p1 = pHead1
  }
  if (!p2) {
    p2 = pHead2;
  }
  while (p1 && p2 && p1 !== p2) {
    p1 = p1.next;
    p2 = p2.next;
  }
  return p1
}

function deleteDuplication(pHead) {
  if (!pHead || !pHead.next) {
    return pHead
  }
  // write code here
  var head = new ListNode(0), p = head;
  var p1, p2 = pHead, p3 = pHead.next;

  while (p2) {
    var norepeat = (!p1 || p1.val !== p2.val) && (!p3 || p2.val !== p3.val)
    if (norepeat) {
      p.next = p2
      p = p.next
    }
    p1 = p2
    p2 = p3
    p3 = p3 ? p3.next : p3
  }
  p.next = null
  return head.next
}

//
// console.log(printLinkedlist(deleteDuplication(pHead)))

// convert binary search tree to sortable linkedlist
function Convert(pRootOfTree, isLF) {
  // write code here
  if (!pRootOfTree) {
    return null
  }
  if (pRootOfTree.left) {
    var left = Convert(pRootOfTree.left, true)
    pRootOfTree.left = left;
    left.right = pRootOfTree;
  }

  if (pRootOfTree.right) {
    var right = Convert(pRootOfTree.right, false)
    pRootOfTree.right = right
    right.left = pRootOfTree
  }

  var p = pRootOfTree;
  if (!isLF) {
    while (p.left) {
      p = p.left
    }
    return p;
  } else {
    while (p.right) {
      p = p.right
    }
    return p;
  }
}
var testtree = {
  val: 8,
  left: { val: 6, right: { val: 7 }, left: { val: 5 }, },
  right: { val: 10, right: { val: 11 }, left: { val: 9 } },
}

function testConvert(root) {
  var arr = []
  while (root) {
    arr.push(root.val)
    root = root.right
  }
  return arr
}
// console.log(testConvert(Convert(testtree, false)))


function RandomListNode(x) {
  this.label = x;
  this.next = null;
  this.random = null; // linked to a random node
}

function deepClone(pHead) {
  var cache = {}, p1 = pHead
  var list = { next: null }, p2 = list;
  while (p1) {
    if (!cache[p1.label]) {
      cache[p1.label] = new RandomListNode(p1.label)
    }
    p2.next = cache[p1.label]
    if (p1.random) {
      if (!cache[p1.random.label]) {
        cache[p1.random.label] = new RandomListNode(p1.random.label)
      }
      p2.next.random = cache[p1.random.label]
    }
    p2 = p2.next;
    p1 = p1.next;
  }
  return list.next
}
var source = new RandomListNode(6);
source.next = new RandomListNode(9);
var copy = deepClone(source)
copy.label = 8
// console.log(source.label, copy)

function TreeLinkNode(x) {
  this.val = x;
  this.left = null;
  this.right = null;
  this.next = null; // the father node
};

function nextNodeInMidOrder(node) {
  if (!node.next || node.right) {
    var r = node.right;
    while (r && r.left) {
      r = r.left
    }
    return r
  }
  if (node.next.left === node) {
    return node.next;
  }
  if (node.next.right === node) {
    var r = node.next;
    while (r.next) {
      if (r === r.next.left) {
        return r.next
      }
      r = r.next
    }
    return null
  }
}
var rtree = {
  val: 8,
  left: { val: 6, right: { val: 7, next: null }, left: { val: 5, next: null }, next: null },
  right: { val: 10, right: { val: 11, next: null }, left: { val: 9, next: null }, next: null },
  next: null
}
rtree.right.next = rtree
rtree.left.next = rtree
rtree.right.left.next = rtree.right
rtree.right.right.next = rtree.right
rtree.left.left.next = rtree.left
rtree.left.right.next = rtree.left
// console.log(nextNodeInMidOrder(rtree.right.left))
// console.log(nextNodeInMidOrder(rtree))
// console.log(nextNodeInMidOrder(rtree.right.right))


function EntryNodeOfLoop(pHead) {
  if (!pHead || !pHead.next || !pHead.next.next) return null
  // write code here
  var p1 = pHead.next, p2 = pHead.next.next, p3 = pHead;
  while (p1 !== p2) {
    if (!p2.next || !p2.next.next) { return null }
    p1 = p1.next;
    p2 = p2.next.next
  }
  while (p1 !== p3) {
    p1 = p1.next
    p3 = p3.next
  }
  return p1
}

function loopListGenerator(L1, L2) {
  var l = L1 + L2, pHead = { next: null }, p = pHead;
  while (l--) {
    p.next = { val: l, next: null }
    p = p.next
  }
  var p2 = pHead.next
  while (L1--) {
    p2 = p2.next
  }
  p.next = p2
  return pHead.next
}

// console.log(loopListGenerator(2, 3))
// console.log(EntryNodeOfLoop(loopListGenerator(1, 0)))
// console.log(EntryNodeOfLoop(loopListGenerator(2, 0)))
// console.log(EntryNodeOfLoop(loopListGenerator(1, 1)))
// console.log(EntryNodeOfLoop(loopListGenerator(2, 3)))
// console.log(EntryNodeOfLoop(loopListGenerator(4, 0)))
// console.log(EntryNodeOfLoop(loopListGenerator(7, 6)))
