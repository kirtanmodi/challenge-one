"use strict";

const MinHeap = require("./MinHeap");

// space complexity: O(k)
// time complexity: O(k log k + n log k)

// advantages of the asynchronous function is, it is more efficient when the log sources are slow
// or have high latency, which is common in Database operations.
// as there is no blocking because of popAsync, the function can continue to add log entries to the heap while waiting for the
// next log entry to be printed

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
