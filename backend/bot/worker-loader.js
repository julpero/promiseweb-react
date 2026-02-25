// This file stays as .js even in your src folder
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-require-imports
require("ts-node").register({
  // This is the "Magic Button". It stops ts-node from failing
  // on type errors and just runs the code.
  transpileOnly: true,
  compilerOptions: {
    // Explicitly tell it not to care about missing types here
    noImplicitAny: false,
    strict: false
  }
});// This tells the worker to look at the .ts file in dev
// or the .js file in production
const workerPath = process.env.NODE_ENV === "development"
  ? "./botWorker.ts"
  : "./botWorker.js";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const workerModule = require(path.resolve(__dirname, workerPath));
module.exports = workerModule.default || workerModule;
