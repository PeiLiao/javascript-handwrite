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
      var newstr = str.substring(0, i);
      if (s !== str[j]) {
        newstr += str[j] + str.substring(i + 1, j) + s + str.substring(j + 1);
        results.push(newstr);
      }
    }
  });
  return results;
}

function Permutation(str: string) {
  var set = new Set();
  var dp = [""];
  str.split("").forEach((s, i) => {
    dp.map((string) => {
      string + s;
    });
  });
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

console.log(FirstNotRepeatingChar("google"));
