"use strict";

const MinHeap = require("./MinHeap");

// space complexity: O(k)
// as the heap will store one entry from each log source at a time

// time complexity: O(k log k + n log k)
// where k is the number of log sources and n is the total number of log entries
// as we are iterating through all the entries in the log sources and adding them to the heap
// and then popping them from the heap and printing them
// if n is really larger than k, this simplifies to O(n log k)

module.exports = (logSources, printer) => {
  const minHeap = new MinHeap();

  logSources.forEach((source, index) => {
    const entry = source.pop();
    if (entry) {
      minHeap.push({ entry, index });
    }
  });

  while (!minHeap.isEmpty()) {
    const { entry, index } = minHeap.pop();

    printer.print(entry);

    const nextEntry = logSources[index].pop();

    if (nextEntry) {
      minHeap.push({ entry: nextEntry, index });
    }
  }

  printer.done();
};
