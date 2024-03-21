"use strict";

const MinHeap = require("./MinHeap");

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
