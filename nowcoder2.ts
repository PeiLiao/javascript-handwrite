// JZ54
// the first no-repeat character in stringstream

//Init module if you need
var str = "";
var chars = [];
function Init() {
  // write code here
}
//Insert one char from stringstream
function Insert(ch) {
  // write code here
  str += ch;
  if (chars.includes(ch)) {
    chars = chars.filter((c) => c !== ch);
  } else {
    chars.push(ch);
  }
}
//return the first appearence once char in current stringstream
function FirstAppearingOnce() {
  // write code here
  if (chars.length === 0) {
    return "#";
  }
  return chars[0];
}

// test
// for (var c of 'stringstreamappearence') {
//   Insert(c)
//   console.log(FirstAppearingOnce())
// }

// input a str no more than 9 characters
// output all possible and different order of str
// e.g. ab => [ab,ba]
function Permutation2(str: string) {
  var results = [str];
  str.split("").forEach((s, i) => {
    for (var j = i + 1; j < str.length; j++) {
      var newstr;
      if (s !== str[j]) {
        newstr = str.substring(0, i) + str[j] + str.substring(i + 1, j) + s + str.substring(j + 1);
        results.push(newstr);
      }
    }
  });
  return results;
}


import { insert } from './string.js'
function Permutation(str: string) {

  var dp = [str[0]];
  while (!(dp[0].length === dp[dp.length - 1].length && dp[0].length === str.length)) {
    var s = dp.shift();
    for (var i = 0; i <= s.length; i++) {
      dp.push(insert(s, i, str[s.length]))
    }
  }
  var set = new Set(dp);
  return Array.from(set).sort()
}

// test
// console.log(Permutation("ac"));
// console.log(Permutation("abc"));
// console.log(Permutation("abcd"));
// console.log(Permutation("abad"));

//
function printMatrix(_matrix) {
  var results = [];
  (function print(matrix) {
    console.log(matrix);
    if (matrix.length === 0 || matrix[0].length === 0) {
      return;
    }
    if (matrix.length === 1) {
      results = results.concat(matrix[0]);
      return;
    }
    var innerMatrix = [];
    results = results.concat(matrix[0]);
    var len = matrix[0].length;
    for (var i = 1; i <= matrix.length - 2; i++) {
      results.push(matrix[i][len - 1]);
      innerMatrix.push(matrix[i].slice(1, len - 1));
    }

    results = results.concat(matrix[matrix.length - 1].reverse());

    if (len > 1) {
      for (var i = matrix.length - 2; i >= 1; i--) {
        results.push(matrix[i][0]);
      }
    }

    print(innerMatrix);
  })(_matrix);
  return results;
}

// console.log(
//   printMatrix([
//     [1, 2, 3, 4],
//     [5, 6, 7, 8],
//     [9, 10, 11, 12],
//     [13, 14, 15, 16],
//   ])
// );

// console.log(printMatrix([[1], [2], [3], [4], [5]]));

// find the least k numbers of input array
// O(n) = n*k , if sort input, O(n) =n
function leastNumbers(input: number[], k) {
  if (k > input.length) return [];
  var stack = input.slice(0, k).sort();
  for (var i = k; i < input.length; i++) {
    var kk = input[i];
    if (kk < stack[k - 1]) {
      stack.pop();
      if (k === 1) {
        stack.push(kk);
      }
      for (var j = 0; j < k - 1; j++) {
        if (stack[j] > kk) {
          stack.splice(j, 0, kk);
          break;
        }
        if (j === k - 2) {
          stack.push(kk);
        }
      }
    }
  }
  return stack;
}

// test
// console.log(
//   leastNumbers([62, 3, 45, 35, 2, 4, 5, 24, 254, 54, 13, 15, 0, 44, 25], 4)
// );
// console.log(leastNumbers([4, 5, 1, 6, 2, 7, 3, 8], 1));

function FirstNotRepeatingChar(str) {
  // write code here
  var obj = {},
    index = 0;
  for (var i of str) {
    if (obj[i] !== undefined) {
      obj[i] = -1;
    } else {
      obj[i] = index;
    }
    index++;
  }
  console.log(obj);
  for (var j in obj) {
    if (obj[j] !== -1) {
      return obj[j];
    }
  }
}

// console.log(FirstNotRepeatingChar("google"));

