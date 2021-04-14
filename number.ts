
function toBinary(number, radix, fix): string {

  var f = '0'
  if (number < 0) {
    number = 0 - number;
    f = '1'
  }
  var r = 0, num = number;
  if (num > 1) {
    while (num > 1) {
      num /= radix;
      r++
    }
  } else {
    while (num < 1) {
      num *= radix
      r--
    }
  }

  // decimals
  // fix 
  num = fix ? parseFloat((num % 1).toPrecision(10)) : num % 1
  var total = 52;
  var s = '';
  while (num !== 0 && total--) {
    s += num * radix >= 1 ? 1 : 0
    num = (num * radix) % 1
  }

  // carry bit
  if (total < 0 && num * radix >= 1) {
    s = (parseInt(s, 2) + 1).toString(2)
    s = s.padStart(52, '0')
  } else {
    s = s.padEnd(52, '0')
  }

  var e = '';
  r += 1023
  // while (r >= 1) {
  //   e = r % radix + e;
  //   r -= r % radix;
  //   r /= radix;
  // }

  e = r.toString(2).padStart(11, '0')
  return f + e + s
}

function testBinary(number, fix) {
  var b = toBinary(number, 2, fix)
  var s = number.toString(2)
  console.log(number, b, s)
}


// testBinary(1)
// testBinary(10)
// testBinary(5)
// testBinary(5.2)
// testBinary(0.8)
// testBinary(0.5)


function addBinary(num, add) {
  if (!add.includes('1')) {
    return num;
  }

  let n = xor(num, add);
  let m = and(num, add) + '0';
  return addBinary(n, m)
}

// JavaScript的位运算，会将操作数转化成32位二进制串，精度不够导致结果错误
// 所以这里自己实现异或和与运算
function xor(str1, str2) {
  let s = Math.max(str1.length, str2.length)
  str1 = str1.padStart(s, '0')
  str2 = str2.padStart(s, '0')
  let str = '';
  while (s--) {
    str = (str1[s] !== str2[s] ? '1' : '0') + str
  }
  return str
}

function and(str1, str2) {
  let s = Math.max(str1.length, str2.length)
  str1 = str1.padStart(s, '0')
  str2 = str2.padStart(s, '0')
  let str = '';
  while (s--) {
    str = ((str1[s] === '1' && str2[s] === '1') ? '1' : '0') + str
  }
  return str
}


function add0203() {
  testBinary(0.2, true)
  testBinary(0.1, true)
  testBinary(0.30000000000000004, false)
  testBinary(0.3, true)
  // 0.1+0.2 
  console.log(addBinary('1001100110011001100110011001100110011001100110011010', '1100110011001100110011001100110011001100110011001101'))
  // 010110011001100110011001100110011001100110011001100111 
  // 这个地方，首位多了一个1，与原来的默认首位1相加产生进位，于是变成0
  // 而末尾多余的1也进位了，0111变成100
  console.log(toDecimal('0011001100110011001100110011001100110011001100110100'))
  // 
  console.log(toDecimal('0011001100110011001100110011001100110011001100110100') * Math.pow(2, -2))
}

console.log('0.1+0.2', add0203())
// console.log(addBinary('10', '1101'))
// console.log(addBinary('1001100110011010', '1100110011001101'))

function toDecimal(str) {
  let num = 0;
  for (let s = 0; s < str.length; s++) {
    num += str[s] * Math.pow(2, -1 - s)
  }
  return 1 + num;
}

function binaryToFloat(str) {
  let s = str[0];
  let e = str.subString(1, 12)
  let base = str.subString(12, 64)

}

