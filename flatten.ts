export function flatten(arr: any, depth: number) {
  if (depth === 0 || !Array.prototype.isPrototypeOf(arr)) {
    return arr;
  }
  return arr.reduce((a, b) => {
    const flata = flatten(a, depth - 1);
    const flatb = flatten(b, depth - 1);
    return (Array.isArray(flata) ? flata : [flata]).concat(Array.isArray(flatb) ? flatb : [flatb])
  })
}

console.log(flatten([1, [2], [2, [3], [4, [6, [4]]]]], 4))
console.log(flatten([1, [2], [2, [3], [4, [6, [4]]]]], 5))
console.log(flatten([1, [2], [2, [3], [4, [6, [4]]]]], 2))
console.log(flatten([1, [2], [2, [3], [4, [6, [4]]]]], 3))
console.log(flatten([1, [2], [2, [3], [4, [6, [4]]]]], 1))