// find a path in [matrix] match [word]
// a width first solution
function hasPath(matrix, word) {
  var m = matrix.length, n = matrix[0].length;
  if (m == 0 || n == 0) { return false }
  var path = []
  for (var i = 0; i < m; i++) {
    for (var j = 0; j < n; j++) {
      if (matrix[i][j] === word[0]) {
        path.push([[i, j]])
      }
    }
  }
  function _hasPath(_word, path) {
    if (path.length === 0 || path[0].length === 0) return false;
    if (_word.length === 0) { console.log(path); return true; }
    var s = _word[0], newPath = [];
    path.forEach((p) => {
      var last = p[p.length - 1];
      [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach((dir) => {
        var i = last[0] + dir[0], j = last[1] + dir[1]
        if (i >= 0 && j >= 0 && i < m && j < n && matrix[i][j] && matrix[i][j] === s) {
          if (p.concat().filter((po) => po[0] === i && po[1] === j).length === 0) {
            newPath.push(p.concat([[i, j]]))
          }
        }
      })
    })
    return _hasPath(_word.substring(1), newPath)
  }
  return _hasPath(word.substring(1), path)
}

//
// console.log(hasPath([['a', 'd', 'c'], ['b', 'c', 'e'], ['f', 'd', 'g']], 'abcd'))
// console.log(hasPath([['a', 'd', 'c'], ['b', 'c', 'e'], ['d', 'f', 'g']], 'dcg'))


// if mirror of tree-A is equal with tree-A, tree-A is symmetrical
function isSymmetrical(pRoot) {
  // write code here
  if (!pRoot) { return true }
  function isMirror(p1, p2) {
    if (p1 && p2) {
      return p1.val === p2.val && isMirror(p1.left, p2.right) && isMirror(p1.right, p2.left)
    }
    if (!p1 && !p2) {
      return true;
    }
    return false;
  }
  return isMirror(pRoot.left, pRoot.right);
}


// find a number in array, occurs more than half length of numbers times
function MoreThanHalfNum_Solution(numbers) {
  // write code here
  var len = numbers.length / 2
  var obj = {}
  for (var n of numbers) {
    if (!obj[n]) {
      obj[n] = 1
    } else {
      obj[n]++
    }
    if (obj[n] > len) {
      return n
    }
  }
  return 0
}

// given [a,d,c,d,e...], if e>a, [a,e] is an InversePairs
// worst: O(n) = n^2
var _try = 0;
function InversePairs(data) {
  // write code here
  var res = 0;
  data.forEach((n, index) => {
    for (var i = 0; i < index; i++) {
      _try++
      if (data[i] > n) {
        res++
      }
    }
  });
  return res
}


// bad
var hash_try = 0
function InversePairs_hash(data) {
  // write code here
  var obj = {}, res = 0;
  data.forEach((n, index) => {
    if (!obj[n]) {
      obj[n] = 1
    } else {
      obj[n]++
    }
    for (var i in obj) {
      hash_try++
      if (i > n) {
        res += obj[i]
      }
    }
  });
  return res
}

var recursion_try = 0
function InversePairs_recursion(data: number[]) {
  if (data.length === 1) { return 0 }
  var mid = Math.floor(data.length / 2), n = 0;
  for (let i = 0; i < mid; i++) {
    for (let j = mid; j < data.length; j++) {
      recursion_try++
      if (data[i] > data[j]) {
        n++
      }
    }
  }
  var n1 = InversePairs_recursion(data.slice(0, mid));
  var n2 = InversePairs_recursion(data.slice(mid));
  return n + n1 + n2
}


import { mergeSort, swap, diff } from './mergeSort';
var merge_try = 0
function InversePairs_merge(data: number[]) {
  mergeSort(data)
  console.log(swap, diff)
}

// console.log(InversePairs([1, 3, 4, 6, 6, 3, 2, 2, 4, 5, 9, 8, 7, 9, 10, 2, 2, 3]))
// console.log(InversePairs_hash([1, 3, 4, 6, 6, 3, 2, 2, 4, 5, 9, 8, 7, 9, 10, 2, 2, 3]))
// console.log(InversePairs_recursion([1, 3, 4, 6, 6, 3, 2, 2, 4, 5, 9, 8, 7, 9, 10, 2, 2, 3]))
// console.log(_try, hash_try, recursion_try)
// InversePairs_merge([1, 3, 4, 6, 6, 3, 2, 2, 4, 5, 9, 8, 7, 9, 10, 2, 2, 3])

InversePairs_merge([4, 5, 6, 7])
function testLargeArray(len) {
  var data = [];
  while (len--) {
    data.push((Math.random() * 10000) % 1)
  }
  console.log(InversePairs(data))
  console.log(InversePairs_hash(data))
  console.log(InversePairs_recursion(data))
  InversePairs_merge(data)
}
// testLargeArray(10000)
// testLargeArray(50000)


// worst
// 1,2,3,4,5,6,8,... product of 2,3,5
function GetUglyNumber_Solution(index) {
  var startTime = Date.now()
  // write code here
  var arr = [1, 2, 3, 4, 5]

  for (var i = 6; ; i++) {
    var n = i;
    [2, 3, 5].forEach((k) => {
      while (n % k === 0) {
        n /= k
      }
    })
    if (n === 1) {
      arr.push(i)
      if (arr.length >= index) {
        // console.log(arr)
        console.log('timer:', Date.now() - startTime)
        return arr[index - 1]
      }
    }
  }
}

// is not sorted
import { MaxHeap } from './heap'
function GetUglyNumber_Solution2(index) {
  var startTime = Date.now()
  var arr = [];
  for (var d = 0; d < 53; d++) {
    for (var i = 0; i <= d; i++) {
      for (var j = 0; j <= d - i; j++) {
        var k = d - i - j;
        var val = Math.pow(5, i) * Math.pow(3, j) * Math.pow(2, k)
        arr.push(val)
      }
    }
  }
  arr.sort((a, b) => a - b)
  // console.log(arr.slice(0, index))
  console.log('timer:', Date.now() - startTime)
  return arr[index - 1]
}

//
function UglyNumber(index) {
  var startTime = Date.now()
  var arr = [1], i = 0, j = 0, k = 0
  while (arr.length < index) {
    if (arr[i] * 2 <= Math.min(arr[j] * 3, arr[k] * 5)) {
      if (arr[i] * 2 > arr[arr.length - 1]) {
        arr.push(arr[i] * 2)
      }
      i++
    }
    if (arr[j] * 3 <= Math.min(arr[i] * 2, arr[k] * 5)) {
      if (arr[j] * 3 > arr[arr.length - 1]) {
        arr.push(arr[j] * 3)
      }
      j++
    }
    if (arr[k] * 5 <= Math.min(arr[i] * 2, arr[j] * 3)) {
      if (arr[k] * 5 > arr[arr.length - 1]) {
        arr.push(arr[k] * 5)
      }
      k++
    }
  }
  // console.log(arr)
  console.log('timer:', Date.now() - startTime)
  return arr[index - 1]
}

// console.log(GetUglyNumber_Solution(1200))
// console.log(GetUglyNumber_Solution2(1200))
// console.log(UglyNumber(1200))
// console.log(GetUglyNumber_Solution(12000))
// console.log(GetUglyNumber_Solution2(12000))
// console.log(UglyNumber(12000))

function PrintMinNumber(numbers: number[]) {
  if (numbers.length === 0) return ""
  if (numbers.length === 1) return numbers[0].toString()
  var arr = []
  numbers.forEach((n, index) => {
    var nums = numbers.concat()
    nums.splice(index, 1)
    arr.push(n + PrintMinNumber(nums))
  })
  return arr.sort()[0]
}

// console.log(PrintMinNumber([3, 32, 321]))


// given an increasing array [data], return number of k 
function GetNumberOfK(data, k) {
  // write code here

  if (data.length === 0) return 0;

  var mid = Math.floor(data.length / 2);
  var res = 0;
  if (data[mid] > k) {
    return GetNumberOfK(data.slice(0, mid), k)
  } else if (data[mid] === k) {
    var i = mid, j = mid - 1;
    while (data[i++] === k) {
      res++
    }
    while (data[j--] === k) {
      res++
    }
    return res
  } else {
    return GetNumberOfK(data.slice(mid + 1), k)
  }
}
// console.log(GetNumberOfK([1, 2, 3, 3, 3, 3, 4, 5], 3))


//  . match any character
// * means the previous character repeats 0-n times
function match(str, pattern) {
  // console.log(str, pattern)
  if (pattern.length === 0 && str.length === 0) {
    return true
  }

  if (pattern.length === 0) {
    return false
  }

  if (str.length === 0) {
    if (pattern.length % 2 === 0) {
      pattern.split('').forEach((c, idx) => {
        if (idx % 2 === 1 && c !== '*') {
          return false;
        }
      })
      return true
    } else {
      return false
    }
  }

  if (str[0] === pattern[0] || pattern[0] === '.') {
    if (pattern[1] === '*') {
      for (var i = 0; i <= str.length; i++) {
        if (match(str.substring(i), pattern.substring(2))) {
          return true
        }
        if (i !== str.length && str[i] !== pattern[0] && pattern[0] !== '.') {
          break;
        }
      }
      return false
    } else {
      return match(str.substring(1), pattern.substring(1))
    }

  } else {
    if (pattern[1] === '*') {
      return match(str, pattern.substring(2))
    } else {
      return false
    }
  }

}

// console.log(match('aaa', 'ab*ac*a'), true)
// console.log(match('aaa', 'aa.a'), false)
// console.log(match('aaa', 'ab*a'), false)
// console.log(match('', '.*'), true)
// console.log(match("a", ".*"), true)
// console.log(match("aa", "a*"), true)
// console.log(match("aaa", "a*a"), true)
// console.log(match("aaba", "ab*a*c*a"), false)
// console.log(match("aab", "c*a*b"), true)

