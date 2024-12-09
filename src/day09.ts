import { loadFile, sum } from "./utils";

const content = loadFile();

type Block = number | null;
type File = { start: number; length: number; id: number };
type FreeSpace = { start: number; length: number };

function getInput() {
  const ranges = content.split("").map((x) => parseInt(x));
  const blocks: Block[] = [];
  const fileRanges: File[] = [];
  const freeSpaceRanges: FreeSpace[] = [];
  for (let i = 0; i < ranges.length; i++) {
    if (i % 2 === 0) {
      fileRanges.push({ start: blocks.length, length: ranges[i], id: i / 2 });
      blocks.push(...Array.from<Block>({ length: ranges[i] }).fill(i / 2));
    } else {
      freeSpaceRanges.push({ start: blocks.length, length: ranges[i] });
      blocks.push(...Array.from<Block>({ length: ranges[i] }).fill(null));
    }
  }
  return [blocks, fileRanges, freeSpaceRanges] as const;
}

function checksum(data: Block[]) {
  return sum(data.map((x, i) => (x ?? 0) * i));
}

function dumpBlock(blocks: Block[]) {
  console.log(blocks.map((x) => (x !== null ? String(x) : ".")).join(""));
}

function part1() {
  const [blocks] = getInput();

  let j = blocks.length - 1;
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i] !== null) {
      continue;
    }
    while (blocks[j] === null) {
      j--;
    }
    if (j > i) {
      blocks[i] = blocks[j];
      blocks[j] = null;
    } else {
      break;
    }
  }
  console.log(checksum(blocks));
}

function part2() {
  const [blocks, fileRanges, freeSpaceRanges] = getInput();
  for (let i = fileRanges.length - 1; i >= 0; i--) {
    const file = fileRanges[i];
    const freeSpace = freeSpaceRanges.find(
      (x) => x.length >= file.length && x.start < file.start
    );
    if (!freeSpace) {
      continue;
    }
    for (let j = 0; j < file.length; j++) {
      blocks[j + freeSpace.start] = file.id;
      blocks[j + file.start] = null;
    }
    freeSpace.start += file.length;
    freeSpace.length -= file.length;
  }
  console.log(checksum(blocks));
}

part1();
part2();
