export function deepCopy(object: any) {
  var cachedItems = [];
  function copy(obj: any) {
    if (!(obj instanceof Object)) {
      return obj;
    }

    // repeat objects,  circular reference

    for (let item of cachedItems) {
      if (item.source === obj) {
        return item.target
      }
    }

    let newObj = {}
    cachedItems.push({ source: obj, target: newObj })
    // recursion copy
    for (let key of Object.getOwnPropertyNames(obj)) {
      newObj[key] = copy(obj[key])
    }
    // console.log(cachedItems, obj)
    return newObj
  }
  return copy(object)
}

//
var a = { b: 1, w: { ww: 0 } }
var c = { d: a, e: 2, f: { g: 3, h: { i: 4 }, a } }
c.f.h['j'] = c;
var copyC = deepCopy(c)
console.log(c)
console.log(copyC)
a.b = 6; c.f.h.i = 8;
console.log(c.f.h['j'])
console.log(copyC.f.h['j'])


// 
export function shallowCopy(obj: any) {
  if (obj instanceof Object) {
    let newObj = {}
    for (let key of Object.getOwnPropertyNames(obj)) {
      newObj[key] = obj[key]
    }
    return newObj
  } else {
    return obj
  }
}

// var a = { b: 1 }, f = { g: 3, h: { i: 4, c }, a }
// var c = { d: a, e: 2, f }
// var shallowCopyC = shallowCopy(c)
// console.log(c)
// console.log(shallowCopyC)
// c.e = 7; a.b = 8;
// console.log(c)
// console.log(shallowCopyC)

