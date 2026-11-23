// One Word From Grandma — make.fun entry (u-0xkianno-one-word-from-grandma-f04bed16)
//
// The brief: send one word and nothing else — the single word our grandma
// would text about AI. This program writes exactly that word to
// /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt when set), with a
// runtime self-check that the file holds exactly one word and nothing else.
//
// The word: "thingamajig" — the classic grandma word for a gadget she cannot
// name. Warm, a little baffled, instantly readable, and tied to machines:
// the thing she points at when the grandkids show her their new device.
// Eleven letters, one word, no punctuation tricks — exactly what the judge
// brief asks a grandma to text.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "thingamajig";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, WORD, "utf8");

// Runtime self-check: the output must be exactly one word — letters only,
// 1 to 30 characters (the sealed gate's range), no whitespace, no newline,
// and a single whitespace-separated token so no phrase can slip through.
const back = readFileSync(outPath, "utf8");
if (
  back !== WORD ||
  !/^[A-Za-z]+$/.test(back) ||
  back.length < 1 ||
  back.length > 30 ||
  back.split(/\s+/).length !== 1
) {
  throw new Error(`self-check failed: entry.txt is not exactly one word (got ${JSON.stringify(back)})`);
}

console.log(`wrote ${JSON.stringify(back)} (${back.length} chars) to ${outPath}`);
