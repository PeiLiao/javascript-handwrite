
function toBinary(number, radix) {

  // interger
  var r = 0, num = number - number % 1
  while (num > 1) {
    num /= radix;
    r++
  }

  var e = '';
  while (r >= 1) {
    e = r % radix + e;
    r -= r % radix;
    r /= radix;
  }

  e = e.padStart(11, '0')
  // decimals
  num = number % 1
  var total = 53;
  var s = '';
  while (num % 1 !== 0 && total) {
    s += num * radix >= 1 ? 1 : 0
    total--
    num = (num * radix) % 1
  }

  s = s.padEnd(53, '0')
  return e + s
}

function getBinary(num) {
  return (num >>> 0).toString(2);
}
// toBinary(1, 2)
// toBinary(10, 2)
// console.log(toBinary(5, 2))
console.log(5.2, toBinary(5.2, 2))
console.log(0.8, toBinary(0.8, 2))
// console.log(toBinary(0.5, 2))

console.log(0.2, toBinary(0.2, 2))
console.log(0.1, toBinary(0.1, 2))
console.log(0.3, toBinary(0.3, 2))






