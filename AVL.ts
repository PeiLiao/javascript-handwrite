// is tree balanced
function IsBalanced_Solution(pRoot) {
  // write code here
  if (!pRoot) { return true }
  function depth(p) {
    var d1 = depth(p.right), d2 = depth(p.left)
    if (typeof d1 === 'number' && typeof d2 === 'number') {
      if (Math.abs(d1 - d2) <= 1) {
        return Math.max(d1, d2) + 1
      }
    } else if (typeof d1 !== 'number' && typeof d2 !== 'number') {
      return 1
    } else {
      return Math.abs(d1 - d2) > 1 ? false : 2
    }
  }
  return typeof depth(pRoot) === 'number'
}