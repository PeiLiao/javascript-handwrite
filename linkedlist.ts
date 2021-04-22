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



// TODO
function FindFirstCommonNode(pHead1, pHead2) {
  // write code here

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
console.log(printLinkedlist(deleteDuplication(pHead)))


// convert binary search tree to sortable linkedlist
function Convert(pRootOfTree) {
  // write code here
  var head = pRootOfTree
  while (head.left) {
    head = head.left
  }
}


/*function RandomListNode(x){
    this.label = x;
    this.next = null;
    this.random = null;
}*/
function deepClone(pHead) {

}

function nextNodeInMidOrder(node) {
  if (!node.prev) return node.right;
  if (node.right) {
    return node.right
  }
  if (node.prev.left === node) {
    return node.prev;
  }
  if (node.prev.right === node) {
    return node.prev.prev
  }
}