class MinHeap {
  constructor() {
    this.heap = [];
  }

  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }
  getLeftChildIndex(i) {
    return 2 * i + 1;
  }
  getRightChildIndex(i) {
    return 2 * i + 2;
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  push(element) {
    this.heap.push(element);
    let index = this.heap.length - 1;
    let parentIndex = this.getParentIndex(index);

    while (
      index > 0 &&
      this.heap[parentIndex].entry.date > this.heap[index].entry.date
    ) {
      this.swap(parentIndex, index);
      index = parentIndex;
      parentIndex = this.getParentIndex(index);
    }
  }

  pop() {
    const minValue = this.heap[0];
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap.pop();
    this.heapify(0);
    return minValue;
  }

  heapify(index) {
    const leftIndex = this.getLeftChildIndex(index);
    const rightIndex = this.getRightChildIndex(index);
    let smallestIndex = index;

    if (
      leftIndex < this.heap.length &&
      this.heap[leftIndex].entry.date < this.heap[smallestIndex].entry.date
    ) {
      smallestIndex = leftIndex;
    }

    if (
      rightIndex < this.heap.length &&
      this.heap[rightIndex].entry.date < this.heap[smallestIndex].entry.date
    ) {
      smallestIndex = rightIndex;
    }

    if (smallestIndex !== index) {
      this.swap(index, smallestIndex);
      this.heapify(smallestIndex);
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

module.exports = MinHeap;
