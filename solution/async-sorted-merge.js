"use strict";

const MinHeap = require("./MinHeap");

module.exports = async (logSources, printer) => {
  const minHeap = new MinHeap();

  const addLogEntryToHeap = async (source, index) => {
    const entry = await source.popAsync();
    if (entry) {
      minHeap.push({ entry, index });
    }
  };

  await Promise.all(logSources.map(addLogEntryToHeap));

  while (!minHeap.isEmpty()) {
    const { entry, index } = minHeap.pop();

    printer.print(entry);

    await addLogEntryToHeap(logSources[index], index);
  }

  printer.done();
};
