// 基础版本
var swap = 0, diff = 0;
function quickSorter(array: number[], l: number, r: number, base?: number): number[] {
  if (l >= r || l < 0 || r > array.length - 1) {
    return;
  }
  let k = base || Math.floor((l + r) / 2);
  const flag = array[k];

  for (let i = l, j = r, toR = true; i <= j;) {
    diff++
    if (toR && i <= k) {
      if (array[i] > flag) {
        array[k] = array[i]
        k = i;
        toR = false;
        swap++
      }
      i++
    } else if (j >= k) {
      if (array[j] < flag) {
        array[k] = array[j]
        k = j;
        toR = true
        swap++
      }
      j--
    }
  }
  array[k] = flag;
  swap++
  console.log(swap, diff)
  quickSorter(array, l, k - 1);
  quickSorter(array, k + 1, r);
  return array
}

// 优化版本
var swap = 0, diff = 0;
function quickSort(array, left, right) {
  var length = array.length;
  left = typeof left === 'number' ? left : 0,
    right = typeof right === 'number' ? right : length - 1;

  if (left < right) {
    var index = left - 1;
    for (var i = left; i <= right; i++) {
      diff++
      if (array[i] <= array[right]) {
        index++;
        if (i !== index) {
          var temp = array[index];
          array[index] = array[i];
          array[i] = temp;
          swap++
        }
      }
    }
    console.log(array, swap, diff)
    quickSort(array, left, index - 1);
    quickSort(array, index + 1, right);

  }

  return array;
}
console.log(quickSorter([3, 8, 6, 2, 4, 11, 7, 9, 5], 0, 8, 8))
// console.log(quickSort([3, 8, 6, 2, 4, 11, 7, 9, 5], 0, 8))