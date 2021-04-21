function ListNode(x) {
  this.val = x;
  this.next = null;
}

function FindFirstCommonNode(pHead1, pHead2) {
  // write code here

}

function deleteDuplication(pHead) {
  // write code here
  var head, cur = pHead;
  while (cur.next && cur.val !== cur.next.val) {
    head.next = cur.next
  }
}