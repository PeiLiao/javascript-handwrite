// JZ54 
// the first no-repeat character in stringstream

//Init module if you need
var str = '';
var chars = []
function Init() {
  // write code here
}
//Insert one char from stringstream
function Insert(ch) {
  // write code here
  str += ch
  if (chars.includes(ch)) {
    chars = chars.filter(c => c !== ch)
  } else {
    chars.push(ch)
  }
}
//return the first appearence once char in current stringstream
function FirstAppearingOnce() {
  // write code here
  if (chars.length === 0) {
    return '#'
  }
  return chars[0]
}

// test
// for (var c of 'stringstreamappearence') {
//   Insert(c)
//   console.log(FirstAppearingOnce())
// }

// input a str no more than 9 characters
// output all possible and different order of str
// e.g. ab => [ab,ba]
function Permutation(str: string) {
  var results = []
  str.split('').forEach((s, i) => {
    for (var j = i + 1; j < str.length; j++) {
      var newstr = str;
      if (s !== str[j]) {
        newstr.re = str[j]
        str[j] = s
        results.push(newstr)
      }

    }
  })
  return results
}
// test
console.log(Permutation('ac'))
console.log(Permutation('abc'))
console.log(Permutation('abcd'))
console.log(Permutation('abad'))

// find the least k numbers of input array
// O(n) = n*k , if sort input, O(n) =n
function leastNumbers(input: number[], k) {
  if (k > input.length) return []
  var stack = input.slice(0, k).sort()
  for (var i = k; i < input.length; i++) {
    var kk = input[i];
    if (kk < stack[k - 1]) {
      stack.pop();
      if (k === 1) { stack.push(kk) }
      for (var j = 0; j < k - 1; j++) {
        if (stack[j] > kk) {
          stack.splice(j, 0, kk)
          break;
        }
        if (j === k - 2) {
          stack.push(kk)
        }
      }
    }
  }
  return stack;
}

// test
console.log(leastNumbers([62, 3, 45, 35, 2, 4, 5, 24, 254, 54, 13, 15, 0, 44, 25], 4))
console.log(leastNumbers([4, 5, 1, 6, 2, 7, 3, 8], 1))