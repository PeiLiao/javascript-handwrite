class Heap {
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
    this.elements[0] = this.elements[this.elements.length - 1];
    this.elements.pop();
    this.down_update(0)
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


const heap = new Heap([3, 4, 9, 5, 6, 11, 23]);

heap.print()
heap.push(5)
heap.print()
heap.push(1)
heap.print()
while (heap.length() > 0) {
  heap.pop()
  heap.print()
}
