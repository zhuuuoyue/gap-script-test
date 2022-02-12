# gap-script-test

## Introduction

gap-script-test is designed for testing package [gap-script](https://www.npmjs.com/). It will load script file and compare raw file and generated file and give report describing the difference between two files.

## Usage

Single mode:

```ts
import { Runnable, TestSingle } from "gap-script-test";

const filename: string = "C:\\Users\\me\\Document\\gap\\test\\GAP_CommonEdit\\test.js";
let test: Runnable = new TestSingle(filename);
test.run();
```

Batch Mode:

```ts
import { Runnable, TestAll } from "gap-script-test";

const rootDir: string = "C:\\Users\\me\\Document\\gap\\test";
let test: Runnable = new TestAll(rootDir);
test.run();
```

Clean cache:

```ts
import { Runnable, CleanCache } from "gap-script-test";

const rootDir: string = "C:\\Users\\me\\Document\\gap\\test";
let task: Runnable = new CleanCache(rootDir);
task.run();
```
