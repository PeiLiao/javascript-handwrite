export function flatten(arr: any, depth: number) {
  if (depth === 0 || !Array.prototype.isPrototypeOf(arr)) {
    return arr;
  }
  return arr.reduce((a, b) => {
    const flata = flatten(a, depth - 1);
    const flatb = flatten(b, depth - 1);
    return (Array.isArray(flata) ? flata : [flata]).concat(
      Array.isArray(flatb) ? flatb : [flatb]
    );
  });
}

// console.log(flatten([1, [2], [2, [3], [4, [6, [4]]]]], 4));
// console.log(flatten([1, [2], [2, [3], [4, [6, [4]]]]], 5));
// console.log(flatten([1, [2], [2, [3], [4, [6, [4]]]]], 2));
// console.log(flatten([1, [2], [2, [3], [4, [6, [4]]]]], 3));
// console.log(flatten([1, [2], [2, [3], [4, [6, [4]]]]], 1));

export function flatten_iter(arr: any, depth) {
  if (!Array.isArray(arr)) {
    return arr;
  }
  let k = depth;
  let flattedArr = [],
    curArr = arr.concat();
  while (depth--) {
    // console.log(curArr);
    curArr.forEach((e) => {
      if (Array.isArray(e)) {
        flattedArr.push(...e);
      } else {
        flattedArr.push(e);
      }
    });
    curArr = flattedArr.concat();
    flattedArr = [];
  }

  return curArr;
}

// console.log(flatten_iter([1, [2], [2, [3], [4, [6, [4]]]]], 4));
// console.log(flatten_iter([1, [2], [2, [3], [4, [6, [4]]]]], 5));
// console.log(flatten_iter([1, [2], [2, [3], [4, [6, [4]]]]], 2));
// console.log(flatten_iter([1, [2], [2, [3], [4, [6, [4]]]]], 3));
// console.log(flatten_iter([1, [2], [2, [3], [4, [6, [4]]]]], 1));
