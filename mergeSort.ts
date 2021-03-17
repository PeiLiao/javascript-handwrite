var diff = 0
function mergeSort(array: number[]) {
  if (array.length < 2) {
    return array;
  }
  const k = Math.round(array.length / 2);
  const arrL = mergeSort(array.concat().slice(0, k))
  const arrR = mergeSort(array.concat().slice(k))
  return merge(arrL, arrR)
}

function merge(arrL: number[], arrR: number[]) {

  const res = [];
  let i = 0, j = 0;
  while (i < arrL.length && j < arrR.length) {
    diff++
    if (arrL[i] <= arrR[j]) {
      res.push(arrL[i])
      i++
    } else {
      res.push(arrR[j])
      j++
    }
  }

  if (i === arrL.length) {
    res.push(...arrR.slice(j))
  }

  if (j === arrR.length) {
    res.push(...arrL.slice(i))
  }

  return res;
}

console.log(mergeSort([3, 8, 6, 2, 4, 11, 7, 9, 5]), diff)
