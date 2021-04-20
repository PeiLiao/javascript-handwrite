class MinHeap {
  private elements: number[];
  constructor(elements) {
    this.elements = elements;
  }

  public length() {
    return this.elements.length;
  }

  public print(): void {
    console.log(this.elements)
  }

  public push(n: number) {
    this.elements.push(n);
    this.up_update(this.elements.length - 1);
  }

  // delete 堆顶
  public pop() {
    var p = this.elements[0]
    this.elements[0] = this.elements[this.elements.length - 1];
    this.elements.pop();
    this.down_update(0)
    return p
  }

  public top() {
    return this.elements[0];
  }

  private down_update(idx: number) {
    let sonIdx = 2 * idx + 1;
    if (sonIdx <= this.elements.length - 1) {

      if (sonIdx + 1 <= this.elements.length - 1 && this.elements[sonIdx] > this.elements[sonIdx + 1]) {
        sonIdx += 1;
      }

      if (this.elements[sonIdx] < this.elements[idx]) {
        const temp = this.elements[sonIdx];
        this.elements[sonIdx] = this.elements[idx];
        this.elements[idx] = temp;
        this.down_update(sonIdx)
      }

    }

  }

  private up_update(idx: number) {
    if (idx > 0) {
      const fatherIdx = Math.floor((idx - 1) / 2);
      if (this.elements[fatherIdx] > this.elements[idx]) {
        const temp = this.elements[fatherIdx];
        this.elements[fatherIdx] = this.elements[idx];
        this.elements[idx] = temp;
        this.up_update(fatherIdx)
      }
    }
  }

}
class MaxHeap {
  private elements: number[];
  constructor(elements) {
    this.elements = elements;
  }

  public length() {
    return this.elements.length;
  }

  public print(): void {
    console.log(this.elements)
  }

  public push(n: number) {
    this.elements.push(n);
    this.up_update(this.elements.length - 1);
  }

  // delete 堆顶
  public pop() {
    var p = this.elements[0];
    this.elements[0] = this.elements[this.elements.length - 1];
    this.elements.pop();
    this.down_update(0)
    return p
  }

  public top() {
    return this.elements[0];
  }

  private down_update(idx: number) {
    let sonIdx = 2 * idx + 1;
    if (sonIdx <= this.elements.length - 1) {

      if (sonIdx + 1 <= this.elements.length - 1 && this.elements[sonIdx] < this.elements[sonIdx + 1]) {
        sonIdx += 1;
      }

      if (this.elements[sonIdx] > this.elements[idx]) {
        const temp = this.elements[sonIdx];
        this.elements[sonIdx] = this.elements[idx];
        this.elements[idx] = temp;
        this.down_update(sonIdx)
      }

    }

  }

  private up_update(idx: number) {
    if (idx > 0) {
      const fatherIdx = Math.floor((idx - 1) / 2);
      if (this.elements[fatherIdx] < this.elements[idx]) {
        const temp = this.elements[fatherIdx];
        this.elements[fatherIdx] = this.elements[idx];
        this.elements[idx] = temp;
        this.up_update(fatherIdx)
      }
    }
  }

}


// const heap = new MinHeap([3, 4, 9, 5, 6, 11, 23]);

// heap.print()
// heap.push(5)
// heap.print()
// heap.push(1)
// heap.print()
// while (heap.length() > 0) {
//   heap.pop()
//   heap.print()
// }


// use maxHeap and minHeap to obtain medium quickly

var minH = new MinHeap([])
var maxH = new MaxHeap([])

function insert(i) {
  if (!minH.top()) {
    minH.push(i)
    return;
  }

  if (i >= minH.top()) {
    if (minH.length() > maxH.length()) {
      maxH.push(minH.pop());
    }
    minH.push(i)
  } else {
    if (minH.length() < maxH.length()) {
      minH.push(maxH.pop());
    }
    maxH.push(i)
  }
}

function medium() {
  // minH.print()
  // maxH.print()
  if (minH.length() > maxH.length()) {
    return minH.top()
  } else if (minH.length() === maxH.length()) {
    return (minH.top() + maxH.top()) / 2
  } else {
    return maxH.top()
  }
}

// test
for (var i of [1, 2, 5, 3, 6, 7, 4, 6, 5, 8, 9, 8, 4]) {
  insert(i)
  console.log(medium())
}