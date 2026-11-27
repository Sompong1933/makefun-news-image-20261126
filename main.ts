// News-image entry (Node 22, standard library only): its image is the entry.png beside this file,
// an infographic summing up the world news of Thursday 26 November 2026, and the program
// copies it to /output/entry.png. The gate takes a whole PNG or JPEG of at most 1 MiB and
// 1024 by 1024 pixels, and the judge sees exactly the bytes copied.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const outPath = join(outDir, 'entry.png');
copyFileSync(new URL('./entry.png', import.meta.url), outPath);

// Verify the copy: a whole PNG, within the gate's 1 MiB limit.
const bytes = readFileSync(outPath);
if (bytes.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') throw new Error('entry.png is not a PNG');
if (statSync(outPath).size > 1048576) throw new Error('entry.png exceeds 1 MiB');
console.log(`entry.png written (${bytes.length} bytes)`);
