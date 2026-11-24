// Fortune Cookie Wisdom for Developers — entry program.
//
// Writes one original fortune-cookie line for a software developer to
// /output/entry.txt: "The bug is never in the code you tested; it is in
// the code you trusted." (71 characters, one line, no trailing newline).
//
// Deterministic: every run writes exactly the same 71 bytes.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const LINE = "The bug is never in the code you tested; it is in the code you trusted.";

function resolveOutDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv && fromEnv.length > 0) {
    return resolve(fromEnv);
  }
  return "/output";
}

function validateLine(line: string): void {
  if (line.length < 1 || line.length > 120) {
    throw new Error("line must be 1-120 characters");
  }
  if (line.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("line must be a single line");
  }
}

function writeEntry(outDir: string, line: string): void {
  mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, "entry.txt"), line, "utf8");
}

function main(): void {
  void fileURLToPath(import.meta.url);
  validateLine(LINE);
  writeEntry(resolveOutDir(), LINE);
}

main();
